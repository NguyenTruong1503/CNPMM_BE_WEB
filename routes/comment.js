import express from "express";
import {
  addComment,
  getCommentById,
  getCommentsByChapterId,
  updateComment,
  deleteComment,
} from "../controllers/Comment.js";
import { MiddlewareController } from "../controllers/MiddlewareController.js";

const router = express.Router();

// Thêm bình luận mới
router.post("/", MiddlewareController.verifyToken, addComment);

// Lấy bình luận theo commentId
router.get("/:commentId", getCommentById);

// Lấy bình luận theo chapterId
router.get("/chapter/:chapterId", getCommentsByChapterId);

// Cập nhật bình luận
router.put("/:commentId", MiddlewareController.verifyToken, updateComment);

// Xóa bình luận
router.delete("/:commentId", MiddlewareController.verifyToken, deleteComment);

export default router;
