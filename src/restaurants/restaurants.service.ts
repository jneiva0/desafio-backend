import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class RestaurantsService {
  constructor(private readonly prisma: PrismaService) {}

  async getRestaurants() {
    return this.prisma.restaurant.findMany()
  }

  async getRestaurant(id: string) {
    return this.prisma.restaurant.findUnique({
      where: { id },
      include: {
        menu: true,
      },
    })
  }
}
