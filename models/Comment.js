import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    chapterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chapter',
        required: true,
    },
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    content: {
        type: String,
        required: true,
        validate: {
            validator: (text) => text.length > 0,
            message: 'Nội dung bình luận không được để trống.',
        },
    },
    post_date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

export const Comment = mongoose.model('Comment', commentSchema);
