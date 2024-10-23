import mongoose from 'mongoose';

const contentChapterSchema = new mongoose.Schema({
    chapterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chapter',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const ContentChapter = mongoose.model('ContentChapter', contentChapterSchema);
