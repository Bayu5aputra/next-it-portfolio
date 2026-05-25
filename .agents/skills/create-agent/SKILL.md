---
name: create-agent
description: Bootstrap a modular AI agent with OpenRouter SDK, extensible hooks, and optional Ink TUI. Use when the user wants to build an AI agent, chatbot, or assistant using OpenRouter's unified model access.
metadata:
  version: 0.0.0
  homepage: https://openrouter.ai
---

# Build a Modular AI Agent with OpenRouter

This skill helps you create a **modular AI agent** with:

- **Standalone Agent Core** - Runs independently, extensible via hooks
- **OpenRouter Agent SDK** - Unified access to 300+ language models with agentic loops
- **Optional Ink TUI** - Beautiful terminal UI (separate from agent logic)

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Your Application                 │
├─────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │   Ink TUI   │  │  HTTP API   │  │   Discord   │  │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  │
│         │                │                │         │
│         └────────────────┼────────────────┘         │
│                          ▼                          │
│              ┌───────────────────────┐              │
│              │      Agent Core       │              │
│              │  (hooks & lifecycle)  │              │
│              └───────────┬───────────┘              │
│                          ▼                          │
│              ┌───────────────────────┐              │
│              │  OpenRouter Agent SDK │              │
│              └───────────────────────┘              │
└─────────────────────────────────────────────────────┘
```

## Prerequisites

Get an OpenRouter API key at: https://openrouter.ai/settings/keys

⚠️ **Security:** Never commit API keys. Use environment variables.

## Project Setup

### Step 1: Initialize Project

```bash
mkdir my-agent && cd my-agent
npm init -y
npm pkg set type="module"
```

### Step 2: Install Dependencies

```bash
npm install @openrouter/agent zod eventemitter3
npm install ink react  # Optional: only for TUI
npm install -D typescript @types/react tsx
```

### Step 3: Create tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "dist"
  },
  "include": ["src"]
}
```

### Step 4: Add Scripts to package.json

```json
{
  "scripts": {
    "start": "tsx src/cli.tsx",
    "start:headless": "tsx src/headless.ts",
    "dev": "tsx watch src/cli.tsx"
  }
}
```

## File Structure

```bash
src/
├── agent.ts        # Standalone agent core with hooks
├── tools.ts        # Tool definitions
├── cli.tsx         # Ink TUI (optional interface)
└── headless.ts     # Headless usage example
```

## Step 1: Agent Core with Hooks

Create `src/agent.ts` - the standalone agent that can run anywhere:

```typescript
import { OpenRouter, tool, stepCountIs } from '@openrouter/agent';
import type { Tool, StopCondition, StreamableOutputItem } from '@openrouter/agent';
import { EventEmitter } from 'eventemitter3';
import { z } from 'zod';

// Message types
export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Agent events for hooks (items-based streaming model)
export interface AgentEvents {
  'message:user': (message: Message) => void;
  'message:assistant': (message: Message) => void;
  'item:update': (item: StreamableOutputItem) => void;
  'stream:start': () => void;
  'stream:delta': (delta: string, accumulated: string) => void;
  'stream:end': (fullText: string) => void;
  'tool:call': (name: string, args: unknown) => void;
  'tool:result': (name: string, result: unknown) => void;
  'reasoning:update': (text: string) => void;
  'error': (error: Error) => void;
  'thinking:start': () => void;
  'thinking:end': () => void;
}

// Agent configuration
export interface AgentConfig {
  apiKey: string;
  model?: string;
  instructions?: string;
  tools?: Tool<z.ZodTypeAny, z.ZodTypeAny>[];
  maxSteps?: number;
}

// The Agent class - runs independently of any UI
export class Agent extends EventEmitter<AgentEvents> {
  private client: OpenRouter;
  private messages: Message[] = [];
  private config: Required<Omit<AgentConfig, 'apiKey'>> & { apiKey: string };

  constructor(config: AgentConfig) {
    super();
    this.client = new OpenRouter({ apiKey: config.apiKey });
    this.config = {
      apiKey: config.apiKey,
      model: config.model ?? 'openrouter/auto',
      instructions: config.instructions ?? 'You are a helpful assistant.',
      tools: config.tools ?? [],
      maxSteps: config.maxSteps ?? 5,
    };
  }

  getMessages(): Message[] {
    return [...this.messages];
  }

  clearHistory(): void {
    this.messages = [];
  }

  setInstructions(instructions: string): void {
    this.config.instructions = instructions;
  }

  addTool(newTool: Tool<z.ZodTypeAny, z.ZodTypeAny>): void {
    this.config.tools.push(newTool);
  }

  // Send a message and get streaming response using items-based model
  async send(content: string): Promise<string> {
    const userMessage: Message = { role: 'user', content };
    this.messages.push(userMessage);
    this.emit('message:user', userMessage);
    this.emit('thinking:start');

    try {
      const result = this.client.callModel({
        model: this.config.model,
        instructions: this.config.instructions,
        input: this.messages.map((m) => ({ role: m.role, content: m.content })),
        tools: this.config.tools.length > 0 ? this.config.tools : undefined,
        stopWhen: [stepCountIs(this.config.maxSteps)],
      });

      this.emit('stream:start');
      let fullText = '';

      for await (const item of result.getItemsStream()) {
        this.emit('item:update', item);

        switch (item.type) {
          case 'message':
            const textContent = item.content?.find((c: { type: string }) => c.type === 'output_text');
            if (textContent && 'text' in textContent) {
              const newText = textContent.text;
              if (newText !== fullText) {
                const delta = newText.slice(fullText.length);
                fullText = newText;
                this.emit('stream:delta', delta, fullText);
              }
            }
            break;
          case 'function_call':
            if (item.status === 'completed' && item.name) {
              this.emit('tool:call', item.name, item.arguments);
            }
            break;
          case 'function_call_output':
            if (item.callId) {
              this.emit('tool:result', item.callId, item.output);
            }
            break;
        }
      }

      this.emit('thinking:end');
      this.emit('stream:end', fullText);

      const assistantMessage: Message = { role: 'assistant', content: fullText };
      this.messages.push(assistantMessage);
      this.emit('message:assistant', assistantMessage);

      return fullText;
    } catch (error) {
      this.emit('thinking:end');
      const err = error instanceof Error ? error : new Error(String(error));
      this.emit('error', err);
      throw err;
    }
  }
}
```

