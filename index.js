import fs from "fs";
import { generateTestCases } from "./agents/testGenerator.js";
import { runPhase1 } from "./orchestrator/runPhase1.js";

function parseArgs(argv) {
  const args = {
    phase: "1",
    source: "bundle",
    path: "./test-fixtures/sample-jira-bundle",
    file: "input.txt",
    filter: "all",
  };

  for (const arg of argv) {
    if (arg.startsWith("--phase=")) {
      args.phase = arg.split("=")[1];
    } else if (arg.startsWith("--source=")) {
      args.source = arg.split("=")[1];
    } else if (arg.startsWith("--path=")) {
      args.path = arg.split("=")[1];
    } else if (arg.startsWith("--file=")) {
      args.file = arg.split("=")[1];
    } else if (arg.startsWith("--filter=")) {
      args.filter = arg.split("=")[1];
    }
  }

  return args;
}

function filterTestCases(testCases, filterType = "all") {
  if (filterType === "smoke") {
    return testCases.filter((tc) => tc.tags.includes("smoke"));
  }

  if (filterType === "high") {
    return testCases.filter((tc) => tc.priority === "High");
  }

  return testCases;
}

async function runFullPipeline(args) {
  const { moduleData } = await runPhase1(args);

  console.log("🧪 Generating test cases...");
  const result = await generateTestCases(JSON.stringify(moduleData, null, 2));

  result.testCases = filterTestCases(result.testCases, args.filter);
  result.summary.total = result.testCases.length;
  result.summary.smoke = result.testCases.filter((tc) =>
    tc.tags.includes("smoke")
  ).length;
  result.summary.regression = result.testCases.filter((tc) =>
    tc.tags.includes("regression")
  ).length;
  result.summary.highPriority = result.testCases.filter((tc) =>
    tc.priority === "High"
  ).length;

  fs.writeFileSync("testCases.json", JSON.stringify(result, null, 2));
  console.log(`✅ Test cases generated: ${result.testCases.length}`);
}

async function run() {
  try {
    const args = parseArgs(process.argv.slice(2));

    if (args.phase === "all") {
      await runFullPipeline(args);
      return;
    }

    await runPhase1(args);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

run();
