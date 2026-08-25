"use client";

import React from "react";
import styles from "./Sidebar.module.css";

/* ----------------------------------------------------------
   Navigation Icons (Clean 18x18 SVG strokes)
   ---------------------------------------------------------- */
const navIcons = {
  dashboard: (
    <svg width={18} height={18} viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect x="2" y="2" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="10.5" y="2" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="2" y="10.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="10.5" y="10.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  alphaTrade: (
    <svg width={18} height={18} viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="9" cy="9" rx="3" ry="6.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.5 9h13" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  trade: (
    <svg width={18} height={18} viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M2.5 13.5L6.5 9.5L9.5 12.5L15.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="11.5,4.5 15.5,4.5 15.5,8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  signals: (
    <svg width={18} height={18} viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M2 10.5h2.5l2-6 3 9.5 2.5-6.5h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  marketRadar: (
    <svg width={18} height={18} viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.4" opacity="0.6" />
      <circle cx="9" cy="9" r="1" fill="currentColor" />
      <path d="M9 2.5V9l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  missionsReferrals: (
    <svg width={18} height={18} viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  createAlerts: (
    <svg width={18} height={18} viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M9 2.5a4.5 4.5 0 0 0-4.5 4.5v3.25L3 12.5h12l-1.5-2.25V7A4.5 4.5 0 0 0 9 2.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M7.25 14.5a1.75 1.75 0 0 0 3.5 0" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  community: (
    <svg width={18} height={18} viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.5 14.5a3.5 3.5 0 0 1 7 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="12.5" cy="6" r="2" stroke="currentColor" strokeWidth="1.3" opacity="0.8" />
      <path d="M10 14.5a3 3 0 0 1 5.5 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.8" />
    </svg>
  ),
  leaderboard: (
    <svg width={18} height={18} viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M4.5 3.5h9v5a4.5 4.5 0 0 1-9 0v-5z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4.5 5.5H2.5a1.5 1.5 0 0 0-1.5 1.5v0a2 2 0 0 0 2 2h1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M13.5 5.5h2a1.5 1.5 0 0 1 1.5 1.5v0a2 2 0 0 1-2 2h-1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 13v2.5M6.5 15.5h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  subscription: (
    <svg width={18} height={18} viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect x="2" y="3.5" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2 7.5h14" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 11.5h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
};

/* Collapse / Expand toggle icons */
function IconChevronLeft({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconChevronRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ----------------------------------------------------------
   Menu item definitions
   ---------------------------------------------------------- */
interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  { id: "dashboard", label: "Dashboard", icon: navIcons.dashboard },
  { id: "alpha-trade", label: "Alpha Trade", icon: navIcons.alphaTrade },
  { id: "trade", label: "Trade", icon: navIcons.trade },
  { id: "signals", label: "Signals", icon: navIcons.signals },
  { id: "market-radar", label: "Market Radar", icon: navIcons.marketRadar },
  { id: "missions-referrals", label: "Missions & Referrals", icon: navIcons.missionsReferrals },
  { id: "create-alerts", label: "Create Alerts", icon: navIcons.createAlerts },
  { id: "leaderboard", label: "Leaderboard", icon: navIcons.leaderboard },
  { id: "subscription", label: "Subscription", icon: navIcons.subscription },
];

/* ----------------------------------------------------------
   Nav Item Component
   ---------------------------------------------------------- */
interface NavItemProps {
  item: MenuItem;
  collapsed: boolean;
  active: boolean;
  onClick: () => void;
}

function NavItem({ item, collapsed, active, onClick }: NavItemProps) {
  return (
    <button
      className={`${styles.navItem} ${active ? styles.navItemActive : ""}`}
      onClick={onClick}
      title={collapsed ? item.label : undefined}
      aria-label={item.label}
      aria-current={active ? "page" : undefined}
    >
      <span className={styles.navIcon}>{item.icon}</span>
      {!collapsed && (
        <span className={`${styles.navLabel} text-body-md`}>{item.label}</span>
      )}
    </button>
  );
}

/* ----------------------------------------------------------
   Sidebar Main Component
   ---------------------------------------------------------- */
interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeId: string;
  onSelect: (id: string) => void;
  isDrawerOpen?: boolean;
  isMobile?: boolean;
}

export default function Sidebar({ collapsed, onToggle, activeId, onSelect, isDrawerOpen, isMobile }: SidebarProps) {
  return (
    <aside
      className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""} ${isMobile ? styles.drawerMode : ""} ${isMobile && isDrawerOpen ? styles.drawerOpen : ""}`}
      style={collapsed && !isMobile ? { width: "var(--layout-sidebar-collapsed-width)" } : undefined}
      aria-label="Side navigation"
    >
      {/* Navigation List */}
      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            collapsed={collapsed}
            active={activeId === item.id}
            onClick={() => onSelect(item.id)}
          />
        ))}
      </nav>

      {/* Collapse Toggle Footer */}
      <button
        className={styles.collapseBtn}
        onClick={onToggle}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <IconChevronRight size={14} /> : <IconChevronLeft size={14} />}
        {!collapsed && <span className="text-caption">Collapse Sidebar</span>}
      </button>
    </aside>
  );
}
