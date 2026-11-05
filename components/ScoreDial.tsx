"use client";

import React from "react";

interface ScoreDialProps {
  score: number;
  label: string;
  grade: string;
  theme: "danger" | "success";
  size?: number;
}

export default function ScoreDial({ score, label, grade, theme, size = 140 }: ScoreDialProps) {
  const strokeWidth = 10;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const isSuccess = theme === "success";
  const strokeColor = isSuccess ? "#10b981" : "#f43f5e";
  const glowColor = isSuccess ? "rgba(16, 185, 129, 0.25)" : "rgba(244, 63, 94, 0.25)";
  const textColor = isSuccess ? "text-emerald-400" : "text-rose-400";
  const badgeBg = isSuccess ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300" : "bg-rose-500/10 border-rose-500/30 text-rose-300";

  return (
    <div className="flex flex-col items-center text-center space-y-2">
      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
        {label}
      </span>

      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1e293b"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              transition: "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
              filter: `drop-shadow(0 0 10px ${glowColor})`,
            }}
          />
        </svg>

        {/* Center Score & Grade */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-black ${textColor} tracking-tight leading-none`}>
            {score}
          </span>
          <span className="text-[10px] text-slate-400 font-mono mt-0.5">/ 100</span>
        </div>
      </div>

      <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[11px] font-mono font-semibold ${badgeBg}`}>
        <span>Grade: {grade}</span>
      </div>
    </div>
  );
}
