---
name: reverse-engineer-agent
description: "Guide reverse engineering of binaries, apps, packages, and runtime behavior using local tools and evidence. Use when analyzing shipped software without source, decompiling, tracing features, or reconstructing behavior from artifacts."
type: workflow
lifecycle: active
---

# Reverse Engineer Agent — Local Artifact Analysis Workflow

Use this skill to investigate closed-source or binary targets by coordinating local analysis tools, collecting structured evidence, and producing traceable findings. Prefer existing analysis engines and runtime observation over speculation.

## Core Principles

- Analysis runs locally on supplied paths or captured data.
- Distinguish direct observations, inferences, and unknowns.
- Preserve source digests, offsets, and limitations with every conclusion.
- Start with the smallest useful inventory before deep dives.
- Close sessions and clean temporary projects when finished.

## Target Routing

Select the first tool based on the supplied target:

| Target type | Primary action | Notes |
|-------------|----------------|-------|
| Native binary / library | Open with Ghidra skill or equivalent headless analyzer | See [references/native-binaries.md](references/native-binaries.md) |
| JavaScript / Electron tree or ASAR | Static module graph, import map, IPC inventory | See [references/javascript-apps.md](references/javascript-apps.md) |
| Android package | Manifest, class list, method references | Use available decompiler bridge if present |
| Website or open browser page | Structure, scripts, network observations | Browser tools or recorded captures |
| Saved network capture (HAR, etc.) | Request/response inventory, payload locations | Do not fetch recorded URLs |
| Firmware image | Region inventory, extraction handoff | Caller-supplied extractors; hand off native regions to binary path |
| Process or crash recording | Registers, mappings, terminal observations | Respect declared lifecycle |

If the user supplies only a vague name ("my app") without a path, ask for the concrete artifact before searching.

## Investigation Workflow

1. Confirm the exact local path or capture file. Record its SHA-256 if available.
2. Choose the matching analysis route above. Call the appropriate skill or tool (for example the Ghidra skill for native binaries).
3. Request a summary or inventory first. Page results when they are large. See [references/evidence.md](references/evidence.md).
4. Follow one concrete question at a time: entry point → data flow → result.
5. Record each finding with its evidence identifier, coverage limits, and remaining unknowns.
6. When the user requests an implementation, separate observed behavior from design choices and test the new code independently.
7. Close any open analysis session and remove temporary projects.

## Evidence Rules

- Inline only the evidence needed for the current answer.
- Keep complete records accessible via retained identifiers or exported bundles.
- Never claim execution was observed from pure static analysis.
- Runtime actions must stay inside the declared target and permissions.
- Report incomplete coverage explicitly.

## Available Supporting Skills

- `ghidra` — Headless binary import, decompilation, function/string/call export.
- Browser and file tools already present in the environment for web and package inspection.
- Extend with additional local bridges (packet capture, firmware extractors, etc.) as they become available.

## Knowledge Graph

Start at the references for detailed procedures:

- [[native-binaries]] — headless inventory, decompilation, processor IDs
- [[javascript-apps]] — static module and IPC mapping
- [[evidence]] — identifiers, paging, reporting rules
- [[firmware-packets]] — firmware region inventory and packet/capture notes

## Common Issues

| Symptom | Likely cause | Remedy |
|---------|--------------|--------|
| No analysis engine found | Path or environment variable missing | Locate the engine, set the documented home variable, retry |
| Result too large | Full graph or decompilation returned | Request summary detail, then page by identifier |
| Client blocks the call | Approval or registration policy | Show the planned command, obtain approval, continue |
| Architecture mismatch | Wrong processor assumed | Explicitly supply processor ID and re-run |

## Finish

Summarize findings in plain language, cite evidence, list unresolved questions, and note any temporary files left for the user to review or delete.
