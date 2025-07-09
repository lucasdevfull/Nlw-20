import { Module } from '@nestjs/common'
import { RoomsController } from './controller/rooms.controller'
import { RoomsRepository } from './repositories/rooms.repository'
import { RoomsService } from './services/rooms.service'
import { QuestionsService } from './services/questions.service'
import { QuestionsRepository } from './repositories/questions.repository'
import { GeminiModule } from 'src/infra/gemini/gemini.module'

@Module({
  imports: [GeminiModule],
  controllers: [RoomsController],
  providers: [
    RoomsRepository,
    RoomsService,
    QuestionsService,
    QuestionsRepository,
  ],
})
export class RoomsModule {}
