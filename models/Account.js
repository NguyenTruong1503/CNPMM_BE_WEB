import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        default: '',
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    is_admin: {
        type: Boolean,
        default: false,
    },
    bonus_point: {
        type: Number,
        default: 0,
    },
    avatar: {
        type: String,
        default: '',
    },
}, { timestamps: true });

export const Account = mongoose.model('Account', accountSchema);
