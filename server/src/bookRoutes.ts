import { Router, Request, Response } from 'express';
import Book from './book';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, author, pages } = req.body;
    const newBook = new Book({ name, author, pages });
    await newBook.save();

    res.status(201).json({ message: 'Book saved', book: newBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving book' });
  }
});

export default router;
