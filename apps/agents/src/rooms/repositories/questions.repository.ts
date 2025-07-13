import { Inject, Injectable } from '@nestjs/common'
import { and, desc, eq, sql } from 'drizzle-orm'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { audio, questions } from 'src/db/schema'
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

  async getSimilarityByRoom(roomId: string, similarity: string) {
    const sq = sql<number>`1 - (${audio.embeddings} <=> ${similarity}::vector)`
    const result = await this.db
      .select({
        audioId: audio.audioId,
        transcription: audio.transcription,
        similarity: sq,
      })
      .from(audio)
      .where(
        and(
          eq(audio.roomId, roomId),
          sql<number>`1 - (${audio.embeddings} <=> ${similarity}::vector) > 0.7`
        )
      )
      .orderBy(sq)
      .limit(3)

    return result
  }

  async createAudio(roomId: string, transcription: string, embeddings: any) {
    const [result] = await this.db
      .insert(audio)
      .values({ roomId, transcription, embeddings })
      .returning()
    if (!result) throw new Error('Audio not created')
    return result
  }
}
