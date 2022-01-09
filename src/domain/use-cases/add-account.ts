import {UserAccountCandidate, AddedAccount} from 'App/domain/repository/add-account'

export interface AddAccount {
  add: (userCandidate: UserAccountCandidate) => Promise<AddedAccount>
}
