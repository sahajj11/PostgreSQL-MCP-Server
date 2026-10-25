import { Sparkles, UserRound } from "lucide-react";
import type { ChatMessage as Message } from "@/types/chat";

export function ChatMessage({ message }: { message: Message }) {
  const isAssistant = message.role === "assistant";
  const Icon = isAssistant ? Sparkles : UserRound;
  return (
    <article className="flex gap-3">
      <div className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg ${isAssistant ? "bg-emerald-300/10 text-emerald-300" : "bg-zinc-700/40 text-zinc-300"}`}><Icon size={16} aria-hidden="true" /></div>
      <div className="min-w-0 flex-1">
        <p className="mb-2 text-xs font-medium text-zinc-300">{isAssistant ? "Database assistant" : "You"}{isAssistant && <span className="ml-2 text-[10px] font-normal uppercase tracking-wider text-zinc-500">Demo</span>}</p>
        <p className="whitespace-pre-wrap break-words text-sm leading-6 text-zinc-400">{message.content}</p>
      </div>
    </article>
  );
}
