import {AddedBook} from 'App/domain/repository/book/add-book'
export interface ShowBookRepository {
  show(): Promise<AddedBook[]>
}
