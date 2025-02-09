"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_1 = __importDefault(require("./book"));
const router = (0, express_1.Router)();
router.post('/', async (req, res) => {
    try {
        const { name, author, pages } = req.body;
        const newBook = new book_1.default({ name, author, pages });
        await newBook.save();
        res.status(201).json({ message: 'Book saved', book: newBook });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving book' });
    }
});
exports.default = router;
