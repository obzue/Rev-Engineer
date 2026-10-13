---
description: "Static analysis of JavaScript and Electron application trees or ASAR archives. Read when the target is a packaged or extracted JS app."
connections: [evidence, native-binaries]
---

# JavaScript and Electron Applications

## Approach

Static inspection only for the initial pass. Do not execute the target unless the user explicitly requests runtime observation and the environment permits it.

## Inventory steps

1. Confirm the directory or ASAR path. Compute SHA-256 of key entry files if practical.
2. Map modules:
   - Locate `package.json`, `main`, preload scripts, and renderer entry points.
   - List imports and require/import statements.
   - Identify Electron IPC channels (`ipcMain`, `ipcRenderer`, `contextBridge`).
3. Source maps: if present, note their location and whether they resolve to original sources.
4. Native addons: flag any `.node` or native bindings for later binary analysis.

## Output shape

Return a concise graph summary:

- Entry points
- Module count and key modules
- IPC channel list (name, direction, handler location if found)
- Source-map availability
- Unresolved or minified regions

## Limitations

- Minified or bundled code may not yield clean module boundaries.
- Dynamic imports and eval paths are incomplete from static analysis.
- Do not claim observed runtime behavior from static results alone.

## Follow-up

If the user needs behavior confirmation, switch to a controlled runtime observation path (browser tools or process capture) and cross-reference with the static graph.
