import { CheckIsTitleInUseRepository } from 'App/domain/repository/book/check-is-title-in-use'

export class CheckIsTitleInUseRepositoryMock implements CheckIsTitleInUseRepository {
  input?: string
  output = false
  async check(title: string): Promise<boolean> {
    this.input = title
    return this.output
  }
}
