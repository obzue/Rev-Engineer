# Rev Engineer

Local reverse-engineering workflows for agents and the command line.

Point an agent or CLI at a shipped binary, application package, website capture, or runtime recording. The tools return structured observations, pseudocode or module graphs, and explicit limitations. No source code is required and analysis stays on the machine that holds the target.

## Quick start

```bash
# After the CLI is installed
rev-engineer --help
```

For agents, install the matching skill and register any local MCP server that exposes the analysis tools.

## Supported targets (current baseline)

| Target | Primary output | Requirements |
|--------|----------------|--------------|
| Native binary | Functions, decompilation, strings, call references | Headless analyzer (see ghidra skill) |
| JavaScript / Electron package | Module graph, imports, IPC inventory | Node.js |
| Android package | Manifest, classes, method references | Available decompiler bridge |
| Website / browser session | Structure, scripts, network notes | Browser tools |
| Saved network capture | Request inventory, payload locations | Capture file only |
| Firmware image | Region inventory, extraction handoff | Caller-supplied extractors |

## Architecture notes

- Domain contracts describe observations, inferences, and unknowns.
- Provider adapters (Ghidra, browser, packet, etc.) own their protocol details.
- CLI and agent interfaces share the same workflow entry points.
- Evidence identifiers and digests travel with every result so later steps can cite them.

## Development

```bash
npm install
npm run build
npm test
```

See `docs/` for provider setup and `skills/` for agent instructions.

## Responsible use

Analyze only software you own or are authorized to examine. Local execution and capture follow the permissions of the account that launches the tools.
