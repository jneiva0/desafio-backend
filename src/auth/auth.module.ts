import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from 'src/auth/auth.service'
import { JwtStrategy } from 'src/auth/jwt.strategy'
import { PasswordService } from 'src/auth/password.service'
import { AuthController } from './auth.controller'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      //TODO: Implementar um config module/service para lidar com variaveis de ambiente
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, PasswordService, JwtStrategy, PasswordService],
  controllers: [AuthController],
})
export class AuthModule {}
