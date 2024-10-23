import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    star: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

export const Rating = mongoose.model('Rating', ratingSchema);
