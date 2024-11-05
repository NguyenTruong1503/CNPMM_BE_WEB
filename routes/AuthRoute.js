import express from "express";
import { AuthController } from "../controllers/AuthController.js";
import { MiddlewareController } from "../controllers/MiddlewareController.js";


const router = express.Router();
router.post('/', MiddlewareController.verifyToken, AuthController.createAccount);
router.post('/login', AuthController.loginUser);
router.post('/refresh', AuthController.refreshToken);

export default router;