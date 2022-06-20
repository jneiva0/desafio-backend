import { ValidationPipe } from '@nestjs/common'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // A linha abaixo evita que ocorra erros de validação, exemplo: um parametro id que é um numero mas foi passado como uma string na request
  // Para casos simples apenas setar "transform: true" resolve. Em um App real seria feita uma configuracao usando DTOs e configurando regras de validacao na API
  // O conceito de Pipes do NestJS é bem poderoso.
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      transform: true,
    }),
  )
  // As linhas abaixo evitam um problema que ocorre ao encerrar o processo
  // mais info em: https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
  const prismaService: PrismaService = app.get(PrismaService)
  prismaService.enableShutdownHooks(app)

  app.enableCors({ origin: ['http://localhost:3000'] })

  // Prisma Client Exception Filter for unhandled exceptions
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

  //Usando Swagger para facilitar exportar os tipos da API direto para o frontend
  //Nao tem muito uso em um mvp mas em um app grande ajuda bastante a manter uma boa arquitetura
  const config = new DocumentBuilder()
    .setTitle('CookedIn API')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(4000)
}
bootstrap()
