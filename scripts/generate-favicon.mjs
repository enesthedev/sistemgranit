/**
 * Generates the site favicon from the wide brand logo (public/sistem-granit.png).
 * The logo is horizontal, so it is letterboxed (fit: contain) into square icons
 * rather than cropped/squished. Outputs Next.js App Router file-convention icons
 * under src/app/ so they apply to both the (frontend) and (payload) route groups.
 *
 *   bun scripts/generate-favicon.mjs
 */
import sharp from 'sharp'
import path from 'node:path'

const SRC = path.resolve('public/sistem-granit.png')
const APP = path.resolve('src/app')

// Transparent square — adapts to the browser tab theme.
await sharp(SRC)
  .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(path.join(APP, 'icon.png'))

// Apple touch icon is flattened by iOS, so give it a white background.
await sharp(SRC)
  .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
  .flatten({ background: '#ffffff' })
  .png()
  .toFile(path.join(APP, 'apple-icon.png'))

console.log('Favicon generated: src/app/icon.png, src/app/apple-icon.png')
