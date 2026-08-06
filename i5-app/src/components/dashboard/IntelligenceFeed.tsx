"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./IntelligenceFeed.module.css";
import AnalysisDetailModal from "./AnalysisDetailModal";

export interface FeedItem {
  id: string;
  ticker: string;
  companyName: string;
  avatarBg: string;
  category: string; // e.g. "EARNINGS RESULTS", "BREAKING NEWS", "PRICE MOVEMENT"
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
    id: "5",
    ticker: "ETH",
    companyName: "Ethereum Network",
    avatarBg: "#262348",
    category: "ON-CHAIN SIGNALS",
    stance: "BULLISH",
    title: "Institutional staking inflows reach record $1.4B weekly net positive",
    summary:
      "Validator queue length reaches 14-day high while exchange balances drop to lowest level since 2016, indicating strong long-term supply lockup.",
    timeAgo: "3h ago",
    source: "On-Chain Analytics",
    publishPrice: "$3,480.00 at publish",
    priceChange: "+3.14%",
    isPositiveChange: true,
    aiConfidence: 82,
  },
  {
    id: "6",
    ticker: "AMD",
    companyName: "Advanced Micro Devices",
    avatarBg: "#3A2A14",
    category: "AI COMPUTE",
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
];

const feedFilterTabs = [
  { id: "timeline", label: "Timeline" },
  { id: "results", label: "Results" },
  { id: "latest-news", label: "Latest News" },
  { id: "trade-ideas", label: "Trade Ideas" },
  { id: "sec-filings", label: "SEC Filings" },
];

export default function IntelligenceFeed() {
  const [activeTab, setActiveTab] = useState<string>("timeline");
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [selectedAnalysisItem, setSelectedAnalysisItem] = useState<FeedItem | null>(null);

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
    (dateRange !== "All" ? 1 : 0);

  return (
    <section className={styles.container} aria-label="Live Intelligence Feed">
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
                  <span>Index</span>
                  <svg width={10} height={6} viewBox="0 0 10 6" fill="none" aria-hidden>
                    <path d="M1 5L5 1L9 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className={styles.pillsContainer}>
                  {["All", "S&P 500", "Nasdaq 100", "Dow Jones", "Russell 2000"].map((item) => (
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

              {/* Signal */}
              <div className={styles.filterGroup}>
                <div className={styles.groupHeader}>
                  <span>Signal</span>
                  <svg width={10} height={6} viewBox="0 0 10 6" fill="none" aria-hidden>
                    <path d="M1 5L5 1L9 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className={styles.pillsContainer}>
                  {["Any", "Long", "Short", "Neutral"].map((item) => (
                    <button
                      key={item}
                      className={`${styles.filterPill} ${
                        signalFilter === item
                          ? item === "Long"
                            ? styles.signalLongSelected
                            : item === "Short"
                            ? styles.signalShortSelected
                            : styles.filterPillSelected
                          : ""
                      }`}
                      onClick={() => setSignalFilter(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Confidence level */}
              <div className={styles.filterGroup}>
                <div className={styles.groupHeader}>
                  <span>Confidence level</span>
                  <svg width={10} height={6} viewBox="0 0 10 6" fill="none" aria-hidden>
                    <path d="M1 5L5 1L9 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className={styles.sliderBox}>
                  <div className={styles.sliderHeader}>
                    <span className={styles.sliderSubLabel}>Minimum Score</span>
                    <span className={styles.sliderValueText}>{minConfidence} / 100</span>
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
        {mockFeedData.map((item) => (
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
        ))}
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
