import express from "express";
import { BookController } from "../controllers/BookController.js";

const router = express.Router();
router.post('/',BookController.CreateBook);
router.get('/',BookController.GetAllBooks);
router.get('/search',BookController.Search);
router.get('/:bookId',BookController.GetBookById);
router.delete('/:bookId',BookController.DeleteBook);
router.patch('/:bookId',BookController.UpdateBook);

export default router;