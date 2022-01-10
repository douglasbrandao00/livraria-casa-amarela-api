import bcrypt from 'bcrypt'

import { BcryptAdapter } from 'App/infra/bcrypt-adapter'

jest.mock('bcrypt', () => {
  return {
    async hash(_text: string): Promise<string> {
      return 'encrypted'
    }
  }
})



function makeSut() {
  const BCRYPT_SALT_ROUNDS = 12
  const sut = new BcryptAdapter(BCRYPT_SALT_ROUNDS)

  return {
    sut,
    salt: BCRYPT_SALT_ROUNDS
  }
}

describe('Bcrypt Adapter', () => {
  describe('encrypt()', () => {
    test('Should call hash with correct values', async () => {
      const { sut, salt } = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.encrypt('any_value')
      expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    })

    test('Should return a valid hash on hash success', async () => {
      const { sut } = makeSut()
      const hash = await sut.encrypt('any_value')
      expect(hash).toBe('encrypted')
    })

    test('Should throw if hash throws', async () => {
      const { sut } = makeSut()
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(async() => { throw new Error() })
      const promise = sut.encrypt('any_value')
      await expect(promise).rejects.toThrow()
    })
  })
})
