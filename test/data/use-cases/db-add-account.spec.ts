import { DbAddAccount } from 'App/data/use-cases/db-add-account'
import { Encrypter } from 'App/domain/use-cases/protocols/encrypter'
import { AddAccountRepository } from 'App/domain/repository/add-account'
import { AddedAccount, UserAccountCandidate } from 'App/domain/repository/add-account'

function makeUserCandidate(): UserAccountCandidate {
  return {
    name: 'an_name',
    email: 'any_email@nanana.com',
    password: 'any_password',
  }
}

class EncrypterMock implements Encrypter {
  output = 'encryped'
  input?:string
  async encrypt(plaintext: string): Promise<string> {
      this.input = plaintext
      return new Promise(resolve => resolve(this.output))
  }
}

class AddAccountRepositoryMock implements AddAccountRepository {
  input?: UserAccountCandidate
  output?: AddedAccount
  async add(candidate: UserAccountCandidate): Promise<AddedAccount> {
    this.input = candidate
    const addedAcc: AddedAccount = {
      id: 'any_id',
      name: candidate.name,
      email: candidate.email,
    }

    this.output = addedAcc
    return addedAcc
  }
}

function makeSut () {
  const encrypter = new EncrypterMock()
  const addAccountRepository = new AddAccountRepositoryMock()
  const sut = new DbAddAccount(encrypter, addAccountRepository)
  return {
    encrypter,
    addAccountRepository,
    sut
  }
}

describe('DbAddAccount', () => {
  test('Should call encrypter with correct value', async() => {
    const candidate = makeUserCandidate()
    const { sut, encrypter } = makeSut()

    await sut.add(candidate)

    expect(encrypter.input).toBe(candidate.password);
  })
  test('Should throw if encrypter throws', async() => {
    const candidate = makeUserCandidate()
    const { sut, encrypter } = makeSut()
    encrypter.encrypt = async() => new Promise((_) => {throw new Error()})

    const promise = sut.add(candidate)

    expect(promise).rejects.toThrow();
  })
  test('Should throw if encrypter throws', async() => {
    const candidate = makeUserCandidate()
    const { sut, addAccountRepository } = makeSut()
    addAccountRepository.add = async() => new Promise((_) => {throw new Error()})

    const promise = sut.add(candidate)

    expect(promise).rejects.toThrow();
  })
  test('Should persist data with correct values', async() => {
    const candidate = makeUserCandidate()
    const { sut, encrypter, addAccountRepository } = makeSut()
    
    const encrypedPsw = encrypter.output
    await sut.add(candidate)
    const addedAcc = addAccountRepository.input

    expect(addedAcc!.password).toBe(encrypedPsw);
    expect(addedAcc!.name).toBe(candidate.name);
    expect(addedAcc!.email).toBe(candidate.email);
  })
  test('Should return correct data', async() => {
    const candidate = makeUserCandidate()
    const { sut, addAccountRepository } = makeSut()
    
    const sutResult = await sut.add(candidate)
    const addedAcc = addAccountRepository.output

    expect(addedAcc).toEqual(sutResult);
  })
})
