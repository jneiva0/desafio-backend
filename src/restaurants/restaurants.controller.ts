import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import {
  RestaurantResponse,
  RestaurantWithMenuResponse,
  SearchResponse,
} from 'src/restaurants/restaurants.dto'
import { RestaurantsService } from 'src/restaurants/restaurants.service'

@ApiTags('restaurants')
@ApiBearerAuth()
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(): Promise<RestaurantResponse[]> {
    return this.restaurantsService.getRestaurants()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id') id: string): Promise<RestaurantWithMenuResponse> {
    return this.restaurantsService.getRestaurant(id)
  }

  @UseGuards(JwtAuthGuard)
  @Get('search/:searchInput')
  search(@Param('searchInput') searchInput: string): Promise<SearchResponse> {
    return this.restaurantsService.searchRestaurantsAndMenus(searchInput)
  }
}
