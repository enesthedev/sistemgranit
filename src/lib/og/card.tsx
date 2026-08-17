/* eslint-disable @next/next/no-img-element -- Satori renders this tree, not the
   browser: `next/image` has no meaning here and would not be resolved. */
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from 'next/og'
import sharp from 'sharp'

import { brandTone } from '@/lib/brands'
import { OG_DISPLAY_FONT, OG_MONO_FONT, ogFonts } from './fonts'

/**
 * The shared Open Graph card.
 *
 * One geometry for the whole site: a marble type panel on the left, a 500px
 * panel on the right (the product photo, the brand mark, or the four brand
 * accents as material), and the accent colour as the seam between them. A
 * Sistem Granit link should be recognisable in a WhatsApp thread before it is
 * read.
 *
 * Colours are the site's own tokens from `globals.css`; Satori has no CSS
 * variables, so they are repeated here as literals — keep the two in step.
 */
const MARBLE = '#f4f1eb'
const MARBLE_RAISED = '#fbfaf6'
const INK = '#1b1714'
const MUTED = '#6e655a'
const BRAND = '#ce2d1e'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/jpeg'

/**
 * Crawlers fetch a card once; after that it should be a CDN hit. The cards are
 * regenerated on deploy anyway, since the URL Next emits carries a build hash.
 */
export const OG_CACHE_CONTROL = 'public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400'

const PANEL = 500
const SEAM = 8

/** Dark → slate → bronze → stone: the four brands read as a material stack. */
const SWATCHES = ['cimstone', 'arteo', 'belenco', 'coante'].map((slug) => brandTone(slug).accent)

/**
 * Turkish-aware uppercase. Plain `toUpperCase()` turns "Çimstone" into
 * "ÇIMSTONE" (dotless I), and CSS `text-transform` in Satori has the same bug,
 * so every uppercase label on a card goes through here instead.
 */
function trUpper(value: string) {
  return value.replace(/i/g, 'İ').toUpperCase()
}

/** Truncates on a word boundary — a title cut mid-word reads as a bug. */
function clamp(value: string, max: number) {
  if (value.length <= max) return value
  const cut = value.slice(0, max)
  const space = cut.lastIndexOf(' ')
  return `${(space > max * 0.6 ? cut.slice(0, space) : cut).trimEnd()}…`
}

let wordmarkCache: Promise<string> | undefined

/** The logo mark, inlined from disk — no network, so photoless cards prerender. */
function wordmark() {
  wordmarkCache ??= readFile(path.join(process.cwd(), 'public/sistem-granit.png')).then(
    (buffer) => `data:image/png;base64,${buffer.toString('base64')}`,
  )
  return wordmarkCache
}

export type CardInput = {
  /** Small mono label above the title — a brand, a section, a project type. */
  eyebrow?: string
  title: string
  /** Mono line under the title: price, model count, location. */
  meta?: string
  /** Seam and rule colour. Defaults to the Sistem Granit vermilion. */
  accent?: string
  /** Photo for the right panel, as a data URI. */
  photo?: string | null
  /** Brand mark for the right panel, as a data URI, with its aspect ratio. */
  logo?: { src: string; aspect: number } | null
}

/** The type panel is 556px wide inside its padding; long titles step down and wrap. */
function titleSize(title: string) {
  if (title.length > 52) return 44
  if (title.length > 34) return 50
  if (title.length > 20) return 62
  return 76
}

async function Card({ eyebrow, title, meta, accent = BRAND, photo, logo }: CardInput) {
  const mark = await wordmark()
  const clamped = clamp(title, 64)
  const size = titleSize(clamped)

  return (
    <div
      style={{
        display: 'flex',
        width: OG_SIZE.width,
        height: OG_SIZE.height,
        backgroundColor: MARBLE,
        fontFamily: OG_MONO_FONT,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: OG_SIZE.width - PANEL,
          padding: '64px 72px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Logo mark only — the site header does the same, no wordmark text. */}
          <img src={mark} width={132} height={48} alt="" />
          <div style={{ display: 'flex', width: 88, height: 3, backgroundColor: accent, marginTop: 26 }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {eyebrow && (
            // Satori takes letter-spacing in px, not em.
            <div style={{ display: 'flex', fontSize: 22, letterSpacing: 4.4, color: MUTED }}>
              {trUpper(eyebrow)}
            </div>
          )}
          <div
            style={{
              display: 'flex',
              fontFamily: OG_DISPLAY_FONT,
              fontSize: size,
              lineHeight: 1.05,
              letterSpacing: size * -0.02,
              color: INK,
              marginTop: 16,
            }}
          >
            {clamped}
          </div>
          {meta && (
            <div style={{ display: 'flex', fontSize: 24, letterSpacing: 2.9, color: INK, marginTop: 24 }}>
              {trUpper(meta)}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', fontSize: 20, letterSpacing: 3.6, color: MUTED }}>
          SİSTEMGRANİT.COM
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: PANEL,
          height: OG_SIZE.height,
          borderLeft: `${SEAM}px solid ${accent}`,
          backgroundColor: MARBLE_RAISED,
        }}
      >
        {photo ? (
          // Already cropped to exactly this box by `photoDataUri`.
          <img src={photo} width={PANEL - SEAM} height={OG_SIZE.height} alt="" />
        ) : logo ? (
          <img src={logo.src} width={320} height={Math.round(320 / logo.aspect)} alt="" />
        ) : (
          // Nothing to show, so the panel states the portfolio instead: the four
          // brand accents as a material stack.
          SWATCHES.map((tone) => (
            <div
              key={tone}
              style={{
                display: 'flex',
                width: PANEL - SEAM,
                height: OG_SIZE.height / SWATCHES.length,
                backgroundColor: tone,
              }}
            />
          ))
        )}
      </div>
    </div>
  )
}

/**
 * Renders a card and re-encodes it as JPEG.
 *
 * `ImageResponse` only emits PNG, and a photo-bearing 1200×630 PNG lands around
 * a megabyte — past the size where WhatsApp quietly drops the large preview and
 * shows a thumbnail instead. sharp (already a dependency, via Payload uploads)
 * brings the same card down to ~150 KB.
 */
export async function renderCard(input: CardInput): Promise<Response> {
  const fonts = await ogFonts()
  const png = new ImageResponse(await Card(input), { ...OG_SIZE, fonts })

  const jpeg = await sharp(Buffer.from(await png.arrayBuffer()))
    .flatten({ background: MARBLE })
    .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toBuffer()

  return new Response(new Uint8Array(jpeg), {
    headers: { 'Content-Type': OG_CONTENT_TYPE, 'Cache-Control': OG_CACHE_CONTROL },
  })
}

/** The 404 a card route returns when its record is gone. */
export function cardNotFound() {
  return new Response('Not Found', { status: 404 })
}
