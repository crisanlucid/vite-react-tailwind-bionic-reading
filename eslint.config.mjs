import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import vitestPlugin from '@vitest/eslint-plugin'
import prettierConfig from 'eslint-config-prettier'
import globals from 'globals'

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'coverage'] },

  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  // React hooks (ESLint 9 flat config)
  reactHooksPlugin.configs.flat['recommended-latest'],

  // JSX accessibility
  {
    plugins: { 'jsx-a11y': jsxA11yPlugin },
    rules: { ...jsxA11yPlugin.configs.recommended.rules },
  },

  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.es2022 },
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'error',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
    },
  },

  {
    files: ['src/tests/**/*.{ts,tsx}', '**/*.{test,spec}.{ts,tsx}', '**/*.bench.ts'],
    plugins: { vitest: vitestPlugin },
    rules: { ...vitestPlugin.configs.recommended.rules },
    languageOptions: { globals: { ...vitestPlugin.environments.env.globals } },
  },

  prettierConfig,
)
