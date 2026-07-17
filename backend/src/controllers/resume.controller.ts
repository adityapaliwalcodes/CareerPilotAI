import { Request, Response } from "express";
import prisma from "../config/prisma";
import { analyzeResume } from "../services/ai.service";

export const createResume = async (
  req: Request,
  res: Response
) => {
  try {
    const { title, content, userId } = req.body;

    const resume = await prisma.resume.create({
      data: {
        title,
        content,
        userId,
        analysis: {},
        roadmap: {},
        
      },
    });

    return res.status(201).json(resume);
  } catch (error) {
    console.error("CREATE RESUME ERROR:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getUserResumes = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;

    const resumes = await prisma.resume.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(resumes);
  } catch (error) {
    console.error("GET RESUMES ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch resumes",
    });
  }
};

export const analyzeResumeController = async (
  req: Request,
  res: Response
) => {
  try {
    console.log("=== ANALYZE CONTROLLER HIT ===");

    const resumeId = String(req.params.resumeId);

    const resume = await prisma.resume.findUnique({
      where: {
        id: resumeId,
      },
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    console.log("Calling Gemini...");

    const result = await analyzeResume(
      resume.content
    );

    console.log("Gemini Result:", result);

    const updatedResume = await prisma.resume.update({
      where: {
        id: resumeId,
      },
      data: {
        analysis: result.analysis,
        roadmap: result.roadmap,
      },
    });

    return res.json(updatedResume);
  } catch (error: any) {
    console.error("ANALYZE ERROR:", error);

    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};