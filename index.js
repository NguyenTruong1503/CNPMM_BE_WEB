import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { Book } from './models/Book.js';  // Import model Book

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware để phân tích yêu cầu POST với dữ liệu JSON
app.use(bodyParser.json());

// Kết nối với MongoDB
mongoose.connect('mongodb://localhost:27017/bookstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Kết nối thành công với MongoDB"))
.catch((err) => console.log("Lỗi kết nối MongoDB: ", err));

// API POST thêm sách mới
app.post('/books', async (req, res) => {
    try {
        // Tạo cuốn sách mới từ dữ liệu trong yêu cầu
        const newBook = new Book(req.body);
        
        // Lưu sách vào cơ sở dữ liệu
        const savedBook = await newBook.save();
        
        // Phản hồi lại thành công và trả về cuốn sách đã lưu
        res.status(201).json(savedBook);
    } catch (err) {
        // Nếu có lỗi, trả về mã lỗi và thông báo
        res.status(400).json({ message: err.message });
    }
});

// Lắng nghe yêu cầu từ cổng PORT
app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});
