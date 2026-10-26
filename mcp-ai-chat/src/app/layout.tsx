import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "PostgreSQL MCP AI Chat",
  description: "Explore PostgreSQL tables, schemas, and data with an AI-powered database assistant.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body className="min-h-screen antialiased">{children}</body></html>;
}
