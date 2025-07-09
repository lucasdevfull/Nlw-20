import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common'
import { RoomsService } from './services/rooms.service'
import { CreateRoomDto } from 'src/dto/room.dto'
import { QuestionsService } from './services/questions.service'
import { CreateQuestionDto } from 'src/dto/questions.dto'

@Controller('rooms')
export class RoomsController {
  constructor(
    private roomsService: RoomsService,
    private questionsService: QuestionsService
  ) {}

  @Get()
  async getRooms() {
    return await this.roomsService.getRooms()
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createRoom(@Body() data: CreateRoomDto) {
    return await this.roomsService.createRoom(data)
  }

  @Get(':roomId/questions')
  async getQuestions(@Param('roomId') roomId: string) {
    return await this.questionsService.getAllByRoom(roomId)
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(':roomId/questions')
  async createQuestion(
    @Param('roomId') roomId: string,
    @Body() data: CreateQuestionDto
  ) {
    return await this.questionsService.createQuestion({ ...data, roomId })
  }
}
