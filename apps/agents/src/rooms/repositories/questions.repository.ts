import { Inject, Injectable } from '@nestjs/common'
import { desc, eq } from 'drizzle-orm'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { questions } from 'src/db/schema'
import { DRIZZLE } from 'src/infra/drizzle/drizzle.module'
import type { CreateQuestion } from 'src/types/questions.types'

@Injectable()
export class QuestionsRepository {
  constructor(@Inject(DRIZZLE) private db: NodePgDatabase) {}

  async getAll(roomId: string) {
    const result = await this.db
      .select({
        questionId: questions.questionId,
        question: questions.question,
        answer: questions.answer,
        createdAt: questions.createdAt,
      })
      .from(questions)
      .where(eq(questions.roomId, roomId))
      .orderBy(desc(questions.createdAt))
    return result
  }

  async create(data: CreateQuestion) {
    const [result] = await this.db.insert(questions).values(data).returning()
    if (!result) throw new Error('Question not created')
    return result
  }
}
