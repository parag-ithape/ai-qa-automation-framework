import fs from "fs";
import { analyzeModules } from "./agents/moduleAnalyzer.js";
import { generateTestCases } from "./agents/testGenerator.js";
import { getInput } from "./utils/inputProcessor.js";

// 🔥 Filter function
function filterTestCases(testCases, filterType = "all") {
  if (filterType === "smoke") {
    return testCases.filter(tc => tc.tags.includes("smoke"));
  }

  if (filterType === "high") {
    return testCases.filter(tc => tc.priority === "High");
  }

  return testCases;
}

async function run() {
  try {
    // 🔥 INPUT TYPE (text | docx)
    const sourceType = "text";

    const input = await getInput(sourceType);

    console.log("📄 Input loaded...");

    // 🔥 STEP 1: Analyze
    const moduleData = await analyzeModules(input);

    fs.writeFileSync(
      "moduleData.json",
      JSON.stringify(moduleData, null, 2)
    );

    console.log(`✅ Modules identified: ${moduleData.modules.length}`);

    // 🔥 STEP 2: Generate test cases
    const result = await generateTestCases(
      JSON.stringify(moduleData, null, 2)
    );

    // 🔥 STEP 3: Apply filter (optional)
    const filterType = "all"; // smoke | high | all
    result.testCases = filterTestCases(result.testCases, filterType);

    // 🔥 STEP 4: Update summary
    result.summary.total = result.testCases.length;

    result.summary.smoke = result.testCases.filter(tc =>
      tc.tags.includes("smoke")
    ).length;

    result.summary.regression = result.testCases.filter(tc =>
      tc.tags.includes("regression")
    ).length;

    result.summary.highPriority = result.testCases.filter(tc =>
      tc.priority === "High"
    ).length;

    // 🔥 STEP 5: Save final output
    fs.writeFileSync(
      "testCases.json",
      JSON.stringify(result, null, 2)
    );

    console.log(`✅ Test cases generated: ${result.testCases.length}`);

  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

run();
