import { ReadBook } from "../models/ReadBook.js";
import { Book } from "../models/Book.js";
import { Chapter } from "../models/Chapter.js";
import { ChapterService } from "./ChapterService.js";

export const ReadBookService = {
  addReadBook: async (readBookData) => {
    try {
      const { accountID, bookID, chapterID, chapter_number } = readBookData;

      // Check if a record with the same bookId and accountId already exists
      const existingReadBook = await ReadBook.findOne({ accountID: accountID, bookID: bookID });

      if (existingReadBook) {
         if (chapter_number>existingReadBook.chapter_number){
           const response = await ReadBook.findOneAndUpdate(
             { accountID: accountID, bookID: bookID },
             { chapterID: chapterID, chapter_number: chapter_number },
             { new: true });
          if (response) return { success: true, data: response, message:"Cập nhật chap mới thành công" };
        }
        else
          return {
            success: true,
            message: "Sách này đã được thêm vào danh sách đọc của bạn.",
            data: existingReadBook,
          }
      }

      // If no existing record, create a new one
      const readBook = new ReadBook({
        accountID,
        bookID,
        chapterID,
        chapter_number
      });

      let error = readBook.validateSync();
      if (error) {
        return {
          success: false,
          message:
            Object.values(error.errors)[0].message || "Dữ liệu không hợp lệ",
        };
      }

      // Save the new readBook
      const response = await readBook.save();
      if (response) {
        return { success: true, data: readBook,message: "Thêm mới thành công" };
      }
      return { success: false, message: "Thêm sách đang đọc không thành công" };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Lỗi thêm sách đang đọc" };
    }
  },

  getBooksByAccountId: async (accountId, skip, limit) => {
    try {

      // Bước 1: Lấy tổng số bản ghi
      const total = await ReadBook.countDocuments({accountID: accountId});

      // Bước 2: Lấy danh sách bookId từ ReadBook
      const readBookList = await ReadBook.find({accountID: accountId})
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit)

      // Bước 3: Lấy danh sách bookId và chapterId
      const bookIds = readBookList.map((item) => item.bookID);
      const chapterIds = readBookList.map((item) => item.chapterID);

      // Bước 4: Lấy thông tin chi tiết của các sách từ bảng Book và chapter từ bảng Chapter
      const booksInfo = await Book.find({
        bookId: { $in: bookIds },
        is_delete: false,
      })
      const chaptersInfo = await Chapter.find({ _id: { $in: chapterIds } });

      // Bước 5: Kết hợp thông tin từ ReadBook và Book, Chapter
      const combinedBooks = readBookList
        .map((readBook) => {
          const bookInfo = booksInfo.find(
            (book) => book.bookId === readBook.bookID
          );
          const chapterInfo = chaptersInfo.find(
            (chapter) => chapter._id.toString() === readBook.chapterID.toString()
          );
          
          if (!bookInfo) return null;

          return {
            chapter: chapterInfo,
            startDate: readBook.startDate,
            book: bookInfo,
          };
        })
        .filter((book,chapter) => (book !== null && chapter !==null));

      return { success: true, books: combinedBooks, totalPages: Math.ceil(total / limit) }
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Lỗi khi lấy danh sách sách",
      };
    }
  },
};
