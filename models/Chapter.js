import mongoose from 'mongoose';


const chapterSchema = new mongoose.Schema({
    chapterId: {
        type: Number,
        required: true,
        unique: true,
    },
    bookId: {
        type: Number,
        ref: 'Book', // Liên kết đến sách
        required: true,
    },
    chapter_title: {
        type: String,
        required: true,
    },
    publish_date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    chapter_view: {
        type: Number, // Số lượt xem chương
        default: 0,
    }
},
{ timestamps: true });

export const Chapter = mongoose.model('Chapter', chapterSchema);
