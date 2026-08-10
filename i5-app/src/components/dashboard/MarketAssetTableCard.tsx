"use client";

import React, { useState } from "react";
import { Brain, Briefcase, BarChart3, Coins, ArrowLeftRight, Zap, Check, Copy, SlidersHorizontal } from "lucide-react";
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
}

interface SmartMoneyItem {
  id: string;
  symbol: string;
  name: string;
  avatar: string;
  avatarBg?: string;
  age: string;
  address: string;
  price: string;
  priceSubscript?: string;
  priceRest?: string;
  change: string;
  changeType: "green" | "red" | "grey";
  mc: string;
  volumeInflow: string;
  brainCount: number;
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
  },
];

const mockSmartMoneyData: SmartMoneyItem[] = [
  {
    id: "sm-1",
    symbol: "jlUSDC",
    name: "Jupiter Lend USDC",
    avatar: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?w=100&auto=format&fit=crop&q=80",
    age: "1y",
    address: "9BEcn9aP",
    price: "$1.0438",
    change: "0%",
    changeType: "grey",
    mc: "$403.88M",
    volumeInflow: "$21.29M",
    brainCount: 7,
  },
  {
    id: "sm-2",
    symbol: "CATE",
    name: "Catecoin",
    avatar: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100&auto=format&fit=crop&q=80",
    age: "8h",
    address: "KxbP5KGz",
    price: "$0.0",
    priceSubscript: "5",
    priceRest: "13086",
    change: "-99.99%",
    changeType: "red",
    mc: "$1.3K",
    volumeInflow: "$369.51K",
    brainCount: 1,
  },
  {
    id: "sm-3",
    symbol: "TNOS",
    name: "TNOS",
    avatar: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=100&auto=format&fit=crop&q=80",
    age: "20h",
    address: "QitXH6aa",
    price: "$0.0",
    priceSubscript: "5",
    priceRest: "13142",
    change: "-99.99%",
    changeType: "red",
    mc: "$1.31K",
    volumeInflow: "$289.48K",
    brainCount: 1,
  },
  {
    id: "sm-4",
    symbol: "TNOS",
    name: "TNOS",
    avatar: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=100&auto=format&fit=crop&q=80",
    age: "16h",
    address: "qJVwmPZK",
    price: "$0.0",
    priceSubscript: "4",
    priceRest: "4710",
    change: "-99.92%",
    changeType: "red",
    mc: "$47.1K",
    volumeInflow: "$288.7K",
    brainCount: 1,
  },
  {
    id: "sm-5",
    symbol: "TNOS",
    name: "TNOS",
    avatar: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=100&auto=format&fit=crop&q=80",
    age: "5h",
    address: "TzvZvrze",
    price: "$0.1198",
    change: "+1M%",
    changeType: "green",
    mc: "$119.88M",
    volumeInflow: "$222.07K",
    brainCount: 1,
  },
];

const categoryPills = ["All", "Gainers", "Losers", "Trending", "Cryptos", "Stocks", "AI", "DeFi"];

