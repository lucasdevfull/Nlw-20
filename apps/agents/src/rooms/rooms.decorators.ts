import { createParamDecorator } from '@nestjs/common'
import type { FastifyRequest } from 'fastify'

export const File = createParamDecorator(async (_data, ctx) => {
  const request = ctx.switchToHttp().getRequest<FastifyRequest>()
  return await request.file()
})
