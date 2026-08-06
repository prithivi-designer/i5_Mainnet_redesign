import type { Metadata } from "next";
import MarketOverviewGrid from "@/components/dashboard/MarketOverviewGrid";
import IntelligenceBriefingGrid from "@/components/dashboard/IntelligenceBriefingGrid";
import MarketBreadthCard from "@/components/dashboard/MarketBreadthCard";
import MarketAssetTableCard from "@/components/dashboard/MarketAssetTableCard";
import IntelligenceFeed from "@/components/dashboard/IntelligenceFeed";

export const metadata: Metadata = {
  title: "Dashboard | i5 Mainnet",
};

export default function HomePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {/* Top Market Overview Metric Cards Auto-Scroller */}
      <MarketOverviewGrid />

      {/* Title & Subtitle Section below top scroller */}
      <div style={{ paddingLeft: "var(--space-1)", marginBottom: "var(--space-6)" }}>
        <h2
          className="text-h2"
          style={{
            color: "var(--text-primary)",
            fontWeight: 700,
            fontSize: "26px",
            lineHeight: "32px",
            letterSpacing: "-0.02em",
          }}
        >
          i5 Market Intelligence
        </h2>
        <p
          className="text-body-md"
          style={{
            color: "var(--text-tertiary)",
            fontSize: "14px",
            lineHeight: "20px",
            marginTop: "var(--space-1)",
          }}
        >
          AI briefing · updated 1m ago
        </p>
      </div>

      {/* Intelligence Briefing Metric Cards */}
      <IntelligenceBriefingGrid />

      {/* Two Column Layout: Market Breadth (Vertical Stack) + Market Asset Radar (Table) */}
      <div
        style={{
          display: "flex",
          gap: "var(--space-6)",
          width: "100%",
          marginBottom: "var(--space-6)",
          alignItems: "stretch",
        }}
      >
        {/* Left Column: Vertical Stacked Market Breadth Strength Card */}
        <MarketBreadthCard />

        {/* Right Column: Market Asset Radar Table Card */}
        <MarketAssetTableCard />
      </div>

      {/* Live Intelligence Feed Cards (Linked with Side Panel) */}
      <IntelligenceFeed />
    </div>
  );
}
