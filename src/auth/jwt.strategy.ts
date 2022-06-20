import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { User } from '@prisma/client'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtDto } from 'src/auth/auth.dto'
import { AuthService } from 'src/auth/auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  async validate(payload: JwtDto): Promise<User> {
    const user = await this.authService.validateUser(payload.userId)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
