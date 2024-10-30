import express from "express";
import {
  addRating,
  getRatingById,
  getRatingsByBookId,
  updateRating,
  deleteRating,
} from "../controllers/Rating.js";

const router = express.Router();

// Thêm đánh giá mới
router.post("/", addRating);

// Lấy đánh giá theo ratingId
router.get("/:ratingId", getRatingById);

// Lấy tất cả đánh giá theo bookId
router.get("/book/:bookId", getRatingsByBookId);

// Cập nhật đánh giá
router.put("/:ratingId", updateRating);

// Xóa đánh giá
router.delete("/:ratingId", deleteRating);

export default router;
