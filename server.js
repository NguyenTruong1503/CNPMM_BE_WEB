import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { Book } from './models/Book.js';  // Import model Book
import {ChapterRoute,ChapterContentRoute} from "./routes/index.js"

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware để phân tích yêu cầu POST với dữ liệu JSON
app.use(bodyParser.json());

// Kết nối với MongoDB
mongoose.connect('mongodb://localhost:27017/BE_DocTruyen', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Kết nối thành công với MongoDB"))
.catch((err) => console.log("Lỗi kết nối MongoDB: ", err));

// API 
app.use('/api/chapter', ChapterRoute)
app.use('/api/chapter/content', ChapterContentRoute)

// Lắng nghe yêu cầu từ cổng PORT
app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});
