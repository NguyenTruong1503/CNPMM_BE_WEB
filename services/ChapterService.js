import mongoose from "mongoose"
import { Chapter } from "../models/Chapter.js"
import { ResponseDetail, ResponseData } from "./ResponseJSON.js"
import {ChapterContent} from "../models/ChapterContent.js"

export const ChapterService = {
    CreateChapter: async (chapter) => {
        try {
            return await chapter.save()
        }
        catch (error) {
            console.log(error)
            throw error
        }
    },
    UpdateChapter: async (chapter) => {
        try {
            return await Chapter.findOneAndUpdate({ bookID: chapter.bookID, chapter_number: chapter.chapter_number },
                { chapter_number: chapter.chapter_number, chapter_title: chapter.chapter_title, publish_date: chapter.publish_date, chapter_view: chapter.chapter_view },
                { new: true })
        }
        catch (error) {
            console.log(error)
            throw error
        }
    },
    DeleteChapter: async (chapter) => {
        try {
            return await Chapter.findOneAndDelete({chapter_number:chapter.chapter_number, bookID: chapter.bookID})
        }
        catch (error) {
            console.log(error)
            throw error
        }
    },
    getChapterByNumber: async (chapter) => {
        try {
            return await Chapter.findOne({ bookID: 2, chapter_number: 1})   
        } catch (error) {
            console.log(error)
            return res.status(500).json(ResponseDetail(500, { message: "Lỗi tải chương truyện" }))
        }
    },
    CreateChapterContent: async (chapterContent) => {
        try {
            return await chapterContent.save()
        }
        catch (error) {
            console.log(error)
            throw error
        }
    },
    UpdateChapterContent: async (chapterContent) => {
        try {
            return await ChapterContent.findOneAndUpdate({ chapterID: chapterContent.chapterID, contentID: chapterContent.contentID },
                { content: chapterContent.content },
                { new: true })
        }
        catch (error) {
            console.log(error)
            throw error
        }
    },
    DeleteChapterContent: async (chapterContent) => {
        try {
            return await ChapterContent.findOneAndDelete({chapterID:chapterContent.chapterID, contentID: chapterContent.contentID})
        }
        catch (error) {
            console.log(error)
            throw error
        }
    },
    getAllContentByChapter: async (chapterID) => {
        try {
            return await ChapterContent.find({ chapterID: chapterID}).sort({contentID:1})   
        } catch (error) {
            console.log(error)
            return res.status(500).json(ResponseDetail(500, { message: "Lỗi tải chương truyện" }))
        }
    }

}