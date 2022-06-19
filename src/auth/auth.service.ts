import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PasswordService } from 'src/auth/password.service'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
  ) {}

  async createUser(
    payload: Prisma.UserCreateInput,
  ): Promise<{ accessToken: string }> {
    const saltedPassword = await this.passwordService.hashPassword(
      payload.password,
    )

    try {
      const user = await this.prisma.user.create({
        data: {
          email: payload.email,
          password: saltedPassword,
        },
      })

      return { accessToken: 'teste' }
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ConflictException(`Email ${payload.email} ja esta em uso.`)
        } else {
          throw new BadRequestException(err)
        }
      }
    }
  }
}