## Step 2: Define Tools

Create `src/tools.ts`:

```typescript
import { tool } from '@openrouter/agent';
import { z } from 'zod';

export const searchTool = tool({
  name: 'web_search',
  description: 'Search the web for current information',
  inputSchema: z.object({
    query: z.string().describe('The search query'),
  }),
  execute: async ({ query }) => {
    // Replace with real search integration
    return { results: `Search results for: ${query}` };
  },
});

export const calculatorTool = tool({
  name: 'calculator',
  description: 'Perform mathematical calculations',
  inputSchema: z.object({
    expression: z.string().describe('Math expression to evaluate'),
  }),
  execute: async ({ expression }) => {
    try {
      const result = Function(`"use strict"; return (${expression})`)();
      return { result: String(result) };
    } catch {
      return { error: 'Invalid expression' };
    }
  },
});

export const allTools = [searchTool, calculatorTool];
```

## Step 3: Headless Usage

Create `src/headless.ts`:

```typescript
import { Agent } from './agent.js';
import { allTools } from './tools.js';

const agent = new Agent({
  apiKey: process.env.OPENROUTER_API_KEY!,
  model: 'anthropic/claude-sonnet-4',
  instructions: 'You are a helpful assistant with access to search and calculator tools.',
  tools: allTools,
});

// Hook into events
agent.on('stream:delta', (delta) => process.stdout.write(delta));
agent.on('tool:call', (name, args) => console.log(`\n🔧 Calling ${name}:`, args));
agent.on('error', (err) => console.error('Error:', err.message));

// Run
const response = await agent.send('What is 42 * 17?');
console.log('\n\nFinal:', response);
```

## Step 4: Optional Ink TUI

Create `src/cli.tsx` for a beautiful terminal interface:

```tsx
import React, { useState, useCallback } from 'react';
import { render, Box, Text, useInput, useApp } from 'ink';
import { Agent } from './agent.js';
import { allTools } from './tools.js';

function App() {
  const { exit } = useApp();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [streaming, setStreaming] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const agent = React.useRef(
    new Agent({
      apiKey: process.env.OPENROUTER_API_KEY!,
      model: 'anthropic/claude-sonnet-4',
      instructions: 'You are a helpful terminal assistant.',
      tools: allTools,
    })
  ).current;

  React.useEffect(() => {
    agent.on('thinking:start', () => setIsThinking(true));
    agent.on('thinking:end', () => setIsThinking(false));
    agent.on('stream:delta', (_delta, accumulated) => setStreaming(accumulated));
    agent.on('message:assistant', (msg) => {
      setMessages((prev) => [...prev, { role: 'assistant', content: msg.content }]);
      setStreaming('');
    });
  }, [agent]);

  const handleSubmit = useCallback(async () => {
    if (!input.trim()) return;
    const userInput = input;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userInput }]);
    await agent.send(userInput);
  }, [input, agent]);

  useInput((ch, key) => {
    if (key.escape) exit();
    if (key.return) handleSubmit();
    if (key.backspace || key.delete) setInput((prev) => prev.slice(0, -1));
    else if (!key.ctrl && !key.meta && ch) setInput((prev) => prev + ch);
  });

  return (
    <Box flexDirection="column" padding={1}>
      <Text bold color="cyan">🤖 OpenRouter Agent</Text>
      <Box flexDirection="column" marginTop={1}>
        {messages.map((msg, i) => (
          <Box key={i} marginBottom={1}>
            <Text color={msg.role === 'user' ? 'green' : 'blue'}>
              {msg.role === 'user' ? '> ' : '🤖 '}{msg.content}
            </Text>
          </Box>
        ))}
        {streaming && <Text color="blue">🤖 {streaming}▌</Text>}
        {isThinking && !streaming && <Text color="yellow">💭 Thinking...</Text>}
      </Box>
      <Box marginTop={1}>
        <Text color="gray">{'> '}</Text>
        <Text>{input}▌</Text>
      </Box>
    </Box>
  );
}

render(<App />);
```

## Key Concepts

### Items-Based Streaming

The agent uses `getItemsStream()` which emits items with stable IDs. Each emission is a **complete replacement** for that item - replace by ID, don't accumulate:

```typescript
const items = new Map();
for await (const item of result.getItemsStream()) {
  items.set(item.id, item); // Replace, don't append
}
```

### Stop Conditions

Control how long the agent loop runs:

```typescript
import { stepCountIs, maxCost, hasToolCall } from '@openrouter/agent';

stopWhen: [
  stepCountIs(10),        // Max 10 steps
  maxCost(0.50),          // Max $0.50 spent
  hasToolCall('done'),    // Stop when 'done' tool is called
]
```

### Hook System

The agent emits events at every lifecycle point. This decouples the agent from any specific UI:

```typescript
agent.on('stream:delta', (delta, accumulated) => { /* update UI */ });
agent.on('tool:call', (name, args) => { /* log tool usage */ });
agent.on('error', (error) => { /* handle errors */ });
```
