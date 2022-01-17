import {AddedBook} from 'App/domain/repository/book/add-book'
export interface ShowBookByIdRepository {
  showById(bookId: string): Promise<AddedBook>
}
