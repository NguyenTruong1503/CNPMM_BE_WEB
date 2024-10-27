import mongoose from 'mongoose';

const genreSchema = new mongoose.Schema({
    genreId: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
}, { timestamps: true });

export const Genre = mongoose.model('Genre', genreSchema);
