import { Router } from "express";
import {
  createResume,
  getUserResumes,
} from "../controllers/resume.controller";
import { analyzeResumeController } from "../controllers/resume.controller";
const router = Router();

router.post("/resume", createResume);
router.post(
  "/resume/analyze/:resumeId",
  analyzeResumeController
);

router.get(
  "/resume/:userId",
  getUserResumes
);

export default router;