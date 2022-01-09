import bcrypt from 'bcrypt'
import { Encrypter } from '../../src/domain/use-cases/protocols/encrypter'


export class BcryptAdapter implements Encrypter {
  constructor(private readonly saltRoutes: number){}

  async encrypt(text: string): Promise<string> {
    const encrypted = await bcrypt.hash(text, this.saltRoutes)
    return encrypted
  }
}
