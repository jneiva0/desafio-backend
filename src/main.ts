import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { PrismaService } from 'nestjs-prisma'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // As linhas abaixo evitam um problema que ocorre ao encerrar o processo
  // mais info em: https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
  const prismaService: PrismaService = app.get(PrismaService)
  prismaService.enableShutdownHooks(app)
  app.enableCors({ origin: ['http://localhost:3000'] })

  // A linha abaixo evita que ocorra erros de validação, exemplo: um parametro id que é um numero mas foi passado como uma string na request
  // Para casos simples apenas setar "transform: true" resolve. Em um App real seria feita uma configuracao usando DTOs e configurando regras de validacao na API
  // O conceito de Pipes do NestJS é bem poderoso.
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      transform: true,
    }),
  )

  await app.listen(4000)
}
bootstrap()
