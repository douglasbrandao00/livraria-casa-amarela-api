import {AddAccountRepository, AddedAccount, UserAccountCandidate} from 'App/domain/repository/add-account'
import {CheckAccountByEmailRepository} from 'root/src/domain/repository/check-account-by-email-repository'
import {makeBook} from 'root/test/factories'
import mongoHelper from './mongoHelper'
export class AccountRepository implements AddAccountRepository, CheckAccountByEmailRepository {
  async add(accountCandidate: UserAccountCandidate): Promise<AddedAccount> {
     const account = mongoHelper.getColletction('account')
     const result = await account?.insertOne(accountCandidate)
     console.log(result)
     return {
      id:'any_id',
      name: 'an_name',
      email: 'any_email@nanana.com',
    }
  }
  async check(email: string): Promise<boolean> {
     console.log(email)
     return false
  }
}
