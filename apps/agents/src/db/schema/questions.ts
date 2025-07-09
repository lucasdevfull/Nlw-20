import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { rooms } from './room'

export const questions = pgTable('questions', {
  questionId: uuid().primaryKey().defaultRandom(),
  roomId: uuid()
    .references(() => rooms.roomId)
    .notNull(),
  question: text().notNull(),
  answer: text(),
  createdAt: timestamp().notNull().defaultNow(),
})
