import mongoose from 'mongoose';

const contentChapterSchema = new mongoose.Schema({
    contentID: {
        type: Number,
        required: true,
    },
    chapterID: {
        type: Number,
        ref: 'Chapter',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const ChapterContent = mongoose.model('ChapterContent', contentChapterSchema);
