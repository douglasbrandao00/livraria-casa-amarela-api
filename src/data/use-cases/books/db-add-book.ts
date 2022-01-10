import {AddBook} from 'App/domain/use-cases/book/add-book'
import {BookCandidate, AddedBook, AddBookRepository} from 'root/src/domain/repository/book/add-book'

export class DbAddBook implements AddBook {
  constructor(private readonly addBookrepository: AddBookRepository){}

  async add(candidate: BookCandidate): Promise<AddedBook> {
    const candidateWithDefaultRent = Object.assign(
      {},
      candidate,
      {rent: {isRented: false}}
    )
    const addedBook = await this.addBookrepository.add(candidateWithDefaultRent)  
    return addedBook
  }
}
