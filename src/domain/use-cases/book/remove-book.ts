export interface RemoveBook {
  remove(bookId: string): Promise<void | Error>
} 
