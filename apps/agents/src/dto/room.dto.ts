import { createZodDto } from 'nestjs-zod'
import { CreateRoomSchema } from '@schema/room.schema'

export class CreateRoomDto extends createZodDto(CreateRoomSchema) {}
