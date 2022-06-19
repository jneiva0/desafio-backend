//generate prisma seed file from prisma/schema.graphql
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const main = async () => {
  const user = await prisma.user.upsert({
    where: { email: 'fred@graodireto.com.br' },
    update: {},
    create: {
      email: 'fred@graodireto.com.br',
      password: '123Fred',
    },
  })

  const restaurant = await prisma.restaurant.upsert({
    where: { name: 'Graodireto' },
    update: {},
    create: {
      name: 'Graodireto',
      phone: '389998888',
      address: 'Rua Graodireto, 123',
      menu: {
        create: [
          {
            name: 'Pizza',
            description: 'Pizza de calabresa',
            price: 34.5,
          },
          {
            name: 'Guarana',
            description: 'Guaraná Antartica',
            price: 3.5,
          },
        ],
      },
    },
  })

  console.log({ user, restaurant })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
