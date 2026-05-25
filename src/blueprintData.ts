export interface RoadmapStep {
  phase: string;
  title: string;
  timeframe: string;
  focus: string;
  skills: string[];
  projects: string[];
}

export const ROADMAP: RoadmapStep[] = [
  {
    phase: "Phase 1: Foundations",
    title: "Core AI & Basic Prompting Eng",
    timeframe: "Weeks 1-3",
    focus: "Mastering standard LLM APIs, function calling, stateful scripting, and standard scraping.",
    skills: ["Python AsyncIO", "HTTP protocol & custom headers", "Structured JSON generation", "OpenAI / Gemini SDKs", "Regex + BeautifulSoup4"],
    projects: ["Automated Arxiv PDF Scraper & Markdown Translator", "Weather Agent with custom local coordinates API tool calling"]
  },
  {
    phase: "Phase 2: RAG & State Machines",
    title: "Knowledge Context & Vector DBs",
    timeframe: "Weeks 4-6",
    focus: "Connecting external documents to LLMs using semantic embeddings, indexing, and persistent agents.",
    skills: ["Vectors & Cosine Similarity", "ChromaDB / Qdrant", "Recursive character chunking", "Re-ranking (CoHere)", "LangGraph state management", "SQLite / PostgreSQL"],
    projects: ["Local Documentation Chatbot with semantic index sync", "Autonomous Email Lead Router with SQLite historic state memory"]
  },
  {
    phase: "Phase 3: Production & Orchestration",
    title: "Multi-Agent Systems & Scheduling",
    timeframe: "Weeks 7-9",
    focus: "Designing collaborative networks where specialized agents communicate, review, and consensus-build.",
    skills: ["LangGraph / CrewAI", "Redis queue & Celery", "FastAPI webhooks", "Docker containerization", "Playwright head-less browser clusters"],
    projects: ["Multi-Agent Research Syndicate (Scrapes, Outlines, Fact-checks, and Publishes AI Newsletters)", "Real-time Github Tracker with automated Discord notifications"]
  },
  {
    phase: "Phase 4: Advanced Systems",
    title: "Human-in-the-Loop & Scale",
    timeframe: "Weeks 10-12",
    focus: "Hardening production agents with strict rate-limiting, semantic caching, continuous evaluation, and feedback checkpoints.",
    skills: ["LangSmith / Phoenix evaluation", "Kubernetes cluster routing", "Semantic Cache (Redis)", "LLM security (Injection guards)", "Feedback-based State rollback"],
    projects: ["Enterprise Support Agent with auto-escalation & live feedback loop", "Decentralized 24/7 Intelligence Hub with automatic incident triage"]
  }
];

export interface StudyRepo {
  name: string;
  url: string;
  description: string;
  stars: string;
  keyFilesToStudy: string;
  architecturalVibe: string;
}

export const STUDY_REPOS: StudyRepo[] = [
  {
    name: "langchain-ai/langgraph",
    url: "https://github.com/langchain-ai/langgraph",
    description: "Stateful, multi-agent coordination library using cyclic graphs. Highly customizable and perfect for production-grade agent workflows.",
    stars: "8k+",
    keyFilesToStudy: "langgraph/graph/state.py, langgraph/pregel/__init__.py",
    architecturalVibe: "Deterministic State Graphs with concurrent execution"
  },
  {
    name: "crewAIInc/crewAI",
    url: "https://github.com/crewAIInc/crewAI",
    description: "Role-based, collaborative multi-agent framework. Agents communicate sequentially or hierarchically to simulate real startup hierarchies.",
    stars: "22k+",
    keyFilesToStudy: "src/crewai/agent/agent.py, src/crewai/crew/crew.py",
    architecturalVibe: "Autonomous Role Delegation & Custom Tool binding"
  },
  {
    name: "microsoft/autogen",
    url: "https://github.com/microsoft/autogen",
    description: "A framework that enables development of LLM applications using multiple agents that can converse with each other to solve tasks.",
    stars: "34k+",
    keyFilesToStudy: "autogen/agentchat/conversable_agent.py, autogen/agentchat/groupchat.py",
    architecturalVibe: "Hierarchical/Conversational peer-to-peer delegation"
  },
  {
    name: "vllm-project/vllm",
    url: "https://github.com/vllm-project/vllm",
    description: "High-throughput and memory-efficient LLM serving engine. Features PagedAttention to minimize KV-cache fragmentation.",
    stars: "32k+",
    keyFilesToStudy: "vllm/core/scheduler.py, vllm/attention/ops/paged_attn.py",
    architecturalVibe: "Low-latency inference server optimized for standard hardware"
  },
  {
    name: "unclecode/crawl4ai",
    url: "https://github.com/unclecode/crawl4ai",
    description: "Highly optimized web scraper engineered specifically for LLMs. Returns clean, structured Markdown, stripping JS and noise.",
    stars: "7k+",
    keyFilesToStudy: "crawl4ai/web_crawler.py, crawl4ai/chunking_strategy.py",
    architecturalVibe: "Headless rendering + semantic CSS selector stripping"
  }
];

