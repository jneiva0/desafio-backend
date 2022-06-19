import { Prisma } from '@prisma/client'

//Middleware que faz o log do tempo de query do Prisma, nao faz diferenca para o desafio
//mas eu usei ele para dar debug em um erro que estava acontecendo
export function loggingMiddleware(): Prisma.Middleware {
  return async (params, next) => {
    const before = Date.now()

    const result = await next(params)

    const after = Date.now()

    console.log(
      `Query ${params.model}.${params.action} levou ${after - before}ms`,
    )

    return result
  }
}
