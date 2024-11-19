// ReadBookRoute.js
import express from "express";
import { ReadBookController } from "../controllers/ReadBookController.js";
import { MiddlewareController } from "../controllers/MiddlewareController.js";

const router = express.Router();

router.post(
  "/",
  MiddlewareController.verifyToken,
  ReadBookController.AddReadBook
);
router.get(
  "/:accountId",
  MiddlewareController.verifyToken,
  ReadBookController.GetBooksByAccountId
);
export default router;
