import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { AuthToken, JwtDto, LoginDto, RegisterDto } from 'src/auth/auth.dto'
import { PasswordService } from 'src/auth/password.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}

  async createUser(payload: RegisterDto): Promise<AuthToken> {
    try {
      const hashedPassword = await this.passwordService.hashPassword(
        payload.password,
      )

      const user = await this.prisma.user.create({
        data: {
          email: payload.email,
          password: hashedPassword,
        },
      })
      return this.generateAuthToken({ userId: user.id })
    } catch (err) {
      console.log(err)
      if (err.code === 'P2002') {
        throw new ConflictException(`Email ${payload.email} ja esta em uso.`)
      } else {
        throw new BadRequestException(err)
      }
    }
  }

  //Atualmente esse metodo revela se o email fornecido existe no sistema e depois revela se a senha esta correta para
  //o email fornecido. Para aumentar a segurança, poderia ser informado apenas algo como "email ou senha nao coincidem"
  async login({ email, password }: LoginDto): Promise<AuthToken> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    })
    if (!user) {
      throw new NotFoundException(`Email ${email} nao encontrado.`)
    }
    const isPasswordValid = await this.passwordService.validatePassword(
      password,
      user.password,
    )
    if (!isPasswordValid) {
      throw new BadRequestException('Senha invalida.')
    }
    return this.generateAuthToken({ userId: user.id })
  }

  //Pensei nessa funcao mas ela so seria usada se eu tivesse mais tempo para trabalhar o MVP
  // com coisas do tipo trabalhar melhor o JWT para garantir mais segurança, melhorar a validacao, refresh no token etc..
  //Irei deixa-la apenas como referencia
  async getUserFromToken(token: string): Promise<User> {
    const decodedToken = this.jwtService.decode(token) as JwtDto
    return this.prisma.user.findUnique({
      where: { id: decodedToken.userId },
    })
  }

  async validateUser(userId: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: userId } })
  }

  private generateAuthToken(payload: { userId: string }): AuthToken {
    const accessToken = this.jwtService.sign(payload)
    return { accessToken }
  }
}
