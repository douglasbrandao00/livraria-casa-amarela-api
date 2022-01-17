import {Controller} from "App/presentation/protocols";
import {BookMongoRepository} from "root/src/infra/database/mongo/book-repository";
import {DbUpdateBook, DbUpdateBookInput} from "root/src/data/use-cases/books/db-update-book";
import {UpdateBookController, UpdateBookControllerInput} from "root/src/presentation/books/update-controller";
import {DeleteBookController, DeleteBookControllerInput} from "root/src/presentation/books/delete-controller";
import {DbRemoveBook, DbRemoveBookInput} from "root/src/data/use-cases/books/db-remove-book";

export function makeDeleteBookController(): Controller {
  const bookRepo = new BookMongoRepository()
  const removeBookInput: DbRemoveBookInput = {
    removeBookByIdRepository: bookRepo,
    checkBookExitenceByIdRepository: bookRepo,
    checkBookIsRentedByIdRepository: bookRepo
  }
  const controllerInput: DeleteBookControllerInput = {
    removeBook: new DbRemoveBook(removeBookInput) 
  }
  
  const controller = new DeleteBookController(controllerInput)
  return controller
}



