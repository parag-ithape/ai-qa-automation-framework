import fs from "fs";
import { generateTestCases } from "./agents/testGenerator.js";

async function run() {
  const url = "https://example.com";

  const testCases = await generateTestCases(url);

  // ✅ Print in console
  console.log("\n✅ Generated Test Cases:\n");
  console.log(testCases);

  // ✅ Save to file
  fs.writeFileSync(
    "testCases.json",
    JSON.stringify(testCases, null, 2)
  );

  console.log("\n📁 Saved to testCases.json");
}

run();