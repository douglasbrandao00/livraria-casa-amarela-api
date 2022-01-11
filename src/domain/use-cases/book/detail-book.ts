import {AddedBook} from 'App/domain/repository/book/add-book'
export interface DetailBook {
  detail(bookId: string): Promise<AddedBook | Error>
}
