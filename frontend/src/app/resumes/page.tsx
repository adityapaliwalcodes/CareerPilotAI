"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Resumes() {
  const [resumes, setResumes] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(
        "http://127.0.0.1:5000/resume/cmpw7yp820000f8hcyqf2jchf"
      )
      .then((res) => setResumes(res.data));
  }, []);

  return (
    <main style={{ padding: "40px" }}>
      <h1>My Resumes</h1>

      {resumes.map((resume) => (
        <div
          key={resume.id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <h3>{resume.title}</h3>
          <p>{resume.analysis}</p>
        </div>
      ))}
    </main>
  );
}