"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, ArrowUpRight, Database, LoaderCircle, MessageSquare, RotateCcw, Sparkles } from "lucide-react";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessage } from "@/components/chat/ChatMessage";
import type { ChatMessage as Message } from "@/types/chat";

const suggestions = [
  "What tables are available in my database?",
  "Show me 5 products.",
  "Describe the products table.",
  "Which products are available in stock?",
];

type FailedRequest = { message: string; explanation: string };

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [failure, setFailure] = useState<FailedRequest | null>(null);
  const log = useRef<HTMLDivElement>(null);
  const activeRequest = useRef<AbortController | null>(null);

  useEffect(() => {
    log.current?.scrollTo({
      top: log.current.scrollHeight,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }, [messages, isLoading, failure]);

  useEffect(() => () => {
    activeRequest.current?.abort();
    activeRequest.current = null;
  }, []);

  async function sendMessage(content: string, retry = false) {
    const message = content.trim();
    // Lock immediately, including clicks before React updates disabled controls.
    if (activeRequest.current || !message || message.length > 2000) return;
    const controller = new AbortController();
    activeRequest.current = controller;
    setIsLoading(true);
    setFailure(null);
    if (!retry) {
      setMessages((previous) => [...previous, { id: crypto.randomUUID(), role: "user", content: message }]);
    }

    const timeout = window.setTimeout(() => controller.abort(), 120_000);
    try {
      // Previous messages are display-only. This API has no conversation memory.
      // Keep Groq, MCP, credentials, and tool orchestration behind the route handler.
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error(response.status === 429
          ? "Too many requests. Please wait a moment and retry."
          : "The assistant couldn't complete your request. Please try again.");
      }
      const data: unknown = await response.json();
      if (
        !data || typeof data !== "object" ||
        !("success" in data) || data.success !== true ||
        !("reply" in data) || typeof data.reply !== "string" || !data.reply.trim()
      ) {
        throw new Error("The assistant returned an unexpected response. Please retry.");
      }
      if (activeRequest.current !== controller) return;
      const reply = data.reply;
      setMessages((previous) => [...previous, { id: crypto.randomUUID(), role: "assistant", content: reply }]);
    } catch (error) {
      if (activeRequest.current !== controller) return;
      const explanation = controller.signal.aborted
        ? "This request took too long. Please retry."
        : error instanceof TypeError
          ? "Couldn't reach the assistant. Check your connection and retry."
          : error instanceof SyntaxError
            ? "The assistant returned an unreadable response. Please retry."
            : error instanceof Error ? error.message : "Something went wrong. Please retry.";
      setFailure({ message, explanation });
    } finally {
      window.clearTimeout(timeout);
      if (activeRequest.current === controller) {
        activeRequest.current = null;
        setIsLoading(false);
      }
    }
  }

  function resetConversation() {
    if (activeRequest.current) return;
    setMessages([]);
    setFailure(null);
  }

  return (
    <section aria-label="Database chat" className="flex h-[min(780px,85dvh)] min-h-[560px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#121719] shadow-2xl shadow-black/20">
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-5 py-4">
        <div className="flex items-center gap-3">
          <MessageSquare size={18} className="text-emerald-300" aria-hidden="true" />
          <div><h2 className="text-sm font-medium">Database assistant</h2><p className="mt-1 text-xs text-zinc-500">Explore with natural language</p></div>
        </div>
        <button type="button" onClick={resetConversation} disabled={isLoading || messages.length === 0} aria-label="Clear conversation" title="Clear conversation" className="rounded-lg p-2 text-zinc-400 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30">
          <RotateCcw size={16} aria-hidden="true" />
        </button>
      </div>
      <div ref={log} className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-7" tabIndex={0} aria-label="Chat messages">
        {messages.length === 0 && (
          <div className="mx-auto flex min-h-full max-w-lg flex-col justify-center py-5">
            <span className="mb-5 flex size-12 items-center justify-center rounded-2xl border border-emerald-300/15 bg-emerald-300/10 text-emerald-300"><Database size={23} aria-hidden="true" /></span>
            <h3 className="text-2xl font-semibold tracking-tight">What would you like to explore?</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-400">Discover your tables, understand their structure, or take a closer look at your data.</p>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {suggestions.map((suggestion) => (
                <button key={suggestion} type="button" disabled={isLoading} onClick={() => void sendMessage(suggestion)} className="group flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3.5 text-left text-xs leading-5 text-zinc-300 transition hover:border-emerald-300/30 hover:bg-emerald-300/5 hover:text-emerald-200 disabled:opacity-40">
                  {suggestion}<ArrowUpRight size={15} className="mt-0.5 shrink-0 text-zinc-500 transition group-hover:text-emerald-300" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        )}
        <div role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions" className="space-y-6">
          {messages.map((message) => <ChatMessage key={message.id} message={message} />)}
        </div>
        {isLoading && (
          <div role="status" className="mt-6 flex items-center gap-3 text-sm text-zinc-400">
            <span className="rounded-lg bg-emerald-300/10 p-2 text-emerald-300"><Sparkles size={16} aria-hidden="true" /></span>
            <LoaderCircle size={15} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
            Working on your request...
          </div>
        )}
        {failure && (
          <div role="alert" className="mt-6 rounded-xl border border-rose-300/20 bg-rose-300/5 p-4">
            <div className="flex gap-2 text-sm leading-6 text-rose-200"><AlertCircle size={18} className="mt-1 shrink-0" aria-hidden="true" /><p>{failure.explanation}</p></div>
            <button type="button" disabled={isLoading} onClick={() => void sendMessage(failure.message, true)} className="mt-3 inline-flex items-center gap-2 rounded-lg border border-rose-300/20 px-3 py-2 text-xs font-medium text-rose-100 transition hover:bg-rose-300/10 disabled:opacity-40"><RotateCcw size={13} aria-hidden="true" />Retry request</button>
          </div>
        )}
      </div>
      <div className="border-t border-white/[0.05] p-4 sm:p-5">
        <ChatInput onSend={(message) => void sendMessage(message)} isLoading={isLoading} />
        <p className="mt-3 text-center text-[11px] leading-5 text-zinc-500">Each question is independent. Previous messages are not sent to the AI.</p>
      </div>
    </section>
  );
}
