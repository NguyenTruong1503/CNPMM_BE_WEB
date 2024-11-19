import express from "express";
import { FavoriteBookController } from "../controllers/FavoriteBookController.js";
import { MiddlewareController } from "../controllers/MiddlewareController.js";

const router = express.Router();

router.post(
  "/",
  MiddlewareController.verifyToken,
  FavoriteBookController.AddFavoriteBook
);

router.get(
  "/:accountId",
  MiddlewareController.verifyToken,
  FavoriteBookController.GetFavoriteBooksByAccountId
);

router.get(
  "/status/:accountId/:bookId",
  MiddlewareController.verifyToken,
  FavoriteBookController.GetFavoriteStatus
);

router.delete(
  "/",
  MiddlewareController.verifyToken,
  FavoriteBookController.RemoveFromFavorites
);
export default router;
