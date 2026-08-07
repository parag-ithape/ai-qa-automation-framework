import fs from "fs";
import path from "path";
import { analyzeRequirements } from "../agents/requirementAnalyzer.js";
import { buildUnifiedContext } from "../ingestors/contextBuilder.js";
import {
  loadLegacyTextInput,
  loadLocalBundle,
} from "../ingestors/localBundleLoader.js";
import { buildAnalysisSummary } from "../utils/analysisSummary.js";
import {
  createRunDirectory,
  writeJson,
  writeText,
} from "../utils/runManager.js";

function parseArgs(argv) {
  const args = {
    phase: "1",
    source: "bundle",
    path: "./test-fixtures/sample-jira-bundle",
    file: "input.txt",
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
    }
  }

  return args;
}

async function loadBundle(args) {
  if (args.source === "text") {
    console.log(`📄 Loading legacy text input: ${args.file}`);
    return loadLegacyTextInput(args.file);
  }

  console.log(`📦 Loading local study bundle: ${args.path}`);
  return loadLocalBundle(args.path);
}

export async function runPhase1(args = {}) {
  const run = createRunDirectory();
  console.log(`🗂️  Run folder: ${run.runPath}`);

  const bundle = await loadBundle(args);
  const unifiedContext = buildUnifiedContext(bundle);

  writeJson(path.join(run.inputPath, "unifiedRequirements.json"), unifiedContext);
  writeJson(path.join(run.inputPath, "bundle-meta.json"), {
    mode: bundle.mode,
    ticket: bundle.ticket,
    wireframeAppPath: bundle.wireframeAppPath,
  });

  console.log("🧠 Analyzing requirements (multi-source)...");
  const moduleData = await analyzeRequirements(unifiedContext, {
    runId: run.runId,
  });

  const summary = buildAnalysisSummary(moduleData);
  const review = {
    phase: "requirement-analysis",
    status: "pending",
    reviewedBy: "",
    reviewedAt: "",
    comments: "Study mode — approve manually after reviewing analysis-summary.md",
  };

  writeJson(path.join(run.phase1Path, "moduleData.json"), moduleData);
  writeJson(path.join(run.phase1Path, "unifiedRequirements.json"), unifiedContext);
  writeText(path.join(run.phase1Path, "analysis-summary.md"), summary);
  writeJson(path.join(run.phase1Path, "review.json"), review);

  // Root-level copies for backward compatibility
  writeJson("moduleData.json", moduleData);

  console.log(`✅ Modules identified: ${moduleData.modules.length}`);
  console.log(`✅ Conflicts flagged: ${moduleData.conflicts.length}`);
  console.log(`✅ Gaps flagged: ${moduleData.gaps.length}`);
  console.log(`📋 Summary: ${path.join(run.phase1Path, "analysis-summary.md")}`);
  console.log(`⏸️  Review checkpoint #1: ${path.join(run.phase1Path, "review.json")} (status: pending)`);

  return { run, moduleData, unifiedContext };
}

if (process.argv[1]?.endsWith("runPhase1.js")) {
  const args = parseArgs(process.argv.slice(2));
  runPhase1(args).catch((error) => {
    console.error("❌ Phase 1 failed:", error.message);
    process.exit(1);
  });
}
