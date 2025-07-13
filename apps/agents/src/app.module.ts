import { Module } from '@nestjs/common'
import { DrizzleModule } from './infra/drizzle/drizzle.module'
import { RoomsModule } from './rooms/rooms.module'
import { APP_PIPE } from '@nestjs/core'
import { ZodValidationPipe } from 'nestjs-zod'
import { GeminiModule } from './infra/gemini/gemini.module'
import { LoggerModule } from 'nestjs-pino'

@Module({
  imports: [
    DrizzleModule,
    GeminiModule,
    RoomsModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            singleLine: true,
          },
        },
      },
    }),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
