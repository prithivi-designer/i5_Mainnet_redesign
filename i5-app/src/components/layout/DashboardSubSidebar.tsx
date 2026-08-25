"use client";

import React, { useState, useEffect } from "react";
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
  technicalSignals: (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M2 13.5L5.5 8.5L9 11L14 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 3.5H14V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 14v-2M8 14v-1M12 14v-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    </svg>
  ),
  macroSignals: (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2 8h12M8 2a9 9 0 0 1 0 12M8 2a9 9 0 0 0 0 12" stroke="currentColor" strokeWidth="1.2" />
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

/* Filter Icon for Trigger Button */
function IconFilter() {
  return (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M2 3.5h12M4 8h8M6.5 12.5h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* Close Icon */
function IconClose() {
  return (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

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

const cryptoSubSections: SubSection[] = [
  {
    items: [
      {
        id: "all-intelligence",
        label: "All Intelligence",
        count: 5,
        icon: subIcons.allIntelligence,
        iconColor: "#56D68F", // Mint Green
      },
      {
        id: "technical-signals",
        label: "Technical Signals",
        count: 2,
        icon: subIcons.technicalSignals,
        iconColor: "#38BDF8", // Sky Blue
      },
      {
        id: "macro-signals",
        label: "Macro Signals",
        count: 1,
        icon: subIcons.macroSignals,
        iconColor: "#F59E0B", // Amber Gold
      },
    ],
  },
  {
    title: "IDEAS & RESEARCH",
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

const stocksSubSections: SubSection[] = [
  {
    items: [
      {
        id: "all-intelligence",
        label: "All Intelligence",
        count: 8,
        icon: subIcons.allIntelligence,
        iconColor: "#56D68F", // Mint Green
      },
    ],
  },
  {
    title: "NEWS & FILINGS",
    items: [
      {
        id: "breaking-news",
        label: "Breaking News",
        count: 2,
        icon: subIcons.breakingNews,
        iconColor: "#60A5FA", // Soft Blue
      },
      {
        id: "earnings-results",
        label: "Earnings Results",
        count: 1,
        icon: subIcons.earningsResults,
        iconColor: "#34D399", // Emerald
      },
      {
        id: "sec-filings",
        label: "SEC Filings",
        count: 1,
        icon: subIcons.secFilings,
        iconColor: "#FBBF24", // Warm Amber
      },
    ],
  },
  {
    title: "SIGNALS & FLOWS",
    items: [
      {
        id: "analyst-ratings",
        label: "Analyst Ratings",
        count: 1,
        icon: subIcons.analystRatings,
        iconColor: "#A78BFA", // Lavender
      },
      {
        id: "insider-transactions",
        label: "Insider Transactions",
        count: 1,
        icon: subIcons.insiderTransactions,
        iconColor: "#F87171", // Coral Rose
      },
      {
        id: "institutional-flow",
        label: "Institutional Flow",
        count: 1,
        icon: subIcons.institutionalFlow,
        iconColor: "#38BDF8", // Sky Blue
      },
      {
        id: "options-activity",
        label: "Options Activity",
        count: 1,
        icon: subIcons.optionsActivity,
        iconColor: "#14B8A6", // Teal
      },
    ],
  },
  {
    title: "IDEAS & RESEARCH",
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

interface DashboardSubSidebarProps {
  mobileBottomSheet?: boolean;
}

export default function DashboardSubSidebar({ mobileBottomSheet }: DashboardSubSidebarProps) {
  const [activeTab, setActiveTab] = useState<"meme" | "crypto" | "stocks">("meme");
  const [activeSubId, setActiveSubId] = useState<string>("all-intelligence");
  const [earningsModalOpen, setEarningsModalOpen] = useState<boolean>(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);

  // Sync tab state when external events fire
  useEffect(() => {
    const handler = (e: Event) => {
      const evt = e as CustomEvent<{ tab: string; subId: string }>;
      if (evt.detail?.tab && (evt.detail.tab === "meme" || evt.detail.tab === "crypto" || evt.detail.tab === "stocks")) {
        setActiveTab(evt.detail.tab as "meme" | "crypto" | "stocks");
      }
      if (evt.detail?.subId) {
        setActiveSubId(evt.detail.subId);
      }
    };
    window.addEventListener("i5-sidepanel-filter", handler);
    return () => window.removeEventListener("i5-sidepanel-filter", handler);
  }, []);

  const dispatchFilterEvent = (tab: string, subId: string, isTabChange?: boolean) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("i5-sidepanel-filter", {
          detail: { tab, subId, isTabChange },
        })
      );
    }
  };

  const handleTabSelect = (tab: "meme" | "crypto" | "stocks") => {
    setActiveTab(tab);
    dispatchFilterEvent(tab, "all-intelligence", true);
    setActiveSubId("all-intelligence");
  };

  const handleSubItemSelect = (subId: string) => {
    setActiveSubId(subId);
    dispatchFilterEvent(activeTab, subId);
    // On mobile, close bottom sheet upon selection
    setIsBottomSheetOpen(false);
  };

  const currentSections = activeTab === "crypto" ? cryptoSubSections : stocksSubSections;

  // Active filter label text for display in the mobile trigger
  const getActiveFilterLabel = () => {
    if (activeTab === "meme") return "Live Meme Radar";
    const found = currentSections.flatMap((s) => s.items).find((i) => i.id === activeSubId);
    return found ? found.label : "All Intelligence";
  };

  /* ── Mobile Bottom Sheet Mode ───────────────────────────── */
  if (mobileBottomSheet) {
    return (
      <>
        {/* Mobile Filter Bar Trigger (pinned at top of dashboard main content) */}
        <div className={styles.mobileFilterBar}>
          {/* Quick tab switcher pills */}
          <div className={styles.mobileTabsGroup}>
            <button
              className={`${styles.mobileTabPill} ${activeTab === "meme" ? styles.mobileTabPillActive : ""}`}
              onClick={() => handleTabSelect("meme")}
            >
              🔥 Meme
            </button>
            <button
              className={`${styles.mobileTabPill} ${activeTab === "crypto" ? styles.mobileTabPillActive : ""}`}
              onClick={() => handleTabSelect("crypto")}
            >
              ₿ Crypto
            </button>
            <button
              className={`${styles.mobileTabPill} ${activeTab === "stocks" ? styles.mobileTabPillActive : ""}`}
              onClick={() => handleTabSelect("stocks")}
            >
              📈 Stocks
            </button>
          </div>

          {/* Trigger Button that slides up the Bottom Sheet */}
          <button
            className={styles.mobileFilterBtn}
            onClick={() => setIsBottomSheetOpen(true)}
            aria-label="Open filter bottom sheet"
          >
            <IconFilter />
            <span>Filters</span>
            <span className={styles.mobileFilterBadge}>
              {activeTab === "meme" ? "42" : activeTab === "crypto" ? "4" : "8"}
            </span>
          </button>
        </div>

        {/* Bottom Sheet Backdrop */}
        {isBottomSheetOpen && (
          <div
            className={styles.bottomSheetBackdrop}
            onClick={() => setIsBottomSheetOpen(false)}
            aria-hidden
          />
        )}

        {/* Slide-up Bottom Sheet Modal */}
        <div
          className={`${styles.bottomSheet} ${isBottomSheetOpen ? styles.bottomSheetOpen : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label="Dashboard Intelligence Filters"
        >
          {/* Pull Handle Bar */}
          <div className={styles.sheetHandle} onClick={() => setIsBottomSheetOpen(false)} />

          {/* Sheet Header */}
          <div className={styles.sheetHeader}>
            <div className={styles.sheetHeaderLeft}>
              <h3 className={styles.sheetTitle}>Market Intelligence</h3>
              <span className={styles.sheetActiveTag}>{getActiveFilterLabel()}</span>
            </div>
            <button
              className={styles.sheetCloseBtn}
              onClick={() => setIsBottomSheetOpen(false)}
              aria-label="Close bottom sheet"
            >
              <IconClose />
            </button>
          </div>

          {/* Segmented Control Tabs */}
          <div className={styles.sheetTabsWrapper}>
            <div className={styles.segmentedControl}>
              <button
                className={`${styles.tabBtn} ${activeTab === "meme" ? styles.tabBtnActive : ""}`}
                onClick={() => handleTabSelect("meme")}
              >
                Meme
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === "crypto" ? styles.tabBtnActive : ""}`}
                onClick={() => handleTabSelect("crypto")}
              >
                Crypto
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === "stocks" ? styles.tabBtnActive : ""}`}
                onClick={() => handleTabSelect("stocks")}
              >
                Stocks
              </button>
            </div>
          </div>

          {/* Scrollable Content inside Bottom Sheet */}
          <div className={styles.sheetContent}>
            {activeTab === "meme" ? (
              <DashboardMemeSidepanel />
            ) : (
              currentSections.map((section, idx) => (
                <div key={section.title || idx} className={styles.section}>
                  {section.title && (
                    <h4 className={`${styles.sectionTitle} text-overline`}>{section.title}</h4>
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
                            onClick={() => handleSubItemSelect(item.id)}
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

          {/* Fixed Bottom Section for Action Callout Banner Card */}
          <div className={styles.sheetBottomSection}>
            <div
              className={styles.actionCard}
              onClick={() => {
                setIsBottomSheetOpen(false);
                setEarningsModalOpen(true);
              }}
              role="button"
              tabIndex={0}
              aria-label={
                activeTab === "meme"
                  ? "Open Live Meme Radar"
                  : activeTab === "crypto"
                  ? "Open Upcoming Token Unlocks"
                  : "Open Upcoming Earnings Overlay Modal"
              }
            >
              <h4 className={styles.actionTitle}>
                {activeTab === "meme"
                  ? "Live Meme Radar"
                  : activeTab === "crypto"
                  ? "Upcoming Unlocks"
                  : "Upcoming Earnings"}
              </h4>
              <span className={styles.animatedArrow}>→</span>
            </div>
          </div>
        </div>

        {/* Upcoming Earnings / Catalyst Overlay PopUp Modal */}
        <EarningsModal
          isOpen={earningsModalOpen}
          onClose={() => setEarningsModalOpen(false)}
        />
      </>
    );
  }

  /* ── Desktop Fixed Sub-Sidebar ──────────────────────────── */
  return (
    <>
      <aside className={styles.subSidebar} aria-label="Dashboard sub navigation">
        {/* Scrollable Container containing everything inside the sidepanel body */}
        <div className={styles.content}>
          {/* Segmented Control Tabs */}
          <div className={styles.tabsContainer}>
            <div className={styles.segmentedControl}>
              <button
                className={`${styles.tabBtn} ${activeTab === "meme" ? styles.tabBtnActive : ""}`}
                onClick={() => handleTabSelect("meme")}
              >
                Meme
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === "crypto" ? styles.tabBtnActive : ""}`}
                onClick={() => handleTabSelect("crypto")}
              >
                Crypto
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === "stocks" ? styles.tabBtnActive : ""}`}
                onClick={() => handleTabSelect("stocks")}
              >
                Stocks
              </button>
            </div>
          </div>

          {/* Conditional Content: Meme Sidepanel View or Tab Sections */}
          {activeTab === "meme" ? (
            <DashboardMemeSidepanel />
          ) : (
            currentSections.map((section, idx) => (
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
            aria-label={
              activeTab === "meme"
                ? "Open Live Meme Radar"
                : activeTab === "crypto"
                ? "Open Upcoming Token Unlocks"
                : "Open Upcoming Earnings Overlay Modal"
            }
          >
            <h4 className={styles.actionTitle}>
              {activeTab === "meme"
                ? "Live Meme Radar"
                : activeTab === "crypto"
                ? "Upcoming Unlocks"
                : "Upcoming Earnings"}
            </h4>
            <span className={styles.animatedArrow}>→</span>
          </div>
        </div>
      </aside>

      {/* Upcoming Earnings / Catalyst Overlay PopUp Modal */}
      <EarningsModal
        isOpen={earningsModalOpen}
        onClose={() => setEarningsModalOpen(false)}
      />
    </>
  );
}
