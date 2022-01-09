export type UserAccountCandidate = {
  name: string,
  email: string,
  password: string
}

export type AddedAccount = {
  id: string,
  name: string,
  email: string,
}

export interface AddAccountRepository {
  add(accountCandidate: UserAccountCandidate): Promise<AddedAccount>
}

