import { AddAccountRepository } from 'App/domain/repository/add-account'
import { AddedAccount, UserAccountCandidate } from 'App/domain/repository/add-account'

export class AddAccountRepositoryMock implements AddAccountRepository {
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
