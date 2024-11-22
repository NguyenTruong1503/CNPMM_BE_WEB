import mongoose from "mongoose";
import { Chapter } from "../models/Chapter.js";
import { ResponseDetail, ResponseData } from "./ResponseJSON.js";
import { ChapterContent } from "../models/ChapterContent.js";

export const ChapterService = {
  GetNextChapterNumber: async (bookID) => {
    try {
      // Tìm chapter có chapter_number lớn nhất của book
      const lastChapter = await Chapter.findOne({
        bookID: bookID,
      })
        .sort({ chapter_number: -1 }) // Sắp xếp giảm dần theo chapter_number
        .limit(1);

      // Nếu không có chapter nào, trả về 1
      // Nếu có, trả về chapter_number + 1
      return lastChapter ? lastChapter.chapter_number + 1 : 1;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  CreateChapter: async (chapter) => {
    try {
      const newChapter = await chapter.save();
      return newChapter;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  UpdateChapter: async (chapter) => {
    try {
      return await Chapter.findOneAndUpdate(
        { bookID: chapter.bookID, chapter_number: chapter.chapter_number },
        {
          chapter_number: chapter.chapter_number,
          chapter_title: chapter.chapter_title,
          publish_date: chapter.publish_date,
          chapter_view: chapter.chapter_view,
        },
        { new: true }
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  DeleteChapter: async (chapterID) => {
    try {
      return await Chapter.findByIdAndDelete(chapterID);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getChapterByBookAndNumber: async (chapter) => {
    try {
      return await Chapter.findOne({
        bookID: chapter.bookID,
        chapter_number: chapter.chapter_number,
      });
    } catch (error) {
      throw error;
    }
  },

  getChapterByID: async (chapterID) => {
    try {
      return await Chapter.findOne({
        _id: chapterID
      });
    } catch (error) {
      throw error;
    }
  },

  getListChapterByBook: async (bookID) => {
    try {
      return await Chapter.find({ bookID: bookID }).sort({ chapter_number: 1 });
    } catch (error) {
      throw error;
    }
  },
  getViewTotal: async () => {
    try {
        const total = await Chapter.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$chapter_view" }
                }
            }
        ])
        return await total[0].total
    }catch(error){
        console.log(error)
        throw error
    }
  },
  upView: async (chapterID) => {
    try {
      const result = await Chapter.findOneAndUpdate({ _id: chapterID },  { $inc: { chapter_view: 1 } }, { new: true })
      if (result)
        return { success: true, data: result }
      return {success:false, message: result}
    }catch(error){
        console.log(error)
        throw error
    }
},

};
