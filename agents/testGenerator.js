import client from "../config/openai.js";

export async function generateTestCases(moduleData) {
  const prompt = `
Act as a senior QA engineer.

Based on the following application structure:

${moduleData}

Generate enterprise-level test cases.

Return ONLY JSON in this format:

{
  "version": "1.0",
  "generatedAt": "",
  "testCases": [
    {
      "testId": "TC_001",
      "module": "",
      "submodule": "",
      "priority": "High/Medium/Low",
      "severity": "Critical/Major/Minor",
      "type": "Positive/Negative/Edge",
      "tags": ["smoke", "regression"],
      "preconditions": "",
      "testData": {},
      "steps": [],
      "expectedResult": ""
    }
  ]
}

Rules:
- Ensure unique testId
- Cover all modules
- Include smoke + regression
- Avoid duplicates
- Keep steps actionable
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