import mongoose from "mongoose";
import { Comment } from "../models/Comment.js";

export const addComment = async (req, res) => {
  const { chapterId, accountId, content } = req.body;
  if (!chapterId || !accountId || !content) {
    return res
      .status(400)
      .json({ message: "Vui lòng điền đầy đủ thông tin cần thiết." });
  }
  try {
    const newComment = new Comment({
      chapterId: chapterId,
      accountId: accountId,
      content,
    });
    await newComment.save();
    res
      .status(201)
      .json({ message: "Thêm bình luận thành công.", comment: newComment });
  } catch (error) {
    res.status(500).json({
      message: "Đã xảy ra lỗi khi thêm bình luận.",
      error: error.message,
    });
  }
};
export const getCommentById = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Bình luận không tồn tại." });
    }

    res.status(200).json({ message: "Lấy bình luận thành công.", comment });
  } catch (error) {
    res.status(500).json({
      message: "Đã xảy ra lỗi khi lấy bình luận.",
      error: error.message,
    });
  }
};

export const getCommentsByChapterId = async (req, res) => {
  const { chapterId } = req.params;

  try {
    const comments = await Comment.find({ chapterId });

    res
      .status(200)
      .json({ message: "Lấy bình luận theo chương thành công.", comments });
  } catch (error) {
    res.status(500).json({
      message: "Đã xảy ra lỗi khi lấy bình luận theo chương.",
      error: error.message,
    });
  }
};
export const updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  if (!content) {
    return res
      .status(400)
      .json({ message: "Nội dung bình luận không được để trống." });
  }

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: "Bình luận không tồn tại." });
    }

    res.status(200).json({
      message: "Cập nhật bình luận thành công.",
      comment: updatedComment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Đã xảy ra lỗi khi cập nhật bình luận.",
      error: error.message,
    });
  }
};
export const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ message: "Bình luận không tồn tại." });
    }

    res
      .status(200)
      .json({ message: "Xóa bình luận thành công.", comment: deletedComment });
  } catch (error) {
    res.status(500).json({
      message: "Đã xảy ra lỗi khi xóa bình luận.",
      error: error.message,
    });
  }
};
