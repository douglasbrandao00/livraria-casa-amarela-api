import {BookCandidate, AddedBook} from 'App/domain/repository/book/add-book'

export interface AddBook {
  add(bookCandidate: BookCandidate): Promise<AddedBook>
}
