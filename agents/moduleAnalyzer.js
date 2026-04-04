import client from "../config/openai.js";

export async function analyzeModules(input) {
  const prompt = `
Act as a QA architect.

Analyze the following application requirement:

${input}

Tasks:
1. Identify all modules
2. Identify submodules / flows under each module

Return ONLY JSON in this format:

{
  "authentication": {
    "required": true,
    "steps": []
  },
  "modules": [
    {
      "name": "",
      "submodules": []
    }
  ]
}

Rules:
- Extract authentication separately if present
- Submodules should be meaningful flows
- Do not return anything except JSON
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.choices[0].message.content;

  // 🔥 Clean markdown (important)
  const cleaned = content
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("❌ Analyzer JSON parse failed:");
    console.log(content);
    throw err;
  }
}