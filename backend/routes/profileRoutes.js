import { Router } from "express";
import { getUserPosts } from "../controller/postsController.js";

const router = Router();

router.get("/:userId", getUserPosts);

export default router;
