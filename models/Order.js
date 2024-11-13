import mongoose from 'mongoose';


const orderSchema = new mongoose.Schema({
    bookID: {
        type: Number,
        ref: 'Book', // Liên kết đến sách
        required: true,
    },
    accountID: {
        type: Number,
        ref: 'Account', // Liên kết đến account
        required: true,
    },
        price: {
        type: Number, 
        default: 0,
    },
    method:  {
        type: String,
        required: true,
    },
    status:  {
        type: String,
        required: true,
        default: "Chờ thanh toán"
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
},
{ timestamps: true });

export const Order = mongoose.model('Order', orderSchema);
