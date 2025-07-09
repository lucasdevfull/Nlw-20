import { config } from '@dotenvx/dotenvx'
import { defineConfig } from 'drizzle-kit'
import { env } from 'src/env'

config()
export default defineConfig({
  dialect: 'postgresql',
  casing: 'snake_case',
  schema: './src/db/schema/**.ts',
  out: './src/db/migrations',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
