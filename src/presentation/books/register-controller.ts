import { Controller, HttpRequest, HttpResponse } from "../protocols";
import { badRequest, created } from '../helpers/http-helper'
import {MissingParamError} from "../erros";

export class RegisterBookController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const missingParam = this.hasMissingParam(httpRequest)

    if(missingParam) {
      return badRequest(new MissingParamError(missingParam))
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
