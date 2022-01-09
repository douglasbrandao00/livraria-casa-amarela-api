import {UserAccountCandidate} from 'App/domain/use-cases/add-account'

export interface AddAccountRepository {
  add(accountCandidate: UserAccountCandidate): Promise<void>
}

