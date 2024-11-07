import express from "express";
import {
  addRating,
  getRatingById,
  getRatingsByBookId,
  updateRating,
  deleteRating,
} from "../controllers/Rating.js";
import { MiddlewareController } from "../controllers/MiddlewareController.js";

const router = express.Router();

// Thêm đánh giá mới
router.post("/", MiddlewareController.verifyToken, addRating);

// Lấy đánh giá theo ratingId
router.get("/:ratingId", getRatingById);

// Lấy tất cả đánh giá theo bookId
router.get("/book/:bookId", getRatingsByBookId);

// Cập nhật đánh giá
router.put("/:ratingId", MiddlewareController.verifyToken, updateRating);

// Xóa đánh giá
router.delete("/:ratingId", MiddlewareController.verifyToken, deleteRating);

export default router;
