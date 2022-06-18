import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

//Esse servico abstrai o PrismaClient e faz o trabalho de inicializar o PrismaClient e conectar ao DB

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // Opcional, sem essa funcao o Prisma vai conectar ao DB de forma lazy na primeira chamada ao DB
  // Prefiro garantir que a conexao com o banco esta funcionando logo na inicializacao do servico
  async onModuleInit() {
    await this.$connect()
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close()
    })
  }
}
