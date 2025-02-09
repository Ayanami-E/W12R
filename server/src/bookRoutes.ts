import { Router } from "express";
import { Book } from "../models/Book";
import mongoose from "mongoose";

const router = Router();

// **强制创建 `books` 集合**
const ensureBooksCollection = async () => {
  const db = mongoose.connection.db;
  const collections = await db.listCollections().toArray();
  if (!collections.some(col => col.name === "books")) {
    console.log("⚠️ 'books' collection does not exist, creating...");
    await db.createCollection("books");
    console.log("✅ Created 'books' collection");
  }
};

// **确保集合存在后，再执行查询**
router.get("/all", async (req, res) => {
  await ensureBooksCollection();
  const books = await Book.find();
  res.json(books);
});

export default router;
