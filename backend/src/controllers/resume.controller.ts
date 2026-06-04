import { analyzeResume } from "../services/ai.service";
import { Request, Response } from "express";
import prisma from "../config/prisma";

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
        analysis: "Analysis Pending",
        roadmap: "Roadmap Pending",
      },
    });

    res.status(201).json(resume);
  } catch {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getUserResumes = async (req, res) => {
  try {
    console.log("GET USER RESUMES HIT");
    const { userId } = req.params;
    console.log("USER ID:", userId);
    const resumes = await prisma.resume.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log("RESUMES:", resumes);
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch resumes",
    });
  }
};
export const analyzeResumeController = async (
  req: Request,
  res: Response
) => {
  try {
    const { resumeId } = req.params;

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

    const result = await analyzeResume(
      resume.content
    );

    const updatedResume =
      await prisma.resume.update({
        where: {
          id: resumeId,
        },
        data: {
          analysis: result.analysis,
          roadmap: result.roadmap,
        },
      });

    res.json(updatedResume);
  } catch {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};