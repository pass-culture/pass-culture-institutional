import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    alias: { '@/*': './src/*' },
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    globals: true
  },
})
