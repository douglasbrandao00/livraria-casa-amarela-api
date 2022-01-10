export class BookIsRentedError extends Error {
  constructor(bookId: string) {
    super(`invalid operation, ${bookId} is rented`)
  }
}
