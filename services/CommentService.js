// CommentService.js
import { Comment } from "../models/Comment.js";

export const CommentService = {
  addComment: async (commentData) => {
    try {
      const newComment = new Comment(commentData);
      await newComment.save();
      return {
        success: true,
        data: {
          message: "Thêm bình luận thành công.",
          comment: newComment,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: "Đã xảy ra lỗi khi thêm bình luận." + error,
      };
    }
  },

  getCommentById: async (commentId) => {
    try {
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return {
          success: false,
          status: 404,
          message: "Bình luận không tồn tại.",
        };
      }
      return {
        success: true,
        data: {
          message: "Lấy bình luận thành công.",
          comment,
        },
      };
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: "Đã xảy ra lỗi khi lấy bình luận.",
      };
    }
  },

  getCommentsByChapterId: async (chapterId) => {
    try {
      const comments = await Comment.find({ chapterId });
      return {
        success: true,
        data: {
          message: "Lấy bình luận theo chương thành công.",
          comments,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: "Đã xảy ra lỗi khi lấy bình luận theo chương.",
      };
    }
  },

  updateComment: async (commentId, content) => {
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { content },
        { new: true }
      );

      if (!updatedComment) {
        return {
          success: false,
          status: 404,
          message: "Bình luận không tồn tại.",
        };
      }

      return {
        success: true,
        data: {
          message: "Cập nhật bình luận thành công.",
          comment: updatedComment,
        },
      };
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: "Đã xảy ra lỗi khi cập nhật bình luận.",
      };
    }
  },

  deleteComment: async (commentId) => {
    try {
      const deletedComment = await Comment.findByIdAndDelete(commentId);

      if (!deletedComment) {
        return {
          success: false,
          status: 404,
          message: "Bình luận không tồn tại.",
        };
      }

      return {
        success: true,
        data: {
          message: "Xóa bình luận thành công.",
          comment: deletedComment,
        },
      };
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: "Đã xảy ra lỗi khi xóa bình luận.",
      };
    }
  },
};
