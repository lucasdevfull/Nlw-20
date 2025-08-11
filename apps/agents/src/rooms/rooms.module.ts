import { Module } from '@nestjs/common'
import { RoomsController } from '@controller/rooms.controller'
import { RoomsRepository } from '@repository/rooms.repository'
import { RoomsService } from '@service/rooms.service'
import { QuestionsService } from '@service/questions.service'
import { QuestionsRepository } from '@repository/questions.repository'
import { GeminiModule } from '@infra/gemini/gemini.module'

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
