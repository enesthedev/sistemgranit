/**
 * Normalise a brand logo onto the shared card canvas.
 *
 *   bun scripts/normalize-brand-logo.mjs <input...> [--out <dir>]
 *
 * Example:
 *   bun scripts/normalize-brand-logo.mjs ~/Downloads/arteo.png --out public/brand-logos
 *
 * What it does: trims the transparent border off the artwork, scales it to fit
 * the safe box, and centres it on a transparent 1600×480 canvas. Every brand
 * then renders at the same optical weight in the card grid, whatever shape the
 * original mark is.
 *
 * The input must already have a transparent background — this script does not
 * (and cannot reliably) knock out a baked-in white box.
 */
import path from 'path'
import { mkdir, readFile, writeFile } from 'fs/promises'
import sharp from 'sharp'

const CANVAS = { width: 1600, height: 480 } // 2× of the 800×240 display canvas
const SAFE = { width: 1280, height: 320 } // artwork never exceeds this
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 }

/** Card surface (--marble-raised). Logos are judged for contrast against this. */
const CARD_BG = { r: 0xfb, g: 0xfa, b: 0xf6 }

const args = process.argv.slice(2)
const outFlag = args.indexOf('--out')
const outDir = outFlag === -1 ? 'public/brand-logos' : args[outFlag + 1]
const outValueIndex = outFlag === -1 ? -1 : outFlag + 1
const usePalette = !args.includes('--no-palette')
const inputs = args.filter((a, i) => !a.startsWith('--') && i !== outValueIndex)

if (inputs.length === 0) {
  console.error(
    'Usage: bun scripts/normalize-brand-logo.mjs <input...> [--out <dir>] [--no-palette]',
  )
  process.exit(1)
}

function relativeLuminance({ r, g, b }) {
  const channel = (v) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

/** Mean colour of the opaque pixels, i.e. the ink the logo is actually drawn in. */
async function inkColor(buffer) {
  const { data, info } = await sharp(buffer)
    .resize(160, null, { fit: 'inside' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  let r = 0
  let g = 0
  let b = 0
  let n = 0
  for (let i = 0; i < data.length; i += info.channels) {
    if (data[i + 3] < 160) continue
    r += data[i]
    g += data[i + 1]
    b += data[i + 2]
    n++
  }
  if (n === 0) return null
  return { r: r / n, g: g / n, b: b / n }
}

async function normalize(input) {
  const name = path.basename(input).replace(/\.[^.]+$/, '')
  const label = `${name}:`
  const source = sharp(await readFile(input))
  const meta = await source.metadata()

  if (!meta.hasAlpha) {
    console.warn(
      `${label} ⚠ kaynakta alfa kanalı yok — logonun arkasında beyaz kutu kalacak. Şeffaf PNG ile tekrar deneyin.`,
    )
  }

  // Trim to the artwork bounds so baked-in padding does not shrink the mark.
  const trimmed = await sharp(await readFile(input))
    .ensureAlpha()
    .trim({ threshold: 1 })
    .png()
    .toBuffer({ resolveWithObject: true })

  if (trimmed.info.width < SAFE.width && trimmed.info.height < SAFE.height) {
    console.warn(
      `${label} ⚠ kaynak küçük (${trimmed.info.width}×${trimmed.info.height}) — büyütülünce bulanıklaşabilir. Vektörden ${SAFE.width}×${SAFE.height} veya üstünde dışa aktarın.`,
    )
  }

  const fitted = await sharp(trimmed.data)
    .resize(SAFE.width, SAFE.height, { fit: 'inside', withoutEnlargement: false })
    .png()
    .toBuffer()

  const ink = await inkColor(fitted)
  if (ink) {
    const l1 = relativeLuminance(CARD_BG)
    const l2 = relativeLuminance(ink)
    const contrast = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
    if (contrast < 3) {
      console.warn(
        `${label} ⚠ logo kart zemininde soluk kalıyor (kontrast ${contrast.toFixed(1)}:1, hedef ≥ 3:1). Markanın koyu sürümünü kullanın.`,
      )
    }
  }

  const output = await sharp(fitted)
    .resize(CANVAS.width, CANVAS.height, {
      fit: 'contain',
      position: 'centre',
      background: TRANSPARENT,
    })
    // Flat wordmarks quantise to an 8-bit palette with no visible loss and land
    // ~3× smaller. Pass --no-palette for marks with gradients.
    .png(usePalette ? { compressionLevel: 9, palette: true, quality: 90 } : { compressionLevel: 9 })
    .toBuffer()

  await mkdir(outDir, { recursive: true })
  const dest = path.join(outDir, `${name}-logo.png`)
  await writeFile(dest, output)

  const kb = Math.round(output.length / 1024)
  console.log(
    `${label} ✓ ${dest} — ${CANVAS.width}×${CANVAS.height}, ${kb} KB${kb > 200 ? ' (⚠ 200 KB üstü)' : ''}`,
  )
}

for (const input of inputs) {
  try {
    await normalize(input)
  } catch (err) {
    console.error(`${path.basename(input)}: ✗ ${err.message}`)
    process.exitCode = 1
  }
}
