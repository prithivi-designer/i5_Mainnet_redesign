"use client";
import { Check, X } from "lucide-react";


import React, { useState } from "react";
import styles from "./SubscriptionView.module.css";

interface Plan {
  id: string;
  name: string;
  price: string;
  numericPrice?: number;
  period: string;
  description: string;
  cta: string;
  highlight: boolean;
  themeClass: string;
  features: string[];
  current?: boolean;
}

const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    numericPrice: 0,
    period: "",
    description: "Perfect to explore the AI Agent platform.",
    cta: "Current Plan",
    highlight: false,
    themeClass: styles.cardGrey,
    current: true,
    features: [
      "Top 10 daily aggregate signals",
      "Delayed signals (15 min delay)",
      "Community marketplace access",
      "10 AI messages / day",
      "Basic market overview"
    ]
  },
  {
    id: "starter",
    name: "Starter",
    price: "$19",
    numericPrice: 19,
    period: "/month",
    description: "For active traders seeking AI edge.",
    cta: "Upgrade to Starter",
    highlight: false,
    themeClass: styles.cardTurquoise,
    features: [
      "100 AI messages / day",
      "Smart Slippage Protection AI",
      "Telegram & News Analyzers (Real-time)",
      "Basic Perp Alerts (Funding rates)",
      "Earn 2× Points (Missions)",
      "Priority support"
    ]
  },
  {
    id: "pro",
    name: "Pro",
    price: "$79",
    numericPrice: 79,
    period: "/month",
    description: "Full unmetered access to advanced AI models.",
    cta: "Upgrade to Pro",
    highlight: true,
    themeClass: styles.cardPurple,
    features: [
      "Unlimited messaging & Execution",
      "Advanced Perp Alerts (Liq clusters)",
      "All Signal Analyzers & Chart AI",
      "Unlimited AI Smart Execution",
      "Whale Tracking alerts",
      "Early access to new agents",
      "Dedicated trading desk support"
    ]
  }
];

