import { Router, Request, Response } from 'express';
import Book from './book';

const router = Router();

// POST: 保存新书 - 现在路径是 /api/book
router.post('/book', async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, author, pages } = req.body;
        const existingBook = await Book.findOne({ name });
        if (existingBook) {
            res.status(403).json({ message: 'Book already in database.' });
            return;
        }
        const newBook = new Book({ name, author, pages });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// GET: 通过书名获取书籍 - 现在路径是 /api/book/:title
router.get('/book/:title', async (req: Request, res: Response): Promise<void> => {
    try {
        const title = decodeURIComponent(req.params.title);
        const book = await Book.findOne({ name: title });
        
        if (!book) {
            res.status(404).json({ message: '404: This is not the webpage you are looking for' });
            return;
        }
        
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;