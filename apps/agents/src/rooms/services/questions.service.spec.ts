import { GeminiModule } from '@/infra/gemini/gemini.module'
import { Test, TestingModule } from '@nestjs/testing'
import { QuestionsService } from '@service/questions.service'
import { QuestionsRepository } from '@repository/questions.repository'
import { DrizzleModule } from '@/infra/drizzle/drizzle.module'

describe('QuestionsService', () => {
  let service: QuestionsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionsService, QuestionsRepository],
      imports: [GeminiModule, DrizzleModule],
    }).compile()

    service = module.get<QuestionsService>(QuestionsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