export interface PortfolioProject {
  title: string;
  description: string;
  difficulty: "Intermediate" | "Advanced" | "Enterprise";
  stack: string[];
  challenge: string;
}

export const PORTFOLIO_IDEAS: PortfolioProject[] = [
  {
    title: "Cold-Lead Intelligence Gathering Agent System",
    description: "An agent that scans news websites and startup hubs, maps business triggers, identifies key stakeholders, and synthesizes highly personalized reaching briefs.",
    difficulty: "Intermediate",
    stack: ["FastAPI", "BeautifulSoup4", "Qdrant", "Gemini 3.5 Flash", "PostgreSQL"],
    challenge: "Scraping dynamically and avoiding captchas while synthesizing factual context without hallucinating executive roles."
  },
  {
    title: "Autonomous Multi-Agent Newsletter Syndicate",
    description: "An automated agency where the Crawler Scrapes Arxiv + Twitter, the Filter evaluates papers with a semantic vector DB, the Architect schedules syntheses, and the Editor drafts responsive newsletter layouts.",
    difficulty: "Advanced",
    stack: ["LangGraph", "Playwright", "Crawl4AI", "CoHere Re-Rank", "GitHub Actions", "Redis"],
    challenge: "Managing circular dependencies in state loops, dealing with empty results, and handling API context windows."
  },
  {
    title: "Continuous Codebase Compliance & Upgrade Agent",
    description: "An agentic service that listens to Github code push events, analyzes pull requests against outdated APIs, updates imported dependencies, and verifies execution by triggering linter validation.",
    difficulty: "Enterprise",
    stack: ["FastAPI", "SimpleAST", "ESLint CLI", "Gemini 3.1 Pro", "Docker Sandboxes", "GitHub Webhooks"],
    challenge: "Handling LLM hallucinated code fixes by running continuous linter compile validation in secure isolated Sandboxes."
  }
];

export interface ManualSection {
  id: string;
  title: string;
  tagline: string;
  markdown: string;
}

