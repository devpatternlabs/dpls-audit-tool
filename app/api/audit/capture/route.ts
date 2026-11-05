import { NextResponse } from "next/server";
import type { LeadCapturePayload } from "@/types/audit";

export async function POST(request: Request) {
  try {
    const body: LeadCapturePayload = await request.json();
    const { name, email, url, company, currentScore, bottlenecks, auditId } = body;

    if (!email || !url) {
      return NextResponse.json(
        { error: "Work email and website URL are required." },
        { status: 400 }
      );
    }

    const leadInfo = {
      name: name || "Anonymous Founder/Lead",
      email: email.trim(),
      url: url.trim(),
      company: company || "N/A",
      auditId: auditId || "N/A",
      currentScore: currentScore || "N/A",
      bottlenecksSummary: Array.isArray(bottlenecks)
        ? bottlenecks.map((b: any) => b.title || b).join(", ")
        : "N/A",
      capturedAt: new Date().toISOString(),
    };

    console.log("🔥 [DPLS LEAD CAPTURED - PITCH & CLOSE]", leadInfo);

    // 1. Dispatch to Discord Webhook
    if (process.env.DISCORD_WEBHOOK_URL) {
      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: "⚡ NEW HIGH-INTENT LEAD: Comparative Audit Unlocked",
              color: 0x10b981, // Emerald green
              description: `Client requested full 14-day blueprint for **${leadInfo.url}**`,
              fields: [
                { name: "👤 Contact Name", value: leadInfo.name, inline: true },
                { name: "📧 Work Email", value: leadInfo.email, inline: true },
                { name: "🏢 Company", value: leadInfo.company, inline: true },
                { name: "📉 Current Health Score", value: `${leadInfo.currentScore}/100 (DPLS Projected: 99/100)`, inline: false },
                { name: "🚨 Detected Bottlenecks", value: leadInfo.bottlenecksSummary, inline: false },
                { name: "🎯 Next Action", value: `Pitch 14-Day Production Sprint to ${leadInfo.email}`, inline: false }
              ],
              footer: { text: "Dev Pattern Labs | PatternAudit Engine" },
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      }).catch((err) => console.error("Discord dispatch error:", err));
    }

    // 2. Dispatch to Slack Webhook
    if (process.env.SLACK_WEBHOOK_URL) {
      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `🔥 *New Audit Lead Ready to Close!*\n*Email:* ${leadInfo.email}\n*Website:* ${leadInfo.url}\n*Score:* ${leadInfo.currentScore}/100 -> DPLS 99/100\n*Bottlenecks:* ${leadInfo.bottlenecksSummary}`,
        }),
      }).catch((err) => console.error("Slack dispatch error:", err));
    }

    // 3. Dispatch to Custom CRM / Automation Webhook (n8n / Make / Zapier)
    if (process.env.CUSTOM_WEBHOOK_URL) {
      await fetch(process.env.CUSTOM_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadInfo),
      }).catch((err) => console.error("Custom webhook dispatch error:", err));
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your executive blueprint and 14-day roadmap has been prepared.",
        unlocked: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json({ error: "Failed to process lead capture." }, { status: 500 });
  }
}
