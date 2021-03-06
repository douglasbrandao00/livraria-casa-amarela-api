import {badRequest, created, internalServerError} from "App/presentation/helpers/http-helper"
import {HttpRequest, HttpResponse, EmailValidator, Controller} from "App/presentation/protocols"

import { AddAccount } from "App/domain/use-cases/add-account"
import { UserAccountCandidate} from "App/domain/repository/add-account"
import { CheckAccountByEmailRepository } from "App/domain/repository/check-account-by-email-repository"
import {
  InvalidPassword,
  MissingParamError,
  InvalidParam,
  ServerError
} from "App/presentation/erros"


export type SignUpControllerTypes = {
  addAccount: AddAccount
  emailValidator: EmailValidator,
  checkAccountByEmailRepository: CheckAccountByEmailRepository,
}
export class SignUpController implements Controller {
  constructor(private readonly input: SignUpControllerTypes){}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try { 
      const missingParam = this.getMissingParam(httpRequest) 
      if(missingParam) return badRequest(new MissingParamError(missingParam))

      if(this.isPasswordInvalid(httpRequest)){
        return badRequest(new InvalidPassword())
      } 

      if(this.isEmailInvalid(httpRequest.body.email)) {
        return badRequest(new InvalidParam('email'))
      }

      const isEmailInUse = await this.checkIfEmailIsInUse(httpRequest.body.email)
      if(isEmailInUse) {
        return badRequest(new InvalidParam('email'))
      }

      const accountCandidate: UserAccountCandidate = {
        name: httpRequest.body.name,
        email: httpRequest.body.email,
        password: httpRequest.body.password,
      }

      const newAccount = await this.input.addAccount.add(accountCandidate)
      return created(newAccount)
    } catch(_error) {
      console.log(_error)
      return internalServerError(new ServerError())
    }
  }

  getMissingParam(httpRequest: HttpRequest): string | void {
    const requiredFields = ['name', 'email', 'password', 'confirmPassword']
    for (const field of requiredFields) {
      if(!httpRequest.body[field]) {
         return field
      }
    }
  }
  isPasswordInvalid(httpRequest: HttpRequest) {
    return httpRequest.body.password !== httpRequest.body.confirmPassword
  }
  isEmailInvalid(email: string): boolean {
    return !this.input.emailValidator.isValid(email)
  }
  async checkIfEmailIsInUse(email: string) {
    return this.input.checkAccountByEmailRepository.check(email)
  }
}
