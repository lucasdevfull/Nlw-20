import { Test, TestingModule } from '@nestjs/testing'
import { RoomsController } from '@controller/rooms.controller'
import { RoomsService } from '@service/rooms.service'
import { RoomsRepository } from '@repository/rooms.repository'
import { DrizzleModule } from '@/infra/drizzle/drizzle.module'
import { LoggerModule } from 'nestjs-pino'
import { QuestionsService } from '@service/questions.service'
import { QuestionsRepository } from '@repository/questions.repository'
import { GeminiModule } from '@/infra/gemini/gemini.module'

describe('RoomsController', () => {
  let controller: RoomsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: [
        RoomsService,
        QuestionsService,
        QuestionsRepository,
        RoomsRepository,
      ],
      imports: [GeminiModule, DrizzleModule, LoggerModule.forRoot()],
    }).compile()

    controller = module.get<RoomsController>(RoomsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('Testando a rota de ver todas as salas com paginação na primeira página', async () => {
    const result = await controller.getRooms(5, 1)

    expect(result).toEqual({
      status: 200,
      data: {
        previusPage: null,
        nextPage: null,
        page: expect.any(Number),
        totalPages: expect.any(Number),
        data: expect.any(Array),
      }
    })
  })

  it('Testando a rota GetRooms com paginação na segunda página', async () => {
    const result = await controller.getRooms(5, 2)

    expect(result).toEqual({
      status: 200,
      data: {
        previusPage: expect.any(Number),
        nextPage: null,
        page: expect.any(Number),
        totalPages: expect.any(Number),
        data: expect.any(Array),
      }
    })
  })

  it('Testando a rota CreateRoom', async () => {
    const result = await controller.createRoom({ name: `Teste-${Date.now()}`, description: 'Teste' })
    
    expect(result).toEqual({
      status: 201,
      data: {
        roomId: expect.any(String)
      }
    })
  })
})
