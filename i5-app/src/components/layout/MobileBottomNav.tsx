"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./MobileBottomNav.module.css";

/* ──────────────────────────────────────────────────────────────
   Nav-bar icons
────────────────────────────────────────────────────────────── */
function IcoDashboard() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="3" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function IcoAlpha() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 12h17" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function IcoTrade() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 17L9 11L13 15L21 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="15,6 21,6 21,12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcoSignals() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M2 14h3.5l2.5-8 4 13 3.5-9 2 4H22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcoPlus() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function IcoClose() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────
   More Popup Icons
────────────────────────────────────────────────────────────── */
function IcoRadar() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.4" opacity="0.55" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <path d="M12 3v9l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IcoAlerts() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3a6 6 0 0 0-6 6v4.5L4 16h16l-2-2.5V9a6 6 0 0 0-6-6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function IcoCommunity() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 20a5 5 0 0 1 10 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="17" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4" opacity="0.8" />
      <path d="M14 20a4 4 0 0 1 7 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

function IcoLeaderboard() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 4h12v7a6 6 0 0 1-12 0V4z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 7H4a2 2 0 0 0-2 2 2.5 2.5 0 0 0 2.5 2.5H6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M18 7h2a2 2 0 0 1 2 2 2.5 2.5 0 0 1-2.5 2.5H18" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 17v3M9.5 20h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IcoMissions() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcoSub() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 15h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────
   Data — Dashboard Popup: Meme / Crypto / Stocks
────────────────────────────────────────────────────────────── */
const DASH_TABS = ["Meme", "Crypto", "Stocks"] as const;
type DashTab = typeof DASH_TABS[number];

const DASH_TAB_MAP: Record<DashTab, string> = {
  Meme: "meme",
  Crypto: "crypto",
  Stocks: "stocks",
};

/* More Popup Items */
interface MoreItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const moreItems: MoreItem[] = [
  { id: "market-radar", label: "Market Radar", icon: <IcoRadar /> },
  { id: "create-alerts", label: "Alerts", icon: <IcoAlerts /> },
  { id: "community", label: "Community", icon: <IcoCommunity /> },
  { id: "leaderboard", label: "Leaderboard", icon: <IcoLeaderboard /> },
  { id: "missions-referrals", label: "Missions", icon: <IcoMissions /> },
  { id: "subscription", label: "Subscription", icon: <IcoSub /> },
];

/* Main Nav Tabs (4 tabs inside the main pill) */
const mainTabs = [
  { id: "dashboard", label: "Dashboard", icon: <IcoDashboard /> },
  { id: "alpha-trade", label: "Alpha Trade", icon: <IcoAlpha /> },
  { id: "trade", label: "Trade", icon: <IcoTrade /> },
  { id: "signals", label: "Signals", icon: <IcoSignals /> },
];

/* ──────────────────────────────────────────────────────────────
   Helpers
────────────────────────────────────────────────────────────── */
function dispatchSidepanel(tab: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("i5-sidepanel-filter", {
      detail: { tab, subId: "all-intelligence", isTabChange: true },
    })
  );
}

/* ──────────────────────────────────────────────────────────────
   Component
────────────────────────────────────────────────────────────── */
interface MobileBottomNavProps {
  activeId: string;
  onSelect: (id: string) => void;
}

