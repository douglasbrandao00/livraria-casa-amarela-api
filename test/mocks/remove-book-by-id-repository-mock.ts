import {RemoveBookByIdRepository} from '../domain/repository/book/remove-book-by-id';

export class RemoveBookByIdRepositoryMock implements RemoveBookByIdRepository {
  input?: string
  async remove(bookId: string) {
    this.input = bookId
  }
}

