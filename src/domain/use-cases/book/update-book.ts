import {AddedBook} from 'App/domain/repository/book/add-book'

export interface UpdateBook {
  update(book: AddedBook): Promise<AddedBook | Error>
}
