import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { BookRoute, AuthRoute,commentRoute, genreRoute, ratingRoute , UserRoute, ChapterRoute, ChapterContentRoute, OrderRoute} from './routes/index.js';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const URI = process.env.MONGO_URI;

app.use(cors({
  origin: 'http://localhost:5173', // URL của frontend
  credentials: true // Cho phép gửi cookie
}));


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
app.use('/api/books', BookRoute);
app.use('/api/chapter', ChapterRoute);
app.use('/api/chaptercontent', ChapterContentRoute);
app.use('/api/auth', AuthRoute);
app.use('/api/user', UserRoute);
app.use('/api/order', OrderRoute);



app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});