"use client";

import React, { useState } from "react";
import {
  Settings,
  Eye,
  EyeOff,
  Copy,
  Check,
  Globe,
  MessageCircle,
  Search,
  Users,
  Clock,
  Edit3,
  Link2,
  Coins,
  Camera,
  User,
  Shield,
  Lock,
  ChevronDown,
  Layers,
  Sparkles,
  ArrowUpDown,
} from "lucide-react";
import styles from "./MemeDiscoverView.module.css";

interface DiscoverToken {
  id: string;
  name: string;
  subname: string;
  contract: string;
  avatarText?: string;
  avatarBg?: string;
  avatarImg?: string;
  age: string;
  socialIcons: string[]; // ["globe", "chat", "search", "users", "clock", "edit", "link", "coin", "insta"]
  socialCount: number;
  marketCap: string;
  priceChange: string;
  isPositive: boolean;
  sparklineType: "down1" | "up1" | "down2" | "up2" | "up3" | "up4" | "up5" | "up6";
  liquidity: string;
  volume: string;
  txnsTotal: string;
  txnsBuys: string;
  txnsSells: string;
  devHolding: string;
  devHoldingRed?: boolean;
  top10Holding: string;
  top10Red?: boolean;
  devBurnt?: string;
  lockedLiq?: string;
  lockedLiqRed?: boolean;
  rugScore?: string;
  rugScoreRed?: boolean;
  statusBadge: "Paid" | "Unpaid";
  holdersCount?: string;
  makersCount?: string;
}

