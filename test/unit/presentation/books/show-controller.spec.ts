import {ServerError} from 'App/presentation/erros'
import {ShowBookController, ShowBookControllerInput} from 'App/presentation/books/show-controller'
import {ShowBookRepositoryMock} from 'Test/mocks/show-book-mock'

function makeSut() {
  const showBookRepository = new ShowBookRepositoryMock()
  const input: ShowBookControllerInput = {
    showBookRepository
  }
  const sut = new ShowBookController(input)
  
  return {
    sut,
    showBookRepository
  }
}

describe('books/RegisterController', () => {
  test('Should return detailBook output correctily', async () => {
    const bookId =  {param: {bookId: 'any_id'}}

    const { sut, showBookRepository } = makeSut()

    const res = await sut.handle(bookId)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(showBookRepository.output)
  })
  test('Should return 500 if detailBook throws', async () => {
    const bookId =  {param: {bookId: 'any_id'}}

    const { sut, showBookRepository } = makeSut()
    showBookRepository.show = async() => new Promise((_) => {throw new Error})

    const res = await sut.handle(bookId)

    expect(res.statusCode).toBe(500)
    expect(res.body).toEqual(new ServerError())
  })
})
