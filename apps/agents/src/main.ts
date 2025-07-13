import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { env } from './env'
import { patchNestJsSwagger } from 'nestjs-zod'
import fastifyMultipart from '@fastify/multipart'
import { Logger } from 'nestjs-pino'
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )
  app.useLogger(app.get(Logger))

  patchNestJsSwagger()
  const config = new DocumentBuilder()
    .setTitle('Agents API')
    .setDescription('The agents API description')
    .setVersion('1.0')
    .build()
  const document = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  //app.setGlobalPrefix('api')
  app.enableCors()
  app.register(fastifyMultipart, {
    attachFieldsToBody: true,
  })
  await app.listen(env.PORT ?? 3000)
}
bootstrap()
