import { DbAddBook, DbAddBookInput } from 'App/data/use-cases/books/db-add-book'

import { AddedBook } from 'App/domain/repository/book/add-book'
import { AddBookRepositoryMock, CheckIsTitleInUseRepositoryMock } from 'Test/mocks'

import { makeBookCandidate } from 'Test/factories/index'

function makeSut() {
  const addBookRepository = new AddBookRepositoryMock()
  const checkIsTitleInUseRepository = new CheckIsTitleInUseRepositoryMock()

  const sutInput: DbAddBookInput = {
    addBookRepository,
    checkIsTitleInUseRepository
  }
  const sut = new DbAddBook(sutInput)

  return {
    sut,
    addBookRepository,
    checkIsTitleInUseRepository
  }
}


describe.only('book/AddBook', () => {
  test('Should call addBookRepository.add with correct data', async () => {
    const candidate = makeBookCandidate()
    const { sut, addBookRepository } = makeSut()
    
    await sut.add(candidate)

    expect(addBookRepository.input!.rent.isRented).toBe(false);
    expect(candidate.title).toBe(addBookRepository.input!.title);
    expect(candidate.subtitle).toBe(addBookRepository.input!.subtitle);
    expect(candidate.author).toBe(addBookRepository.input!.author);
    expect(candidate.description).toBe(addBookRepository.input!.description);
  })
  test('Should return AddBookRepository.add output correctily', async () => {
    const candidate = makeBookCandidate()
    const { sut, addBookRepository } = makeSut()
    
    const output  = await sut.add(candidate) as AddedBook

    expect(addBookRepository.output!.id).toBe('any_id');
    expect(addBookRepository.output!.rent.isRented).toBe(false);
    expect(output.title).toBe(addBookRepository.output!.title);
    expect(output.subtitle).toBe(addBookRepository.output!.subtitle);
    expect(output.author).toBe(addBookRepository.output!.author);
    expect(output.description).toBe(addBookRepository.output!.description);
  })
  test('Should throw AddBookRepository.add throws', async () => {
    const candidate = makeBookCandidate()
    const { sut, addBookRepository } = makeSut()
    
    addBookRepository.add = async() => {
      return new Promise(_ => { throw new Error() })
    }

    const promise = sut.add(candidate)
    
    expect(promise).rejects.toThrow()
  })
})
