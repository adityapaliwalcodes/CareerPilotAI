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
      console.log(
        "AI RESPONSE:",
        JSON.stringify(analysis.data, null, 2)
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
  <div style={{ marginTop: "30px" }}>
    <div
      style={{
        border: "1px solid gray",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <h2>Resume Analysis</h2>

      {typeof result.analysis === "string" ? (
        <p>{result.analysis}</p>
      ) : (
        <>
          <h3>Strengths</h3>
          <ul>
            {result.analysis.strengths?.map(
              (item: string, index: number) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>

          <h3>Weaknesses</h3>
          <ul>
            {result.analysis.weaknesses?.map(
              (item: string, index: number) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
        </>
      )}
    </div>

    <div
      style={{
        border: "1px solid gray",
        padding: "20px",
      }}
    >
      <h2>Career Roadmap</h2>

      {typeof result.roadmap === "string" ? (
        <p>{result.roadmap}</p>
      ) : (
        <>
          <h3>Short Term</h3>
          <ul>
            {result.roadmap.shortTerm?.map(
              (item: string, index: number) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>

          <h3>Long Term</h3>
          <ul>
            {result.roadmap.longTerm?.map(
              (item: string, index: number) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
        </>
      )}
    </div>
  </div>
)}     
    </main>
  );
}
