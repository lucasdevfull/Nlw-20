import { ApiResponse } from './base'

export type CreateQuestion = {
  question: string
  roomId: string
  answer?: string | null
}

export type CreateQuestionResponse = ApiResponse<{
  questionId: string
}>

export type GetRoomQuestionsResponse = ApiResponse<
  Array<{
    questionId: string
    question: string
    answer: string | null
  }>
>
