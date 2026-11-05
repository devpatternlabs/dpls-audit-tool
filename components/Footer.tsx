import React from "react";
import Link from "next/link";
import { Terminal, ShieldCheck, Calendar, ArrowUpRight, Heart } from "lucide-react";
import { BRAND_NAME, BRAND_WEBSITE, CALENDLY_URL, SUPPORT_EMAIL } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#060911] pt-14 pb-10 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-sky-400 to-emerald-400 flex items-center justify-center text-slate-950 font-bold">
                <Terminal className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <span className="font-bold text-white text-sm">
                PatternAudit by {BRAND_NAME}
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-md">
              Specialized digital engineering &amp; workflow automation studio. We diagnose bottlenecks and re-architect production web applications into sub-second, 100/100 Core Web Vitals Next.js 15 platforms in 14-day agile sprints.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px] pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Remote Studio • Tamil Nadu, India • Global Clients (UAE, US, EU)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] font-mono">
              Engineering Services
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <a href="https://devpatternlabs.com/services/nextjs-development" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition flex items-center gap-1">
                  Next.js 15 Web Platforms <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://devpatternlabs.com/services/automation-ai" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition flex items-center gap-1">
                  AI Workflows &amp; Automation <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://devpatternlabs.com/sprint" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition flex items-center gap-1">
                  14-Day Production Sprints <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact / Inquiries */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] font-mono">
              Inquiries &amp; Discovery
            </h4>
            <p className="text-slate-400">
              Need a direct engineer review or custom architecture consultation?
            </p>
            <div className="pt-2">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:text-white hover:bg-emerald-500/20 transition text-xs font-semibold"
              >
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>Schedule Discovery Call</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <p>© {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with high velocity for modern founders &amp; tech teams.
          </p>
        </div>
      </div>
    </footer>
  );
}
