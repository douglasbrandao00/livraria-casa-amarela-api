import {HttpRequest, HttpResponse} from 'App/presentation/protocols/http'
export interface Controller {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>
}
