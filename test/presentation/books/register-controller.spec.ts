import { RegisterBookController } from 'App/presentation/books/register-controller'
import {MissingParamError} from 'App/presentation/erros'
import {badRequest} from 'App/presentation/helpers/http-helper'
import {HttpRequest} from 'App/presentation/protocols'

function makeBookCandidate(): HttpRequest {
  return {
    body: {
      title: "clean code",
      subtitle: "A Handbook of Agile Software Craftsmanship",
      author: 'Robert C. Martin',
      description: 'Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn’t have to be that way.'
    }  
  }
}

function makeSut() {
  const sut = new RegisterBookController()
  
  return {
    sut
  }
}

describe('books/RegisterController', () => {
  test('Should return 400 if no title is provided', async () => {
    const bookCandidate = makeBookCandidate()
    bookCandidate.body.title = ''

    const { sut } = makeSut()

    const res = await sut.handle(bookCandidate)

    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual(new MissingParamError('title'))
  })
  test('Should return 400 if no author is provided', async () => {
    const bookCandidate = makeBookCandidate()
    bookCandidate.body.author = ''

    const { sut } = makeSut()

    const res = await sut.handle(bookCandidate)

    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual(new MissingParamError('author'))
  })
})
