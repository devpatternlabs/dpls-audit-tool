# PatternAudit™ by Dev Pattern Labs
> **Complete Technical Teardown, Bottleneck Diagnosis, and Custom Architecture Roadmap for Modern Web Platforms.**

Built by [Dev Pattern Labs](https://devpatternlabs.com), PatternAudit is a high-converting, comparative technical audit and lead-generation engine for Next.js, React, and modern web applications.

---

## ⚡ Key Capabilities

* **✓ Full Tech & UX Audit:** Instant measurement of Core Web Vitals (LCP, CLS, FCP), Time-To-First-Byte (TTFB), client hydration overhead, and SEO/AEO metadata.
* **✓ Comparative "Before vs. DPLS Engineered" Report:** Juxtaposes the client's current friction directly against Dev Pattern Labs' 99/100 Core Web Vitals, sub-second edge-rendered benchmark.
* **✓ Workflow Automation Audit:** Identifies manual operational leaks, database latency choke-points, and un-cached query waterfalls.
* **✓ Custom Next.js 15 Architecture Blueprint:** Recommends App Router, React 19 Server Components (RSC), type-safe Drizzle ORM, and Upstash Redis Edge caching.
* **✓ 14-Day Step-by-Step Execution Roadmap:** Phased sprint deliverables (Days 1–3 Foundation, Days 4–10 High-Velocity Engineering, Days 11–14 Hardening & Launch).
* **✓ Automated Lead Capture & Instant Pitch Alerts:** Gated email unlock with direct webhook dispatch to Discord, Slack, and CRM to pitch and close prospects immediately.
* **✓ Shareable Executive Permalink:** Every audit generates a unique permalink (`/report/[id]`) that prospects can share with their CTO, tech lead, or co-founder.

---

## 🛠️ Tech Stack

* **Framework:** Next.js 15 (App Router, React 19, TypeScript)
* **Styling:** Tailwind CSS (Dark Cyber/Studio aesthetic)
* **Icons:** Lucide React
* **Delight / Interactivity:** Canvas Confetti & SVG Circular Gauge Dials
* **Auditing Engine:** Direct TTFB & DOM Scraper + Google PageSpeed Insights REST API v5 (with resilient deterministic fallback)
* **Sales Webhooks:** Discord, Slack, and custom CRM webhooks

---

## 🚀 Quick Start (Local Setup)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aravindhakumar-dev/dpls-audit-tool.git
   cd dpls-audit-tool
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables (Optional):**
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Add your webhook URLs to receive instant sales alerts:
   ```env
   DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/..."
   SLACK_WEBHOOK_URL="https://hooks.slack.com/services/..."
   PAGE_SPEED_API_KEY="" # Optional (works on free tier without key)
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploying for Free to Vercel

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete PatternAudit comparative tool"
   git push origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"New Project"**.
3. Import `aravindhakumar-dev/dpls-audit-tool`.
4. (Optional) Set your environment variables (`DISCORD_WEBHOOK_URL`, etc.).
5. Click **Deploy**. Your tool will be live worldwide in under 60 seconds with free SSL and edge CDN.

---

## 💼 The Dev Pattern Labs Pitch & Close Playbook

1. **The Bait:** Prospect enters their URL for a free audit.
2. **The Teardown:** The tool measures their site and shows an honest, jarring contrast between their current score (e.g. 48/100) vs. DPLS Engineered (99/100).
3. **The Gate:** To unlock the full 14-day blueprint, database schemas, and migration plan, they enter their name and work email.
4. **The Instant Alert:** Your team gets a ping on Discord/Slack with their email, URL, and exact pre-diagnosed bottlenecks.
5. **The Close:** Reach out within 15 minutes: *"Hey [Name], saw you ran an audit on [URL]. We already diagnosed your LCP hydration lag and have the exact Next.js 15 schema ready to roll out in our upcoming 14-day sprint."*

---

© Dev Pattern Labs. Engineered with high velocity.
