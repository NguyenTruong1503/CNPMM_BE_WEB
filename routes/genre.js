import express from "express";
import {
  addGenre,
  getGenreById,
  getAllGenres,
  updateGenre,
  deleteGenre,
} from "../controllers/Genre.js";
import { MiddlewareController } from "../controllers/MiddlewareController.js";

const router = express.Router();

// Thêm thể loại mới
router.post("/", MiddlewareController.verifyAdmin, addGenre);

// Lấy tất cả thể loại
router.get("/", getAllGenres);

// Lấy thể loại theo genreId
router.get("/:genreId", getGenreById);

// Cập nhật thể loại
router.put("/:genreId", MiddlewareController.verifyAdmin, updateGenre);

// Xóa thể loại
router.delete("/:genreId", MiddlewareController.verifyAdmin, deleteGenre);

export default router;
