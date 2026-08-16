/**
 * Serialises a JSON-LD object for `dangerouslySetInnerHTML`.
 *
 * Escapes the characters that could otherwise break out of the surrounding
 * `<script>` element. Product titles, brand names and rich-text-derived
 * descriptions come from the Payload panel, so a `</script>` in editor-authored
 * content would inject markup into the page without this.
 */
export function jsonLd(data: unknown): { __html: string } {
  return {
    __html: JSON.stringify(data)
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e')
      .replace(/&/g, '\\u0026'),
  }
}
