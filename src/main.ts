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
  await app.listen(4000)
}
bootstrap()
