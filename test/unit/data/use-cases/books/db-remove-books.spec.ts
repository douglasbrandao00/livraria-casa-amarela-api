
import {DbRemoveBook, DbRemoveBookInput} from 'App/data/use-cases/books/db-remove-book';
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
  });
})
