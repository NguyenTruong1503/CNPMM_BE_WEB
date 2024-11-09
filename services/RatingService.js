// services/RatingService.js
import { Rating } from "../models/Rating.js";

export const RatingService = {
  addRating: async (ratingData) => {
    try {
      const { bookId, accountId, star } = ratingData;

      if (!bookId || !accountId || star === undefined) {
        return {
          success: false,
          status: 400,
          message: "Vui lòng cung cấp đầy đủ thông tin đánh giá.",
        };
      }

      const newRating = new Rating({
        bookId,
        accountId,
        star,
      });
      await newRating.save();

      return {
        success: true,
        data: {
          message: "Thêm đánh giá thành công.",
          rating: newRating,
        },
      };
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: "Đã xảy ra lỗi khi thêm đánh giá: " + error.message,
      };
    }
  },

  getRatingById: async (ratingId) => {
    try {
      const rating = await Rating.findById(ratingId);

      if (!rating) {
        return {
          success: false,
          status: 404,
          message: "Đánh giá không tồn tại.",
        };
      }

      return {
        success: true,
        data: {
          message: "Lấy đánh giá thành công.",
          rating,
        },
      };
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: "Đã xảy ra lỗi khi lấy đánh giá: " + error.message,
      };
    }
  },

  getRatingsByBookId: async (bookId) => {
    try {
      const ratings = await Rating.find({ bookId });
      return {
        success: true,
        data: {
          message: "Lấy tất cả đánh giá theo sách thành công.",
          ratings,
        },
      };
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: "Đã xảy ra lỗi khi lấy đánh giá: " + error.message,
      };
    }
  },

  updateRating: async (ratingId, ratingData) => {
    try {
      const { star } = ratingData;

      if (star === undefined) {
        return {
          success: false,
          status: 400,
          message: "Số sao đánh giá không được để trống.",
        };
      }

      const updatedRating = await Rating.findByIdAndUpdate(
        ratingId,
        { star },
        { new: true }
      );

      if (!updatedRating) {
        return {
          success: false,
          status: 404,
          message: "Đánh giá không tồn tại.",
        };
      }

      return {
        success: true,
        data: {
          message: "Cập nhật đánh giá thành công.",
          rating: updatedRating,
        },
      };
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: "Đã xảy ra lỗi khi cập nhật đánh giá: " + error.message,
      };
    }
  },

  deleteRating: async (ratingId) => {
    try {
      const deletedRating = await Rating.findByIdAndDelete(ratingId);

      if (!deletedRating) {
        return {
          success: false,
          status: 404,
          message: "Đánh giá không tồn tại.",
        };
      }

      return {
        success: true,
        data: {
          message: "Xóa đánh giá thành công.",
          rating: deletedRating,
        },
      };
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: "Đã xảy ra lỗi khi xóa đánh giá: " + error.message,
      };
    }
  },
};
