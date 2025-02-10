import express from 'express';
import mongoose, { Connection } from 'mongoose';
import cors from 'cors';
import bookRoutes from './bookRoutes';
import morgan from 'morgan';
import Book from './book'; 

const app = express();
const PORT = process.env.PORT || 1234;


app.use(morgan('dev'));


app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', bookRoutes);


app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});


mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/testdb")
  .then(async () => {
    console.log("Connected to MongoDB");


    await Book.init();

    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1); 
  });

const db: Connection = mongoose.connection;

db.on('error', console.error.bind(console, " MongoDB connection error"));
db.once('open', () => {
  console.log(' MongoDB connection opened');
});

export default app;
