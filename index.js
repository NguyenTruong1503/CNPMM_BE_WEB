import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
<<<<<<< Updated upstream
import { BookRoute, AccountRoute,commentRoute, genreRoute, ratingRoute, ChapterRoute, ChapterContentRoute} from './routes/index.js';
=======
import cors from "cors";
import cookieParser from "cookie-parser";
<<<<<<< Updated upstream
import { BookRoute, AuthRoute,commentRoute, genreRoute, ratingRoute , UserRoute} from './routes/index.js';
>>>>>>> Stashed changes
import dotenv from 'dotenv';
import cors from 'cors';

=======
import { BookRoute, AuthRoute, commentRoute, genreRoute, ratingRoute, UserRoute, ChapterRoute, ChapterContentRoute } from './routes/index.js';
import dotenv from 'dotenv';
>>>>>>> Stashed changes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const URI = process.env.MONGO_URI;

// Chỉ cho phép origin này
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Kết nối với MongoDB
mongoose.connect(URI)
  .then(() => {
    console.log('Connected');
  })
  .catch(err => {
    console.log('err', err);
  });

// Định nghĩa các route
app.use("/api/comment", commentRoute);
app.use("/api/genre", genreRoute);
app.use("/api/rating", ratingRoute);
<<<<<<< Updated upstream
app.use('/api/books',BookRoute);
<<<<<<< Updated upstream
app.use('/api/account', AccountRoute);
app.use('/api/chapter', ChapterRoute)
app.use('/api/chaptercontent', ChapterContentRoute)
=======
app.use('/api/auth',AuthRoute);
app.use('/api/user',UserRoute);
>>>>>>> Stashed changes
=======
app.use('/api/books', BookRoute);
app.use('/api/chapter', ChapterRoute);
app.use('/api/chaptercontent', ChapterContentRoute);
app.use('/api/auth', AuthRoute);
app.use('/api/user', UserRoute);
>>>>>>> Stashed changes

app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});