const FEATURE_COMPARISON = [
  { name: "Crypto Assets Coverage", free: "Top 100", starter: "Top 1,000", pro: "15,000+" },
  { name: "Equities & Global Indices", free: <Check size={16} />, starter: <Check size={16} />, pro: <Check size={16} /> },
  { name: "Trading Signals Stream", free: "5 / day", starter: "50 / day", pro: "Unlimited" },
  { name: "Smart Money & Whale Tracking", free: <X size={16} />, starter: <X size={16} />, pro: <Check size={16} /> },
  { name: "Alpha AI Bot Copilot", free: <X size={16} />, starter: "Basic", pro: "Advanced" },
  { name: "DEX & Liquidity Tracking", free: <X size={16} />, starter: <X size={16} />, pro: <Check size={16} /> },
  { name: "Real-time Funding Rate Alerts", free: <X size={16} />, starter: <Check size={16} />, pro: <Check size={16} /> },
  { name: "Chart Pattern Recognition", free: <X size={16} />, starter: <X size={16} />, pro: <Check size={16} /> },
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

  const IconCheck = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

  // SVG Icons for headers
  const LogoFree = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="m10 15 5-3-5-3v6z" />
    </svg>
  );

  const LogoStarter = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );

  const LogoPro = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );

  return (
    <div className={styles.container}>
      <div className={styles.inner}>

        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Subscription Plans</h1>
          <p className={styles.subtitle}>
            Choose the plan that fits your trading style. Supercharge your portfolio with AI-based decentralized tools.
          </p>
          
          {/* Billing Toggle */}
          <div className={styles.billingToggleWrapper}>
            <button
              className={`${styles.toggleBtn} ${billingCycle === "monthly" ? styles.toggleBtnActive : ""}`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
            <button
              className={`${styles.toggleBtn} ${billingCycle === "annual" ? styles.toggleBtnActive : ""}`}
              onClick={() => setBillingCycle("annual")}
            >
              Annual
              <span className={styles.discountBadge}>-20%</span>
            </button>
          </div>
        </div>

        {/* Plan Cards Grid */}
        <div className={styles.plansGrid}>
          {PLANS.map((plan) => {
            // Apply annual discount
            let displayPrice = plan.price;
            if (billingCycle === "annual" && plan.numericPrice) {
              const discounted = Math.round(plan.numericPrice * 0.8);
              displayPrice = `$${discounted}`;
            }

            return (
              <div key={plan.id} className={`${styles.card} ${plan.themeClass} ${plan.highlight ? styles.cardHighlighted : ""}`}>
                <div className={styles.cardContent}>
                  
                  {/* Card Header (Logo Circle + Popular Badge) */}
                  <div className={styles.cardHeader}>
                    <div className={styles.iconCircle}>
                      {plan.id === "free" && <LogoFree />}
                      {plan.id === "starter" && <LogoStarter />}
                      {plan.id === "pro" && <LogoPro />}
                    </div>
                    {plan.highlight && (
                      <span className={styles.popularBadge}>★ MOST POPULAR</span>
                    )}
                  </div>

                  {/* Plan Meta */}
                  <h3 className={styles.planName}>{plan.name}</h3>
                  <p className={styles.planDescription}>{plan.description}</p>

                  {/* Pricing */}
                  <div className={styles.priceWrapper}>
                    <span className={styles.price}>{displayPrice}</span>
                    {plan.numericPrice !== 0 && <span className={styles.period}>{plan.period}</span>}
                  </div>

                  {/* CTA Button */}
                  <button
                    className={`${styles.ctaBtn} ${plan.highlight ? styles.ctaPrimary : styles.ctaSecondary}`}
                    style={plan.current ? { opacity: 0.6, cursor: "default" } : {}}
                    disabled={plan.current}
                  >
                    {plan.cta}
                  </button>

                  {/* Features List */}
                  <div className={styles.featuresList}>
                    {plan.features.map((feature, index) => (
                      <div key={index} className={styles.featureItem}>
                        <span className={styles.featureIcon}><IconCheck /></span>
                        <span className={styles.featureText}>{feature}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Table */}
        <div style={{ marginTop: "var(--space-6)" }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Full Feature Comparison</h2>
          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ padding: "14px 20px", fontSize: 11, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", background: "var(--bg-surface-raised)", borderBottom: "1px solid var(--border-color-default)", textAlign: "left" }}>Feature</th>
                  {["Free", "Starter", "Pro"].map((h) => (
                    <th key={h} style={{ padding: "14px 20px", fontSize: 11, fontWeight: 700, color: h === "Pro" ? "var(--text-primary)" : "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", background: "var(--bg-surface-raised)", borderBottom: "1px solid var(--border-color-default)", textAlign: "center" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FEATURE_COMPARISON.map((feat, i) => (
                  <tr key={feat.name} style={{ background: i % 2 === 0 ? "transparent" : "var(--bg-surface-raised)" }}>
                    <td style={{ padding: "12px 20px", fontSize: 13, color: "var(--text-secondary)", borderBottom: "1px solid var(--border-color-default)" }}>{feat.name}</td>
                    {[feat.free, feat.starter, feat.pro].map((val, vi) => (
                      <td key={vi} style={{ padding: "12px 20px", fontSize: 12, textAlign: "center", borderBottom: "1px solid var(--border-color-default)", fontFamily: val === <Check size={16} /> || val === <X size={16} /> ? undefined : "var(--font-mono)", color: val === <Check size={16} /> ? "var(--color-price-up)" : val === <X size={16} /> ? "var(--text-disabled)" : "var(--text-secondary)", fontWeight: val === <Check size={16} /> || val === <X size={16} /> ? 700 : 500 }}>
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{ marginBottom: "var(--space-4)" }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Frequently Asked Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {FAQ.map((faq, i) => (
              <div key={i} style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", cursor: "pointer", color: "var(--text-primary)", fontSize: 14, fontWeight: 700, fontFamily: "var(--font-sans)", textAlign: "left" }}
                >
                  {faq.q}
                  <span style={{ fontSize: 12, color: "var(--text-tertiary)", transition: "transform 0.2s", transform: openFaq === i ? "rotate(180deg)" : "none", display: "inline-block" }}>▼</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 20px 16px", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
