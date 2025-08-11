import z from 'zod'

export const CreateQuestionSchema = z.object({
  question: z.string(),
})
