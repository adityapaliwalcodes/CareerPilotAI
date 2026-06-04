"use client";

import axios from "axios";
import { useState } from "react";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [result, setResult] = useState<any>(null);

  const createResume = async () => {
    try {
      const resume = await axios.post(
        "http://127.0.0.1:5000/resume",
        {
          title,
          content,
          userId: "cmpw7yp820000f8hcyqf2jchf",
        }
      );

      const analysis = await axios.post(
        `http://127.0.0.1:5000/resume/analyze/${resume.data.id}`
      );

      setResult(analysis.data);
    } catch (error) {
      console.error(error);
      alert("Error");
    }
  };

  return (
    <main style={{ padding: "40px" }}>
      <h1>CareerPilot AI</h1>

      <input
        placeholder="Resume Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />
      <br />

      <textarea
        rows={10}
        cols={60}
        placeholder="Resume Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br />
      <br />

      <button onClick={createResume}>
        Analyze Resume
      </button>

      {result && (
        <div>
          <h2>Analysis</h2>
          <p>{result.analysis}</p>

          <h2>Roadmap</h2>
          <pre>{result.roadmap}</pre>
        </div>
      )}
    </main>
  );
}
