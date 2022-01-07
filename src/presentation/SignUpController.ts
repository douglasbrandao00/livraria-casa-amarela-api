import {MissingParamError} from "./erros/missing-param-error"
import {badRequest} from "./helpers/http-helper"
import {HttpRequest, HttpResponse} from "./protocols/http"

export class SignUpController {
  requiredFields = ['name', 'email', 'password', 'confirmPassword']

  handle(httpRequest: HttpRequest): HttpResponse {
  
    for (const field of this.requiredFields) {
      if(!httpRequest.body[field]) {
        return badRequest( new MissingParamError(field))
      }
    }

    return {
      statusCode: 200,
    }
  }
}
