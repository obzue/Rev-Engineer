# Rev Engineer

Local reverse-engineering workflows for agents and the command line.

Point an agent or CLI at a shipped binary, application package, website capture, or runtime recording. The tools return structured observations, pseudocode or module graphs, and explicit limitations. No source code is required and analysis stays on the machine that holds the target.

## Quick start

```bash
node scripts/cli.mjs --help
# or after global install
rev-engineer doctor
rev-engineer analyze-binary /path/to/binary
```

For agents, install the skill from `skills/reverse-engineer-agent` and use its references for native, JavaScript, and evidence workflows.

## Supported targets (current baseline)

| Target | Primary output | Requirements |
|--------|----------------|--------------|
| Native binary | Functions, decompilation, strings, call references | Headless analyzer (ghidra skill) |
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
npm start -- doctor
```

See `docs/` for provider setup and `skills/` for agent instructions.

## Responsible use

Analyze only software you own or are authorized to examine. Local execution and capture follow the permissions of the account that launches the tools.
