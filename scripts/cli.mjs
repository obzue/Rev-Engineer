#!/usr/bin/env node
// Minimal CLI entry for Rev Engineer.
// Expand with actual command routing as providers are added.

import { argv, exit } from 'node:process';

const args = argv.slice(2);

if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  console.log(`Rev Engineer 0.1.0

Usage:
  rev-engineer <command> [options]

Commands:
  analyze-binary <path>     Route a native binary to the configured analyzer
  analyze-js <path>         Static module and IPC inventory for a JS/Electron tree
  doctor                    Check local tool availability
  help                      Show this message

Analysis stays local. Results include evidence identifiers and limitations.
`);
  exit(0);
}

const command = args[0];

switch (command) {
  case 'analyze-binary':
    console.log(JSON.stringify({
      status: 'routed',
      target: args[1] || null,
      note: 'Delegate to headless analyzer skill or bridge',
      limitations: ['placeholder implementation']
    }, null, 2));
    break;
  case 'analyze-js':
    console.log(JSON.stringify({
      status: 'routed',
      target: args[1] || null,
      note: 'Static JavaScript graph placeholder',
      limitations: ['placeholder implementation']
    }, null, 2));
    break;
  case 'doctor':
    console.log(JSON.stringify({
      node: process.version,
      tools: {
        ghidra: process.env.GHIDRA_INSTALL_DIR ? 'configured' : 'not set',
        browser: 'environment dependent'
      }
    }, null, 2));
    break;
  default:
    console.error(`Unknown command: ${command}`);
    exit(1);
}
