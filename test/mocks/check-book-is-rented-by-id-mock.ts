
import {CheckBookIsRentedByIdRepository} from 'root/src/domain/repository/book/check-book-is-rented-by-id'
export class CheckBookIsRentedByIdRepositoryMock implements CheckBookIsRentedByIdRepository {
  input?: string
  output = false
  async isRented(bookId: string) {
    this.input = bookId
    return this.output
  }
}

