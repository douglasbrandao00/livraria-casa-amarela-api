import { RemoveBook } from 'App/domain/use-cases/book/remove-book'
import {BookIsRentedError, BookNotFoundError} from 'App/domain/use-cases/erros'
import {CheckBookExitenceByIdRepository} from 'App/domain/repository/book/check-book-existence-by-id'
import {CheckBookIsRentedByIdRepository} from 'App/domain/repository/book/check-book-is-rented-by-id'
import {RemoveBookByIdRepository} from 'App/domain/repository/book/remove-book-by-id'

export type DbRemoveBookInput = {
  checkBookIsRentedByIdRepository: CheckBookIsRentedByIdRepository,
  checkBookExitenceByIdRepository : CheckBookExitenceByIdRepository
  removeBookByIdRepository : RemoveBookByIdRepository
}
export class DbRemoveBook implements RemoveBook {
  constructor(private readonly input: DbRemoveBookInput){}
  async remove(bookId: string): Promise<void | Error> {
    const exists = await this.input.checkBookExitenceByIdRepository.check(bookId)
    if(!exists) {
      return new BookNotFoundError(bookId)
    }

    const isRented = await this.input.checkBookIsRentedByIdRepository.check(bookId)
    if(isRented) {
      return new BookIsRentedError(bookId)
    }

    await this.input.removeBookByIdRepository.remove(bookId)
  }
}
