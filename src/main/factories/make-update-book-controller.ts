import {Controller} from "App/presentation/protocols";
import {BookMongoRepository} from "root/src/infra/database/mongo/book-repository";
import {DbUpdateBook, DbUpdateBookInput} from "root/src/data/use-cases/books/db-update-book";
import {UpdateBookController, UpdateBookControllerInput} from "root/src/presentation/books/update-controller";

export function makeUpdateBookController(): Controller {
  const bookRepo = new BookMongoRepository()
  const updateBookInput: DbUpdateBookInput = {
    updateBookRepository: bookRepo,
    checkBookExitenceByIdRepository: bookRepo,
    checkBookIsRentedByIdRepository: bookRepo
  }
  const controllerInput: UpdateBookControllerInput = {
    updateBook: new DbUpdateBook(updateBookInput) 
  }
  
  const controller = new UpdateBookController(controllerInput)
  return controller
}



