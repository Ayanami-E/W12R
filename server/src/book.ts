import mongoose, { Document, Schema } from 'mongoose';


interface IBook extends Document {
    name: string;
    author: string;
    pages: number;
}


const bookSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    pages: { type: Number, required: true }
});


export default mongoose.model<IBook>('Book', bookSchema);
