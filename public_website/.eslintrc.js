module.exports = {
  ignorePatterns: ['node_modules', 'src/types/*.d.ts'],
  plugins: [
    'react',
    '@typescript-eslint',
    'simple-import-sort',
    'unused-imports',
  ],
  extends: [
    'eslint:recommended',
    'next',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
  ],
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
    'react/jsx-fragments': ['error', 'element'],
    'react/jsx-no-useless-fragment': 'error',
    'react/no-unstable-nested-components': 'error',
    'react/no-unused-prop-types': 'warn',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': ['error', { groups: [['^react', '^@?\\w']] }],
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': 'error',
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx', '__mocks__'],
      env: { jest: true },
      plugins: ['jest', 'jest-formatting', 'testing-library'],
      rules: {
        'react/jsx-no-constructed-context-values': 'off',
        'jest/no-conditional-in-test': 'error',
        'jest/no-focused-tests': 'warn',
        'jest/prefer-called-with': 'error',
      },
    },
  ],
}
