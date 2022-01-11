import {AddBook} from 'App/domain/use-cases/book/add-book'
import {BookCandidate, AddedBook, AddBookRepository} from 'App/domain/repository/book/add-book'

import {CheckIsTitleInUseRepository} from "App/domain/repository/book/check-is-title-in-use";
import { BookAlreadyRegistredError } from 'App/domain/use-cases/erros/book-already-regisred-error';

export type DbAddBookInput = {
  addBookRepository: AddBookRepository
  checkIsTitleInUseRepository: CheckIsTitleInUseRepository,
}
export class DbAddBook implements AddBook {
  constructor(private readonly input: DbAddBookInput){}

  async add(candidate: BookCandidate): Promise<AddedBook | Error> {
    const { title } = candidate
    const isRegistred = await this.input.checkIsTitleInUseRepository.check(title)
    if(isRegistred) {
      console.log('is in use', isRegistred)
      return new BookAlreadyRegistredError(title)
    }
    
    const candidateWithDefaultRent = Object.assign(
      {},
      candidate,
      {rent: {isRented: false}}
    )
   
    const addedBook = await this.input.addBookRepository.add(candidateWithDefaultRent)  
    return addedBook
  }
}
