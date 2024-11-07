// services/GenreService.js
import { Genre } from "../models/Genre.js";

export const GenreService = {
  addGenre: async (genreData) => {
    try {
      const { name, description } = genreData;

      if (!name) {
        return {
          success: false,
          status: 400,
          message: "Tên thể loại không được để trống.",
        };
      }

      const newGenre = new Genre({ name, description });
      await newGenre.save();

      return {
        success: true,
        data: {
          message: "Thêm thể loại thành công.",
          genre: newGenre,
        },
      };
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: "Đã xảy ra lỗi khi thêm thể loại: " + error.message,
      };
    }
  },

  getGenreById: async (genreId) => {
    try {
      const genre = await Genre.findById(genreId);

      if (!genre) {
        return {
          success: false,
          status: 404,
          message: "Thể loại không tồn tại.",
        };
      }

      return {
        success: true,
        data: {
          message: "Lấy thể loại thành công.",
          genre,
        },
      };
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: "Đã xảy ra lỗi khi lấy thể loại: " + error.message,
      };
    }
  },

  getAllGenres: async () => {
    try {
      const genres = await Genre.find();
      return {
        success: true,
        data: {
          message: "Lấy tất cả thể loại thành công.",
          genres,
        },
      };
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: "Đã xảy ra lỗi khi lấy tất cả thể loại: " + error.message,
      };
    }
  },

  updateGenre: async (genreId, genreData) => {
    try {
      const { name, description } = genreData;

      if (!name) {
        return {
          success: false,
          status: 400,
          message: "Tên thể loại không được để trống.",
        };
      }

      const updatedGenre = await Genre.findByIdAndUpdate(
        genreId,
        { name, description },
        { new: true }
      );

      if (!updatedGenre) {
        return {
          success: false,
          status: 404,
          message: "Thể loại không tồn tại.",
        };
      }

      return {
        success: true,
        data: {
          message: "Cập nhật thể loại thành công.",
          genre: updatedGenre,
        },
      };
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: "Đã xảy ra lỗi khi cập nhật thể loại: " + error.message,
      };
    }
  },

  deleteGenre: async (genreId) => {
    try {
      const deletedGenre = await Genre.findByIdAndDelete(genreId);

      if (!deletedGenre) {
        return {
          success: false,
          status: 404,
          message: "Thể loại không tồn tại.",
        };
      }

      return {
        success: true,
        data: {
          message: "Xóa thể loại thành công.",
          genre: deletedGenre,
        },
      };
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: "Đã xảy ra lỗi khi xóa thể loại: " + error.message,
      };
    }
  },
};
