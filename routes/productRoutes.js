import express from "express";
import {
  deleteSingleProduct,
  getProductControllers,
  getSingleProduct,
  postSingleProduct,
  updateProduct,
} from "../controllers/productControllers.js";

const router = express.Router();

router.get("/products", getProductControllers);
router.get("/product/:id", getSingleProduct);
router.delete("/delete/:id", deleteSingleProduct);
router.post("/post", postSingleProduct);
router.patch("/update/:id", updateProduct);

export default router;
