import {InvalidPassword, MissingParamError, InvalidParam, ServerError} from "./erros"
import {badRequest, internalServerError} from "./helpers/http-helper"
import {HttpRequest, HttpResponse, EmailValidator} from "./protocols"

export class SignUpController {
  constructor(private readonly emailValidator: EmailValidator){}
  requiredFields = ['name', 'email', 'password', 'confirmPassword']

  handle(httpRequest: HttpRequest): HttpResponse {
    try { 
      for (const field of this.requiredFields) {
        if(!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      if(httpRequest.body.password !== httpRequest.body.confirmPassword) {
        return badRequest(new InvalidPassword)
      }

      if(!this.emailValidator.isValid(httpRequest.body.email)) {
        return badRequest(new InvalidParam('email'))
      }
      return {
        statusCode: 200,
      }
    } catch(_error) {
      return internalServerError(new ServerError())
    }
  }
}
