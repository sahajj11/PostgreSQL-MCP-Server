"use client";

import { useState, type FormEvent } from "react";
import { ArrowUp } from "lucide-react";

export function ChatInput({ onSend }: { onSend: (message: string) => void }) {
  const [value, setValue] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = value.trim();
    if (!message) return;
    onSend(message);
    setValue("");
  }

  return (
    <form onSubmit={submit} className="rounded-xl border border-white/10 bg-black/20 p-3 focus-within:border-emerald-300/40">
      <label htmlFor="chat-message" className="sr-only">Message the database assistant</label>
      <textarea id="chat-message" value={value} onChange={(event) => setValue(event.target.value)} maxLength={4000} rows={2} placeholder="Ask about your database…" className="w-full resize-none bg-transparent p-1 text-sm leading-6 text-zinc-200 placeholder:text-zinc-600 focus:outline-none" onKeyDown={(event) => {
        if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
          event.preventDefault();
          event.currentTarget.form?.requestSubmit();
        }
      }} />
      <div className="flex items-center justify-between gap-2"><span className="text-[10px] text-zinc-500">Enter to send · Shift + Enter for a new line</span><button type="submit" disabled={!value.trim()} aria-label="Send message" className="rounded-lg bg-emerald-300 p-2 text-emerald-950 transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-30"><ArrowUp size={17} aria-hidden="true" /></button></div>
    </form>
  );
}
