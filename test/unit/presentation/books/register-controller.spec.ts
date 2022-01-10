import { 
  RegisterBookController,
  RegisterBookControllerInput
} from 'App/presentation/books/register-controller'
import {
  MissingParamError,
  BookAlreadyRegistredError,
  ServerError
} from 'App/presentation/erros'

import { CheckIsTitleInUseRepositoryMock, AddBookMock} from 'Test/mocks'

import {makeBookCandidateRequest as makeBookCandidate} from 'Test/factories'

function makeSut() {
  const checkIsTitleInUseRepository = new CheckIsTitleInUseRepositoryMock()
  const addBook = new AddBookMock()
  const input: RegisterBookControllerInput = {
    checkIsTitleInUseRepository,
    addBook
  }
  const sut = new RegisterBookController(input)
  
  return {
    sut,
    checkIsTitleInUseRepository,
    addBook
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
  test('Should return 400 if no description is provided', async () => {
    const bookCandidate = makeBookCandidate()
    bookCandidate.body.description = ''

    const { sut } = makeSut()

    const res = await sut.handle(bookCandidate)

    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual(new MissingParamError('description'))
  })
  
  test('Should call checkAccountByEmailRepository.check with correct data', async () => {
    const bookCandidate = makeBookCandidate()

    const { sut, checkIsTitleInUseRepository} = makeSut()

    await sut.handle(bookCandidate)

    expect(bookCandidate.body.title).toEqual(checkIsTitleInUseRepository.input)
  })//test correct input
  test('Should return 406 if book is already registred', async () => {
    const bookCandidate = makeBookCandidate()
    const {title} = bookCandidate.body

    const { sut, checkIsTitleInUseRepository } = makeSut()
    checkIsTitleInUseRepository.output = true

    const res = await sut.handle(bookCandidate)

    expect(res.statusCode).toBe(406)
    expect(res.body).toEqual(new BookAlreadyRegistredError(title))
  })
  test('Should throw if checkAccountByEmailRepository.check throws', async () => {
    const bookCandidate = makeBookCandidate()

    const { sut, checkIsTitleInUseRepository} = makeSut()
    checkIsTitleInUseRepository.check = async() => {
      return new Promise(_ => {throw new Error()})
    }

    const res = await sut.handle(bookCandidate)

    expect(res.statusCode).toBe(500)
    expect(res.body).toEqual(new ServerError())
  })
  test('Should call addBook use case with correct data', async () => {
    const bookCandidate = makeBookCandidate()

    const { sut, addBook } = makeSut()

    await sut.handle(bookCandidate)

    expect(bookCandidate.body).toEqual(addBook.input)
  })
  test('Should return addBook output correctily', async () => {
    const bookCandidate = makeBookCandidate()

    const { sut, addBook } = makeSut()

    const res = await sut.handle(bookCandidate)

    expect(res.statusCode).toBe(201)
    expect(res.body).toEqual(addBook.output)
  })
  test('Should throw if AddBook.add throws', async () => {
    const bookCandidate = makeBookCandidate()

    const { sut, addBook } = makeSut()
    addBook.add = async() => {
      return new Promise(_ => {throw new Error()})
    }

    const res = await sut.handle(bookCandidate)

    expect(res.statusCode).toBe(500)
    expect(res.body).toEqual(new ServerError())
  })

})
