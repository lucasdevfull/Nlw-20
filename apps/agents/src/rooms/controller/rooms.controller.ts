import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common'
import { RoomsService } from '../services/rooms.service'
import { CreateRoomDto } from 'src/dto/room.dto'
import { QuestionsService } from '../services/questions.service'
import { CreateQuestionDto } from 'src/dto/questions.dto'
import { ApiTags } from '@nestjs/swagger'
import type { CreateRoomResponse, GetRoomsResponse } from 'src/types/room.types'
import type {
  CreateQuestionResponse,
  GetRoomQuestionsResponse,
} from 'src/types/questions.types'
import { HttpStatus } from '@common/http-status'
import type { MultipartFile } from '@fastify/multipart'
import { File } from '../rooms.decorators'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'

@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(
    @InjectPinoLogger(RoomsController.name)
    private readonly logger: PinoLogger,
    private roomsService: RoomsService,
    private questionsService: QuestionsService
  ) {}

  @Get()
  async getRooms(
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number
  ): Promise<GetRoomsResponse> {
    this.logger.info('getRooms', { limit, page })
    const result = await this.roomsService.getRooms(limit, page)
    return { status: HttpStatus.OK, data: result }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createRoom(
    @Body() { name, description }: CreateRoomDto
  ): Promise<CreateRoomResponse> {
    this.logger.info('createRoom', { name, description })
    const { roomId } = await this.roomsService.createRoom({
      name,
      description,
    })
    return { status: HttpStatus.CREATED, data: { roomId } }
  }

  @Get(':roomId/questions')
  async getQuestions(
    @Param('roomId') roomId: string
  ): Promise<GetRoomQuestionsResponse> {
    this.logger.info('getQuestions', { roomId })
    const data = await this.questionsService.getAllByRoom(roomId)
    return { status: HttpStatus.OK, data }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(':roomId/questions')
  async createQuestion(
    @Param('roomId') roomId: string,
    @Body() { question }: CreateQuestionDto
  ): Promise<CreateQuestionResponse> {
    this.logger.info('createQuestion', { roomId, question })
    const { questionId } = await this.questionsService.createQuestion({
      question,
      roomId,
    })
    return { status: HttpStatus.CREATED, data: { questionId } }
  }

  @Get(':roomId/audio')
  async uploadAudio(
    @Param('roomId') roomId: string,
    @File() audio?: MultipartFile
  ) {
    this.logger.info('uploadAudio', { roomId })

    if (!audio) {
      throw new HttpException('Audio is required', HttpStatus.BAD_REQUEST)
    }

    const result = await this.questionsService.processAudio(audio, roomId)
    return { status: HttpStatus.OK, data: result }
  }
}
