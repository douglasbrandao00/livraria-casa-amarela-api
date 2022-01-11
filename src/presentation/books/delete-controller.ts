import { Controller, HttpRequest, HttpResponse } from "../protocols";
import { notAcceptable, internalServerError, noContent } from '../helpers/http-helper'
import {ServerError} from "../erros";
import {RemoveBook} from "App/domain/use-cases/book/remove-book";

export type DeleteBookControllerInput = {
  removeBook: RemoveBook
}
export class DeleteBookController implements Controller {
  constructor(private readonly input: DeleteBookControllerInput){}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const param = httpRequest.param 
     
      const removedOrError = await this.input.removeBook.remove(param.bookId)
      if(removedOrError instanceof Error) {
        return notAcceptable(removedOrError)
      }
      return noContent()
    } catch(_error: any) {
      return internalServerError(new ServerError)
    }
  }
}
