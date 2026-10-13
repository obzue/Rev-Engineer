---
description: "Evidence rules, identifiers, paging, and reporting. Read whenever conclusions must be tied to observations."
connections: [native-binaries, javascript-apps]
---

# Evidence Workflows

## Principles

- Every conclusion cites an observation, an inference, or an unknown.
- Preserve path, digest, offset, or tool output identifier with the claim.
- Static analysis never implies observed execution.
- Large results are summarized first; full detail is retained by identifier.

## Minimal evidence record

```json
{
  "evidence_id": "ev-001",
  "target": "/absolute/path",
  "digest": "sha256:...",
  "tool": "ghidra-analyze.sh",
  "observation": "Function at 0x401000 decompiled to ...",
  "limitations": ["external calls not resolved", "timeout at 300s"],
  "unknowns": ["original source unavailable"]
}
```

## Paging

When a tool returns a large graph or decompilation:

1. Request or produce a summary (counts, entry points, key strings).
2. Assign or reuse an evidence identifier for the full result.
3. Page by function address, module name, or line range on subsequent calls.
4. Do not re-run the identical analysis solely to obtain a smaller view.

## Reporting

- Lead with the answer in plain language.
- Attach the supporting evidence identifiers or short excerpts.
- List remaining unknowns and the next observation that would resolve them.
- Separate observed facts from any suggested implementation.
