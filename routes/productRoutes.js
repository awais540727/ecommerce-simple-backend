import express from "express";
import {
  deleteSingleProduct,
  getProductControllers,
  getSingleProduct,
  postSingleProduct,
  updateProduct,
} from "../controllers/productControllers.js";
import { sendEmail } from "../utlis/emails/sendEmail.js";
import { sendMail1 } from "../utlis/emails/emailSend.js";
import { sendEmail2 } from "../utlis/emails/send_email.js";
import { photoUploading } from "../utlis/photos/photoUpload1.js";
import { photoUploading2 } from "../utlis/photos/photoUploading2.js";
import { multiplePhotoUploading } from "../utlis/photos/multipleFilesUpload.js";
import { multipleFilesUpload } from "../utlis/photos/multipleFilesUploader1.js";
import { singlePhotoUpload } from "../utlis/photos/singleFileUpload.js";
import { singlePhotoUpload1 } from "../utlis/photos/singlePhotoUpload1.js";
import { singlePhotoUpload2 } from "../utlis/photos/singlePhotoUpload2.js";
// import { photoRoute } from "../utlis/photoUpload.js";
const router = express.Router();
// photoRoute();
router.get("/", (req, res) => {
  res.send("Welcome to the Product API");
});
// Photos routes for practice
router.post("/single-photo-1", singlePhotoUpload1);
router.post("/single-photo-2", singlePhotoUpload2);
router.post("/photo2", photoUploading2);
router.post("/photo3", singlePhotoUpload);
router.post("/photos", multiplePhotoUploading);
router.post("/photos4", multipleFilesUpload);
router.get("/products", getProductControllers);

// emails routes for practice
router.get("/send-email", sendEmail);
router.get("/send-email1", sendMail1);
router.get("/send-email2", sendEmail2);

// Product
router.get("/product/:id", getSingleProduct);
router.delete("/delete/:id", deleteSingleProduct);
router.post("/post", singlePhotoUpload1, postSingleProduct);
router.post("/photo", photoUploading);
router.patch("/update/:id", updateProduct);

export default router;
