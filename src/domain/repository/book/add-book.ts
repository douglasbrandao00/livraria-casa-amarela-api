export type BookCandidate = {
  title: string,
  subtitle?: string,
  author: string,
  description: string
}

export type AddedBook = {
  id: string,
  title: string,
  subtitle?: string,
  author: string,
  description: string,
  rent: BookRent
}

export type BookRent = {
  isRented: boolean,
  userId?: string,
  dueDate?: string
}
