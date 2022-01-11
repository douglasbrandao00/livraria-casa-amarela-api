export class BookAlreadyRegistredError extends Error {
  constructor(title: string) {
    super(`Book ${title} is already registred`)
    this.name = 'BookAlreadyRegistred'
  }
}
