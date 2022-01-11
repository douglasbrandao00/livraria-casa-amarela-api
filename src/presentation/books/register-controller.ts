import { Controller, HttpRequest, HttpResponse } from "../protocols";
import { badRequest, notAcceptable, created, internalServerError } from '../helpers/http-helper'
import {MissingParamError, ServerError} from "../erros";
import {BookCandidate} from "root/src/domain/repository/book/add-book";
import {AddBook} from "root/src/domain/use-cases/book/add-book";

export type RegisterBookControllerInput = {
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
     
      const registredBookOrError = await this.input.addBook.add(bookCandidate)
      if(registredBookOrError instanceof Error) {
        return notAcceptable(registredBookOrError)
      }
      return created(registredBookOrError)
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
