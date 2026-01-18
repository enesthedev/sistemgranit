import { routing } from '../routing';

/**
 * Generates all possible localized paths for a given route key.
 * Handles:
 * - Direct strings in pathnames
 * - Object-based localizations
 * - Locale prefixes (always/as-needed/never)
 * - Default locale behavior
 */
export function getLocalizedPaths(routeKey: string): string[] {
  const paths: Set<string> = new Set();
  const { locales, defaultLocale, pathnames, localePrefix } = routing;

  // Add the base key itself (often serves as the internal link or default fallback)
  paths.add(routeKey);

  locales.forEach((locale) => {
    let localizedSegment = routeKey;

    const pathnameConfig = pathnames?.[routeKey as keyof typeof pathnames];

    if (typeof pathnameConfig === 'string') {
      localizedSegment = pathnameConfig;
    } else if (typeof pathnameConfig === 'object' && pathnameConfig !== null) {
      const translation = (pathnameConfig as Record<string, string>)[locale];
      if (translation) {
        localizedSegment = translation;
      }
    }

    // Determine if prefix is needed
    // 'as-needed': show prefix if NOT default locale
    // 'always': always show prefix
    // 'never': never show prefix (rare for i18n routing but possible)
    const prefixMode = localePrefix as string; // Loose type check for dynamic logic
    const shouldPrefix = prefixMode === 'always' || (prefixMode === 'as-needed' && locale !== defaultLocale);

    if (shouldPrefix) {
      paths.add(`/${locale}${localizedSegment === '/' ? '' : localizedSegment}`);
    } else {
      paths.add(localizedSegment);
    }
  });

  return Array.from(paths);
}
