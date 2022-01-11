import {
  MissingParamError,
  ServerError
} from 'App/presentation/erros'

import { makeBookRequest} from 'Test/factories'
import {UpdateBookController, UpdateBookControllerInput} from 'App/presentation/books/update-controller'
import {UpdateBookMock} from 'Test/mocks/update-book-mock'

function makeSut() {
  const updateBook = new UpdateBookMock()
  const input: UpdateBookControllerInput = {
    updateBook
  }
  const sut = new UpdateBookController(input)
  
  return {
    sut,
    updateBook
  }
}

describe('books/RegisterController', () => {
  test('Should return 400 if no title is provided', async () => {
    const bookCandidate = makeBookRequest()
    bookCandidate.body.title = ''

    const { sut } = makeSut()

    const res = await sut.handle(bookCandidate)

    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual(new MissingParamError('title'))
  })
  test('Should return 400 if no author is provided', async () => {
    const bookCandidate = makeBookRequest()
    bookCandidate.body.author = ''

    const { sut } = makeSut()

    const res = await sut.handle(bookCandidate)

    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual(new MissingParamError('author'))
  })
  test('Should return 400 if no description is provided', async () => {
    const bookCandidate = makeBookRequest()
    bookCandidate.body.description = ''

    const { sut } = makeSut()

    const res = await sut.handle(bookCandidate)

    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual(new MissingParamError('description'))
  })
  test('Should return 400 if no id is provided', async () => {
    const bookCandidate = makeBookRequest()
    bookCandidate.body.id = ''

    const { sut } = makeSut()

    const res = await sut.handle(bookCandidate)

    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual(new MissingParamError('id'))
  })
  test('Should return 400 if no rent is provided', async () => {
    const bookCandidate = makeBookRequest()
    bookCandidate.body.rent = ''

    const { sut } = makeSut()

    const res = await sut.handle(bookCandidate)

    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual(new MissingParamError('rent'))
  })

  test('Should return 406 if AddBook returns error', async () => {
    const bookCandidate = makeBookRequest()

    const { sut, updateBook } = makeSut()
    updateBook.update = () => new Error() as any

    const res = await sut.handle(bookCandidate)
    expect(res.statusCode).toBe(406)
  })
  test('Should call addBook use case with correct data', async () => {
    const bookCandidate = makeBookRequest()

    const { sut, updateBook } = makeSut()

    await sut.handle(bookCandidate)

    expect(bookCandidate.body).toEqual(updateBook.input)
  })
  test('Should return addBook output correctily', async () => {
    const bookCandidate = makeBookRequest()

    const { sut, updateBook } = makeSut()

    const res = await sut.handle(bookCandidate)

    expect(res.statusCode).toBe(201)
    expect(res.body).toEqual(updateBook.output)
  })
  test('Should throw if AddBook.add throws', async () => {
    const bookCandidate = makeBookRequest()

    const { sut, updateBook } = makeSut()
    updateBook.update = async() => {
      return new Promise(_ => {throw new Error()})
    }

    const res = await sut.handle(bookCandidate)

    expect(res.statusCode).toBe(500)
    expect(res.body).toEqual(new ServerError())
  })

})
