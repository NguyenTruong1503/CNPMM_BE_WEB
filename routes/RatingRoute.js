// routes/rating.js
import express from "express";
import { RatingController } from "../controllers/RatingController.js";
import { MiddlewareController } from "../controllers/MiddlewareController.js";

const router = express.Router();

// Thêm đánh giá mới
router.post("/", MiddlewareController.verifyAdmin, RatingController.addRating);

// Lấy đánh giá theo ratingId
router.get("/:ratingId", RatingController.getRatingById);

// Lấy tất cả đánh giá theo bookId
router.get("/book/:bookId", RatingController.getRatingsByBookId);

// Cập nhật đánh giá
router.put("/:ratingId", MiddlewareController.verifyAdmin, RatingController.updateRating);

// Xóa đánh giá
router.delete("/:ratingId", MiddlewareController.verifyAdmin, RatingController.deleteRating);

export default router;
