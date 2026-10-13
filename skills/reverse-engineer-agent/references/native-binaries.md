---
description: "Native binary analysis workflow using headless Ghidra or equivalent. Read when the target is an executable, library, or firmware binary."
connections: [evidence, javascript-apps]
---

# Native Binary Analysis

## Prerequisites

- Ghidra skill available, or `GHIDRA_INSTALL_DIR` / `GHIDRA_HOME` set.
- 64-bit JDK matching the Ghidra release.
- Local path to the binary. Record SHA-256 before analysis.

## Recommended sequence

1. Inventory first:
   ```bash
   # Using the ghidra skill wrapper
   ghidra-analyze.sh --no-analysis -s ExportFunctions.java -o ./out binary
   ghidra-analyze.sh --no-analysis -s ExportStrings.java -o ./out binary
   ghidra-analyze.sh --no-analysis -s ExportSymbols.java -o ./out binary
   ```
2. Full analysis when inventory is insufficient:
   ```bash
   ghidra-analyze.sh -s ExportAll.java -o ./out binary
   ```
3. Architecture override when auto-detection fails:
   ```bash
   ghidra-analyze.sh -p "ARM:LE:32:v7" -s ExportAll.java -o ./out firmware.bin
   ```
4. Inspect outputs:
   - `*_summary.txt` — overview and counts
   - `*_functions.json` — addresses, signatures, calls
   - `*_decompiled.c` — pseudocode
   - `*_strings.txt` / `*_interesting.txt` — quick triage

## Evidence capture

- Record the binary path and SHA-256.
- Note the processor ID used and any timeout.
- Cite specific function addresses or string offsets from the exports.
- State coverage limits (functions not decompiled, external calls unresolved).

## Cleanup

Remove temporary Ghidra projects unless the user asks to keep them. The skill wrapper defaults to /tmp projects.

## Common processor IDs

| Architecture | Processor ID |
|--------------|--------------|
| x86-64 | `x86:LE:64:default` |
| x86-32 | `x86:LE:32:default` |
| ARM 32 | `ARM:LE:32:v7` |
| AArch64 | `AARCH64:LE:64:v8A` |
| MIPS | `MIPS:LE:32:default` or `MIPS:BE:32:default` |
