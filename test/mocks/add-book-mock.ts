import {BookCandidate, AddedBook} from 'App/domain/repository/book/add-book'
import {AddBook} from 'App/domain/use-cases/book/add-book'

export class AddBookMock implements AddBook {
  input?: BookCandidate
  output?: AddedBook
  add(candidate: BookCandidate): Promise<AddedBook> {
    this.input = candidate
    const added: AddedBook = Object.assign(
      {},
      candidate,
      {id: 'any_id'},
      {rent: {isRented: false}}
    )

    this.output = added
    return new Promise(res => res(added))
  }
}
