import { ReadBook } from "../models/ReadBook.js";
import { Book } from "../models/Book.js";

export const ReadBookService = {
  addReadBook: async (readBookData) => {
    try {
      const { accountId, bookId, readStatus, currentPage } = readBookData;
      const readBook = new ReadBook({
        accountId,
        bookId,
        readStatus,
        currentPage,
      });

      let error = readBook.validateSync();
      if (error) {
        return {
          success: false,
          message:
            Object.values(error.errors)[0].message || "Dữ liệu không hợp lệ",
        };
      }

      const response = await readBook.save();
      if (response) {
        return { success: true, data: readBook };
      }
      return { success: false, message: "Thêm sách đang đọc không thành công" };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Lỗi thêm sách đang đọc" };
    }
  },

  getBooksByAccountId: async (accountId, page, limit) => {
    try {
      const skip = (page - 1) * limit;

      // Bước 1: Lấy tổng số bản ghi
      const total = await ReadBook.countDocuments({
        accountId: Number(accountId),
        isDeleted: false,
      });

      // Bước 2: Lấy danh sách bookId từ ReadBook
      const readBookList = await ReadBook.find({
        accountId: Number(accountId),
        isDeleted: false,
      })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .select("bookId readStatus currentPage startDate");

      // Bước 3: Lấy danh sách bookId
      const bookIds = readBookList.map((item) => item.bookId);

      // Bước 4: Lấy thông tin chi tiết của các sách từ bảng Book
      const booksInfo = await Book.find({
        bookId: { $in: bookIds },
        is_delete: false,
      }).select("bookId name author description thumbnail price");

      // Bước 5: Kết hợp thông tin từ ReadBook và Book
      const combinedBooks = readBookList
        .map((readBook) => {
          const bookInfo = booksInfo.find(
            (book) => book.bookId === readBook.bookId
          );
          if (!bookInfo) return null;

          return {
            readId: readBook.readId,
            readStatus: readBook.readStatus,
            currentPage: readBook.currentPage,
            startDate: readBook.startDate,
            book: bookInfo,
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
        message: "Lỗi khi lấy danh sách sách",
      };
    }
  },
};
