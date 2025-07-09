import { Injectable } from '@nestjs/common'
import { QuestionsRepository } from '../repositories/questions.repository'
import type { CreateQuestion } from 'src/types/questions.types'
import { GeminiService } from 'src/infra/gemini/gemini.service'

@Injectable()
export class QuestionsService {
  constructor(
    private geminiService: GeminiService,
    private questionsRepository: QuestionsRepository
  ) {}

  async getAllByRoom(roomId: string) {
    return await this.questionsRepository.getAll(roomId)
  }

  async createQuestion({ question, roomId }: CreateQuestion) {
    const embeddings = await this.geminiService.generateEmbeddings(question)
    return await this.questionsRepository.create({ question, roomId })
  }
}
