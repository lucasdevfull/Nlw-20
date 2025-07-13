import { Inject, Injectable } from '@nestjs/common'
import { count, eq } from 'drizzle-orm'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { rooms, questions } from 'src/db/schema'
import { CreateRoomDto } from 'src/dto/room.dto'
import { DRIZZLE } from 'src/infra/drizzle/drizzle.module'

@Injectable()
export class RoomsRepository {
  constructor(@Inject(DRIZZLE) private db: NodePgDatabase) {}

  async getAll(limit: number, page: number) {
    const [{ total }] = await this.db.select({ total: count() }).from(rooms)
    const data = await this.db
      .select({
        roomId: rooms.roomId,
        name: rooms.name,
        questionsCount: count(questions.questionId),
        createdAt: rooms.createdAt,
      })
      .from(rooms)
      .leftJoin(questions, eq(questions.roomId, rooms.roomId))
      .groupBy(rooms.roomId, rooms.name)
      .orderBy(rooms.createdAt)
      .limit(limit)
      .offset((page - 1) * limit)
    const totalPages = Math.ceil(total / limit)
    return {
      previusPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
      page,
      totalPages,
      data,
    }
  }

  async create(data: CreateRoomDto) {
    const [result] = await this.db.insert(rooms).values(data).returning()
    if (!result) throw new Error('Room not created')
    return result
  }
}
