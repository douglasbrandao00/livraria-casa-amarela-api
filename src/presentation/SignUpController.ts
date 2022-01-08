import {InvalidPassword, MissingParamError} from "./erros"
import {badRequest} from "./helpers/http-helper"
import {HttpRequest, HttpResponse} from "./protocols/http"

export class SignUpController {
  requiredFields = ['name', 'email', 'password', 'confirmPassword']

  handle(httpRequest: HttpRequest): HttpResponse {
  
    for (const field of this.requiredFields) {
      if(!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    if(httpRequest.body.password !== httpRequest.body.confirmPassword) {
      return badRequest(new InvalidPassword)
    }
    return {
      statusCode: 200,
    }
  }
}
