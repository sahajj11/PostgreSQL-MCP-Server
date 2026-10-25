import { Database, Layers3, Table2, Terminal } from "lucide-react";
import { ChatWindow } from "@/components/chat/ChatWindow";

const capabilities = [
  { icon: Layers3, title: "Explore your tables", text: "Get a clear view of your database structure.", tool: "list_tables" },
  { icon: Table2, title: "Understand your schema", text: "Discover columns, types, and table details.", tool: "describe_table" },
  { icon: Terminal, title: "Discover your data", text: "Explore table rows through conversation.", tool: "get_table_rows" },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 py-6">
        <div className="flex items-center gap-3 text-sm font-semibold tracking-tight">
          <span className="rounded-xl border border-emerald-300/20 bg-emerald-300/10 p-2.5 text-emerald-300"><Database size={20} aria-hidden="true" /></span>
          PostgreSQL MCP AI Chat
        </div>
        <span className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-zinc-400"><span className="size-1.5 rounded-full bg-amber-300" />Local demo</span>
      </header>
      <main className="pb-12 pt-12 sm:pt-16">
        <section className="mb-9 max-w-2xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-emerald-300">Your database. A conversation away.</p>
          <h1 className="text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl">AI-Powered<br className="hidden sm:block" /> Database Assistant</h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">A conversational workspace for exploring PostgreSQL. Built for Gemini and the Model Context Protocol, starting with a simple chat.</p>
        </section>
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_270px]">
          <ChatWindow />
          <aside aria-label="Planned database tools" className="space-y-5 lg:pt-2">
            <h2 className="text-xs font-medium uppercase tracking-widest text-zinc-400">Built to explore</h2>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {capabilities.map(({ icon: Icon, title, text, tool }) => (
                <div key={tool} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <Icon size={19} className="mb-4 text-emerald-300" aria-hidden="true" />
                  <h3 className="text-sm font-medium">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-zinc-400">{text}</p>
                  <code className="mt-4 block text-[11px] text-zinc-500">{tool}</code>
                </div>
              ))}
            </div>
            <p className="text-xs leading-5 text-zinc-500">Preview only. Gemini and database tools are not connected yet.</p>
          </aside>
        </div>
      </main>
      <footer className="flex flex-wrap justify-between gap-3 border-t border-white/10 py-6 text-xs text-zinc-500"><span>PostgreSQL MCP AI Chat</span><span>Next.js · Gemini · Model Context Protocol</span></footer>
    </div>
  );
}
