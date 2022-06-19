import { Module } from '@nestjs/common'
import { PrismaModule } from 'nestjs-prisma'
import { AppController } from 'src/app.controller'
import { AppService } from 'src/app.service'
import { AuthModule } from 'src/auth/auth.module'
import { AuthService } from 'src/auth/auth.service'
import { loggingMiddleware } from 'src/middleware/logging-middleware'
import { UsersService } from 'src/users/users.service'
import { RestaurantsModule } from './restaurants/restaurants.module'

@Module({
  imports: [
    AuthModule,
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [loggingMiddleware()],
        prismaOptions: {
          log: ['error', 'warn'],
        },
      },
    }),
    RestaurantsModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersService, AuthService],
})
export class AppModule {}
