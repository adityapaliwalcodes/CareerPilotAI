"use client";

import axios from "axios";
import { useState } from "react";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [result, setResult] = useState<any>(null);

  const createResume = async () => {
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
  };

  return (
    <main style={{ padding: "40px" }}>
      <h1>CareerPilot Dashboard</h1>

      <input
        placeholder="Resume Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Resume Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        cols={50}
      />

      <br /><br />

      <button onClick={createResume}>
        Analyze Resume
      </button>

      {result && (
        <pre>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}
