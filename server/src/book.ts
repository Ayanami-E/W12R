import { Schema, model } from 'mongoose';

interface IBook {
  name: string;
  author: string;
  pages: number;
}

const BookSchema = new Schema<IBook>({
  name: { type: String, required: true },
  author: { type: String, required: true },
  pages: { type: Number, required: true }
});

export default model<IBook>('Book', BookSchema);
