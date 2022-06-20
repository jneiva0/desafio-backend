import { User } from '@prisma/client'
import { IsEmail } from 'class-validator'

export class JwtDto {
  // poderia ser usado o email tambem, mas preciso dar uma revisada em JWT para ter certeza se é uma boa pratica
  userId: string
  /**
   * Issued at
   */
  iat: number
  /**
   * Expiration time
   */
  exp: number
}

// Em um app maior seria melhor essa classe ficar em outro arquivo para criar uma separacao clara entre
// modelos, dtos e outras definicoes
//TODO: Implementar refreshToken se sobrar tempo
export class AuthToken {
  accessToken: string
}
export class LoginDto {
  @IsEmail()
  email: string
  password: string
}

export class RegisterDto {
  @IsEmail()
  email: string
  password: string
}

export class UserResponse implements Omit<User, 'password'> {
  id: string
  createdAt: Date
  email: string
}
