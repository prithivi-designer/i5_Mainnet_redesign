"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./IntelligenceFeed.module.css";
import AnalysisDetailModal from "./AnalysisDetailModal";
import MemeTrenchesView from "./MemeTrenchesView";
import SmartMoneyTerminalView from "./SmartMoneyTerminalView";
import MemeLaunchpadView from "./MemeLaunchpadView";

export interface FeedItem {
  id: string;
  ticker: string;
  companyName: string;
  avatarBg: string;
  category: string; // e.g. "EARNINGS RESULTS", "BREAKING NEWS", "PRICE MOVEMENT"
  assetType?: "STOCKS" | "CRYPTO" | "MEME";
  stance: "BULLISH" | "BEARISH" | "NEUTRAL";
  position?: "LONG" | "SHORT";
  title: string;
  summary: string;
  timeAgo: string;
  source: string;
  publishPrice: string;
  priceChange: string;
  isPositiveChange: boolean;
  aiConfidence: number;
}

const mockFeedData: FeedItem[] = [
  {
    id: "1",
    ticker: "NVDA",
    companyName: "NVIDIA Corp.",
    avatarBg: "#163A24",
    category: "EARNINGS RESULTS",
    assetType: "STOCKS",
    stance: "BULLISH",
    position: "LONG",
    title: "NVIDIA beats on EPS and revenue, guides Q3 datacenter above street",
    summary:
      "EPS of $1.24 vs $1.11 est. and $52.1B revenue vs $49.8B est. Guidance of $58B implies datacenter reacceleration; management flagged Blackwell supply as the only constraint.",
    timeAgo: "35m ago",
    source: "Company IR",
    publishPrice: "$179.80 at publish",
    priceChange: "+4.21%",
    isPositiveChange: true,
    aiConfidence: 84,
  },
  {
    id: "2",
    ticker: "MSFT",
    companyName: "Microsoft Corp.",
    avatarBg: "#112F4E",
    category: "BREAKING NEWS",
    assetType: "STOCKS",
    stance: "BULLISH",
    title: "Microsoft says Azure AI revenue run-rate crossed $18B, up 41% YoY",
    summary:
      "Cloud growth reaccelerated for a second straight quarter, with capacity constraints easing in North America. Management reiterated FY capex above $80B.",
    timeAgo: "1h ago",
    source: "Benzinga",
    publishPrice: "$422.10 at publish",
    priceChange: "+1.62%",
    isPositiveChange: true,
    aiConfidence: 71,
  },
  {
    id: "3",
    ticker: "TSLA",
    companyName: "Tesla Inc.",
    avatarBg: "#4A181C",
    category: "PRICE MOVEMENT",
    assetType: "STOCKS",
    stance: "BEARISH",
    position: "SHORT",
    title: "Tesla Q2 deliveries land at 384,100 — roughly 6% below consensus",
    summary:
      "Europe weakness and an aging model lineup drove the miss. Energy storage deployments were a bright spot at 12.4 GWh but cannot offset auto gross margin pressure.",
    timeAgo: "1h ago",
    source: "Company IR",
    publishPrice: "$263.10 at publish",
    priceChange: "-4.31%",
    isPositiveChange: false,
    aiConfidence: 68,
  },
  {
    id: "4",
    ticker: "AAPL",
    companyName: "Apple Inc.",
    avatarBg: "#2B2B2F",
    category: "ANALYST RATINGS",
    assetType: "STOCKS",
    stance: "BULLISH",
    position: "LONG",
    title: "Morgan Stanley upgrades Apple to Overweight on AI iPhone supercycle",
    summary:
      "Analyst raises price target to $273 citing accelerating upgrade velocity in China and edge AI features driving premium mix expansion across the lineup.",
    timeAgo: "2h ago",
    source: "Morgan Stanley",
    publishPrice: "$224.30 at publish",
    priceChange: "+2.85%",
    isPositiveChange: true,
    aiConfidence: 79,
  },
  {
    id: "6",
    ticker: "AMD",
    companyName: "Advanced Micro Devices",
    avatarBg: "#3A2A14",
    category: "AI COMPUTE",
    assetType: "STOCKS",
    stance: "BULLISH",
    position: "LONG",
    title: "AMD MI350X chip benchmarks show 1.4x inferencing lead over H100",
    summary:
      "Hyperscale customer trials report smooth software stack migration via ROCm 6.2, driving higher allocation expectations for Q4 server shipments.",
    timeAgo: "4h ago",
    source: "Semiconductor Today",
    publishPrice: "$156.40 at publish",
    priceChange: "+5.12%",
    isPositiveChange: true,
    aiConfidence: 88,
  },
  {
    id: "crypto-options-1",
    ticker: "SOL",
    companyName: "Solana Protocol",
    avatarBg: "#1F2B37",
    category: "OPTIONS ACTIVITY",
    assetType: "CRYPTO",
    stance: "BULLISH",
    title: "Solana call volume surges 340% as $180 strike open interest explodes",
    summary:
      "Deribit options data reveals aggressive institutional call buying for Q3 expiry, signaling strong bullish sentiment ahead of Firedancer testnet metrics.",
    timeAgo: "6h ago",
    source: "Deribit Metrics",
    publishPrice: "$172.50 at publish",
    priceChange: "+6.42%",
    isPositiveChange: true,
    aiConfidence: 85,
  },
  {
    id: "crypto-ai-1",
    ticker: "BTC",
    companyName: "Bitcoin Network",
    avatarBg: "#3A2A14",
    category: "AI TRADE IDEAS",
    assetType: "CRYPTO",
    stance: "BULLISH",
    position: "LONG",
    title: "AI Quantitative Model: Spot institutional accumulation indicates breakout setup",
    summary:
      "On-chain ETF flow velocity and exchange reserve depletion flag a high-probability bullish expansion toward $72K resistance.",
    timeAgo: "2h ago",
    source: "i5 Quantitative AI",
    publishPrice: "$67,420.00 at publish",
    priceChange: "+3.85%",
    isPositiveChange: true,
    aiConfidence: 89,
  },
  {
    id: "crypto-vol-1",
    ticker: "SUI",
    companyName: "Sui Network",
    avatarBg: "#163A24",
    category: "UNUSUAL VOLUME",
    assetType: "CRYPTO",
    stance: "BULLISH",
    position: "LONG",
    title: "Sui on-chain 24h DEX trading volume spikes +310% to record $1.42B",
    summary:
      "Massive liquidity inflows into Sui ecosystem protocols driven by zero-slippage AMMs and major centralized exchange staking integrations.",
    timeAgo: "3h ago",
    source: "DeFiLlama",
    publishPrice: "$3.45 at publish",
    priceChange: "+12.40%",
    isPositiveChange: true,
    aiConfidence: 86,
  },
  {
    id: "crypto-price-1",
    ticker: "AVAX",
    companyName: "Avalanche",
    avatarBg: "#4A181C",
    category: "PRICE MOVEMENT",
    assetType: "CRYPTO",
    stance: "BULLISH",
    position: "LONG",
    title: "Avalanche surges +9.8% on Wall Street real-world asset (RWA) tokenization pilot",
    summary:
      "Major global asset manager deploys $500M tokenized fund testnet on dedicated Avalanche Evergreen Subnet with institutional compliance tooling.",
    timeAgo: "4h ago",
    source: "Coindesk",
    publishPrice: "$32.80 at publish",
    priceChange: "+9.80%",
    isPositiveChange: true,
    aiConfidence: 81,
  },
  {
    id: "9",
    ticker: "COIN",
    companyName: "Coinbase Global Inc.",
    avatarBg: "#112F4E",
    category: "SEC FILINGS",
    assetType: "STOCKS",
    stance: "NEUTRAL",
    title: "Coinbase files Form 8-K announcing expansion of institutional prime services",
    summary:
      "SEC filing detail discloses strategic asset acquisition for staking custody infrastructure, boosting institutional fee margin projections.",
    timeAgo: "7h ago",
    source: "SEC EDGAR",
    publishPrice: "$242.10 at publish",
    priceChange: "+1.15%",
    isPositiveChange: true,
    aiConfidence: 74,
  },
  {
    id: "10",
    ticker: "PLTR",
    companyName: "Palantir Technologies",
    avatarBg: "#2B2B2F",
    category: "UNUSUAL VOLUME",
    assetType: "STOCKS",
    stance: "BULLISH",
    position: "LONG",
    title: "Palantir trades 3.2x average daily volume following Defense Department award",
    summary:
      "AIP adoption in military logistics contracts drives unprecedented institutional accumulation with block trades over 500k shares.",
    timeAgo: "8h ago",
    source: "MarketWatch",
    publishPrice: "$28.40 at publish",
    priceChange: "+8.90%",
    isPositiveChange: true,
    aiConfidence: 91,
  },
  {
    id: "11",
    ticker: "META",
    companyName: "Meta Platforms Inc.",
    avatarBg: "#163A24",
    category: "INSIDER TRANSACTIONS",
    assetType: "STOCKS",
    stance: "NEUTRAL",
    title: "Form 4 filing indicates scheduled 10b5-1 executive stock sale",
    summary:
      "Pre-planned insider transaction of 25,000 shares executed at market price, maintaining over 98% of executive holding intact.",
    timeAgo: "9h ago",
    source: "SEC EDGAR",
    publishPrice: "$512.30 at publish",
    priceChange: "-0.45%",
    isPositiveChange: false,
    aiConfidence: 65,
  },
  {
    id: "12",
    ticker: "PEPE",
    companyName: "Pepe Coin",
    avatarBg: "#14532D",
    category: "PRICE MOVEMENT",
    assetType: "MEME",
    stance: "BULLISH",
    position: "LONG",
    title: "PEPE surges 22% in 24 hours amid massive retail accumulation",
    summary:
      "DEX volume indicates heavy on-chain buying on Uniswap, with top whale wallets adding over 2 trillion tokens to their balances.",
    timeAgo: "2h ago",
    source: "DEXTools",
    publishPrice: "$0.0000124 at publish",
    priceChange: "+22.40%",
    isPositiveChange: true,
    aiConfidence: 89,
  },
  {
    id: "13",
    ticker: "WIF",
    companyName: "Dogwifhat",
    avatarBg: "#7C2D12",
    category: "UNUSUAL VOLUME",
    assetType: "MEME",
    stance: "BULLISH",
    position: "LONG",
    title: "Solana meme token WIF hits new high with institutional market maker interest",
    summary:
      "Aggregated futures open interest on Binance and Bybit surges to record $450M as WIF breaks key resistance levels.",
    timeAgo: "4h ago",
    source: "Coinglass",
    publishPrice: "$3.85 at publish",
    priceChange: "+14.10%",
    isPositiveChange: true,
    aiConfidence: 82,
  },
];

