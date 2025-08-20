import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import Photo from "../models/productPhoto.js";
import path from "path";
import fs from "fs";
import express from "express";
import connectDB from "./db/db.js";

const app = express();
connectDB();
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

cloudinary.config({
  cloud_name: "dhuewvpgu",
  api_key: "977975679946186",
  api_secret: "Sh9FH-u-ANAIlZYcHAqW4ZSUk0g",
});
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const photoRoute = app.post(
  "/upload",
  upload.single("photo"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const tempFilePath = path.join(
        __dirname,
        "../upload",
        req.file.originalname
      );
      fs.writeFileSync(tempFilePath, req.file.buffer);

      const result = await cloudinary.uploader.upload(tempFilePath, {
        resource_type: "auto",
      });

      const newPhoto = new Photo({
        photoName: req.file.originalname,
        url: result.secure_url,
      });
      await newPhoto.save();
      return res.status(201).json({
        message: "File uploaded successfully",
        url: result.secure_url,
      });
    } catch (error) {
      return res.status(500).json({ message: "File upload failed", error });
    }
  }
);

// connectDB();
app.listen(process.env.PORT || 8000, process.env.HOST, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
