import express from "express";
import { CommentController } from "../controllers/CommentController.js";

const router = express.Router();

// Thêm bình luận mới
router.post("/", CommentController.addComment);

// Lấy bình luận theo commentId
router.get("/:commentId", CommentController.getCommentById);

// Lấy bình luận theo chapterId
router.get("/chapter/:chapterId", CommentController.getCommentsByChapterId);

// Cập nhật bình luận
router.put("/:commentId", CommentController.updateComment);

// Xóa bình luận
router.delete("/:commentId", CommentController.deleteComment);

export default router;
