"use client";

import React from "react";
import styles from "./MobileBottomNav.module.css";

/* Icons */
function IconDashboard() {
  return (
    <svg width={20} height={20} viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect x="2" y="2" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="10.5" y="2" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="2" y="10.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="10.5" y="10.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function IconTrade() {
  return (
    <svg width={20} height={20} viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M2.5 13.5L6.5 9.5L9.5 12.5L15.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="11.5,4.5 15.5,4.5 15.5,8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconSignals() {
  return (
    <svg width={20} height={20} viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M2 10.5h2.5l2-6 3 9.5 2.5-6.5h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconMeme() {
  return (
    <svg width={20} height={20} viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="9" cy="9" rx="3" ry="6.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.5 9h13" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function IconMore() {
  return (
    <svg width={20} height={20} viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="4" cy="9" r="1.25" fill="currentColor" />
      <circle cx="9" cy="9" r="1.25" fill="currentColor" />
      <circle cx="14" cy="9" r="1.25" fill="currentColor" />
    </svg>
  );
}

interface MobileBottomNavProps {
  activeId: string;
  onSelect: (id: string) => void;
}

const tabs = [
  { id: "dashboard", label: "Home", icon: <IconDashboard /> },
  { id: "trade", label: "Trade", icon: <IconTrade /> },
  { id: "signals", label: "Signals", icon: <IconSignals /> },
  { id: "alpha-trade", label: "Meme", icon: <IconMeme /> },
  { id: "__more__", label: "More", icon: <IconMore /> },
];

export default function MobileBottomNav({ activeId, onSelect }: MobileBottomNavProps) {
  return (
    <nav className={styles.bottomNav} aria-label="Mobile bottom navigation">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.navTab} ${activeId === tab.id ? styles.navTabActive : ""}`}
          onClick={() => onSelect(tab.id)}
          aria-label={tab.label}
          aria-current={activeId === tab.id ? "page" : undefined}
        >
          <span className={styles.navTabIcon}>{tab.icon}</span>
          <span className={styles.navTabLabel}>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
