import mongoose from "mongoose";
import { Rating } from "../models/Rating.js";

// Thêm đánh giá mới
export const addRating = async (req, res) => {
  const { bookId, accountId, star } = req.body;

  if (!bookId || !accountId || star === undefined) {
    return res
      .status(400)
      .json({ message: "Vui lòng cung cấp đầy đủ thông tin đánh giá." });
  }

  try {
    const newRating = new Rating({
      bookId: new mongoose.Types.ObjectId(bookId),
      accountId: new mongoose.Types.ObjectId(accountId),
      star,
    });
    await newRating.save();
    res
      .status(201)
      .json({ message: "Thêm đánh giá thành công.", rating: newRating });
  } catch (error) {
    res.status(500).json({
      message: "Đã xảy ra lỗi khi thêm đánh giá.",
      error: error.message,
    });
  }
};

// Lấy đánh giá theo ID
export const getRatingById = async (req, res) => {
  const { ratingId } = req.params;

  try {
    const rating = await Rating.findById(ratingId);

    if (!rating) {
      return res.status(404).json({ message: "Đánh giá không tồn tại." });
    }

    res.status(200).json({ message: "Lấy đánh giá thành công.", rating });
  } catch (error) {
    res.status(500).json({
      message: "Đã xảy ra lỗi khi lấy đánh giá.",
      error: error.message,
    });
  }
};

// Lấy tất cả đánh giá theo bookId
export const getRatingsByBookId = async (req, res) => {
  const { bookId } = req.params;

  try {
    const ratings = await Rating.find({ bookId });
    res
      .status(200)
      .json({ message: "Lấy tất cả đánh giá theo sách thành công.", ratings });
  } catch (error) {
    res.status(500).json({
      message: "Đã xảy ra lỗi khi lấy đánh giá.",
      error: error.message,
    });
  }
};

// Cập nhật đánh giá
export const updateRating = async (req, res) => {
  const { ratingId } = req.params;
  const { star } = req.body;

  if (star === undefined) {
    return res
      .status(400)
      .json({ message: "Số sao đánh giá không được để trống." });
  }

  try {
    const updatedRating = await Rating.findByIdAndUpdate(
      ratingId,
      { star },
      { new: true }
    );

    if (!updatedRating) {
      return res.status(404).json({ message: "Đánh giá không tồn tại." });
    }

    res.status(200).json({
      message: "Cập nhật đánh giá thành công.",
      rating: updatedRating,
    });
  } catch (error) {
    res.status(500).json({
      message: "Đã xảy ra lỗi khi cập nhật đánh giá.",
      error: error.message,
    });
  }
};

// Xóa đánh giá
export const deleteRating = async (req, res) => {
  const { ratingId } = req.params;

  try {
    const deletedRating = await Rating.findByIdAndDelete(ratingId);

    if (!deletedRating) {
      return res.status(404).json({ message: "Đánh giá không tồn tại." });
    }

    res
      .status(200)
      .json({ message: "Xóa đánh giá thành công.", rating: deletedRating });
  } catch (error) {
    res.status(500).json({
      message: "Đã xảy ra lỗi khi xóa đánh giá.",
      error: error.message,
    });
  }
};
