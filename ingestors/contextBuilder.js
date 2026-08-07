import { scanCodebase } from "./codebaseScanner.js";

function formatComments(comments) {
  if (!comments?.length) {
    return "";
  }

  return comments
    .map(
      (comment, index) =>
        `[Comment ${index + 1}] ${comment.author} (${comment.created}): ${comment.body}`
    )
    .join("\n");
}

function formatTasks(tasksPayload) {
  if (!tasksPayload?.tasks?.length) {
    return "";
  }

  const header = `Epic: ${tasksPayload.epicKey} — ${tasksPayload.epicTitle}`;
  const tasks = tasksPayload.tasks
    .map(
      (task) =>
        `- ${task.key}: ${task.title}\n  ${task.description}`
    )
    .join("\n");

  return `${header}\n${tasks}`;
}

function formatCodeScan(codeScan) {
  if (!codeScan?.scanned) {
    return codeScan.summary;
  }

  const routes = codeScan.routes
    .map((route) => `- ${route.path} → ${route.page} (auth: ${route.authRequired})`)
    .join("\n");

  const pages = codeScan.pages
    .map((page) => {
      const testIds =
        page.testIds.length > 0 ? ` testIds: ${page.testIds.join(", ")}` : "";
      return `- ${page.name} (${page.file})${testIds}`;
    })
    .join("\n");

  return [
    codeScan.summary,
    "",
    "Routes:",
    routes || "- none detected",
    "",
    "Pages:",
    pages || "- none detected",
  ].join("\n");
}

export function buildUnifiedContext(bundle) {
  const codeScan = scanCodebase(bundle.wireframeAppPath);
  const generatedAt = new Date().toISOString();

  const sources = [];

  if (bundle.requirements?.content) {
    sources.push({
      type: "requirements-text",
      priority: "secondary",
      path: bundle.requirements.path,
    });
  }

  if (codeScan.scanned) {
    sources.push({
      type: "codebase",
      priority: "primary",
      path: codeScan.appPath,
    });
  }

  if (bundle.comments?.length) {
    sources.push({
      type: "jira-comments",
      priority: "high",
      count: bundle.comments.length,
    });
  }

  if (bundle.tasks?.tasks?.length) {
    sources.push({
      type: "jira-tasks",
      priority: "high",
      count: bundle.tasks.tasks.length,
    });
  }

  return {
    metadata: {
      generatedAt,
      mode: bundle.mode,
      bundlePath: bundle.bundlePath,
      jiraTicket: bundle.ticket?.key ?? "LOCAL",
      jiraEpic: bundle.tasks?.epicKey ?? null,
      sources,
    },
    ticket: bundle.ticket,
    requirementsText: bundle.requirements?.content ?? "",
    codebaseScan: codeScan,
    jiraComments: bundle.comments,
    jiraTasks: bundle.tasks,
    formattedSections: {
      requirements: bundle.requirements?.content ?? "",
      codebase: formatCodeScan(codeScan),
      comments: formatComments(bundle.comments),
      tasks: formatTasks(bundle.tasks),
    },
  };
}
