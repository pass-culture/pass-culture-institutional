import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: `${process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:1337'}/graphql`,
  documents: ['src/**/*.graphql'], // Utilise un format standard pour tes documents GraphQL
  ignoreNoDocuments: true, // Pour une meilleure expérience avec le watcher
  generates: {
    './src/generated/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        fragmentMasking: false, // Désactive le masquage des fragments si tu n'en as pas besoin
      },
    },
    './src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-urql'],
      config: {
        withHooks: true,
        withComponent: false,
        withHOC: false,
      },
    },
  },
}

export default config
