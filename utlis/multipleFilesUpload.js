import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import Photo from "../models/productPhoto.js";

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.config({
  cloud_name: "dhuewvpgu",
  api_key: "977975679946186",
  api_secret: "Sh9FH-u-ANAIlZYcHAqW4ZSUk0g",
});

export const multiplePhotoUploading = (req, res) => {
  upload.array("photos", 10)(req, res, async (error) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Files upload failed", error: error.message });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(404).json({ message: "No files uploaded" });
    }

    try {
      let uploadedFiles = [];

      for (let i = 0; i < req.files.length; i++) {
        // const file = req.files[i];
        // Save temp file
        const tempFilePath = path.join(
          __dirname,
          "../upload",
          req.files[i].originalname
        );
        fs.writeFileSync(tempFilePath, req.files[i].buffer);
        // console.log(`File saved to ${tempFilePath}`);
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(tempFilePath, {
          resource_type: "auto",
        });

        // Remove temp file
        fs.unlinkSync(tempFilePath);
        // Collect in array
        // console.log(result.secure_url);
        uploadedFiles.push({
          photoName: req.files[i].originalname,
          url: result.secure_url,
        });
      }

      // Save ONE document with all files
      const newPhotoDoc = new Photo({
        // productId: req.body.productId, // must be passed in request body
        photos: uploadedFiles,
      });

      await newPhotoDoc.save();

      return res.status(201).json({
        message: "Files uploaded successfully",
        files: uploadedFiles,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Multiple file upload failed", error: error.message });
    }
  });
};
