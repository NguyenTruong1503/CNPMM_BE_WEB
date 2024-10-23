import mongoose from 'mongoose';
import { Chapter } from './Chapter.js';

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre', // liên kết tới thể loại (Genre)
        required: true,
    },
    type: {
        type: Boolean, // Dạng sách (ví dụ: truyện đọc online hay sách vật lý)
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    thumbnail: {
        type: String, // Đường dẫn ảnh bìa
        required: true,
    },
    is_delete: {
        type: Boolean, // Trạng thái bị xóa
        default: false,
    },
    chapters: [{
        type: mongoose.Schema.Types.ObjectId, // Liên kết đến các chương
        ref: 'Chapter'
    }],
},
{ timestamps: true });

bookSchema.index({ name: 'text' }); // Tạo chỉ mục tìm kiếm toàn văn cho tên sách

export const Book = mongoose.model('Book', bookSchema);
