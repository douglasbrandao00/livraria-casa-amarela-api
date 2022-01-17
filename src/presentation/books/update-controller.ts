import { Controller, HttpRequest, HttpResponse } from "../protocols";
import { badRequest, notAcceptable, created, internalServerError } from '../helpers/http-helper'
import {MissingParamError, ServerError} from "../erros";
import {AddedBook} from "root/src/domain/repository/book/add-book";
import {UpdateBook} from "root/src/domain/use-cases/book/update-book";

export type UpdateBookControllerInput = {
  updateBook: UpdateBook
}
export class UpdateBookController implements Controller {
  constructor(private readonly input: UpdateBookControllerInput){}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const missingParam = this.hasMissingParam(httpRequest)

      if(missingParam) {
        return badRequest(new MissingParamError(missingParam))
      }
      const book = httpRequest.body as AddedBook
     
      const updatedBookOrError = await this.input.updateBook.update(book)
      if(updatedBookOrError instanceof Error) {
        return notAcceptable(updatedBookOrError)
      }
      return created(updatedBookOrError)
    } catch(_error: any) {
        console.log(_error)
      return internalServerError(new ServerError)
    }
  }
  hasMissingParam(httpRequest: HttpRequest): string | void {
    const requiredParams = ['id', 'rent', 'title', 'author', 'description']

    for( const param of requiredParams ) {
      if(!httpRequest.body[param]) {
        return param
      }
    }
  }
}
