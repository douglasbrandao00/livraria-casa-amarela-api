
import {DbRemoveBook, DbRemoveBookInput} from 'App/data/use-cases/books/db-remove-book';
import {BookNotFoundError} from 'App/domain/use-cases/erros';
import {CheckBookExitenceByIdRepositoryMock} from 'Test/mocks'

function makeSut() {
  const checkBookExitenceByIdRepository = new CheckBookExitenceByIdRepositoryMock()
  const sutInput: DbRemoveBookInput = {
    checkBookExitenceByIdRepository
  }
  const sut = new DbRemoveBook(sutInput)

  return {
    sut,
    checkBookExitenceByIdRepository
  }
}
describe('books/DbRemoveBook', () => {
  test('Should call checkBookExitenceByIdRepository with correct data', async() => {
    const bookId = 'any_id'
    const {sut, checkBookExitenceByIdRepository } = makeSut()

    await sut.remove(bookId)

    expect(checkBookExitenceByIdRepository.input).toBe(bookId);
  })
  test('Should return a error if book do not exists', async() => {
    const bookId = 'any_id'
    const {sut, checkBookExitenceByIdRepository } = makeSut()
    checkBookExitenceByIdRepository.output = false

    const removed = await sut.remove(bookId)

    expect(removed).toEqual(new BookNotFoundError(bookId));
  })
  test('Should throw if checkBookExitenceByIdRepository throws', async() => {
    const bookId = 'any_id'
    const {sut, checkBookExitenceByIdRepository } = makeSut()
    checkBookExitenceByIdRepository.check = async (id: string) => new Promise(_ => {throw new Error()})


    const promise = sut.remove(bookId)

    expect(promise).rejects.toThrow()
  })
})
