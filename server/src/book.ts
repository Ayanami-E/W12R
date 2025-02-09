import mongoose, { Document, Schema } from 'mongoose';

// 定义接口
interface IBook extends Document {
    name: string;
    author: string;
    pages: number;
}

// 定义 Schema
const bookSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    pages: { type: Number, required: true }
});

// 创建并导出模型
export default mongoose.model<IBook>('Book', bookSchema);