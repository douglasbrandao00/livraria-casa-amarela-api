import { CheckBookExitenceByIdRepository } from '../domain/repository/book/check-book-existence-by-id';

export class CheckBookExitenceByIdRepositoryMock implements CheckBookExitenceByIdRepository {
  input?: string
  output = false
  async check(bookId: string) {
    this.input = bookId
    return this.output
  }
}

