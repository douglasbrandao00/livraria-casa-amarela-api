import {BookNotFoundError} from 'App/domain/use-cases/erros'
import {CheckBookExitenceByIdRepository} from 'App/domain/repository/book/check-book-existence-by-id'
import {CheckBookIsRentedByIdRepository} from 'App/domain/repository/book/check-book-is-rented-by-id'
import {ShowBookByIdRepository} from 'App/domain/repository/book/show-book-by-id'
import {AddedBook} from 'root/src/domain/repository/book/add-book'
import {DetailBook} from 'root/src/domain/use-cases/book/detail-book'

export type DbDetailBookInput = {
  checkBookExitenceByIdRepository : CheckBookExitenceByIdRepository
  showBookByIdRepository : ShowBookByIdRepository
}
export class DbDetailBook implements DetailBook {
  constructor(private readonly input: DbDetailBookInput){}
  async detail(bookId: string): Promise<AddedBook | Error> {
    const exists = await this.input.checkBookExitenceByIdRepository.checkExistence(bookId)
    if(!exists) {
      return new BookNotFoundError(bookId)
    }

    const book = await this.input.showBookByIdRepository.showById(bookId)
    return book
  }
}