const feedFilterTabs = [
  { id: "timeline", label: "Timeline" },
  { id: "results", label: "Results" },
  { id: "latest-news", label: "Latest News" },
  { id: "trade-ideas", label: "Trade Ideas" },
  { id: "sec-filings", label: "SEC Filings" },
];

const sidepanelSubIdToCategory: Record<string, string[]> = {
  "all-intelligence": [],
  "breaking-news": ["BREAKING NEWS"],
  "earnings-results": ["EARNINGS RESULTS"],
  "sec-filings": ["SEC FILINGS"],
  "analyst-ratings": ["ANALYST RATINGS"],
  "insider-transactions": ["INSIDER TRANSACTIONS"],
  "institutional-flow": ["INSTITUTIONAL FLOW"],
  "options-activity": ["OPTIONS ACTIVITY"],
  "on-chain-signals": ["ON-CHAIN SIGNALS"],
  "ai-trade-ideas": ["AI TRADE IDEAS", "AI COMPUTE"],
  "unusual-volume": ["UNUSUAL VOLUME"],
  "price-movement": ["PRICE MOVEMENT"],
};

export default function IntelligenceFeed() {
  const [activeTab, setActiveTab] = useState<string>("timeline");
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [selectedAnalysisItem, setSelectedAnalysisItem] = useState<FeedItem | null>(null);

  // Sidepanel linked filter state
  const [sidepanelFilter, setSidepanelFilter] = useState<{ tab: string; subId: string }>({
    tab: "meme",
    subId: "all-intelligence",
  });

  // Filter Popover States
  const [watchlistOnly, setWatchlistOnly] = useState<boolean>(false);
  const [portfolioOnly, setPortfolioOnly] = useState<boolean>(false);
  const [marketCap, setMarketCap] = useState<string>("All");
  const [sector, setSector] = useState<string>("All sectors");
  const [indexFilter, setIndexFilter] = useState<string>("All");
  const [signalFilter, setSignalFilter] = useState<string>("Any");
  const [minConfidence, setMinConfidence] = useState<number>(0);
  const [dateRange, setDateRange] = useState<string>("All");

  const popoverRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Listen to sidepanel filter clicks
  useEffect(() => {
    const handleSidepanelFilter = (e: Event) => {
      const customEvent = e as CustomEvent<{ tab: string; subId: string; isTabChange?: boolean }>;
      if (customEvent.detail) {
        setSidepanelFilter(customEvent.detail);

        // Do not auto-scroll on tab changes, when switching main asset tabs, or selecting all-intelligence
        if (
          customEvent.detail.isTabChange ||
          customEvent.detail.tab === "stocks" ||
          customEvent.detail.tab === "crypto" ||
          customEvent.detail.tab === "stocks-crypto" ||
          customEvent.detail.subId === "all-intelligence"
        ) {
          return;
        }

        // Scroll feed container smoothly to top of main viewport for specific sub-categories
        requestAnimationFrame(() => {
          if (containerRef.current) {
            const mainEl = containerRef.current.closest("main") || (document.querySelector("main") as HTMLElement | null);
            if (mainEl) {
              const mainRect = mainEl.getBoundingClientRect();
              const feedRect = containerRef.current.getBoundingClientRect();
              const targetScrollTop = mainEl.scrollTop + (feedRect.top - mainRect.top);

              mainEl.scrollTo({
                top: Math.max(0, targetScrollTop),
                behavior: "smooth",
              });
            } else {
              containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      }
    };

    window.addEventListener("i5-sidepanel-filter", handleSidepanelFilter);
    return () => {
      window.removeEventListener("i5-sidepanel-filter", handleSidepanelFilter);
    };
  }, []);

  // Reset all filters function
  const handleResetFilters = () => {
    setWatchlistOnly(false);
    setPortfolioOnly(false);
    setMarketCap("All");
    setSector("All sectors");
    setIndexFilter("All");
    setSignalFilter("Any");
    setMinConfidence(0);
    setDateRange("All");
    setSidepanelFilter({ tab: "crypto", subId: "all-intelligence" });
  };

  // Close filter dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setFilterOpen(false);
      }
    }
    if (filterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterOpen]);

  // Count active non-default filters for badge indicator
  const activeFilterCount =
    (watchlistOnly ? 1 : 0) +
    (portfolioOnly ? 1 : 0) +
    (marketCap !== "All" ? 1 : 0) +
    (sector !== "All sectors" ? 1 : 0) +
    (indexFilter !== "All" ? 1 : 0) +
    (signalFilter !== "Any" ? 1 : 0) +
    (minConfidence > 0 ? 1 : 0) +
    (dateRange !== "All" ? 1 : 0) +
    (sidepanelFilter.tab !== "crypto" && sidepanelFilter.tab !== "stocks" && sidepanelFilter.tab !== "stocks-crypto" ? 1 : 0) +
    (sidepanelFilter.subId !== "all-intelligence" ? 1 : 0);

  // Filter feed items based on sidepanel selection, top tabs, and popover drawer options
  const filteredFeedData = mockFeedData.filter((item) => {
    // 1. Sidepanel Tab Filter (stocks / crypto / meme / stocks-crypto)
    if (
      (sidepanelFilter.tab === "stocks-crypto" || sidepanelFilter.tab === "stocks_crypto") &&
      item.assetType !== "STOCKS" &&
      item.assetType !== "CRYPTO"
    ) {
      return false;
    }
    if (sidepanelFilter.tab === "stocks" && item.assetType !== "STOCKS") return false;
    if (sidepanelFilter.tab === "crypto" && item.assetType !== "CRYPTO") return false;
    if (sidepanelFilter.tab === "meme" && item.assetType !== "MEME") return false;

    // 2. Sidepanel SubId Filter
    const targetCategories = sidepanelSubIdToCategory[sidepanelFilter.subId] || [];
    if (targetCategories.length > 0 && !targetCategories.includes(item.category)) {
      return false;
    }

    // 3. Top Tab Filter (timeline / results / latest-news / trade-ideas / sec-filings)
    if (activeTab === "results" && item.category !== "EARNINGS RESULTS") return false;
    if (activeTab === "latest-news" && item.category !== "BREAKING NEWS") return false;
    if (activeTab === "trade-ideas" && item.category !== "AI COMPUTE" && item.category !== "AI TRADE IDEAS") return false;
    if (activeTab === "sec-filings" && item.category !== "SEC FILINGS") return false;

    // 4. Popover Drawer Filters
    if (signalFilter === "Bullish" && item.stance !== "BULLISH") return false;
    if (signalFilter === "Bearish" && item.stance !== "BEARISH") return false;
    if (minConfidence > 0 && item.aiConfidence < minConfidence) return false;

    return true;
  });

  if (sidepanelFilter.tab === "meme") {
    return (
      <section
        ref={containerRef}
        className={styles.container}
        aria-label="Meme Token Launchpad"
        style={{ margin: 0, minHeight: "unset", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}
      >
        <MemeLaunchpadView />
      </section>
    );
  }

  return (
    <section ref={containerRef} className={styles.container} aria-label="Live Intelligence Feed">
      {/* Sticky Header Bar */}
      <div className={styles.tabsHeader}>
        {/* Left Tabs List */}
        <div className={styles.tabsList} role="tablist">
          {feedFilterTabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`${styles.tabBtn} ${activeTab === tab.id ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right Filter Button & Dropdown Drawer */}
        <div className={styles.filterWrapper} ref={popoverRef}>
          <button
            className={`${styles.filterTriggerBtn} ${filterOpen ? styles.filterTriggerActive : ""}`}
            onClick={() => setFilterOpen((v) => !v)}
            aria-expanded={filterOpen}
            aria-label="Filter intelligence feed"
          >
            <svg width={14} height={14} viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M2 3.5h12M4.5 8h7M7 12.5h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            Filter
            {activeFilterCount > 0 && (
              <span className={styles.filterBadgeCount}>{activeFilterCount}</span>
            )}
          </button>

          {/* Filter Popover Dropdown Panel (Spacious Modern UI) */}
          {filterOpen && (
            <div className={styles.filterDropdown} role="dialog" aria-label="Intelligence Filter Options">
              {/* Popover Top Bar: Title & Reset Button */}
              <div className={styles.popoverTopBar}>
                <div className={styles.popoverTitleGroup}>
                  <h4 className={styles.popoverTitle}>Filter Options</h4>
                  {activeFilterCount > 0 && (
                    <span className={styles.activeCounterBadge}>
                      {activeFilterCount} active
                    </span>
                  )}
                </div>
                <button className={styles.resetBtn} onClick={handleResetFilters}>
                  Reset All
                </button>
              </div>

              {/* Watchlist & Portfolio Toggle Switches Box */}
              <div className={styles.switchesContainer}>
                <div className={styles.switchRow}>
                  <div className={styles.switchLabelGroup}>
                    <span className={styles.starIcon}>★</span>
                    <span className={styles.switchText}>My Watchlist</span>
                  </div>
                  <label className={styles.toggleSwitch}>
                    <input
                      type="checkbox"
                      checked={watchlistOnly}
                      onChange={(e) => setWatchlistOnly(e.target.checked)}
                    />
                    <span className={styles.slider} />
                  </label>
                </div>

                <div className={styles.switchRow}>
                  <div className={styles.switchLabelGroup}>
                    <span className={styles.portfolioIcon}>$</span>
                    <span className={styles.switchText}>My Portfolio</span>
                  </div>
                  <label className={styles.toggleSwitch}>
                    <input
                      type="checkbox"
                      checked={portfolioOnly}
                      onChange={(e) => setPortfolioOnly(e.target.checked)}
                    />
                    <span className={styles.slider} />
                  </label>
                </div>
              </div>

              {/* Market Cap */}
              <div className={styles.filterGroup}>
                <div className={styles.groupHeader}>
                  <span>Market cap</span>
                  <svg width={10} height={6} viewBox="0 0 10 6" fill="none" aria-hidden>
                    <path d="M1 5L5 1L9 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className={styles.pillsContainer}>
                  {["All", "Mega >$500B", "Large $100–500B", "Mid $10–100B", "Small <$10B"].map((item) => (
                    <button
                      key={item}
                      className={`${styles.filterPill} ${marketCap === item ? styles.filterPillSelected : ""}`}
                      onClick={() => setMarketCap(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sector */}
              <div className={styles.filterGroup}>
                <div className={styles.groupHeader}>
                  <span>Sector</span>
                  <svg width={10} height={6} viewBox="0 0 10 6" fill="none" aria-hidden>
                    <path d="M1 5L5 1L9 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className={styles.pillsContainer}>
                  {[
                    "All sectors",
                    "Semiconductors",
                    "Software",
                    "Internet",
                    "Consumer Tech",
                    "E-Commerce",
                    "Automotive",
                    "Crypto Financials",
                    "Financials",
                    "Energy",
                  ].map((item) => (
                    <button
                      key={item}
                      className={`${styles.filterPill} ${sector === item ? styles.filterPillSelected : ""}`}
                      onClick={() => setSector(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Index */}
              <div className={styles.filterGroup}>
                <div className={styles.groupHeader}>
                  <span>Index / Universe</span>
                  <svg width={10} height={6} viewBox="0 0 10 6" fill="none" aria-hidden>
                    <path d="M1 5L5 1L9 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className={styles.pillsContainer}>
                  {["All", "S&P 500", "Nasdaq 100", "Russell 2000", "Top 100 Crypto"].map((item) => (
                    <button
                      key={item}
                      className={`${styles.filterPill} ${indexFilter === item ? styles.filterPillSelected : ""}`}
                      onClick={() => setIndexFilter(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Signal Stance */}
              <div className={styles.filterGroup}>
                <div className={styles.groupHeader}>
                  <span>Signal Direction</span>
                  <svg width={10} height={6} viewBox="0 0 10 6" fill="none" aria-hidden>
                    <path d="M1 5L5 1L9 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className={styles.pillsContainer}>
                  {["Any", "Bullish", "Bearish"].map((item) => (
                    <button
                      key={item}
                      className={`${styles.filterPill} ${signalFilter === item ? styles.filterPillSelected : ""}`}
                      onClick={() => setSignalFilter(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Confidence Slider */}
              <div className={styles.filterGroup}>
                <div className={styles.groupHeader}>
                  <span>Min AI Confidence Score ({minConfidence}%)</span>
                </div>
                <div className={styles.sliderContainer}>
                  <div className={styles.sliderLabels}>
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={minConfidence}
                    onChange={(e) => setMinConfidence(Number(e.target.value))}
                    className={styles.confidenceRange}
                  />
                </div>
              </div>

              {/* Date range */}
              <div className={styles.filterGroup}>
                <div className={styles.groupHeader}>
                  <span>Date range</span>
                  <svg width={10} height={6} viewBox="0 0 10 6" fill="none" aria-hidden>
                    <path d="M1 5L5 1L9 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className={styles.pillsContainer}>
                  {["24h", "7 days", "30 days", "All"].map((item) => (
                    <button
                      key={item}
                      className={`${styles.filterPill} ${dateRange === item ? styles.filterPillSelected : ""}`}
                      onClick={() => setDateRange(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2 Cards Per Row Grid Layout */}
      <div className={styles.feedList}>
        {filteredFeedData.length === 0 ? (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "64px 24px", color: "var(--text-tertiary)", fontSize: "14px" }}>
            No feed items match the selected filter criteria.
          </div>
        ) : (
          filteredFeedData.map((item) => (
          <article key={item.id} className={styles.feedCard}>
            {/* TOP SECTION (Title, Summary, Tags, Time, Source, Price & AI Confidence) */}
            <div className={styles.cardTopSection}>
              {/* Article Headline Title */}
              <h4 className={styles.articleTitle}>{item.title}</h4>

              {/* Summary Text Body */}
              <p className={styles.summaryBody}>{item.summary}</p>

              {/* Metadata & Tags Row */}
              <div className={styles.metaRow}>
                <div className={styles.pillsGroup}>
                  <span className={styles.categoryPill}>{item.category}</span>
                  <span
                    className={`${styles.stancePill} ${
                      item.stance === "BULLISH" ? styles.bullishPill : styles.bearishPill
                    }`}
                  >
                    {item.stance}
                  </span>
                  {item.position && (
                    <span
                      className={`${styles.positionPill} ${
                        item.position === "LONG" ? styles.longPill : styles.shortPill
                      }`}
                    >
                      {item.position}
                    </span>
                  )}
                </div>

                <div className={styles.metaInfo}>
                  <span className={styles.metaItem}>
                    <svg width={12} height={12} viewBox="0 0 16 16" fill="none" aria-hidden>
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
                      <path d="M8 4.5V8L10.5 9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                    {item.timeAgo}
                  </span>
                  <span className={styles.dotSeparator}>•</span>
                  <span className={styles.metaItem}>{item.source}</span>
                  <span className={styles.dotSeparator}>•</span>
                  <span className={styles.metaItem}>{item.publishPrice}</span>

                  <span
                    className={`${styles.priceBadge} ${
                      item.isPositiveChange ? styles.priceUp : styles.priceDown
                    }`}
                  >
                    {item.isPositiveChange ? "↗ " : "↘ "}
                    {item.priceChange}
                  </span>

                  <span className={styles.aiConfidenceBadge}>
                    AI confidence {item.aiConfidence}
                  </span>
                </div>
              </div>
            </div>

            {/* HORIZONTAL DIVIDER LINE */}
            <div className={styles.dividerLine} />

            {/* BOTTOM SECTION (2X Big Logo Avatar + Ticker ON TOP, Company Name below, Actions on Right) */}
            <div className={styles.cardBottomSection}>
              <div className={styles.companyGroup}>
                {/* 2X Big Logo Avatar Box */}
                <div
                  className={styles.bigAvatar2X}
                  style={{ backgroundColor: item.avatarBg, position: 'relative', overflow: 'hidden', padding: 0 }}
                >
                  <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.ticker.slice(0, 4)}
                  </span>
                  <img
                    src={['NVDA', 'MSFT', 'TSLA', 'AAPL', 'AMD'].includes(item.ticker) ? `https://icons.duckduckgo.com/ip3/${({ NVDA: 'nvidia.com', MSFT: 'microsoft.com', TSLA: 'tesla.com', AAPL: 'apple.com', AMD: 'amd.com' } as Record<string, string>)[item.ticker]}.ico` : `https://assets.coincap.io/assets/icons/${item.ticker.toLowerCase()}@2x.png`}
                    alt={item.ticker}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', padding: '4px', backgroundColor: 'inherit' }}
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (img.src.includes('coincap.io')) {
                        img.src = `https://cryptologos.cc/logos/${item.companyName.toLowerCase().split(' ')[0]}-${item.ticker.toLowerCase()}-logo.svg?v=032`;
                      } else {
                        img.style.display = 'none';
                      }
                    }}
                  />
                </div>

                {/* Company Meta: Ticker ON TOP, Company Name below */}
                <div className={styles.companyMeta}>
                  <span className={styles.companyTicker}>{item.ticker}</span>
                  <span className={styles.companyFullName}>{item.companyName}</span>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className={styles.actionsRow}>
                <button className={styles.viewAnalysisBtn} onClick={() => setSelectedAnalysisItem(item)}>
                  View analysis
                  <svg width={12} height={12} viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <button className={styles.actionBtn}>
                  <svg width={13} height={13} viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M4 2.5H12V14.5L8 11.5L4 14.5V2.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                  </svg>
                  Save
                </button>

                <button className={styles.actionBtn}>
                  <svg width={13} height={13} viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M4 8h8M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Share
                </button>
              </div>
            </div>
          </article>
        )))}
      </div>

      {selectedAnalysisItem && (
        <AnalysisDetailModal 
          item={selectedAnalysisItem} 
          onClose={() => setSelectedAnalysisItem(null)} 
        />
      )}
    </section>
  );
}
