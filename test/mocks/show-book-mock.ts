import {ShowBookRepository} from "App/domain/repository/book/show-book"
import {makeBook} from 'Test/factories'
import {AddedBook} from "../domain/repository/book/add-book"

const output = [makeBook(), makeBook()]

export class ShowBookRepositoryMock implements ShowBookRepository {
  input?: string
  output:AddedBook[] = output
  async show() {
    return this.output
  }
}

