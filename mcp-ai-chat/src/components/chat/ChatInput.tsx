"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUp, LoaderCircle } from "lucide-react";

type ChatInputProps = {
  onSend: (message: string) => void;
  isLoading: boolean;
};

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textarea = useRef<HTMLTextAreaElement>(null);
  const wasLoading = useRef(false);

  useEffect(() => {
    if (wasLoading.current && !isLoading) textarea.current?.focus({ preventScroll: true });
    wasLoading.current = isLoading;
  }, [isLoading]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = value.trim();
    if (isLoading || !message || message.length > 2000) return;
    onSend(message);
    setValue("");
  }

  return (
    <form onSubmit={submit} aria-busy={isLoading} className="rounded-xl border border-white/10 bg-black/20 p-3 transition focus-within:border-emerald-300/40 focus-within:ring-2 focus-within:ring-emerald-300/5">
      <label htmlFor="chat-message" className="sr-only">Ask a question about your database</label>
      <textarea
        ref={textarea}
        id="chat-message"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        disabled={isLoading}
        maxLength={2000}
        rows={2}
        aria-describedby="composer-help"
        placeholder="Ask about your database..."
        className="max-h-40 min-h-16 w-full resize-y bg-transparent p-1 text-base leading-6 text-zinc-200 placeholder:text-zinc-500 focus:outline-none disabled:cursor-wait disabled:opacity-50 sm:text-sm"
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
            event.preventDefault();
            if (!isLoading) event.currentTarget.form?.requestSubmit();
          }
        }}
      />
      <div className="mt-1 flex items-center justify-between gap-3">
        <div id="composer-help" className="text-[10px] leading-5 text-zinc-500"><span className="hidden sm:inline">Enter to send · Shift+Enter for a new line · </span>{value.length}/2,000</div>
        <button type="submit" disabled={isLoading || !value.trim()} aria-label={isLoading ? "Waiting for response" : "Send message"} className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-300 text-emerald-950 transition hover:bg-emerald-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 motion-reduce:transform-none">
          {isLoading ? <LoaderCircle size={18} className="animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <ArrowUp size={19} aria-hidden="true" />}
        </button>
      </div>
    </form>
  );
}
