import client from "../config/openai.js";

export async function generateTestCases(moduleData) {
  const prompt = `
Act as a senior QA engineer.

Based on the following application structure:

${moduleData}

Generate test cases in STRICT enterprise JSON format.

Return ONLY JSON in this EXACT structure:

{
  "version": "1.0",
  "generatedAt": "",
  "application": "SauceDemo",
  "environment": "QA",
  "summary": {
    "total": 0,
    "smoke": 0,
    "regression": 0,
    "highPriority": 0
  },
  "testCases": [
    {
      "testId": "TC_001",
      "title": "",
      "module": "",
      "submodule": "",
      "priority": "High/Medium/Low",
      "severity": "Critical/Major/Minor",
      "type": "Positive/Negative/Edge",
      "tags": ["smoke", "regression"],
      "preconditions": [],
      "testData": {},
      "steps": [],
      "expectedResult": "",
      "postconditions": [],
      "status": "Not Executed"
    }
  ]
}

Rules:
- Do NOT change structure
- Ensure unique testId
- Fill all fields properly
- Cover all modules
- Include positive, negative, edge cases
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
  } catch (error) {
    console.error("❌ Generator JSON parse failed:");
    console.log(content);
    throw error;
  }
}