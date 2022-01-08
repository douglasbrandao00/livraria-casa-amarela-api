export type UserAccountCandidate = {
  name: string,
  email: string,
  password: string
}

export type AddedAccount = {
  id: string,
  name: string,
  email: string,
  password: string
}

export interface AddAccount {
  //add: (userCandidate: UserAccountCandidate) => Promise<AddedAccount>
  add(userCandidate: UserAccountCandidate): AddedAccount
}
