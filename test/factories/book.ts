import { AddedBook, BookCandidate }from 'App/domain/repository/book/add-book'
import { HttpRequest } from 'App/presentation/protocols/';

export function makeBookCandidate(): BookCandidate {
  return {
    title: "clean code",
    subtitle: "A Handbook of Agile Software Craftsmanship",
    author: 'Robert C. Martin',
    description: 'Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn’t have to be that way.'
  }
}

export function makeBook(): AddedBook {
  const id = {id: 'any_id'}
  const isRented = {rent: {isRented: false}}
  const book = Object.assign(
    {},
    makeBookCandidate(),
    id,
    isRented
  )
  return book as AddedBook
}
export function makeBookRequest(): HttpRequest {
  return {
     body: makeBook()
  }  
}
export function makeBookCandidateRequest(): HttpRequest {
  return {
     body: makeBookCandidate()
  }  
}
