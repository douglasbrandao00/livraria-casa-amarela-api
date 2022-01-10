import { RemoveBook } from 'App/domain/use-cases/book/remove-book'
import {CheckBookExitenceByIdRepository} from 'root/src/domain/repository/book/check-book-existence-by-id'
import {CheckBookIsRentedByIdRepository} from 'root/src/domain/repository/book/check-book-is-rented-by-id'

export type DbRemoveBookInput = {
  //checkBookIsRentedByIdRepository: CheckBookIsRentedByIdRepository,
  checkBookExitenceByIdRepository : CheckBookExitenceByIdRepository
}
export class DbRemoveBook implements RemoveBook {
  constructor(private readonly input: DbRemoveBookInput){}
  async remove(bookId: string): Promise<void> {
    await this.input.checkBookExitenceByIdRepository.check(bookId)
  }
}
