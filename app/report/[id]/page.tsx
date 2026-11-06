"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  Calendar,
  RefreshCw,
  Globe,
  Share2,
  Gauge,
  Activity,
} from "lucide-react";
import ScoreDial from "@/components/ScoreDial";
import { CALENDLY_URL, BRAND_NAME } from "@/lib/site";
import type { ComparativeAuditResult } from "@/types/audit";

export default function ReportPage() {
  const params = useParams();
  const id = params?.id as string;
  const [report, setReport] = useState<ComparativeAuditResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchReport = async () => {
      try {
        const res = await fetch(`/api/report/${id}`);
        const data = await res.json();
        if (res.ok && data.success) {
          setReport(data.data);
        } else {
          setError(data.error || "Report not found or expired.");
        }
      } catch (err: any) {
        setError("Failed to load audit report.");
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="flex items-center gap-3 text-emerald-400 font-mono text-sm">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span>Loading Executive Report...</span>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-4 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-white">Report Not Found</h2>
        <p className="text-sm text-slate-400 max-w-md">
          {error || "This audit report link may have expired or was never generated."}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition"
        >
          <span>Run a New Comparative Audit</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block">
              Official Architecture Teardown
            </span>
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-sky-400" />
              <span>{report.domain}</span>
            </h1>
            <p className="text-xs text-slate-400">
              Scanned on {new Date(report.scannedAt).toLocaleDateString()} • Form Factor: <span className="font-mono text-slate-300 uppercase">{report.strategy}</span> • Audit ID: <code className="text-slate-300 font-mono">{report.id}</code>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? "Link Copied!" : "Share Link"}</span>
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-xs font-bold hover:opacity-95 transition"
            >
              <span>Scan Another Site</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 1. GOOGLE LIGHTHOUSE 4-CATEGORY SCORES */}
        {report.categories && (
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-bold text-white">Google Lighthouse Verified Scores</span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {report.strategy ? report.strategy.toUpperCase() : "DESKTOP"}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center space-y-1">
                <span className={`text-3xl font-black ${report.categories.performance >= 90 ? "text-emerald-400" : report.categories.performance >= 80 ? "text-amber-400" : "text-rose-400"}`}>
                  {report.categories.performance}
                </span>
                <span className="block text-xs font-medium text-slate-300">Performance</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center space-y-1">
                <span className={`text-3xl font-black ${report.categories.accessibility >= 90 ? "text-emerald-400" : "text-amber-400"}`}>
                  {report.categories.accessibility}
                </span>
                <span className="block text-xs font-medium text-slate-300">Accessibility</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center space-y-1">
                <span className={`text-3xl font-black ${report.categories.bestPractices >= 90 ? "text-emerald-400" : "text-amber-400"}`}>
                  {report.categories.bestPractices}
                </span>
                <span className="block text-xs font-medium text-slate-300">Best Practices</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center space-y-1">
                <span className={`text-3xl font-black ${report.categories.seo >= 90 ? "text-emerald-400" : "text-amber-400"}`}>
                  {report.categories.seo}
                </span>
                <span className="block text-xs font-medium text-slate-300">SEO &amp; AEO</span>
              </div>
            </div>

            {report.coreWebVitals && (
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2 border-t border-slate-800/80 text-center text-xs font-mono">
                <div className="p-2 rounded bg-slate-950/50">
                  <span className="text-[10px] text-slate-500 block">FCP</span>
                  <span className="text-emerald-400 font-bold">{report.coreWebVitals.fcp}</span>
                </div>
                <div className="p-2 rounded bg-slate-950/50">
                  <span className="text-[10px] text-slate-500 block">LCP</span>
                  <span className="text-emerald-400 font-bold">{report.coreWebVitals.lcp}</span>
                </div>
                <div className="p-2 rounded bg-slate-950/50">
                  <span className="text-[10px] text-slate-500 block">TBT</span>
                  <span className={`${parseInt(report.coreWebVitals.tbt) > 200 ? "text-amber-400" : "text-emerald-400"} font-bold`}>
                    {report.coreWebVitals.tbt}
                  </span>
                </div>
                <div className="p-2 rounded bg-slate-950/50">
                  <span className="text-[10px] text-slate-500 block">CLS</span>
                  <span className="text-emerald-400 font-bold">{report.coreWebVitals.cls}</span>
                </div>
                <div className="p-2 rounded bg-slate-950/50">
                  <span className="text-[10px] text-slate-500 block">Speed Index</span>
                  <span className="text-slate-300 font-bold">{report.coreWebVitals.speedIndex}</span>
                </div>
                <div className="p-2 rounded bg-slate-950/50">
                  <span className="text-[10px] text-slate-500 block">Server TTFB</span>
                  <span className="text-sky-400 font-bold">{report.coreWebVitals.ttfb}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. COMPARISON DIAL BANNER */}
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-3">
              <ScoreDial
                score={report.overallScoreCurrent}
                label="Current Measured State"
                grade={report.gradeCurrent}
                theme={report.overallScoreCurrent >= 85 ? "success" : "danger"}
              />
              <p className="text-xs text-slate-400 max-w-xs text-center md:text-left">
                {report.overallScoreCurrent >= 85
                  ? "Strong base. Headroom exists to eliminate remaining TBT and achieve 99/100 peak velocity."
                  : "Measurable bottlenecks detected in client hydration, bundle overhead, and response time."}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center px-5 py-3 rounded-2xl bg-slate-950/90 border border-slate-800 text-slate-300">
              <ArrowRight className="w-6 h-6 text-emerald-400 hidden md:block" />
              <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider">Re-Engineered By</span>
              <span className="text-xs font-bold text-white">{BRAND_NAME}</span>
            </div>

            <div className="flex-1 flex flex-col items-center md:items-end text-center md:text-right space-y-3">
              <ScoreDial
                score={report.overallScoreDpls}
                label="DPLS 14-Day Sprint Target"
                grade={report.gradeDpls}
                theme="success"
              />
              <p className="text-xs text-slate-400 max-w-xs text-center md:text-right">
                Next.js 15 Server Components, global Edge Network caching, and zero manual leaks.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
              <span className="block text-2xl font-black text-emerald-400">{report.businessImpact.conversionLift}</span>
              <span className="text-xs text-slate-400">Estimated Conversion Lift</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
              <span className="block text-2xl font-black text-sky-400">{report.businessImpact.pageSpeedMultiplier}</span>
              <span className="text-xs text-slate-400">Speed Multiplier</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
              <span className="block text-2xl font-black text-teal-400">{report.businessImpact.bounceRateReduction}</span>
              <span className="text-xs text-slate-400">Bounce Rate Reduction</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
              <span className="block text-2xl font-black text-indigo-400">{report.businessImpact.annualTimeSavedHours}</span>
              <span className="text-xs text-slate-400">Manual Hours Saved</span>
            </div>
          </div>
        </div>

        {/* 3. SIDE-BY-SIDE METRICS */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Side-by-Side Architectural Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {report.metrics.map((m, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
                    <span>{m.category}</span>
                    <span className="text-emerald-400 font-semibold">{m.improvement}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-3">{m.name}</h4>
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

        {/* 4. CHOKE-POINTS IDENTIFIED */}
        {report.bottlenecks && report.bottlenecks.length > 0 && (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-mono">
                <Activity className="w-3.5 h-3.5" />
                <span>DIAGNOSTIC BOTTLENECK REPORT</span>
              </div>
              <h3 className="text-xl font-bold text-white">Choke-Points Detected on {report.domain}</h3>
            </div>

            <div className="space-y-4">
              {report.bottlenecks.map((b, idx) => (
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
        )}

        {/* 5. 14-DAY ROADMAP & CLOSING CALL */}
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block">
                Execution Blueprint
              </span>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-400" />
                <span>14-Day Production Sprint Roadmap</span>
              </h3>
            </div>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition"
            >
              <Calendar className="w-4 h-4" />
              <span>Book 15-Min Strategy Call</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {report.roadmap14Day.map((phase, idx) => (
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
      </div>
    </div>
  );
}
