import { Injectable } from '@nestjs/common'
import { RoomsRepository } from '@repository/rooms.repository'
import { CreateRoom } from '@/types/room.types'

@Injectable()
export class RoomsService {
  constructor(private roomsRepository: RoomsRepository) {}

  async getRooms(limit: number, page: number) {
    return await this.roomsRepository.getAll(limit, page)
  }

  async createRoom(data: CreateRoom) {
    return await this.roomsRepository.create(data)
  }
}
