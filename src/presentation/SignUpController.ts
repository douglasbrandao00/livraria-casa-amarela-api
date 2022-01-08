import {badRequest, internalServerError} from "./helpers/http-helper"
import {HttpRequest, HttpResponse, EmailValidator} from "./protocols"

import {
  InvalidPassword,
  MissingParamError,
  InvalidParam,
  ServerError
} from "./erros"
import {AddAccount, UserAccountCandidate} from "@src/domain/use-cases/add-account"

export type SignUpControllerTypes = {
  addAccount: AddAccount
  emailValidator: EmailValidator,
}
export class SignUpController {
  constructor(private readonly input: SignUpControllerTypes){}

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

      if(!this.input.emailValidator.isValid(httpRequest.body.email)) {
        return badRequest(new InvalidParam('email'))
      }

      const accountCandidate: UserAccountCandidate = {
        name: httpRequest.body.name,
        email: httpRequest.body.email,
        password: httpRequest.body.password,
      }
      const newAccount = this.input.addAccount.add(accountCandidate)
      return {
        statusCode: 201,
        body: newAccount
      }
    } catch(_error) {
      return internalServerError(new ServerError())
    }
  }
}
