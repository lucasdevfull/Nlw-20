import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common'
import { RoomsService } from '../services/rooms.service'
import { CreateRoomDto } from 'src/dto/room.dto'
import { QuestionsService } from '../services/questions.service'
import { CreateQuestionDto } from 'src/dto/questions.dto'

@Controller('rooms')
export class RoomsController {
  constructor(
    private roomsService: RoomsService,
    private questionsService: QuestionsService
  ) {}

  @Get()
  async getRooms() {
    const data = await this.roomsService.getRooms()
    return { status: HttpStatus.OK, data }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createRoom(@Body() body: CreateRoomDto) {
    const { roomId } = await this.roomsService.createRoom(body)
    return { status: HttpStatus.CREATED, data: { roomId } }
  }

  @Get(':roomId/questions')
  async getQuestions(@Param('roomId') roomId: string) {
    const data = await this.questionsService.getAllByRoom(roomId)
    return { status: HttpStatus.OK, data }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(':roomId/questions')
  async createQuestion(
    @Param('roomId') roomId: string,
    @Body() body: CreateQuestionDto
  ) {
    const data = await this.questionsService.createQuestion({ ...body, roomId })
    return { status: HttpStatus.CREATED, data }
  }
}
