import { AddAccount } from 'App/domain/use-cases/add-account'
import { Encrypter } from 'App/domain/use-cases/protocols/encrypter'
import { AddAccountRepository } from 'App/domain/repository/add-account'
import { UserAccountCandidate, AddedAccount } from 'App/domain/repository/add-account'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ){}
  async add(candidate: UserAccountCandidate):Promise<AddedAccount>{
    const encrypedPsw = await this.encrypter.encrypt(candidate.password)
    const persistCandidate: UserAccountCandidate = {
      name: candidate.name,
      email: candidate.email,
      password: encrypedPsw
    }
    const account = await this.addAccountRepository.add(persistCandidate)
    return account
  }
}
