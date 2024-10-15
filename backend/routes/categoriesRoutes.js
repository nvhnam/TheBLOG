import { Router } from "express";
import { getCategories } from "../controller/categoriesController.js";

const router = Router();

router.get("/categories", getCategories);

export default router;
