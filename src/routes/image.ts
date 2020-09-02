import { Router } from "express";
import multer from "multer";
import { cloudName, cloudinaryKey, cloudinarySecret } from "../config";
import { uploadImageToDatabase } from "../handlers/image";
import * as cloudinary from "cloudinary";
import cloudinaryStorage from "multer-storage-cloudinary";

cloudinary.v2.config({
  cloud_name: cloudName,
  api_key: cloudinaryKey,
  api_secret: cloudinarySecret
});

const storage: any = cloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: () => "organigram",
    allowed_formats: ["jpg", "png"],
    transformation: [{ width: 300, height: 300, crop: "limit" }]
  }
});

const parser = multer({ storage: storage });
const router = Router();

router.post("/", parser.single("image"), uploadImageToDatabase);

export default router;
