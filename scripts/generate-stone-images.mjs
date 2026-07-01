/**
 * Generates procedural, on-brand stone textures into public/seed/.
 * These are PLACEHOLDERS so the site renders convincingly before real
 * photography is added. Run: `bun scripts/generate-stone-images.mjs`
 */
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const OUT = path.resolve('public/seed')
await mkdir(OUT, { recursive: true })

// Deterministic PRNG so output is stable across runs.
function rng(seed) {
  let a = seed >>> 0
  return () => {
    a += 0x6d2b79f5
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const seedOf = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 7)

const vignette = (w, h) => `
  <radialGradient id="vg" cx="50%" cy="42%" r="75%">
    <stop offset="55%" stop-color="#000" stop-opacity="0"/>
    <stop offset="100%" stop-color="#000" stop-opacity="0.42"/>
  </radialGradient>
  <rect width="${w}" height="${h}" fill="url(#vg)"/>`

function baseGrad(w, h, c1, c2, angle = true) {
  return `
    <linearGradient id="bg" x1="0" y1="0" x2="${angle ? w : 0}" y2="${h}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
    <rect width="${w}" height="${h}" fill="url(#bg)"/>`
}

function veinPath(r, w, h, y0) {
  let x = -w * 0.05
  let y = y0
  let d = `M ${x.toFixed(1)} ${y.toFixed(1)}`
  const segs = 9
  for (let i = 0; i < segs; i++) {
    const nx = x + (w * 1.1) / segs
    const ny = y + (r() - 0.5) * h * 0.22
    const cx = x + (nx - x) * (0.3 + r() * 0.4)
    const cy = y + (r() - 0.5) * h * 0.12
    d += ` Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${nx.toFixed(1)} ${ny.toFixed(1)}`
    x = nx
    y = ny
  }
  return d
}

function marble(w, h, { c1, c2, vein, dark = '#5b4f40', veins = 7, seed }) {
  const r = rng(seed)
  let paths = ''
  for (let i = 0; i < veins; i++) {
    const y = h * (0.08 + (i / veins) * 0.84) + (r() - 0.5) * h * 0.06
    const sw = (0.8 + r() * 5).toFixed(1)
    const op = (0.12 + r() * 0.4).toFixed(2)
    paths += `<path d="${veinPath(r, w, h, y)}" fill="none" stroke="${vein}" stroke-width="${sw}" stroke-opacity="${op}" stroke-linecap="round"/>`
    if (r() > 0.55) {
      paths += `<path d="${veinPath(r, w, h, y + (r() - 0.5) * 40)}" fill="none" stroke="${dark}" stroke-width="${(0.5 + r() * 1.4).toFixed(1)}" stroke-opacity="${(0.1 + r() * 0.22).toFixed(2)}"/>`
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs></defs>${baseGrad(w, h, c1, c2)}${paths}${vignette(w, h)}</svg>`
}

function granite(w, h, { c1, c2, speckle, seed }) {
  const r = rng(seed)
  const n = Math.floor((w * h) / 2600)
  let dots = ''
  for (let i = 0; i < n; i++) {
    const cx = (r() * w).toFixed(1)
    const cy = (r() * h).toFixed(1)
    const rad = (0.5 + r() * 2.6).toFixed(1)
    const col = speckle[Math.floor(r() * speckle.length)]
    const op = (0.25 + r() * 0.6).toFixed(2)
    dots += `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="${col}" fill-opacity="${op}"/>`
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${baseGrad(w, h, c1, c2, false)}${dots}${vignette(w, h)}</svg>`
}

function travertine(w, h, { c1, c2, band, pit, seed }) {
  const r = rng(seed)
  let bands = ''
  const rows = 26
  for (let i = 0; i < rows; i++) {
    const y = (i / rows) * h + (r() - 0.5) * 8
    const bh = (h / rows) * (0.3 + r() * 0.5)
    bands += `<rect x="0" y="${y.toFixed(1)}" width="${w}" height="${bh.toFixed(1)}" fill="${band}" fill-opacity="${(0.05 + r() * 0.12).toFixed(2)}"/>`
  }
  let pits = ''
  for (let i = 0; i < Math.floor((w * h) / 9000); i++) {
    pits += `<ellipse cx="${(r() * w).toFixed(1)}" cy="${(r() * h).toFixed(1)}" rx="${(1 + r() * 4).toFixed(1)}" ry="${(0.6 + r() * 2).toFixed(1)}" fill="${pit}" fill-opacity="${(0.1 + r() * 0.25).toFixed(2)}"/>`
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${baseGrad(w, h, c1, c2)}${bands}${pits}${vignette(w, h)}</svg>`
}

function onyx(w, h, { stops, glow, seed }) {
  const r = rng(seed)
  const stopEls = stops
    .map((c, i) => `<stop offset="${(i / (stops.length - 1)).toFixed(2)}" stop-color="${c}"/>`)
    .join('')
  let striae = ''
  for (let i = 0; i < 10; i++) {
    striae += `<path d="${veinPath(r, w, h, h * (i / 10))}" fill="none" stroke="#fff" stroke-opacity="${(0.04 + r() * 0.12).toFixed(2)}" stroke-width="${(1 + r() * 3).toFixed(1)}"/>`
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="${w}" y2="${h}" gradientUnits="userSpaceOnUse">${stopEls}</linearGradient>
      <radialGradient id="gl" cx="38%" cy="32%" r="60%">
        <stop offset="0" stop-color="${glow}" stop-opacity="0.55"/>
        <stop offset="1" stop-color="${glow}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#bg)"/>
    <rect width="${w}" height="${h}" fill="url(#gl)"/>
    ${striae}${vignette(w, h)}</svg>`
}

const render = (svg, file) =>
  sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(OUT, file))

// Stone definitions → drive both category covers and product swatches.
const P = 1400
const PH = 1800

const stones = {
  // mermer
  'afyon-beyazi': (s) => marble(P, PH, { c1: '#f3eee5', c2: '#e4dccf', vein: '#c8b9a4', dark: '#7d6f59', veins: 6, seed: s }),
  'marmara-beyazi': (s) => marble(P, PH, { c1: '#eef0ee', c2: '#dde2e2', vein: '#a9b4b6', dark: '#5d6a6c', veins: 8, seed: s }),
  'emperador': (s) => marble(P, PH, { c1: '#5a4636', c2: '#3a2c22', vein: '#caa877', dark: '#251a13', veins: 7, seed: s }),
  // granit
  'absolute-black': (s) => granite(P, PH, { c1: '#26262a', c2: '#161619', speckle: ['#54545c', '#0e0e10', '#7a7a86', '#3a3a40'], seed: s }),
  'bordo-granit': (s) => granite(P, PH, { c1: '#5d2a28', c2: '#3c1a19', speckle: ['#8a4a44', '#2a1110', '#b97f6f', '#d9c9b0'], seed: s }),
  'gri-granit': (s) => granite(P, PH, { c1: '#7c7c80', c2: '#5a5a5e', speckle: ['#a9a9ad', '#3c3c40', '#cfcfd3', '#222'], seed: s }),
  // traverten
  'klasik-traverten': (s) => travertine(P, PH, { c1: '#ddccae', c2: '#c8b491', band: '#a98e63', pit: '#7c6442', seed: s }),
  'ceviz-traverten': (s) => travertine(P, PH, { c1: '#a9855d', c2: '#8a6843', band: '#6f4f30', pit: '#4a3320', seed: s }),
  // oniks
  'bal-oniks': (s) => onyx(P, PH, { stops: ['#d9b266', '#b6822f', '#8a5a1f', '#caa45a'], glow: '#ffe6a6', seed: s }),
  'yesil-oniks': (s) => onyx(P, PH, { stops: ['#4e6f54', '#2f4a38', '#1d2f24', '#3f5a44'], glow: '#bfe6c4', seed: s }),
  // quartz
  'beyaz-quartz': (s) => granite(P, PH, { c1: '#f3f2ef', c2: '#e7e6e2', speckle: ['#d8d6d0', '#bdbbb4', '#ffffff'], seed: s }),
  'gri-quartz': (s) => granite(P, PH, { c1: '#9b9b9e', c2: '#828286', speckle: ['#c0c0c3', '#6a6a6e', '#ededf0'], seed: s }),
}

const jobs = []

// Two swatches per stone.
for (const [slug, fn] of Object.entries(stones)) {
  jobs.push(render(fn(seedOf(slug)), `${slug}.jpg`))
  jobs.push(render(fn(seedOf(slug + '-2')), `${slug}-2.jpg`))
}

// Category covers (reuse a representative stone per category).
const catCover = {
  mermer: () => marble(P, PH, { c1: '#efe9df', c2: '#dcd2c2', vein: '#b9a98f', dark: '#6e5f49', veins: 7, seed: seedOf('cat-mermer') }),
  granit: () => granite(P, PH, { c1: '#2a2a2f', c2: '#17171a', speckle: ['#5a5a64', '#0e0e10', '#86868f'], seed: seedOf('cat-granit') }),
  traverten: () => travertine(P, PH, { c1: '#d8c5a4', c2: '#c0aa84', band: '#a3865c', pit: '#74593a', seed: seedOf('cat-trav') }),
  oniks: () => onyx(P, PH, { stops: ['#d6ab5f', '#a9762a', '#7a4f1c', '#caa45a'], glow: '#ffe6a6', seed: seedOf('cat-oniks') }),
  quartz: () => granite(P, PH, { c1: '#eeedea', c2: '#dededa', speckle: ['#cfcdc7', '#b3b1aa', '#fff'], seed: seedOf('cat-quartz') }),
}
for (const [slug, fn] of Object.entries(catCover)) jobs.push(render(fn(), `category-${slug}.jpg`))

// Hero — wide dramatic dark marble with gold veining.
jobs.push(
  render(
    marble(2400, 1500, { c1: '#1a1410', c2: '#0c0908', vein: '#c69a52', dark: '#000', veins: 9, seed: seedOf('hero') }),
    'hero.jpg',
  ),
)

// About — warm marble portrait.
jobs.push(
  render(
    marble(1200, 1500, { c1: '#e9e1d3', c2: '#cdbfa6', vein: '#a98e63', dark: '#6b5639', veins: 8, seed: seedOf('about') }),
    'about.jpg',
  ),
)

// Project covers/gallery — varied wide stone scenes.
const projStones = [
  () => marble(1600, 1200, { c1: '#26201a', c2: '#100c09', vein: '#c8a86a', dark: '#000', veins: 8, seed: seedOf('p1') }),
  () => travertine(1600, 1200, { c1: '#d2bd99', c2: '#b89e76', band: '#977a52', pit: '#6c5334', seed: seedOf('p2') }),
  () => onyx(1600, 1200, { stops: ['#caa45a', '#8a5a1f', '#3a2410', '#caa45a'], glow: '#ffe6a6', seed: seedOf('p3') }),
  () => granite(1600, 1200, { c1: '#2c2c31', c2: '#191919', speckle: ['#5a5a64', '#101012', '#86868f'], seed: seedOf('p4') }),
  () => marble(1600, 1200, { c1: '#eef0ef', c2: '#d6dcdc', vein: '#9fabad', dark: '#5b6769', veins: 9, seed: seedOf('p5') }),
  () => travertine(1600, 1200, { c1: '#b9966c', c2: '#9a774f', band: '#6f4f30', pit: '#43301c', seed: seedOf('p6') }),
]
projStones.forEach((fn, i) => jobs.push(render(fn(), `project-${i + 1}.jpg`)))

await Promise.all(jobs)
console.log(`Generated ${jobs.length} stone textures into public/seed/`)
