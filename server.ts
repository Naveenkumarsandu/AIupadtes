import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API Key lazy-initialization block
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === 'MY_GEMINI_API_KEY') {
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Healthy status check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    apiConfigured: !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'
  });
});

// Dynamic/Realistic Simulated reports when API key is missing
function createSimulatedReport(topic: string) {
  const norm = topic.toLowerCase();
  
  if (norm.includes('deepseek') || norm.includes('r1') || norm.includes('v3')) {
    return {
      topic: "DeepSeek R1 & V3 Architectures",
      executiveSummary: "Within the last 24 hours, multi-token prediction models have driven immense developer discussion. Open-source communities are optimizing R1 configurations to operate efficiently on consumer hardware, demonstrating breakthroughs in Mixture-of-Experts (MoE) routing.",
      hasOfficialRelease: true,
      sections: [
        {
          title: "GitHub Trending & Inference Optimization",
          category: "GitHub",
          summary: "GitHub projects detailing local GGUF models and vLLM integration are dominating trending lists. Single-node MoE implementations are running on standard 8x80GB cluster setups, achieving over 120 tokens/sec.",
          bulletPoints: [
            "Local inference scripts using llama.cpp updated to support active FP8 routing filters.",
            "A popular quantization project reached 8,200 stars overnight.",
            "Optimization logs show a 30% reduction in KV-cache consumption using multi-head latent attention (MLA)."
          ]
        },
        {
          title: "Paper Analysis: Multi-Token Prediction & RL Alignment",
          category: "Paper",
          summary: "New research preprints analyze DeepSeek's open-weights training methodology, contrasting direct Reinforcement Learning (RL) pathing against traditional supervised fine-tuning. This triggers debate on model alignment efficiency.",
          bulletPoints: [
            "Pure RL paths show emergent critical thinking steps without supervised chain-of-thought data.",
            "Ablation studies reveal MoE routing load balancing accounts for minor inference degradation.",
            "Researchers hypothesize custom multi-token heads significantly optimize long-context reasoning structures."
          ]
        },
        {
          title: "Developer Forums: Local Deployments vs Commercial APIs",
          category: "Social",
          summary: "Hacker News and Reddit threads are filled with benchmarks comparing localized 671B parametrics to commercial hosted APIs. Cold-start latency and cost-per-million tokens are key topics.",
          bulletPoints: [
            "HN thread 'Running DeepSeek R1 locally on custom rig' hits frontpage with over 450 points.",
            "API providers are aggressively pricing tokens at $0.14 per Million input tokens to undercut traditional pipelines.",
            "Discord communities outline simple guidelines for prompt distillation to prevent agent loops."
          ]
        }
      ],
      timelineEvents: [
        { time: "05:30 UTC", source: "GitHub", badge: "Hot", text: "llama.cpp merges initial support for deepseek-moe custom MLA layers." },
        { time: "10:15 UTC", source: "Arxiv", badge: "Research", text: "Preprint released analyzing RL-driven emergent reasoning in open weights." },
        { time: "14:45 UTC", source: "Hacker News", badge: "Trending", text: "Post titled 'Distilling R1 for Custom Robotic Workflows' gains 600+ upvotes." },
        { time: "21:00 UTC", source: "Reddit", badge: "Discussion", text: "Subreddit r/LocalLLaMA reaches consensus on RAM/VRAM combinations for local execution." }
      ],
      modelStats: [
        { label: "Architecture Type", value: "Mixture of Experts (MoE)" },
        { label: "Active Parameters", value: "37B active / 671B total" },
        { label: "Context Window", value: "128,000 tokens" },
        { label: "MLA Attention", value: "Latent projection activated" }
      ],
      nextActionsForDevs: [
        "Audit existing agents to replace high-cost reasoning pipelines with optimized R1 distilled local weights (e.g. 8B, 14B, 32B).",
        "Deploy vLLM containers with FP8 quantization to match standard server GPU allocations.",
        "Implement guardrails to filter empty loops resulting from extreme reasoning sequence generations."
      ]
    };
  }

  if (norm.includes('sora') || norm.includes('video') || norm.includes('veo')) {
    return {
      topic: "AI Generative Video Pipelines & Diffusion Transformers (DiT)",
      executiveSummary: "Generative video architectures are transitioning from research prototypes to production-ready agent workflows. Multi-modal transformers are being integrated to handle real-world physics consistency.",
      hasOfficialRelease: true,
      sections: [
        {
          title: "Diffusion Transformer (DiT) Scaling Laws",
          category: "Research",
          summary: "New academic analysis indicates that temporal attention modules scale predictably. However, severe physical laws (e.g., fluid dynamics, glass breaking) are still under-represented in pure spatial-temporal patches.",
          bulletPoints: [
            "Research outlines split-attention mechanisms for high horizontal fluid simulations.",
            "Compute-to-quality ratio shows exponential improvement when training on synthetically augmented captions.",
            "Researchers present temporal compression models reducing frame VRAM load by 4x."
          ]
        },
        {
          title: "Production Pipelines for Autonomous Creative Agents",
          category: "GitHub",
          summary: "GitHub projects are popping up to chain GenAI image models into temporal consistency engines. Continuous prompt generation is monitored via dedicated state machines.",
          bulletPoints: [
            "New ComfyUI workflows allow automatic storyboard-to-video stitching utilizing lightweight Lora weight blends.",
            "Automated video editing agents with audio generation pipelines see a spike in developer contributions.",
            "Folk open-source projects aim to compress Latent Diffusion modules to work with under 16GB of video memory."
          ]
        }
      ],
      timelineEvents: [
        { time: "02:00 UTC", source: "GitHub", badge: "Release", text: "Stitching pipeline for spatial temporal video consistency published." },
        { time: "09:30 UTC", source: "Arxiv", badge: "Paper", text: "Diffusion Transformer (DiT) scaling with physics constraints analyzed." },
        { time: "16:20 UTC", source: "Hacker News", badge: "Hot", text: "Show HN: Automated B-Roll Generator for developer podcasts achieves top spot." }
      ],
      modelStats: [
        { label: "Core Model", value: "Diffusion Transformer (DiT)" },
        { label: "Max Resolution", value: "1080p Full Frame" },
        { label: "Temporal Span", value: "Up to 60s clips" },
        { label: "GPU Dependency", value: "High VRAM clusters heavily favored" }
      ],
      nextActionsForDevs: [
        "Study the spatial-temporal autoencoder blocks to understand how videos are encoded into latent space.",
        "Adopt ComfyUI or Diffusers-based APIs to inject consistent agentic camera movements.",
        "Combine short-clip models with semantic frame-to-frame stabilization tools."
      ]
    };
  }

  // General AI Ecosystem Report (Fallback)
  return {
    topic: topic || "AI Agent Ecosystem & LLM Breakthroughs",
    executiveSummary: `Continuous monitoring of '${topic || "AI Agent Ecosystem"}' over the last 24 hours has caught major milestones. Multi-agent framework structures like LangGraph, AutoGen, and CrewAI are evolving quickly towards decentralized execution, with memory-driven vector retrieval as the central anchor.`,
    hasOfficialRelease: false,
    sections: [
      {
        title: `Real-time intelligence on ${topic || 'AI Agents'}`,
        category: "News",
        summary: `Our crawlers monitored major discussions, paper publications, and code updates regarding '${topic || 'AI Agentic Designs'}'. Developers are emphasizing agent-to-tool routing loops.`,
        bulletPoints: [
          `Rapid architecture adjustments are made to streamline prompt execution and tool validation loops.`,
          `GitHub activities demonstrate heavy shifts toward rust-based agent bindings for extreme concurrency.`,
          `A prominent research forum discussed native agentic alignment in model weights instead of pure system prompt reinforcement.`
        ]
      },
      {
        title: "Memory System Breakthroughs",
        category: "Research",
        summary: "Autonomous agents require complex historical recall paths. Standard RAG databases are being accompanied by persistent state graphs that partition working memory from historic context stores.",
        bulletPoints: [
          "Graph-RAG databases gain popularity by automatically linking scraped events with central semantic knowledge nodes.",
          "Long-context windows (1M+ tokens) are utilized under hybrid configurations to inspect historical conversational memory.",
          "Lightweight KV-cache compression algorithms enable back-and-forth communication at a fraction of the cost."
        ]
      }
    ],
    timelineEvents: [
      { time: "01:10 UTC", source: "Reddit", badge: "Trend", text: "r/MachineLearning discusses the effectiveness of large context vs database retrieval." },
      { time: "08:40 UTC", source: "GitHub", badge: "Update", text: "LangGraph introduces native state persistence adapters for distributed databases." },
      { time: "15:15 UTC", source: "Hacker News", badge: "Discussion", text: "Thread on 'My autonomous agent discovered a cost loop' highlights agent safety constraints." },
      { time: "19:50 UTC", source: "Arxiv", badge: "Paper", text: "Systematic investigation of tool-calling latency optimizations released." }
    ],
    modelStats: [
      { label: "Search Grounding", value: "Fully Activated" },
      { label: "Primary Scrapes", value: "18 distinct AI domains" },
      { label: "RAG Dimension", value: "1536-dim vector projection" },
      { label: "Simulated Sources", value: "Twitter, Arxiv, GitHub, HN" }
    ],
    nextActionsForDevs: [
      "Prioritize state stability inside agent nodes; never let agents loop continuously without human feedback hooks.",
      "Incorporate vector embeddings to dynamically categorize large quantities of scraped updates before sending to LLM modules.",
      "Set strict rate limits on agent-to-tool connections to avoid sudden budget drainage."
    ]
  };
}

