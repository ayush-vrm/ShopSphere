import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
    createCategoryController,
    deleteCategoryController,
    getCategoryController,
    getOneCategoryController,
    updateCateggoryController
} from "../controllers/catgeoryController.js"

const router = express.Router()

router.post("/create-category", requireSignIn, isAdmin, createCategoryController);

router.put("/update-category/:id", requireSignIn, isAdmin, updateCateggoryController);

router.get("/categories", getCategoryController)

router.get("/get-category/:slug",getOneCategoryController)

router.delete("/delete/:id", requireSignIn, isAdmin, deleteCategoryController)

export default router