import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bookRoutes from './bookRoutes';

const app = express();

// 仅在开发环境启用 CORS
if (process.env.NODE_ENV === 'development') {
  app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }));
}

// 解析 JSON 请求体
app.use(express.json());

// 路由
app.use('/api/book', bookRoutes);

// 数据库连接
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mybooks';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

export default app;
