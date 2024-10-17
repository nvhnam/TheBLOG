import { Router } from "express";
import { write } from "../controller/postsController.js";
import { getPosts } from "../controller/postsController.js";

const router = Router();

router.post("/write", write);
router.get("/all", getPosts);

export default router;
