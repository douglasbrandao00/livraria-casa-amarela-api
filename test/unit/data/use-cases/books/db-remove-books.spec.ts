
import {DbRemoveBook, DbRemoveBookInput} from 'App/data/use-cases/books/db-remove-book';
import {BookIsRentedError, BookNotFoundError} from 'App/domain/use-cases/erros';
import {CheckBookExitenceByIdRepositoryMock, CheckBookIsRentedByIdRepositoryMock} from 'Test/mocks'

function makeSut() {
  const checkBookExitenceByIdRepository = new CheckBookExitenceByIdRepositoryMock()
  const checkBookIsRentedByIdRepository = new CheckBookIsRentedByIdRepositoryMock()
  const sutInput: DbRemoveBookInput = {
    checkBookIsRentedByIdRepository,
    checkBookExitenceByIdRepository
  }
  const sut = new DbRemoveBook(sutInput)

  return {
    sut,
    checkBookIsRentedByIdRepository,
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
  test('Should call checkBookIsRentedByIdRepository with correct data', async() => {
    const bookId = 'any_id'
    const {sut, checkBookIsRentedByIdRepository  } = makeSut()

    await sut.remove(bookId)

    expect(checkBookIsRentedByIdRepository.input).toBe(bookId);
  })
  test('Should return a error if book is rented', async() => {
    const bookId = 'any_id'
    const {sut, checkBookIsRentedByIdRepository  } = makeSut()
    checkBookIsRentedByIdRepository.output = true

    const removed = await sut.remove(bookId)

    expect(removed).toEqual(new BookIsRentedError(bookId));
  })
  test('Should throw if checkBookIsRentedByIdRepository throws', async() => {
    const bookId = 'any_id'
    const {sut, checkBookIsRentedByIdRepository  } = makeSut()
    checkBookIsRentedByIdRepository.check = async (id: string) => new Promise(_ => {throw new Error()})


    const promise = sut.remove(bookId)

    expect(promise).rejects.toThrow()
  })

})
