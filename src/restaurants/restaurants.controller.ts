import { Controller, Get, Param } from '@nestjs/common'
import { RestaurantsService } from 'src/restaurants/restaurants.service'

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  getAll() {
    return this.restaurantsService.getRestaurants()
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.restaurantsService.getRestaurant(id)
  }
}
