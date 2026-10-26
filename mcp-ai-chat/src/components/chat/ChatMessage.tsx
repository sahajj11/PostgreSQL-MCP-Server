import { Sparkles, UserRound } from "lucide-react";
import type { ChatMessage as Message } from "@/types/chat";

export function ChatMessage({ message }: { message: Message }) {
  const isAssistant = message.role === "assistant";
  const Icon = isAssistant ? Sparkles : UserRound;

  return (
    <article className="flex gap-3 sm:gap-4">
      <div className={"mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg " + (isAssistant ? "bg-emerald-300/10 text-emerald-300" : "bg-zinc-700/40 text-zinc-300")}>
        <Icon size={16} aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="mb-2 text-xs font-medium text-zinc-300">{isAssistant ? "Database assistant" : "You"}</p>
        {/* Render API content as plain text, never as trusted HTML. */}
        <div className={"whitespace-pre-wrap [overflow-wrap:anywhere] text-sm leading-7 " + (isAssistant ? "text-zinc-300" : "rounded-xl rounded-tl-sm border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-zinc-200")}>
          {message.content}
        </div>
      </div>
    </article>
  );
}
