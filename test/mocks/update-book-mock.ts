import {AddedBook} from 'App/domain/repository/book/add-book'
import {UpdateBook} from 'App/domain/use-cases/book/update-book'

export class UpdateBookMock implements UpdateBook {
  input?: AddedBook
  output?: AddedBook
  update(book: AddedBook): Promise<AddedBook | Error> {
    this.input = book
    this.output = book
    
    return new Promise(res => res(this.output as AddedBook))
  }
}
