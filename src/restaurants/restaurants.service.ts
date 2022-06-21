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

  //Em um Produto real eu gostaria de testar uma busca usando o recurso de Streams do NodeJS
  //Que retornaria os resultados a medida que as promises fossem resolvidas.
  //Exemplo: Caso a Promise dos restaurantes fosse resolvida primeiro a API ja iria retornar os restaurantes pro cliente
  //E caso a Promise dos menus fosse resolvida primeiro a API ja iria retornar os menus pro cliente
  //Na implementação atual a resposta só é retornada quando os dois resultados forem resolvidos.
  async searchRestaurantsAndMenus(searchInput: string) {
    const restaurants = await this.prisma.restaurant.findMany({
      where: {
        name: {
          contains: searchInput,
          mode: 'insensitive',
        },
      },
    })
    const itens = await this.prisma.menuItem.findMany({
      where: {
        OR: [
          { name: { contains: searchInput, mode: 'insensitive' } },
          { description: { contains: searchInput, mode: 'insensitive' } },
        ],
      },
    })
    return { restaurants, itens }
  }
}
