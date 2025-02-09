import { Router, Request, Response } from 'express';
import Book from '../models/Book';

const router = Router();

// POST /api/book/
router.post('/', async (req: Request, res: Response) => {
  try {
    // 从请求体解析出图书信息
    const { name, author, pages } = req.body;

    // 创建并保存
    const newBook = new Book({ name, author, pages });
    await newBook.save();

    // 返回保存成功的结果
    return res.status(201).json({ message: 'Book saved', book: newBook });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error saving book' });
  }
});

export default router;
