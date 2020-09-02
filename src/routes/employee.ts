import { Router } from "express";
import {
  getEmployees,
  createEmployee,
  editEmployee,
  deleteEmployee,
  getTeamSize,
  adjustTeamIndexes,
  resortTeamMembers
} from "../handlers/employee";
const router = Router();

router.get("/", getEmployees);
router.post("/", createEmployee);
router.post("/resort", resortTeamMembers);
router.patch("/:id", editEmployee);
router.delete("/:id", deleteEmployee);
router.get("/:teamName", getTeamSize);
router.post("/:teamName", adjustTeamIndexes);

export default router;
