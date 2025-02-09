import express from 'express';
import mongoose from 'mongoose';
import bookRoutes from './bookRoutes';

const app = express();

// 中间件
app.use(express.json()); // 用于解析 JSON 请求体

// 路由
app.use('/api/book', bookRoutes);

// 数据库连接
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mybooks';

// 注意：连接数据库应该放在监听端口之前，或在 index.ts 中统一处理
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

export default app;
