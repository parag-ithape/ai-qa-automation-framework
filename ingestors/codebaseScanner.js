import fs from "fs";
import path from "path";

const PAGE_DIR_NAMES = ["pages", "views", "screens"];
const CODE_EXTENSIONS = [".js", ".jsx", ".ts", ".tsx"];

function readFileSafe(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  return fs.readFileSync(filePath, "utf-8");
}

function extractTestIds(content) {
  const matches = content.matchAll(/data-testid=["']([^"']+)["']/g);
  return [...matches].map((match) => match[1]);
}

function extractRouteEntries(routesContent) {
  const routes = [];
  const routePattern =
    /path:\s*["']([^"']+)["'][^}]*page:\s*["']([^"']+)["'][^}]*auth:\s*(true|false)/g;

  for (const match of routesContent.matchAll(routePattern)) {
    routes.push({
      path: match[1],
      page: match[2],
      authRequired: match[3] === "true",
    });
  }

  return routes;
}

function findPagesDir(appPath) {
  for (const dirName of PAGE_DIR_NAMES) {
    const pagesDir = path.join(appPath, dirName);
    if (fs.existsSync(pagesDir) && fs.statSync(pagesDir).isDirectory()) {
      return pagesDir;
    }
  }

  return null;
}

function scanPages(pagesDir) {
  const pages = [];

  for (const entry of fs.readdirSync(pagesDir, { withFileTypes: true })) {
    if (!entry.isFile()) {
      continue;
    }

    const ext = path.extname(entry.name);
    if (!CODE_EXTENSIONS.includes(ext)) {
      continue;
    }

    const filePath = path.join(pagesDir, entry.name);
    const content = readFileSafe(filePath);
    const pageName = path.basename(entry.name, ext);

    pages.push({
      name: pageName,
      file: path.relative(path.dirname(pagesDir), filePath).replace(/\\/g, "/"),
      testIds: extractTestIds(content ?? ""),
      hasForm: /<form/i.test(content ?? ""),
      hasLogin: /password|username|login/i.test(content ?? ""),
    });
  }

  return pages;
}

export function scanCodebase(appPath) {
  if (!appPath || !fs.existsSync(appPath)) {
    return {
      scanned: false,
      summary: "No wireframe codebase found in bundle.",
      routes: [],
      pages: [],
    };
  }

  const routesFile = path.join(appPath, "routes.js");
  const routesContent = readFileSafe(routesFile);
  const routes = routesContent ? extractRouteEntries(routesContent) : [];

  const pagesDir = findPagesDir(appPath);
  const pages = pagesDir ? scanPages(pagesDir) : [];

  const authRequired = routes.some((route) => route.authRequired);

  return {
    scanned: true,
    appPath,
    summary: `Scanned wireframe app: ${pages.length} page(s), ${routes.length} route(s).`,
    authenticationLikely: authRequired || pages.some((page) => page.hasLogin),
    routes,
    pages,
  };
}
