import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const rooms = pgTable('rooms', {
  roomId: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  description: text(),
  createdAt: timestamp().notNull().defaultNow(),
})
