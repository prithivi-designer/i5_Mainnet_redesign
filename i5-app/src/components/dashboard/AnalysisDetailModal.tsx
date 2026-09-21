"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  X,
  Star,
  ExternalLink,
  Shield,
  Sparkles,
  TrendingUp,
  TrendingDown,
  FileText,
  Calendar,
  DollarSign,
  BarChart2,
  Activity,
  Layers,
  Building2,
  Check,
  Info,
  ChevronRight,
} from "lucide-react";
import styles from "./AnalysisDetailModal.module.css";
import { FeedItem } from "./IntelligenceFeed";
import { RESPONSE_ANALYTICS_DATA } from "@/data/analyticsResponse";

interface AnalysisDetailModalProps {
  item: FeedItem;
  onClose: () => void;
}

type TabType =
  | "Overview"
  | "Financials & Earnings"
  | "Valuation & Ratios"
  | "Signals & Guidance"
  | "Candles & Depth";

export default function AnalysisDetailModal({
  item,
  onClose,
}: AnalysisDetailModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("Overview");
  const [isWatchlisted, setIsWatchlisted] = useState<boolean>(true);
  const [chartTimeframe, setChartTimeframe] = useState<"1D" | "1W" | "1M" | "ALL">("1M");
  const [hoveredCandleIndex, setHoveredCandleIndex] = useState<number | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  if (!item) return null;

  // Raw dataset from Response.json
  const rawData = RESPONSE_ANALYTICS_DATA.data;
  const rawCompany = rawData.company.company_facts;
  const rawMetrics = rawData.metrics.snapshot;
  const rawPrice = rawData.price.snapshot;
  const rawConsensus = rawData.ratings_consensus[0];
  const rawEarnings = rawData.earnings.earnings as unknown as any[];
  const rawCandles = rawData.candles.data.candles;

  // Check if item is Crypto or Stock
  const isCrypto =
    item.assetType === "CRYPTO" ||
    item.assetType === "MEME" ||
    ["BTC", "ETH", "SOL", "BNB", "XRP", "ADA", "DOGE", "AVAX", "DOT", "LINK", "PEPE", "WIF", "BONK"].includes(
      item.ticker.toUpperCase()
    );

  const isSpcx = item.ticker.toUpperCase() === "SPCX";

  // Dynamic Metadata: Prefer Response.json for SPCX, or blend item with standard analytics
  const ticker = item.ticker;
  const companyName = isSpcx ? rawCompany.name : item.companyName;
  const exchange = isCrypto ? "Aster DEX" : isSpcx ? rawCompany.exchange : "NASDAQ";
  const sector = isCrypto ? "Crypto / DeFi" : isSpcx ? rawCompany.sector : "Technology";
  const industry = isCrypto ? "Decentralized Finance" : isSpcx ? rawCompany.industry : "Software & Chips";
  const location = isCrypto ? "Arbitrum L2" : isSpcx ? rawCompany.location : "United States";
  const cik = isCrypto ? null : isSpcx ? rawCompany.cik : "0001045810";
  const secUrl = isSpcx
    ? rawCompany.sec_filings_url
    : `https://www.sec.gov/edgar/searchedgar/companysearch?companyName=${ticker}`;

  // Live Price Calculation
  const livePriceDisplay = isSpcx ? `$${rawPrice.price.toFixed(2)}` : item.publishPrice.split(" ")[0];
  const dayChangeDisplay = isSpcx
    ? `+${rawPrice.day_change.toFixed(2)} (+${rawPrice.day_change_percent.toFixed(2)}%)`
    : item.priceChange;
  const isPositive = isSpcx ? rawPrice.day_change >= 0 : item.isPositiveChange;

  // Filtered Candlestick subset for chart
  const displayedCandles = useMemo(() => {
    if (chartTimeframe === "1D") return rawCandles.slice(-1);
    if (chartTimeframe === "1W") return rawCandles.slice(-7);
    if (chartTimeframe === "1M") return rawCandles.slice(-30);
    return rawCandles;
  }, [rawCandles, chartTimeframe]);

  // Compute SVG chart coordinates
  const chartHeight = 160;
  const chartWidth = 520;
  const paddingX = 16;
  const paddingY = 16;

  const { minPrice, maxPrice, priceRange, candleWidth } = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    displayedCandles.forEach((c) => {
      const l = parseFloat(c.low);
      const h = parseFloat(c.high);
      if (l < min) min = l;
      if (h > max) max = h;
    });
    const range = max - min || 1;
    const width = (chartWidth - paddingX * 2) / displayedCandles.length;
    return { minPrice: min, maxPrice: max, priceRange: range, candleWidth: width };
  }, [displayedCandles]);

  // Active inspected candle
  const activeCandle =
    hoveredCandleIndex !== null && displayedCandles[hoveredCandleIndex]
      ? displayedCandles[hoveredCandleIndex]
      : displayedCandles[displayedCandles.length - 1];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Sticky Header Bar */}
        <div className={styles.modalHeader}>
          <div className={styles.headerTopRow}>
            {/* Asset Identity */}
            <div className={styles.assetIdentity}>
              <div className={styles.assetLogoWrap}>
                <img
                  src={
                    isSpcx
                      ? rawData.logo_url
                      : ["NVDA", "MSFT", "TSLA", "AAPL", "AMD"].includes(ticker)
                      ? `https://icons.duckduckgo.com/ip3/${
                          (
                            {
                              NVDA: "nvidia.com",
                              MSFT: "microsoft.com",
                              TSLA: "tesla.com",
                              AAPL: "apple.com",
                              AMD: "amd.com",
                            } as Record<string, string>
                          )[ticker]
                        }.ico`
                      : `https://assets.coincap.io/assets/icons/${ticker.toLowerCase()}@2x.png`
                  }
                  alt={ticker}
                  className={styles.assetLogoImg}
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.style.display = "none";
                  }}
                />
                <span className={styles.assetLogoFallback}>{ticker.slice(0, 3)}</span>
              </div>

              <div className={styles.assetMetaDetails}>
                <div className={styles.assetTitleRow}>
                  <h2 className={styles.companyName}>{companyName}</h2>
                  <span className={styles.tickerBadge}>{ticker}</span>
                  <span className={styles.consensusPill}>
                    <Shield size={11} />
                    {isCrypto ? "AI BULLISH 84%" : `${rawConsensus.consensus.toUpperCase()} CONSENSUS`}
                  </span>
                </div>

                <div className={styles.assetTagsRow}>
                  <span className={styles.tagPill}>{exchange}</span>
                  <span className={styles.tagDivider} />
                  <span className={styles.tagPill}>
                    {sector} • {industry}
                  </span>
                  <span className={styles.tagDivider} />
                  <span className={styles.tagPill}>{location}</span>
                  {cik && (
                    <>
                      <span className={styles.tagDivider} />
                      <span className={styles.cikBadge}>CIK: {cik}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Price & Close */}
            <div className={styles.headerRightCol}>
              <div className={styles.priceBlock}>
                <span className={styles.priceVal}>{livePriceDisplay}</span>
                <div className={styles.priceChangeRow}>
                  <span
                    className={`${styles.priceChangeBadge} ${
                      isPositive ? styles.priceUp : styles.priceDown
                    }`}
                  >
                    {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {dayChangeDisplay}
                  </span>
                </div>
                <span className={styles.priceUpdatedTime}>Updated Sep 21, 2026 • Live</span>
              </div>

              <button
                className={styles.closeBtn}
                onClick={onClose}
                aria-label="Close analytics modal"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Sub Actions Row */}
          <div className={styles.headerSubActionsRow}>
            <div className={styles.headerActionsLeft}>
              <button
                className={`${styles.actionBtn} ${isWatchlisted ? styles.actionBtnActive : ""}`}
                onClick={() => setIsWatchlisted(!isWatchlisted)}
              >
                <Star size={13} fill={isWatchlisted ? "currentColor" : "none"} />
                <span>{isWatchlisted ? "In Watchlist" : "Add to Watchlist"}</span>
              </button>

              <button
                className={`${styles.actionBtn} ${styles.primaryTradeBtn}`}
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent("i5-open-quick-trade", {
                      detail: { ticker: ticker, name: companyName, price: livePriceDisplay },
                    })
                  );
                  onClose();
                }}
              >
                <span>Trade {ticker}</span>
                <ChevronRight size={13} />
              </button>

              {!isCrypto && (
                <a
                  href={secUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionBtn}
                  title="View official SEC filings"
                >
                  <FileText size={13} />
                  <span>SEC EDGAR Filings</span>
                  <ExternalLink size={11} />
                </a>
              )}
            </div>

            {/* Quick Signals Snippet */}
            <div className={styles.tagPill} style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>
              <Activity size={12} color="var(--emerald-400)" />
              <span>30-Session Aster DEX & SEC EDGAR Data Feed</span>
            </div>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className={styles.tabsNav}>
          {(
            [
              "Overview",
              "Financials & Earnings",
              "Valuation & Ratios",
              "Signals & Guidance",
              "Candles & Depth",
            ] as TabType[]
          ).map((tab) => (
            <button
              key={tab}
              className={`${styles.tabBtn} ${activeTab === tab ? styles.tabBtnActive : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "Overview" && <BarChart2 size={13} />}
              {tab === "Financials & Earnings" && <DollarSign size={13} />}
              {tab === "Valuation & Ratios" && <Layers size={13} />}
              {tab === "Signals & Guidance" && <Sparkles size={13} />}
              {tab === "Candles & Depth" && <Activity size={13} />}
              <span>{tab}</span>
              {tab === "Financials & Earnings" && (
                <span className={styles.tabCountBadge}>{rawEarnings.length}Q</span>
              )}
              {tab === "Candles & Depth" && (
                <span className={styles.tabCountBadge}>{rawCandles.length}D</span>
              )}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className={styles.modalBody}>
          {/* ============================================================
              TAB 1: OVERVIEW
              ============================================================ */}
          {activeTab === "Overview" && (
            <>
              {/* Top Two Column: Candlestick Chart + Analyst Consensus */}
              <div className={styles.overviewTopGrid}>
                {/* Candlestick Chart Card */}
                <div className={styles.chartCard}>
                  <div className={styles.chartCardHeader}>
                    <div className={styles.sectionTitle}>
                      <Activity size={12} color="var(--emerald-400)" />
                      <span>30-Day OHLCV Price Action</span>
                    </div>

                    <div className={styles.chartTimeframeRow}>
                      {(["1D", "1W", "1M", "ALL"] as const).map((tf) => (
                        <button
                          key={tf}
                          className={`${styles.timeframeBtn} ${
                            chartTimeframe === tf ? styles.timeframeBtnActive : ""
                          }`}
                          onClick={() => setChartTimeframe(tf)}
                        >
                          {tf}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Candle Inspector Bar */}
                  {activeCandle && (
                    <div className={styles.candleInspectBar}>
                      <span>
                        Date: <span className={styles.inspectVal}>
                          {new Date(activeCandle.open_time).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </span>
                      <span>
                        O: <span className={styles.inspectVal}>${parseFloat(activeCandle.open).toFixed(2)}</span>
                      </span>
                      <span>
                        H: <span className={styles.inspectVal}>${parseFloat(activeCandle.high).toFixed(2)}</span>
                      </span>
                      <span>
                        L: <span className={styles.inspectVal}>${parseFloat(activeCandle.low).toFixed(2)}</span>
                      </span>
                      <span>
                        C:{" "}
                        <span
                          className={styles.inspectVal}
                          style={{
                            color:
                              parseFloat(activeCandle.close) >= parseFloat(activeCandle.open)
                                ? "var(--emerald-400)"
                                : "var(--rose-400)",
                          }}
                        >
                          ${parseFloat(activeCandle.close).toFixed(2)}
                        </span>
                      </span>
                      <span>
                        Vol: <span className={styles.inspectVal}>{parseFloat(activeCandle.volume).toLocaleString()}</span>
                      </span>
                    </div>
                  )}

                  {/* Interactive SVG Candlestick Graphic */}
                  <div className={styles.chartSvgWrap}>
                    <svg
                      className={styles.chartSvg}
                      viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                      preserveAspectRatio="none"
                    >
                      {/* Grid Guide Lines */}
                      <line
                        x1="0"
                        y1={paddingY}
                        x2={chartWidth}
                        y2={paddingY}
                        stroke="rgba(255,255,255,0.06)"
                        strokeDasharray="3 3"
                      />
                      <line
                        x1="0"
                        y1={chartHeight / 2}
                        x2={chartWidth}
                        y2={chartHeight / 2}
                        stroke="rgba(255,255,255,0.06)"
                        strokeDasharray="3 3"
                      />
                      <line
                        x1="0"
                        y1={chartHeight - paddingY}
                        x2={chartWidth}
                        y2={chartHeight - paddingY}
                        stroke="rgba(255,255,255,0.06)"
                        strokeDasharray="3 3"
                      />

                      {/* Reference Price Labels */}
                      <text
                        x="4"
                        y={paddingY + 10}
                        fill="rgba(255,255,255,0.4)"
                        fontSize="9"
                        fontFamily="monospace"
                      >
                        ${maxPrice.toFixed(2)}
                      </text>
                      <text
                        x="4"
                        y={chartHeight - paddingY - 3}
                        fill="rgba(255,255,255,0.4)"
                        fontSize="9"
                        fontFamily="monospace"
                      >
                        ${minPrice.toFixed(2)}
                      </text>

                      {/* Candlesticks */}
                      {displayedCandles.map((c, i) => {
                        const o = parseFloat(c.open);
                        const h = parseFloat(c.high);
                        const l = parseFloat(c.low);
                        const cl = parseFloat(c.close);
                        const isUp = cl >= o;

                        const usableH = chartHeight - paddingY * 2;
                        const yH = paddingY + (1 - (h - minPrice) / priceRange) * usableH;
                        const yL = paddingY + (1 - (l - minPrice) / priceRange) * usableH;
                        const yO = paddingY + (1 - (o - minPrice) / priceRange) * usableH;
                        const yC = paddingY + (1 - (cl - minPrice) / priceRange) * usableH;

                        const candleTop = Math.min(yO, yC);
                        const candleHeight = Math.max(Math.abs(yC - yO), 1.5);
                        const x = paddingX + i * candleWidth + candleWidth / 2;
                        const bodyWidth = Math.max(candleWidth * 0.65, 3.5);
                        const color = isUp ? "#56d68f" : "#ef4444";

                        return (
                          <g
                            key={c.open_time}
                            onMouseEnter={() => setHoveredCandleIndex(i)}
                            style={{ cursor: "crosshair" }}
                          >
                            {/* Wick */}
                            <line
                              x1={x}
                              y1={yH}
                              x2={x}
                              y2={yL}
                              stroke={color}
                              strokeWidth={1.2}
                              opacity={hoveredCandleIndex === i ? 1 : 0.75}
                            />
                            {/* Body */}
                            <rect
                              x={x - bodyWidth / 2}
                              y={candleTop}
                              width={bodyWidth}
                              height={candleHeight}
                              fill={color}
                              opacity={hoveredCandleIndex === i ? 1 : 0.85}
                              rx={1}
                            />
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </div>

                {/* Right Column: Ratings & Consensus + Current Signal */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {/* Analyst Consensus Card */}
                  <div className={styles.consensusCard}>
                    <div className={styles.sectionTitle}>
                      <Shield size={12} color="var(--emerald-400)" />
                      <span>{isCrypto ? "Market Sentiment" : "Wall St. Consensus"}</span>
                    </div>

                    <div className={styles.consensusStatsRow}>
                      <span className={styles.consensusPillBuy}>
                        Buy {rawConsensus.buy} (82%)
                      </span>
                      <span className={styles.consensusPillHold}>
                        Hold {rawConsensus.hold} (18%)
                      </span>
                      <span className={styles.consensusPillSell}>
                        Sell {rawConsensus.sell} (0%)
                      </span>
                    </div>

                    {/* Visual 3-part progress bar */}
                    <div className={styles.consensusProgressBar}>
                      <div
                        className={styles.progressSegmentBuy}
                        style={{ width: `${(rawConsensus.buy / 11) * 100}%` }}
                      />
                      <div
                        className={styles.progressSegmentHold}
                        style={{ width: `${(rawConsensus.hold / 11) * 100}%` }}
                      />
                      <div
                        className={styles.progressSegmentSell}
                        style={{ width: `${(rawConsensus.sell / 11) * 100}%` }}
                      />
                    </div>

                    <div className={styles.targetPriceRow}>
                      <span>12M Target Projection</span>
                      <span className={styles.targetPriceNum}>
                        {isCrypto ? "$240.00 (+56%)" : "$188.50 (+22.5%)"}
                      </span>
                    </div>
                  </div>

                  {/* Current Signal Box */}
                  <div className={styles.signalBox}>
                    <div className={styles.signalHeader}>
                      <div className={styles.signalTitle}>
                        <Shield size={13} color="var(--emerald-400)" />
                        <span>CURRENT I5 SIGNAL</span>
                      </div>
                      <span className={styles.consensusPill} style={{ fontSize: "10px", padding: "1px 6px" }}>
                        {item.position || "LONG"}
                      </span>
                    </div>

                    <div className={styles.signalMetrics}>
                      <div className={styles.signalMetricItem}>
                        <span className={styles.signalMetricLabel}>Entry</span>
                        <span className={styles.signalMetricVal}>$142.50</span>
                      </div>
                      <div className={styles.signalMetricItem}>
                        <span className={styles.signalMetricLabel}>T1 Target</span>
                        <span className={styles.signalMetricVal} style={{ color: "var(--emerald-400)" }}>
                          $172.00
                        </span>
                      </div>
                      <div className={styles.signalMetricItem}>
                        <span className={styles.signalMetricLabel}>Stop</span>
                        <span className={styles.signalMetricVal} style={{ color: "var(--rose-400)" }}>
                          $138.00
                        </span>
                      </div>
                      <div className={styles.signalMetricItem}>
                        <span className={styles.signalMetricLabel}>R:R</span>
                        <span className={styles.signalMetricVal} style={{ color: "var(--emerald-400)" }}>
                          3.2R
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guidance Highlight Banner from Response.json Signals */}
              <div className={styles.guidanceBanner}>
                <div className={styles.guidanceLeft}>
                  <div className={styles.guidanceIconBox}>
                    <Sparkles size={17} />
                  </div>
                  <div className={styles.guidanceTextGroup}>
                    <span className={styles.guidanceHeadline}>
                      {rawEarnings[0]?.signals?.[0]?.headline ||
                        "Initiated Q3 2026 acquisition purchase price guidance of $60.0B"}
                    </span>
                    <span className={styles.guidanceMeta}>
                      Segment: {rawEarnings[0]?.signals?.[0]?.details?.segment || "Cursor (AI)"} • Target Period:{" "}
                      {rawEarnings[0]?.signals?.[0]?.period || "Q3 2026"} • Point Estimate: $60.0B
                    </span>
                  </div>
                </div>
                <button
                  className={styles.actionBtn}
                  onClick={() => setActiveTab("Signals & Guidance")}
                  style={{ flexShrink: 0 }}
                >
                  <span>View Details</span>
                  <ChevronRight size={13} />
                </button>
              </div>

              {/* Key Metrics 8-Tile Snapshot Grid from Response.json */}
              <div>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionTitle}>
                    <BarChart2 size={12} />
                    <span>INSTITUTIONAL SNAPSHOT METRICS</span>
                  </div>
                  <span style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>
                    Source: SEC 8-K & Financial Modeling Prep
                  </span>
                </div>

                <div className={styles.metricsGrid}>
                  <div className={styles.keyMetricTile}>
                    <span className={styles.keyMetricLabel}>Market Cap</span>
                    <span className={styles.keyMetricValue}>
                      ${(rawMetrics.market_cap / 1e12).toFixed(2)}T
                    </span>
                    <span className={styles.keyMetricSub}>Enterprise $1.95T</span>
                  </div>

                  <div className={styles.keyMetricTile}>
                    <span className={styles.keyMetricLabel}>P/E Ratio (TTM)</span>
                    <span className={styles.keyMetricValue}>
                      {rawMetrics.price_to_earnings_ratio ? rawMetrics.price_to_earnings_ratio.toFixed(1) : "N/A"}
                    </span>
                    <span className={styles.keyMetricSub}>Growth Reinvestment</span>
                  </div>

                  <div className={styles.keyMetricTile}>
                    <span className={styles.keyMetricLabel}>Price / Book</span>
                    <span className={styles.keyMetricValue}>
                      {rawMetrics.price_to_book_ratio.toFixed(2)}x
                    </span>
                    <span className={styles.keyMetricSub}>Book $32.76 / sh</span>
                  </div>

                  <div className={styles.keyMetricTile}>
                    <span className={styles.keyMetricLabel}>Price / Sales</span>
                    <span className={styles.keyMetricValue}>
                      {rawMetrics.price_to_sales_ratio.toFixed(1)}x
                    </span>
                    <span className={styles.keyMetricSub}>EV/Sales 101.3x</span>
                  </div>

                  <div className={styles.keyMetricTile}>
                    <span className={styles.keyMetricLabel}>Gross Margin</span>
                    <span className={styles.keyMetricValue} style={{ color: "var(--emerald-400)" }}>
                      {(rawMetrics.gross_margin * 100).toFixed(1)}%
                    </span>
                    <span className={styles.keyMetricSub}>Q2 Expanded to 55.3%</span>
                  </div>

                  <div className={styles.keyMetricTile}>
                    <span className={styles.keyMetricLabel}>Current Ratio</span>
                    <span className={styles.keyMetricValue}>
                      {rawMetrics.current_ratio.toFixed(2)}x
                    </span>
                    <span className={styles.keyMetricSub}>Quick Ratio 4.99x</span>
                  </div>

                  <div className={styles.keyMetricTile}>
                    <span className={styles.keyMetricLabel}>Cash Ratio</span>
                    <span className={styles.keyMetricValue} style={{ color: "var(--emerald-400)" }}>
                      {rawMetrics.cash_ratio.toFixed(2)}x
                    </span>
                    <span className={styles.keyMetricSub}>$93.5B Cash & Eq</span>
                  </div>

                  <div className={styles.keyMetricTile}>
                    <span className={styles.keyMetricLabel}>Debt to Equity</span>
                    <span className={styles.keyMetricValue}>
                      {rawMetrics.debt_to_equity.toFixed(2)}
                    </span>
                    <span className={styles.keyMetricSub}>Debt to Assets 0.21</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ============================================================
              TAB 2: FINANCIALS & EARNINGS
              ============================================================ */}
          {activeTab === "Financials & Earnings" && (
            <>
              {/* Financial Highlights KPI Cards */}
              <div className={styles.metricsGrid}>
                <div className={styles.keyMetricTile}>
                  <span className={styles.keyMetricLabel}>Latest Quarter</span>
                  <span className={styles.keyMetricValue}>2026-Q2</span>
                  <span className={styles.keyMetricSub}>Filed Aug 04, 2026</span>
                </div>
                <div className={styles.keyMetricTile}>
                  <span className={styles.keyMetricLabel}>Q2 Revenue</span>
                  <span className={styles.keyMetricValue} style={{ color: "var(--emerald-400)" }}>
                    $7.81B
                  </span>
                  <span className={styles.keyMetricSub}>+91.94% YoY Growth</span>
                </div>
                <div className={styles.keyMetricTile}>
                  <span className={styles.keyMetricLabel}>Q2 Gross Profit</span>
                  <span className={styles.keyMetricValue}>$4.32B</span>
                  <span className={styles.keyMetricSub}>55.27% Gross Margin</span>
                </div>
                <div className={styles.keyMetricTile}>
                  <span className={styles.keyMetricLabel}>Cash & Equivalents</span>
                  <span className={styles.keyMetricValue} style={{ color: "var(--emerald-400)" }}>
                    $93.52B
                  </span>
                  <span className={styles.keyMetricSub}>+$69.23B Net Change</span>
                </div>
              </div>

              {/* Quarterly Breakdown Table (from Response.json earnings) */}
              <div>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionTitle}>
                    <DollarSign size={12} />
                    <span>QUARTERLY EARNINGS REPORTS (SEC EDGAR 8-K FILINGS)</span>
                  </div>
                  <span style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>
                    All figures in USD
                  </span>
                </div>

                <div className={styles.tableWrap}>
                  <table className={styles.dataTable}>
                    <thead>
                      <tr>
                        <th>Fiscal Period</th>
                        <th>Report Date</th>
                        <th>Window</th>
                        <th>Revenue</th>
                        <th>YoY Growth</th>
                        <th>EPS</th>
                        <th>Gross Margin</th>
                        <th>Net Income</th>
                        <th>Operating Cash Flow</th>
                        <th>SEC Filing</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rawEarnings.map((quarter, idx) => {
                        const q = quarter.quarterly || quarter.annual;
                        return (
                          <tr key={`${quarter.fiscal_period}-${idx}`}>
                            <td className={styles.tablePeriodCell}>{quarter.fiscal_period}</td>
                            <td className={styles.tableMonoCell}>{quarter.report_period}</td>
                            <td>
                              <span className={styles.tickerBadge} style={{ fontSize: "9.5px" }}>
                                {quarter.filing_window}
                              </span>
                            </td>
                            <td className={styles.tableMonoCell}>
                              {q?.revenue ? `$${(q.revenue / 1e9).toFixed(2)}B` : "—"}
                            </td>
                            <td className={styles.tableMonoCell}>
                              {q?.revenue_chg ? (
                                <span style={{ color: "var(--emerald-400)" }}>
                                  +{(q.revenue_chg * 100).toFixed(1)}%
                                </span>
                              ) : (
                                "—"
                              )}
                            </td>
                            <td className={styles.tableMonoCell}>
                              {q?.earnings_per_share !== undefined
                                ? `$${q.earnings_per_share.toFixed(2)}`
                                : "—"}
                            </td>
                            <td className={styles.tableMonoCell}>
                              {q?.gross_margin ? `${(q.gross_margin * 100).toFixed(1)}%` : "—"}
                            </td>
                            <td className={styles.tableMonoCell}>
                              {q?.net_income ? `$${(q.net_income / 1e6).toFixed(0)}M` : "—"}
                            </td>
                            <td className={styles.tableMonoCell}>
                              {q?.net_cash_flow_from_operations
                                ? `$${(q.net_cash_flow_from_operations / 1e9).toFixed(2)}B`
                                : "—"}
                            </td>
                            <td>
                              {quarter.filing_url ? (
                                <a
                                  href={quarter.filing_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={styles.tableLinkBtn}
                                >
                                  <span>{quarter.source_type}</span>
                                  <ExternalLink size={10} />
                                </a>
                              ) : (
                                "—"
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Balance Sheet & Solvency Highlights */}
              <div className={styles.ratiosMatrixGrid}>
                <div className={styles.ratioCard}>
                  <div className={styles.ratioCardTitle}>
                    <Building2 size={13} />
                    <span>Balance Sheet Structure (Q2 2026)</span>
                  </div>
                  <div className={styles.ratioList}>
                    <div className={styles.ratioRow}>
                      <span className={styles.ratioLabel}>Total Assets</span>
                      <span className={styles.ratioVal}>$192,770,000,000</span>
                    </div>
                    <div className={styles.ratioRow}>
                      <span className={styles.ratioLabel}>Total Liabilities</span>
                      <span className={styles.ratioVal}>$65,546,000,000</span>
                    </div>
                    <div className={styles.ratioRow}>
                      <span className={styles.ratioLabel}>Shareholders Equity</span>
                      <span className={styles.ratioVal} style={{ color: "var(--emerald-400)" }}>
                        $127,224,000,000
                      </span>
                    </div>
                    <div className={styles.ratioRow}>
                      <span className={styles.ratioLabel}>Total Debt</span>
                      <span className={styles.ratioVal}>$39,364,000,000</span>
                    </div>
                  </div>
                </div>

                <div className={styles.ratioCard}>
                  <div className={styles.ratioCardTitle}>
                    <Activity size={13} />
                    <span>Cash Flow Dynamics (Q2 2026)</span>
                  </div>
                  <div className={styles.ratioList}>
                    <div className={styles.ratioRow}>
                      <span className={styles.ratioLabel}>Operating Cash Flow</span>
                      <span className={styles.ratioVal} style={{ color: "var(--emerald-400)" }}>
                        +$3,466,000,000 (+887% YoY)
                      </span>
                    </div>
                    <div className={styles.ratioRow}>
                      <span className={styles.ratioLabel}>Investing Cash Flow</span>
                      <span className={styles.ratioVal}>-$34,487,000,000</span>
                    </div>
                    <div className={styles.ratioRow}>
                      <span className={styles.ratioLabel}>Financing Cash Flow</span>
                      <span className={styles.ratioVal}>+$100,291,000,000</span>
                    </div>
                    <div className={styles.ratioRow}>
                      <span className={styles.ratioLabel}>Net Change in Cash</span>
                      <span className={styles.ratioVal} style={{ color: "var(--emerald-400)" }}>
                        +$69,228,000,000
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ============================================================
              TAB 3: VALUATION & RATIOS
              ============================================================ */}
          {activeTab === "Valuation & Ratios" && (
            <div className={styles.ratiosMatrixGrid}>
              {/* Valuation Multiples */}
              <div className={styles.ratioCard}>
                <div className={styles.ratioCardTitle}>
                  <DollarSign size={13} />
                  <span>Valuation Multiples</span>
                </div>
                <div className={styles.ratioList}>
                  <div className={styles.ratioRow}>
                    <span className={styles.ratioLabel}>Market Capitalization</span>
                    <span className={styles.ratioVal}>$2,007,585,085,624</span>
                  </div>
                  <div className={styles.ratioRow}>
                    <span className={styles.ratioLabel}>Enterprise Value (EV)</span>
                    <span className={styles.ratioVal}>$1,954,873,085,624</span>
                  </div>
                  <div className={styles.ratioRow}>
                    <span className={styles.ratioLabel}>Price to Book (P/B)</span>
                    <span className={styles.ratioVal}>{rawMetrics.price_to_book_ratio.toFixed(2)}x</span>
                  </div>
                  <div className={styles.ratioRow}>
                    <span className={styles.ratioLabel}>Price to Sales (P/S)</span>
                    <span className={styles.ratioVal}>{rawMetrics.price_to_sales_ratio.toFixed(2)}x</span>
                  </div>
                  <div className={styles.ratioRow}>
                    <span className={styles.ratioLabel}>EV to EBITDA</span>
                    <span className={styles.ratioVal}>{rawMetrics.enterprise_value_to_ebitda_ratio.toFixed(2)}x</span>
                  </div>
                  <div className={styles.ratioRow}>
                    <span className={styles.ratioLabel}>EV to Revenue</span>
                    <span className={styles.ratioVal}>{rawMetrics.enterprise_value_to_revenue_ratio.toFixed(2)}x</span>
                  </div>
                  <div className={styles.ratioRow}>
                    <span className={styles.ratioLabel}>Free Cash Flow Yield</span>
                    <span className={styles.ratioVal}>{(rawMetrics.free_cash_flow_yield * 100).toFixed(2)}%</span>
                  </div>
                </div>
              </div>

              {/* Margins & Profitability */}
              <div className={styles.ratioCard}>
                <div className={styles.ratioCardTitle}>
                  <BarChart2 size={13} />
                  <span>Margins & Returns</span>
                </div>
                <div className={styles.ratioList}>
                  <div className={styles.ratioRow}>
                    <span className={styles.ratioLabel}>Gross Margin</span>
                    <span className={styles.ratioVal} style={{ color: "var(--emerald-400)" }}>
                      {(rawMetrics.gross_margin * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className={styles.ratioRow}>
                    <span className={styles.ratioLabel}>Operating Margin</span>
                    <span className={styles.ratioVal}>{(rawMetrics.operating_margin * 100).toFixed(2)}%</span>
                  </div>
                  <div className={styles.ratioRow}>
                    <span className={styles.ratioLabel}>Net Profit Margin</span>
                    <span className={styles.ratioVal}>{(rawMetrics.net_margin * 100).toFixed(2)}%</span>
                  </div>
                  <div className={styles.ratioRow}>
                    <span className={styles.ratioLabel}>Return on Equity (ROE)</span>
                    <span className={styles.ratioVal}>{(rawMetrics.return_on_equity * 100).toFixed(2)}%</span>
                  </div>
                  <div className={styles.ratioRow}>
                    <span className={styles.ratioLabel}>Return on Assets (ROA)</span>
                    <span className={styles.ratioVal}>{(rawMetrics.return_on_assets * 100).toFixed(2)}%</span>
                  </div>
                  <div className={styles.ratioRow}>
                    <span className={styles.ratioLabel}>Return on Invested Capital (ROIC)</span>
                    <span className={styles.ratioVal}>{(rawMetrics.return_on_invested_capital * 100).toFixed(2)}%</span>
                  </div>
                </div>
              </div>

              {/* Liquidity & Solvency */}
              <div className={styles.ratioCard}>
                <div className={styles.ratioCardTitle}>
                  <Shield size={13} />
                  <span>Liquidity & Solvency</span>
                </div>
                <div className={styles.ratioList}>
                  <div className={styles.ratioRow}>
                    <span className={styles.ratioLabel}>Current Ratio</span>
                    <span className={styles.ratioVal} style={{ color: "var(--emerald-400)" }}>
                      {rawMetrics.current_ratio.toFixed(2)}x
                    </span>
                  </div>
                  <div className={styles.ratioRow}>
                    <span className={styles.ratioLabel}>Quick Ratio</span>
                    <span className={styles.ratioVal}>{rawMetrics.quick_ratio.toFixed(2)}x</span>
                  </div>
                  <div className={styles.ratioRow}>
                    <span className={styles.ratioLabel}>Cash Ratio</span>
                    <span className={styles.ratioVal} style={{ color: "var(--emerald-400)" }}>
                      {rawMetrics.cash_ratio.toFixed(2)}x
                    </span>
                  </div>
                  <div className={styles.ratioRow}>
                    <span className={styles.ratioLabel}>Debt to Equity</span>
                    <span className={styles.ratioVal}>{rawMetrics.debt_to_equity.toFixed(2)}</span>
                  </div>
                  <div className={styles.ratioRow}>
                    <span className={styles.ratioLabel}>Debt to Assets</span>
                    <span className={styles.ratioVal}>{rawMetrics.debt_to_assets.toFixed(2)}</span>
                  </div>
                  <div className={styles.ratioRow}>
                    <span className={styles.ratioLabel}>Operating Cash Flow Ratio</span>
                    <span className={styles.ratioVal}>{rawMetrics.operating_cash_flow_ratio.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Per Share & Capital Efficiency */}
              <div className={styles.ratioCard}>
                <div className={styles.ratioCardTitle}>
                  <Activity size={13} />
                  <span>Per Share & Efficiency</span>
                </div>
                <div className={styles.ratioList}>
                  <div className={styles.ratioRow}>
                    <span className={styles.ratioLabel}>Earnings Per Share (EPS TTM)</span>
                    <span className={styles.ratioVal}>${rawMetrics.earnings_per_share.toFixed(2)}</span>
                  </div>
                  <div className={styles.ratioRow}>
                    <span className={styles.ratioLabel}>Book Value Per Share</span>
                    <span className={styles.ratioVal}>${rawMetrics.book_value_per_share.toFixed(2)}</span>
                  </div>
                  <div className={styles.ratioRow}>
                    <span className={styles.ratioLabel}>Free Cash Flow Per Share</span>
                    <span className={styles.ratioVal}>${rawMetrics.free_cash_flow_per_share.toFixed(2)}</span>
                  </div>
                  <div className={styles.ratioRow}>
                    <span className={styles.ratioLabel}>Asset Turnover</span>
                    <span className={styles.ratioVal}>{rawMetrics.asset_turnover.toFixed(3)}</span>
                  </div>
                  <div className={styles.ratioRow}>
                    <span className={styles.ratioLabel}>Inventory Turnover</span>
                    <span className={styles.ratioVal}>{rawMetrics.inventory_turnover.toFixed(2)}x</span>
                  </div>
                  <div className={styles.ratioRow}>
                    <span className={styles.ratioLabel}>Working Capital Turnover</span>
                    <span className={styles.ratioVal}>{rawMetrics.working_capital_turnover.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================
              TAB 4: SIGNALS & GUIDANCE
              ============================================================ */}
          {activeTab === "Signals & Guidance" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {/* Guidance Initiated Box from Response.json */}
              <div className={styles.card}>
                <div className={styles.sectionTitle}>
                  <Sparkles size={13} color="var(--emerald-400)" />
                  <span>SEC 8-K GUIDANCE INITIATED (OFFICIAL FILING)</span>
                </div>

                <div
                  style={{
                    backgroundColor: "var(--neutral-900, #0f0f0f)",
                    borderRadius: "10px",
                    padding: "14px",
                    border: "1px solid var(--border-color-default, rgba(228, 228, 228, 0.08))",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 700, fontSize: "14px", color: "var(--text-primary)" }}>
                      {rawEarnings[0]?.signals?.[0]?.headline ||
                        "Initiated Q3 2026 acquisition purchase price guidance of $60.0B"}
                    </span>
                    <span className={styles.consensusPill} style={{ fontSize: "10px" }}>
                      GUIDANCE INITIATED
                    </span>
                  </div>

                  <p style={{ margin: 0, fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    Space Exploration Technologies Corp. filed an official 8-K disclosure declaring acquisition
                    purchase price guidance for the Cursor (AI) segment targeting Q3 2026 completion at a $60.0B
                    valuation point estimate.
                  </p>

                  <div style={{ display: "flex", gap: "16px", fontSize: "11px", color: "var(--text-tertiary)" }}>
                    <span>
                      Target Period: <strong style={{ color: "var(--text-primary)" }}>Q3 2026</strong>
                    </span>
                    <span>
                      Segment: <strong style={{ color: "var(--text-primary)" }}>Cursor (AI)</strong>
                    </span>
                    <span>
                      Point Estimate: <strong style={{ color: "var(--emerald-400)" }}>$60,000,000,000</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Quantitative Thesis Box */}
              <div className={styles.thesisBox}>
                <div className={styles.thesisHeader}>
                  <Sparkles size={15} color="var(--emerald-400)" />
                  <span>I5 QUANTITATIVE AI THESIS & VALUATION MEMO</span>
                </div>
                <p className={styles.thesisText}>
                  {item.summary ||
                    "SpaceX demonstrates unprecedented operating leverage, with Q2 revenues scaling +91.9% YoY to $7.81B and gross margins surging 1132 bps to 55.3%. The balance sheet retains an extraordinary $93.5B in liquid cash & equivalents against $39.4B total debt, granting massive strategic flexibility for the planned $60.0B AI infrastructure deployment."}
                </p>
                <p className={styles.thesisText} style={{ marginTop: "4px" }}>
                  Technically, the 30-session Aster DEX candle series shows persistent accumulation across the
                  $135–$140 support cluster, culminating in a breakout above $153.85 backed by rising quote volume.
                  Our models maintain an institutional BUY rating with a 12-month upside target of $188.50.
                </p>
              </div>

              {/* Upcoming Catalysts */}
              <div className={styles.card}>
                <div className={styles.sectionTitle}>
                  <Calendar size={13} />
                  <span>UPCOMING CORPORATE & REGULATORY CATALYSTS</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      backgroundColor: "var(--neutral-900)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  >
                    <span>Cursor (AI) Acquisition Closing & SEC Regulatory Clearance</span>
                    <span style={{ color: "var(--emerald-400)", fontFamily: "monospace" }}>Q3 2026</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      backgroundColor: "var(--neutral-900)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  >
                    <span>Starship Integrated Flight Test 7 & Orbital Payload Milestone</span>
                    <span style={{ color: "var(--emerald-400)", fontFamily: "monospace" }}>Oct 2026</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      backgroundColor: "var(--neutral-900)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  >
                    <span>Q3 2026 Quarterly Earnings Release (10-Q SEC Edgar)</span>
                    <span style={{ color: "var(--emerald-400)", fontFamily: "monospace" }}>Nov 2026</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================
              TAB 5: CANDLES & DEPTH
              ============================================================ */}
          {activeTab === "Candles & Depth" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitle}>
                  <Activity size={12} />
                  <span>30-SESSION ASTER DEX HISTORICAL OHLCV CANDLESTICK DATA</span>
                </div>
                <span style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>
                  Interval: 1D • Symbol: {rawData.candles.data.symbol}
                </span>
              </div>

              <div className={styles.tableWrap}>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>Open Time</th>
                      <th>Open</th>
                      <th>High</th>
                      <th>Low</th>
                      <th>Close</th>
                      <th>Day Chg</th>
                      <th>Base Volume</th>
                      <th>Quote Volume (USD)</th>
                      <th>Trades</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rawCandles.map((c) => {
                      const o = parseFloat(c.open);
                      const cl = parseFloat(c.close);
                      const chg = (((cl - o) / o) * 100).toFixed(2);
                      const isUp = cl >= o;
                      return (
                        <tr key={c.open_time}>
                          <td className={styles.tableMonoCell}>
                            {new Date(c.open_time).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </td>
                          <td className={styles.tableMonoCell}>${parseFloat(c.open).toFixed(2)}</td>
                          <td className={styles.tableMonoCell}>${parseFloat(c.high).toFixed(2)}</td>
                          <td className={styles.tableMonoCell}>${parseFloat(c.low).toFixed(2)}</td>
                          <td className={styles.tableMonoCell}>
                            <strong style={{ color: isUp ? "var(--emerald-400)" : "var(--rose-400)" }}>
                              ${parseFloat(c.close).toFixed(2)}
                            </strong>
                          </td>
                          <td className={styles.tableMonoCell}>
                            <span style={{ color: isUp ? "var(--emerald-400)" : "var(--rose-400)" }}>
                              {isUp ? `+${chg}%` : `${chg}%`}
                            </span>
                          </td>
                          <td className={styles.tableMonoCell}>
                            {parseFloat(c.volume).toLocaleString(undefined, { maximumFractionDigits: 1 })}
                          </td>
                          <td className={styles.tableMonoCell}>
                            ${parseFloat(c.quote_volume).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </td>
                          <td className={styles.tableMonoCell}>{c.trades.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className={styles.modalFooter}>
          <div className={styles.footerBadge}>
            <span className={styles.footerDot} />
            <span>Aster DEX & SEC EDGAR Data Feeds · Live Synchronization</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button className={styles.actionBtn} onClick={onClose}>
              Close
            </button>
            <button
              className={`${styles.actionBtn} ${styles.primaryTradeBtn}`}
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent("i5-open-quick-trade", {
                    detail: { ticker: ticker, name: companyName, price: livePriceDisplay },
                  })
                );
                onClose();
              }}
            >
              <span>Trade {ticker}</span>
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
