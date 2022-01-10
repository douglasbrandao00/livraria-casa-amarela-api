import { Encrypter } from 'App/domain/use-cases/protocols/encrypter'

export class EncrypterMock implements Encrypter {
  output = 'encryped'
  input?:string
  async encrypt(plaintext: string): Promise<string> {
      this.input = plaintext
      return new Promise(resolve => resolve(this.output))
  }
}

