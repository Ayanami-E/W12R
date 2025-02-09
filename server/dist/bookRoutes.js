"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_1 = __importDefault(require("./book"));
const router = (0, express_1.Router)();
// POST: 保存新书 - 现在路径是 /api/book
router.post('/book', async (req, res) => {
    try {
        const { name, author, pages } = req.body;
        const existingBook = await book_1.default.findOne({ name });
        if (existingBook) {
            res.status(403).json({ message: 'Book already in database.' });
            return;
        }
        const newBook = new book_1.default({ name, author, pages });
        await newBook.save();
        res.status(201).json(newBook);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
});
// GET: 通过书名获取书籍 - 现在路径是 /api/book/:title
router.get('/book/:title', async (req, res) => {
    try {
        const title = decodeURIComponent(req.params.title);
        const book = await book_1.default.findOne({ name: title });
        if (!book) {
            res.status(404).json({ message: '404: This is not the webpage you are looking for' });
            return;
        }
        res.json(book);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = router;
