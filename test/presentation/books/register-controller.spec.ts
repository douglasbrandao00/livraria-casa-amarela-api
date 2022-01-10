import { 
  RegisterBookController,
  RegisterBookControllerInput
} from 'App/presentation/books/register-controller'
import {
  MissingParamError,
  BookAlreadyRegistredError
} from 'App/presentation/erros'
import {HttpRequest} from 'App/presentation/protocols'
import {CheckIsBookRegistredRepository} from 'root/src/domain/repository/book/check-is-book-registred'

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

class CheckIsBookRegistredRepositoryMock implements CheckIsBookRegistredRepository {
  input?: string
  output = false
  async check(title: string): Promise<boolean> {
    this.input = title
    return this.output
  }
}

function makeSut() {
  const checkAccountByEmailRepository = new CheckIsBookRegistredRepositoryMock()
  const input: RegisterBookControllerInput = {
    checkAccountByEmailRepository
  }
  const sut = new RegisterBookController(input)
  
  return {
    sut,
    checkAccountByEmailRepository
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
  test('Should return 406 if book is already registred', async () => {
    const bookCandidate = makeBookCandidate()
    const {title} = bookCandidate.body

    const { sut, checkAccountByEmailRepository } = makeSut()
    checkAccountByEmailRepository.output = true

    const res = await sut.handle(bookCandidate)

    expect(res.statusCode).toBe(406)
    expect(res.body).toEqual(new BookAlreadyRegistredError(title))
  })


})
