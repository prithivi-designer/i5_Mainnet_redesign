"use client";

import React from "react";
import styles from "./IntelligenceBriefingGrid.module.css";

interface BriefingItem {
  id: string;
  icon: React.ReactNode;
  iconColor: string;
  title: string;
  value: string;
  valueColor?: string;
  footerLabel: string;
  footerBadge: string;
  isPositive?: boolean;
  isNeutralBadge?: boolean;
}

const briefingIcons = {
  regime: (
    <svg width={15} height={15} viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="8" cy="8" r="1" fill="currentColor" />
    </svg>
  ),
  riskStance: (
    <svg width={15} height={15} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M2.5 12a6 6 0 1 1 11 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M8 8l2.5-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  breadth: (
    <svg width={15} height={15} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M2 11l3.5-5 3.5 4 4.5-7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  volatility: (
    <svg width={15} height={15} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M2 5c1.5 0 2 2 3.5 2s2-2 3.5-2 2 2 3.5 2 2-2 3.5-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M2 11c1.5 0 2 2 3.5 2s2-2 3.5-2 2 2 3.5 2 2-2 3.5-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  topDriver: (
    <svg width={15} height={15} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 1.5L9.5 5.5L13.5 7L9.5 8.5L8 12.5L6.5 8.5L2.5 7L6.5 5.5L8 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  ),
  moreOptions: (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="4" cy="8" r="1.2" fill="currentColor" />
      <circle cx="8" cy="8" r="1.2" fill="currentColor" />
      <circle cx="12" cy="8" r="1.2" fill="currentColor" />
    </svg>
  ),
};

const briefingData: BriefingItem[] = [
  {
    id: "regime",
    icon: briefingIcons.regime,
    iconColor: "#E4E4E4",
    title: "REGIME",
    value: "Late-cycle expansion",
    footerLabel: "Macro Trend",
    footerBadge: "Expansion Phase",
    isPositive: true,
  },
  {
    id: "risk-stance",
    icon: briefingIcons.riskStance,
    iconColor: "#2FCB73",
    title: "RISK STANCE",
    value: "Risk-on",
    valueColor: "#2FCB73",
    footerLabel: "Risk Sentiment",
    footerBadge: "High Bullish",
    isPositive: true,
  },
  {
    id: "breadth",
    icon: briefingIcons.breadth,
    iconColor: "#A855F7",
    title: "BREADTH",
    value: "412 / 88 advancing",
    footerLabel: "Net Advancers",
    footerBadge: "+324 Spread",
    isPositive: true,
  },
  {
    id: "volatility",
    icon: briefingIcons.volatility,
    iconColor: "#38BDF8",
    title: "VOLATILITY",
    value: "Compressed · VIX 14.28",
    valueColor: "#38BDF8",
    footerLabel: "24h Volatility",
    footerBadge: "-3.61% Compressed",
    isPositive: false,
  },
  {
    id: "top-driver",
    icon: briefingIcons.topDriver,
    iconColor: "#F59E0B",
    title: "TOP DRIVER",
    value: "AI capex guidance + softer 10Y yields",
    footerLabel: "Market Catalyst",
    footerBadge: "Macro & Tech",
    isNeutralBadge: true,
  },
];

export default function IntelligenceBriefingGrid() {
  return (
    <section className={styles.container} aria-label="Intelligence Briefing Cards">
      <div className={styles.grid}>
        {briefingData.map((item) => (
          <div key={item.id} className={styles.card}>
            {/* Top Header Row: Icon + Label + Three Dots */}
            <div className={styles.cardHeader}>
              <div className={styles.headerLeft}>
                <span className={styles.headerIcon} style={{ color: item.iconColor }}>
                  {item.icon}
                </span>
                <span className={styles.headerTitle}>{item.title}</span>
              </div>
              <button className={styles.moreBtn} aria-label="Card options">
                {briefingIcons.moreOptions}
              </button>
            </div>

            {/* Inset Main Value Container (Image 2 design box) */}
            <div className={styles.valueBox}>
              <span
                className={styles.valueText}
                style={{ color: item.valueColor || "var(--text-primary)" }}
              >
                {item.value}
              </span>
            </div>

            {/* Bottom Footer: Context Label + Badge (Directly relevant to card content) */}
            <div className={styles.cardFooter}>
              <span className={styles.footerLabel}>{item.footerLabel}</span>
              <span
                className={`${styles.footerBadge} ${
                  item.isNeutralBadge
                    ? styles.neutralBadge
                    : item.isPositive
                    ? styles.positiveBadge
                    : styles.negativeBadge
                }`}
              >
                {!item.isNeutralBadge && (
                  <span className={styles.triangle}>{item.isPositive ? "▲" : "▼"}</span>
                )}
                {item.footerBadge}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
