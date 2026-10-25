
import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import { pool } from "./db.js";

const server = new McpServer({
  name: "postgres-mcp-server",
  version: "1.0.0",
});

server.registerTool(
  "list_tables",
  {
    description:
      "List all tables in the public PostgreSQL schema",
  },
  async () => {
    try {
      const result = await pool.query(`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
          AND table_type = 'BASE TABLE'
        ORDER BY table_name;
      `);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result.rows, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text:
              error instanceof Error
                ? error.message
                : "Database query failed",
          },
        ],
      };
    }
  }
);

void serveStdio(() => server);
