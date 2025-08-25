import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import SinglePhoto from "../../models/singlePhoto.js";

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

export const singlePhotoUpload1 = (req, res) => {
  upload.single("photo")(req, res, async (error) => {
    if (error) {
      return res.status(400).json({ message: "error", error: error.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Please upload file" });
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
      if (!result) {
        return res.status(400).json({
          message: "There is some error while uploading on Cloudinary",
        });
      }

      const newFile = new SinglePhoto({
        photoName: req.file.originalname,
        url: result.secure_url,
      });
      await newFile.save();
      fs.unlinkSync(tempFilePath);
      return res
        .status(201)
        .json({ message: "Uploaded Successfully", url: result.secure_url });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "catch error", error: error.message });
    }
  });
};
