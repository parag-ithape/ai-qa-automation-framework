# 🤖 AI QA Automation Framework

[![CI](https://github.com/parag-ithape/ai-qa-automation-framework/actions/workflows/ci.yml/badge.svg)](https://github.com/parag-ithape/ai-qa-automation-framework/actions/workflows/ci.yml)
[![AI QA Pipeline](https://github.com/parag-ithape/ai-qa-automation-framework/actions/workflows/run-pipeline.yml/badge.svg)](https://github.com/parag-ithape/ai-qa-automation-framework/actions/workflows/run-pipeline.yml)

An AI-driven test automation framework that generates enterprise-level test cases from requirements using LLMs.

## 📈 Latest Results

👉 **[View the latest AI-generated QA report](reports/latest/REPORT.md)**: requirement analysis, test case summary and the full test case list, regenerated automatically by GitHub Actions.

| Artifact | Description |
|----------|-------------|
| [REPORT.md](reports/latest/REPORT.md) | Human-readable report |
| [testCases.json](reports/latest/testCases.json) | Generated test cases (raw) |
| [moduleData.json](reports/latest/moduleData.json) | Phase 1 module analysis (raw) |

---

## 🚀 Features

- 📄 Supports multiple input sources
  - Text file
  - Word document (.docx)
- 🧠 AI-powered module analysis
- 🧪 Automatic test case generation
- 🏷️ Tag-based filtering (smoke, regression, priority)
- 📊 Summary reporting
- ⚡ Scalable agent-based architecture

---

## 🏗️ Architecture

input → analyzer → moduleData.json  
→ test generator → testCases.json  

---

## 📋 Project Plan

See **[docs/AI_QA_AGENT_PLAN.md](docs/AI_QA_AGENT_PLAN.md)** for the full roadmap, phase status, review checkpoints, and Phase 1 (Requirement Analysis) design.

---

## 🚀 Quick Start (Study / Local Mode)

No real JIRA or org access required. Uses a local mock bundle in `test-fixtures/`.

```bash
npm install

# Phase 1 only — multi-source requirement analysis (default)
npm start

# Same as above
npm run phase1

# Phase 1 with legacy single text file (input.txt)
npm run phase1:text

# Phase 1 + test case generation
npm run all
```

### CLI options

```bash
node index.js --phase=1 --source=bundle --path=./test-fixtures/sample-jira-bundle
node index.js --phase=1 --source=text --file=input.txt
node index.js --phase=all --source=bundle --filter=smoke
```

### Phase 1 outputs

Each run creates a folder under `runs/<run-id>/phase1-requirement-analysis/`:

| File | Purpose |
|------|---------|
| `moduleData.json` | Structured analysis result |
| `analysis-summary.md` | Human-readable summary for Review #1 |
| `review.json` | Review checkpoint (status: pending) |
| `unifiedRequirements.json` | Merged input from all sources |

A copy of `moduleData.json` is also written to the project root for backward compatibility.

---

## 📦 Installation

```bash
npm install