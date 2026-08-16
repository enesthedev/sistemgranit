import { notFound } from 'next/navigation'

/**
 * Catch-all that funnels unmatched URLs into the (frontend) route group so they
 * render `(frontend)/not-found.tsx` *with* the site header and footer.
 *
 * Without this, a path matching no route at all falls through to Next's
 * built-in 404, which is unstyled and chrome-less: this app has two root
 * layouts — (frontend) and (payload) — so there is no `app/layout.tsx` for a
 * global not-found page to live under.
 *
 * More specific routes always win over a catch-all, so `/panel/*`, `/api/*` and
 * the metadata files (`/robots.txt`, `/sitemap.xml`, `/icon.png`) are unaffected.
 */
export default function CatchAllNotFound(): never {
  notFound()
}
