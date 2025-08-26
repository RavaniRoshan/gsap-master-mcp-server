#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// Add Smithery-specific error handling
process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught Exception:', error);
  // Notify Smithery of the error
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
  // Notify Smithery of the error
  process.exit(1);
});

// GSAP API Database
const GSAP_COMPLETE_API = {
  // ... (rest of your GSAP API object)
};

// Create MCP Server
const server = new Server({
  name: "gsap-master",
  version: "2.2.0",
  transport: new StdioServerTransport(),
  tools: [
    {
      name: 'animate',
      description: 'Create GSAP animations with any method and configuration',
      handler: async (request: { method: string; targets: string; config?: object }) => {
        // Implementation for animation handling
        const { method, targets, config } = request;
        return {
          result: `Animation created: ${method}("${targets}", ${JSON.stringify(config)})`
        };
      }
    }
  ]
});

// Server starts automatically with StdioServerTransport
