import {Controller} from "App/presentation/protocols";
import {RegisterBookController, RegisterBookControllerInput} from 'App/presentation/books/register-controller'
import {DbAddBook, DbAddBookInput} from "root/src/data/use-cases/books/db-add-book";
import {BookMongoRepository} from "root/src/infra/database/mongo/book-repository";

export function makeRegisterBookController(): Controller {
  const addBookInput: DbAddBookInput = {
    addBookRepository: new BookMongoRepository(),
    checkIsTitleInUseRepository: new BookMongoRepository()
  }
  const controllerInput: RegisterBookControllerInput = {
    addBook: new DbAddBook(addBookInput) 
  }
  
  const controller = new RegisterBookController(controllerInput)
  return controller
}



