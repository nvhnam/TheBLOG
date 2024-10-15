import { Router } from "express";
import { write } from "../controller/postsController.js";

const router = Router();

router.post("/write", write);

export default router;
