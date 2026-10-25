
import { NextResponse } from "next/server";
import { connectMCPServer } from "@/lib/mcp/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  let client: Awaited<ReturnType<
    typeof connectMCPServer
  >> | undefined;

  try {
    client = await connectMCPServer();

    const tools = await client.listTools();

    const result = await client.callTool({
      name: "list_tables",
      arguments: {},
    });

    return NextResponse.json({
      success: true,
      tools: tools.tools.map((tool) => ({
        name: tool.name,
        description: tool.description,
      })),
      result,
    });
  } catch (error) {
    console.error("MCP test failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "MCP connection or tool execution failed",
      },
      { status: 500 }
    );
  } finally {
    await client?.close();
  }
}