export default function MobileBottomNav({ activeId, onSelect }: MobileBottomNavProps) {
  const [subOpen, setSubOpen] = useState<"dashboard" | "more" | null>(null);
  const [activeDashTab, setActiveDashTab] = useState<string>("meme");
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Listen for external sidepanel filter tab changes
  useEffect(() => {
    const h = (e: Event) => {
      const evt = e as CustomEvent<{ tab: string }>;
      if (evt.detail?.tab) {
        const normalized =
          evt.detail.tab === "activities" || evt.detail.tab === "meme"
            ? "meme"
            : evt.detail.tab;
        setActiveDashTab(normalized);
      }
    };
    window.addEventListener("i5-sidepanel-filter", h);
    return () => window.removeEventListener("i5-sidepanel-filter", h);
  }, []);

  // Close when tapping outside
  useEffect(() => {
    if (!subOpen) return;
    const close = (e: MouseEvent | TouchEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setSubOpen(null);
      }
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
    };
  }, [subOpen]);

  const handleNavTab = (tab: typeof mainTabs[0]) => {
    if (tab.id === "dashboard") {
      setSubOpen((prev) => (prev === "dashboard" ? null : "dashboard"));
    } else {
      setSubOpen(null);
      onSelect(tab.id);
    }
  };

  const handlePlusClick = () => {
    setSubOpen((prev) => (prev === "more" ? null : "more"));
  };

  const handleDashTab = (label: DashTab) => {
    const tab = DASH_TAB_MAP[label];
    setActiveDashTab(tab);
    setSubOpen(null); // Close popup card immediately on selection
    onSelect("dashboard");
    setTimeout(() => dispatchSidepanel(tab), 60);
  };

  const handleMoreItem = (id: string) => {
    setSubOpen(null); // Close popup card immediately on selection
    onSelect(id);
  };

  const isNavActive = (tab: typeof mainTabs[0]) => activeId === tab.id;
  const isDashboardOpen = subOpen === "dashboard";
  const isMoreOpen = subOpen === "more";

  return (
    <div ref={wrapperRef} className={styles.navWrapper}>
      {/* Dimmed backdrop when popup is open */}
      {subOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setSubOpen(null)}
          aria-hidden="true"
        />
      )}

      {/* ── Popup Card (Sits BEHIND the navbar with z-index: 10) ── */}
      <div
        className={`${styles.popupContainer} ${
          subOpen ? styles.popupVisible : ""
        }`}
      >
        {subOpen === "dashboard" && (
          <div className={styles.dashCard}>
            <div className={styles.dashTabRow}>
              {DASH_TABS.map((label) => {
                const isActive = activeDashTab === DASH_TAB_MAP[label];
                return (
                  <button
                    key={label}
                    className={`${styles.dashTab} ${
                      isActive ? styles.dashTabActive : ""
                    }`}
                    onClick={() => handleDashTab(label)}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {subOpen === "more" && (
          <div className={styles.moreCard}>
            <div className={styles.moreHeader}>
              <span className={styles.moreTitle}>More Options</span>
              <button
                className={styles.moreClose}
                onClick={() => setSubOpen(null)}
                aria-label="Close"
              >
                <IcoClose />
              </button>
            </div>
            <div className={styles.moreGrid}>
              {moreItems.map((item) => (
                <button
                  key={item.id}
                  className={`${styles.moreItem} ${
                    activeId === item.id ? styles.moreItemActive : ""
                  }`}
                  onClick={() => handleMoreItem(item.id)}
                >
                  <span className={styles.moreIcon}>{item.icon}</span>
                  <span className={styles.moreLabel}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom Nav Bar (Pill with Corner Radius + Plus Button at end) ── */}
      <nav className={styles.bottomNav} aria-label="Mobile navigation">
        <div className={styles.navBarPill}>
          {mainTabs.map((tab) => {
            const active = isNavActive(tab);
            const isTabActive = active || (tab.id === "dashboard" && isDashboardOpen);
            return (
              <button
                key={tab.id}
                className={`${styles.navTab} ${
                  isTabActive ? styles.navTabActive : ""
                }`}
                onClick={() => handleNavTab(tab)}
                aria-label={tab.label}
                aria-current={active ? "page" : undefined}
              >
                <span className={styles.navTabIcon}>{tab.icon}</span>
                <span className={styles.navTabLabel}>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Plus Action Button at the end */}
        <button
          className={`${styles.plusBtn} ${isMoreOpen ? styles.plusBtnActive : ""}`}
          onClick={handlePlusClick}
          aria-label={isMoreOpen ? "Close menu" : "More options"}
        >
          {isMoreOpen ? <IcoClose /> : <IcoPlus />}
        </button>
      </nav>
    </div>
  );
}
