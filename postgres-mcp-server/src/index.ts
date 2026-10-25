
import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import { pool } from "./db.js";
import { z } from "zod";


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


server.registerTool(
  "describe_table",
  {
    description:
      "Get the column names, data types and nullable status of a PostgreSQL table",
    inputSchema: z.object({
      table_name: z.string().min(1),
    }),
  },
  async ({ table_name }) => {
    try {
      const result = await pool.query(
        `
        SELECT
          column_name,
          data_type,
          is_nullable,
          column_default
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = $1
        ORDER BY ordinal_position;
        `,
        [table_name]
      );

      if (result.rows.length === 0) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "Table not found or no accessible columns.",
            },
          ],
        };
      }

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
            text: error instanceof Error
              ? error.message
              : "Failed to describe table",
          },
        ],
      };
    }
  }
);


server.registerTool(
  "get_table_rows",
  {
    description:
      "Fetch rows from a table in the public PostgreSQL schema",
    inputSchema: z.object({
      table_name: z.string().min(1),
      limit: z.number().int().min(1).max(100).default(10),
    }),
  },
  async ({ table_name, limit }) => {
    try {
      const tableCheck = await pool.query(
        `
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public'
          AND table_name = $1
          AND table_type = 'BASE TABLE'
        `,
        [table_name]
      );

      if (tableCheck.rowCount === 0) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "Table not found or not accessible.",
            },
          ],
        };
      }

      const safeTableName = table_name.replace(/"/g, '""');

      const result = await pool.query(
        `SELECT * FROM public."${safeTableName}" LIMIT $1`,
        [limit]
      );

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
            text: error instanceof Error
              ? error.message
              : "Failed to fetch table rows",
          },
        ],
      };
    }
  }
);


void serveStdio(() => server);
