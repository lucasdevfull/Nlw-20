import { ApiResponse } from './base'

export type CreateRoom = {
  name: string
  description: string
}

export type Room = {
  roomId: string
  name: string
  questionsCount: number
  createdAt: Date
}

export type GetRoomsResponse = ApiResponse<{
  previusPage: number | null
  nextPage: number | null
  page: number
  totalPages: number
  data: Array<Room>
}>

export type CreateRoomResponse = ApiResponse<
  Omit<Room, 'name' | 'questionsCount' | 'createdAt'>
>
