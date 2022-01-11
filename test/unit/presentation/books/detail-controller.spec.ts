import {ServerError} from 'App/presentation/erros'
import {DetailBookMock} from 'Test/mocks/detail-book-mock'
import {DetailBookController, DetailBookControllerInput} from 'App/presentation/books/detail-controller'

function makeSut() {
  const detailBook = new DetailBookMock()
  const input: DetailBookControllerInput = {
    detailBook
  }
  const sut = new DetailBookController(input)
  
  return {
    sut,
    detailBook
  }
}

describe('books/RegisterController', () => {
   test('Should return 406 if AddBook returns error', async () => {
    const bookId =  {param: {bookId: 'any_id'}}

    const { sut, detailBook } = makeSut()
    detailBook.detail = () => new Error() as any

    const res = await sut.handle(bookId)

    expect(res.statusCode).toBe(406)
  })
  test('Should call detailBook use case with correct data', async () => {
    const bookId =  {param: {bookId: 'any_id'}}
    const { sut, detailBook } = makeSut()
    
    await sut.handle(bookId)

    expect(bookId.param.bookId).toEqual(detailBook.input)
  })
  test('Should return addBook output correctily', async () => {
    const bookId =  {param: {bookId: 'any_id'}}

    const { sut, detailBook } = makeSut()

    const res = await sut.handle(bookId)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(detailBook.output)
  })
  test('Should return 500 if removeBook throws', async () => {
    const bookId =  {param: {bookId: 'any_id'}}

    const { sut, detailBook } = makeSut()
    detailBook.detail = async() => {
      return new Promise(_ => {throw new Error()})
    }

    const res = await sut.handle(bookId)

    expect(res.statusCode).toBe(500)
    expect(res.body).toEqual(new ServerError())
  })
})
