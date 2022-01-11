import {AddedBook} from 'App/domain/repository/book/add-book'

export interface UpdateBookRepository {
  update(book: AddedBook): Promise<AddedBook>
}
