import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

import './lib/env';

const nextConfig: NextConfig = {
  cacheComponents: true,
};

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');

export default withNextIntl(nextConfig);
