import express from 'express';
import { UserController } from '../controllers/UserController.js';
import { MiddlewareController } from '../controllers/MiddlewareController.js';

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.delete('/:id',MiddlewareController.verifyAdmin, UserController.deleteUser);

export default router;