import { Injectable } from '@nestjs/common'
import { compare, hash } from 'bcrypt'

@Injectable()
export class PasswordService {
  //TODO: Mover valor para um modulo dedicado para configs ou para um env var
  saltOrRounds = 12

  validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword)
  }
  hashPassword(password: string): Promise<string> {
    return hash(password, this.saltOrRounds)
  }
}
