
import {DbDetailBook, DbDetailBookInput} from 'App/data/use-cases/books/db-detail-book';
import {BookNotFoundError} from 'App/domain/use-cases/erros';
import {ShowBookByIdRepositoryMock,CheckBookExitenceByIdRepositoryMock} from 'Test/mocks'

function makeSut() {
  const checkBookExitenceByIdRepository = new CheckBookExitenceByIdRepositoryMock()
  const showBookByIdRepository = new ShowBookByIdRepositoryMock()

  const sutInput: DbDetailBookInput = {
    checkBookExitenceByIdRepository,
    showBookByIdRepository
  }
  const sut = new DbDetailBook(sutInput)

  return {
    sut,
    checkBookExitenceByIdRepository,
    showBookByIdRepository
  }
}
describe('books/DbRemoveBook', () => {
  test('Should call checkBookExitenceByIdRepository with correct data', async() => {
    const bookId = 'any_id'
    const {sut, checkBookExitenceByIdRepository } = makeSut()

    await sut.detail(bookId)

    expect(checkBookExitenceByIdRepository.input).toBe(bookId);
  })
  test('Should return a error if book do not exists', async() => {
    const bookId = 'any_id'
    const {sut, checkBookExitenceByIdRepository } = makeSut()
    checkBookExitenceByIdRepository.output = false

    const removed = await sut.detail(bookId)

    expect(removed).toEqual(new BookNotFoundError(bookId));
  })
  test('Should throw if checkBookExitenceByIdRepository throws', async() => {
    const bookId = 'any_id'
    const {sut, checkBookExitenceByIdRepository } = makeSut()
    checkBookExitenceByIdRepository.checkExistence = async () => new Promise(_ => {throw new Error()})

    const promise = sut.detail(bookId)

    expect(promise).rejects.toThrow()
  })

    test('Should call ShowBookByIdRepository with correct data', async() => {
    const bookId = 'any_id'
    const {sut, showBookByIdRepository } = makeSut()

    await sut.detail(bookId)

    expect(showBookByIdRepository.input).toBe(bookId);
  })
  test('Should return a error if book is rented', async() => {
    const bookId = 'any_id'
    const {sut, showBookByIdRepository} = makeSut()

    const book = await sut.detail(bookId)

    expect(book).toEqual(showBookByIdRepository.output);
  })
  test('Should throw if ShowBookByIdRepository throws', async() => {
    const bookId = 'any_id'
    const {sut, showBookByIdRepository} = makeSut()
    showBookByIdRepository.show = async () => new Promise(_ => {throw new Error()})

    const promise = sut.detail(bookId)

    expect(promise).rejects.toThrow()
  })

})
