import { Module } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import { PasswordService } from 'src/auth/password.service'

@Module({
  providers: [AuthService, PasswordService],
})
export class AuthModule {}
