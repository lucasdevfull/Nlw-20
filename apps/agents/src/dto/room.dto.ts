import { createZodDto } from 'nestjs-zod'
import z from 'zod'

const CreateRoomSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
})

export class CreateRoomDto extends createZodDto(CreateRoomSchema) {}
