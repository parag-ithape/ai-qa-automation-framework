export function buildAnalysisSummary(moduleData) {
  const lines = [
    "# Requirement Analysis Summary",
    "",
    `**Run ID:** ${moduleData.metadata?.runId ?? "—"}`,
    `**Analyzed at:** ${moduleData.metadata?.analyzedAt ?? "—"}`,
    `**Application:** ${moduleData.metadata?.applicationName ?? "—"}`,
    `**URL:** ${moduleData.metadata?.applicationUrl ?? "—"}`,
    `**JIRA ticket:** ${moduleData.metadata?.jiraTicket ?? "—"}`,
    `**Epic:** ${moduleData.metadata?.jiraEpic ?? "—"}`,
    "",
    "## Authentication",
    `- Required: ${moduleData.authentication?.required ?? "—"}`,
    `- Type: ${moduleData.authentication?.type ?? "—"}`,
    `- Source: ${moduleData.authentication?.sourceRef ?? "—"}`,
    "",
    "## Modules",
  ];

  for (const module of moduleData.modules ?? []) {
    lines.push(`### ${module.name}`);
    lines.push(module.description || "_No description_");
    lines.push("");
    lines.push("| Submodule | Category | Source |");
    lines.push("|-----------|----------|--------|");

    for (const sub of module.submodules ?? []) {
      lines.push(
        `| ${sub.name} | ${sub.category} | ${sub.sourceRef ?? "—"} |`
      );
    }

    lines.push("");
  }

  if (moduleData.jiraContext?.commentsSummary) {
    lines.push("## JIRA Comments Summary");
    lines.push(moduleData.jiraContext.commentsSummary);
    lines.push("");
  }

  if (moduleData.jiraContext?.epicSummary) {
    lines.push("## Epic Summary");
    lines.push(moduleData.jiraContext.epicSummary);
    lines.push("");
  }

  if (moduleData.conflicts?.length) {
    lines.push("## Conflicts");
    for (const conflict of moduleData.conflicts) {
      lines.push(`- ${typeof conflict === "string" ? conflict : JSON.stringify(conflict)}`);
    }
    lines.push("");
  }

  if (moduleData.gaps?.length) {
    lines.push("## Gaps");
    for (const gap of moduleData.gaps) {
      lines.push(`- ${gap}`);
    }
    lines.push("");
  }

  if (moduleData.assumptions?.length) {
    lines.push("## Assumptions");
    for (const assumption of moduleData.assumptions) {
      lines.push(`- ${assumption}`);
    }
    lines.push("");
  }

  if (moduleData.outOfScope?.length) {
    lines.push("## Out of Scope");
    for (const item of moduleData.outOfScope) {
      lines.push(`- ${item}`);
    }
    lines.push("");
  }

  lines.push("## Review Checkpoint #1");
  lines.push("- [ ] All sources reflected correctly");
  lines.push("- [ ] Wireframe flows match modules");
  lines.push("- [ ] Comments and epic tasks captured");
  lines.push("- [ ] Conflicts and gaps reviewed");
  lines.push("- [ ] Ready for test plan generation");
  lines.push("");

  return lines.join("\n");
}
