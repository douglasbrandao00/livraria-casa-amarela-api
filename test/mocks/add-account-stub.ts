import { AddAccount } from 'App/domain/use-cases/add-account';
import { AddedAccount, UserAccountCandidate } from 'App/domain/repository/add-account';

export class AddAccountStub implements AddAccount {
  userCandidate?: UserAccountCandidate
  createdAccountId = 'any_id'
  async add(candidate: UserAccountCandidate): Promise<AddedAccount> {
      this.userCandidate = candidate
      const {password, ...candidateWithoutPsw} = candidate
      const createdAccount = Object.assign(
        {},
        candidateWithoutPsw,
        {id: this.createdAccountId})
      return new Promise(resolve => resolve(createdAccount as AddedAccount))
  }
}

