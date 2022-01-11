import {
  MissingParamError,
  ServerError
} from 'App/presentation/erros'

import {makeBookCandidateRequest as makeBookCandidate} from 'Test/factories'
import {RemoveBookMock} from 'Test/mocks/remove-book'
import {DeleteBookController, DeleteBookControllerInput} from 'App/presentation/books/delete-controller'

function makeSut() {
  const removeBook = new RemoveBookMock()
  const input: DeleteBookControllerInput = {
    removeBook
  }
  const sut = new DeleteBookController(input)
  
  return {
    sut,
    removeBook
  }
}

describe('books/RegisterController', () => {
   test('Should return 406 if AddBook returns error', async () => {
    const bookId =  {param: {bookId: 'any_id'}}

    const { sut, removeBook } = makeSut()
    removeBook.remove = () => new Error() as any

    const res = await sut.handle(bookId)

    expect(res.statusCode).toBe(406)
  })
  test('Should call addBook use case with correct data', async () => {
    const bookId =  {param: {bookId: 'any_id'}}
    const { sut, removeBook } = makeSut()
    
    await sut.handle(bookId)

    expect(bookId.param.bookId).toEqual(removeBook.input)
  })
  test('Should return addBook output correctily', async () => {
    const bookId =  {param: {bookId: 'any_id'}}

    const { sut } = makeSut()

    const res = await sut.handle(bookId)

    expect(res.statusCode).toBe(204)
    expect(res.body).toBeUndefined()
  })
  test('Should return 500 if removeBook throws', async () => {
    const bookId =  {param: {bookId: 'any_id'}}

    const { sut, removeBook } = makeSut()
    removeBook.remove = async() => {
      return new Promise(_ => {throw new Error()})
    }

    const res = await sut.handle(bookId)

    expect(res.statusCode).toBe(500)
    expect(res.body).toEqual(new ServerError())
  })

})
