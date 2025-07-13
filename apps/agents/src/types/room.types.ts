import { ApiResponse } from './base'

export type Room = {
  roomId: string
  name: string
  questionsCount: number
  createdAt: Date
}

export type GetRooms = ApiResponse<{
  previusPage: number | null
  nextPage: number | null
  page: number
  totalPages: number
  data: Array<Room>
}>

export type CreateRoom = ApiResponse<
  Omit<Room, 'name' | 'questionsCount' | 'createdAt'>
>
