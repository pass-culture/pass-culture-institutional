module.exports = {
  plugins: ['react', '@typescript-eslint', 'simple-import-sort'],
  extends: [
    'eslint:recommended',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    'react/jsx-fragments': ['error', 'element'],
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': ['error', { groups: [['^react', '^@?\\w']] }],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          { name: '@testing-library/react', message: 'use @/tests instead' },
        ],
      },
    ],
  },
}
