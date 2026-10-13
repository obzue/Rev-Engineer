# MCP server

Thin stdio MCP server exposing the same workflows as the CLI.

## Install

```bash
cd rev-engineer
npm install
```

## Run

```bash
node scripts/mcp-server.mjs
# or
npm run mcp
```

## Tools

| Tool | Description |
|------|-------------|
| `analyze_binary` | Route native binary (path, optional processor, timeout) |
| `analyze_js` | Static notes for JS/Electron path |
| `doctor` | Local tool availability |
| `evidence` | Pretty-print evidence JSON |

Register with any agent that supports local MCP stdio servers. Point the command at `scripts/mcp-server.mjs` or the installed `rev-engineer-mcp` binary.

Analysis remains local; results include digests and limitations.
