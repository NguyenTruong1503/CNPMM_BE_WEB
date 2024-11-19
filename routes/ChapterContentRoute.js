import express from "express";
import { ChapterContentController } from "../controllers/ChapterContentController.js";
import { MiddlewareController } from "../controllers/MiddlewareController.js";

const router = express.Router();

router.post(
  "/create",
  MiddlewareController.verifyAdmin,
  ChapterContentController.CreateChapterContent
);

router.post(
  "/update",
  MiddlewareController.verifyAdmin,
  ChapterContentController.UpdateChapterContent
);

router.post(
  "/delete",
  MiddlewareController.verifyAdmin,
  ChapterContentController.DeleteChapterContent
);

router.get("/:chapterID", ChapterContentController.getAllContentByChapterID);

export default router;
