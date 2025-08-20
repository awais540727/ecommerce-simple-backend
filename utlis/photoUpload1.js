import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import Photo from "../models/productPhoto.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// ✅ Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const photoUploading = (req, res) => {
  upload.single("photo")(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "File upload failed", error: err.message });
    }
    if (!req.file) {
      return res.status(404).json({ message: "No file uploaded" });
    }

    try {
      // Optional: save buffer to a temp file
      const tempFilePath = path.join(
        __dirname,
        "../upload",
        req.file.originalname
      );
      fs.writeFileSync(tempFilePath, req.file.buffer);

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(tempFilePath, {
        resource_type: "auto",
      });

      // Clean up local temp file after upload
      //   fs.unlinkSync(tempFilePath);

      // Save metadata in MongoDB
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
      console.error(error);
      return res
        .status(500)
        .json({ message: "File upload failed", error: error.message });
    }
  });
};
