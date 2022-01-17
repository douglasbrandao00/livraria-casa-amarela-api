import {ShowBookByIdRepository} from "App/domain/repository/book/show-book-by-id"
import {makeBook} from 'Test/factories'
import {AddedBook} from "../domain/repository/book/add-book"

export class ShowBookByIdRepositoryMock implements ShowBookByIdRepository {
  input?: string
  output:AddedBook = makeBook()
  async showById(bookId: string) {
    this.input = bookId
    return this.output
  }
}

