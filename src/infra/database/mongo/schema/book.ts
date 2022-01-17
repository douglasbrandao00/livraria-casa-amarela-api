import mongoose from 'mongoose';

export type Book = {
  _id?: string,
  title: string,
  subtitle?: string,
  author: string,
  description: string,
  rent: {
    isRented: boolean,
    userId?: string,
    dueDate?: string

  }
}


const schema = new mongoose.Schema<Book>(
  {
    title: { type: String, required: true },
    subtitle: { type: String},
    author: { type: String, required: true },
    description: { type: String, required: true },
    rent: { 
      isRented: { type: Boolean, required: true},
      userId: { type: String},
      dueDate: { type: String}
    },
  }
);

export const BookModel = mongoose.model<Book>('Book', schema)

