import { createParamDecorator, ExecutionContext } from '@nestjs/common'

//Esse decorator é usado para facilitar pegar o usuario logado que foi colocado na request pela lib passport
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
  },
)
