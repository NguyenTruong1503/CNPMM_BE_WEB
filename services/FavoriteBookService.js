import { FavoriteBook } from "../models/FavoriteBook.js";
import { Book } from "../models/Book.js";

export const FavoriteBookService = {
  addFavoriteBook: async (favoriteBookData) => {
    try {
      const { accountId, bookId } = favoriteBookData;

      // Kiểm tra xem sách đã được yêu thích chưa
      const existingFavorite = await FavoriteBook.findOne({
        accountId: Number(accountId),
        bookId: Number(bookId),
        isDeleted: false,
      });

      if (existingFavorite) {
        return {
          success: false,
          message: "Sách đã được thêm vào danh sách yêu thích",
        };
      }

      const favoriteBook = new FavoriteBook({
        accountId,
        bookId,
      });

      let error = favoriteBook.validateSync();
      if (error) {
        return {
          success: false,
          message:
            Object.values(error.errors)[0].message || "Dữ liệu không hợp lệ",
        };
      }

      const response = await favoriteBook.save();
      if (response) {
        return { success: true, data: favoriteBook };
      }
      return {
        success: false,
        message: "Thêm sách yêu thích không thành công",
      };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Lỗi thêm sách yêu thích" };
    }
  },

  getFavoriteBooksByAccountId: async (accountId, page, limit) => {
    try {
      const skip = (page - 1) * limit;

      const total = await FavoriteBook.countDocuments({
        accountId: Number(accountId),
        isDeleted: false,
      });

      const favoriteBooks = await FavoriteBook.find({
        accountId: Number(accountId),
        isDeleted: false,
      })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

      const bookIds = favoriteBooks.map((item) => item.bookId);

      const booksInfo = await Book.find({
        bookId: { $in: bookIds },
        is_delete: false,
      }).select("bookId name author description thumbnail price");

      const combinedBooks = favoriteBooks
        .map((favorite) => {
          const bookInfo = booksInfo.find(
            (book) => book.bookId === favorite.bookId
          );
          if (!bookInfo) return null;

          return {
            favoriteId: favorite.favoriteId,
            book: bookInfo,
            createdAt: favorite.createdAt,
          };
        })
        .filter((book) => book !== null);

      return {
        success: true,
        data: {
          books: combinedBooks,
          pagination: {
            currentPage: Number(page),
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            itemsPerPage: Number(limit),
          },
        },
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Lỗi khi lấy danh sách sách yêu thích",
      };
    }
  },
  getFavoriteStatus: async (accountId, bookId) => {
    try {
      const favoriteBook = await FavoriteBook.findOne({
        accountId: Number(accountId),
        bookId: Number(bookId),
        isDeleted: false,
      });

      return {
        success: true,
        data: {
          isFavorite: !!favoriteBook,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Lỗi khi kiểm tra trạng thái yêu thích",
      };
    }
  },

  removeFromFavorites: async (accountId, bookId) => {
    try {
      const favoriteBook = await FavoriteBook.findOne({
        accountId: Number(accountId),
        bookId: Number(bookId),
        isDeleted: false,
      });

      if (!favoriteBook) {
        return {
          success: false,
          message: "Sách không tồn tại trong danh sách yêu thích",
        };
      }

      favoriteBook.isDeleted = true;
      await favoriteBook.save();

      return {
        success: true,
        data: favoriteBook,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Lỗi khi xóa sách khỏi danh sách yêu thích",
      };
    }
  },
};
