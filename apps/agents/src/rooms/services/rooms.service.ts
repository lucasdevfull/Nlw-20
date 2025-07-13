import { Injectable } from '@nestjs/common'
import { RoomsRepository } from '../repositories/rooms.repository'
import { CreateRoomDto } from 'src/dto/room.dto'

@Injectable()
export class RoomsService {
  constructor(private roomsRepository: RoomsRepository) {}

  async getRooms(limit: number, page: number) {
    return await this.roomsRepository.getAll(limit, page)
  }

  async createRoom(data: CreateRoomDto) {
    return await this.roomsRepository.create(data)
  }
}
