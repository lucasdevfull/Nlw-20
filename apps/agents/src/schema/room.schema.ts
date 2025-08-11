import z from 'zod'

export const CreateRoomSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
})
