import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import Photo from "../models/productPhoto.js";

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
  cloud_name: "dhuewvpgu",
  api_key: "977975679946186",
  api_secret: "Sh9FH-u-ANAIlZYcHAqW4ZSUk0g",
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const multipleFilesUpload = (req, res) => {
  upload.array("photos01", 8)(req, res, async (error) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "File upload failed", error: error.message });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }
    try {
      let uploadedPhotos = [];
      // console.log(uploadedPhotos);
      for (let i = 0; i < req.files.length; i++) {
        const tempFilePath = path.join(
          __dirname,
          "../upload",
          req.files[i].originalname
        );
        fs.writeFileSync(tempFilePath, req.files[i].buffer);

        const result = await cloudinary.uploader.upload(tempFilePath, {
          resource_type: "auto",
        });
        // console.log(result.secure_url);
        fs.unlinkSync(tempFilePath); // Clean up temp file
        uploadedPhotos.push({
          photoName: req.files[i].originalname,
          url: result.secure_url,
        });
        // console.log(uploadedPhotos);
      }
      const newMultiplePhotos = new Photo({
        photos: uploadedPhotos,
      });
      await newMultiplePhotos.save();
      return res
        .status(201)
        .json({ message: "Files uploaded successfully", newMultiplePhotos });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error uploading files", error: error.message });
    }
  });
};
