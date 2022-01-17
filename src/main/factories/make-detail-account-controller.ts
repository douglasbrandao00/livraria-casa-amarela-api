import {Controller} from "App/presentation/protocols";
import {BookMongoRepository} from "root/src/infra/database/mongo/book-repository";
import {DetailBookController, DetailBookControllerInput} from "root/src/presentation/books/detail-controller";
import {DbDetailBook, DbDetailBookInput} from "root/src/data/use-cases/books/db-detail-book";

export function makeDetailBookController(): Controller {
  const bookRepo = new BookMongoRepository()
  const detailBookInput: DbDetailBookInput = {
    showBookByIdRepository: bookRepo,
    checkBookExitenceByIdRepository: bookRepo,
  }
  const controllerInput: DetailBookControllerInput = {
    detailBook: new DbDetailBook(detailBookInput)
  }
  
  const controller = new DetailBookController(controllerInput)
  return controller
}



