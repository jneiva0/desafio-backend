//generate prisma seed file from prisma/schema.graphql
import { faker } from '@faker-js/faker'
import { Prisma, PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

faker.setLocale('pt_BR')

const prisma = new PrismaClient()

const createMenuItem = () => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price(1, 200)),
    imageSrc: faker.image.food(300, 300, true),
  }
}

const addRestaurant = async () => {
  const restaurant: Prisma.RestaurantCreateArgs = {
    data: {
      name: faker.company.companyName(2),
      phone: faker.phone.number(),
      address: faker.address.streetAddress(true),
      imageSrc: faker.image.business(480, 480, true),
      menu: {
        create: [
          createMenuItem(),
          createMenuItem(),
          createMenuItem(),
          createMenuItem(),
        ],
      },
    },
  }
  const createdRestaurant = await prisma.restaurant.create(restaurant)
  console.log(createdRestaurant)
}

const main = async () => {
  await addRestaurant()
  await addRestaurant()
  await addRestaurant()
  await addRestaurant()

  const user = await prisma.user.create({
    data: {
      email: 'fred@graodireto.com.br',
      password: await hash('123Fred', 12),
    },
  })
  console.log(user)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