const DISCOVER_TOKENS: DiscoverToken[] = [
  {
    id: "fomo-1",
    name: "fomocoin",
    subname: "fomocoin",
    contract: "7kJm98F4pump1XyZ",
    avatarText: "fomo",
    avatarBg: "#121212",
    age: "17m",
    socialIcons: ["globe", "chat", "search"],
    socialCount: 362,
    marketCap: "$87.6K",
    priceChange: "-5.68%",
    isPositive: false,
    sparklineType: "down1",
    liquidity: "$22.6K",
    volume: "$77.4K",
    txnsTotal: "1.37K",
    txnsBuys: "777",
    txnsSells: "589",
    devHolding: "16.07%",
    devHoldingRed: true,
    top10Holding: "4.74%",
    devBurnt: "0%",
    lockedLiq: "15.24%",
    lockedLiqRed: true,
    rugScore: "0%",
    statusBadge: "Unpaid",
    holdersCount: "797",
    makersCount: "389",
  },
  {
    id: "app-2",
    name: "App",
    subname: "Sent from my P...",
    contract: "3T2W98F4pump2AbC",
    avatarText: "💊",
    avatarBg: "#166534",
    avatarImg: "https://cryptologos.cc/logos/pepe-pepe-logo.png",
    age: "1d",
    socialIcons: ["users", "globe", "coin", "search"],
    socialCount: 31,
    marketCap: "$412K",
    priceChange: "+57.99%",
    isPositive: true,
    sparklineType: "up1",
    liquidity: "$56.2K",
    volume: "$45.4K",
    txnsTotal: "237",
    txnsBuys: "111",
    txnsSells: "126",
    devHolding: "N/A",
    devHoldingRed: true,
    top10Holding: "0%",
    devBurnt: "0%",
    lockedLiq: "0%",
    rugScore: "0%",
    statusBadge: "Paid",
  },
  {
    id: "fomo-3",
    name: "fomocoin",
    subname: "fomocoin",
    contract: "HK3f98F4pump3DeF",
    avatarText: "fomo",
    avatarBg: "#141414",
    age: "16m",
    socialIcons: ["globe", "clock", "search"],
    socialCount: 92,
    marketCap: "$11.4K",
    priceChange: "-35.9%",
    isPositive: false,
    sparklineType: "down2",
    liquidity: "$8.02K",
    volume: "$28.4K",
    txnsTotal: "681",
    txnsBuys: "358",
    txnsSells: "323",
    devHolding: "20.49%",
    devHoldingRed: true,
    top10Holding: "0.59%",
    devBurnt: "0%",
    lockedLiq: "11.67%",
    lockedLiqRed: true,
    rugScore: "0%",
    statusBadge: "Paid",
    holdersCount: "315",
    makersCount: "124",
  },
  {
    id: "dudeass-4",
    name: "dudeass",
    subname: "Mike Dud...",
    contract: "9jkj98F4pump4GhI",
    avatarText: "🏄",
    avatarBg: "#1e3a8a",
    avatarImg: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
    age: "4d",
    socialIcons: ["edit", "clock", "search"],
    socialCount: 32,
    marketCap: "$8.2K",
    priceChange: "+266.3%",
    isPositive: true,
    sparklineType: "up2",
    liquidity: "$7.43K",
    volume: "$5.7K",
    txnsTotal: "96",
    txnsBuys: "57",
    txnsSells: "39",
    devHolding: "N/A",
    devHoldingRed: true,
    top10Holding: "0%",
    devBurnt: "0%",
    lockedLiq: "0%",
    rugScore: "0%",
    statusBadge: "Paid",
  },
  {
    id: "pumpcoin-5",
    name: "pumpcoin",
    subname: "pumpcoin",
    contract: "4Mv898F4pump5JkL",
    avatarText: "pump",
    avatarBg: "#052e16",
    age: "13m",
    socialIcons: ["edit", "link", "globe", "coin", "search"],
    socialCount: 49,
    marketCap: "$12.5K",
    priceChange: "+5.485%",
    isPositive: true,
    sparklineType: "up3",
    liquidity: "$11K",
    volume: "$11K",
    txnsTotal: "267",
    txnsBuys: "157",
    txnsSells: "110",
    devHolding: "19.55%",
    devHoldingRed: true,
    top10Holding: "8.12%",
    devBurnt: "0%",
    lockedLiq: "18.37%",
    lockedLiqRed: true,
    rugScore: "0%",
    statusBadge: "Unpaid",
    holdersCount: "203",
    makersCount: "58",
  },
  {
    id: "amani-6",
    name: "Amani",
    subname: "The Rare Cra...",
    contract: "CzA198F4pump6MnO",
    avatarText: "🦤",
    avatarBg: "#3b2d18",
    avatarImg: "https://cryptologos.cc/logos/bonk1-bonk-logo.png",
    age: "3m",
    socialIcons: ["edit", "link", "globe", "coin", "search"],
    socialCount: 26,
    marketCap: "$7.39K",
    priceChange: "+133.9%",
    isPositive: true,
    sparklineType: "up4",
    liquidity: "$8.5K",
    volume: "$8.72K",
    txnsTotal: "168",
    txnsBuys: "122",
    txnsSells: "46",
    devHolding: "26.79%",
    devHoldingRed: true,
    top10Holding: "1.67%",
    devBurnt: "0%",
    lockedLiq: "6.21%",
    rugScore: "1.75%",
    statusBadge: "Unpaid",
    holdersCount: "33",
    makersCount: "30",
  },
  {
    id: "capy-7",
    name: "Capy",
    subname: "Jumbo Capy",
    contract: "5Ca298F4pump7PqR",
    avatarText: "🦫",
    avatarBg: "#451a03",
    avatarImg: "https://cryptologos.cc/logos/shiba-inu-shib-logo.png",
    age: "44m",
    socialIcons: ["users", "coin", "search"],
    socialCount: 100,
    marketCap: "$103K",
    priceChange: "+4.48%",
    isPositive: true,
    sparklineType: "up5",
    liquidity: "$24.8K",
    volume: "$17.7K",
    txnsTotal: "282",
    txnsBuys: "150",
    txnsSells: "132",
    devHolding: "20.67%",
    devHoldingRed: true,
    top10Holding: "5.2%",
    devBurnt: "0%",
    lockedLiq: "2.89%",
    rugScore: "0%",
    statusBadge: "Unpaid",
    holdersCount: "808",
    makersCount: "263",
  },
  {
    id: "joking-8",
    name: "JOKING",
    subname: "The Aura C...",
    contract: "4Z6W98F4pump8StU",
    avatarText: "🐕",
    avatarBg: "#2e1065",
    avatarImg: "https://cryptologos.cc/logos/dogwifhat-wif-logo.png",
    age: "50m",
    socialIcons: ["users", "insta", "coin", "search"],
    socialCount: 37,
    marketCap: "$14.3K",
    priceChange: "+14.29%",
    isPositive: true,
    sparklineType: "up6",
    liquidity: "$11.8K",
    volume: "$5.78K",
    txnsTotal: "128",
    txnsBuys: "73",
    txnsSells: "55",
    devHolding: "21.69%",
    devHoldingRed: true,
    top10Holding: "0.75%",
    devBurnt: "0%",
    lockedLiq: "9.62%",
    rugScore: "0%",
    statusBadge: "Paid",
    holdersCount: "140",
    makersCount: "56",
  },
];

