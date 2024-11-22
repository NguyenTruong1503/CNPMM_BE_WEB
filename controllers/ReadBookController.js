import { Chapter } from "../models/Chapter.js";
import { ReadBookService } from "../services/ReadBookService.js";
import { ResponseData, ResponseDetail } from "../services/ResponseJSON.js";
export const ReadBookController = {
  AddReadBook: async (req, res) => {
    const readBookData = {
      accountID: req.body.accountID,
      bookID: req.body.bookID,
      chapterID: req.body.chapterID,
      chapter_number: req.body.chapter_number, 
    };

    const result = await ReadBookService.addReadBook(readBookData);

    if (result.success) {
      return res.status(200).json({ data: result.data, message: result.message });
    } else {
      const statusCode =
        result.message === "Lỗi thêm sách đang đọc" ? 500 : 400;
      return res
        .status(statusCode)
        .json(ResponseDetail(statusCode, { message: result.message }));
    }
  },
  GetBooksByAccountId: async (req, res) => {
    const accountId = req.params.accountId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const result = await ReadBookService.getBooksByAccountId(accountId,skip,limit);

    if (result.success) {
      return res.status(200).json({ data: result.books, totalPages: result.totalPages });
    } else {
      return res
        .status(400)
        .json(ResponseDetail(400, { message: result.message }));
    }
  },
};
