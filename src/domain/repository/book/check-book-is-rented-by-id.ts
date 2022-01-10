export interface CheckBookIsRentedByIdRepository {
  check(bookId: string): Promise<boolean>
}
