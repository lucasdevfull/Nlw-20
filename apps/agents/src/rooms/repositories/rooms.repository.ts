import { Inject, Injectable } from '@nestjs/common'
import { count, eq } from 'drizzle-orm'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { rooms, questions } from 'src/db/schema'
import { CreateRoomDto } from 'src/dto/room.dto'
import { DRIZZLE } from 'src/infra/drizzle/drizzle.module'

@Injectable()
export class RoomsRepository {
  constructor(@Inject(DRIZZLE) private db: NodePgDatabase) {}

  async getAll() {
    const result = await this.db
      .select({
        roomId: rooms.roomId,
        name: rooms.name,
        questionsCount: count(questions.questionId),
      })
      .from(rooms)
      .leftJoin(rooms, eq(questions.roomId, rooms.roomId))
      .groupBy(rooms.roomId, rooms.name)
      .orderBy(rooms.createdAt)
    return result
  }

  async create(data: CreateRoomDto) {
    const [result] = await this.db.insert(rooms).values(data).returning()
    if (!result) throw new Error('Room not created')
    return result
  }
}
