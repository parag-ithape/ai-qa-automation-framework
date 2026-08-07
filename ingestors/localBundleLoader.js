import fs from "fs";
import path from "path";

const TEXT_EXTENSIONS = new Set([".txt", ".md"]);
const CODE_EXTENSIONS = new Set([".js", ".jsx", ".ts", ".tsx"]);

function readJsonIfExists(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function findWireframeAppDir(bundlePath) {
  const direct = path.join(bundlePath, "wireframe-app");
  if (fs.existsSync(direct) && fs.statSync(direct).isDirectory()) {
    return direct;
  }

  const entries = fs.readdirSync(bundlePath, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const candidate = path.join(bundlePath, entry.name);
    const hasPages = fs.existsSync(path.join(candidate, "pages"));
    const hasRoutes = fs.existsSync(path.join(candidate, "routes.js"));

    if (hasPages || hasRoutes) {
      return candidate;
    }
  }

  return null;
}

function readRequirementsText(bundlePath) {
  const candidates = ["requirements.txt", "requirement.txt", "input.txt"];

  for (const name of candidates) {
    const filePath = path.join(bundlePath, name);
    if (fs.existsSync(filePath)) {
      return {
        path: filePath,
        content: fs.readFileSync(filePath, "utf-8"),
      };
    }
  }

  return null;
}

export async function loadLocalBundle(bundlePath) {
  const resolvedPath = path.resolve(bundlePath);

  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`Bundle path not found: ${resolvedPath}`);
  }

  const requirements = readRequirementsText(resolvedPath);
  const wireframeAppPath = findWireframeAppDir(resolvedPath);

  return {
    mode: "local-bundle",
    bundlePath: resolvedPath,
    ticket: readJsonIfExists(path.join(resolvedPath, "jira-ticket.json")),
    comments: readJsonIfExists(path.join(resolvedPath, "jira-comments.json")) ?? [],
    tasks: readJsonIfExists(path.join(resolvedPath, "jira-tasks.json")),
    requirements,
    wireframeAppPath,
  };
}

export function loadLegacyTextInput(filePath = "input.txt") {
  const resolvedPath = path.resolve(filePath);

  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`Input file not found: ${resolvedPath}`);
  }

  return {
    mode: "text",
    bundlePath: path.dirname(resolvedPath),
    ticket: {
      key: "LOCAL-TEXT",
      title: "Legacy text input",
      description: "Single requirements file (study / dev mode)",
    },
    comments: [],
    tasks: null,
    requirements: {
      path: resolvedPath,
      content: fs.readFileSync(resolvedPath, "utf-8"),
    },
    wireframeAppPath: null,
  };
}
