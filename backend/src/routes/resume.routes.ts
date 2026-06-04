import { Router } from "express";
import {
  createResume,
  getUserResumes,
  analyzeResumeController,
} from "../controllers/resume.controller";

const router = Router();

// Create Resume
router.post("/resume", createResume);

// Analyze Resume
router.post(
  "/resume/analyze/:resumeId",
  analyzeResumeController
);

// Get all resumes of a user
router.get(
  "/resume/:userId",
  getUserResumes
);

export default router;