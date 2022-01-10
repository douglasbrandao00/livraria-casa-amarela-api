export interface CheckBookExitenceByIdRepository {
  check(bookId: string): Promise<boolean>
}
