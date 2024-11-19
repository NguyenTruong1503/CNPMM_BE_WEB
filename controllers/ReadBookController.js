import { ReadBookService } from "../services/ReadBookService.js";
import { ResponseData, ResponseDetail } from "../services/ResponseJSON.js";
export const ReadBookController = {
  AddReadBook: async (req, res) => {
    const readBookData = {
      accountId: req.body.accountId,
      bookId: req.body.bookId,
      readStatus: req.body.readStatus,
      currentPage: req.body.currentPage,
    };

    const result = await ReadBookService.addReadBook(readBookData);

    if (result.success) {
      return res.status(200).json(ResponseData(200, result.data));
    } else {
      const statusCode =
        result.message === "Lỗi thêm sách đang đọc" ? 500 : 400;
      return res
        .status(statusCode)
        .json(ResponseDetail(statusCode, { message: result.message }));
    }
  },
  GetBooksByAccountId: async (req, res) => {
    const accountId = parseInt(req.params.accountId);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await ReadBookService.getBooksByAccountId(
      accountId,
      page,
      limit
    );

    if (result.success) {
      return res.status(200).json(ResponseData(200, result.data));
    } else {
      return res
        .status(400)
        .json(ResponseDetail(400, { message: result.message }));
    }
  },
};
