"use client";

import { useState, useEffect } from "react";
import MarketOverviewGrid from "@/components/dashboard/MarketOverviewGrid";
import MarketAssetTableCard from "@/components/dashboard/MarketAssetTableCard";
import BubbleMapCard from "@/components/dashboard/BubbleMapCard";
import IntelligenceFeed from "@/components/dashboard/IntelligenceFeed";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<string>("meme");

  useEffect(() => {
    const handler = (e: Event) => {
      const evt = e as CustomEvent<{ tab: string; subId: string }>;
      if (evt.detail?.tab) {
        const normalized =
          evt.detail.tab === "activities" || evt.detail.tab === "meme"
            ? "meme"
            : evt.detail.tab;
        setActiveTab(normalized);
      }
    };
    window.addEventListener("i5-sidepanel-filter", handler);
    return () => window.removeEventListener("i5-sidepanel-filter", handler);
  }, []);

  const isMeme = activeTab === "meme" || activeTab === "activities";

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: isMeme ? "100%" : undefined }}>
      {/* Top Market Overview Metric Cards Auto-Scroller — hidden on meme */}
      {!isMeme && <MarketOverviewGrid />}

      {/* Title & Subtitle — hidden on meme */}
      {!isMeme && (
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
      )}

      {/* Two Column Row: Market Asset Radar Table + Crypto Bubble Map — hidden on meme */}
      {!isMeme && (
        <div
          style={{
            display: "flex",
            gap: "var(--space-6)",
            width: "100%",
            marginBottom: "var(--space-6)",
            alignItems: "stretch",
            flexWrap: "wrap",
          }}
        >
          <MarketAssetTableCard />
          <BubbleMapCard />
        </div>
      )}

      {/* Live Intelligence Feed / Meme Launchpad */}
      <IntelligenceFeed />
    </div>
  );
}
