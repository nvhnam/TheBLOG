import { Router } from "express";
import { getUserPosts } from "../controller/postsController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/:userId", authMiddleware, getUserPosts);

export default router;
