import mongoose from "mongoose"
import { ResponseDetail, ResponseData } from "./ResponseJSON.js"
import {ChapterContent} from "../models/ChapterContent.js"

export const ChapterContentService = {
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
            return await ChapterContent.findOneAndUpdate({ chapterID: chapterContent.chapterID, content_number: chapterContent.content_number},
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
            return await ChapterContent.findOneAndDelete({chapterID:chapterContent.chapterID, content_number: chapterContent.content_number})
        }
        catch (error) {
            console.log(error)
            throw error
        }
    },
    getAllContentByChapterNumber: async (chapterID) => {
        try {
            return await ChapterContent.find({ chapterID:chapterID}).sort({content_number:1})   
        } catch (error) {
            console.log(error)
            return res.status(500).json(ResponseDetail(500, { message: "Lỗi tải chương truyện" }))
        }
    }

}