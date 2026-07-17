import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function analyzeResume(content: string) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.2,

    messages: [
      {
        role: "system",
        content: `
You are an expert Software Engineering Career Coach.

Your job is to analyze resumes for software internships and placements.

IMPORTANT RULES:

1. Return ONLY valid JSON.
2. Do NOT write markdown.
3. Do NOT write explanations.
4. Do NOT rename keys.
5. Do NOT add extra keys.
6. Always follow this schema EXACTLY.

{
  "analysis": {
    "strengths": [
      "..."
    ],
    "weaknesses": [
      "..."
    ]
  },
  "roadmap": {
    "shortTerm": [
      "..."
    ],
    "longTerm": [
      "..."
    ]
  }
}
`,
      },
      {
        role: "user",
        content,
      },
    ],
  });

  const text = completion.choices[0].message.content ?? "";

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}