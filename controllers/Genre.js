import mongoose from "mongoose";
import { Genre } from "../models/Genre.js";

// Thêm thể loại mới
export const addGenre = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ message: "Tên thể loại không được để trống." });
  }

  try {
    const newGenre = new Genre({
      name,
      description,
    });
    await newGenre.save();
    res
      .status(201)
      .json({ message: "Thêm thể loại thành công.", genre: newGenre });
  } catch (error) {
    res.status(500).json({
      message: "Đã xảy ra lỗi khi thêm thể loại.",
      error: error.message,
    });
  }
};

// Lấy thể loại theo ID
export const getGenreById = async (req, res) => {
  const { genreId } = req.params;

  try {
    const genre = await Genre.findById(genreId);

    if (!genre) {
      return res.status(404).json({ message: "Thể loại không tồn tại." });
    }

    res.status(200).json({ message: "Lấy thể loại thành công.", genre });
  } catch (error) {
    res.status(500).json({
      message: "Đã xảy ra lỗi khi lấy thể loại.",
      error: error.message,
    });
  }
};

// Lấy tất cả thể loại
export const getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    res
      .status(200)
      .json({ message: "Lấy tất cả thể loại thành công.", genres });
  } catch (error) {
    res.status(500).json({
      message: "Đã xảy ra lỗi khi lấy tất cả thể loại.",
      error: error.message,
    });
  }
};

// Cập nhật thể loại
export const updateGenre = async (req, res) => {
  const { genreId } = req.params;
  const { name, description } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ message: "Tên thể loại không được để trống." });
  }

  try {
    const updatedGenre = await Genre.findByIdAndUpdate(
      genreId,
      { name, description },
      { new: true }
    );

    if (!updatedGenre) {
      return res.status(404).json({ message: "Thể loại không tồn tại." });
    }

    res.status(200).json({
      message: "Cập nhật thể loại thành công.",
      genre: updatedGenre,
    });
  } catch (error) {
    res.status(500).json({
      message: "Đã xảy ra lỗi khi cập nhật thể loại.",
      error: error.message,
    });
  }
};

// Xóa thể loại
export const deleteGenre = async (req, res) => {
  const { genreId } = req.params;

  try {
    const deletedGenre = await Genre.findByIdAndDelete(genreId);

    if (!deletedGenre) {
      return res.status(404).json({ message: "Thể loại không tồn tại." });
    }

    res
      .status(200)
      .json({ message: "Xóa thể loại thành công.", genre: deletedGenre });
  } catch (error) {
    res.status(500).json({
      message: "Đã xảy ra lỗi khi xóa thể loại.",
      error: error.message,
    });
  }
};
