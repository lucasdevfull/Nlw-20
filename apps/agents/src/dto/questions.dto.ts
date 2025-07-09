import { createZodDto } from 'nestjs-zod'
import z from 'zod'

const CreateQuestionSchema = z.object({
  question: z.string(),
})

export class CreateQuestionDto extends createZodDto(CreateQuestionSchema) {}
