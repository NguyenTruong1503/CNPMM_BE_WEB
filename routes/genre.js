import express from "express";
import {
  addGenre,
  getGenreById,
  getAllGenres,
  updateGenre,
  deleteGenre,
} from "../controllers/Genre.js";

const router = express.Router();

// Thêm thể loại mới
router.post("/", addGenre);

// Lấy tất cả thể loại
router.get("/", getAllGenres);

// Lấy thể loại theo genreId
router.get("/:genreId", getGenreById);

// Cập nhật thể loại
router.put("/:genreId", updateGenre);

// Xóa thể loại
router.delete("/:genreId", deleteGenre);

export default router;
