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

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const db = mongoose.connection.db;

    // **强制创建 `books` 集合**
    const collections = await db.listCollections().toArray();
    if (!collections.some(col => col.name === "books")) {
      console.log("⚠️ 'books' collection does not exist, creating...");
      await db.createCollection("books");
      console.log("✅ Created 'books' collection");
    } else {
      console.log("✅ 'books' collection already exists");
    }

  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // 终止程序，防止 server 启动失败
  }
};

// **确保数据库连接后再启动 `server`**
connectDB().then(() => {
  const PORT = 1234;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});

export default app;
