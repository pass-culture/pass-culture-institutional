import js from '@eslint/js'
import nextConfig from 'eslint-config-next'
import jest from 'eslint-plugin-jest'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import testingLibrary from 'eslint-plugin-testing-library'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'

const eslintConfig = [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'src/types/*.d.ts',
      'next-env.d.ts',
    ],
  },
  js.configs.recommended,
  // Bundles @next/next, react, react-hooks, jsx-a11y, import and typescript-eslint
  ...nextConfig,
  prettierRecommended,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'array-callback-return': 'error',
      'import/no-duplicates': ['error', { considerQueryString: true }],
      '@next/next/no-img-element': 'off',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            { name: '@testing-library/react', message: 'use @/tests instead' },
          ],
        },
      ],
      'no-return-await': 'error',
      // TypeScript already checks for undefined identifiers/types
      'no-undef': 'off',
      // Delegated to unused-imports (base rules disabled to avoid duplicate
      // reports and a crash of core no-unused-vars on TypeScript files)
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      // React-Compiler-oriented rules introduced by eslint-plugin-react-hooks v7
      // (bundled by eslint-config-next 16). Out of scope for this dependency
      // upgrade; keep the original react-hooks contract (rules-of-hooks +
      // exhaustive-deps only).
      // Follow-up (dedicated ticket): re-enable these react-hooks v7 rules
      // progressively and fix the violations so the opt-out does not become
      // permanent, before adopting the React Compiler.
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/use-memo': 'off',
      'react-hooks/immutability': 'off',
      'react/jsx-fragments': ['error', 'element'],
      'react/jsx-no-useless-fragment': 'error',
      'react/no-unstable-nested-components': 'error',
      'react/no-unused-prop-types': 'warn',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        { groups: [['^react', String.raw`^@?\w`]] },
      ],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': 'error',
    },
  },
  {
    // CommonJS Node scripts (build helpers)
    files: ['**/*.js', '**/*.cjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/__mocks__/**'],
    plugins: {
      jest,
      'testing-library': testingLibrary,
    },
    languageOptions: {
      globals: { ...globals.jest },
    },
    rules: {
      'react/jsx-no-constructed-context-values': 'off',
      'jest/no-conditional-in-test': 'error',
      'jest/no-focused-tests': 'warn',
      'jest/prefer-called-with': 'error',
    },
  },
]

export default eslintConfig
