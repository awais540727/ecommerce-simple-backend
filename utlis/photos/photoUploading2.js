import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import Photo from "../../models/productPhoto.js";

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

export const photoUploading2 = (req, res) => {
  upload.single("photo")(req, res, async (error) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "File upload failed", error: error.message });
    }
    if (!req.file) {
      return res.status(404).json({ message: "No file uploaded" });
    }
    try {
      const tempFilePath = path.join(
        __dirname,
        "../upload",
        req.file.originalname
      );
      fs.writeFileSync(tempFilePath, req.file.buffer);
      const result = await cloudinary.uploader.upload(tempFilePath, {
        resource_type: "auto",
      });
      // console.log(result);
      fs.unlinkSync(tempFilePath);
      const newFile = new Photo({
        photoName: req.file.originalname,
        url: result.secure_url,
      });
      await newFile.save();
      return res.status(201).json({
        message: "File uploaded successfully",
        url: result.secure_url,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "File saving failed", error: error.message });
    }
  });
};
