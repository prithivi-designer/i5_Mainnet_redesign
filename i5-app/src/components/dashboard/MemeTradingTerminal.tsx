"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Search,
  Globe,
  Share2,
  Star,
  Check,
  ShieldCheck,
  Zap,
  Flame,
  Bot,
  TrendingUp,
  Settings,
  Lock,
  ExternalLink,
  ChevronRight,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";
import styles from "./MemeTradingTerminal.module.css";

export interface TerminalToken {
  id: string;
  name: string;
  ticker: string;
  avatarImg?: string;
  avatarEmoji?: string;
  chain: "BNB" | "SOL" | "ETH";
  ageMinutes: number;
  devHandle: string;
  isVerified: boolean;
  price: string;
  priceNum: number;
  change24h: number;
  marketCap: string;
  volume24h: string;
  liquidity: string;
  holders: number;
  bondingPercent: number;
  kolsHolding: number;
  kolDetails?: {
    name: string;
    handle: string;
    avatar?: string;
    tier: string;
    multiple: string;
  }[];
  totalKolBag: string;
  topTenPct: string;
  i5Score: number;
  status: string;
}

interface MemeTradingTerminalProps {
  initialToken: TerminalToken;
  allTokens: TerminalToken[];
  onClose: () => void;
}

const INTERVALS = ["1m", "5m", "15m", "1h", "4h", "1D", "1W", "1M"];

const MOCK_SWAPS = [
  { id: "1", trader: "MemeGod_xyz", action: "SELL", amount: "114,602", valueUsd: "$275.99", mc: "$2.41M", price: "$0.002408", time: "2m ago", hash: "g1fd...siqf" },
  { id: "2", trader: "Murad Mahmudov (KOL)", action: "BUY", amount: "450,000", valueUsd: "$1,083.60", mc: "$2.40M", price: "$0.002402", time: "4m ago", hash: "8x9a...32kl" },
  { id: "3", trader: "Ansem (KOL)", action: "BUY", amount: "820,000", valueUsd: "$1,974.56", mc: "$2.38M", price: "$0.002390", time: "7m ago", hash: "4p9z...88df" },
  { id: "4", trader: "DegenWhale.sol", action: "BUY", amount: "2,400,000", valueUsd: "$5,779.20", mc: "$2.35M", price: "$0.002385", time: "11m ago", hash: "77aq...91aa" },
  { id: "5", trader: "PaperHands_99", action: "SELL", amount: "95,000", valueUsd: "$228.76", mc: "$2.34M", price: "$0.002380", time: "14m ago", hash: "12mm...49xx" },
];

