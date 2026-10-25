"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquare, RotateCcw } from "lucide-react";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessage } from "@/components/chat/ChatMessage";
import type { ChatMessage as Message } from "@/types/chat";

const initialMessages: Message[] = [{ id: "welcome", role: "assistant", content: "Hello! This is your database workspace. Once connected, I’ll help you explore tables, understand schemas, and browse rows.\n\nFor now, try a message to explore the chat preview." }];
const suggestions = ["What tables are available?", "Describe a table", "Show me some rows"];

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const log = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [messages]);

  function sendMessage(content: string) {
    // Local demonstration only: no API calls, SDK initialization, or database access.
    setMessages((previous) => [...previous,
      { id: crypto.randomUUID(), role: "user", content },
      { id: crypto.randomUUID(), role: "assistant", content: "This is a local placeholder response. Gemini and the MCP server aren’t connected yet, so I can’t inspect your database. Your message stays in this browser session." },
    ]);
  }

  return (
    <section aria-label="Chat preview" className="overflow-hidden rounded-2xl border border-white/10 bg-[#121719] shadow-2xl shadow-black/20">
      <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4"><h2 className="flex items-center gap-2 text-sm font-medium"><MessageSquare size={16} className="text-emerald-300" aria-hidden="true" />New conversation</h2><button type="button" onClick={() => setMessages(initialMessages)} aria-label="Reset conversation" title="Reset conversation" className="rounded-md p-1.5 text-zinc-500 hover:bg-white/5 hover:text-zinc-200"><RotateCcw size={15} aria-hidden="true" /></button></div>
      <div ref={log} role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions" tabIndex={0} className="h-[300px] space-y-6 overflow-y-auto overscroll-contain p-5 sm:h-[330px] sm:p-6">{messages.map((message) => <ChatMessage key={message.id} message={message} />)}</div>
      <div className="px-4 pb-4 sm:px-5 sm:pb-5">
        <div className="mb-4 flex flex-wrap gap-2">{suggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => sendMessage(suggestion)} className="rounded-lg border border-white/10 px-3 py-2 text-[11px] text-zinc-400 transition hover:border-emerald-300/30 hover:text-emerald-200">{suggestion}</button>)}</div>
        <ChatInput onSend={sendMessage} />
        <p className="mt-3 text-center text-[10px] text-zinc-500">Local preview · No AI requests or database connections</p>
      </div>
    </section>
  );
}
