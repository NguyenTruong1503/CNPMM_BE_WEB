import express from "express";
import { AccountController } from "../controllers/AccountController.js";


const router = express.Router();
router.post('/', AccountController.createAccount);

export default router;