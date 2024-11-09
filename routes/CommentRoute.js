import express from "express";
import { CommentController } from "../controllers/CommentController.js";
import { MiddlewareController } from "../controllers/MiddlewareController.js";

const router = express.Router();

// Thêm bình luận mới
router.post("/",MiddlewareController.verifyToken, CommentController.addComment);

// Lấy bình luận theo commentId
router.get("/:commentId", CommentController.getCommentById);

// Lấy bình luận theo chapterId
router.get("/chapter/:chapterId", CommentController.getCommentsByChapterId);

// Cập nhật bình luận
router.put("/:commentId",MiddlewareController.verifyToken, CommentController.updateComment);

// Xóa bình luận
router.delete("/:commentId",MiddlewareController.verifyToken, CommentController.deleteComment);

export default router;
