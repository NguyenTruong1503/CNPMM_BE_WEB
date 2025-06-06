import express from "express";
import { UserController } from "../controllers/UserController.js";
import { MiddlewareController } from "../controllers/MiddlewareController.js";

const router = express.Router();
router.get("/", MiddlewareController.verifyAdmin, UserController.getAllUsers);
router.delete("/:id", MiddlewareController.verifyAdmin, UserController.deleteUser);
router.patch(
  "/:id",
  MiddlewareController.verifyToken,
  UserController.updateUser
);
router.get("/:id", UserController.findUserById);
export default router;
