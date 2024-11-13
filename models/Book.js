import mongoose from 'mongoose';
import pkg from 'mongoose-sequence';  // Import AutoIncrement
const AutoIncrement = pkg(mongoose);


const bookSchema = new mongoose.Schema({
    bookId: {
        type: Number,
        unique: true,
    },
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
        type: Number,
        ref: 'Genre', // liên kết tới thể loại (Genre)
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
        default: "https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/09/18/457/avatar-mac-dinh-8.jpg"
    },
    is_delete: {
        type: Boolean, // Trạng thái bị xóa
        default: false,
    }
},
{ timestamps: true });

bookSchema.plugin(AutoIncrement, { inc_field: 'bookId', start_seq: 1 });
bookSchema.index({ name: 'text' }); // Tạo chỉ mục tìm kiếm toàn văn cho tên sách

export const Book = mongoose.model('Book', bookSchema);
