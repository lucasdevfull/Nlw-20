import { ApiResponse } from './base'

export type Room = {
  roomId: string
  name: string
  questionsCount: number
  createdAt: Date
}

export type GetRooms = ApiResponse<Array<Room>>

export type CreateRoom = ApiResponse<
  Omit<Room, 'name' | 'questionsCount' | 'createdAt'>
>
