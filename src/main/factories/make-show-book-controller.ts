import {Controller} from "App/presentation/protocols";
import {BookMongoRepository} from "root/src/infra/database/mongo/book-repository";
import {ShowBookController, ShowBookControllerInput} from "root/src/presentation/books/show-controller";
export function makeShowBookController(): Controller {
  const bookRepo = new BookMongoRepository()
  const controllerInput: ShowBookControllerInput = {
    showBookRepository: bookRepo
  }
  
  const controller = new ShowBookController(controllerInput)
  return controller
}



