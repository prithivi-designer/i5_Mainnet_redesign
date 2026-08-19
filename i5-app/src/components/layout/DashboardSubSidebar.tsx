"use client";

import React, { useState } from "react";
import styles from "./DashboardSubSidebar.module.css";
import EarningsModal from "@/components/dashboard/EarningsModal";
import DashboardMemeSidepanel from "@/components/dashboard/DashboardMemeSidepanel";

/* ----------------------------------------------------------
   Sub-Sidebar Icons (Clean 16x16 SVG strokes)
   ---------------------------------------------------------- */
const subIcons = {
  allIntelligence: (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M2 4.5l6-2.5 6 2.5-6 2.5-6-2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M2 8l6 2.5 6-2.5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M2 11.5l6 2.5 6-2.5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  ),
  breakingNews: (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2" y="2.5" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5 6h6M5 8.5h6M5 11h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  earningsResults: (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M2 13V3h2.5v10H2.5zM6.5 13V6H9v7H6.5zM11 13V9.5h2.5v3.5H11z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  ),
  secFilings: (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 2.5h7.5L13 5v8.5a1.5 1.5 0 0 1-1.5 1.5h-7a1.5 1.5 0 0 1-1.5-1.5v-11z" stroke="currentColor" strokeWidth="1.3" />
      <path d="M10 2.5V5.5h3" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5.5 8h5M5.5 11h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  analystRatings: (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 2l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4L2.2 6.2l4-.6L8 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  ),
  insiderTransactions: (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M3.5 12.5a4.5 4.5 0 0 1 9 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M11 10.5h3m-1.5-1.5v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  institutionalFlow: (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2.5" y="6.5" width="11" height="7" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5.5 6.5V4a2.5 2.5 0 0 1 5 0v2.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
  optionsActivity: (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.3" strokeDasharray="2 2" />
      <path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  onChainSignals: (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="2" fill="currentColor" />
      <path d="M5 5a4.2 4.2 0 0 1 6 0M3 3a7 7 0 0 1 10 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  aiTradeIdeas: (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 1.5L9.5 5.5L13.5 7L9.5 8.5L8 12.5L6.5 8.5L2.5 7L6.5 5.5L8 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M12 11.5l.75 1.75 1.75.75-1.75.75-.75 1.75-.75-1.75-1.75-.75 1.75-.75.75-1.75z" stroke="currentColor" strokeWidth="1" opacity="0.7" />
    </svg>
  ),
  unusualVolume: (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8.5 2c0 0-3.5 2-3.5 5.5a3 3 0 0 0 6 0C11 5 8.5 2 8.5 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M6.5 6c0 0-2.5 1.5-2.5 4a2 2 0 0 0 4 0c0-2-1.5-4-1.5-4z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" opacity="0.7" />
    </svg>
  ),
  priceMovement: (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M2.5 11.5l3.5-3.5 2.5 2.5 5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="9.5,5.5 13.5,5.5 13.5,9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

/* ----------------------------------------------------------
   Sub-navigation items configuration with distinct colors
   ---------------------------------------------------------- */
interface SubItem {
  id: string;
  label: string;
  count?: number;
  icon: React.ReactNode;
  iconColor: string;
}

interface SubSection {
  title?: string;
  items: SubItem[];
}

const subSections: SubSection[] = [
  {
    items: [
      {
        id: "all-intelligence",
        label: "All Intelligence",
        count: 12,
        icon: subIcons.allIntelligence,
        iconColor: "#56D68F", // Mint Green
      },
    ],
  },
  {
    title: "News & Events",
    items: [
      {
        id: "breaking-news",
        label: "Breaking News",
        count: 2,
        icon: subIcons.breakingNews,
        iconColor: "#EA5E5E", // Coral Red
      },
      {
        id: "earnings-results",
        label: "Earnings Results",
        count: 1,
        icon: subIcons.earningsResults,
        iconColor: "#38BDF8", // Sky Blue
      },
      {
        id: "sec-filings",
        label: "SEC Filings",
        count: 1,
        icon: subIcons.secFilings,
        iconColor: "#F59E0B", // Amber Gold
      },
    ],
  },
  {
    title: "Signals & Flows",
    items: [
      {
        id: "analyst-ratings",
        label: "Analyst Ratings",
        count: 1,
        icon: subIcons.analystRatings,
        iconColor: "#FBBF24", // Yellow
      },
      {
        id: "insider-transactions",
        label: "Insider Transactions",
        count: 1,
        icon: subIcons.insiderTransactions,
        iconColor: "#A855F7", // Purple
      },
      {
        id: "institutional-flow",
        label: "Institutional Flow",
        count: 1,
        icon: subIcons.institutionalFlow,
        iconColor: "#3B82F6", // Royal Blue
      },
      {
        id: "options-activity",
        label: "Options Activity",
        count: 1,
        icon: subIcons.optionsActivity,
        iconColor: "#14B8A6", // Teal
      },
      {
        id: "on-chain-signals",
        label: "On-chain Signals",
        count: 1,
        icon: subIcons.onChainSignals,
        iconColor: "#2DD4BF", // Mint Cyan
      },
    ],
  },
  {
    title: "Ideas & Research",
    items: [
      {
        id: "ai-trade-ideas",
        label: "AI Trade Ideas",
        count: 1,
        icon: subIcons.aiTradeIdeas,
        iconColor: "#C084FC", // Sparkle Violet
      },
      {
        id: "unusual-volume",
        label: "Unusual Volume",
        count: 1,
        icon: subIcons.unusualVolume,
        iconColor: "#F97316", // Orange Fire
      },
      {
        id: "price-movement",
        label: "Price Movement",
        count: 1,
        icon: subIcons.priceMovement,
        iconColor: "#2FCB73", // Emerald Green
      },
    ],
  },
];

export default function DashboardSubSidebar() {
  const [activeTab, setActiveTab] = useState<"all" | "stocks" | "crypto" | "meme">("all");
  const [activeSubId, setActiveSubId] = useState<string>("all-intelligence");
  const [earningsModalOpen, setEarningsModalOpen] = useState<boolean>(false);

  const dispatchFilterEvent = (tab: string, subId: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("i5-sidepanel-filter", {
          detail: { tab, subId },
        })
      );
    }
  };

  return (
    <>
      <aside className={styles.subSidebar} aria-label="Dashboard sub navigation">
        {/* Scrollable Container containing everything inside the sidepanel body */}
        <div className={styles.content}>
          {/* Segmented Control Tabs */}
          <div className={styles.tabsContainer}>
            <div className={styles.segmentedControl}>
              <button
                className={`${styles.tabBtn} ${activeTab === "all" ? styles.tabBtnActive : ""}`}
                onClick={() => {
                  setActiveTab("all");
                  dispatchFilterEvent("all", activeSubId);
                }}
              >
                All
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === "meme" ? styles.tabBtnActive : ""}`}
                onClick={() => {
                  setActiveTab("meme");
                  dispatchFilterEvent("meme", activeSubId);
                }}
              >
                Meme
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === "stocks" ? styles.tabBtnActive : ""}`}
                onClick={() => {
                  setActiveTab("stocks");
                  dispatchFilterEvent("stocks", activeSubId);
                }}
              >
                Stocks
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === "crypto" ? styles.tabBtnActive : ""}`}
                onClick={() => {
                  setActiveTab("crypto");
                  dispatchFilterEvent("crypto", activeSubId);
                }}
              >
                Crypto
              </button>
            </div>
          </div>

          {/* Conditional Content: Meme Sidepanel View or Standard Intelligence Sections */}
          {activeTab === "meme" ? (
            <DashboardMemeSidepanel />
          ) : (
            subSections.map((section, idx) => (
              <div key={section.title || idx} className={styles.section}>
                {section.title && (
                  <h3 className={`${styles.sectionTitle} text-overline`}>{section.title}</h3>
                )}
                <ul className={styles.list}>
                  {section.items.map((item) => {
                    const isActive = activeSubId === item.id;
                    return (
                      <li key={item.id}>
                        <button
                          className={`${styles.itemButton} ${
                            isActive ? styles.itemButtonActive : ""
                          }`}
                          onClick={() => {
                            setActiveSubId(item.id);
                            dispatchFilterEvent(activeTab, item.id);
                          }}
                        >
                          <span className={styles.itemIcon} style={{ color: item.iconColor }}>
                            {item.icon}
                          </span>
                          <span className={`${styles.itemLabel} text-body-sm`}>{item.label}</span>
                          {item.count !== undefined && (
                            <span className={styles.itemBadge}>{item.count}</span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>

        {/* Fixed Pinned Bottom Section for Action Callout Banner Card */}
        <div className={styles.bottomSection}>
          <div
            className={styles.actionCard}
            onClick={() => setEarningsModalOpen(true)}
            role="button"
            tabIndex={0}
            aria-label={activeTab === "meme" ? "Open Meme Trenches Terminal" : "Open Upcoming Earnings Overlay Modal"}
          >
            <h4 className={styles.actionTitle}>
              {activeTab === "meme" ? "Live Meme Radar" : "Upcoming Earnings"}
            </h4>
            <span className={styles.animatedArrow}>→</span>
          </div>
        </div>
      </aside>

      {/* Upcoming Earnings Overlay PopUp Modal */}
      <EarningsModal
        isOpen={earningsModalOpen}
        onClose={() => setEarningsModalOpen(false)}
      />
    </>
  );
}
