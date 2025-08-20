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
import { sendEmail2 } from "../utlis/send_email.js";
import { photoUploading } from "../utlis/photoUpload1.js";
import { photoUploading2 } from "../utlis/photoUploading2.js";
import { multiplePhotoUploading } from "../utlis/multipleFilesUpload.js";
import { multipleFilesUpload } from "../utlis/multipleFilesUploader1.js";
import { singlePhotoUpload } from "../utlis/singleFileUpload.js";
// import { photoRoute } from "../utlis/photoUpload.js";
const router = express.Router();
// photoRoute();
router.get("/", (req, res) => {
  res.send("Welcome to the Product API");
});
router.post("/photo2", photoUploading2);
router.post("/photo3", singlePhotoUpload);
router.post("/photos", multiplePhotoUploading);
router.post("/photos4", multipleFilesUpload);
router.get("/products", getProductControllers);
router.get("/send-email", sendEmail);
router.get("/send-email1", sendMail1);
router.get("/send-email2", sendEmail2);
router.get("/product/:id", getSingleProduct);
router.delete("/delete/:id", deleteSingleProduct);
router.post("/post", postSingleProduct);
router.post("/photo", photoUploading);
router.patch("/update/:id", updateProduct);

export default router;
