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
  .then(async () => {
    console.log('✅ Connected to MongoDB');

    // 获取数据库实例
    const db = mongoose.connection.db;

    // 强制创建 'books' 集合（插入一个占位数据）
    try {
      await db.collection("books").insertOne({
        name: "Placeholder Book",
        author: "System",
        pages: 1
      });
      console.log("✅ Ensured 'books' collection exists");
    } catch (error) {
      if (error.codeName === "DuplicateKey") {
        console.log("⚠️ 'books' collection already exists");
      } else {
        console.error("❌ Error ensuring 'books' collection:", error);
      }
    }
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));

export default app;
