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
    getChapterByBookAndNumber: async (chapter) => {
        try {
            return await Chapter.findOne({ bookID: chapter.bookID, chapter_number: chapter.chapter_number})   
        } catch (error) {
           throw error
        }
    },

    getListChapterByBook: async (bookID) => {
        try {
            return await Chapter.find({ bookID:bookID}).sort({chapter_number:1})   
        } catch (error) {
            throw error
        }
    }
}