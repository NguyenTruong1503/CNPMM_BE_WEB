// CommentController.js
import { CommentService } from "../services/CommentService.js";
import { ResponseData, ResponseDetail } from "../services/ResponseJSON.js";

export const CommentController = {
    addComment: async (req, res) => {
    const { accountId, chapterId, content, post_date } = req.body;
    if (!chapterId || !accountId || !content) {
      return res.status(400).json(
        ResponseDetail(400, {
          message: "Vui lòng điền đầy đủ thông tin cần thiết.",
        })
      );
    }

    const result = await CommentService.addComment({
      chapterId,
      accountId,
      content,
      post_date
    });
    if (result.success) {
      return res.status(201).json(ResponseData(201, result.data));
    }
    return res
      .status(500)
      .json(ResponseDetail(500, { message: result.message }));
  },

  getCommentById: async (req, res) => {
    const { commentId } = req.params;
    const result = await CommentService.getCommentById(commentId);

    if (result.success) {
      return res.status(200).json(ResponseData(200, result.data));
    }
    return res.status(result.status).json(
      ResponseDetail(result.status, {
        message: result.message,
      })
    );
  },

  getCommentsByChapterId: async (req, res) => {
    const { chapterId } = req.params;
    const result = await CommentService.getCommentsByChapterId(chapterId);

    if (result.success) {
      return res.status(200).json(ResponseData(200, result.data));
    }
    return res
      .status(500)
      .json(ResponseDetail(500, { message: result.message }));
  },

  updateComment: async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json(
        ResponseDetail(400, {
          message: "Nội dung bình luận không được để trống.",
        })
      );
    }

    const result = await CommentService.updateComment(commentId, content);
    if (result.success) {
      return res.status(200).json(ResponseData(200, result.data));
    }
    return res.status(result.status).json(
      ResponseDetail(result.status, {
        message: result.message,
      })
    );
  },

  deleteComment: async (req, res) => {
    const { commentId } = req.params;
    const result = await CommentService.deleteComment(commentId);

    if (result.success) {
      return res.status(200).json(ResponseData(200, result.data));
    }
    return res.status(result.status).json(
      ResponseDetail(result.status, {
        message: result.message,
      })
    );
  },
};
