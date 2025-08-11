import { Test, TestingModule } from '@nestjs/testing'
import { RoomsService } from '@service/rooms.service'
import { RoomsRepository } from '@repository/rooms.repository'
import { DrizzleModule } from '@/infra/drizzle/drizzle.module'

describe('RoomsService', () => {
  let service: RoomsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomsService, RoomsRepository],
      imports: [DrizzleModule],
    }).compile()

    service = module.get<RoomsService>(RoomsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
