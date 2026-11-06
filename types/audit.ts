export interface ComparativeMetric {
  name: string;
  category: "Performance" | "UX & Core Vitals" | "Architecture" | "Automation";
  currentValue: string;
  currentScore: number; // 0-100
  currentStatus: "Critical" | "Warning" | "Good";
  dplsValue: string;
  dplsScore: number; // 90-100
  improvement: string;
  explanation: string;
}

export interface BottleneckItem {
  title: string;
  impact: "Critical" | "High" | "Medium";
  category: string;
  currentIssue: string;
  dplsFix: string;
}

export interface ArchitectureLayerComparison {
  layer: string;
  currentStack: string;
  dplsEngineered: string;
  benefit: string;
}

export interface RoadmapPhase {
  phase: string;
  days: string;
  focus: string;
  deliverables: string[];
}

export interface LighthouseCategories {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
}

export interface CoreWebVitalsSummary {
  fcp: string;
  lcp: string;
  tbt: string;
  cls: string;
  speedIndex: string;
  ttfb: string;
}

export interface ComparativeAuditResult {
  id: string;
  url: string;
  domain: string;
  strategy: "desktop" | "mobile";
  scannedAt: string;
  overallScoreCurrent: number;
  overallScoreDpls: number;
  gradeCurrent: string;
  gradeDpls: string;
  categories: LighthouseCategories;
  coreWebVitals: CoreWebVitalsSummary;
  businessImpact: {
    conversionLift: string;
    bounceRateReduction: string;
    pageSpeedMultiplier: string;
    annualTimeSavedHours: string;
  };
  metrics: ComparativeMetric[];
  bottlenecks: BottleneckItem[];
  architectureComparison: ArchitectureLayerComparison[];
  roadmap14Day: RoadmapPhase[];
}

export interface LeadCapturePayload {
  name: string;
  email: string;
  company?: string;
  url: string;
  auditId?: string;
  currentScore?: number;
  bottlenecks?: any[];
}
