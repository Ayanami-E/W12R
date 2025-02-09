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

app.use(express.json());
app.use('/api/book', bookRoutes);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mybooks';

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');

    const db = mongoose.connection.db;

    try {
      // 检查集合是否存在
      const collections = await db.listCollections().toArray();
      const exists = collections.some(col => col.name === "books");

      if (!exists) {
        await db.createCollection("books");
        console.log("✅ Created 'books' collection");
      } else {
        console.log("⚠️ 'books' collection already exists");
      }
    } catch (error) {
      console.error("❌ Error ensuring 'books' collection:", error);
    }
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));

export default app;
