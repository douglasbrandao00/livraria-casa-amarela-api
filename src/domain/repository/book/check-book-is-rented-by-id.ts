export interface CheckBookIsRentedByIdRepository {
  isRented(bookId: string): Promise<boolean>
}
