
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { BookRoute, AccountRoute,commentRoute, genreRoute, ratingRoute, ChapterRoute, ChapterContentRoute} from './routes/index.js';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const URI = process.env.MONGO_URI;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Chỉ cho phép origin này
app.use(cors({
  origin: 'http://localhost:5173' 
}));
// Middleware để phân tích yêu cầu POST với dữ liệu JSON
app.use(bodyParser.json());

// Kết nối với MongoDB
mongoose.connect(URI)
    .then(()=>{
        console.log('Connected')
        
    }).catch(err=> {
        console.log('err',err)
    })


app.use("/api/comment", commentRoute);
app.use("/api/genre", genreRoute);
app.use("/api/rating", ratingRoute);
app.use('/api/books',BookRoute);
app.use('/api/account', AccountRoute);
app.use('/api/chapter', ChapterRoute)
app.use('/api/chaptercontent', ChapterContentRoute)

app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});



