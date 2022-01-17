import {BookIsRentedError, BookNotFoundError} from 'App/domain/use-cases/erros'
import {CheckBookExitenceByIdRepository} from 'App/domain/repository/book/check-book-existence-by-id'
import {CheckBookIsRentedByIdRepository} from 'App/domain/repository/book/check-book-is-rented-by-id'
import {UpdateBook} from 'App/domain/use-cases/book/update-book'
import {AddedBook} from 'App/domain/repository/book/add-book'
import {UpdateBookRepository} from 'App/domain/repository/book/update-book'

export type DbUpdateBookInput = {
  checkBookIsRentedByIdRepository: CheckBookIsRentedByIdRepository,
  checkBookExitenceByIdRepository : CheckBookExitenceByIdRepository,
  updateBookRepository: UpdateBookRepository
}
export class DbUpdateBook implements UpdateBook {
  constructor(private readonly input: DbUpdateBookInput){}
  async update(book: AddedBook): Promise<AddedBook | Error> {

    const { id: bookId } = book
    const exists = await this.input.checkBookExitenceByIdRepository.checkExistence(bookId)
    if(!exists) {
      return new BookNotFoundError(bookId)
    }

    const isRented = await this.input.checkBookIsRentedByIdRepository.isRented(bookId)
    if(isRented) {
      return new BookIsRentedError(bookId)
    }

    const updatedBook = await this.input.updateBookRepository.update(book)
    return updatedBook
  }
}
