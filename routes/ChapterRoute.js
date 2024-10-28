import express from 'express';
import { ChapterController } from '../controllers/ChapterController';

const router = express.Router();

router.post('/create',ChapterController.CreateChapter);

router.post('/update',ChapterController.UpdateChapter);

router.post('/delete', ChapterController.DeleteChapter);

router.get('/find/:bookID/:chapter_number', ChapterController.getChapterByNumber);

export default router;