export default function MemeTradingTerminal({ initialToken, allTokens, onClose }: MemeTradingTerminalProps) {
  const [selectedToken, setSelectedToken] = useState<TerminalToken>(initialToken);
  const [activeLeftTab, setActiveLeftTab] = useState<"categories" | "alerts" | "degens">("categories");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [interval, setInterval] = useState("5m");
  const [swapMode, setSwapMode] = useState<"buy" | "sell">("buy");
  const [payAmount, setPayAmount] = useState("0.5");
  const [thesisNote, setThesisNote] = useState("");
  const [activeSwapFilter, setActiveSwapFilter] = useState("all");
  const [showToast, setShowToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 2500);
  };

  const receiveEstimate = (parseFloat(payAmount || "0") * 76818).toLocaleString(undefined, { maximumFractionDigits: 0 });

  const filteredTokens = allTokens.filter((t) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      return t.name.toLowerCase().includes(q) || t.ticker.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className={styles.terminalOverlay}>
      {/* ── TOPBAR ───────────────────────────────────────────── */}
      <div className={styles.terminalTopbar}>
        <div className={styles.topbarLeft}>
          <button className={styles.backBtn} onClick={onClose}>
            <ArrowLeft size={14} />
            Back to Radar
          </button>

          <div className={styles.tokenIdentityHeader}>
            <div className={styles.tokenAvatar}>
              {selectedToken.avatarImg ? (
                <img src={selectedToken.avatarImg} alt={selectedToken.name} className={styles.tokenAvatarImg} />
              ) : (
                selectedToken.avatarEmoji || "💎"
              )}
            </div>
            <div className={styles.tokenTitleBlock}>
              <span className={styles.tokenName}>{selectedToken.name}</span>
              <span className={styles.tokenTickerBadge}>{selectedToken.ticker}</span>
              <span className={styles.tokenAuditBadge}>
                <ShieldCheck size={11} />
                Audited Safe
              </span>
              <span className={styles.tokenGraduatedBadge}>Graduated</span>
              <span className={styles.tokenMetaSub}>
                {selectedToken.devHandle.slice(0, 8)}...curve · 1d ago · {selectedToken.chain === "SOL" ? "Solana" : "BNB Chain"}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.topbarRight}>
          <button className={styles.socialIconBtn} title="Website">
            <Globe size={13} />
          </button>
          <button className={styles.socialIconBtn} title="Share">
            <Share2 size={13} />
          </button>
          <button className={styles.socialIconBtn} title="Watchlist">
            <Star size={13} />
          </button>
        </div>
      </div>

      {/* ── 3-PANE MAIN BODY ─────────────────────────────────── */}
      <div className={styles.terminalBody}>
        
        {/* ═══ LEFT PANE: TOKEN LIST & CATEGORIES ════════════ */}
        <div className={styles.leftPane}>
          <div className={styles.leftTabsRow}>
            <button
              className={`${styles.leftTabBtn} ${activeLeftTab === "categories" ? styles.leftTabBtnActive : ""}`}
              onClick={() => setActiveLeftTab("categories")}
            >
              <Sparkles size={12} />
              Meme Categories
            </button>
            <button
              className={`${styles.leftTabBtn} ${activeLeftTab === "alerts" ? styles.leftTabBtnActive : ""}`}
              onClick={() => setActiveLeftTab("alerts")}
            >
              Alerts
            </button>
            <button
              className={`${styles.leftTabBtn} ${activeLeftTab === "degens" ? styles.leftTabBtnActive : ""}`}
              onClick={() => setActiveLeftTab("degens")}
            >
              Degens
            </button>
          </div>

          <div className={styles.leftSearchWrap}>
            <Search size={12} className={styles.leftSearchIcon} />
            <input
              type="text"
              className={styles.leftSearchInput}
              placeholder="Search meme, ticker, lore..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className={styles.leftCategoriesBar}>
            <button
              className={`${styles.categoryPill} ${selectedCategory === "all" ? styles.categoryPillActive : ""}`}
              onClick={() => setSelectedCategory("all")}
            >
              🔥 All Memes (33)
            </button>
            <button
              className={`${styles.categoryPill} ${selectedCategory === "ai" ? styles.categoryPillActive : ""}`}
              onClick={() => setSelectedCategory("ai")}
            >
              🤖 AI Agents & Bots (22)
            </button>
          </div>

          <div className={styles.tokenItemsList}>
            {filteredTokens.map((tok) => {
              const isSelected = tok.id === selectedToken.id;
              const isGain = tok.change24h >= 0;
              return (
                <div
                  key={tok.id}
                  className={`${styles.tokenItemRow} ${isSelected ? styles.tokenItemRowActive : ""}`}
                  onClick={() => setSelectedToken(tok)}
                >
                  <div className={styles.tokenItemLeft}>
                    <div className={styles.tokenItemAvatar}>
                      {tok.avatarImg ? (
                        <img src={tok.avatarImg} alt={tok.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        tok.avatarEmoji || "💎"
                      )}
                    </div>
                    <div className={styles.tokenItemText}>
                      <span className={styles.tokenItemName}>{tok.name}</span>
                      <span className={styles.tokenItemMeta}>
                        MC {tok.marketCap} · {tok.price}
                      </span>
                    </div>
                  </div>

                  <div className={styles.tokenItemRight}>
                    <span className={isGain ? styles.tokenItemGain : styles.tokenItemLoss}>
                      {isGain ? "+" : ""}{tok.change24h.toFixed(2)}%
                    </span>
                    <span className={styles.tokenItemKolPill}>
                      {tok.kolsHolding > 0 ? `👥 ${tok.kolsHolding} KOLs` : "0 KOLs"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ═══ CENTER PANE: LIVE CHART & TELEMETRY ═══════════ */}
        <div className={styles.centerPane}>
          {/* Market Telemetry Bar */}
          <div className={styles.marketTelemetryBar}>
            <div className={styles.priceDisplayBlock}>
              <span className={styles.bigPriceText}>{selectedToken.price}</span>
              <span className={styles.bigChangeText}>
                {selectedToken.change24h >= 0 ? "+" : ""}{selectedToken.change24h.toFixed(2)}% 24h
              </span>
            </div>

            <div className={styles.quickStatsRow}>
              <div className={styles.quickStatItem}>
                <span className={styles.quickStatLabel}>Market Cap</span>
                <span className={styles.quickStatVal}>{selectedToken.marketCap}</span>
              </div>
              <div className={styles.quickStatItem}>
                <span className={styles.quickStatLabel}>Liquidity</span>
                <span className={styles.quickStatVal}>{selectedToken.liquidity}</span>
              </div>
              <div className={styles.quickStatItem}>
                <span className={styles.quickStatLabel}>24H Volume</span>
                <span className={styles.quickStatVal}>{selectedToken.volume24h}</span>
              </div>
              <div className={styles.quickStatItem}>
                <span className={styles.quickStatLabel}>Holders</span>
                <span className={styles.quickStatVal}>{selectedToken.holders.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Chart Controls Bar */}
          <div className={styles.chartControlsBar}>
            <div className={styles.intervalSelector}>
              {INTERVALS.map((inv) => (
                <button
                  key={inv}
                  className={`${styles.intervalBtn} ${interval === inv ? styles.intervalBtnActive : ""}`}
                  onClick={() => setInterval(inv)}
                >
                  {inv}
                </button>
              ))}
            </div>

            <div className={styles.chartOverlayToggles}>
              <label className={styles.chartCheckboxLabel}>
                <input type="checkbox" defaultChecked />
                <span>My Swaps</span>
              </label>
              <label className={styles.chartCheckboxLabel}>
                <input type="checkbox" defaultChecked />
                <span>Whales</span>
              </label>
              <label className={styles.chartCheckboxLabel}>
                <input type="checkbox" defaultChecked />
                <span>Theses</span>
              </label>
            </div>
          </div>

          {/* SVG Candlestick / Momentum Chart */}
          <div className={styles.chartCanvasArea}>
            <svg width="100%" height="100%" viewBox="0 0 700 280" preserveAspectRatio="none" style={{ display: "block" }}>
              <defs>
                <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(47, 203, 115, 0.25)" />
                  <stop offset="100%" stopColor="rgba(47, 203, 115, 0.0)" />
                </linearGradient>
                <linearGradient id="targetGlow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(47, 203, 115, 0.4)" />
                  <stop offset="100%" stopColor="rgba(47, 203, 115, 0.1)" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="60" x2="700" y2="60" stroke="rgba(228,228,228,0.05)" strokeDasharray="3 3" />
              <line x1="0" y1="120" x2="700" y2="120" stroke="rgba(228,228,228,0.05)" strokeDasharray="3 3" />
              <line x1="0" y1="180" x2="700" y2="180" stroke="rgba(228,228,228,0.05)" strokeDasharray="3 3" />
              <line x1="0" y1="240" x2="700" y2="240" stroke="rgba(228,228,228,0.05)" strokeDasharray="3 3" />

              {/* Target Graduation Line */}
              <line x1="0" y1="140" x2="700" y2="140" stroke="#2fcb73" strokeDasharray="4 4" strokeWidth="1.5" opacity="0.6" />
              <rect x="500" y="130" width="185" height="20" rx="4" fill="#1c1c1c" stroke="rgba(228,228,228,0.18)" />
              <text x="510" y="144" fill="#2fcb73" fontSize="9.5" fontWeight="700" fontFamily="sans-serif">
                ★ RAYDIUM GRADUATION TARGET
              </text>

              {/* Candlesticks */}
              {/* Bar 1 */}
              <line x1="60" y1="190" x2="60" y2="220" stroke="#e13b3b" strokeWidth="1.2" />
              <rect x="55" y="195" width="10" height="20" fill="#e13b3b" rx="1" />

              {/* Bar 2 */}
              <line x1="120" y1="185" x2="120" y2="225" stroke="#2fcb73" strokeWidth="1.2" />
              <rect x="115" y="190" width="10" height="25" fill="#2fcb73" rx="1" />

              {/* Bar 3 */}
              <line x1="180" y1="170" x2="180" y2="210" stroke="#2fcb73" strokeWidth="1.2" />
              <rect x="175" y="175" width="10" height="25" fill="#2fcb73" rx="1" />

              {/* Bar 4 */}
              <line x1="240" y1="175" x2="240" y2="205" stroke="#e13b3b" strokeWidth="1.2" />
              <rect x="235" y="180" width="10" height="15" fill="#e13b3b" rx="1" />

              {/* Bar 5 */}
              <line x1="300" y1="160" x2="300" y2="195" stroke="#2fcb73" strokeWidth="1.2" />
              <rect x="295" y="165" width="10" height="20" fill="#2fcb73" rx="1" />

              {/* Bar 6 */}
              <line x1="360" y1="150" x2="360" y2="185" stroke="#2fcb73" strokeWidth="1.2" />
              <rect x="355" y="155" width="10" height="25" fill="#2fcb73" rx="1" />

              {/* Bar 7 */}
              <line x1="420" y1="140" x2="420" y2="175" stroke="#2fcb73" strokeWidth="1.2" />
              <rect x="415" y="145" width="10" height="22" fill="#2fcb73" rx="1" />

              {/* Bar 8 */}
              <line x1="480" y1="110" x2="480" y2="160" stroke="#2fcb73" strokeWidth="1.2" />
              <rect x="475" y="115" width="10" height="35" fill="#2fcb73" rx="1" />

              {/* Bar 9 (Big Bullish Spike) */}
              <line x1="540" y1="70" x2="540" y2="140" stroke="#2fcb73" strokeWidth="1.2" />
              <rect x="535" y="75" width="10" height="55" fill="#2fcb73" rx="1" />

              {/* Bar 10 (Current Active Candle) */}
              <line x1="600" y1="50" x2="600" y2="120" stroke="#2fcb73" strokeWidth="1.2" />
              <rect x="595" y="55" width="10" height="60" fill="#2fcb73" rx="1" />

              {/* Smooth trend line under glow */}
              <path
                d="M 50 210 Q 180 195 300 175 T 480 120 T 600 65 L 600 270 L 50 270 Z"
                fill="url(#chartGlow)"
              />
              <path
                d="M 50 210 Q 180 195 300 175 T 480 120 T 600 65"
                fill="none"
                stroke="#2fcb73"
                strokeWidth="2.5"
              />
            </svg>
          </div>

          {/* 3 Telemetry Cards */}
          <div className={styles.analyticsGrid}>
            {/* 1: Price Performance */}
            <div className={styles.analyticsCard}>
              <div className={styles.analyticsCardTitleRow}>
                <span>Price Performance</span>
                <span style={{ color: "var(--emerald-400)" }}>ATH: $2.70M</span>
              </div>
              <div className={styles.pricePerfGrid}>
                <div className={styles.perfPill}>
                  <span className={styles.perfPillLabel}>5M</span>
                  <span className={styles.perfPillVal}>+4.80%</span>
                </div>
                <div className={styles.perfPill}>
                  <span className={styles.perfPillLabel}>1H</span>
                  <span className={styles.perfPillVal}>+18.90%</span>
                </div>
                <div className={styles.perfPill}>
                  <span className={styles.perfPillLabel}>4H</span>
                  <span className={styles.perfPillVal}>+52.40%</span>
                </div>
                <div className={styles.perfPill}>
                  <span className={styles.perfPillLabel}>24H</span>
                  <span className={styles.perfPillVal}>+{selectedToken.change24h.toFixed(0)}%</span>
                </div>
              </div>
            </div>

            {/* 2: Buy vs Sell Pressure */}
            <div className={styles.analyticsCard}>
              <div className={styles.analyticsCardTitleRow}>
                <span>Buy vs Sell Pressure</span>
                <span>24H Order Flow</span>
              </div>
              <div className={styles.buySellBarsRow}>
                <div className={styles.buySellNumbers}>
                  <span style={{ color: "var(--emerald-500)" }}>Buy: $2.81M (68%)</span>
                  <span style={{ color: "var(--red-500)" }}>Sell: $1.31M (32%)</span>
                </div>
                <div className={styles.buySellTrack}>
                  <div className={styles.buySellFill} style={{ width: "68%" }} />
                </div>
                <div className={styles.buySellNumbers} style={{ fontSize: 9.5, color: "var(--text-tertiary)" }}>
                  <span>6,513 Buys</span>
                  <span>2,211 Sells</span>
                </div>
              </div>
            </div>

            {/* 3: KOL Holders & Consensus */}
            <div className={styles.analyticsCard}>
              <div className={styles.analyticsCardTitleRow}>
                <span>KOL Holders & Consensus</span>
                <span style={{ color: "var(--emerald-400)", cursor: "pointer" }}>Audit & Safety &gt;</span>
              </div>
              <div className={styles.kolConsensusRow}>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontSize: 10.5, color: "var(--text-secondary)" }}>
                    Holding KOLs: <strong>{selectedToken.kolsHolding || 3} Callers</strong>
                  </span>
                  <div className={styles.kolAvatarsMini}>
                    <div className={styles.kolMiniAvatar}>🦁</div>
                    <div className={styles.kolMiniAvatar}>🐯</div>
                    <div className={styles.kolMiniAvatar}>🦊</div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span className={styles.consensusBagVal}>$36,000 Bag</span>
                  <div style={{ fontSize: 9.5, color: "var(--text-tertiary)" }}>LP Locked · Top 10: 12.2%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Swaps Stream */}
          <div className={styles.swapsStreamSection}>
            <div className={styles.swapsHeaderRow}>
              <div className={styles.swapsSubtabs}>
                <button
                  className={`${styles.swapsSubtab} ${activeSwapFilter === "all" ? styles.swapsSubtabActive : ""}`}
                  onClick={() => setActiveSwapFilter("all")}
                >
                  All Swaps (1)
                </button>
                <button
                  className={`${styles.swapsSubtab} ${activeSwapFilter === "kols" ? styles.swapsSubtabActive : ""}`}
                  onClick={() => setActiveSwapFilter("kols")}
                >
                  🔥 KOLs & Smart Money (3)
                </button>
                <button
                  className={`${styles.swapsSubtab} ${activeSwapFilter === "buys" ? styles.swapsSubtabActive : ""}`}
                  onClick={() => setActiveSwapFilter("buys")}
                >
                  Buys
                </button>
                <button
                  className={`${styles.swapsSubtab} ${activeSwapFilter === "sells" ? styles.swapsSubtabActive : ""}`}
                  onClick={() => setActiveSwapFilter("sells")}
                >
                  Sells
                </button>
              </div>
            </div>

            <table className={styles.swapsTable}>
              <thead>
                <tr>
                  <th className={styles.swapsTh}>Trader / Wallet</th>
                  <th className={styles.swapsTh}>Action</th>
                  <th className={styles.swapsTh}>Token Amount</th>
                  <th className={styles.swapsTh}>Value (USD)</th>
                  <th className={styles.swapsTh}>Market Cap</th>
                  <th className={styles.swapsTh}>Price</th>
                  <th className={styles.swapsTh}>Time</th>
                  <th className={styles.swapsTh}>TX Hash</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_SWAPS.map((sw) => (
                  <tr key={sw.id} className={styles.swapsTr}>
                    <td className={styles.swapsTd}>
                      <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{sw.trader}</span>
                    </td>
                    <td className={styles.swapsTd}>
                      <span className={sw.action === "BUY" ? styles.actionBuyBadge : styles.actionSellBadge}>
                        {sw.action}
                      </span>
                    </td>
                    <td className={styles.swapsTd} style={{ fontFamily: "var(--font-mono)" }}>
                      {sw.amount} {selectedToken.ticker}
                    </td>
                    <td className={styles.swapsTd} style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                      {sw.valueUsd}
                    </td>
                    <td className={styles.swapsTd} style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}>
                      {sw.mc}
                    </td>
                    <td className={styles.swapsTd} style={{ fontFamily: "var(--font-mono)" }}>
                      {sw.price}
                    </td>
                    <td className={styles.swapsTd} style={{ color: "var(--text-tertiary)" }}>
                      {sw.time}
                    </td>
                    <td className={styles.swapsTd} style={{ fontFamily: "var(--font-mono)", color: "var(--text-disabled)" }}>
                      {sw.hash}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ═══ RIGHT PANE: INSTANT SWAP TERMINAL ═════════════ */}
        <div className={styles.rightPane}>
          <div className={styles.swapHeader}>
            <div className={styles.swapTitle}>
              <Zap size={15} style={{ color: "var(--emerald-400)" }} />
              <span>Instant Swap</span>
            </div>
            <button className={styles.socialIconBtn} title="Swap Settings">
              <SlidersHorizontal size={13} />
            </button>
          </div>

          <div className={styles.swapSegmentTabs}>
            <button
              className={`${styles.swapSegmentBtn} ${swapMode === "buy" ? styles.swapSegmentBtnActiveBuy : ""}`}
              onClick={() => setSwapMode("buy")}
            >
              Buy {selectedToken.ticker}
            </button>
            <button
              className={`${styles.swapSegmentBtn} ${swapMode === "sell" ? styles.swapSegmentBtnActiveSell : ""}`}
              onClick={() => setSwapMode("sell")}
            >
              Sell Position
            </button>
          </div>

          {/* Pay Amount Box */}
          <div className={styles.swapInputBox}>
            <div className={styles.swapInputTop}>
              <span>Pay with</span>
              <span>Balance: 14.85 {selectedToken.chain === "SOL" ? "SOL" : "BNB"}</span>
            </div>
            <div className={styles.swapInputMain}>
              <input
                type="number"
                className={styles.swapAmountInput}
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                placeholder="0.0"
              />
              <span className={styles.swapCurrencyBadge}>
                {selectedToken.chain === "SOL" ? "SOL" : "BNB"}
              </span>
            </div>
            <div className={styles.swapQuickPills}>
              {["0.1", "0.5", "1", "2", "MAX"].map((p) => (
                <button
                  key={p}
                  className={styles.swapQuickPill}
                  onClick={() => setPayAmount(p === "MAX" ? "14.85" : p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Estimated Output */}
          <div className={styles.swapOutputBox}>
            <span className={styles.swapOutputLabel}>You Receive (Estimated)</span>
            <span className={styles.swapOutputVal}>
              {receiveEstimate} {selectedToken.ticker}
            </span>
            <span className={styles.swapOutputUsd}>
              ≈ ${(parseFloat(payAmount || "0") * (selectedToken.chain === "SOL" ? 185 : 590)).toFixed(2)}
            </span>
          </div>

          {/* Route Details */}
          <div className={styles.swapRouteDetails}>
            <div className={styles.routeRow}>
              <span>Token Price:</span>
              <span className={styles.routeRowVal}>{selectedToken.price}</span>
            </div>
            <div className={styles.routeRow}>
              <span>Est. Market Cap After:</span>
              <span className={styles.routeRowVal}>{selectedToken.marketCap}</span>
            </div>
            <div className={styles.routeRow}>
              <span>Price Impact:</span>
              <span className={styles.routeRowVal} style={{ color: "var(--emerald-500)" }}>0.02%</span>
            </div>
            <div className={styles.routeRow}>
              <span>Platform Fee:</span>
              <span className={styles.routeRowVal}>0.5% (MemeLaunch)</span>
            </div>
            <div className={styles.routeRow}>
              <span>Route:</span>
              <span className={styles.routeRowVal}>Raydium V4 Pool</span>
            </div>
          </div>

          {/* Thesis Note */}
          <input
            type="text"
            className={styles.thesisInput}
            placeholder="Attach Thesis Note (Optional)..."
            value={thesisNote}
            onChange={(e) => setThesisNote(e.target.value)}
          />

          {/* Primary Action Button */}
          <button
            className={styles.instantBuyActionBtn}
            onClick={() => triggerToast(`Executed ${payAmount} ${selectedToken.chain === "SOL" ? "SOL" : "BNB"} swap for ${selectedToken.ticker}`)}
          >
            <Zap size={15} />
            Quick Buy {selectedToken.ticker} ({payAmount} {selectedToken.chain === "SOL" ? "SOL" : "BNB"})
          </button>

          <div className={styles.mevProtectionNotice}>
            <Lock size={11} />
            <span>Encrypted · 0% MEV Frontrun Protection</span>
          </div>
        </div>

      </div>

      {showToast && (
        <div style={{
          position: "fixed",
          bottom: 30,
          left: "50%",
          transform: "translateX(-50%)",
          background: "var(--neutral-800)",
          border: "1px solid var(--emerald-500)",
          color: "var(--emerald-400)",
          padding: "8px 16px",
          borderRadius: 8,
          fontSize: 12,
          fontWeight: 700,
          boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
          zIndex: 9999,
        }}>
          ✓ {showToast}
        </div>
      )}
    </div>
  );
}
