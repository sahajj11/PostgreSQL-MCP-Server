# PostgreSQL MCP AI Chat

A standalone Next.js App Router application with TypeScript, Tailwind CSS, and a responsive dark chat preview. The sibling `postgres-mcp-server` is unchanged.

## Run locally

Use Node.js 24 LTS and npm. From this directory:

```sh
npm install
npm run dev
```

Open http://localhost:3000. If PowerShell blocks npm.ps1, use `npm.cmd` in place of `npm`.

## Environment

`.env.local` and `.env.example` contain blank `GEMINI_API_KEY` and `MCP_SERVER_PATH` values. Neither is required for the current preview. For the future integration, put your Gemini key and the absolute directory of your MCP server in `.env.local`. Quote paths containing spaces. Never use `NEXT_PUBLIC_` for secrets. `.env.local` is ignored; `.env.example` is tracked.

## Current scope

- Messages, prompt suggestions, and reset work locally in browser memory; reload clears the chat.
- Responses are fixed demo text. No Gemini requests, MCP connections, database operations, or tool calls occur.
- `POST /api/chat` returns HTTP 501 with a JSON explanation.
- `src/lib/mcp/client.ts` and `src/lib/ai/gemini.ts` are protected with `server-only` and intentionally contain no integration logic.
- MCP client SDK 2.4.0 matches the existing server SDK 2.4.0. Zod is installed for future validation.

## Checks and production

```sh
npm run typecheck
npm run lint
npm run build
npm start
```

The typecheck script generates Next.js route types before checking TypeScript. No credentials or running database are required for these checks.

Tooling uses TypeScript 6.0.3 and ESLint 9.39.5 because the current Next.js lint dependency tree does not support TypeScript 7 or ESLint 10. npm marks ESLint 9 deprecated; upgrading requires compatible upstream lint plugins. The package lock records the validated dependency versions.
