import client from "../config/openai.js";

export async function generateTestCases(url) {
  const prompt = `
  Act as a senior QA engineer with overall 10+ years of experience.

  Generate UI test cases for the following website:
  ${url}

  Return output ONLY in JSON format like this:

  [
    {
      "testName": "",
      "steps": ["", "", ""],
      "expectedResult": ""
    }
  ]

  Include:
  - Positive scenarios
  - Negative scenarios
  - Edge cases

  Do not return anything except JSON.
  `;
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });
  const content = response.choices[0].message.content;

// 🔥 Clean markdown formatting
const cleaned = content
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

try {
  const parsed = JSON.parse(cleaned);
  return parsed;
} catch (error) {
  console.error("❌ JSON parsing failed. Raw output:");
  console.log(content);
  throw error;
}
}