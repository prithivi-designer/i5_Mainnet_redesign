"use client";

import React, { useState } from "react";
import styles from "./MarketAssetTableCard.module.css";

interface AssetItem {
  symbol: string;
  name: string;
  avatarBg: string;
  price: string;
  change24h: string;
  isPositive: boolean;
  vol24h: string;
  smartMoney: string;
  smartMoneyType: "accumulating" | "distribution" | "whale" | "smartLong";
  aiScore: number;
  narrative: string;
}

const mockAssetData: AssetItem[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    avatarBg: "#163A24",
    price: "$2,455.5979",
    change24h: "+3.42%",
    isPositive: true,
    vol24h: "$14.2B",
    smartMoney: "ACCUMULATING",
    smartMoneyType: "accumulating",
    aiScore: 92,
    narrative: "Layer 1",
  },
  {
    symbol: "SOL",
    name: "Solana",
    avatarBg: "#1F2B37",
    price: "$102.6037",
    change24h: "-1.12%",
    isPositive: false,
    vol24h: "$4.1B",
    smartMoney: "DISTRIBUTION",
    smartMoneyType: "distribution",
    aiScore: 64,
    narrative: "DePIN",
  },
  {
    symbol: "TIA",
    name: "Celestia",
    avatarBg: "#133E38",
    price: "$18.2674",
    change24h: "+8.15%",
    isPositive: true,
    vol24h: "$820M",
    smartMoney: "WHALE ENTRY",
    smartMoneyType: "whale",
    aiScore: 96,
    narrative: "Modular DA",
  },
  {
    symbol: "ARB",
    name: "Arbitrum",
    avatarBg: "#3A2A14",
    price: "$2.1132",
    change24h: "+2.10%",
    isPositive: true,
    vol24h: "$1.2B",
    smartMoney: "SMART LONG",
    smartMoneyType: "smartLong",
    aiScore: 81,
    narrative: "Layer 2",
  },
  {
    symbol: "SUI",
    name: "Sui Network",
    avatarBg: "#163A24",
    price: "$3.4520",
    change24h: "+12.40%",
    isPositive: true,
    vol24h: "$950M",
    smartMoney: "ACCUMULATING",
    smartMoneyType: "accumulating",
    aiScore: 94,
    narrative: "Move Infra",
  },
  {
    symbol: "RENDER",
    name: "Render Token",
    avatarBg: "#133E38",
    price: "$6.4500",
    change24h: "+5.80%",
    isPositive: true,
    vol24h: "$320M",
    smartMoney: "WHALE ENTRY",
    smartMoneyType: "whale",
    aiScore: 88,
    narrative: "AI Compute",
  },
];

const categoryPills = ["All", "Gainers", "Losers", "Trending", "Cryptos", "Stocks", "AI", "DeFi"];

export default function MarketAssetTableCard() {
  const [activePill, setActivePill] = useState<string>("All");

  return (
    <div className={styles.card} role="region" aria-label="Market Asset Intelligence Radar">
      {/* Top Header Bar */}
      <div className={styles.topHeader}>
        <div className={styles.headerTitleGroup}>
          <span className={styles.headerIcon}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M8 1.5L2.5 4V8C2.5 11.5 5 14 8 15.5C11 14 13.5 11.5 13.5 8V4L8 1.5Z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <h3 className={styles.titleText}>Market Asset Radar</h3>
        </div>
      </div>

      {/* Category Pills Header Bar */}
      <div className={styles.pillsRow}>
        <div className={styles.pillsList}>
          {categoryPills.map((pill) => (
            <button
              key={pill}
              className={`${styles.pillBtn} ${activePill === pill ? styles.activePill : ""}`}
              onClick={() => setActivePill(pill)}
            >
              {pill}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ASSET</th>
              <th>PRICE</th>
              <th>24H %</th>
              <th>VOL (24H)</th>
              <th>SMART MONEY</th>
              <th>AI SCORE</th>
              <th>NARRATIVE</th>
              <th style={{ textAlign: "right" }}>TRADE</th>
            </tr>
          </thead>
          <tbody>
            {mockAssetData.map((asset) => (
              <tr key={asset.symbol}>
                {/* Asset Column */}
                <td>
                  <div className={styles.assetCell}>
                    <span
                      className={styles.assetAvatar}
                      style={{ backgroundColor: asset.avatarBg, position: 'relative', overflow: 'hidden' }}
                    >
                      <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {asset.symbol.slice(0, 2)}
                      </span>
                      <img
                        src={['NVDA', 'MSFT', 'TSLA', 'AAPL', 'AMD'].includes(asset.symbol) ? `https://icons.duckduckgo.com/ip3/${({ NVDA: 'nvidia.com', MSFT: 'microsoft.com', TSLA: 'tesla.com', AAPL: 'apple.com', AMD: 'amd.com' } as Record<string, string>)[asset.symbol]}.ico` : `https://assets.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`}
                        alt={asset.symbol}
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', padding: '4px', borderRadius: '50%', backgroundColor: 'inherit' }}
                        onError={(e) => {
                          const img = e.currentTarget;
                          if (img.src.includes('coincap.io')) {
                            img.src = `https://cryptologos.cc/logos/${asset.name.toLowerCase().split(' ')[0]}-${asset.symbol.toLowerCase()}-logo.svg?v=032`;
                          } else {
                            img.style.display = 'none';
                          }
                        }}
                      />
                    </span>
                    <div className={styles.assetMeta}>
                      <span className={styles.assetSymbol}>{asset.symbol}</span>
                      <span className={styles.assetName}>{asset.name}</span>
                    </div>
                  </div>
                </td>

                {/* Price */}
                <td className={styles.priceCell}>{asset.price}</td>

                {/* 24h % */}
                <td className={asset.isPositive ? styles.gainCell : styles.lossCell}>
                  {asset.change24h}
                </td>

                {/* Vol 24h */}
                <td className={styles.volCell}>{asset.vol24h}</td>

                {/* Smart Money Badge */}
                <td>
                  <span
                    className={`${styles.smartBadge} ${
                      styles[asset.smartMoneyType]
                    }`}
                  >
                    {asset.smartMoney}
                  </span>
                </td>

                {/* AI Score */}
                <td>
                  <div className={styles.aiScoreCell}>
                    <span className={styles.aiScoreNum}>{asset.aiScore}</span>
                    <div className={styles.aiProgressBar}>
                      <div
                        className={styles.aiProgressFill}
                        style={{ width: `${asset.aiScore}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* Narrative */}
                <td className={styles.narrativeCell}>{asset.narrative}</td>

                {/* Trade Button */}
                <td style={{ textAlign: "right" }}>
                  <button className={styles.tradeBtn}>TRADE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
