export interface ReportSection {
  title: string;
  category: string; // e.g. "GitHub", "Paper", "Social", "Releases", "News", "Tech"
  summary: string;
  bulletPoints: string[];
}

export interface TimelineEvent {
  time: string;
  source: string;
  badge: "HOT" | "Research" | "Trending" | "Release" | string;
  text: string;
}

export interface ModelStat {
  label: string;
  value: string;
}

export interface IntelligenceReport {
  topic: string;
  executiveSummary: string;
  hasOfficialRelease: boolean;
  sections: ReportSection[];
  timelineEvents: TimelineEvent[];
  modelStats: ModelStat[];
  nextActionsForDevs: string[];
}

export interface AgentRunResponse {
  success: boolean;
  simulated: boolean;
  errorMsg?: string;
  report: IntelligenceReport;
}

export interface CodeTemplate {
  title: string;
  description: string;
  language: string;
  code: string;
}

export interface BlueprintTopic {
  id: string;
  title: string;
  iconName: string;
  contentMarkdown: string;
  codeTemplates?: CodeTemplate[];
}
