import {UpdateBookRepository} from 'App/domain/repository/book/update-book';
import {AddedBook} from '../domain/repository/book/add-book';

export class UpdateBookRepositoryMock implements UpdateBookRepository {
  input?: AddedBook
  output?: AddedBook
  async update(book: AddedBook) {
    this.input = book
    this.output = book
    return this.output
  }
}

