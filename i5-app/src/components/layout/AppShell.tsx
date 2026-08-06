"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardSubSidebar from "./DashboardSubSidebar";
import Topbar from "./Topbar";
import styles from "./AppShell.module.css";
import AlphaTradeView from "@/components/dashboard/AlphaTradeView";
import dynamic from "next/dynamic";

interface AppShellProps {
  children: React.ReactNode;
}

/* ── Lazy-loaded page views ─────────────────────────────── */
const TradeView = dynamic(() => import("@/views/TradeView"), { ssr: false });
const SignalsView = dynamic(() => import("@/views/SignalsView"), { ssr: false });
const AgentMarketplaceView = dynamic(() => import("@/views/AgentMarketplaceView"), { ssr: false });
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
    case "agent-marketplace":
      return <AgentMarketplaceView />;
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

  const isDashboard = activeId === "dashboard";

  // Dashboard active forces the main sidebar to be collapsed
  const isMainSidebarCollapsed = isDashboard ? true : collapsed;

  // Total sidebar width for content offset
  // Dashboard: 72px rail + 12px gap + 240px floating panel + 12px right gap = 336px
  // Non-dashboard collapsed: 72px
  // Non-dashboard expanded: 260px
  const totalSidebarWidth = isDashboard
    ? "336px"
    : isMainSidebarCollapsed
    ? "var(--layout-sidebar-collapsed-width)" // 72px
    : "var(--layout-sidebar-width)"; // 260px

  return (
    <div className={styles.shell}>
      {/* Full-width header spanning top (100% width) */}
      <Topbar />

      {/* Primary Sidebar */}
      <Sidebar
        collapsed={isMainSidebarCollapsed}
        onToggle={() => setCollapsed((v) => !v)}
        activeId={activeId}
        onSelect={(id) => setActiveId(id)}
      />

      {/* Secondary Floating Sub-Sidebar (only visible when Dashboard is active) */}
      {isDashboard && <DashboardSubSidebar />}

      {/* Right column: main content */}
      <div
        className={styles.body}
        style={
          {
            "--sidebar-w": totalSidebarWidth,
          } as React.CSSProperties
        }
      >
        <main className={styles.main}>
          <PageRouter activeId={activeId} dashboardChildren={children} />
        </main>
      </div>
    </div>
  );
}
