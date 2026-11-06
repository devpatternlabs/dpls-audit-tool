"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Zap,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  Cpu,
  TrendingUp,
  Sparkles,
  Globe,
  Calendar,
  Lock,
  Unlock,
  RefreshCw,
  ShieldCheck,
  Check,
  Download,
  Share2,
  Monitor,
  Smartphone,
  Gauge,
  Activity,
  Star,
  Rocket,
} from "lucide-react";
import ScoreDial from "@/components/ScoreDial";
import { CALENDLY_URL, BRAND_NAME } from "@/lib/site";
import type { ComparativeAuditResult } from "@/types/audit";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [strategy, setStrategy] = useState<"desktop" | "mobile">("desktop");
  const [stack, setStack] = useState("nextjs");
  const [painPoint, setPainPoint] = useState("performance");
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [auditResult, setAuditResult] = useState<ComparativeAuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 2-Plan Marketing selection & Lead capture state
  const [selectedPlan, setSelectedPlan] = useState<"sprint" | "retainer">("sprint");
  const [leadForm, setLeadForm] = useState({ name: "", email: "", company: "" });
  const [isCapturing, setIsCapturing] = useState(false);
  const [leadUnlocked, setLeadUnlocked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const scanSteps = [
    "Pinging origin server & measuring Time-To-First-Byte (TTFB)...",
    "Inspecting DOM hydration, script bundles, and render-blocking tags...",
    "Querying Core Web Vitals (FCP, LCP, TBT, CLS) & SEO metadata...",
    "Detecting workflow automation leaks & un-cached database queries...",
    "Synthesizing Dev Pattern Labs Re-Engineered Architecture Blueprint...",
  ];

  const handleStartScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setError(null);
    setIsScanning(true);
    setScanStep(0);
    setAuditResult(null);
    setLeadUnlocked(false);

    const interval = setInterval(() => {
      setScanStep((prev) => (prev < scanSteps.length - 1 ? prev + 1 : prev));
    }, 1100);

    try {
      const res = await fetch("/api/audit/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, stack, primaryPain: painPoint, strategy }),
      });

      const data = await res.json();
      clearInterval(interval);

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to analyze target website.");
      }

      setScanStep(scanSteps.length - 1);
      setTimeout(() => {
        setAuditResult(data.data);
        setIsScanning(false);
      }, 500);
    } catch (err: any) {
      clearInterval(interval);
      setIsScanning(false);
      setError(err.message || "An unexpected error occurred. Please verify the URL and try again.");
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.email.trim() || !auditResult) return;

    setIsCapturing(true);
    try {
      const res = await fetch("/api/audit/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadForm.name,
          email: leadForm.email,
          company: leadForm.company,
          url: auditResult.url,
          auditId: auditResult.id,
          currentScore: auditResult.overallScoreCurrent,
          bottlenecks: auditResult.bottlenecks,
          selectedPlan,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setLeadUnlocked(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#10b981", "#38bdf8", "#34d399", "#f59e0b"],
        });
      }
    } catch (err) {
      console.error("Lead submission error:", err);
    } finally {
      setIsCapturing(false);
    }
  };

  const handleCopyShareLink = () => {
    if (!auditResult) return;
    const shareUrl = `${window.location.origin}/report/${auditResult.id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="pt-24 pb-20">
      {/* Background ambient light */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-sky-500/15 via-emerald-500/10 to-transparent blur-[130px] animate-pulse-glow" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ==============================================================
            HERO VALUE PROPOSITION
            ============================================================== */}
        <section className="text-center space-y-5 max-w-4xl mx-auto pt-4 sm:pt-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-semibold border border-emerald-500/25">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dev Pattern Labs • Comparative Architecture Teardown</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
            Pattern Blueprint &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-emerald-400 to-teal-300">
              Comparative Audit
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Complete technical teardown, bottleneck diagnosis, and custom architecture roadmap for your product or workflow.
          </p>

          {/* 4 Value Checks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto text-left text-xs sm:text-sm text-slate-300 pt-2">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Full Tech &amp; UX Audit (performance, SEO, code quality)</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Workflow Automation Audit mapping manual leaks</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Custom Architecture Blueprint (Next.js, DB &amp; API schemas)</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>14-Day Step-by-Step Roadmap for immediate execution</span>
            </div>
          </div>
        </section>

        {/* ==============================================================
            INTERACTIVE SCANNER FORM
            ============================================================== */}
        <section id="audit" className="mt-12 max-w-2xl mx-auto">
          <form
            onSubmit={handleStartScan}
            className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-md space-y-4"
          >
            {/* Strategy (Desktop vs Mobile) selector */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Device Form Factor</span>
              <div className="inline-flex p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setStrategy("desktop")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition ${
                    strategy === "desktop"
                      ? "bg-emerald-500 text-slate-950 font-bold shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStrategy("mobile")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition ${
                    strategy === "mobile"
                      ? "bg-emerald-500 text-slate-950 font-bold shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="https://devpatternlabs.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={isScanning}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950/90 rounded-xl border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isScanning || !url.trim()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 text-slate-950 font-bold text-sm hover:opacity-95 disabled:opacity-50 transition shadow-lg shadow-emerald-500/20 flex-shrink-0 cursor-pointer"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>Run Comparative Teardown</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Quick Context Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs border-t border-slate-800 text-slate-400">
              <div>
                <label className="block mb-1 font-mono text-[11px] text-slate-400">Current Tech Stack</label>
                <select
                  value={stack}
                  onChange={(e) => setStack(e.target.value)}
                  disabled={isScanning}
                  className="w-full bg-slate-950/90 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500 text-xs"
                >
                  <option value="nextjs">Next.js (Pages / App Router)</option>
                  <option value="react">React SPA (Vite / CRA)</option>
                  <option value="wordpress">WordPress / WooCommerce</option>
                  <option value="other">Other / Custom CMS</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-mono text-[11px] text-slate-400">Top Growth Choke-point</label>
                <select
                  value={painPoint}
                  onChange={(e) => setPainPoint(e.target.value)}
                  disabled={isScanning}
                  className="w-full bg-slate-950/90 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500 text-xs"
                >
                  <option value="performance">Slow Load Speeds &amp; Poor Core Web Vitals</option>
                  <option value="conversion">Low Traffic Conversion / High Bounce Rate</option>
                  <option value="automation">Manual Operations &amp; Fragmented Workflows</option>
                  <option value="scaling">Database Latency &amp; Architecture Bottlenecks</option>
                </select>
              </div>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}
        </section>

        {/* ==============================================================
            SCANNING PROGRESS TICKER
            ============================================================== */}
        {isScanning && (
          <div className="mt-10 max-w-xl mx-auto p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-4">
            <div className="flex items-center justify-center gap-3 text-emerald-400 font-mono text-xs">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>DIAGNOSING ARCHITECTURE &amp; METRICS ({strategy.toUpperCase()})</span>
            </div>
            <p className="text-white text-sm font-semibold">{scanSteps[scanStep]}</p>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-sky-400 to-emerald-400 h-full transition-all duration-700 ease-out"
                style={{ width: `${((scanStep + 1) / scanSteps.length) * 100}%` }}
              />
            </div>
            <p className="text-slate-400 text-xs font-mono">Step {scanStep + 1} of {scanSteps.length}</p>
          </div>
        )}

        {/* ==============================================================
            COMPARATIVE AUDIT DASHBOARD RESULTS
            ============================================================== */}
        {auditResult && !isScanning && (
          <div className="mt-16 space-y-12">
            {/* 1. OFFICIAL GOOGLE LIGHTHOUSE 4-CATEGORY BADGES */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-bold text-white">Google Lighthouse Verified Scores</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {auditResult.strategy.toUpperCase()}
                  </span>
                </div>
                <span className="text-xs text-slate-400">
                  Target: <strong>{auditResult.domain}</strong>
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center space-y-1">
                  <span className={`text-3xl font-black ${auditResult.categories.performance >= 90 ? "text-emerald-400" : auditResult.categories.performance >= 80 ? "text-amber-400" : "text-rose-400"}`}>
                    {auditResult.categories.performance}
                  </span>
                  <span className="block text-xs font-medium text-slate-300">Performance</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center space-y-1">
                  <span className={`text-3xl font-black ${auditResult.categories.accessibility >= 90 ? "text-emerald-400" : "text-amber-400"}`}>
                    {auditResult.categories.accessibility}
                  </span>
                  <span className="block text-xs font-medium text-slate-300">Accessibility</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center space-y-1">
                  <span className={`text-3xl font-black ${auditResult.categories.bestPractices >= 90 ? "text-emerald-400" : "text-amber-400"}`}>
                    {auditResult.categories.bestPractices}
                  </span>
                  <span className="block text-xs font-medium text-slate-300">Best Practices</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center space-y-1">
                  <span className={`text-3xl font-black ${auditResult.categories.seo >= 90 ? "text-emerald-400" : "text-amber-400"}`}>
                    {auditResult.categories.seo}
                  </span>
                  <span className="block text-xs font-medium text-slate-300">SEO &amp; AEO</span>
                </div>
              </div>

              {/* Core Web Vitals Real Metrics Strip */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2 border-t border-slate-800/80 text-center text-xs font-mono">
                <div className="p-2 rounded bg-slate-950/50">
                  <span className="text-[10px] text-slate-500 block">FCP</span>
                  <span className="text-emerald-400 font-bold">{auditResult.coreWebVitals.fcp}</span>
                </div>
                <div className="p-2 rounded bg-slate-950/50">
                  <span className="text-[10px] text-slate-500 block">LCP</span>
                  <span className="text-emerald-400 font-bold">{auditResult.coreWebVitals.lcp}</span>
                </div>
                <div className="p-2 rounded bg-slate-950/50">
                  <span className="text-[10px] text-slate-500 block">TBT</span>
                  <span className={`${parseInt(auditResult.coreWebVitals.tbt) > 200 ? "text-amber-400" : "text-emerald-400"} font-bold`}>
                    {auditResult.coreWebVitals.tbt}
                  </span>
                </div>
                <div className="p-2 rounded bg-slate-950/50">
                  <span className="text-[10px] text-slate-500 block">CLS</span>
                  <span className="text-emerald-400 font-bold">{auditResult.coreWebVitals.cls}</span>
                </div>
                <div className="p-2 rounded bg-slate-950/50">
                  <span className="text-[10px] text-slate-500 block">Speed Index</span>
                  <span className="text-slate-300 font-bold">{auditResult.coreWebVitals.speedIndex}</span>
                </div>
                <div className="p-2 rounded bg-slate-950/50">
                  <span className="text-[10px] text-slate-500 block">Server TTFB</span>
                  <span className="text-sky-400 font-bold">{auditResult.coreWebVitals.ttfb}</span>
                </div>
              </div>
            </div>

            {/* 2. OVERALL COMPARISON DIAL BANNER */}
            <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Current State Dial */}
                <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-3">
                  <ScoreDial
                    score={auditResult.overallScoreCurrent}
                    label="Current Measured State"
                    grade={auditResult.gradeCurrent}
                    theme={auditResult.overallScoreCurrent >= 85 ? "success" : "danger"}
                  />
                  <p className="text-xs text-slate-400 max-w-xs text-center md:text-left">
                    {auditResult.overallScoreCurrent >= 85
                      ? "Strong web engineering foundation. High-impact headroom exists to unlock 99/100 peak velocity."
                      : "Measurable drag detected in client hydration, bundle footprint, and origin server TTFB."}
                  </p>
                </div>

                {/* Transform Center Pill */}
                <div className="flex flex-col items-center justify-center px-5 py-3 rounded-2xl bg-slate-950/90 border border-slate-800 text-slate-300">
                  <ArrowRight className="w-6 h-6 text-emerald-400 hidden md:block" />
                  <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider">Re-Engineered By</span>
                  <span className="text-xs font-bold text-white">{BRAND_NAME}</span>
                </div>

                {/* Dev Pattern Labs Target Dial */}
                <div className="flex-1 flex flex-col items-center md:items-end text-center md:text-right space-y-3">
                  <ScoreDial
                    score={auditResult.overallScoreDpls}
                    label="DPLS 14-Day Sprint Target"
                    grade={auditResult.gradeDpls}
                    theme="success"
                  />
                  <p className="text-xs text-slate-400 max-w-xs text-center md:text-right">
                    Sub-second edge caching, Next.js 15 Server Components, and zero manual operational leaks.
                  </p>
                </div>
              </div>

              {/* Business Impact Projection Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
                  <span className="block text-2xl font-black text-emerald-400">{auditResult.businessImpact.conversionLift}</span>
                  <span className="text-xs text-slate-400">Estimated Conversion Lift</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
                  <span className="block text-2xl font-black text-sky-400">{auditResult.businessImpact.pageSpeedMultiplier}</span>
                  <span className="text-xs text-slate-400">Speed Multiplier</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
                  <span className="block text-2xl font-black text-teal-400">{auditResult.businessImpact.bounceRateReduction}</span>
                  <span className="text-xs text-slate-400">Bounce Rate Reduction</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
                  <span className="block text-2xl font-black text-indigo-400">{auditResult.businessImpact.annualTimeSavedHours}</span>
                  <span className="text-xs text-slate-400">Manual Hours Plugged</span>
                </div>
              </div>
            </div>

            {/* 3. SIDE-BY-SIDE METRICS TEARDOWN */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-white">Side-by-Side Architectural Metrics</h3>
                  <p className="text-xs text-slate-400">Direct comparison of real measurements vs. DPLS engineered benchmarks.</p>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 self-start sm:self-auto">
                  Target: 100/100 Core Web Vitals
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {auditResult.metrics.map((m, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
                        <span>{m.category}</span>
                        <span className="text-emerald-400 font-semibold">{m.improvement}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-3">{m.name}</h4>

                      {/* Before vs After pill */}
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-bold">CURRENT</span>
                          <span className="font-bold text-slate-200">{m.currentValue}</span>
                        </div>
                        <div className="text-right border-l border-slate-800 pl-2">
                          <span className="text-[10px] text-emerald-400 block font-bold">DPLS TARGET</span>
                          <span className="font-bold text-emerald-400">{m.dplsValue}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-slate-800/80">
                      {m.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. CRITICAL BOTTLENECKS IDENTIFIED */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-mono">
                  <Activity className="w-3.5 h-3.5" />
                  <span>DIAGNOSTIC BOTTLENECK REPORT</span>
                </div>
                <h3 className="text-xl font-bold text-white">Choke-Points Detected on {auditResult.domain}</h3>
              </div>

              <div className="space-y-4">
                {auditResult.bottlenecks.map((b, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                    <div className="md:col-span-5 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${b.impact === "Critical" ? "bg-rose-500/20 text-rose-300 border border-rose-500/30" : b.impact === "High" ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "bg-sky-500/20 text-sky-300 border border-sky-500/30"}`}>
                          {b.impact} Priority
                        </span>
                        <h4 className="text-sm font-bold text-white">{b.title}</h4>
                      </div>
                      <p className="text-xs text-slate-300 pt-1 leading-relaxed">{b.currentIssue}</p>
                    </div>

                    <div className="md:col-span-7 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-xs text-slate-300 space-y-1">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">Dev Pattern Labs Engineering Fix:</span>
                      <p className="leading-relaxed">{b.dplsFix}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. ARCHITECTURE STACK BLUEPRINT */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-sky-400 text-xs font-mono">
                  <Layers className="w-3.5 h-3.5" />
                  <span>ARCHITECTURE BLUEPRINT</span>
                </div>
                <h3 className="text-xl font-bold text-white">Current Stack vs. DPLS Recommended Architecture</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-mono">
                      <th className="py-3 px-4">System Layer</th>
                      <th className="py-3 px-4 text-slate-400">Current Detected Pattern</th>
                      <th className="py-3 px-4 text-emerald-400">DPLS Re-Engineered Architecture</th>
                      <th className="py-3 px-4 text-slate-400">Primary Benefit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {auditResult.architectureComparison.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/20 transition">
                        <td className="py-3.5 px-4 font-semibold text-white font-mono">{row.layer}</td>
                        <td className="py-3.5 px-4 text-slate-400">{row.currentStack}</td>
                        <td className="py-3.5 px-4 font-semibold text-emerald-300">{row.dplsEngineered}</td>
                        <td className="py-3.5 px-4 text-slate-400">{row.benefit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ==============================================================
                6. TWO-TIER MARKETING APPROACH & LEAD CAPTURE
                ============================================================== */}
            <div id="unlock-blueprint" className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-[#0c1424] border-2 border-emerald-500/40 shadow-2xl relative space-y-8">
              <div className="max-w-3xl mx-auto text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-semibold border border-emerald-500/30">
                  <Rocket className="w-3.5 h-3.5" />
                  <span>Next Step: Select Your Optimization Strategy</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Two Ways Dev Pattern Labs Can Re-Engineer Your System
                </h3>
                <p className="text-slate-300 text-sm max-w-xl mx-auto">
                  Based on your audit findings, choose the engagement model that fits your immediate timeline and business goals:
                </p>
              </div>

              {/* 2-PLAN MARKETING CARDS (SELECTABLE) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
                {/* Plan 1: Simple Tactical Approach (14-Day Sprint) */}
                <div
                  onClick={() => setSelectedPlan("sprint")}
                  className={`cursor-pointer p-6 sm:p-7 rounded-2xl border-2 transition relative flex flex-col justify-between ${
                    selectedPlan === "sprint"
                      ? "bg-slate-900 border-sky-400 shadow-xl shadow-sky-500/10 ring-1 ring-sky-400"
                      : "bg-slate-950/70 border-slate-800 hover:border-slate-700 opacity-80"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                        Plan 1 • Simple Approach
                      </span>
                      <span className="text-xs text-slate-400 font-mono">14 Days Fixed</span>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-white">14-Day Performance Sprint</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Best for fast, guaranteed Core Web Vitals optimization and immediate speed fixes.
                      </p>
                    </div>

                    <div className="text-2xl font-black text-white">
                      $1,800 <span className="text-xs text-slate-400 font-normal">/ ₹85,000 one-time</span>
                    </div>

                    <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                        <span>Eliminate 250ms+ TBT (Third-party script worker offloading)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                        <span>Sub-second LCP optimization (&lt; 0.8s)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                        <span>Zero Layout Shifts (CLS: 0.000)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                        <span>50% SLA Performance Guarantee (95+ Score)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-800/80">
                    <span className={`text-xs font-semibold flex items-center gap-1.5 ${selectedPlan === "sprint" ? "text-sky-400" : "text-slate-400"}`}>
                      <input
                        type="radio"
                        name="plan"
                        checked={selectedPlan === "sprint"}
                        onChange={() => setSelectedPlan("sprint")}
                        className="accent-sky-400"
                      />
                      <span>Select 14-Day Quick Sprint</span>
                    </span>
                  </div>
                </div>

                {/* Plan 2: Detailed Strategic Approach (Monthly Retainer) */}
                <div
                  onClick={() => setSelectedPlan("retainer")}
                  className={`cursor-pointer p-6 sm:p-7 rounded-2xl border-2 transition relative flex flex-col justify-between ${
                    selectedPlan === "retainer"
                      ? "bg-slate-900 border-emerald-400 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-400"
                      : "bg-slate-950/70 border-slate-800 hover:border-slate-700 opacity-80"
                  }`}
                >
                  <div className="absolute -top-3 right-5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-400 text-slate-950 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-slate-950" />
                    <span>Recommended for Scaling</span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Plan 2 • Detailed Approach
                      </span>
                      <span className="text-xs text-emerald-400 font-mono">Continuous Partner</span>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-white">Dedicated Tech Partner (Retainer)</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Full-stack re-architecture, custom DB/API schemas, and ongoing workflow automation.
                      </p>
                    </div>

                    <div className="text-2xl font-black text-white">
                      $2,500 <span className="text-xs text-slate-400 font-normal">/ mo (or ₹1,20,000/mo)</span>
                    </div>

                    <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>Complete Next.js 15 App Router + RSC Migration</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>Custom DB Schemas (Drizzle ORM + Upstash Redis Cache)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>Autonomous Event Pipelines (eliminating manual leaks)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>Continuous Feature Sprints &amp; Priority Slack Channel</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-800/80">
                    <span className={`text-xs font-semibold flex items-center gap-1.5 ${selectedPlan === "retainer" ? "text-emerald-400" : "text-slate-400"}`}>
                      <input
                        type="radio"
                        name="plan"
                        checked={selectedPlan === "retainer"}
                        onChange={() => setSelectedPlan("retainer")}
                        className="accent-emerald-400"
                      />
                      <span>Select Full Retainer Architecture</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* LEAD CAPTURE FORM */}
              {!leadUnlocked ? (
                <form onSubmit={handleLeadSubmit} className="max-w-xl mx-auto space-y-4 pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-slate-950/80 rounded-xl border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500"
                    />
                    <input
                      type="text"
                      placeholder="Company / Product Name"
                      value={leadForm.company}
                      onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-950/80 rounded-xl border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="name@company.com (Work Email)"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-slate-950/80 rounded-xl border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500"
                  />

                  <button
                    type="submit"
                    disabled={isCapturing}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 text-slate-950 font-bold text-sm hover:opacity-95 transition shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isCapturing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                        <span>Compiling Personalized Strategy...</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-4 h-4 text-slate-950" />
                        <span>
                          Unlock Roadmap for {selectedPlan === "sprint" ? "14-Day Sprint (Simple)" : "Full Retainer (Detailed)"}
                        </span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-400 font-mono">
                    Zero spam. Direct engineer-to-engineer technical blueprint.
                  </p>
                </form>
              ) : (
                <div className="max-w-xl mx-auto p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Full Blueprint Unlocked!</h4>
                  <p className="text-xs text-slate-300">
                    Your custom teardown for <strong className="text-white">{selectedPlan === "sprint" ? "14-Day Performance Sprint" : "Dedicated Retainer Architecture"}</strong> has been prepared for <strong className="text-white">{leadForm.email}</strong>.
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book 15-Min Strategy Call on Calendly</span>
                    </a>
                    <button
                      onClick={handleCopyShareLink}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs hover:bg-slate-700 transition"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>{copiedLink ? "Link Copied!" : "Share Report Link"}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* UNLOCKED ROADMAP VIEW */}
              {leadUnlocked && (
                <div className="mt-8 pt-8 border-t border-slate-800 space-y-4 text-left">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-400" />
                      <span>
                        {selectedPlan === "sprint"
                          ? "14-Day Quick Performance Execution Roadmap"
                          : "Full Retainer Architecture & Continuous Scaling Roadmap"}
                      </span>
                    </h4>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {selectedPlan === "sprint" ? "Simple Approach" : "Detailed Approach"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {auditResult.roadmap14Day.map((phase, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                        <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">{phase.days}</span>
                        <h5 className="text-xs font-bold text-white">{phase.phase}</h5>
                        <p className="text-[11px] text-slate-400 font-medium">{phase.focus}</p>
                        <ul className="space-y-1.5 pt-2 border-t border-slate-800/80 text-[11px] text-slate-300">
                          {phase.deliverables.map((item, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
