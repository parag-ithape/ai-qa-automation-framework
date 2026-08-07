import fs from "fs";
import path from "path";

function timestamp() {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, "0");

  return [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    "_",
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds()),
  ].join("");
}

export function createRunDirectory(baseDir = "runs") {
  const runId = `${timestamp()}_${Math.random().toString(36).slice(2, 8)}`;
  const runPath = path.join(baseDir, runId);
  const phase1Path = path.join(runPath, "phase1-requirement-analysis");
  const inputPath = path.join(runPath, "input");

  fs.mkdirSync(phase1Path, { recursive: true });
  fs.mkdirSync(inputPath, { recursive: true });

  return {
    runId,
    runPath,
    inputPath,
    phase1Path,
  };
}

export function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function writeText(filePath, content) {
  fs.writeFileSync(filePath, content, "utf-8");
}
