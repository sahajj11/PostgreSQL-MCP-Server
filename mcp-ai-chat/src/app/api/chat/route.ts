
import { NextResponse } from "next/server";
import { z } from "zod";
import { askDatabaseAI } from "@/lib/ai/groq";

export const runtime = "nodejs";

const chatSchema = z.object({
  message: z.string().trim().min(1).max(2000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = chatSchema.parse(body);

    const reply = await askDatabaseAI(message);

    return NextResponse.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("Chat API error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid message",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to process chat request",
      },
      { status: 500 }
    );
  }
}
