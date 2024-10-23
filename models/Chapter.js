import mongoose from 'mongoose';


const chapterSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
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
    },
    chapterContents: [{
        type: mongoose.Schema.Types.ObjectId, // Liên kết đến nội dung của chương
        ref: 'ChapterContent',
    }],
},
{ timestamps: true });

export const Chapter = mongoose.model('Chapter', chapterSchema);
