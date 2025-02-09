import express from 'express';
import mongoose, { Connection } from 'mongoose';
import cors from 'cors';
import bookRoutes from './bookRoutes';
import morgan from 'morgan';

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

// 数据库连接
const MONGODB_URI = 'mongodb://127.0.0.1:27017/bookstore';
mongoose.connect(MONGODB_URI);
mongoose.Promise = Promise;
const db: Connection = mongoose.connection;

db.on('error', console.error.bind(console, "MongoDB connection error"));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;