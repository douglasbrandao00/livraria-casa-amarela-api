import { HttpResponse } from "../protocols/http"

export function badRequest(error: Error): HttpResponse {
  return {
    statusCode: 400,
    body: error
  }
}
export function notAcceptable(error: Error): HttpResponse {
  return {
    statusCode: 406,
    body: error
  }
}
export function internalServerError(error: Error): HttpResponse {
  return {
    statusCode: 500,
    body: error
  }
}

export function created(content: any): HttpResponse {
  return {
    statusCode: 201,
    body: content
  }
}
export function noContent(): HttpResponse {
  return {
    statusCode: 204,
  }
}
export function success(content: any): HttpResponse {
  return {
    statusCode: 200,
    body: content
  }
}
