import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bookRoutes from './bookRoutes';

const app = express();

// **1️⃣ 仅在开发环境启用 CORS**
if (process.env.NODE_ENV === 'development') {
  app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }));
}

// **2️⃣ 解析 JSON 请求体**
app.use(express.json());

// **3️⃣ 挂载路由**
app.use('/api/book', bookRoutes);

// **4️⃣ 连接 MongoDB**
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mybooks';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const db = mongoose.connection.db;

    // **5️⃣ 强制确保 `books` collection 存在**
    const collections = await db.listCollections().toArray();
    if (!collections.some(col => col.name === "books")) {
      console.log("⚠️ 'books' collection does not exist, creating...");
      await db.createCollection("books");
      await db.collection("books").insertOne({
        name: "Placeholder Book",
        author: "System",
        pages: 1
      });
      console.log("✅ Created 'books' collection with placeholder data");
    } else {
      console.log("✅ 'books' collection already exists");
    }

  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};

// **6️⃣ 确保 MongoDB 连接成功后再启动 `server`**
connectDB().then(() => {
  const PORT = 1234;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});

export default app;
