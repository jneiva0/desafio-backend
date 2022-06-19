import { Module } from '@nestjs/common'
import { AppController } from 'src/app.controller'
import { AppService } from 'src/app.service'
import { AuthModule } from 'src/auth/auth.module'
import { AuthService } from 'src/auth/auth.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { UsersService } from 'src/users/users.service'

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, UsersService, AuthService],
})
export class AppModule {}
