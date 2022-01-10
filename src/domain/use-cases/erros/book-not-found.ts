export class BookNotFoundError extends Error {
  constructor(bookId: string) {
    super(`Could not find book with id: ${bookId}`)
    this.name = 'BookNotFound'
  }
}
