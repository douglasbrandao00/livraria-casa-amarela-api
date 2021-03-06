import { DbAddAccount } from 'App/data/use-cases/db-add-account'

import { makeUserCandidate } from 'Test/factories'

import { 
  EncrypterMock,
  AddAccountRepositoryMock
} from 'Test/mocks'


function makeSut () {
  const encrypter = new EncrypterMock()
  const addAccountRepository = new AddAccountRepositoryMock()

  const sutInput = {
    encrypter,
    addAccountRepository
  }

  const sut = new DbAddAccount(sutInput)
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
  test('Should throw if addAccountRepository throws', async() => {
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
