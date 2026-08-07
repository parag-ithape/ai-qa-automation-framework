import { ensureArray, parseModelJson, withRetry } from "../utils/jsonHelper.js";
import client from "../config/openai.js";

function buildPrompt(unifiedContext) {
  const { formattedSections, metadata, ticket } = unifiedContext;

  return `
Act as a QA architect analyzing a study project requirement bundle.
This is for learning purposes — no real org JIRA or production systems.

Merge ALL sources below. Priority when sources conflict:
1. Wireframe codebase (PRIMARY for UI flows and pages)
2. JIRA comments (latest scope decisions)
3. Developer tasks under epic (implementation scope)
4. Requirements text / PDF / doc (business rules)

=== JIRA TICKET (mock/study) ===
Key: ${ticket?.key ?? "LOCAL"}
Title: ${ticket?.title ?? "Unknown"}
Description: ${ticket?.description ?? ""}

=== REQUIREMENTS TEXT ===
${formattedSections.requirements || "None"}

=== WIREFRAME CODEBASE SCAN (PRIMARY) ===
${formattedSections.codebase || "None"}

=== JIRA COMMENTS ===
${formattedSections.comments || "None"}

=== EPIC DEVELOPER TASKS ===
${formattedSections.tasks || "None"}

Tasks:
1. Extract application name and URL if present
2. Identify authentication (required, type, steps) with sourceRef
3. Identify all modules and user flows (submodules)
4. For each module include Positive, Negative, and Edge submodules where applicable
5. Summarize JIRA comments and epic tasks in jiraContext
6. List conflicts when sources disagree (conflicts[])
7. List gaps and assumptions (gaps[], assumptions[])
8. List outOfScope items mentioned in comments/tasks

Return ONLY JSON in this EXACT structure:

{
  "metadata": {
    "runId": "",
    "analyzedAt": "",
    "jiraTicket": "",
    "jiraEpic": "",
    "applicationName": "",
    "applicationUrl": "",
    "sources": []
  },
  "authentication": {
    "required": true,
    "type": "UI",
    "steps": [],
    "sourceRef": ""
  },
  "modules": [
    {
      "name": "",
      "type": "Functional",
      "description": "",
      "sourceRefs": [],
      "submodules": [
        {
          "name": "",
          "category": "Positive",
          "description": "",
          "requirementRef": "",
          "sourceRef": ""
        }
      ]
    }
  ],
  "jiraContext": {
    "commentsSummary": "",
    "epicSummary": "",
    "developerTasks": []
  },
  "conflicts": [],
  "gaps": [],
  "assumptions": [],
  "outOfScope": []
}

Rules:
- Do not invent modules not supported by any source
- Wireframe routes/pages must appear in modules when codebase was scanned
- Comment scope exclusions must appear in outOfScope
- Do not return anything except JSON
`;
}

function validateModuleData(data) {
  ensureArray(data.modules, "modules");

  for (const module of data.modules) {
    ensureArray(module.submodules, `modules["${module.name}"].submodules`);
  }

  if (!data.metadata) {
    data.metadata = {};
  }

  if (!data.jiraContext) {
    data.jiraContext = {
      commentsSummary: "",
      epicSummary: "",
      developerTasks: [],
    };
  }

  data.conflicts = data.conflicts ?? [];
  data.gaps = data.gaps ?? [];
  data.assumptions = data.assumptions ?? [];
  data.outOfScope = data.outOfScope ?? [];

  return data;
}

export async function analyzeRequirements(unifiedContext, { runId } = {}) {
  const prompt = buildPrompt(unifiedContext);

  const result = await withRetry(
    async () => {
      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      });

      const content = response.choices[0].message.content;
      const parsed = parseModelJson(content);
      return validateModuleData(parsed);
    },
    { retries: 2, label: "Requirement analysis" }
  );

  result.metadata.runId = runId ?? result.metadata.runId ?? "";
  result.metadata.analyzedAt = new Date().toISOString();
  result.metadata.jiraTicket =
    result.metadata.jiraTicket || unifiedContext.metadata.jiraTicket;
  result.metadata.jiraEpic =
    result.metadata.jiraEpic || unifiedContext.metadata.jiraEpic;
  result.metadata.sources =
    result.metadata.sources?.length > 0
      ? result.metadata.sources
      : unifiedContext.metadata.sources;

  return result;
}

// Backward-compatible export for existing imports
export async function analyzeModules(input) {
  const unifiedContext = {
    metadata: {
      jiraTicket: "LEGACY-TEXT",
      jiraEpic: null,
      sources: [{ type: "requirements-text", priority: "secondary" }],
    },
    ticket: {
      key: "LEGACY-TEXT",
      title: "Legacy single-file input",
      description: "",
    },
    formattedSections: {
      requirements: input,
      codebase: "None",
      comments: "None",
      tasks: "None",
    },
  };

  return analyzeRequirements(unifiedContext);
}