export default function MarketAssetTableCard() {
  const [primaryTab, setPrimaryTab] = useState<"trending" | "smartMoney">("trending");
  const [activePill, setActivePill] = useState<string>("All");
  const [riskTab, setRiskTab] = useState<string>("RISK AVERSE");

  return (
    <div className={styles.card} role="region" aria-label="Market Asset Radar">
      {/* Primary Pill Tabs Header (TRENDING TOKENS vs SMART MONEY) */}
      <div className={styles.tabsHeader}>
        <div className={styles.tabsList} role="tablist">
          <button
            role="tab"
            aria-selected={primaryTab === "trending"}
            className={`${styles.tabBtn} ${primaryTab === "trending" ? styles.tabBtnActive : ""}`}
            onClick={() => setPrimaryTab("trending")}
          >
            TRENDING TOKENS
          </button>
          <button
            role="tab"
            aria-selected={primaryTab === "smartMoney"}
            className={`${styles.tabBtn} ${primaryTab === "smartMoney" ? styles.tabBtnActive : ""}`}
            onClick={() => setPrimaryTab("smartMoney")}
          >
            SMART MONEY
          </button>
        </div>

        <button className={styles.viewMoreLink}>View more ↗</button>
      </div>

      {primaryTab === "trending" ? (
        /* TRENDING TOKENS VIEW (Radar Table) */
        <>
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
                          style={{ backgroundColor: asset.avatarBg, position: "relative", overflow: "hidden" }}
                        >
                          <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {asset.symbol.slice(0, 2)}
                          </span>
                          <img
                            src={
                              ["NVDA", "MSFT", "TSLA", "AAPL", "AMD"].includes(asset.symbol)
                                ? `https://icons.duckduckgo.com/ip3/${
                                    ({
                                      NVDA: "nvidia.com",
                                      MSFT: "microsoft.com",
                                      TSLA: "tesla.com",
                                      AAPL: "apple.com",
                                      AMD: "amd.com",
                                    } as Record<string, string>)[asset.symbol]
                                  }.ico`
                                : `https://assets.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`
                            }
                            alt={asset.symbol}
                            style={{
                              position: "absolute",
                              inset: 0,
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                              padding: "4px",
                              borderRadius: "50%",
                              backgroundColor: "inherit",
                            }}
                            onError={(e) => {
                              const img = e.currentTarget;
                              if (img.src.includes("coincap.io")) {
                                img.src = `https://cryptologos.cc/logos/${asset.name.toLowerCase().split(" ")[0]}-${asset.symbol.toLowerCase()}-logo.svg?v=032`;
                              } else {
                                img.style.display = "none";
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
                      <span className={`${styles.smartBadge} ${styles[asset.smartMoneyType]}`}>
                        {asset.smartMoney}
                      </span>
                    </td>

                    {/* Trade Button */}
                    <td style={{ textAlign: "right" }}>
                      <button className={styles.tradeBtn}>TRADE</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        /* SMART MONEY VIEW */
        <>
          {/* Risk Profile Segmented Control */}
          <div className={styles.segmentedControl}>
            {["RISK AVERSE", "RISK BALANCERS", "TRENCHERS"].map((tab) => (
              <button
                key={tab}
                className={`${styles.riskTabBtn} ${riskTab === tab ? styles.riskTabActive : ""}`}
                onClick={() => setRiskTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Overview Stat Pills Bar */}
          <div className={styles.statsOverviewBar}>
            <span className={styles.statPill} style={{ display: "flex", alignItems: "center", gap: 4 }}><Brain size={14} /> 2.59K</span>
            <span className={styles.statPill} style={{ display: "flex", alignItems: "center", gap: 4 }}><Briefcase size={14} /> $33.58K</span>
            <span className={styles.statPill} style={{ display: "flex", alignItems: "center", gap: 4 }}><BarChart3 size={14} /> $328.89K</span>
            <span className={styles.statPill} style={{ display: "flex", alignItems: "center", gap: 4 }}><Coins size={14} /> 6</span>
            <span className={styles.statPill} style={{ display: "flex", alignItems: "center", gap: 4 }}><ArrowLeftRight size={14} /> 335.75</span>
          </div>

          {/* Smart Money Token Cards List */}
          <div className={styles.smartList}>
            {mockSmartMoneyData.map((item) => (
              <div key={item.id} className={styles.smartCard}>
                {/* Left Side: Avatar & Token Details */}
                <div className={styles.smartLeft}>
                  <div className={styles.smartAvatarWrapper}>
                    <img src={item.avatar} alt={item.symbol} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
                    <span className={styles.chainLogoBadge}><Zap size={8} /></span>
                    <span className={styles.verifiedBadge}><Check size={8} /></span>
                  </div>

                  <div className={styles.smartIdentity}>
                    <div className={styles.symbolNameRow}>
                      <span className={styles.symbol}>{item.symbol}</span>
                      <span className={styles.name}>{item.name}</span>
                    </div>

                    <div className={styles.subMetaRow}>
                      <span className={styles.ageBadge}>{item.age}</span>
                      <span className={styles.contractAddress}>
                        {item.address}
                        <button className={styles.copyBtn} title="Copy contract address"><Copy size={12} /></button>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Price, 24h %, MC, Inflow & Brain count */}
                <div className={styles.smartRight}>
                  <div className={styles.priceRow}>
                    <span className={styles.priceText}>
                      {item.price}
                      {item.priceSubscript && <sub style={{ fontSize: "9px" }}>{item.priceSubscript}</sub>}
                      {item.priceRest}
                    </span>
                    <span
                      className={
                        item.changeType === "red"
                          ? styles.changeRed
                          : item.changeType === "green"
                          ? styles.changeGreen
                          : styles.changeGrey
                      }
                    >
                      {item.change}
                    </span>
                    <span className={styles.mcSpan}>
                      MC <span className={styles.mcBold}>{item.mc}</span>
                    </span>
                  </div>

                  <div className={styles.bottomSignalsRow}>
                    <span className={styles.volSignal} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <SlidersHorizontal size={12} /> {item.volumeInflow}
                    </span>
                    <span className={styles.brainBadge} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Brain size={12} /> {item.brainCount}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
