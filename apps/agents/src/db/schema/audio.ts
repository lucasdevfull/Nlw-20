import { pgTable, text, timestamp, uuid, vector } from 'drizzle-orm/pg-core'
import { rooms } from './room'

export const audio = pgTable('audio', {
  audioId: uuid().primaryKey().defaultRandom(),
  roomId: uuid()
    .references(() => rooms.roomId)
    .notNull(),
  transcription: text().notNull(),
  embeddings: vector({ dimensions: 768 }).notNull(),
  createdAt: timestamp().notNull().defaultNow(),
})
