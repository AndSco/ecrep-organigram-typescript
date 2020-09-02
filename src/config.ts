import { resolve } from "path";
import { config } from "dotenv";

config({ path: resolve(__dirname, "../.env") });

export const mongoProductionConnection = process.env.MONGO_CONNECTION;
export const mongoDevelopmentConnection = process.env.MONGO_DEVELOPMENT;
export const adminPassword = process.env.ADMIN_LOGIN;
export const readerPassword = process.env.READER_LOGIN;
export const cloudName = process.env.CLOUD_NAME;
export const cloudinaryKey = process.env.CLOUDINARY_KEY;
export const cloudinarySecret = process.env.CLOUDINARY_SECRET;
