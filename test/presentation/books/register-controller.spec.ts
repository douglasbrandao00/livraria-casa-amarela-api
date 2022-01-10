import { 
  RegisterBookController,
  RegisterBookControllerInput
} from 'App/presentation/books/register-controller'
import {
  MissingParamError,
  BookAlreadyRegistredError,
  ServerError
} from 'App/presentation/erros'
import {HttpRequest} from 'App/presentation/protocols'
import {BookCandidate, AddedBook} from 'root/src/domain/repository/book/add-book'
import {CheckIsBookRegistredRepository} from 'root/src/domain/repository/book/check-is-book-registred'
import {AddBook} from 'root/src/domain/use-cases/book/add-book'

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

class AddBookMock implements AddBook {
  input?: BookCandidate
  output?: AddedBook
  add(candidate: BookCandidate): Promise<AddedBook> {
    this.input = candidate
    const added: AddedBook = Object.assign(
      {},
      candidate,
      {id: 'any_id'},
      {rent: {isRented: false}}
    )

    this.output = added
    return new Promise(res => res(added))
  }
}

function makeSut() {
  const checkAccountByEmailRepository = new CheckIsBookRegistredRepositoryMock()
  const addBook = new AddBookMock()
  const input: RegisterBookControllerInput = {
    checkAccountByEmailRepository,
    addBook
  }
  const sut = new RegisterBookController(input)
  
  return {
    sut,
    checkAccountByEmailRepository,
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
  //test correct input
  test('Should return 406 if book is already registred', async () => {
    const bookCandidate = makeBookCandidate()
    const {title} = bookCandidate.body

    const { sut, checkAccountByEmailRepository } = makeSut()
    checkAccountByEmailRepository.output = true

    const res = await sut.handle(bookCandidate)

    expect(res.statusCode).toBe(406)
    expect(res.body).toEqual(new BookAlreadyRegistredError(title))
  })
  test('Should throw if checkAccountByEmailRepository.check throws', async () => {
    const bookCandidate = makeBookCandidate()

    const { sut, checkAccountByEmailRepository } = makeSut()
    checkAccountByEmailRepository.check = async() => {
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

})
