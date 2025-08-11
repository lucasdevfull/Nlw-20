import { createZodDto } from 'nestjs-zod'
import { CreateQuestionSchema } from '@schema/questions.schema'

export class CreateQuestionDto extends createZodDto(CreateQuestionSchema) {}
