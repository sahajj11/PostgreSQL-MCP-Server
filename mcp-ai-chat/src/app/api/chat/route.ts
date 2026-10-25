import { NextResponse } from "next/server";

// Future MCP stdio integration must run in Node.js, never in the browser or Edge.
export const runtime = "nodejs";

export async function POST() {
  // Intentionally unimplemented. The current chat uses browser-local messages.
  return NextResponse.json(
    { error: "Chat integration is not implemented yet. Use the local UI preview." },
    { status: 501 },
  );
}
