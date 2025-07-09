import { GoogleGenAI } from '@google/genai'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { env } from 'src/env'

@Injectable()
export class GeminiService implements OnModuleInit {
  private gemini: GoogleGenAI
  private model: string = 'gemini-2.5-flash'
  onModuleInit() {
    this.gemini = new GoogleGenAI({
      apiKey: env.GEMINI_API_KEY,
    })
  }

  async transcribeAudio(data: string, mimeType: string): Promise<string> {
    const { text } = await this.gemini.models.generateContent({
      model: this.model,
      contents: [
        {
          text: 'Transcreva o áudio para português do Brasil. Seja preciso e natural na transcrição. Mantenha a pontuação adequada e divida o texto em parágrafos quando for apropriado.',
        },
        { inlineData: { mimeType, data } },
      ],
    })

    if (!text) {
      throw new Error('Não foi possível converter o áudio')
    }
    return text
  }

  async generateEmbeddings(text: string): Promise<number[]> {
    const { embeddings } = await this.gemini.models.embedContent({
      model: 'text-embedding-004',
      contents: [{ text }],
      config: {
        taskType: 'RETRIEVAL_DOCUMENT',
      },
    })

    if (!embeddings?.[0].values) {
      throw new Error('Não foi possível gerar os embeddings.')
    }

    return embeddings[0].values
  }

  async generateAnswer(
    question: string,
    transcriptions: string[]
  ): Promise<string> {
    const context = transcriptions.join('\n\n')

    const prompt = `
    Com base no texto fornecido abaixo como contexto, responda a pergunta de forma clara e precisa em português do Brasil.
  
    CONTEXTO:
    ${context}

    PERGUNTA:
    ${question}

    INSTRUÇÕES:
    - Use apenas informações contidas no contexto enviado;
    - Se a resposta não for encontrada no contexto, apenas responda que não possui informações suficientes para responder;
    - Seja objetivo;
    - Mantenha um tom educativo e profissional;
    - Cite trechos relevantes do contexto se apropriado;
    - Se for citar o contexto, utilize o temo "conteúdo da aula";
  `.trim()

    const { text } = await this.gemini.models.generateContent({
      model: this.model,
      contents: [{ text: prompt }],
    })

    if (!text) {
      throw new Error('Falha ao gerar resposta pelo Gemini')
    }

    return text
  }
}
