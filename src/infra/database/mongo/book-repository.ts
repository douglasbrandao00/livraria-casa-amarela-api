import {AddBookRepository, AddedBook, BookCandidate} from "root/src/domain/repository/book/add-book";
import {CheckIsTitleInUseRepository} from "root/src/domain/repository/book/check-is-title-in-use";
import {BookModel} from "./schema/book";

export class BookMongoRepository implements AddBookRepository, CheckIsTitleInUseRepository {
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
}
