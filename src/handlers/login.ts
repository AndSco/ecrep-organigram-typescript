import { RequestHandler } from "express";
import { adminPassword, readerPassword } from "../config";
import { Role } from "../models/Role";

export const login: RequestHandler = (req, res, next) => {
  try {
    let role: Role;
    let status: number;
    if ((req.body.password as string) === adminPassword) {
      role = "admin";
      status = 200;
    } else if ((req.body.password as string) === readerPassword) {
      role = "reader";
      status = 200;
    } else {
      role = "unauthorised";
      status = 200;
    }
    res.status(status).json({ role });
  } catch (err) {
    return next(err);
  }
};
