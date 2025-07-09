import { Injectable } from '@nestjs/common'
import { QuestionsRepository } from '../repositories/questions.repository'
import type { CreateQuestion } from 'src/types/questions.types'

@Injectable()
export class QuestionsService {
  constructor(private questionsRepository: QuestionsRepository) {}

  async getAllByRoom(roomId: string) {
    return await this.questionsRepository.getAll(roomId)
  }

  async createQuestion(data: CreateQuestion) {
    return await this.questionsRepository.create(data)
  }
}
