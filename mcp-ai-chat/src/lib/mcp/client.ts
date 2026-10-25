
import "server-only";

import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from
  "@modelcontextprotocol/client/stdio";
import path from "node:path";

export async function connectMCPServer() {
  const serverPath = process.env.MCP_SERVER_PATH;

  if (!serverPath) {
    throw new Error("MCP_SERVER_PATH is not configured");
  }

  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [
      path.join(
        serverPath,
        "node_modules",
        "tsx",
        "dist",
        "cli.mjs"
      ),
      path.join(serverPath, "src", "index.ts"),
    ],
    cwd: serverPath,
  });

  const client = new Client({
    name: "nextjs-mcp-client",
    version: "1.0.0",
  });

  await client.connect(transport);

  return client;
}
