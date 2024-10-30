import express from "express";
import {
  addComment,
  getCommentById,
  getCommentsByChapterId,
  updateComment,
  deleteComment,
} from "../controllers/Comment.js";

const router = express.Router();

// Thêm bình luận mới
router.post("/", addComment);

// Lấy bình luận theo commentId
router.get("/:commentId", getCommentById);

// Lấy bình luận theo chapterId
router.get("/chapter/:chapterId", getCommentsByChapterId);

// Cập nhật bình luận
router.put("/:commentId", updateComment);

// Xóa bình luận
router.delete("/:commentId", deleteComment);

export default router;
