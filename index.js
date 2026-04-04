import fs from "fs";
import { analyzeModules } from "./agents/moduleAnalyzer.js";

async function run() {
  try {
    // 🔥 Step 1: Read input
    const input = fs.readFileSync("input.txt", "utf-8");
    console.log("📄 Input loaded...");

    // 🔥 Step 2: Analyze modules
    const moduleData = await analyzeModules(input);

    // 🔥 Step 3: Save analyzer output
    fs.writeFileSync(
      "moduleData.json",
      JSON.stringify(moduleData, null, 2)
    );

    console.log("✅ Module analysis saved to moduleData.json");

  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

run();