import mongoose from "mongoose";
import { Chapter } from "../models/Chapter.js";
import { ResponseDetail, ResponseData } from "../services/ResponseJSON.js";
import { ChapterService } from "../services/ChapterService.js";
import { ChapterContent } from "../models/ChapterContent.js";

export const ChapterController = {
  CreateChapter: async (req, res) => {
    try {
      const bookID = req.body.bookID;
      const chapter_title = req.body.chapter_title;
      const publish_date = req.body.publish_date || new Date();
      const chapter_view = req.body.chapter_view || 0;

      // Lấy chapter_number tự động từ service
      const chapter_number = await ChapterService.GetNextChapterNumber(bookID);

      const chapter = await new Chapter({
        bookID,
        chapter_number,
        chapter_title,
        publish_date,
        chapter_view,
      });

      const response = await ChapterService.CreateChapter(chapter);
      return res.status(200).json(ResponseData(200, response));
    } catch (error) {
      console.log(error);
      return res.status(500).json(
        ResponseDetail(500, {
          message: "Lỗi đăng chương truyện",
        })
      );
    }
  },
  UpdateChapter: async (req, res) => {
    try {
      const bookID = req.body.bookID;
      const chapter_number = req.body.chapter_number;
      const chapter_title = req.body.chapter_title;
      const publish_date = req.body.publish_date;
      const chapter_view = req.body.chapter_view;
      const chapter = await new Chapter({
        bookID,
        chapter_number,
        chapter_title,
        publish_date,
        chapter_view,
      });
      const response = await ChapterService.UpdateChapter(chapter);
      if (response) return res.status(200).json(ResponseData(200, response));
      return res
        .status(400)
        .json(
          ResponseDetail(400, { message: "Cập nhật chương không thành công" })
        );
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json(ResponseDetail(500, { message: "Lỗi cập nhật chương truyện" }));
    }
  },
  DeleteChapter: async (req, res) => {
    try {
      const chapterID = req.params.id;
      const response = await ChapterService.DeleteChapter(chapterID);

      if (response) {
        return res.status(200).json(ResponseData(200, response));
      }

      return res.status(404).json(
        ResponseDetail(404, {
          message: "Không tìm thấy chapter",
        })
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json(
        ResponseDetail(500, {
          message: "Lỗi xóa chapter",
        })
      );
    }
  },
  getChapterByBookAndNumber: async (req, res) => {
    try {
      const bookID = req.params.bookID;
      const chapter_number = req.params.chapter_number;
      const chapter = new Chapter({ bookID, chapter_number });
      const response = await ChapterService.getChapterByBookAndNumber(chapter);
      if (response) return res.status(200).json(ResponseData(200, response));
      return res
        .status(400)
        .json(ResponseDetail(400, { message: "Không tìm thấy chương" }));
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json(ResponseDetail(500, { message: "Lỗi tải chương truyện" }));
    }
  },

  getListChapterByBook: async (req, res) => {
    try {
      const bookID = req.params.bookID;
      const response = await ChapterService.getListChapterByBook(bookID);
      if (response) return res.status(200).json(ResponseData(200, response));
      return res
        .status(400)
        .json(ResponseDetail(400, { message: "Không tìm thấy chương" }));
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json(ResponseDetail(500, { message: "Lỗi tải chương truyện" }));
    }
  },
};
