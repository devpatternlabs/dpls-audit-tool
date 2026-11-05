"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Terminal, Calendar, ArrowUpRight } from "lucide-react";
import { BRAND_NAME, BRAND_WEBSITE, CALENDLY_URL, navItems } from "@/lib/site";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#070b13]/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 via-teal-400 to-emerald-400 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-sky-500/20 group-hover:scale-105 transition">
              <Terminal className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-white text-base tracking-tight leading-none">
                Pattern<span className="text-emerald-400">Audit</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 leading-tight">
                by {BRAND_NAME}
              </span>
            </div>
          </Link>

          <span
            className="hidden sm:inline-block w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981] ml-2"
            title="Q4 14-Day Production Sprints Open"
          />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="hover:text-emerald-400 transition flex items-center gap-1"
            >
              <span>{item.label}</span>
              {item.external && <ArrowUpRight className="w-3 h-3 text-slate-500" />}
            </a>
          ))}
        </nav>

        {/* Primary CTA */}
        <div className="flex items-center gap-3">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:text-white hover:bg-emerald-500/20 transition text-xs font-semibold"
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Book 15-Min Strategy</span>
            <span className="sm:hidden">Book Call</span>
          </a>
        </div>
      </div>
    </header>
  );
}
