import express from "express";
import { BookController } from "../controllers/BookController.js";
import { MiddlewareController } from "../controllers/MiddlewareController.js";

const router = express.Router();

// Route cụ thể
router.post('/', MiddlewareController.verifyAdmin, BookController.CreateBook);
router.get('/', BookController.GetAllBooks);
router.get('/search', BookController.Search);
router.get('/total', BookController.GetTotalBooks);
router.get('/freebooks', BookController.getFreeBook);
router.get('/feebooks', BookController.getFeeBook);

// Route động
router.get('/:bookId', BookController.GetBookById);
router.delete('/:bookId', MiddlewareController.verifyAdmin, BookController.DeleteBook);
router.patch('/:bookId', MiddlewareController.verifyAdmin, BookController.UpdateBook);
router.get('/genre/:genreId', BookController.getBookByGenre);

export default router;
