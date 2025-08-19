import express from "express";
import {
  deleteSingleProduct,
  getProductControllers,
  getSingleProduct,
  postSingleProduct,
  updateProduct,
} from "../controllers/productControllers.js";
import { sendEmail } from "../utlis/sendEmail.js";
import { sendMail1 } from "../utlis/emailSend.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to the Product API");
});
router.get("/products", getProductControllers);
router.get("/send-email", sendEmail);
router.get("/send-email1", sendMail1);
router.get("/product/:id", getSingleProduct);
router.delete("/delete/:id", deleteSingleProduct);
router.post("/post", postSingleProduct);
router.patch("/update/:id", updateProduct);

export default router;
