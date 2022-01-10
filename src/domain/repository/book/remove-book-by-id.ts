export interface RemoveBookByIdRepository {
  remove(bookId: string): Promise<void>
}
