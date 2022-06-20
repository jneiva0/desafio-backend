import { Injectable } from '@nestjs/common'

//Criei esse servico mas no momento ele nao tem utilidade ja que o MVP nao possui funcionalidade de troca de senha, atualizar perfil etc..
//Acredito que as funcoes de login,register e getMe ficam melhores no auth.service

import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
}
