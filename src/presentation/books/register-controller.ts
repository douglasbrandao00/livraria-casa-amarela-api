import { Controller, HttpRequest, HttpResponse } from "../protocols";
import { badRequest, notAcceptable, created } from '../helpers/http-helper'
import {BookAlreadyRegistredError, MissingParamError} from "../erros";
import {CheckIsBookRegistredRepository} from "App/domain/repository/book/check-is-book-registred";

export type RegisterBookControllerInput = {
  checkAccountByEmailRepository: CheckIsBookRegistredRepository
}
export class RegisterBookController implements Controller {
  constructor(private readonly input: RegisterBookControllerInput){}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const missingParam = this.hasMissingParam(httpRequest)

    if(missingParam) {
      return badRequest(new MissingParamError(missingParam))
    }
    const { title } = httpRequest.body
    const isRegistred = await this.input.checkAccountByEmailRepository.check(title)
    if(isRegistred) {
      return notAcceptable(new BookAlreadyRegistredError(title))
    }
    return created({})
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
