
# MCP-Powered AI Assistant

### An AI-powered PostgreSQL Assistant built using Model Context Protocol (MCP)

An AI assistant that interacts with a PostgreSQL database through natural-language conversations using a custom **MCP Server and Client**.

This project demonstrates how **Model Context Protocol (MCP)** enables AI applications to discover and execute external tools through a standardized interface.

Instead of writing SQL queries manually, users can ask questions about their database, and the AI assistant automatically selects the appropriate MCP tools to retrieve information.

## Features

- 🤖 AI-powered natural-language database interaction
- 🔌 Custom MCP Server and Client implementation
- 🛠️ Dynamic MCP tool discovery and execution
- 🗄️ PostgreSQL database integration
- ⚡ Groq LLM integration with function calling
- 💬 Interactive Next.js chat interface
- 🔒 Read-only database access
- 📱 Responsive chat interface

## 🏗️ System Architecture

```text
                  User
                   |
                   v
          Next.js Chat Interface
                   |
                   v
           Next.js API Route
                   |
                   v
              Groq LLM
           (Function Calling)
                   |
                   v
              MCP Client
                   |
                   v
              MCP Server
                   |
                   v
             PostgreSQL
```

### How It Works

1. The user enters a natural-language question.
2. The Next.js backend sends the question and available tool definitions to the Groq LLM.
3. The LLM identifies the appropriate MCP tool.
4. The MCP Client invokes the tool through the MCP protocol.
5. The MCP Server executes the corresponding PostgreSQL operation.
6. The result is returned to the LLM, which generates a human-readable response.

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js | Chat interface and backend API |
| TypeScript | Application development |
| MCP SDK | MCP Server and Client |
| Groq LLM | AI inference and function calling |
| PostgreSQL | Database |
| Tailwind CSS | UI styling |
| Node.js | MCP Server runtime |

## 🔧 MCP Tools

The custom MCP Server exposes three tools:

### 1. `list_tables`

Lists available tables in the PostgreSQL database.

**Example prompt:**

> What tables are available in my database?

### 2. `describe_table`

Retrieves column names, data types, and schema information for a specified table.

**Example prompt:**

> Describe the products table.

### 3. `get_table_rows`

Fetches records from a specified PostgreSQL table with a configurable limit.

**Example prompt:**

> Show me 5 products from my database.

## 📁 Project Structure

```text
project/
├── postgres-mcp-server/
│   ├── src/
│   │   ├── index.ts
│   │   └── db.ts
│   ├── package.json
│   └── tsconfig.json
│
└── mcp-ai-chat/
    ├── src/
    │   ├── app/
    │   │   ├── api/
    │   │   │   └── chat/
    │   │   │       └── route.ts
    │   │   ├── page.tsx
    │   │   └── layout.tsx
    │   │
    │   ├── components/
    │   │   └── chat/
    │   │
    │   └── lib/
    │       ├── mcp/
    │       │   └── client.ts
    │       └── ai/
    │           └── groq.ts
    │
    └── package.json
```

## ⚙️ Installation & Setup

### Prerequisites

Make sure you have installed:

- Node.js
- PostgreSQL
- npm
- A Groq API key

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
```

### 2. Set Up the MCP Server

```bash
cd postgres-mcp-server
npm install
```

Create a `.env` file:

```env
DATABASE_URL=postgresql://mcp_reader:YOUR_PASSWORD@localhost:5432/mcp_demo
```

Make sure the PostgreSQL database exists and the `mcp_reader` user has read-only access.

### 3. Set Up the Next.js Application

```bash
cd ../mcp-ai-chat
npm install
```

Create a `.env.local` file:

```env
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.3-70b-versatile
MCP_SERVER_PATH=/absolute/path/to/postgres-mcp-server
```

Replace the placeholders with your actual configuration.

### 4. Start the Application

```bash
npm run dev
```

Open:

http://localhost:3000

The Next.js backend automatically starts the MCP Server as a child process when needed.

## 💬 Example Queries

Try asking the AI Assistant:

```text
What tables are available in my database?

Describe the products table.

Show me 5 products.

Fetch 10 records from the products table.

What columns are available in the products table?
```

The assistant dynamically selects and executes the appropriate MCP tools.

## 🔐 Security

- Database operations use a read-only PostgreSQL account.
- MCP tools expose only predefined database operations.
- SQL queries use parameterized values where applicable.
- Table identifiers are validated and escaped.
- Database credentials and API keys are stored in environment variables.
- API keys remain on the server side.

> Note: This project is currently intended for local development and learning. Authentication, authorization, rate limiting, and additional data-access restrictions should be implemented before production deployment.

## 🧠 What I Learned

Building this project provided hands-on experience with:

- Model Context Protocol (MCP) architecture
- MCP Server and Client implementation
- MCP tool registration and discovery
- LLM function calling
- Tool execution and response handling
- AI-to-database integration
- Building AI-powered full-stack applications

## 🚧 Future Improvements

- [ ] Advanced read-only SQL querying
- [ ] Conversation memory and contextual follow-ups
- [ ] Additional MCP tools
- [ ] Database analytics and visualizations
- [ ] Authentication and role-based access
- [ ] Streaming AI responses
- [ ] Production deployment

## 📚 Resources

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Groq Documentation](https://console.groq.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## ⭐ About This Project

This project was built to understand how **AI assistants can interact with external systems using Model Context Protocol (MCP)**.

The main focus was implementing a custom MCP Server and Client, exposing PostgreSQL operations as tools, and integrating LLM function calling to create a working AI-powered database assistant.

---

**Built with TypeScript, Next.js, MCP, Groq, and PostgreSQL.**
