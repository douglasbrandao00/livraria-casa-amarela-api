import mongoose, { Document, Model } from 'mongoose';

export type Account = {
  _id?: string,
  name: string,
  email: string,
  password: string
}


const schema = new mongoose.Schema<Account>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
    },
    password: { type: String, required: true },
  }
);

export const AccountModel = mongoose.model<Account>('Account', schema)

