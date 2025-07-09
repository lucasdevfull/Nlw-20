import { Module } from '@nestjs/common'
import { RoomsController } from './rooms.controller'
import { RoomsRepository } from './repositories/rooms.repository'
import { RoomsService } from './services/rooms.service'
import { QuestionsService } from './services/questions.service'
import { QuestionsRepository } from './repositories/questions.repository'

@Module({
  imports: [],
  controllers: [RoomsController],
  providers: [
    RoomsRepository,
    RoomsService,
    QuestionsService,
    QuestionsRepository,
  ],
})
export class RoomsModule {}
