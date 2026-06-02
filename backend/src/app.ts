import resumeRoutes from "./routes/resume.routes";
import authRoutes from "./routes/auth.routes";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(resumeRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "CareerPilot AI Backend Running",
  });
});

app.use(authRoutes);
export default app;