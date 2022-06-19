import { Module } from '@nestjs/common'
import { RestaurantsController } from './restaurants.controller'
import { RestaurantsService } from './restaurants.service'

@Module({
  providers: [RestaurantsService],
  controllers: [RestaurantsController],
})
export class RestaurantsModule {}
