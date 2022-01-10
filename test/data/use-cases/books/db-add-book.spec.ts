import { DbAddBook } from 'App/data/use-cases/books/db-add-book'
import {
  AddBookRepository,
  BookCandidateWithDefaultRent,
  AddedBook,
  BookCandidate
} from 'App/domain/repository/book/add-book'

function makeBookCandidate(): BookCandidate {
  return {
    title: "clean code",
    subtitle: "A Handbook of Agile Software Craftsmanship",
    author: 'Robert C. Martin',
    description: 'Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn’t have to be that way.'
  }
}

class AddBookRepositoryMock implements AddBookRepository {
  input?: BookCandidateWithDefaultRent
  output?: AddedBook

  async add(candidate: BookCandidateWithDefaultRent): Promise<AddedBook> {
    this.input = candidate

    const output: AddedBook = Object.assign(
      {},
      candidate,
      {id: 'any_id'}
    )

    this.output = output
    return new Promise(res => res(output))
  }
}

function makeSut() {
  const addBookRepository = new AddBookRepositoryMock()
  const sut = new DbAddBook(addBookRepository)

  return {
    sut,
    addBookRepository
  }
}


describe('book/AddBook', () => {
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
    
    const output = await sut.add(candidate)

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
