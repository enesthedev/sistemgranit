// eslint-config-next 16 ships native flat configs, so they are spread directly
// rather than wrapped in FlatCompat (which parses them as eslintrc and fails).
// `core-web-vitals` already includes the base Next rules; `typescript` adds the
// typescript-eslint recommended set.
import next from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

const eslintConfig = [
  { ignores: ['.next/', 'src/payload-types.ts', 'src/payload-generated-schema.ts'] },
  ...next,
  ...nextTypescript,
  {
    rules: {
      // eslint-plugin-react-hooks 7 promoted this to an error. The existing
      // effects (search reset, counter animation, embla sync) are deliberate,
      // so surface it as a warning and clean up incrementally.
      'react-hooks/set-state-in-effect': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
    },
  },
]

export default eslintConfig
