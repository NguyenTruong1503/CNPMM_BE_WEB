import express from "express";
import { GenreController } from "../controllers/GenreController.js";

const router = express.Router();

// Thêm thể loại mới
router.post("/", GenreController.addGenre);

// Lấy tất cả thể loại
router.get("/", GenreController.getAllGenres);

// Lấy thể loại theo genreId
router.get("/:genreId", GenreController.getGenreById);

// Cập nhật thể loại
router.put("/:genreId", GenreController.updateGenre);

// Xóa thể loại
router.delete("/:genreId", GenreController.deleteGenre);

export default router;
