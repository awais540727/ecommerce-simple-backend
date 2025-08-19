import express from "express";
import {
  deleteCategoryController,
  getAllCategoriesController,
  getSingleCategoryController,
  updateCategoryController,
  postNewCategoryController,
  getSingleCategoryBySlugController,
} from "../controllers/categoriesControllers.js";

const router = express.Router();

router.get("/categories", getAllCategoriesController);

router.get("/category/:id", getSingleCategoryController);

// router.get("/category-slug/:title", getSingleCategoryBySlugController);

router.get("/category-slug/search", getSingleCategoryBySlugController);

router.post("/create-category", postNewCategoryController);

router.delete("/delete-category/:id", deleteCategoryController);

router.patch("/update-category/:id", updateCategoryController);

export default router;
