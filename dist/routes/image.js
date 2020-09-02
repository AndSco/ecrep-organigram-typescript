"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const config_1 = require("../config");
const image_1 = require("../handlers/image");
const cloudinary = __importStar(require("cloudinary"));
const multer_storage_cloudinary_1 = __importDefault(require("multer-storage-cloudinary"));
cloudinary.v2.config({
    cloud_name: config_1.cloudName,
    api_key: config_1.cloudinaryKey,
    api_secret: config_1.cloudinarySecret
});
const storage = multer_storage_cloudinary_1.default({
    cloudinary: cloudinary.v2,
    params: {
        folder: () => "organigram",
        allowed_formats: ["jpg", "png"],
        transformation: [{ width: 300, height: 300, crop: "limit" }]
    }
});
const parser = multer_1.default({ storage: storage });
const router = express_1.Router();
router.post("/", parser.single("image"), image_1.uploadImageToDatabase);
exports.default = router;
