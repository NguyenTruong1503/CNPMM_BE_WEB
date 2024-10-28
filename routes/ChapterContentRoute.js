import express from 'express';
import { ChapterContentController } from '../controllers/ChapterContentController.js';

const router = express.Router();

router.post('/create',ChapterContentController.CreateChapterContent);

router.post('/update',ChapterContentController.UpdateChapterContent);

router.post('/delete', ChapterContentController.DeleteChapterContent);

router.get('/:chapterID', ChapterContentController.getAllContentByChapter);


export default router;