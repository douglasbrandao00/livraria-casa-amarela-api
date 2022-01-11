import {AddedBook} from 'App/domain/repository/book/add-book'
import {DetailBook} from '../domain/use-cases/book/detail-book'
import {makeBook} from '../factories'

export class DetailBookMock implements DetailBook {
  input?: string
  output: AddedBook = makeBook()
  async detail(bookId: string): Promise<AddedBook | Error> {
    this.input = bookId

    return new Promise(res => res(this.output as AddedBook))
  }
}
