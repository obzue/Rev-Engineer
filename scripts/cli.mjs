#!/usr/bin/env node
// Rev Engineer CLI — routes to local analysis tools with evidence-aware output.

import { argv, exit, env } from 'node:process';
import { createHash } from 'node:crypto';
import { readFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const args = argv.slice(2);

function sha256(path) {
  try {
    const buf = readFileSync(path);
    return createHash('sha256').update(buf).digest('hex');
  } catch {
    return null;
  }
}

function findGhidraWrapper() {
  const candidates = [
    env.GHIDRA_ANALYZE_WRAPPER,
    '/root/.grok/server-skills/ghidra/scripts/ghidra-analyze.sh',
    './scripts/ghidra-analyze.sh'
  ];
  return candidates.find(p => p && existsSync(p)) || null;
}

if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  console.log(`Rev Engineer 0.2.0

Usage:
  rev-engineer <command> [options]

Commands:
  analyze-binary <path> [--processor ID] [--timeout SEC]
                        Inventory or full analysis via Ghidra wrapper
  analyze-js <path>     Static module/IPC notes for a JS/Electron tree
  doctor                Check local tool availability
  evidence <json>       Pretty-print a minimal evidence record
  help                  Show this message

Analysis stays local. Results include digests and limitations.
`);
  exit(0);
}

const command = args[0];
const target = args[1];

switch (command) {
  case 'analyze-binary': {
    if (!target) {
      console.error('Missing path');
      exit(1);
    }
    const abs = resolve(target);
    const digest = sha256(abs);
    const wrapper = findGhidraWrapper();
    const processor = args.includes('--processor') ? args[args.indexOf('--processor') + 1] : null;
    const timeout = args.includes('--timeout') ? args[args.indexOf('--timeout') + 1] : null;

    const result = {
      status: wrapper ? 'routed' : 'no-wrapper',
      target: abs,
      digest: digest ? `sha256:${digest}` : null,
      tool: wrapper || 'none',
      limitations: wrapper ? ['delegate to ghidra-analyze.sh'] : ['Ghidra wrapper not found; set GHIDRA_ANALYZE_WRAPPER or install skill']
    };

    if (wrapper) {
      const cmdArgs = ['--no-analysis', '-s', 'ExportFunctions.java', '-o', '/tmp/rev-out', abs];
      if (processor) cmdArgs.splice(1, 0, '-p', processor);
      if (timeout) cmdArgs.push('--timeout', timeout);
      result.suggested_command = [wrapper, ...cmdArgs].join(' ');
    }
    console.log(JSON.stringify(result, null, 2));
    break;
  }
  case 'analyze-js': {
    if (!target) {
      console.error('Missing path');
      exit(1);
    }
    const abs = resolve(target);
    console.log(JSON.stringify({
      status: 'static-notes',
      target: abs,
      digest: sha256(abs) ? `sha256:${sha256(abs)}` : null,
      note: 'Inspect package.json, main/preload, ipcMain/ipcRenderer, source maps. See skill references/javascript-apps.md',
      limitations: ['static only; no execution']
    }, null, 2));
    break;
  }
  case 'doctor': {
    const wrapper = findGhidraWrapper();
    console.log(JSON.stringify({
      node: process.version,
      tools: {
        ghidra_wrapper: wrapper || 'not found',
        ghidra_install: env.GHIDRA_INSTALL_DIR || env.GHIDRA_HOME || 'not set',
        browser: 'environment dependent'
      }
    }, null, 2));
    break;
  }
  case 'evidence': {
    const raw = args[1] || '{}';
    try {
      console.log(JSON.stringify(JSON.parse(raw), null, 2));
    } catch {
      console.error('Invalid JSON');
      exit(1);
    }
    break;
  }
  default:
    console.error(`Unknown command: ${command}`);
    exit(1);
}
