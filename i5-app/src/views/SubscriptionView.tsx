"use client";

import React, { useState } from "react";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "",
    description: "Perfect to explore the AI Agent platform.",
    features: [
      "Top 10 daily aggregate signals",
      "Delayed signals (15 min delay)",
      "Community marketplace access",
      "10 AI messages / day",
      "Basic market overview",
    ],
    cta: "Current Plan",
    current: true,
    highlight: false,
  },
  {
    id: "starter",
    name: "Starter",
    price: "$19",
    period: "/month",
    description: "For active traders seeking AI edge.",
    features: [
      "100 AI messages / day",
      "Smart Slippage Protection AI",
      "Telegram & News Analyzers (Real-time)",
      "Basic Perp Alerts (Funding rates)",
      "Earn 2× Points (Missions)",
      "Priority support",
    ],
    cta: "Upgrade to Starter",
    current: false,
    highlight: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$79",
    period: "/month",
    description: "Full unmetered access to advanced AI models.",
    features: [
      "Unlimited messaging & Execution",
      "Advanced Perp Alerts (Liq clusters)",
      "All Signal Analyzers & Chart AI",
      "Unlimited AI Smart Execution",
      "Whale Tracking alerts",
      "Early access to new agents",
      "Dedicated trading desk support",
    ],
    cta: "Upgrade to Pro",
    current: false,
    highlight: true,
  },
];

const FEATURE_COMPARISON = [
  { name: "Crypto Assets Coverage", free: "Top 100", starter: "Top 1,000", pro: "15,000+" },
  { name: "Equities & Global Indices", free: "✓", starter: "✓", pro: "✓" },
  { name: "Trading Signals Stream", free: "5 / day", starter: "50 / day", pro: "Unlimited" },
  { name: "Smart Money & Whale Tracking", free: "✗", starter: "✗", pro: "✓" },
  { name: "Alpha AI Bot Copilot", free: "✗", starter: "Basic", pro: "Advanced" },
  { name: "DEX & Liquidity Tracking", free: "✗", starter: "✗", pro: "✓" },
  { name: "Real-time Funding Rate Alerts", free: "✗", starter: "✓", pro: "✓" },
  { name: "Chart Pattern Recognition", free: "✗", starter: "✗", pro: "✓" },
  { name: "Support", free: "Community", starter: "Email", pro: "Priority" },
];

const FAQ = [
  { q: "Can I cancel anytime?", a: "Yes. No lock-in contracts. Cancel from account settings at any time with one click." },
  { q: "Is there a free trial for Pro?", a: "Yes — Pro comes with a 7-day free trial. No credit card required to start." },
  { q: "What payment methods are accepted?", a: "We accept all major credit cards, debit cards, UPI, and crypto (USDT/USDC on major chains)." },
];

