import { Controller, HttpRequest, HttpResponse } from "../protocols";
import { badRequest, notAcceptable, created, internalServerError } from '../helpers/http-helper'
import {BookAlreadyRegistredError, MissingParamError, ServerError} from "../erros";
import {CheckIsTitleInUseRepository} from "App/domain/repository/book/check-is-book-registred";
import {BookCandidate} from "root/src/domain/repository/book/add-book";
import {AddBook} from "root/src/domain/use-cases/book/add-book";

export type RegisterBookControllerInput = {
  checkIsTitleInUseRepository: CheckIsTitleInUseRepository,
  addBook: AddBook
}
export class RegisterBookController implements Controller {
  constructor(private readonly input: RegisterBookControllerInput){}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const missingParam = this.hasMissingParam(httpRequest)

      if(missingParam) {
        return badRequest(new MissingParamError(missingParam))
      }
      const bookCandidate = httpRequest.body as BookCandidate
      const { title } = bookCandidate
      const isRegistred = await this.input.checkIsTitleInUseRepository.check(title)
      if(isRegistred) {
        return notAcceptable(new BookAlreadyRegistredError(title))
      }
      const registredBook = await this.input.addBook.add(bookCandidate)
      return created(registredBook)
    } catch(_error: any) {
      return internalServerError(new ServerError)
    }
  }
  hasMissingParam(httpRequest: HttpRequest): string | void {
    const requiredParams = ['title', 'author', 'description']

    for( const param of requiredParams ) {
      if(!httpRequest.body[param]) {
        return param
      }
    }
  }
}
