import { Router } from "express";
import mongoose from "mongoose";

const router = Router();

const ensureBooksCollection = async () => {
  const db = mongoose.connection.db;
  const collections = await db.listCollections().toArray();
  if (!collections.some(col => col.name === "books")) {
    console.log("⚠️ 'books' collection does not exist, creating...");
    await db.createCollection("books");
    console.log("✅ Created 'books' collection");
  }
};

// **获取所有书籍**
router.get("/all", async (req, res) => {
  await ensureBooksCollection();
  const books = await mongoose.connection.db.collection("books").find().toArray();
  res.json(books);
});

// **添加一本书**
router.post("/", async (req, res) => {
  await ensureBooksCollection();
  const { name, author, pages } = req.body;
  const result = await mongoose.connection.db.collection("books").insertOne({ name, author, pages });
  res.status(201).json({ message: "Book added!", id: result.insertedId });
});

export default router;
