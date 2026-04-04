import fs from "fs";
import { analyzeModules } from "./agents/moduleAnalyzer.js";
import { generateTestCases } from "./agents/testGenerator.js";
import { getInput } from "./utils/inputProcessor.js";

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
    // 🔥 Choose input type
    const sourceType = "text"; // text | docx

    const input = await getInput(sourceType);

    console.log("📄 Input loaded...");

    // 🔥 Analyzer
    const moduleData = await analyzeModules(input);

    fs.writeFileSync(
      "moduleData.json",
      JSON.stringify(moduleData, null, 2)
    );

    console.log(`✅ Modules identified: ${moduleData.modules.length}`);

    // 🔥 Generator
    const result = await generateTestCases(
      JSON.stringify(moduleData, null, 2)
    );

    // 🔥 Filtering (optional)
    const filterType = "all"; // smoke | high | all
    result.testCases = filterTestCases(result.testCases, filterType);

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