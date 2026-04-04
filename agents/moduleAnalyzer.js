import client from "../config/openai.js";

export async function analyzeModules(input) {
  const prompt = `
Act as a QA architect.

Analyze the following application requirement:

${input}

Tasks:
1. Identify authentication (if present)
2. Identify all modules
3. Identify submodules (flows)
4. Classify each submodule:
   - Positive
   - Negative
   - Edge

Return ONLY JSON in this format:

{
  "authentication": {
    "required": true/false,
    "type": "UI/API",
    "steps": []
  },
  "modules": [
    {
      "name": "",
      "type": "Functional",
      "submodules": [
        {
          "name": "",
          "category": "Positive/Negative/Edge"
        }
      ]
    }
  ]
}

Rules:
- Authentication must be separate
- Submodules should be meaningful user flows
- Classification must be accurate
- Do not return anything except JSON
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.choices[0].message.content;

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