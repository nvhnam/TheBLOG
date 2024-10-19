import { Router } from "express";
import { write } from "../controller/postsController.js";
import { getPosts, getPost } from "../controller/postsController.js";

const router = Router();

router.post("/write", write);
router.get("/all", getPosts);
router.get("/:producId", getPost);

export default router;
