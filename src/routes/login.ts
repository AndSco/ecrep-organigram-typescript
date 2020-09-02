import { Router } from "express";
import { login } from "../handlers/login";
const router = Router();

router.post("/", login);

export default router;
