"use client";

import React, { useState } from "react";
import styles from "./BubbleMapCard.module.css";
import QuickTradeModal, { TradeTokenInfo } from "./QuickTradeModal";

interface BubbleData {
  id: string;
  symbol: string;
  name: string;
  change: number; // e.g. +23.27 or -16.58
  size: number; // diameter in px
  x: number; // percentage from left
  y: number; // percentage from top
  logoUrl?: string;
  logoBg?: string;
  floatClass?: string;
  marketCap?: string;
  vol24h?: string;
}

// Full set of tokens matching the user's reference mockup
const baseBubbles: BubbleData[] = [
  // Primary Mega Bubbles
  {
    id: "gt",
    symbol: "GT",
    name: "GateToken",
    change: 23.27,
    size: 154,
    x: 43,
    y: 36,
    logoBg: "#0052FF",
    floatClass: styles.floatA,
    marketCap: "$1.84B",
    vol24h: "$142M",
  },
  {
    id: "bdx",
    symbol: "BDX",
    name: "Beldex",
    change: -16.58,
    size: 140,
    x: 88,
    y: 44,
    logoBg: "#00E599",
    floatClass: styles.floatB,
    marketCap: "$820M",
    vol24h: "$95M",
  },
  {
    id: "beat",
    symbol: "BEAT",
    name: "MetaBeat",
    change: 16.85,
    size: 132,
    x: 19,
    y: 74,
    logoBg: "#A855F7",
    floatClass: styles.floatC,
    marketCap: "$340M",
    vol24h: "$64M",
  },
  {
    id: "cro",
    symbol: "CRO",
    name: "Cronos",
    change: -11.24,
    size: 122,
    x: 67,
    y: 80,
    logoBg: "#002D74",
    floatClass: styles.floatA,
    marketCap: "$2.45B",
    vol24h: "$180M",
  },
  {
    id: "ena",
    symbol: "ENA",
    name: "Ethena",
    change: -6.04,
    size: 96,
    x: 72,
    y: 40,
    logoBg: "#1E1B4B",
    floatClass: styles.floatB,
    marketCap: "$1.28B",
    vol24h: "$210M",
  },
  {
    id: "mnt",
    symbol: "MNT",
    name: "Mantle",
    change: 3.58,
    size: 88,
    x: 7,
    y: 20,
    logoBg: "#064E3B",
    floatClass: styles.floatC,
    marketCap: "$2.9B",
    vol24h: "$110M",
  },
  {
    id: "okb",
    symbol: "OKB",
    name: "OKB Token",
    change: 3.71,
    size: 82,
    x: 18,
    y: 33,
    logoBg: "#000000",
    floatClass: styles.floatA,
    marketCap: "$3.1B",
    vol24h: "$145M",
  },
  {
    id: "atom",
    symbol: "ATOM",
    name: "Cosmos Hub",
    change: 3.76,
    size: 78,
    x: 36,
    y: 90,
    logoBg: "#2E3148",
    floatClass: styles.floatB,
    marketCap: "$2.2B",
    vol24h: "$98M",
  },
  {
    id: "arb",
    symbol: "ARB",
    name: "Arbitrum",
    change: 2.37,
    size: 72,
    x: 71,
    y: 63,
    logoBg: "#28A0F0",
    floatClass: styles.floatC,
    marketCap: "$2.1B",
    vol24h: "$1.2B",
  },
  {
    id: "ton",
    symbol: "TON",
    name: "Toncoin",
    change: -4.85,
    size: 78,
    x: 93,
    y: 84,
    logoBg: "#0088CC",
    floatClass: styles.floatA,
    marketCap: "$14.5B",
    vol24h: "$380M",
  },
  {
    id: "near",
    symbol: "NEAR",
    name: "NEAR Protocol",
    change: -3.13,
    size: 68,
    x: 82,
    y: 91,
    logoBg: "#000000",
    floatClass: styles.floatB,
    marketCap: "$4.8B",
    vol24h: "$310M",
  },
  {
    id: "stable",
    symbol: "STABLE",
    name: "USDT / USDC",
    change: 1.87,
    size: 66,
    x: 60,
    y: 20,
    logoBg: "#134E4A",
    floatClass: styles.floatC,
    marketCap: "$120B",
    vol24h: "$45B",
  },
  {
    id: "bgb",
    symbol: "BGB",
    name: "Bitget Token",
    change: 1.58,
    size: 60,
    x: 74,
    y: 19,
    logoBg: "#00F0FF",
    floatClass: styles.floatA,
    marketCap: "$1.4B",
    vol24h: "$82M",
  },
  {
    id: "sol",
    symbol: "SOL",
    name: "Solana",
    change: 2.11,
    size: 58,
    x: 5,
    y: 90,
    logoBg: "#14F195",
    floatClass: styles.floatB,
    marketCap: "$68B",
    vol24h: "$4.1B",
  },
  {
    id: "pepe",
    symbol: "PEPE",
    name: "Pepe",
    change: 1.44,
    size: 56,
    x: 4,
    y: 66,
    logoBg: "#15803D",
    floatClass: styles.floatC,
    marketCap: "$4.2B",
    vol24h: "$780M",
  },
  {
    id: "link",
    symbol: "LINK",
    name: "Chainlink",
    change: 1.43,
    size: 54,
    x: 79,
    y: 65,
    logoBg: "#375BD2",
    floatClass: styles.floatA,
    marketCap: "$8.4B",
    vol24h: "$290M",
  },
  {
    id: "vvv",
    symbol: "VVV",
    name: "Victorium",
    change: -2.76,
    size: 56,
    x: 56,
    y: 63,
    logoBg: "#7F1D1D",
    floatClass: styles.floatB,
    marketCap: "$110M",
    vol24h: "$18M",
  },
  {
    id: "doge",
    symbol: "DOGE",
    name: "Dogecoin",
    change: 1.29,
    size: 50,
    x: 4,
    y: 47,
    logoBg: "#C2A633",
    floatClass: styles.floatC,
    marketCap: "$18B",
    vol24h: "$920M",
  },
  {
    id: "icp",
    symbol: "ICP",
    name: "Internet Computer",
    change: 1.29,
    size: 52,
    x: 32,
    y: 19,
    logoBg: "#29ABE2",
    floatClass: styles.floatA,
    marketCap: "$3.8B",
    vol24h: "$120M",
  },
  {
    id: "wld",
    symbol: "WLD",
    name: "Worldcoin",
    change: 1.65,
    size: 52,
    x: 45,
    y: 72,
    logoBg: "#000000",
    floatClass: styles.floatB,
    marketCap: "$920M",
    vol24h: "$210M",
  },
  {
    id: "morpho",
    symbol: "MORPHO",
    name: "Morpho Protocol",
    change: 1.27,
    size: 50,
    x: 44,
    y: 93,
    logoBg: "#0284C7",
    floatClass: styles.floatC,
    marketCap: "$420M",
    vol24h: "$38M",
  },
  {
    id: "wlfi",
    symbol: "WLFI",
    name: "World Liberty",
    change: -1.85,
    size: 52,
    x: 82,
    y: 18,
    logoBg: "#D97706",
    floatClass: styles.floatA,
    marketCap: "$290M",
    vol24h: "$42M",
  },
  {
    id: "lit",
    symbol: "LIT",
    name: "Litentry",
    change: -1.94,
    size: 46,
    x: 28,
    y: 47,
    logoBg: "#1E293B",
    floatClass: styles.floatB,
    marketCap: "$88M",
    vol24h: "$12M",
  },
  {
    id: "jup",
    symbol: "JUP",
    name: "Jupiter",
    change: -1.27,
    size: 48,
    x: 10,
    y: 39,
    logoBg: "#14B8A6",
    floatClass: styles.floatC,
    marketCap: "$1.4B",
    vol24h: "$190M",
  },
  {
    id: "m",
    symbol: "M",
    name: "Memecoin",
    change: -1.56,
    size: 44,
    x: 52,
    y: 87,
    logoBg: "#6B21A8",
    floatClass: styles.floatA,
    marketCap: "$180M",
    vol24h: "$24M",
  },
  // Micro Accents & Scatter Bubbles
  {
    id: "nexo",
    symbol: "NEXO",
    name: "Nexo",
    change: 0.89,
    size: 38,
    x: 24,
    y: 16,
    logoBg: "#1E3A8A",
    marketCap: "$620M",
  },
  {
    id: "ondo",
    symbol: "ONDO",
    name: "Ondo Finance",
    change: 0.75,
    size: 38,
    x: 27,
    y: 63,
    logoBg: "#0F766E",
    marketCap: "$1.1B",
  },
  {
    id: "xaut",
    symbol: "XAUT",
    name: "Tether Gold",
    change: 0.72,
    size: 34,
    x: 60,
    y: 47,
    logoBg: "#B45309",
    marketCap: "$590M",
  },
  {
    id: "wbnb",
    symbol: "WBNB",
    name: "Wrapped BNB",
    change: 0.61,
    size: 32,
    x: 69,
    y: 14,
    logoBg: "#F59E0B",
    marketCap: "$82B",
  },
  {
    id: "paxg",
    symbol: "PAXG",
    name: "PAX Gold",
    change: 0.64,
    size: 34,
    x: 84,
    y: 74,
    logoBg: "#D97706",
    marketCap: "$420M",
  },
  {
    id: "qnt",
    symbol: "QNT",
    name: "Quant",
    change: 0.56,
    size: 34,
    x: 76,
    y: 76,
    logoBg: "#000000",
    marketCap: "$1.2B",
  },
  {
    id: "pol",
    symbol: "POL",
    name: "Polygon Ecosystem",
    change: -0.83,
    size: 36,
    x: 64,
    y: 54,
    logoBg: "#7C3AED",
    marketCap: "$3.6B",
  },
  {
    id: "ada",
    symbol: "ADA",
    name: "Cardano",
    change: -1.25,
    size: 38,
    x: 9,
    y: 54,
    logoBg: "#0033AD",
    marketCap: "$14B",
  },
  {
    id: "wbt",
    symbol: "WBT",
    name: "WhiteBIT Coin",
    change: 0.84,
    size: 32,
    x: 96,
    y: 67,
    logoBg: "#1F2937",
    marketCap: "$2.8B",
  },
  {
    id: "weth",
    symbol: "WETH",
    name: "Wrapped Ether",
    change: 0.37,
    size: 30,
    x: 46,
    y: 84,
    logoBg: "#374151",
    marketCap: "$8.4B",
  },
];

