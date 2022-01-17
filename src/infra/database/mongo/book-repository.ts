import {AddBookRepository, AddedBook, BookCandidate} from "root/src/domain/repository/book/add-book";
import {CheckBookExitenceByIdRepository} from "root/src/domain/repository/book/check-book-existence-by-id";
import {CheckBookIsRentedByIdRepository} from "root/src/domain/repository/book/check-book-is-rented-by-id";
import {CheckIsTitleInUseRepository} from "root/src/domain/repository/book/check-is-title-in-use";
import {RemoveBookByIdRepository} from "root/src/domain/repository/book/remove-book-by-id";
import {UpdateBookRepository} from "root/src/domain/repository/book/update-book";
import {BookModel} from "./schema/book";

export class BookMongoRepository 
implements 
  AddBookRepository,
  UpdateBookRepository,
  RemoveBookByIdRepository,
  CheckIsTitleInUseRepository,
  CheckBookExitenceByIdRepository,
  CheckBookIsRentedByIdRepository
  {
  async add(bookCandidate: BookCandidate): Promise<AddedBook> {
    const bookDb = new BookModel(bookCandidate)
    await bookDb.save()

    return {
      id: bookDb._id,
      title: bookDb.title,
      subtitle: bookDb.subtitle,
      author: bookDb.author,
      description: bookDb.description,
      rent: bookDb.rent,
    }
  }

  async check(title: string): Promise<boolean> {
      const book = await BookModel.find({title})

      return (book.length) ? true : false
  }

  async update(book: AddedBook): Promise<AddedBook> {
    const bookFilter = {_id: book.id, title: book.title}
    const bookDb = await BookModel.findOneAndUpdate(bookFilter, book)
    return {
      id: bookDb!._id,
      title: bookDb!.title,
      subtitle: bookDb!.subtitle,
      author: bookDb!.author,
      description: bookDb!.description,
      rent: bookDb!.rent,
    }
  }
  async checkExistence(bookId: string): Promise<boolean> {
    try {
      const book = await BookModel.findOne({_id: bookId})
      return (book) ? true : false
    
    } catch(_e) {
      return false
    }
  }
  async isRented(bookId: string): Promise<boolean> {
    try {
      const book = await BookModel.findOne({_id: bookId}).exec()
      if(!book) return false
      return book.rent.isRented
    } catch(_e) {
      return false
    }
  }
  async remove(bookId: string): Promise<void> {
    await BookModel.findOneAndRemove({_id: bookId})
  }
}
