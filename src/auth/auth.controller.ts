import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { AuthService } from 'src/auth/auth.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CurrentUser } from 'src/users/user.decorator'
import { AuthToken, LoginDto, RegisterDto, UserResponse } from './auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AuthToken> {
    return this.authService.login(loginDto)
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<AuthToken> {
    return this.authService.createUser(registerDto)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@CurrentUser() user: User): Promise<UserResponse> {
    //Retirando a senha da resposta da query, com mais tempo faria uma solucao mais elegante.
    //Minha ideia era mapear os tipos gerados do prisma para gerar automaticamente os DTOs e Responses para o Swagger

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...resposta } = user
    return resposta
  }
}
