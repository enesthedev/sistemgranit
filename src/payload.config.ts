import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { en } from '@payloadcms/translations/languages/en'
import { tr } from '@payloadcms/translations/languages/tr'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Products } from './collections/Products'
import { Projects } from './collections/Projects'
import { ContactSubmissions } from './collections/ContactSubmissions'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  routes: {
    admin: '/panel',
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — Sistem Granit',
    },
    components: {
      graphics: {
        Logo: '/components/admin/Logo#Logo',
        Icon: '/components/admin/Icon#Icon',
      },
    },
    // Turkish-localized auth/account sub-routes (under the /panel base path).
    routes: {
      account: '/hesap',
      createFirstUser: '/ilk-kullanici',
      forgot: '/sifremi-unuttum',
      inactivity: '/oturum-suresi-doldu',
      login: '/giris',
      logout: '/cikis',
      reset: '/sifre-sifirla',
      unauthorized: '/yetkisiz',
    },
  },
  i18n: {
    supportedLanguages: { tr, en },
    fallbackLanguage: 'tr',
  },
  collections: [Categories, Products, Projects, Media, ContactSubmissions, Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  sharp,
  plugins: [],
})
