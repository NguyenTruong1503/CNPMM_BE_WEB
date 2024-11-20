import express from "express";
import { ChapterController } from "../controllers/ChapterController.js";
import { MiddlewareController } from "../controllers/MiddlewareController.js";

const router = express.Router();

router.post(
  "/create",
  MiddlewareController.verifyAdmin,
  ChapterController.CreateChapter
);

router.post(
  "/update",
  MiddlewareController.verifyAdmin,
  ChapterController.UpdateChapter
);

router.get("/viewtotal", ChapterController.getViewTotal);

router.delete(
  "/:id",
  MiddlewareController.verifyAdmin,
  ChapterController.DeleteChapter
);
router.get(
  "/:bookID/:chapter_number",
  ChapterController.getChapterByBookAndNumber
);

router.get("/:bookID", ChapterController.getListChapterByBook);

export default router;
