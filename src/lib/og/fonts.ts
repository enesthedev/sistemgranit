import { readFile } from 'node:fs/promises'
import path from 'node:path'

/**
 * Fonts for the generated OG cards.
 *
 * Satori needs the font binary, and `next/font/google` only hands out CSS, so
 * the two faces the site uses are vendored here as files. They are static
 * instances pulled from Google Fonts' legacy (WOFF) delivery — one file per
 * weight, ~35 KB each, with the full Turkish charset plus ₺. Re-download with:
 *
 *   curl -A 'Mozilla/5.0 (Windows NT 6.1)' \
 *     'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@144,600'
 *
 * and fetch the `url(...)` it prints. A modern user agent gets woff2 back,
 * which Satori cannot read.
 *
 * NOTE: these are read with `fs` at runtime, so `next.config.ts` has to keep
 * them in `outputFileTracingIncludes` or they vanish from the serverless bundle.
 */
const DIR = path.join(process.cwd(), 'src/lib/og/fonts')

export const OG_DISPLAY_FONT = 'Fraunces'
export const OG_MONO_FONT = 'Space Grotesk'

let cached: Promise<OgFont[]> | undefined

type OgFont = {
  name: string
  data: Buffer
  weight: 500 | 600
  style: 'normal'
}

export function ogFonts(): Promise<OgFont[]> {
  // Module-level cache: the files never change within a running instance.
  cached ??= (async () => {
    const [display, mono] = await Promise.all([
      readFile(path.join(DIR, 'fraunces-600.woff')),
      readFile(path.join(DIR, 'space-grotesk-500.woff')),
    ])
    return [
      { name: OG_DISPLAY_FONT, data: display, weight: 600, style: 'normal' },
      { name: OG_MONO_FONT, data: mono, weight: 500, style: 'normal' },
    ]
  })()

  return cached
}
