import { Global, Module } from '@nestjs/common'
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from 'src/db/schema'
import { env } from 'src/env'

export const DRIZZLE = Symbol('drizzle')
@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE,
      useFactory: async () => {
        const pool = new Pool({
          connectionString: env.DATABASE_URL,
        })
        return drizzle(pool, {
          schema,
          casing: 'snake_case',
        }) as NodePgDatabase<typeof schema>
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
