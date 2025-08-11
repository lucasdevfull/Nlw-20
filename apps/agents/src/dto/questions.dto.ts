import { createZodDto } from 'nestjs-zod'
import { CreateQuestionSchema } from 'src/schema/questions.schema'

export class CreateQuestionDto extends createZodDto(CreateQuestionSchema) {}
