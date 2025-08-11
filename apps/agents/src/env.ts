import z from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string(),
  GEMINI_API_KEY: z.string(),
  NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
  PORT: z.coerce.number().default(3000),
})

type Env = z.infer<typeof envSchema>

export const env: Env = envSchema.parse(process.env)
