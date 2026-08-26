"use client";

import { useState, useEffect } from "react";
import MarketOverviewGrid from "@/components/dashboard/MarketOverviewGrid";
import MarketAssetTableCard from "@/components/dashboard/MarketAssetTableCard";
import BubbleMapCard from "@/components/dashboard/BubbleMapCard";
import IntelligenceFeed from "@/components/dashboard/IntelligenceFeed";
import styles from "./HomePage.module.css";

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
    <div className={`${styles.homeContainer} ${isMeme ? styles.homeContainerMeme : ""}`}>
      {/* Top Market Overview Metric Cards Auto-Scroller — hidden on meme */}
      {!isMeme && <MarketOverviewGrid />}

      {/* Title & Subtitle — hidden on meme */}
      {!isMeme && (
        <div className={styles.titleContainer}>
          <h2 className={styles.pageTitle}>
            i5 Market Intelligence
          </h2>
          <p className={styles.pageSubtitle}>
            AI briefing · updated 1m ago
          </p>
        </div>
      )}

      {/* Two Column Row: Market Asset Radar Table + Crypto Bubble Map — hidden on meme */}
      {!isMeme && (
        <div className={styles.twoColumnRow}>
          <MarketAssetTableCard />
          <BubbleMapCard />
        </div>
      )}

      {/* Live Intelligence Feed / Meme Launchpad */}
      <IntelligenceFeed />
    </div>
  );
}
