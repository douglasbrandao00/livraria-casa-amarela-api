import {AccountModel} from 'App/infra/database/mongo/schema/account'
import {AddAccountRepository, AddedAccount, UserAccountCandidate} from 'App/domain/repository/add-account'
import {CheckAccountByEmailRepository} from 'root/src/domain/repository/check-account-by-email-repository'
import {makeBook} from 'root/test/factories'
import mongoHelper from './mongoHelper'
export class AccountRepository implements AddAccountRepository, CheckAccountByEmailRepository {
  async add(accountCandidate: UserAccountCandidate): Promise<AddedAccount> {
    const accountDb = new AccountModel(accountCandidate)
    await accountDb.save()
    const account = {
      id: accountDb._id,
      name: accountDb.name,
      email: accountDb.email,
    }
     return account
  }

  async check(email: string): Promise<boolean> {
    const account = await AccountModel.find({email})
    console.log(">>>")
    console.log(email)
    console.log(account.length)
    if(account.length) return true
    return false
  }
}
