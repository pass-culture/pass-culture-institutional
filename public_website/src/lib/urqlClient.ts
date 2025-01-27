// src/urqlClient.ts
import { createClient, fetchExchange } from '@urql/core'

const urqlClient = createClient({
  url: `${process.env['NEXT_PUBLIC_STRAPI_API_URL'] ?? 'http://localhost:1337'}/graphql`,
  exchanges: [fetchExchange],
})

export default urqlClient
