import {
  AddBookRepository,
  BookCandidateWithDefaultRent,
  AddedBook
} from 'App/domain/repository/book/add-book'


export class AddBookRepositoryMock implements AddBookRepository {
  input?: BookCandidateWithDefaultRent
  output?: AddedBook

  async add(candidate: BookCandidateWithDefaultRent): Promise<AddedBook> {
    this.input = candidate

    const output: AddedBook = Object.assign(
      {},
      candidate,
      {id: 'any_id'}
    )

    this.output = output
    return new Promise(res => res(output))
  }
}

