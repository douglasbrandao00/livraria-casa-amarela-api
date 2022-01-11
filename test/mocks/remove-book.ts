import {RemoveBook} from 'App/domain/use-cases/book/remove-book'

export class RemoveBookMock implements RemoveBook {
  input?: string
  output?: Error
  // @ts-ignore
  remove(bookId: string): Promise<void | Error> {
    this.input = bookId
    if(this.output) {
      return new Promise(_ => this.output as Error)
    }
  }
}
