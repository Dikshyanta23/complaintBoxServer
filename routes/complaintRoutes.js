import express from "express";
import {
  createComplaint,
  getComplaints,
  deleteComplaint,
  deleteAllComplaints,
  updateComplaintStatus,
} from "../controllers/complaintController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createComplaint); // No auth required

// Protected routes
router.post("/all", authMiddleware, getComplaints);
router.delete("/:id", authMiddleware, deleteComplaint);
router.delete("/", authMiddleware, deleteAllComplaints);
router.patch("/:id", authMiddleware, updateComplaintStatus);

export default router;
