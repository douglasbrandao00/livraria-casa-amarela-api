import {AddAccountRepository, AddedAccount, UserAccountCandidate} from 'App/domain/repository/add-account'
import {CheckAccountByEmailRepository} from 'root/src/domain/repository/check-account-by-email-repository'
import {makeBook} from 'root/test/factories'
import mongoHelper from './mongoHelper'
export class AccountRepository implements AddAccountRepository, CheckAccountByEmailRepository {
  async add(accountCandidate: UserAccountCandidate): Promise<AddedAccount> {
     const account = mongoHelper.getColletction('account')
     if(!account) throw new Error('no collection')
     const result = await account.insertOne(accountCandidate)
     const docId = result.insertedId.id
     console.log("::;",docId)
     return {
      id:'any_id',
      name: 'an_name__0987',
      email: 'any_email@nanana.com',
    }
  }
  async check(email: string): Promise<boolean> {
     return false
  }
}
