

import { Book } from "../models/Book.js";

export const BookService = {
    createBook: async (bookData) => {
        try {
            const { name, description, author, genre, price, thumbnail } = bookData;
            const is_delete = 0;
            const book = await new Book({ name, description, author, genre, price, thumbnail, is_delete });

            // Kiểm tra tính hợp lệ của dữ liệu
            let error = book.validateSync();
            if (error) {
                return { success: false, message: Object.values(error.errors)[0].message || 'Lỗi dữ liệu không đúng' };
            }

            // Lưu sách vào cơ sở dữ liệu
            const response = await book.save();
            if (response) {
                return { success: true, data: book };
            }
            console.log('hihi'+response);
            return { success: false, message: "Đăng truyện không thành công" };
        } catch (error) {
            console.log(error);
            return { success: false, message: "Lỗi đăng truyện" };
        }
    },
    getAllBooks: async (skip, limit) => {
        try {
            const books = await Book.find({ is_delete: 0 }).skip(skip).limit(limit);
            const totalBooks = await Book.countDocuments();
            return { success: true, data: books, totalPages: Math.ceil(totalBooks / limit)};
        }catch(error){
            console.log(error);
            return { success: false, message: "Lỗi lấy dữ liệu" };
        }
    },
    search: async (keyword) => {
        try {
            const books = await Book.find({ $text: { $search: keyword }, is_delete: 0 });
            return { success: true, data: books };
        }catch(error){
            console.log(error);
            return { success: false, message: "Lỗi tìm kiếm" };
        }
    },
    getBookById : async (bookId) => {
        try {
            const book = await Book.findOne({ bookId: bookId, is_delete: 0 }).populate('genre');
            return { success: true, data: book };
        }catch{
            return { success: false, message: "Lỗi lấy dữ liệu" };
        }
    },
    deleteBook: async (bookId) => {
        try {
            const book = await Book.findOneAndUpdate({ bookId: bookId }, { is_delete: true });
            return { success: true, data: book };
        }catch{
            return { success: false, message: "Lỗi xóa dữ liệu" };
        }
    },
    updateBook: async (bookId, bookData) => {
        try {
            const book = await Book.findOneAndUpdate({ bookId: bookId }, bookData, { new: true });
            return { success: true, data: book };
        }catch(error){
            return { success: false, message:  error.message};
        }
    }
};
