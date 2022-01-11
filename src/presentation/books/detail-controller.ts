import { Controller, HttpRequest, HttpResponse } from "../protocols";
import { badRequest, notAcceptable, created, internalServerError, success } from '../helpers/http-helper'
import {MissingParamError, ServerError} from "../erros";
import {BookCandidate} from "root/src/domain/repository/book/add-book";
import {DetailBook} from "root/src/domain/use-cases/book/detail-book";
import {ok} from "assert";

export type DetailBookControllerInput = {
  detailBook: DetailBook
}
export class DetailBookController implements Controller {
  constructor(private readonly input: DetailBookControllerInput){}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const param = httpRequest.param 

      const bookOrError = await this.input.detailBook.detail(param.bookId)
      if(bookOrError instanceof Error) {
        return notAcceptable(bookOrError)
      }
      return success(bookOrError)
    } catch(_error: any) {
      return internalServerError(new ServerError)
    }
  }
}
