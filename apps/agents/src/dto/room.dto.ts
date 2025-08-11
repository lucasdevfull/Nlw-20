import { createZodDto } from 'nestjs-zod'
import { CreateRoomSchema } from 'src/schema/room.schema'

export class CreateRoomDto extends createZodDto(CreateRoomSchema) {}