export default function MemeDiscoverView() {
  const [subFilter, setSubFilter] = useState<"top" | "trending" | "surge">("trending");
  const [timeframe, setTimeframe] = useState<"1m" | "5m" | "30m" | "1h">("5m");
  const [quickBuyAmount, setQuickBuyAmount] = useState<string>("0.0");
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleCopy = (contract: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(contract);
    setCopiedId(id);
    showToast(`Contract copied: ${contract}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePresetClick = (preset: string, amount: string) => {
    setActivePreset(preset);
    setQuickBuyAmount(amount);
    showToast(`Quick Buy set to ${amount} SOL (${preset})`);
  };

  const handleBuy = (token: DiscoverToken, e: React.MouseEvent) => {
    e.stopPropagation();
    const amt = quickBuyAmount !== "0.0" && quickBuyAmount !== "" ? `${quickBuyAmount} SOL` : "Instant Buy";
    showToast(`Initiated ${amt} order for ${token.name}`);
  };

  // Render Sparkline SVG according to type
  const renderSparkline = (type: string, isPositive: boolean) => {
    const stroke = isPositive ? "var(--color-chart-bullish, #2fcb73)" : "var(--color-chart-bearish, #e13b3b)";
    let path = "M 0 14 Q 20 6, 35 18 T 72 8";

    if (type === "down1") {
      path = "M 0 6 Q 15 8, 25 18 T 45 14 T 60 22 T 72 20";
    } else if (type === "down2") {
      path = "M 0 8 Q 18 10, 30 20 T 50 16 T 72 24";
    } else if (type === "up1") {
      path = "M 0 24 L 18 24 L 20 14 L 40 14 L 44 8 L 72 6";
    } else if (type === "up2") {
      path = "M 0 22 Q 25 22, 45 16 T 65 8 L 72 6";
    } else if (type === "up3") {
      path = "M 0 20 Q 20 22, 35 14 T 55 12 T 72 8";
    } else if (type === "up4") {
      path = "M 0 22 Q 20 20, 40 18 T 60 12 L 72 8";
    } else if (type === "up5") {
      path = "M 0 20 Q 15 22, 30 16 T 50 12 T 65 14 T 72 8";
    } else if (type === "up6") {
      path = "M 0 24 Q 20 20, 35 12 T 55 16 T 72 6";
    }

    return (
      <svg className={styles.sparklineSvg} viewBox="0 0 72 28" fill="none">
        <path d={path} stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  const renderSocialIcon = (type: string, idx: number) => {
    switch (type) {
      case "globe":
        return <Globe key={idx} size={11} className={styles.metaIcon} />;
      case "chat":
        return <MessageCircle key={idx} size={11} className={styles.metaIcon} />;
      case "search":
        return <Search key={idx} size={11} className={styles.metaIcon} />;
      case "users":
        return <Users key={idx} size={11} className={styles.metaIcon} />;
      case "clock":
        return <Clock key={idx} size={11} className={styles.metaIcon} />;
      case "edit":
        return <Edit3 key={idx} size={11} className={styles.metaIcon} />;
      case "link":
        return <Link2 key={idx} size={11} className={styles.metaIcon} />;
      case "coin":
        return <Coins key={idx} size={11} className={styles.metaIcon} />;
      case "insta":
        return <Camera key={idx} size={11} className={styles.metaIcon} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      {/* Sub Header Navigation & Filters Bar */}
      <div className={styles.subHeader}>
        {/* Left Subtabs */}
        <div className={styles.leftControls}>
          <button
            className={`${styles.subTabBtn} ${subFilter === "top" ? styles.subTabBtnActive : ""}`}
            onClick={() => setSubFilter("top")}
          >
            Top
          </button>
          <button
            className={`${styles.subTabBtn} ${subFilter === "trending" ? styles.subTabBtnActive : ""}`}
            onClick={() => setSubFilter("trending")}
          >
            Trending
          </button>
          <button
            className={`${styles.subTabBtn} ${subFilter === "surge" ? styles.subTabBtnActive : ""}`}
            onClick={() => setSubFilter("surge")}
          >
            Surge <ChevronDown size={13} />
          </button>
        </div>

        {/* Right Controls */}
        <div className={styles.rightControls}>
          {/* Timeframe selector */}
          <div className={styles.timeframeGroup}>
            {(["1m", "5m", "30m", "1h"] as const).map((tf) => (
              <button
                key={tf}
                className={`${styles.timeframeBtn} ${timeframe === tf ? styles.timeframeBtnActive : ""}`}
                onClick={() => setTimeframe(tf)}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Settings & Eye buttons */}
          <button className={styles.iconBtn} title="Settings" onClick={() => showToast("Meme feed settings opened")}>
            <Settings size={14} />
          </button>
          <button className={styles.iconBtn} title="Toggle Visibility" onClick={() => showToast("Visibility filtered")}>
            <Eye size={14} />
          </button>

          {/* Filter count pill */}
          <div className={styles.filterCountPill} onClick={() => showToast("Filters drawer opened")}>
            <Layers size={13} />
            <span>1</span>
            <span style={{ color: "var(--neutral-500)" }}>|</span>
            <span>0</span>
            <ChevronDown size={12} />
          </div>

          {/* Quick Buy Box */}
          <div className={styles.quickBuyBox}>
            <span className={styles.quickBuyLabel}>Quick Buy</span>
            <input
              type="text"
              className={styles.quickBuyInput}
              value={quickBuyAmount}
              onChange={(e) => setQuickBuyAmount(e.target.value)}
              placeholder="0.0"
            />
          </div>

          {/* Preset Buttons */}
          <div className={styles.presetGroup}>
            <button
              className={styles.iconBtn}
              title="Quick Buy Settings"
              onClick={() => showToast("Preset configuration opened")}
            >
              <Sparkles size={13} />
            </button>
            <button
              className={`${styles.presetBtn} ${activePreset === "P1" ? styles.presetBtnActive : ""}`}
              onClick={() => handlePresetClick("P1", "0.1")}
            >
              P1
            </button>
            <button
              className={`${styles.presetBtn} ${activePreset === "P2" ? styles.presetBtnActive : ""}`}
              onClick={() => handlePresetClick("P2", "0.5")}
            >
              P2
            </button>
            <button
              className={`${styles.presetBtn} ${activePreset === "P3" ? styles.presetBtnActive : ""}`}
              onClick={() => handlePresetClick("P3", "1.0")}
            >
              P3
            </button>
          </div>
        </div>
      </div>

      {/* Main Discover Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th} style={{ width: "240px" }}>
                Pair Info
              </th>
              <th className={styles.th} style={{ width: "190px" }}>
                Market Cap
              </th>
              <th className={styles.th} style={{ width: "110px" }}>
                Liquidity
              </th>
              <th className={styles.th} style={{ width: "110px" }}>
                Volume
              </th>
              <th className={styles.th} style={{ width: "110px" }}>
                TXNS
              </th>
              <th className={styles.th} style={{ width: "210px" }}>
                Token Info
              </th>
              <th className={`${styles.th} ${styles.thRight}`} style={{ width: "90px" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {DISCOVER_TOKENS.map((token) => (
              <tr key={token.id} className={styles.row}>
                {/* 1. Pair Info Column */}
                <td className={styles.td}>
                  <div className={styles.pairInfoWrapper}>
                    <div className={styles.avatarWrapper}>
                      <div className={styles.avatar} style={{ backgroundColor: token.avatarBg || "#111" }}>
                        {token.avatarImg ? (
                          <img src={token.avatarImg} alt={token.name} className={styles.avatarImg} />
                        ) : (
                          token.avatarText
                        )}
                      </div>
                      <div className={styles.chainBadge}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#000" }} />
                      </div>
                    </div>

                    <div className={styles.tokenTextInfo}>
                      <div className={styles.tokenTitleLine}>
                        <span className={styles.tokenName}>{token.name}</span>
                        <span className={styles.tokenSubname}>{token.subname}</span>
                        <button
                          className={styles.copyBtn}
                          title="Copy Contract"
                          onClick={(e) => handleCopy(token.contract, token.id, e)}
                        >
                          {copiedId === token.id ? (
                            <Check size={12} color="var(--emerald-500, #2fcb73)" />
                          ) : (
                            <Copy size={12} />
                          )}
                        </button>
                      </div>

                      <div className={styles.tokenMetaLine}>
                        <span className={styles.tokenAge}>{token.age}</span>
                        {token.socialIcons.map((icon, idx) => renderSocialIcon(icon, idx))}
                        <span className={styles.socialCount}>{token.socialCount}</span>
                      </div>
                    </div>
                  </div>
                </td>

                {/* 2. Market Cap & Sparkline Column */}
                <td className={styles.td}>
                  <div className={styles.mcWrapper}>
                    {renderSparkline(token.sparklineType, token.isPositive)}
                    <div className={styles.mcValues}>
                      <span className={styles.mcValue}>{token.marketCap}</span>
                      <span className={token.isPositive ? styles.mcChangeGreen : styles.mcChangeRed}>
                        {token.priceChange}
                      </span>
                    </div>
                  </div>
                </td>

                {/* 3. Liquidity Column */}
                <td className={styles.td}>
                  <span className={styles.cellValue}>{token.liquidity}</span>
                </td>

                {/* 4. Volume Column */}
                <td className={styles.td}>
                  <span className={styles.cellValue}>{token.volume}</span>
                </td>

                {/* 5. TXNS Column */}
                <td className={styles.td}>
                  <div className={styles.txnsWrapper}>
                    <span className={styles.txnsTotal}>{token.txnsTotal}</span>
                    <div className={styles.txnsBreakdown}>
                      <span className={styles.buysCount}>{token.txnsBuys}</span>
                      <span className={styles.dividerSlash}>/</span>
                      <span className={styles.sellsCount}>{token.txnsSells}</span>
                    </div>
                  </div>
                </td>

                {/* 6. Token Info Security & Holders Column */}
                <td className={styles.td}>
                  <div className={styles.tokenInfoGrid}>
                    <div className={styles.securityColumn}>
                      <div className={styles.securityItem}>
                        <User size={11} className={styles.secGray} />
                        <span className={token.devHoldingRed ? styles.secRed : styles.secGreen}>
                          {token.devHolding}
                        </span>
                        <Lock size={11} className={styles.secGray} style={{ marginLeft: 6 }} />
                        <span className={token.top10Red ? styles.secRed : styles.secGreen}>
                          {token.top10Holding}
                        </span>
                      </div>

                      <div className={styles.securityItem}>
                        <Shield size={11} className={styles.secGray} />
                        <span className={styles.secGreen}>{token.devBurnt || "0%"}</span>
                        <Lock size={11} className={styles.secGray} style={{ marginLeft: 6 }} />
                        <span className={token.lockedLiqRed ? styles.secRed : styles.secGreen}>
                          {token.lockedLiq || "0%"}
                        </span>
                      </div>

                      <div className={styles.securityItem}>
                        <Shield size={11} className={styles.secGray} />
                        <span className={token.rugScoreRed ? styles.secRed : styles.secGreen}>
                          {token.rugScore || "0%"}
                        </span>
                        <span
                          style={{ marginLeft: 8 }}
                          className={token.statusBadge === "Paid" ? styles.badgePaid : styles.badgeUnpaid}
                        >
                          {token.statusBadge}
                        </span>
                      </div>
                    </div>

                    {(token.holdersCount || token.makersCount) && (
                      <div className={styles.holderColumn}>
                        {token.holdersCount && (
                          <div className={styles.holderRow}>
                            <Users size={11} />
                            <span>{token.holdersCount}</span>
                          </div>
                        )}
                        {token.makersCount && (
                          <div className={styles.holderRow}>
                            <ArrowUpDown size={11} />
                            <span>{token.makersCount}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </td>

                {/* 7. Action Column */}
                <td className={`${styles.td} ${styles.thRight}`}>
                  <button className={styles.buyBtn} onClick={(e) => handleBuy(token, e)}>
                    Buy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Floating Toast */}
      {toastMessage && <div className={styles.toast}>{toastMessage}</div>}
    </div>
  );
}
