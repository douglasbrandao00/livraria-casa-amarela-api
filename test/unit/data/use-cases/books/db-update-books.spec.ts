
import {BookIsRentedError, BookNotFoundError} from 'App/domain/use-cases/erros';
import {DbUpdateBook, DbUpdateBookInput} from 'App/data/use-cases/books/db-update-book';
import {CheckBookExitenceByIdRepositoryMock, CheckBookIsRentedByIdRepositoryMock,UpdateBookRepositoryMock} from 'Test/mocks'
import {makeBook} from 'Test/factories';

function makeSut() {
  const checkBookExitenceByIdRepository = new CheckBookExitenceByIdRepositoryMock()
  const checkBookIsRentedByIdRepository = new CheckBookIsRentedByIdRepositoryMock()
  const updateBookRepository = new UpdateBookRepositoryMock 
  const sutInput: DbUpdateBookInput = {
    checkBookIsRentedByIdRepository,
    checkBookExitenceByIdRepository,
    updateBookRepository
  }
  const sut = new DbUpdateBook(sutInput)

  return {
    sut,
    checkBookIsRentedByIdRepository,
    checkBookExitenceByIdRepository,
    updateBookRepository
  }
}
describe('books/DbRemoveBook', () => {
  test('Should call checkBookExitenceByIdRepository with correct data', async() => {
    const book = makeBook()
    const {sut, checkBookExitenceByIdRepository } = makeSut()

    await sut.update(book)

    expect(checkBookExitenceByIdRepository.input).toBe(book.id);
  })
  test('Should return a error if book do not exists', async() => {
    const book = makeBook()
    const {sut, checkBookExitenceByIdRepository } = makeSut()
    checkBookExitenceByIdRepository.output = false

    const removed = await sut.update(book)

    expect(removed).toEqual(new BookNotFoundError(book.id));
  })
  test('Should throw if checkBookExitenceByIdRepository throws', async() => {
    const book = makeBook()
    const {sut, checkBookExitenceByIdRepository } = makeSut()
    checkBookExitenceByIdRepository.checkExistence = async (id: string) => new Promise(_ => {throw new Error()})

    const promise = sut.update(book)

    expect(promise).rejects.toThrow()
  })
  test('Should call checkBookIsRentedByIdRepository with correct data', async() => {
    const book = makeBook()
    const {sut, checkBookIsRentedByIdRepository  } = makeSut()

    await sut.update(book)

    expect(checkBookIsRentedByIdRepository.input).toBe(book.id);
  })
  test('Should return a error if book is rented', async() => {
    const book = makeBook()
    const {sut, checkBookIsRentedByIdRepository  } = makeSut()
    checkBookIsRentedByIdRepository.output = true

    const removed = await sut.update(book)

    expect(removed).toEqual(new BookIsRentedError(book.id));
  })
  test('Should throw if checkBookIsRentedByIdRepository throws', async() => {
    const book = makeBook()
    const {sut, checkBookIsRentedByIdRepository  } = makeSut()
    checkBookIsRentedByIdRepository.isRented = async () => new Promise(_ => {throw new Error()})

    const promise = sut.update(book)

    expect(promise).rejects.toThrow()
  })
  
  test('Should call checkBookIsRentedByIdRepository with correct data', async() => {
    const book = makeBook()
    const {sut, checkBookIsRentedByIdRepository  } = makeSut()

    await sut.update(book)

    expect(checkBookIsRentedByIdRepository.input).toBe(book.id);
  })
  test('Should return a error if book is rented', async() => {
    const book = makeBook()
    const {sut, checkBookIsRentedByIdRepository  } = makeSut()
    checkBookIsRentedByIdRepository.output = true

    const removed = await sut.update(book)

    expect(removed).toEqual(new BookIsRentedError(book.id));
  })
  test('Should throw if checkBookIsRentedByIdRepository throws', async() => {
    const book = makeBook()
    const {sut, checkBookIsRentedByIdRepository  } = makeSut()
    checkBookIsRentedByIdRepository.isRented = async () => new Promise(_ => {throw new Error()})

    const promise = sut.update(book)

    expect(promise).rejects.toThrow()
  })

  test('Should call UpdateBookRepository with correct data', async() => {
    const book = makeBook()
    const {sut, updateBookRepository} = makeSut()

    await sut.update(book)

    expect(updateBookRepository.input).toBe(book);
  })
 
  test('Should throw if UpdateBookRepository throws', async() => {
    const book = makeBook()
    const {sut, updateBookRepository } = makeSut()
    updateBookRepository.update = async () => new Promise(_ => {throw new Error()})

    const promise = sut.update(book)

    expect(promise).rejects.toThrow()
  })

})
