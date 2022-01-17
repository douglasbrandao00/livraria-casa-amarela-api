import { Controller, HttpRequest, HttpResponse } from "../protocols";
import { notAcceptable, internalServerError, success } from '../helpers/http-helper'
import {ServerError} from "../erros";
import { ShowBookRepository } from "root/src/domain/repository/book/show-book";

export type ShowBookControllerInput = {
  showBookRepository: ShowBookRepository
}
export class ShowBookController implements Controller {
  constructor(private readonly input: ShowBookControllerInput){}
  async handle(_httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const bookOrError = await this.input.showBookRepository.show()
     /**
        if(bookOrError instanceof Error) {
        return notAcceptable(bookOrError)
      }**/

      return success(bookOrError)
    } catch(_error: any) {
      return internalServerError(new ServerError)
    }
  }
}
