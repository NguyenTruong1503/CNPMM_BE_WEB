import express from "express";
import { GenreController } from "../controllers/GenreController.js";
import { MiddlewareController } from "../controllers/MiddlewareController.js";

const router = express.Router();

// Thêm thể loại mới
router.post("/", MiddlewareController.verifyAdmin, GenreController.addGenre);

// Lấy tất cả thể loại
router.get("/", GenreController.getAllGenres);

// Lấy thể loại theo genreId
router.get("/:genreId", GenreController.getGenreById);

// Cập nhật thể loại
router.put("/:genreId", MiddlewareController.verifyAdmin, GenreController.updateGenre);

// Xóa thể loại
router.delete("/:genreId", MiddlewareController.verifyAdmin, GenreController.deleteGenre);

export default router;
