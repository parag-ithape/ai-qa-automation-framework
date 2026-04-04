import fs from "fs";
import { generateTestCases } from "./agents/testGenerator.js";

// 🔥 Validation function (enterprise touch)
function validateTestCases(testCases) {
  return testCases.filter(tc =>
    tc.testId &&
    tc.steps &&
    tc.expectedResult
  );
}

async function run() {
  // 🔥 Use requirement instead of URL
  const input = "Login functionality for SauceDemo application";

  const testCases = await generateTestCases(input);

  console.log(`\nGenerated ${testCases.length} test cases\n`);

  // 🔥 Validate
  const validCases = validateTestCases(testCases);

  // 🔥 Save to file
  fs.writeFileSync(
    "testCases.json",
    JSON.stringify(validCases, null, 2)
  );

  console.log("✅ Enterprise test cases saved to testCases.json");
}

run();