import { Injectable } from '@nestjs/common'
import { RoomsRepository } from '../repositories/rooms.repository'
import { CreateRoomDto } from 'src/dto/room.dto'

@Injectable()
export class RoomsService {
  constructor(private roomsRepository: RoomsRepository) {}

  async getRooms() {
    return await this.roomsRepository.getAll()
  }

  async createRoom(data: CreateRoomDto) {
    return await this.roomsRepository.create(data)
  }
}
