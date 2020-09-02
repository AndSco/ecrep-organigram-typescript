import { RequestHandler } from "express";
import { Request, Response, NextFunction } from "express";
import { Document } from "mongoose";

interface MulterRequest extends Request {
  file: any;
  cloudinaryId: string;
}

export const uploadImageToDatabase = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  try {
    console.log("REQ FILE", req.file);
    const url = req.file.path;
    // const public_id = req.file.filename.split("/")[1];
    // console.log("Public id", public_id);

    res.status(200).json(url);
  } catch (err) {
    console.log("ERROR", err);
    return next(err);
  }
};
