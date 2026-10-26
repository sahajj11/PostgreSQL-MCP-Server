import { Database, Layers3, Table2, Terminal } from "lucide-react";
import { ChatWindow } from "@/components/chat/ChatWindow";

const capabilities = [
  { icon: Layers3, title: "Explore your tables", text: "See what's in your database.", tool: "list_tables" },
  { icon: Table2, title: "Understand your schema", text: "Discover columns and data types.", tool: "describe_table" },
  { icon: Terminal, title: "Discover your data", text: "Take a closer look at table rows.", tool: "get_table_rows" },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-8">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 py-5">
        <div className="flex items-center gap-3 text-sm font-semibold tracking-tight">
          <span className="rounded-xl border border-emerald-300/20 bg-emerald-300/10 p-2.5 text-emerald-300"><Database size={20} aria-hidden="true" /></span>
          PostgreSQL MCP AI Chat
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-zinc-400">Powered by Groq</span>
      </header>
      <main className="py-8 sm:py-10">
        <section className="mb-7">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.22em] text-emerald-300 sm:text-xs">Your database. A conversation away.</p>
          <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">AI-Powered Database Assistant</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">Ask questions, explore your schema, and discover your PostgreSQL data in one workspace.</p>
        </section>
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_240px]">
          <ChatWindow />
          <aside aria-label="Database capabilities" className="space-y-5 lg:pt-2">
            <h2 className="text-xs font-medium uppercase tracking-widest text-zinc-500">Your toolkit</h2>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {capabilities.map(({ icon: Icon, title, text, tool }) => (
                <div key={tool} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <Icon size={19} className="mb-4 text-emerald-300" aria-hidden="true" />
                  <h3 className="text-sm font-medium">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-zinc-400">{text}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-white/[0.07] p-4 text-xs leading-6 text-zinc-400">
              <p className="mb-1 font-medium text-zinc-300">A tip for better answers</p>
              Include the table name and details in each question. The assistant does not remember earlier turns.
            </div>
          </aside>
        </div>
      </main>
      <footer className="flex flex-wrap justify-between gap-3 border-t border-white/10 py-5 text-[11px] text-zinc-500">
        <span>Chat stays in this tab and clears on reload.</span>
        <span>PostgreSQL · Groq · Model Context Protocol</span>
      </footer>
    </div>
  );
}