export default function SubscriptionView() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: "7px 20px", borderRadius: "var(--radius-md)", border: "none",
    background: active ? "var(--bg-surface-overlay)" : "transparent",
    color: active ? "var(--text-primary)" : "var(--text-tertiary)",
    fontSize: 13, fontWeight: active ? 700 : 400, cursor: "pointer",
    fontFamily: "var(--font-sans)", transition: "all 0.15s ease",
  });

  return (
    <div style={{ height: "100%", overflowY: "auto", background: "var(--bg-app)", color: "var(--text-primary)", padding: 24, fontFamily: "var(--font-sans)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 8px 0" }}>Choose Your Plan</h1>
          <p style={{ fontSize: 14, color: "var(--text-tertiary)", marginBottom: 20 }}>
            Unlock professional AI trading tools with transparent pricing
          </p>
          {/* Billing toggle */}
          <div style={{ display: "inline-flex", gap: 4, background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-lg)", padding: 4 }}>
            <button style={tabStyle(billingCycle === "monthly")} onClick={() => setBillingCycle("monthly")}>Monthly</button>
            <button style={tabStyle(billingCycle === "annual")} onClick={() => setBillingCycle("annual")}>
              Annual
              <span style={{ marginLeft: 6, fontSize: 10, padding: "2px 6px", borderRadius: "var(--radius-full)", background: "rgba(47,203,115,0.15)", color: "var(--color-price-up)" }}>-20%</span>
            </button>
          </div>
        </div>

        {/* Plan cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 40 }}>
          {PLANS.map((plan) => (
            <div key={plan.id} style={{
              background: plan.highlight
                ? "linear-gradient(160deg, var(--neutral-800) 0%, var(--neutral-850) 100%)"
                : "var(--bg-surface)",
              border: `1px solid ${plan.highlight ? "rgba(228,228,228,0.25)" : "var(--border-color-default)"}`,
              borderRadius: "var(--radius-xl)",
              padding: 24,
              position: "relative",
              transition: "transform 0.15s",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "none"; }}
            >
              {plan.highlight && (
                <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "var(--text-primary)", color: "var(--bg-app)", fontSize: 11, fontWeight: 800, padding: "4px 14px", borderRadius: "var(--radius-full)", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                  ⭐ MOST POPULAR
                </div>
              )}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 8 }}>{plan.name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
                  <span style={{ fontSize: 32, fontWeight: 800, fontFamily: "var(--font-mono)" }}>
                    {billingCycle === "annual" && plan.price !== "$0"
                      ? `$${Math.round(parseInt(plan.price.replace("$", "")) * 0.8)}`
                      : plan.price}
                  </span>
                  <span style={{ fontSize: 13, color: "var(--text-tertiary)" }}>{plan.period}</span>
                </div>
                <p style={{ fontSize: 13, color: "var(--text-tertiary)", margin: 0 }}>{plan.description}</p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                {plan.features.map((feat) => (
                  <div key={feat} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "var(--text-secondary)" }}>
                    <span style={{ color: "var(--color-price-up)", flexShrink: 0 }}>✓</span>
                    {feat}
                  </div>
                ))}
              </div>

              <button style={{
                width: "100%", padding: "10px 0", borderRadius: "var(--radius-md)", border: `1px solid ${plan.current ? "var(--border-color-default)" : "transparent"}`, cursor: plan.current ? "default" : "pointer",
                background: plan.current ? "transparent" : plan.highlight ? "var(--button-primary-bg)" : "var(--bg-surface-overlay)",
                color: plan.current ? "var(--text-tertiary)" : plan.highlight ? "var(--button-primary-text)" : "var(--text-primary)",
                fontSize: 13, fontWeight: 700, fontFamily: "var(--font-sans)",
              }}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Feature comparison table */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Full Feature Comparison</h2>
          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ padding: "12px 16px", fontSize: 11, fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", background: "var(--bg-surface-raised)", borderBottom: "1px solid var(--border-color-default)", textAlign: "left" }}>Feature</th>
                  {["Free", "Starter", "Pro"].map((h) => (
                    <th key={h} style={{ padding: "12px 16px", fontSize: 11, fontWeight: 600, color: h === "Pro" ? "var(--text-primary)" : "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", background: "var(--bg-surface-raised)", borderBottom: "1px solid var(--border-color-default)", textAlign: "center" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FEATURE_COMPARISON.map((feat, i) => (
                  <tr key={feat.name} style={{ background: i % 2 === 0 ? "transparent" : "var(--bg-surface-raised)" }}>
                    <td style={{ padding: "10px 16px", fontSize: 13, color: "var(--text-secondary)", borderBottom: "1px solid var(--border-color-default)" }}>{feat.name}</td>
                    {[feat.free, feat.starter, feat.pro].map((val, vi) => (
                      <td key={vi} style={{ padding: "10px 16px", fontSize: 12, textAlign: "center", borderBottom: "1px solid var(--border-color-default)", fontFamily: val === "✓" || val === "✗" ? undefined : "var(--font-mono)", color: val === "✓" ? "var(--color-price-up)" : val === "✗" ? "var(--text-disabled)" : "var(--text-secondary)", fontWeight: val === "✓" || val === "✗" ? 700 : 500 }}>
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Frequently Asked Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {FAQ.map((faq, i) => (
              <div key={i} style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", cursor: "pointer", color: "var(--text-primary)", fontSize: 14, fontWeight: 600, fontFamily: "var(--font-sans)", textAlign: "left" }}
                >
                  {faq.q}
                  <span style={{ fontSize: 12, color: "var(--text-tertiary)", transition: "transform 0.2s", transform: openFaq === i ? "rotate(180deg)" : "none", display: "inline-block" }}>▼</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 16px 14px", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
