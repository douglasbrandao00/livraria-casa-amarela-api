export interface CheckBookExitenceByIdRepository {
  checkExistence(bookId: string): Promise<boolean>
}
