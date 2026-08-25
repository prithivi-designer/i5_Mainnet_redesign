"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import DashboardSubSidebar from "./DashboardSubSidebar";
import Topbar from "./Topbar";
import MobileBottomNav from "./MobileBottomNav";
import styles from "./AppShell.module.css";
import AlphaTradeView from "@/components/dashboard/AlphaTradeView";
import dynamic from "next/dynamic";

interface AppShellProps {
  children: React.ReactNode;
}

/* ── Lazy-loaded page views ─────────────────────────────── */
const TradeView = dynamic(() => import("@/views/TradeView"), { ssr: false });
const SignalsView = dynamic(() => import("@/views/SignalsView"), { ssr: false });
const MarketRadarView = dynamic(() => import("@/views/MarketRadarView"), { ssr: false });
const MissionsView = dynamic(() => import("@/views/MissionsView"), { ssr: false });
const CreateAlertsView = dynamic(() => import("@/views/CreateAlertsView"), { ssr: false });
const CommunityView = dynamic(() => import("@/views/CommunityView"), { ssr: false });
const LeaderboardView = dynamic(() => import("@/views/LeaderboardView"), { ssr: false });
const SubscriptionView = dynamic(() => import("@/views/SubscriptionView"), { ssr: false });

/* ── Page router ────────────────────────────────────────── */
function PageRouter({
  activeId,
  dashboardChildren,
}: {
  activeId: string;
  dashboardChildren: React.ReactNode;
}) {
  switch (activeId) {
    case "dashboard":
      return <>{dashboardChildren}</>;
    case "alpha-trade":
      return <AlphaTradeView />;
    case "trade":
      return <TradeView />;
    case "signals":
      return <SignalsView />;
    case "market-radar":
      return <MarketRadarView />;
    case "missions-referrals":
      return <MissionsView />;
    case "create-alerts":
      return <CreateAlertsView />;
    case "community":
      return <CommunityView />;
    case "leaderboard":
      return <LeaderboardView />;
    case "subscription":
      return <SubscriptionView />;
    default:
      return <>{dashboardChildren}</>;
  }
}

/* ── App Shell ──────────────────────────────────────────── */
export default function AppShell({ children }: AppShellProps) {
  const [activeId, setActiveId] = useState<string>("dashboard");
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  // Responsive state
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);

  useEffect(() => {
    const checkBreakpoints = () => {
      const w = window.innerWidth;
      setIsMobile(w < 640);
      setIsTablet(w >= 640 && w < 1024);
    };
    checkBreakpoints();
    window.addEventListener("resize", checkBreakpoints);
    return () => window.removeEventListener("resize", checkBreakpoints);
  }, []);

  // Listen for global view navigation events (e.g. from token clicks)
  useEffect(() => {
    const handleNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<{ targetId?: string; symbol?: string }>;
      if (customEvent.detail?.targetId) {
        setActiveId(customEvent.detail.targetId);
        setIsMobileDrawerOpen(false);
      }
    };
    window.addEventListener("i5-navigate", handleNavigate as EventListener);
    return () => window.removeEventListener("i5-navigate", handleNavigate as EventListener);
  }, []);

  // Close mobile drawer when navigating
  const handleSelect = (id: string) => {
    setActiveId(id);
    setIsMobileDrawerOpen(false);
  };

  const isDashboard = activeId === "dashboard";

  // Dashboard active forces the main sidebar to be collapsed (on desktop)
  const isMainSidebarCollapsed = isMobile
    ? true  // always "collapsed" on mobile (becomes drawer)
    : isDashboard
    ? true
    : collapsed;

  // Sidebar width for content body offset
  // Mobile: 0 (sidebar is off-canvas drawer, not in flow)
  // Tablet: 72px collapsed icon rail
  // Desktop dashboard: 72px rail + 12px gap + 270px sub-panel + 12px = 366px
  // Desktop non-dashboard expanded: 260px
  const totalSidebarWidth = isMobile
    ? "0px"
    : isTablet
    ? "var(--layout-sidebar-collapsed-width)" // 72px always on tablet
    : isDashboard
    ? "366px"
    : isMainSidebarCollapsed
    ? "var(--layout-sidebar-collapsed-width)"
    : "var(--layout-sidebar-width)";

  return (
    <div className={styles.shell}>
      {/* Full-width header spanning top (100% width) */}
      <Topbar
        onMenuToggle={isMobile || isTablet ? () => setIsMobileDrawerOpen((v) => !v) : undefined}
        showMenuBtn={isMobile || isTablet}
      />

      {/* Mobile/Tablet: Drawer backdrop */}
      {(isMobile || isTablet) && isMobileDrawerOpen && (
        <div
          className={styles.drawerBackdrop}
          onClick={() => setIsMobileDrawerOpen(false)}
          aria-hidden
        />
      )}

      {/* Primary Sidebar */}
      <Sidebar
        collapsed={isMainSidebarCollapsed}
        onToggle={() => setCollapsed((v) => !v)}
        activeId={activeId}
        onSelect={handleSelect}
        isDrawerOpen={isMobileDrawerOpen}
        isMobile={isMobile || isTablet}
      />

      {/* Secondary Floating Sub-Sidebar (only visible when Dashboard is active, desktop only) */}
      {isDashboard && !isMobile && !isTablet && <DashboardSubSidebar />}

      {/* Right column: main content */}
      <div
        className={styles.body}
        style={
          {
            "--sidebar-w": totalSidebarWidth,
            marginLeft: totalSidebarWidth,
            width: `calc(100vw - ${totalSidebarWidth})`,
          } as React.CSSProperties
        }
      >
        <main className={`${styles.main} ${isMobile ? styles.mainMobile : ""}`}>
          {/* Mobile: Dashboard sub-sidebar as bottom sheet triggered by filter button */}
          {isDashboard && (isMobile || isTablet) && (
            <DashboardSubSidebar mobileBottomSheet />
          )}
          <PageRouter activeId={activeId} dashboardChildren={children} />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav activeId={activeId} onSelect={handleSelect} />
    </div>
  );
}
