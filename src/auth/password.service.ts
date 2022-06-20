import { Injectable } from '@nestjs/common'
import { compare, hash } from 'bcrypt'

//Servico para lidar com hash de senhas
@Injectable()
export class PasswordService {
  //TODO: Mover valor para um modulo dedicado para configs ou para um env var
  saltOrRounds = 12

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return compare(password, hashedPassword)
  }
  async hashPassword(password: string): Promise<string> {
    return hash(password, this.saltOrRounds)
  }
}