export const MANUAL_SECTIONS: ManualSection[] = [
  {
    id: "skills-stack",
    title: "1. Core Skills & Technology Stack",
    tagline: "Python, FastAPI, LangGraph, and specialized asynchronous executors.",
    markdown: `### Agent Architect Tech Stack
Building fully automated, real-time agents requires moving past simple client-side scripts. You must construct a **distributed asynchronous engine**.

#### Languages
- **Python (Recommended Backend/Model execution)**: Deep ecosystem integration with HuggingFace, PyTorch, LangChain, and Crawl4AI. Essential for intensive text processing, numpy embeddings, and token calculations.
- **TypeScript/Node.js (Recommended User Facing APIs/Websockets)**: Unmatched performance for high-concurrency event-driven web servers, live websocket visualizations, and rapid telemetry tracking.

#### Core Server Stack
- **FastAPI / Express**: Lightweight, async-first framework. High speed (Uvicorn UV loop), native JSON validation (Pydantic), and speed of development.
- **LangGraph / CrewAI**: LangGraph excels at state-machine DAGs and cyclical loops. CrewAI is ideal for role-based sequential workflows.

#### State & Memory DBs
- **PostgreSQL**: For complex structured data, transaction auditing, and permanent state storage.
- **Redis**: Highly reliable temporary storage, task queues, semantic caching, and real-time state tracking.
- **Qdrant / PGVector**: High-speed, lower memory density vector indexing. Supporting metadata filtration (e.g. \`where score > 0.85 AND timestamp > 24h\`).`
  },
  {
    id: "architecture-workflow",
    title: "2. Workflow & Autonomous Agent Architecture",
    tagline: "Design cyclic state-machines over simple chronological chains.",
    markdown: `### Production Multi-Agent Architecture
Traditional LLM chains fall apart on unpredictable internet scraping inputs. Standardize on **Cyclic Directed Acyclic Graphs (State Machines)**.

\`\`\`
   [ Scraper Node ] -----> [ Validation Node ] ---- (Invalid Data) ---> [ Error Repair Loop ]
          ^                        |                                         |
          |                        v (Valid structured Markdown)              v
[ Pipeline Trigger ]       [ Embedder / VectorDB Node ] <---------------------+
          |                        |
          |                        v
   [ Discord Sync ] <----- [ RAG Synthesis & Reporter Node ]
\`\`\`

#### Key Architectural Rules
1. **Never Let Agents Loop Indefinitely**: Always set a hard limit on node traversals (e.g., \`max_iterations = 5\`).
2. **Isolate Scrapers from Synthesis**: Scrapers are messy, prone to network errors, and trigger rate-limits. Execute scraping asynchronously, buffer findings in Redis, and trigger LLM syntheses separately.
3. **Structured Context Buffers**: Store token buffers to prevent overflow:
   - *Episodic (Session-based)*: Conversational context stored as JSON strings.
   - *Semantic (Knowledge-based)*: Scraped results chunked and queried from Vector DBs.
   - *Working (State)*: Real-time context mapped to live variables.`
  },
  {
    id: "scraping-automation",
    title: "3. Crawlers, Browser Automation & APIs",
    tagline: "Bypassing dynamic JS, cloudflares, and parsing clean LLM markdown.",
    markdown: `### Semantic Intelligence Gathering
Traditional Scraping engines fail on advanced Single Page Applications (SPAs) or Cloudflare-protected feeds. Adopt high-performance web parsing tools:

#### Essential Tools
- **Crawl4AI / Firecrawl**: Translates any dynamic raw page to clean semantic Markdown while removing footer links and sidebars.
- **Playwright (Python/TS Async)**: Headless rendering, dynamic element clicking, cookie consent handling. Run clusters with a pool of proxies.
- **Hacker News API**: Standard fetch routines from \`https://hacker-news.firebaseio.com/v0/\`. Faster than html scraping.

#### Code Snippet: Production-Grade Async Scraper Web Crawler (Python + Playwright)
\`\`\`python
import asyncio
from playwright.async_api import async_playwright
from bs4 import BeautifulSoup

async def scrape_clean_text(url: str) -> str:
    async with async_playwright() as p:
        # Launching with stealth headers to prevent immediate blocking
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36..."
        )
        page = await context.new_page()
        
        try:
            # Injecting network idle waits to confirm dynamic scripts finish loading
            await page.goto(url, wait_until="networkidle", timeout=15000)
            content = await page.content()
            
            # Extract and filter text using BeautifulSoup to strip script & style elements
            soup = BeautifulSoup(content, 'html.parser')
            for element in soup(["script", "style", "nav", "footer", "iframe"]):
                element.decompose()
                
            clean_text = " ".join(soup.get_text().split())
            return clean_text[:8000] # Safe token limit return
        except Exception as e:
            print(f"Scrape fault on {url}: {e}")
            return ""
        finally:
            await browser.close()
\`\`\`

#### Tips for Bypassing Anti-Bot Checkpoints
1. Use **residential proxy pools** with rotating session headers.
2. Intercept and block unnecessary assets (videos, static images, stylesheet loads) to save 80% network overhead.
3. Implement polite scraping limits (minimum 2500ms delay between consecutive pings target-by-target).`
  },
  {
    id: "vector-rag",
    title: "4. Vectors, RAG, and Memory Mechanics",
    tagline: "Recursive chunking, hybrid metadata filters, and smart cache stores.",
    markdown: `### Retrieval-Augmented Generation & Stateful Memory
Unstructured scraping lists feed into vector databases. However, raw searches of top logs generate significant noise.

#### Advanced RAG Engineering Checklist
- **Chunking (Recursive Text Splitter)**: Avoid splitting sentences in half. Use character lists \`["\\n\\n", "\\n", " ", ""]\` seeking semantic boundaries with a chunk size of 512–800 tokens and 10% overlap.
- **Hybrid Querying (Vector + BM25)**: Combine vector semantic embeddings (good at concept matching) with BM25 keyword matching (good at recognizing exact version strings, code variables like \`llama.cpp\`, or model numbers).
- **Metadata Filters**: Restrict RAG searches strictly to items created within the last 24h:
  \`\`\`python
  # Qdrant daily filter routine
  client.query_points(
      collection_name="ai_news",
      query=query_vector,
      query_filter=Filter(
          must=[
              FieldCondition(key="timestamp", range=Range(gte=yesterday_epoch))
          ]
      )
  )
  \`\`\`
- **Semantic KV Caching**: Prior to invoking high-cost LLM generation, hashes of incoming scraping queries are checked in Redis. This reduces inference cost by up to 50% for redundant news feeds.`
  },
  {
    id: "scheduling-scaling",
    title: "5. Production Scheduling, Logging & Security",
    tagline: "Event-driven architecture, robust logging, and prompt-injection guards.",
    markdown: `### Scaling the Agent to Production
Running an agent continuously in 24h background cycles requires moving from scripts to containerization.

#### Scheduling Engine
- **Celery + Redis / RabbitMQ**: Distribute crawls across worker queues. Avoid standard \`time.sleep()\` loops, which block your main process.
- **Cron Jobs / Kubernetes Cron**: Run container cycles as orchestrated jobs.

#### Operations & Infrastructure
- **Docker**: Containerize scrapers and server nodes with consistent dependencies.
- **State Serialization**: Save all pipeline checkpoints as relational JSON columns so you can resume agent state on dynamic host failures.

#### Critical Security & Rate-Limiting Guardrails
1. **Budget & Token Firewalls**: Set a hard daily budget capped at $5–$10 in OpenAI/Gemini requests. Throw alarms automatically if tokens-per-minute spikes.
2. **Sandbox Execution environment**: If your agent fetches dynamically generated Github code and attempts test compilations, ALWAYS run executions in insulated Docker Sandboxes without workspace access.
3. **Structured Prompt Separation**: Avoid injecting raw parsed scraped headlines directly into system prompts. This is a vector for prompt-injection attacks. Use structured inputs passed strictly through parameter fields.`
  }
];
