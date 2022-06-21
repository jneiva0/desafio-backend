import { ApiProperty } from '@nestjs/swagger'
import { MenuItem, Restaurant } from '@prisma/client'

export class RestaurantResponse implements Restaurant {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  phone: string
  imageSrc: string
  address: string
}

export class MenuItemResponse implements MenuItem {
  imageSrc: string
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  description: string
  price: number
  restaurantId: string
}

export class RestaurantWithMenuResponse extends RestaurantResponse {
  @ApiProperty({ isArray: true, type: MenuItemResponse })
  menu: MenuItem[]
}

export class SearchResponse {
  @ApiProperty({ isArray: true, type: RestaurantResponse })
  restaurants: RestaurantResponse[]
  @ApiProperty({ isArray: true, type: MenuItemResponse })
  itens: MenuItem[]
}
