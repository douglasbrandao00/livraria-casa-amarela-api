import {AddedBook} from 'App/domain/repository/book/add-book'
export interface ShowBookByIdRepository {
  show(bookId: string): Promise<AddedBook>
}
