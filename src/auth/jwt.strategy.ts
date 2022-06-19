import { Injectable } from '@nestjs/common'

@Injectable()
export class JwtStrategy extends PassportStrategy {}
