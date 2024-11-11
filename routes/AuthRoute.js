import express from "express";
import { AuthController } from "../controllers/AuthController.js";
import { MiddlewareController } from "../controllers/MiddlewareController.js";

const router = express.Router();

router.post('/register', AuthController.createAccount);
router.post('/login', AuthController.loginUser);
router.post('/refresh', AuthController.refreshToken);
router.post('/logout', MiddlewareController.verifyToken,  AuthController.logoutUser);
router.get('/verify', AuthController.verify);



export default router;
