
import { get } from "mongoose";
import { BookService } from "../services/BookService.js";
import { ResponseData, ResponseDetail } from "../services/ResponseJSON.js";

export const BookController = {
    CreateBook: async (req, res) => {
        const bookData = {
            name: req.body.name,
            description: req.body.description,
            author: req.body.author,
            genre: req.body.genre,
            price: req.body.price,
            thumbnail: req.body.thumbnail
        };

        const result = await BookService.createBook(bookData);
        
        if (result.success) {
            return res.status(200).json(ResponseData(200, result.data));
        } else {
            const statusCode = result.message === "Lỗi đăng truyện" ? 500 : 400;
            return res.status(statusCode).json(ResponseDetail(statusCode, { message: result.message }));
        }
    },
    GetAllBooks: async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit)|| 10;
        const skip = (page - 1) * limit;

        const result = await BookService.getAllBooks(skip,limit);
        if (result.success) {
            return res.status(200).json({ data: result.data, totalPages: result.totalPages });
        }else {
            return res.status(500).json(ResponseDetail(500, { message: result.message }));
        }
    },
    Search: async (req, res) => {
        let keyword = req.query.keyword;
        keyword = keyword
            .normalize("NFD")
            .toLowerCase()
            .replace(/[\u0300-\u036f]/g, "")
            .split(' ')
            .filter(i => i !== '')
            .join(' ');

        const result = await BookService.search(keyword);
        if (result.success) {
            if (result.data.length === 0) {
                return res.status(404).json(ResponseDetail(400, { message: "Không tìm thấy sách nào" }));
            }
            return res.status(200).json(ResponseData(200, result.data));
        }else {
            return res.status(500).json(ResponseDetail(500, { message: result.message }));
        }
    },
    GetBookById : async (req, res) => {
        const bookId = req.params.bookId;
        const result = await BookService.getBookById(bookId);
        if (result.success) {
            return res.status(200).json(ResponseData(200, result.data));
        }else {
            return res.status(500).json(ResponseDetail(500, { message: result.message }));
        }
    },
    DeleteBook: async (req, res) => {
        const bookId = req.params.bookId;
        const result = await BookService.deleteBook(bookId);
        if (result.success) {
            return res.status(200).json(ResponseData(200, result.data));
        }else {
            return res.status(500).json(ResponseDetail(500, { message: result.message }));
        }
    },
    GetTotalBooks: async (req, res) => {
        try {
            const result = await BookService.getTotal();
            if (result.success) {
                return res.status(200).json(ResponseData(200, result.data));
            } else {
                return res.status(500).json(ResponseDetail(500, { message: result.message }));
            }
        } catch (err) {
            return res.status(500).json(ResponseDetail(500, { message: 'Internal Server Error' }));
        }
    },
    UpdateBook: async (req, res) => {
        const bookId = req.params.bookId;
        const bookData = {
            name: req.body.name,
            description: req.body.description,
            author: req.body.author,
            genre: req.body.genre,
            price: req.body.price,
            thumbnail: req.body.thumbnail
        };
        const result = await BookService.updateBook(bookId, bookData);
        if (result.success) {
            return res.status(200).json(ResponseData(200, result.data));
        }
        return res.status(500).json(ResponseDetail(500, { message: result.message }));
    },
    getBookByGenre: async (req, res) => {
        const genre = req.params.genreId;
        const result = await BookService.getBookByGenre(genre);
        if (result.success) {
            return res.status(200).json(ResponseData(200, result.data));
        } else {
            return res.status(500).json(ResponseDetail(500, { message: result.message }));
        }
    },
    getFreeBook: async (req, res) => {
        const result = await BookService.getFreeBook();
        if (result.success) {
            return res.status(200).json(ResponseData(200, result.data));
        } else {
            return res.status(500).json(ResponseDetail(500, { message: result.message }));
        }
    },
    getFeeBook: async (req, res) => {
        const result = await BookService.getFeeBook();
        if (result.success) {
            return res.status(200).json(ResponseData(200, result.data));
        } else {
            return res.status(500).json(ResponseDetail(500, { message: result.message }));
        }
    }
    
};
