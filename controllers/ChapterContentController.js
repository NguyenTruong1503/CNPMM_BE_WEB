import mongoose from "mongoose"
import { ResponseDetail, ResponseData } from "../services/ResponseJSON.js"
import { ChapterContentService } from "../services/ChapterContentService.js"
import {ChapterContent} from "../models/ChapterContent.js"

export const ChapterContentController = {
    CreateChapterContent: async (req, res) => {
        try {
            const content_number = req.body.content_number
            const chapterID = req.body.chapterID
            const content = req.body.content
            const chapterContent = await new ChapterContent({content_number,chapterID,content})
            const response = await ChapterContentService.CreateChapterContent(chapterContent)
            return res.status(200).json(ResponseData(200, response))
        }
        catch (error) {
            console.log(error)
            return res.status(500).json(ResponseDetail(500, { message: "Lỗi đăng truyện" }))
        }
    },
    UpdateChapterContent: async (req, res) => {
        try {
            const content_number = req.body.content_number
            const chapterID = req.body.chapterID
            const content = req.body.content
            const chapterContent = await new ChapterContent({content_number,chapterID,content})
            const response = await ChapterContentService.UpdateChapterContent(chapterContent)
            if (response) return res.status(200).json(ResponseData(200, response))
            return res.status(400).json(ResponseDetail(400, { message: "Cập nhật chương không thành công" }))
        }
        catch (error) {
            console.log(error)
            return res.status(500).json(ResponseDetail(500, { message: "Lỗi cập nhật chương truyện" }))
        }
    },
    DeleteChapterContent: async (req, res) => {
        try {
            const content_number = req.body.content_number
            const chapterID = req.body.chapterID
            const content = req.body.content
            const chapterContent = await new ChapterContent({content_number,chapterID,content})
            const response = await ChapterContentService.DeleteChapterContent(chapterContent)
            if (response) return res.status(200).json(ResponseData(200, response))
            return res.status(400).json(ResponseDetail(400, { message: "Không tìm thấy chương" }))
        }
        catch (error) {
            console.log(error)
            return res.status(500).json(ResponseDetail(500, { message: "Lỗi xóa chương truyện" }))
        }
    },
    getAllContentByChapterNumber: async (req, res) => {
        try {
            const chapterID = req.params.chapterID
            const response = await ChapterContentService.getAllContentByChapterNumber(chapterID)
            if (response) return res.status(200).json(ResponseData(200, response))
            return res.status(400).json(ResponseDetail(400, { message: "Không tìm thấy chương" }))
        } catch (error) {
            console.log(error)
            return res.status(500).json(ResponseDetail(500, { message: "Lỗi tải chương truyện" }))
        }
    }

}