export default function BubbleMapCard() {
  const [timeframe, setTimeframe] = useState<string>("24H");
  const [hoveredBubble, setHoveredBubble] = useState<BubbleData | null>(null);
  const [tradeModalOpen, setTradeModalOpen] = useState<boolean>(false);
  const [selectedTradeToken, setSelectedTradeToken] = useState<TradeTokenInfo | null>(null);
  const [tradeSide, setTradeSide] = useState<"LONG" | "SHORT">("LONG");

  // Dynamic multiplier based on selected timeframe
  const timeframeMultiplier: Record<string, number> = {
    "4H": 0.35,
    "24H": 1.0,
    "7D": 2.4,
    "30D": 4.8,
    "1Y": 11.2,
  };

  const mult = timeframeMultiplier[timeframe] || 1.0;

  const handleBubbleClick = (bubble: BubbleData, isPositive: boolean, dynamicChange: number) => {
    const tokenInfo: TradeTokenInfo = {
      symbol: bubble.symbol,
      name: bubble.name,
      price:
        bubble.symbol === "GT"
          ? "$12.45"
          : bubble.symbol === "BDX"
          ? "$0.048"
          : bubble.symbol === "ATOM"
          ? "$9.20"
          : bubble.symbol === "ARB"
          ? "$2.11"
          : bubble.symbol === "TON"
          ? "$5.60"
          : "$4.85",
      change24h: `${isPositive ? "+" : ""}${dynamicChange}%`,
      isPositive: isPositive,
      avatarBg: bubble.logoBg,
      exchanges: ["Hyperliquid", "Aster"],
    };

    setSelectedTradeToken(tokenInfo);
    // If green/positive -> LONG, if red/negative -> SHORT
    setTradeSide(isPositive ? "LONG" : "SHORT");
    setTradeModalOpen(true);
  };

  return (
    <div className={styles.card} role="region" aria-label="Crypto Bubble Map Visualization">
      {/* Top Header Bar */}
      <div className={styles.header}>
        {/* Left Dropdown Pill + Expand Action */}
        <div className={styles.leftControls}>
          <button className={styles.dropdownPill} aria-label="Select Bubble Map view">
            <span className={styles.scatterIcon}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="5" cy="5" r="2.5" />
                <circle cx="11" cy="7" r="3.5" />
                <circle cx="6" cy="12" r="2" />
              </svg>
            </span>
            <span>BUBBLE MAP</span>
            <span className={styles.infoIcon}>ⓘ</span>
            <span className={styles.chevronIcon}>▼</span>
          </button>

          <button className={styles.expandBtn} aria-label="Expand Bubble Map view">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 2.5h3.5V6M13.5 2.5L7.5 8.5M6 13.5H2.5V10M2.5 13.5L8.5 7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Right Timeframe Filter Switcher */}
        <div className={styles.timeframeGroup}>
          {["4H", "24H", "7D", "30D", "1Y"].map((tf) => (
            <button
              key={tf}
              className={`${styles.tfBtn} ${timeframe === tf ? styles.tfBtnActive : ""}`}
              onClick={() => setTimeframe(tf)}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive 3D Bubble Canvas Container */}
      <div className={styles.canvasArea}>
        {baseBubbles.map((bubble) => {
          const dynamicChange = Number((bubble.change * mult).toFixed(2));
          const isPositive = dynamicChange >= 0;
          const formattedChange = `${isPositive ? "+" : ""}${dynamicChange}%`;

          // Scale font size according to bubble diameter
          const isTiny = bubble.size < 42;
          const isSmall = bubble.size >= 42 && bubble.size < 70;
          const isMedium = bubble.size >= 70 && bubble.size < 110;
          const isLarge = bubble.size >= 110;

          const symbolSize = isLarge ? 20 : isMedium ? 14 : isSmall ? 10 : 8;
          const changeSize = isLarge ? 14 : isMedium ? 11 : isSmall ? 9 : 7;
          const logoDimension = isLarge ? 32 : isMedium ? 22 : isSmall ? 14 : 10;

          return (
            <div
              key={bubble.id}
              className={`${styles.bubble} ${isPositive ? styles.bubbleGreen : styles.bubbleRed} ${
                bubble.floatClass || ""
              }`}
              style={{
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                left: `calc(${bubble.x}% - ${bubble.size / 2}px)`,
                top: `calc(${bubble.y}% - ${bubble.size / 2}px)`,
                cursor: "pointer",
              }}
              onClick={() => handleBubbleClick(bubble, isPositive, dynamicChange)}
              onMouseEnter={() => setHoveredBubble(bubble)}
              onMouseLeave={() => setHoveredBubble(null)}
              title={`Click to Quick Trade ${isPositive ? "Long" : "Short"} on ${bubble.symbol}`}
            >
              {/* Optional Token Icon / Logo Badge */}
              <div
                className={styles.bubbleLogo}
                style={{
                  width: `${logoDimension}px`,
                  height: `${logoDimension}px`,
                  backgroundColor: bubble.logoBg || "rgba(255,255,255,0.2)",
                }}
              >
                <span
                  style={{
                    fontSize: `${Math.max(7, logoDimension * 0.55)}px`,
                    fontWeight: 900,
                    color: "#ffffff",
                  }}
                >
                  {bubble.symbol.slice(0, 1)}
                </span>
              </div>

              {/* Symbol Ticker */}
              <span className={styles.bubbleSymbol} style={{ fontSize: `${symbolSize}px` }}>
                {bubble.symbol}
              </span>

              {/* Change % */}
              <span className={styles.bubbleChange} style={{ fontSize: `${changeSize}px` }}>
                {formattedChange}
              </span>

              {/* Detailed Metrics Tooltip on Hover */}
              {hoveredBubble?.id === bubble.id && (
                <div className={styles.tooltip}>
                  <div className={styles.tooltipTitle}>{bubble.name}</div>
                  <div className={styles.tooltipMeta}>
                    Vol: {bubble.vol24h || "$50M+"} · MC: {bubble.marketCap || "$500M+"}
                  </div>
                  <div style={{ marginTop: "4px", fontSize: "10px", color: isPositive ? "var(--emerald-500)" : "var(--rose-500)", fontWeight: 700 }}>
                    ⚡ Click to Trade {isPositive ? "LONG" : "SHORT"}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Trade Modal */}
      <QuickTradeModal
        isOpen={tradeModalOpen}
        onClose={() => setTradeModalOpen(false)}
        token={selectedTradeToken}
        initialSide={tradeSide}
        exchange="Hyperliquid"
      />
    </div>
  );
}
