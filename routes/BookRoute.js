import express from "express";
import { BookController } from "../controllers/BookController.js";
import { MiddlewareController } from "../controllers/MiddlewareController.js";
const router = express.Router();
router.post('/',MiddlewareController.verifyAdmin,BookController.CreateBook);
router.get('/',BookController.GetAllBooks);
router.get('/search',BookController.Search);
router.get('/:bookId',BookController.GetBookById);
router.delete('/:bookId', MiddlewareController.verifyAdmin,BookController.DeleteBook);
router.patch('/:bookId',MiddlewareController.verifyAdmin, BookController.UpdateBook);


export default router;