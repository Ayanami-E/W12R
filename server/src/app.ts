import express from 'express';
import mongoose, { Connection } from 'mongoose';
import cors from 'cors';
import bookRoutes from './bookRoutes';
import morgan from 'morgan';
import Book from './book'; // 确保 Book model 存在

const app = express();
const PORT = process.env.PORT || 1234;

// 启用日志
app.use(morgan('dev'));

// CORS 配置
app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}));

// 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由
app.use('/api', bookRoutes);

// 错误处理中间件
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 连接 MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bookstore")
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    // 确保 `books` 集合存在
    await Book.init();

    // 启动服务器（确保 MongoDB 连接后再启动）
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // 连接失败，退出进程
  });

const db: Connection = mongoose.connection;

db.on('error', console.error.bind(console, "❌ MongoDB connection error"));
db.once('open', () => {
  console.log('✅ MongoDB connection opened');
});

export default app;
