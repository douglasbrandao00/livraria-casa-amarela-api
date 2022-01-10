import { CheckAccountByEmailRepository } from 'App/domain/repository/check-account-by-email-repository';

export class CheckAccountByEmailRepositoryMock implements CheckAccountByEmailRepository {
  input?: string
  output = false
  async check(email: string) {
    this.input = email
    return this.output
  }
}

