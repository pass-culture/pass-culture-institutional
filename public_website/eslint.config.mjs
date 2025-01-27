import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import jest from 'eslint-plugin-jest'
import jestFormatting from 'eslint-plugin-jest-formatting'
import react from 'eslint-plugin-react'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import testingLibrary from 'eslint-plugin-testing-library'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    ignores: ['**/node_modules', 'src/types/*.d.ts', 'src/generated/**/*'],
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'next',
      'next/core-web-vitals',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:prettier/recommended',
      'plugin:jsx-a11y/recommended'
    )
  ),
  {
    plugins: {
      react: fixupPluginRules(react),
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },

    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],

      'array-callback-return': 'error',

      'import/no-duplicates': [
        'error',
        {
          considerQueryString: true,
        },
      ],

      '@next/next/no-img-element': 'off',

      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],

      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@testing-library/react',
              message: 'use @/tests instead',
            },
          ],
        },
      ],

      'no-return-await': 'error',
      'react/jsx-fragments': ['error', 'element'],
      'react/jsx-no-useless-fragment': 'error',
      'react/no-unstable-nested-components': 'error',
      'react/no-unused-prop-types': 'warn',
      'simple-import-sort/exports': 'error',

      'simple-import-sort/imports': [
        'error',
        {
          groups: [['^react', '^@?\\w']],
        },
      ],

      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': 'error',
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/__mocks__'],

    plugins: {
      jest,
      'jest-formatting': jestFormatting,
      'testing-library': testingLibrary,
    },

    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },

    rules: {
      'react/jsx-no-constructed-context-values': 'off',
      'jest/no-conditional-in-test': 'error',
      'jest/no-focused-tests': 'warn',
      'jest/prefer-called-with': 'error',
    },
  },
]
