import { Injectable } from '@nestjs/common'
import { RoomsRepository } from '../repositories/rooms.repository'
import { CreateRoomDto } from 'src/dto/room.dto'
import { CreateRoom } from 'src/types/room.types'

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
