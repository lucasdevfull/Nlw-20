import { Injectable } from '@nestjs/common'
import { QuestionsRepository } from '@repository/questions.repository'
import type { CreateQuestion } from '@/types/questions.types'
import { GeminiService } from '@infra/gemini/gemini.service'
import type { MultipartFile } from '@fastify/multipart'

@Injectable()
export class QuestionsService {
  constructor(
    private geminiService: GeminiService,
    private questionsRepository: QuestionsRepository
  ) {}

  async getAllByRoom(roomId: string) {
    return await this.questionsRepository.getAll(roomId)
  }

  async createQuestion({ question, roomId }: CreateQuestion) {
    const embeddings = await this.geminiService.generateEmbeddings(question)
    const embedingsAsString = `[${embeddings.join(',')}]`
    const chunks = await this.questionsRepository.getSimilarityByRoom(
      roomId,
      embedingsAsString
    )

    let answer: string | null = null

    if (chunks.length > 0) {
      const transcription = chunks.map(chunk => chunk.transcription)

      answer = await this.geminiService.generateAnswer(question, transcription)
    }

    return await this.questionsRepository.create({ question, roomId, answer })
  }

  async processAudio(audio: MultipartFile, roomId: string) {
    const buffer = await audio.toBuffer()
    const audioBase64 = buffer.toString('base64')
    const transcription = await this.geminiService.transcribeAudio(
      audioBase64,
      audio.mimetype
    )

    const embeddings =
      await this.geminiService.generateEmbeddings(transcription)
    return await this.questionsRepository.createAudio(
      roomId,
      transcription,
      embeddings
    )
  }
}