// REST route to run intelligence-gathering agent simulation
app.post('/api/run-agent', async (req, res) => {
  const { topic } = req.body;
  const client = getGeminiClient();

  if (!client) {
    // Elegant fallback to mock simulator data
    console.log(`[Simulator Active] Generating offline interactive telemetry data for "${topic}"`);
    // Delay slightly to simulate a real agent network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    return res.json({
      success: true,
      simulated: true,
      report: createSimulatedReport(topic || "AI Ecosystem")
    });
  }

  try {
    console.log(`[Gemini Active] Running live intelligence synthesis with search grounding for topic: "${topic}"`);
    
    const prompt = `
      You are an expert Autonomous Intelligence Gathering Agent.
      Analyze the AI topic: "${topic || "AI Agent Ecosystem & LLM Breakthroughs"}".
      Gather recent, realistic developer intelligence, documentation trends, Github repo hot updates, online forum sentiments (e.g. HN, Reddit), and research preprints (e.g. Arxiv).
      Provide a highly realistic, production-grade intelligence report detailing activities within the last 24 hours.

      Return a response adhering STRICTLY to the requested JSON structure. No markdown formatting wrap except the JSON itself.
    `;

    const response = await aiClient!.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topic: { type: Type.STRING },
            executiveSummary: { type: Type.STRING, description: "A detailed 24h summary with high technical depth. Avoid fluff." },
            hasOfficialRelease: { type: Type.BOOLEAN, description: "Has there been an official release on this topic recently" },
            sections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  category: { type: Type.STRING, description: "Must be one of: GitHub, Paper, Social, Releases, News, Tech" },
                  summary: { type: Type.STRING },
                  bulletPoints: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                },
                required: ["title", "category", "summary", "bulletPoints"]
              }
            },
            timelineEvents: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  time: { type: Type.STRING, description: "Realistic timestamp e.g. '04:15 UTC'" },
                  source: { type: Type.STRING, description: "e.g. Hacker News, GitHub, Arxiv, Twitter" },
                  badge: { type: Type.STRING, description: "e.g. HOT, Research, Trending, Release" },
                  text: { type: Type.STRING }
                },
                required: ["time", "source", "badge", "text"]
              }
            },
            modelStats: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  value: { type: Type.STRING }
                },
                required: ["label", "value"]
              }
            },
            nextActionsForDevs: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 concrete, actionable technical next-steps for an AI Engineer."
            }
          },
          required: ["topic", "executiveSummary", "hasOfficialRelease", "sections", "timelineEvents", "modelStats", "nextActionsForDevs"]
        },
        tools: [{ googleSearch: {} }],
        toolConfig: { includeServerSideToolInvocations: true }
      }
    });

    const reportText = response.text;
    if (!reportText) {
      throw new Error("Empty response received from Gemini API");
    }

    const parsedReport = JSON.parse(reportText);
    res.json({
      success: true,
      simulated: false,
      report: parsedReport
    });

  } catch (error: any) {
    console.error("Gemini API Error details:", error);
    // Graceful fallback to simulated report to support zero disruption
    res.json({
      success: true,
      simulated: true,
      errorMsg: error?.message || "Transient communication failure. Initializing local backup agent.",
      report: createSimulatedReport(topic || "AI Ecosystem")
    });
  }
});

// Vite server integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[AetherAgent Server] Operational on http://localhost:${PORT}`);
  });
}

startServer();
