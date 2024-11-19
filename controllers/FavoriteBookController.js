import { FavoriteBookService } from "../services/FavoriteBookService.js";
import { ResponseData, ResponseDetail } from "../services/ResponseJSON.js";

export const FavoriteBookController = {
  AddFavoriteBook: async (req, res) => {
    const favoriteBookData = {
      accountId: req.body.accountId,
      bookId: req.body.bookId,
    };

    const result = await FavoriteBookService.addFavoriteBook(favoriteBookData);

    if (result.success) {
      return res.status(200).json(ResponseData(200, result.data));
    } else {
      const statusCode =
        result.message === "Lỗi thêm sách yêu thích" ? 500 : 400;
      return res
        .status(statusCode)
        .json(ResponseDetail(statusCode, { message: result.message }));
    }
  },

  GetFavoriteBooksByAccountId: async (req, res) => {
    const accountId = parseInt(req.params.accountId);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await FavoriteBookService.getFavoriteBooksByAccountId(
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
  GetFavoriteStatus: async (req, res) => {
    const accountId = req.params.accountId;
    const bookId = req.params.bookId;

    const result = await FavoriteBookService.getFavoriteStatus(
      accountId,
      bookId
    );

    if (result.success) {
      return res.status(200).json(ResponseData(200, result.data));
    } else {
      return res
        .status(400)
        .json(ResponseDetail(400, { message: result.message }));
    }
  },

  RemoveFromFavorites: async (req, res) => {
    const accountId = req.body.accountId;
    const bookId = req.body.bookId;

    const result = await FavoriteBookService.removeFromFavorites(
      accountId,
      bookId
    );

    if (result.success) {
      return res.status(200).json(ResponseData(200, result.data));
    } else {
      const statusCode =
        result.message === "Lỗi khi xóa sách khỏi danh sách yêu thích"
          ? 500
          : 400;
      return res
        .status(statusCode)
        .json(ResponseDetail(statusCode, { message: result.message }));
    }
  },
};
