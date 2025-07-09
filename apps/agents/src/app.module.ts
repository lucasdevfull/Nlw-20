import { Module } from '@nestjs/common'
import { DrizzleModule } from './infra/drizzle/drizzle.module'
import { RoomsModule } from './rooms/rooms.module'
import { APP_PIPE } from '@nestjs/core'
import { ZodValidationPipe } from 'nestjs-zod'
import { GeminiModule } from './infra/gemini/gemini.module'

@Module({
  imports: [DrizzleModule, GeminiModule, RoomsModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
