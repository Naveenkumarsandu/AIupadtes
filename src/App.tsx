import { useState, useEffect } from 'react';
import { 
  Brain, 
  Cpu, 
  Layers, 
  Search, 
  Terminal, 
  BookOpen, 
  Map, 
  Github, 
  Code, 
  ShieldAlert, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle, 
  TrendingUp, 
  Copy, 
  Check, 
  RotateCw, 
  Database,
  Info,
  Server,
  Play,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { ROADMAP, STUDY_REPOS, PORTFOLIO_IDEAS, MANUAL_SECTIONS } from './blueprintData';
import { IntelligenceReport } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'agent' | 'blueprint' | 'roadmap' | 'repos'>('agent');
  const [activeManualSection, setActiveManualSection] = useState<string>('skills-stack');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Agent Simulator/Execution State
  const [searchTopic, setSearchTopic] = useState<string>('DeepSeek R1 & MoE Optimization');
  const [customTopic, setCustomTopic] = useState<string>('');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [report, setReport] = useState<IntelligenceReport | null>(null);
  const [isLiveGemini, setIsLiveGemini] = useState<boolean>(false);
  const [serviceStatus, setServiceStatus] = useState<{ status: string; apiConfigured: boolean } | null>(null);

  // Preset topics for quick trigger
  const PRESET_TOPICS = [
    'DeepSeek R1 & MoE Optimization',
    'AI Video Generative Pipelines (Sora/Veo)',
    'LangGraph & Cyclic State Workflows',
    'RAG Embeddings & Qdrant Search Filters',
    'AI Agent Prompt Injection Guards'
  ];

  // Check backend server status on mount
  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        setServiceStatus(data);
        if (data.apiConfigured) {
          setIsLiveGemini(true);
        }
      })
      .catch(err => {
        console.error("Backend health probe failed:", err);
      });

    // Run first baseline simulation
    triggerAgentExecution('DeepSeek R1 & MoE Optimization');
  }, []);

  const triggerAgentExecution = async (topicString: string) => {
    const selectedTopic = topicString || "AI Agents";
    setIsExecuting(true);
    setReport(null);
    setExecutionLogs([]);

    const logMessages = [
      `[TRANSIT] Spawning agent container node: [Aether-Worker-04] on cluster`,
      `[CRAWLER-01] Reaching out to official OpenAI release announcements...`,
      `[CRAWLER-02] Scraping Hacker News API and filtering top 100 developer threads...`,
      `[CRAWLER-03] Parsing Arxiv computer science papers matched on "${selectedTopic}"...`,
      `[CRAWLER-04] Reading Hugging Face trending community spaces and repository updates...`,
      `[CLEANER-NODE] Removing web headers, formatting raw source data into markdown buffers...`,
      `[SEMANTIC-MEMORY] Vectorizing clean text arrays...`,
      `[VECTOR-INDEX] Pushing embedding representations to local Qdrant instance. Dimensions: 1536`,
      `[METADATA-FILTER] Restricting context scope: [timestamp > 24 hours ago]`,
      `[LLM-SYNTHESIZER] Submitting 8000 context tokens to Gemini 3.5 Flash server-side...`,
      `[SEARCH-GROUNDING] Correlating dynamic web references to enforce maximum accuracy...`,
      `[SECURITY-SHIELD] Analyzing draft response for semantic hallucination and alignment anomalies...`,
      `[REPORT-ARCHITECT] Formatting compliant JSON payload structure...`,
      `[AETHER-MAIN] Report synthesized successfully. Dispatching notification queue.`
    ];

    // Stream logs progressively to create an immersive real-time agent execution visualizer
    for (let i = 0; i < logMessages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, i === 0 ? 100 : 180));
      setExecutionLogs(prev => [...prev, logMessages[i]]);
    }

    try {
      const response = await fetch('/api/run-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: selectedTopic })
      });
      const data = await response.json();
      if (data.success) {
        setReport(data.report);
        setIsLiveGemini(!data.simulated);
      } else {
        throw new Error(data.errorMsg || "Agent failed to return structured report");
      }
    } catch (error: any) {
      console.error(error);
      setExecutionLogs(prev => [...prev, `[ERROR-NODE] Fail-safe active: Reverting to localized agent telemetry system.`]);
    } finally {
      setIsExecuting(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Icon selector maps standard category strings to interactive visual badges
  const getCategoryBadgeColor = (category: string) => {
    const norm = category.toLowerCase();
    if (norm.includes('github') || norm.includes('code')) return 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60';
    if (norm.includes('paper') || norm.includes('research')) return 'bg-purple-950/40 text-purple-400 border-purple-800/60';
    if (norm.includes('social') || norm.includes('discussion')) return 'bg-cyan-950/40 text-cyan-400 border-cyan-800/60';
    if (norm.includes('release') || norm.includes('launch')) return 'bg-amber-950/40 text-amber-400 border-amber-800/60';
    return 'bg-blue-950/40 text-blue-400 border-blue-800/60';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased text-[15px] selection:bg-indigo-500/35 selection:text-white" id="root-layout">
      
      {/* Upper Status strip & Top Header */}
      <header className="border-b border-indigo-950/80 bg-slate-900/90 backdrop-blur-md sticky top-0 z-30" id="main-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo Brand Brand */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl shadow-lg shadow-indigo-500/15 ring-1 ring-white/10">
              <Brain className="w-6 h-6 text-slate-950 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-medium tracking-tight text-xl bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">AetherAgent</span>
                <span className="text-[10px] bg-indigo-950 ring-1 ring-indigo-500/30 text-indigo-300 font-mono tracking-widest px-1.5 py-0.5 rounded uppercase">v2.1</span>
              </div>
              <p className="text-xs text-slate-400">Autonomous Intelligence Hub & Senior Architect Agent</p>
            </div>
          </div>

          {/* Connected Hub Health Telemetry Bar */}
          <div className="flex items-center flex-wrap gap-3 text-xs font-mono bg-slate-950/60 p-2 rounded-lg border border-indigo-950/50">
            <div className="flex items-center gap-1.5 px-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-400">Engine State:</span>
              <span className="text-emerald-400 font-semibold uppercase">Operational</span>
            </div>
            
            <div className="h-4 w-px bg-indigo-950/80 hidden sm:block"></div>

            <div className="flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-slate-400">Sync:</span>
              {isLiveGemini ? (
                <span className="text-cyan-400 flex items-center gap-1">
                  Gemini API Live Grounding <Sparkles className="w-2.5 h-2.5 animate-pulse" />
                </span>
              ) : (
                <span className="text-amber-400 flex items-center gap-0.5">
                  Static Simulation Mode
                </span>
              )}
            </div>

            <div className="h-4 w-px bg-indigo-950/80 hidden sm:block"></div>

            <div className="text-slate-500">Time: <span className="text-indigo-300">2026-05-25</span></div>
          </div>

        </div>
      </header>

      {/* Hero Accent Banner */}
      <div className="relative py-8 bg-slate-900 border-b border-indigo-950/40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(79,70,229,0.12),transparent_40%)]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_80%_10%,rgba(6,182,212,0.08),transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <span className="text-xs tracking-widest font-mono text-cyan-400 uppercase font-semibold bg-cyan-950/50 px-2 py-0.5 border border-cyan-900/30 rounded inline-block mb-3">AI Intelligence Gathering Framework</span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
              Assemble Dynamic Agents for Continuous System Discovery
            </h1>
            <p className="text-slate-300 text-sm sm:text-[15px] leading-relaxed">
              Design, test, and deploy multi-agent orchestrator systems tasked with scanning online resources, research preprints, discussions, and dynamic documentation in real-time. Toggle blueprint schemas below.
            </p>
          </div>

          {/* Sub-Header Portal Navigation */}
          <div className="flex flex-wrap gap-2 mt-8 border-b border-indigo-950/40 pb-px" id="navigation-tabs">
            <button
              onClick={() => setActiveTab('agent')}
              className={`flex items-center gap-2 px-5 py-3 border-b-2 font-display text-sm font-medium transition-all ${
                activeTab === 'agent' 
                  ? 'border-indigo-500 text-white bg-indigo-500/5' 
                  : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              Agent Console & Live report
            </button>
            <button
              onClick={() => setActiveTab('blueprint')}
              className={`flex items-center gap-2 px-5 py-3 border-b-2 font-display text-sm font-medium transition-all ${
                activeTab === 'blueprint' 
                  ? 'border-indigo-500 text-white bg-indigo-500/5' 
                  : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Layers className="w-4 h-4 text-indigo-400" />
              System Blueprints & Code (Manual)
            </button>
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`flex items-center gap-2 px-5 py-3 border-b-2 font-display text-sm font-medium transition-all ${
                activeTab === 'roadmap' 
                  ? 'border-indigo-500 text-white bg-indigo-500/5' 
                  : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Map className="w-4 h-4 text-purple-400" />
              12-Week Learning Roadmap
            </button>
            <button
              onClick={() => setActiveTab('repos')}
              className={`flex items-center gap-2 px-5 py-3 border-b-2 font-display text-sm font-medium transition-all ${
                activeTab === 'repos' 
                  ? 'border-indigo-500 text-white bg-indigo-500/5' 
                  : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Github className="w-4 h-4 text-emerald-400" />
              Recommended Repos & Portfolios
            </button>
          </div>

        </div>
      </div>

      {/* Main Core View Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="main-content">
        
        {/* TAB 1: OPERATOR AGENT CONSOLE */}
        {activeTab === 'agent' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="agent-tab-view">
            
            {/* Left Configuration Pane (Column Span 5) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-slate-900 border border-indigo-950/80 rounded-xl p-5 shadow-xl relative" id="agent-config-card">
                <div className="absolute top-4 right-4 text-slate-500">
                  <Cpu className="w-5 h-5 text-indigo-400 animate-pulse" />
                </div>
                
                <h2 className="font-display font-medium text-lg text-white mb-2 flex items-center gap-2">
                  <span>Intelligence Scope</span>
                </h2>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Define the core topic of query. The agent runs deep search pipelines against news platforms, developer forum timelines, and preprints.
                </p>

                {/* Scope Input */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">Preset Scenarios</label>
                    <div className="flex flex-col gap-1.5">
                      {PRESET_TOPICS.map((topicItem) => (
                        <button
                          key={topicItem}
                          disabled={isExecuting}
                          onClick={() => {
                            setSearchTopic(topicItem);
                            setCustomTopic('');
                            triggerAgentExecution(topicItem);
                          }}
                          className={`w-full text-left text-xs px-3.5 py-2.5 rounded-lg border transition-all flex items-center justify-between ${
                            searchTopic === topicItem && !customTopic
                              ? 'bg-indigo-950/70 border-indigo-500/80 text-white font-medium ring-1 ring-indigo-500/30'
                              : 'bg-slate-950/50 border-indigo-950/50 text-slate-300 hover:bg-slate-950 hover:text-white'
                          }`}
                        >
                          <span className="truncate">{topicItem}</span>
                          <span className="text-[10px] font-mono text-slate-500">Active</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-indigo-950/60 my-4 pt-4"></div>

                  {/* Custom Scope input */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">Custom Deep Search Keyword</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          disabled={isExecuting}
                          placeholder="e.g. HuggingFace SmolAgents, Groq FPGA..."
                          value={customTopic}
                          onChange={(e) => setCustomTopic(e.target.value)}
                          className="w-full bg-slate-950 select-text text-xs placeholder:text-slate-600 border border-indigo-950 rounded-lg pl-10 pr-3 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                      <button
                        onClick={() => {
                          if (customTopic.trim()) {
                            setSearchTopic(customTopic);
                            triggerAgentExecution(customTopic);
                          }
                        }}
                        disabled={isExecuting || !customTopic.trim()}
                        className="bg-indigo-600 hover:bg-indigo-500 cursor-pointer disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white text-xs font-medium px-4 py-2.5 rounded-lg transition-all"
                      >
                        Launch
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Log telemetry terminal stack */}
              <div className="bg-slate-950 border border-indigo-950 rounded-xl p-5 shadow-xl relative overflow-hidden font-mono" id="agent-terminal-card">
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest">Active Shell</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 border-b border-indigo-900/40 pb-3 mb-4">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>AGENT PIPELINE EXECUTION MONITOR</span>
                </div>

                {/* Term container */}
                <div className="space-y-2 h-[260px] overflow-y-auto text-xs scrollbar-thin">
                  {executionLogs.map((log, index) => (
                    <div key={index} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="text-[10px] text-slate-600 shrink-0">[{new Date().toLocaleTimeString()}]</span>
                      <span className={
                        log.includes('[ERROR') 
                          ? 'text-red-400 font-bold' 
                          : log.includes('[AETHER-MAIN]') 
                          ? 'text-emerald-400 border-l-2 border-emerald-500 pl-1.5' 
                          : log.includes('[LLM-SYNTHESIZER]')
                          ? 'text-cyan-400'
                          : 'text-slate-300'
                      }>
                        {log}
                      </span>
                    </div>
                  ))}
                  
                  {isExecuting && (
                    <div className="flex items-center gap-2 text-indigo-400 pt-2 text-[11px] animate-pulse">
                      <RotateCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Synthesizing external sources. Please wait standard computation lag...</span>
                    </div>
                  )}

                  {!isExecuting && executionLogs.length === 0 && (
                    <div className="text-slate-500 flex flex-col items-center justify-center h-full py-8 text-center font-sans">
                      <Terminal className="w-8 h-8 text-indigo-950 mb-2" />
                      <p className="text-xs">Select any topic above to trigger real-time AI memory synthesis.</p>
                    </div>
                  )}
                </div>

                <div className="border-t border-indigo-950/60 mt-4 pt-3 flex justify-between items-center text-[10px] text-slate-500">
                  <span>Output size: ~840 tokens</span>
                  <span>Port: Local Proxy (3000)</span>
                </div>
              </div>

              {/* Secret API Key Setup Guidance banner */}
              <div className="bg-slate-900/60 border border-indigo-950/70 rounded-xl p-4 flex gap-3 text-xs leading-relaxed text-slate-400">
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium">Want real-time search grounding live updates?</span> Add your <code className="bg-slate-950 px-1 py-0.5 rounded text-indigo-300">GEMINI_API_KEY</code> secrets configuration inside the left <span className="text-indigo-400 font-semibold">Secrets Control Settings</span> within Google AI Studio. This automatically activates server-side real-time Google Search Grounding pipelines!
                </div>
              </div>

            </div>

            {/* Right Synthesis Report Pane (Column Span 7) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Report Canvas */}
              <div className="bg-slate-900 border border-indigo-950 rounded-xl overflow-hidden shadow-2xl relative min-h-[500px]" id="synthesis-report-container">
                
                {/* Header state tracking */}
                <div className="px-6 py-4 bg-slate-900 border-b border-indigo-950/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <h3 className="font-display font-medium text-white text-md">AI Intelligence Synthesized Report</h3>
                  </div>

                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    isExecuting 
                      ? 'bg-yellow-950/40 text-yellow-400 border-yellow-800' 
                      : report?.topic 
                      ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800' 
                      : 'bg-slate-950 text-slate-500 border-slate-800'
                  }`}>
                    {isExecuting ? "Processing Flow" : report ? "Active Telemetry" : "Idle State"}
                  </span>
                </div>

                {isExecuting ? (
                  <div className="flex flex-col items-center justify-center p-12 text-center h-[500px]">
                    <div className="inline-flex p-4 rounded-full bg-indigo-950/50 mb-4 animate-spin border-t-2 border-indigo-500">
                      <Brain className="w-8 h-8 text-indigo-400" />
                    </div>
                    <h4 className="text-white font-display font-medium text-lg mb-1 leading-snug">Agent is Crawling AI Ecosystem...</h4>
                    <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
                      Our system is reading Arxiv preprints, scraping trending Github scripts, parsing Hacker News APIs, and summarizing insights in the last 24 hours.
                    </p>
                  </div>
                ) : report ? (
                  <div className="p-6 space-y-6" id="loaded-agent-report">
                    
                    {/* General Summary Block */}
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="text-xs font-mono uppercase tracking-wider text-indigo-400">Target Focus</span>
                        <span className="text-slate-500 text-xs font-mono">Discovered within last 24h</span>
                      </div>
                      <h4 className="font-display text-xl font-bold text-white mb-3 tracking-tight">{report.topic}</h4>
                      <div className="p-4 bg-slate-950 border border-indigo-950/60 rounded-xl text-slate-300 text-xs leading-relaxed space-y-2">
                        <p className="leading-relaxed">{report.executiveSummary}</p>
                      </div>
                    </div>

                    {/* Stats Telemetry bar items */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/75 p-3.5 rounded-xl border border-indigo-950/60">
                      {report.modelStats.map((stat, i) => (
                        <div key={i} className="space-y-0.5">
                          <span className="block text-[10px] text-slate-500 font-mono uppercase tracking-wider">{stat.label}</span>
                          <span className="block text-xs font-medium text-white truncate">{stat.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Category breakdowns */}
                    <div className="space-y-4">
                      <h5 className="text-xs font-mono uppercase tracking-wider text-indigo-400 border-b border-indigo-950 pb-2 flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5" /> Core Investigation & Knowledge Branches
                      </h5>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {report.sections.map((section, idx) => (
                          <div key={idx} className="bg-slate-950/50 rounded-xl border border-indigo-950 p-4 space-y-3 shadow-sm hover:border-indigo-900 transition-all">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-display text-xs font-bold text-white truncate">{section.title}</span>
                              <span className={`text-[9px] px-2 py-0.5 text-[9px] font-mono rounded border uppercase shrink-0 ${getCategoryBadgeColor(section.category)}`}>
                                {section.category}
                              </span>
                            </div>
                            <p className="text-slate-400 text-xs leading-relaxed">{section.summary}</p>
                            <ul className="text-slate-300 text-xs space-y-1.5 pl-3 list-disc">
                              {section.bulletPoints.map((bullet, bidx) => (
                                <li key={bidx} className="leading-relaxed">{bullet}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Timeline Tracker map */}
                    <div className="space-y-3">
                      <h5 className="text-xs font-mono uppercase tracking-wider text-indigo-400 border-b border-indigo-950 pb-2 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" /> Chronological Event Feed (Past 24 Hours)
                      </h5>
                      <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                        {report.timelineEvents.map((event, eidx) => (
                          <div key={eidx} className="flex gap-3 text-xs leading-relaxed bg-slate-950/40 p-2.5 rounded-lg border border-indigo-950/30 hover:border-indigo-950/80 transition-all">
                            <span className="text-indigo-400 font-mono font-medium shrink-0 pt-0.5">{event.time}</span>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] text-slate-500 font-mono font-semibold">{event.source}</span>
                                <span className="px-1.5 py-0.2 select-none text-[8px] tracking-wider uppercase font-mono font-bold text-cyan-300 bg-cyan-950/60 rounded">
                                  {event.badge}
                                </span>
                              </div>
                              <p className="text-slate-300">{event.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Developer Action Items */}
                    <div className="border-t border-indigo-950/60 pt-4 space-y-3 bg-indigo-950/10 p-4 rounded-xl border border-indigo-950">
                      <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-500" /> Architectural & Dev Next-Actions
                      </h5>
                      <div className="space-y-2">
                        {report.nextActionsForDevs.map((action, aidx) => (
                          <div key={aidx} className="flex gap-2.5 text-xs text-slate-300 leading-relaxed align-top">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-12 text-center h-[500px]">
                    <Terminal className="w-12 h-12 text-slate-800 mb-3" />
                    <h4 className="text-slate-400 font-display font-medium text-sm">No report active</h4>
                    <p className="text-slate-600 text-xs">Choose a dynamic telemetry scope from the left side panel to deploy the crawling agent system.</p>
                  </div>
                )}

              </div>

            </div>

          </div>
        )}


        {/* TAB 2: SYSTEM BLUEPRINTS (MANUAL) */}
        {activeTab === 'blueprint' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="blueprint-tab-view">
            
            {/* Left side Nav Selection (Column Span 4) */}
            <div className="lg:col-span-4 space-y-1.5">
              <span className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2 pl-2">Operational Chapters</span>
              {MANUAL_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveManualSection(section.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col justify-start text-xs ${
                    activeManualSection === section.id
                      ? 'bg-gradient-to-r from-indigo-950/70 to-slate-900 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-900/60 border-indigo-950/40 text-slate-400 hover:text-white hover:bg-slate-900 hover:border-indigo-900/40'
                  }`}
                >
                  <span className="font-display font-bold text-sm tracking-tight text-white mb-1">
                    {section.title}
                  </span>
                  <span className="line-clamp-2 text-slate-400">{section.tagline}</span>
                </button>
              ))}

              <div className="mt-8 p-4 bg-slate-950 rounded-xl border border-indigo-950/50">
                <span className="block text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">Core Architecture Rules</span>
                <p className="text-xs text-slate-400 leading-relaxed space-y-2">
                  Avoid letting web scraper components execute inline on server UI threads. Always hand over tasks asynchronously using specialized Redis lists.
                </p>
              </div>
            </div>

            {/* Right side Section Detail Canvas (Column Span 8) */}
            <div className="lg:col-span-8 space-y-6">
              
              {(() => {
                const section = MANUAL_SECTIONS.find(s => s.id === activeManualSection);
                if (!section) return null;

                return (
                  <div className="bg-slate-900 border border-indigo-950/80 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
                    
                    <div className="flex items-center justify-between border-b border-indigo-950 pb-4">
                      <div>
                        <h3 className="font-display text-xl font-bold text-white">{section.title}</h3>
                        <p className="text-xs text-indigo-400 font-mono mt-1">{section.tagline}</p>
                      </div>

                      {/* Code copy quick utility */}
                      <button
                        onClick={() => copyToClipboard(section.markdown, section.id || '')}
                        className="p-2 rounded bg-slate-950 hover:bg-slate-800 border border-indigo-950 text-slate-400 hover:text-white transition-all text-xs flex items-center gap-1"
                      >
                        {copiedText === section.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-mono text-[10px]">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="font-mono text-[10px]">Copy Lesson</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Markdown rendering simulation (beautiful, clean styling) */}
                    <article className="prose prose-invert prose-xs max-w-none text-slate-300 leading-relaxed space-y-4">
                      
                      {section.markdown.split('\n\n').map((paragraph, index) => {
                        
                        // Render standard inline code blocks
                        if (paragraph.startsWith('```')) {
                          const cleanedCode = paragraph.replace(/```[a-z]*/g, '').trim();
                          return (
                            <div key={index} className="relative bg-slate-950 rounded-xl border border-indigo-950/80 overflow-hidden font-mono mt-4 shadow-inner">
                              <div className="bg-slate-900/80 px-4 py-2 border-b border-indigo-950/80 flex justify-between items-center text-[10px] text-slate-500">
                                <span>PRODUCTION REFERENCE MODULE</span>
                                <button 
                                  onClick={() => copyToClipboard(cleanedCode, `code-p-${index}`)}
                                  className="hover:text-white flex items-center gap-1"
                                >
                                  {copiedText === `code-p-${index}` ? <Check className="w-2.5 h-2.5 text-emerald-400" /> : <Copy className="w-2.5 h-2.5" />}
                                  <span>{copiedText === `code-p-${index}` ? "Copied" : "Copy Source"}</span>
                                </button>
                              </div>
                              <pre className="p-4 text-xs overflow-x-auto text-cyan-300 scrollbar-thin max-h-[380px] leading-relaxed">
                                <code>{cleanedCode}</code>
                              </pre>
                            </div>
                          );
                        }

                        if (paragraph.startsWith('### ')) {
                          return <h4 key={index} className="font-display font-semibold text-lg text-white mt-6 mb-2 border-b border-indigo-950 pb-1">{paragraph.substring(4)}</h4>;
                        }

                        if (paragraph.startsWith('#### ')) {
                          return <h5 key={index} className="font-display font-medium text-sm text-cyan-400 mt-4 mb-2">{paragraph.substring(5)}</h5>;
                        }

                        if (paragraph.startsWith('- ')) {
                          return (
                            <ul key={index} className="space-y-1.5 pl-4 list-disc text-slate-300 text-xs">
                              {paragraph.split('\n').map((li, lIdx) => (
                                <li key={lIdx} className="leading-relaxed">
                                  {li.substring(2).replace(/\*\*(.*?)\*\*/g, (_, m) => `<strong>${m}</strong>`)}
                                </li>
                              ))}
                            </ul>
                          );
                        }

                        // Diagram mockup visualizer
                        if (paragraph.includes('----->') || paragraph.includes('[ Scraper Node ]')) {
                          return (
                            <div key={index} className="bg-slate-950 p-4 rounded-xl border border-indigo-950/80 font-mono text-center text-xs text-indigo-300 overflow-x-auto shadow-inner whitespace-pre leading-relaxed">
                              {paragraph}
                            </div>
                          );
                        }

                        return <p key={index} className="text-xs sm:text-sm text-slate-300" dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/`(.*?)`/g, '<code class="bg-indigo-950 text-indigo-300 px-1 py-0.5 rounded font-mono text-xs">$1</code>') }} />;
                      })}

                    </article>

                  </div>
                );
              })()}

            </div>

          </div>
        )}


        {/* TAB 3: 12-WEEK ROADMAP */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6" id="roadmap-tab-view">
            
            <div className="bg-slate-900 border border-indigo-950/80 p-6 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-full bg-[radial-gradient(circle_at_100%_50%,rgba(139,92,246,0.08),transparent_50%)]"></div>
              <h3 className="font-display font-bold text-lg text-white mb-2">Architect Skill Ascension Path</h3>
              <p className="text-slate-400 text-xs max-w-3xl leading-relaxed">
                Achieve high-tier competence building decentralized AI agents. Go from basic API prompt stitching to advanced, secure distributed multi-agent state containers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ROADMAP.map((step, idx) => (
                <div key={idx} className="bg-slate-900 border border-indigo-950/70 rounded-xl p-5 hover:border-indigo-900/60 transition-all flex flex-col justify-between space-y-4">
                  
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-wider font-bold text-cyan-400 uppercase bg-cyan-950/40 border border-cyan-900/40 px-2 py-0.5 rounded">
                        {step.phase}
                      </span>
                      <span className="text-xs font-mono text-slate-500 font-semibold">{step.timeframe}</span>
                    </div>

                    <h4 className="font-display font-bold text-white text-[15px]">{step.title}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{step.focus}</p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-indigo-950/60">
                    <div>
                      <span className="block text-[10px] text-slate-500 font-mono tracking-widest uppercase mb-1">Core Mastery Blocks</span>
                      <div className="flex flex-wrap gap-1">
                        {step.skills.map((skill, si) => (
                          <span key={si} className="text-[10px] bg-slate-950 text-indigo-300 font-mono px-2 py-0.5 rounded border border-indigo-950/50">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="block text-[10px] text-slate-500 font-mono tracking-widest uppercase mb-1">Capped Practice Assignment</span>
                      <div className="space-y-1">
                        {step.projects.map((proj, pi) => (
                          <div key={pi} className="text-xs text-slate-300 flex items-start gap-1.5 leading-relaxed">
                            <span className="text-indigo-400 select-none">↳</span>
                            <span>{proj}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            <div className="bg-slate-950/60 border border-indigo-950 rounded-xl p-5 text-center max-w-xl mx-auto space-y-2.5">
              <span className="text-cyan-400 font-mono text-xs block">PRO LEARNING TIP</span>
              <p className="text-slate-300 text-xs leading-relaxed">
                Spend 70% of your dedicated agent studies digging directly into the actual code repositories of open-source frameworks listed in the Repository Explorer tab. Reading the state management file inside LangGraph teaches more than reading general tutorials!
              </p>
            </div>

          </div>
        )}


        {/* TAB 4: REPOS & PORTFOLIO IDEAS */}
        {activeTab === 'repos' && (
          <div className="space-y-8" id="repos-tab-view">
            
            {/* Open Source study section */}
            <div className="space-y-4">
              <div className="text-left">
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-400">Essential Source Audits</span>
                <h3 className="font-display font-bold text-xl text-white">Recommended GitHub Libraries</h3>
                <p className="text-slate-400 text-xs leading-relaxed max-w-2xl mt-1">
                  Read these high-integrity, production source files to understand advanced agent routing structures, queue serialization, and prompt execution filters.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {STUDY_REPOS.map((repo, idx) => (
                  <div key={idx} className="bg-slate-900 border border-indigo-950/70 p-5 rounded-xl hover:border-indigo-900/60 transition-all flex flex-col justify-between space-y-4">
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-white font-semibold text-xs">
                          <Github className="w-4 h-4 text-slate-300" />
                          <span className="font-mono text-slate-200">{repo.name}</span>
                        </div>
                        <span className="text-[10px] text-yellow-500 font-mono font-bold">★ {repo.stars}</span>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed">{repo.description}</p>
                    </div>

                    <div className="border-t border-indigo-950/80 pt-3 space-y-2">
                      <div>
                        <span className="block text-[9px] text-slate-500 font-mono uppercase tracking-wider">Crucial Source Files to Read</span>
                        <code className="text-[10px] font-mono text-cyan-300 block truncate bg-slate-950 p-1 rounded border border-indigo-950/50 mt-1">{repo.keyFilesToStudy}</code>
                      </div>
                      
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="italic block truncate pr-2 text-indigo-400">{repo.architecturalVibe}</span>
                        <a 
                          href={repo.url} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-white hover:text-indigo-400 font-medium inline-flex items-center gap-1 shrink-0"
                        >
                          Source <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio Projects vault */}
            <div className="space-y-4 pt-4 border-t border-indigo-950/40">
              <div className="text-left">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">Get Hired as AI/Automation Engineer</span>
                <h3 className="font-display font-semibold text-xl text-white">Advanced Portfolio Blueprints</h3>
                <p className="text-slate-400 text-xs leading-relaxed max-w-2xl mt-1">
                  Forget generic todo list wrappers. Build these high-complexity production agent systems to showcase true mastery during senior corporate reviews.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PORTFOLIO_IDEAS.map((proj, pIdx) => (
                  <div key={pIdx} className="bg-slate-900 border border-indigo-950/60 p-5 rounded-xl flex flex-col justify-between space-y-4 shadow-lg">
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border ${
                          proj.difficulty === 'Enterprise' 
                            ? 'bg-red-950/40 text-red-400 border-red-900/60' 
                            : proj.difficulty === 'Advanced'
                            ? 'bg-purple-950/40 text-purple-400 border-purple-900/60'
                            : 'bg-indigo-950/40 text-indigo-400 border-indigo-900/60'
                        }`}>
                          {proj.difficulty} Level
                        </span>
                      </div>

                      <h4 className="font-display font-medium text-white text-[14px] leading-snug">{proj.title}</h4>
                      <p className="text-slate-400 text-xs leading-relaxed">{proj.description}</p>
                    </div>

                    <div className="space-y-2.5 pt-3 border-t border-indigo-950/60">
                      <div>
                        <span className="block text-[9px] text-slate-500 font-mono uppercase tracking-wider">High Complexity Trap Vector</span>
                        <p className="text-slate-300 text-xs mt-0.5 leading-normal">{proj.challenge}</p>
                      </div>

                      <div>
                        <span className="block text-[9px] text-slate-500 font-mono uppercase tracking-wider mb-1">Recommended Stack</span>
                        <div className="flex flex-wrap gap-1">
                          {proj.stack.map((item, id) => (
                            <span key={id} className="text-[9px] font-mono bg-slate-950 text-emerald-400 px-1.5 py-0.5 rounded">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Production Footprint bar */}
      <footer className="border-t border-indigo-950 bg-slate-950 mt-16 py-12 relative" id="main-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 text-xs text-slate-500">
          
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Brain className="w-4 h-4 text-indigo-400" />
              <span className="font-display font-medium text-white">AetherAgent Systems Inc.</span>
            </div>
            <p className="text-[11px]">Dynamic AI scrapers, headless multi-nodes, and secure vector indexing.</p>
          </div>

          <div className="flex gap-6 font-mono text-[11px]">
            <span className="text-indigo-400">Server: http://localhost:3000</span>
            <span className="text-slate-400">Environment: Sandbox Container</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
