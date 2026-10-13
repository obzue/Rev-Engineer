#!/usr/bin/env node
/**
 * Thin MCP server for Rev Engineer.
 * Exposes analyze-binary, analyze-js, doctor, and evidence tools over stdio.
 * Requires: npm install @modelcontextprotocol/sdk
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { spawnSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CLI = resolve(__dirname, 'cli.mjs');

function runCli(args) {
  const res = spawnSync(process.execPath, [CLI, ...args], {
    encoding: 'utf8',
    timeout: 120000,
  });
  return {
    stdout: res.stdout || '',
    stderr: res.stderr || '',
    status: res.status,
  };
}

const server = new Server(
  {
    name: 'rev-engineer',
    version: '0.2.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'analyze_binary',
      description: 'Route a native binary to the Ghidra wrapper. Returns digest, suggested command, and limitations.',
      inputSchema: {
        type: 'object',
        properties: {
          path: { type: 'string', description: 'Absolute path to the binary' },
          processor: { type: 'string', description: 'Optional processor ID (e.g. x86:LE:64:default)' },
          timeout: { type: 'string', description: 'Optional timeout in seconds' },
        },
        required: ['path'],
      },
    },
    {
      name: 'analyze_js',
      description: 'Static notes for a JavaScript or Electron tree. No execution.',
      inputSchema: {
        type: 'object',
        properties: {
          path: { type: 'string', description: 'Absolute path to the app directory or ASAR' },
        },
        required: ['path'],
      },
    },
    {
      name: 'doctor',
      description: 'Check local tool availability (Ghidra wrapper, install path).',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'evidence',
      description: 'Pretty-print a minimal evidence JSON record.',
      inputSchema: {
        type: 'object',
        properties: {
          record: { type: 'string', description: 'JSON string of the evidence record' },
        },
        required: ['record'],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args = {} } = request.params;

  try {
    let result;
    switch (name) {
      case 'analyze_binary': {
        const cliArgs = ['analyze-binary', args.path];
        if (args.processor) cliArgs.push('--processor', args.processor);
        if (args.timeout) cliArgs.push('--timeout', args.timeout);
        result = runCli(cliArgs);
        break;
      }
      case 'analyze_js':
        result = runCli(['analyze-js', args.path]);
        break;
      case 'doctor':
        result = runCli(['doctor']);
        break;
      case 'evidence':
        result = runCli(['evidence', args.record]);
        break;
      default:
        return {
          content: [{ type: 'text', text: `Unknown tool: ${name}` }],
          isError: true,
        };
    }

    const text = result.stdout || result.stderr || 'No output';
    return {
      content: [{ type: 'text', text }],
      isError: result.status !== 0,
    };
  } catch (err) {
    return {
      content: [{ type: 'text', text: String(err) }],
      isError: true,
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.error('Rev Engineer MCP server running on stdio');
