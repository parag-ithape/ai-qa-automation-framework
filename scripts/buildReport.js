// Builds a showcase report (Markdown + JSON copies) from the latest pipeline run.
// Usage: node scripts/buildReport.js [outDir]   (default: reports/latest)
import fs from "fs";
import path from "path";

const outDir = process.argv[2] || "reports/latest";
fs.mkdirSync(outDir, { recursive: true });

const esc = (v) => String(v ?? "").replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
const list = (items) =>
  Array.isArray(items) && items.length ? items.map((i) => `- ${i}`).join("\n") : "_None_";

function latestRunDir() {
  if (!fs.existsSync("runs")) return null;
  const dirs = fs
    .readdirSync("runs")
    .map((d) => path.join("runs", d))
    .filter((d) => fs.existsSync(path.join(d, "phase1-requirement-analysis")))
    .sort();
  return dirs.at(-1) || null;
}

const lines = [];
const runDir = latestRunDir();
const phase1Dir = runDir && path.join(runDir, "phase1-requirement-analysis");

lines.push("# 🤖 AI QA Pipeline — Latest Results", "");
lines.push(`_Generated: ${new Date().toISOString()}_`, "");

// ---- Test cases ----
const testCasesPath = "testCases.json";
if (fs.existsSync(testCasesPath)) {
  const r = JSON.parse(fs.readFileSync(testCasesPath, "utf8"));
  const tcs = r.testCases || [];
  const s = r.summary || {};
  fs.copyFileSync(testCasesPath, path.join(outDir, "testCases.json"));

  lines.push("## 📊 Test Case Summary", "");
  lines.push("| Total | Smoke | Regression | High Priority |");
  lines.push("|:-----:|:-----:|:----------:|:-------------:|");
  lines.push(
    `| **${s.total ?? tcs.length}** | ${s.smoke ?? "-"} | ${s.regression ?? "-"} | ${s.highPriority ?? "-"} |`,
    ""
  );

  // Breakdown by module
  const byModule = {};
  for (const tc of tcs) byModule[tc.module || "Other"] = (byModule[tc.module || "Other"] || 0) + 1;
  lines.push("### By module", "", "| Module | Test cases |", "|--------|:----------:|");
  for (const [m, n] of Object.entries(byModule)) lines.push(`| ${esc(m)} | ${n} |`);
  lines.push("");

  lines.push("## 🧪 Generated Test Cases", "");
  lines.push("| ID | Module | Title | Type | Priority | Severity | Tags |");
  lines.push("|----|--------|-------|------|----------|----------|------|");
  for (const tc of tcs) {
    lines.push(
      `| ${esc(tc.testId)} | ${esc(tc.module)} | ${esc(tc.title)} | ${esc(tc.type)} | ${esc(tc.priority)} | ${esc(tc.severity)} | ${esc((tc.tags || []).join(", "))} |`
    );
  }
  lines.push("", "### Test case details", "");
  for (const tc of tcs) {
    lines.push(`<details><summary><b>${esc(tc.testId)}</b> — ${esc(tc.title)}</summary>`, "");
    lines.push(`**Module:** ${esc(tc.module)} › ${esc(tc.submodule)}  `);
    lines.push(`**Priority / Severity:** ${esc(tc.priority)} / ${esc(tc.severity)}`, "");
    lines.push("**Preconditions**", "", list(tc.preconditions), "");
    if (tc.testData && Object.keys(tc.testData).length) {
      lines.push("**Test data**", "", "```json", JSON.stringify(tc.testData, null, 2), "```", "");
    }
    lines.push("**Steps**", "");
    (tc.steps || []).forEach((step, i) => lines.push(`${i + 1}. ${step}`));
    lines.push("", `**Expected result:** ${tc.expectedResult ?? ""}`, "", "</details>", "");
  }
} else {
  lines.push("> ℹ️ No test cases generated in this run (run the pipeline with `phase = all`).", "");
}

// ---- Phase 1 analysis ----
if (phase1Dir) {
  const summaryPath = path.join(phase1Dir, "analysis-summary.md");
  for (const f of ["moduleData.json", "analysis-summary.md"]) {
    const src = path.join(phase1Dir, f);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(outDir, f));
  }
  if (fs.existsSync(summaryPath)) {
    lines.push("---", "");
    // Demote headings one level so they nest under this report.
    const summary = fs.readFileSync(summaryPath, "utf8").replace(/^(#+)/gm, "#$1");
    lines.push("## 🧠 Phase 1 — Requirement Analysis", "", summary.replace(/^## Requirement Analysis Summary\s*/m, ""));
  }
}

const report = lines.join("\n");
fs.writeFileSync(path.join(outDir, "REPORT.md"), report, "utf8");
console.log(`📄 Report written to ${path.join(outDir, "REPORT.md")}`);
