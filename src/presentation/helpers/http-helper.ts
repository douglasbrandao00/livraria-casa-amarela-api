import { HttpResponse } from "../protocols/http"

export function badRequest(error: Error): HttpResponse {
  return {
    statusCode: 400,
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
