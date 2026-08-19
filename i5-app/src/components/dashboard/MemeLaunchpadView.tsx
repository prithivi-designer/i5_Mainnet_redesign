"use client";

import React, { useState, useMemo } from "react";
import MoltenMetal from "../ui/MoltenMetal";
import {
  Rocket,
  Sparkles,
  Search,
  ChevronDown,
  Star,
  Check,
  TrendingUp,
  BarChart2,
  Clock,
  Globe,
  Users,
  ShieldCheck,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Bot,
  Flame,
  Zap,
  Sprout,
  Gem,
  ShoppingCart,
  Layers,
  LayoutGrid,
  X,
  ExternalLink,
} from "lucide-react";
import styles from "./MemeLaunchpadView.module.css";
import MemeTradingTerminal, { TerminalToken } from "./MemeTradingTerminal";

/* ── Token Data Structure ─────────────────────────────────── */
export interface LaunchpadToken {
  id: string;
  rank: number;
  name: string;
  ticker: string;
  avatarImg?: string;
  avatarEmoji?: string;
  chain: "BNB" | "SOL" | "ETH";
  ageMinutes: number;
  devHandle: string;
  isVerified: boolean;
  isFavorited: boolean;
  badge: "COMMUNITY" | "HIGH KOL BAG";
  description: string;
  price: string;
  priceNum: number;
  change24h: number;
  marketCap: string;
  volume24h: string;
  liquidity: string;
  holders: number;
  bondingPercent: number;
  isGraduatingSoon: boolean;
  kolsHolding: number;
  kolAvatars: string[];
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
  status: "trending" | "new" | "graduating" | "migrated" | "curve" | "graduated";
  bubbleSize: number;
  bubbleX: number;
  bubbleY: number;

  /* Intelligence Matrix Signals */
  smartMoneyCount: number;
  smartMoneyLabel: string;
  kolBullishCount: number;
  whaleInflow: string;
  socialVelocity: string;
  convictionScore: number;
  convictionTier: string;
}

const TOKENS: LaunchpadToken[] = [
  {
    id: "eliza",
    rank: 1,
    name: "Eliza Agent Swarm",
    ticker: "$ELIZA",
    avatarImg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&h=80&fit=crop&auto=format&q=80",
    chain: "SOL",
    ageMinutes: 1440,
    devHandle: "ElizaFramework",
    isVerified: true,
    isFavorited: true,
    badge: "HIGH KOL BAG",
    description: "Multi-agent autonomous swarm coordinating decentralized intelligence workflows and liquidity allocation.",
    price: "$0.002408",
    priceNum: 0.002408,
    change24h: 155.00,
    marketCap: "$2.41M",
    volume24h: "$4.12M",
    liquidity: "$390.0K",
    holders: 5900,
    bondingPercent: 100,
    isGraduatingSoon: false,
    kolsHolding: 3,
    kolAvatars: ["🦁", "🐯", "🦊"],
    kolDetails: [
      { name: "Ansem", handle: "@blknoiz06", tier: "Tier 1 KOL", multiple: "+5.7x" },
      { name: "Murad Mahmudov", handle: "@MustStopMurad", tier: "Tier 1 KOL", multiple: "+15.3x" },
      { name: "Cobie", handle: "@coffeebreak_sol", tier: "Ecosystem Lead", multiple: "+8.1x" },
    ],
    totalKolBag: "$36,000",
    topTenPct: "12.2%",
    i5Score: 96,
    status: "trending",
    bubbleSize: 110,
    bubbleX: 52,
    bubbleY: 48,
    smartMoneyCount: 38,
    smartMoneyLabel: "accumulating",
    kolBullishCount: 16,
    whaleInflow: "+$18.4M",
    socialVelocity: "55%",
    convictionScore: 96,
    convictionTier: "Extreme Conviction",
  },
  {
    id: "chill",
    rank: 2,
    name: "Just a Chill Guy",
    ticker: "$CHILL",
    avatarImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces&auto=format&q=80",
    chain: "SOL",
    ageMinutes: 2880,
    devHandle: "ChillDegen",
    isVerified: true,
    isFavorited: false,
    badge: "HIGH KOL BAG",
    description: "The viral calm in every storm. Zero tax, immutable bonding curve fair launch.",
    price: "$0.002818",
    priceNum: 0.002818,
    change24h: 210.00,
    marketCap: "$2.82M",
    volume24h: "$4.92M",
    liquidity: "$410.0K",
    holders: 7200,
    bondingPercent: 100,
    isGraduatingSoon: false,
    kolsHolding: 3,
    kolAvatars: ["🦁", "⚡", "🦊"],
    kolDetails: [
      { name: "Murad Mahmudov", handle: "@MustStopMurad", tier: "Tier 1 KOL", multiple: "+18.2x" },
      { name: "Cobie", handle: "@coffeebreak_sol", tier: "Ecosystem Lead", multiple: "+9.4x" },
      { name: "Rewkang", handle: "@rewkang", tier: "Alpha Whale", multiple: "+12.0x" },
    ],
    totalKolBag: "$46,000",
    topTenPct: "10.5%",
    i5Score: 94,
    status: "trending",
    bubbleSize: 100,
    bubbleX: 42,
    bubbleY: 76,
    smartMoneyCount: 42,
    smartMoneyLabel: "accumulating",
    kolBullishCount: 14,
    whaleInflow: "+$22.1M",
    socialVelocity: "62%",
    convictionScore: 94,
    convictionTier: "Extreme Conviction",
  },
  {
    id: "pepebot",
    rank: 3,
    name: "PepeBot AI",
    ticker: "$PEPEBOT",
    avatarImg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&h=80&fit=crop&auto=format&q=80",
    chain: "SOL",
    ageMinutes: 120,
    devHandle: "SolDevAlpha",
    isVerified: true,
    isFavorited: true,
    badge: "HIGH KOL BAG",
    description: "Autonomous AI degen bot scanning on-chain memetic liquidity waves across solana bonding curves.",
    price: "$0.000482",
    priceNum: 0.000482,
    change24h: 146.80,
    marketCap: "$482.0K",
    volume24h: "$1.90M",
    liquidity: "$68.4K",
    holders: 1420,
    bondingPercent: 92.3,
    isGraduatingSoon: true,
    kolsHolding: 8,
    kolAvatars: ["🦁", "🐯", "🦊", "🦅"],
    kolDetails: [
      { name: "Ansem", handle: "@blknoiz06", tier: "Tier 1 KOL", multiple: "+6.4x" },
      { name: "Murad Mahmudov", handle: "@MustStopMurad", tier: "Tier 1 KOL", multiple: "+14.1x" },
    ],
    totalKolBag: "$64,429",
    topTenPct: "18.4%",
    i5Score: 88,
    status: "trending",
    bubbleSize: 115,
    bubbleX: 25,
    bubbleY: 48,
    smartMoneyCount: 34,
    smartMoneyLabel: "accumulating",
    kolBullishCount: 12,
    whaleInflow: "+$41M",
    socialVelocity: "18%",
    convictionScore: 88,
    convictionTier: "High Conviction",
  },
  {
    id: "mooncat",
    rank: 4,
    name: "MOONCAT",
    ticker: "$MCAT",
    avatarImg: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=80&h=80&fit=crop&crop=faces&auto=format&q=80",
    chain: "BNB",
    ageMinutes: 12,
    devHandle: "CatLordBNB",
    isVerified: true,
    isFavorited: false,
    badge: "COMMUNITY",
    description: "The premier interstellar feline memecoin on BNB Chain. 100% fair launch, zero tax, liquidity locked.",
    price: "$0.000420",
    priceNum: 0.000420,
    change24h: 34.80,
    marketCap: "$42.0K",
    volume24h: "$25.6K",
    liquidity: "$11.0K",
    holders: 286,
    bondingPercent: 75.4,
    isGraduatingSoon: true,
    kolsHolding: 0,
    kolAvatars: [],
    totalKolBag: "$0",
    topTenPct: "21%",
    i5Score: 88,
    status: "trending",
    bubbleSize: 72,
    bubbleX: 82,
    bubbleY: 28,
    smartMoneyCount: 18,
    smartMoneyLabel: "accumulating",
    kolBullishCount: 7,
    whaleInflow: "+$8.4M",
    socialVelocity: "42%",
    convictionScore: 88,
    convictionTier: "High Conviction",
  },
  {
    id: "act",
    rank: 5,
    name: "ACT",
    ticker: "$ACT",
    avatarEmoji: "🤖",
    chain: "SOL",
    ageMinutes: 600,
    devHandle: "ACT_Collective",
    isVerified: true,
    isFavorited: false,
    badge: "HIGH KOL BAG",
    description: "AI Community Token advancing decentralized alignment research.",
    price: "$0.001920",
    priceNum: 0.001920,
    change24h: 88.4,
    marketCap: "$1.92M",
    volume24h: "$2.45M",
    liquidity: "$180K",
    holders: 3400,
    bondingPercent: 100,
    isGraduatingSoon: false,
    kolsHolding: 3,
    kolAvatars: ["🦁", "🦊", "⚡"],
    kolDetails: [
      { name: "Ansem", handle: "@blknoiz06", tier: "Tier 1 KOL", multiple: "+4.2x" },
    ],
    totalKolBag: "$28,000",
    topTenPct: "14.2%",
    i5Score: 85,
    status: "trending",
    bubbleSize: 92,
    bubbleX: 74,
    bubbleY: 74,
    smartMoneyCount: 24,
    smartMoneyLabel: "accumulating",
    kolBullishCount: 9,
    whaleInflow: "+$7.8M",
    socialVelocity: "32%",
    convictionScore: 85,
    convictionTier: "High Conviction",
  },
  {
    id: "frog",
    rank: 6,
    name: "FROG",
    ticker: "$FROG",
    avatarEmoji: "🐸",
    chain: "SOL",
    ageMinutes: 400,
    devHandle: "FrogLord",
    isVerified: true,
    isFavorited: false,
    badge: "HIGH KOL BAG",
    description: "Original pure memetic pond spirit on Solana fair launch bonding curve.",
    price: "$0.000840",
    priceNum: 0.000840,
    change24h: 42.10,
    marketCap: "$840K",
    volume24h: "$1.1M",
    liquidity: "$95K",
    holders: 1820,
    bondingPercent: 94,
    isGraduatingSoon: true,
    kolsHolding: 3,
    kolAvatars: ["🦁", "🦊", "🐯"],
    kolDetails: [
      { name: "Cobie", handle: "@coffeebreak_sol", tier: "Ecosystem Lead", multiple: "+3.8x" },
    ],
    totalKolBag: "$18,500",
    topTenPct: "16.5%",
    i5Score: 82,
    status: "graduating",
    bubbleSize: 82,
    bubbleX: 38,
    bubbleY: 24,
    smartMoneyCount: 16,
    smartMoneyLabel: "accumulating",
    kolBullishCount: 6,
    whaleInflow: "+$3.4M",
    socialVelocity: "25%",
    convictionScore: 82,
    convictionTier: "High Conviction",
  },
  {
    id: "retardio",
    rank: 7,
    name: "RETARDIO",
    ticker: "$RETARDIO",
    avatarImg: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=80&h=80&fit=crop&auto=format&q=80",
    chain: "SOL",
    ageMinutes: 3200,
    devHandle: "RetardioCasino",
    isVerified: true,
    isFavorited: false,
    badge: "HIGH KOL BAG",
    description: "High velocity casino cult memecoin on Solana.",
    price: "$0.005120",
    priceNum: 0.005120,
    change24h: 112.4,
    marketCap: "$5.12M",
    volume24h: "$3.80M",
    liquidity: "$340K",
    holders: 6400,
    bondingPercent: 100,
    isGraduatingSoon: false,
    kolsHolding: 2,
    kolAvatars: ["🦁", "⚡"],
    kolDetails: [
      { name: "Murad Mahmudov", handle: "@MustStopMurad", tier: "Tier 1 KOL", multiple: "+22.5x" },
    ],
    totalKolBag: "$72,000",
    topTenPct: "9.8%",
    i5Score: 92,
    status: "migrated",
    bubbleSize: 88,
    bubbleX: 18,
    bubbleY: 76,
    smartMoneyCount: 29,
    smartMoneyLabel: "accumulating",
    kolBullishCount: 11,
    whaleInflow: "+$14.2M",
    socialVelocity: "45%",
    convictionScore: 92,
    convictionTier: "Extreme Conviction",
  },
  {
    id: "gcat",
    rank: 8,
    name: "GigaCat",
    ticker: "$GCAT",
    avatarImg: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=80&h=80&fit=crop&crop=faces&auto=format&q=80",
    chain: "BNB",
    ageMinutes: 300,
    devHandle: "GigaCatBNB",
    isVerified: true,
    isFavorited: false,
    badge: "HIGH KOL BAG",
    description: "Chad feline energy dominating the BNB meme landscape.",
    price: "$0.001420",
    priceNum: 0.001420,
    change24h: -8.4,
    marketCap: "$1.42M",
    volume24h: "$640K",
    liquidity: "$110K",
    holders: 2100,
    bondingPercent: 88,
    isGraduatingSoon: false,
    kolsHolding: 6,
    kolAvatars: ["🦁", "🐯", "🦊", "🐱", "🐾", "💎"],
    kolDetails: [
      { name: "Ansem", handle: "@blknoiz06", tier: "Tier 1 KOL", multiple: "+3.1x" },
    ],
    totalKolBag: "$32,000",
    topTenPct: "15.1%",
    i5Score: 84,
    status: "new",
    bubbleSize: 80,
    bubbleX: 88,
    bubbleY: 74,
    smartMoneyCount: 19,
    smartMoneyLabel: "accumulating",
    kolBullishCount: 8,
    whaleInflow: "+$4.8M",
    socialVelocity: "21%",
    convictionScore: 84,
    convictionTier: "High Conviction",
  },
  {
    id: "laser",
    rank: 9,
    name: "Laser Eyes",
    ticker: "$LASER",
    avatarEmoji: "⚡",
    chain: "BNB",
    ageMinutes: 60,
    devHandle: "LaserAlpha",
    isVerified: false,
    isFavorited: false,
    badge: "COMMUNITY",
    description: "Laser eyes meme on BNB chain.",
    price: "$0.000310",
    priceNum: 0.000310,
    change24h: -18.2,
    marketCap: "$31.0K",
    volume24h: "$12.0K",
    liquidity: "$6.5K",
    holders: 140,
    bondingPercent: 42,
    isGraduatingSoon: false,
    kolsHolding: 0,
    kolAvatars: [],
    totalKolBag: "$0",
    topTenPct: "32.0%",
    i5Score: 65,
    status: "new",
    bubbleSize: 58,
    bubbleX: 68,
    bubbleY: 46,
    smartMoneyCount: 4,
    smartMoneyLabel: "neutral",
    kolBullishCount: 1,
    whaleInflow: "-$240K",
    socialVelocity: "8%",
    convictionScore: 65,
    convictionTier: "Low Conviction",
  },
];

const VIEW_TYPES = [
  { id: "matrix", label: "Intelligence Matrix", icon: <Layers size={14} /> },
  { id: "horizontal", label: "Horizontal Cards", icon: <TrendingUp size={14} /> },
  { id: "grid", label: "Card Grid", icon: <LayoutGrid size={14} /> },
] as const;

const STATUS_FILTERS = [
  { id: "all", label: "All Tokens" },
  { id: "trending", label: "🔥 Trending", icon: <Flame size={12} /> },
  { id: "new", label: "⚡ New Launches", icon: <Zap size={12} /> },
  { id: "graduating", label: "🌾 Graduating Soon", icon: <Sprout size={12} /> },
  { id: "migrated", label: "💎 Migrated (DEX)", icon: <Gem size={12} /> },
] as const;

const SORT_OPTIONS = ["Market Cap", "Trending Momentum", "24h Volume", "24h Change", "Bonding %", "KOL Count"];
const BUBBLE_SIZE_OPTIONS = ["KOLs Count", "KOL Bag USD", "Market Cap", "24h Volume", "24h Change"];

type ViewType = "matrix" | "horizontal" | "grid";

function formatAge(minutes: number): string {
  if (minutes < 60) return `${minutes}m ago`;
  if (minutes < 1440) return `${Math.round(minutes / 60)}h ago`;
  return `${Math.round(minutes / 1440)}d ago`;
}

export default function MemeLaunchpadView() {
  const [view, setView] = useState<ViewType>("matrix");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);
  const [sortOpen, setSortOpen] = useState(false);
  const [bubbleSizeBy, setBubbleSizeBy] = useState(BUBBLE_SIZE_OPTIONS[0]);
  const [tokens, setTokens] = useState<LaunchpadToken[]>(TOKENS);
  const [toast, setToast] = useState<string | null>(null);
  const [activeSnipe, setActiveSnipe] = useState<Record<string, string>>({});

  /* Interactive Bubble Hover & Popups */
  const [hoveredToken, setHoveredToken] = useState<LaunchpadToken | null>(null);
  const [selectedBubbleToken, setSelectedBubbleToken] = useState<LaunchpadToken | null>(null);
  const [tradingTerminalToken, setTradingTerminalToken] = useState<LaunchpadToken | null>(null);

  /* Matrix specific filters */
  const [chainFilter, setChainFilter] = useState("all");
  const [capFilter, setCapFilter] = useState("all");
  const [liqFilter, setLiqFilter] = useState("any");
  const [ageFilter, setAgeFilter] = useState("any");
  const [riskFilter, setRiskFilter] = useState("all");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const toggleFavorite = (id: string) => {
    setTokens((prev) => prev.map((t) => (t.id === id ? { ...t, isFavorited: !t.isFavorited } : t)));
  };

  const handleSnipe = (tokenId: string, amount: string) => {
    setActiveSnipe((prev) => ({ ...prev, [tokenId]: amount }));
  };

  const handleBuy = (token: LaunchpadToken) => {
    const amt = activeSnipe[token.id] || (token.chain === "SOL" ? "0.5" : "0.1");
    const unit = token.chain === "SOL" ? "SOL" : "BNB";
    showToast(`Initiated ${amt} ${unit} buy order for ${token.ticker}`);
  };

  const filtered = useMemo(() => {
    return tokens
      .filter((t) => {
        if (activeFilter !== "all" && t.status !== activeFilter) return false;
        if (chainFilter !== "all" && t.chain.toLowerCase() !== chainFilter.toLowerCase()) return false;
        if (search.trim()) {
          const q = search.toLowerCase();
          return (
            t.name.toLowerCase().includes(q) ||
            t.ticker.toLowerCase().includes(q) ||
            t.description.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "Market Cap") {
          const parse = (s: string) => parseFloat(s.replace(/[^0-9.]/g, "")) * (s.includes("M") ? 1e6 : 1e3);
          return parse(b.marketCap) - parse(a.marketCap);
        }
        if (sortBy === "24h Change") return b.change24h - a.change24h;
        if (sortBy === "KOL Count") return b.kolsHolding - a.kolsHolding;
        if (sortBy === "Bonding %") return b.bondingPercent - a.bondingPercent;
        return a.rank - b.rank;
      });
  }, [tokens, activeFilter, chainFilter, search, sortBy]);

  return (
    <div className={styles.container}>

      {/* ── TOP TELEMETRY & LAUNCHPAD HEADER ─────────────────── */}
      <div className={styles.headerCard}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <MoltenMetal
            color1="#2fcb73"
            color2="#148344"
            color3="#0a1a10"
            speed={0.15}
            scale={2.5}
            detail={3}
            glow={1.4}
            coreSize={0.1}
            swirl={0.8}
            fold={-0.1}
            blackPoint={0.05}
            brightness={1.3}
            colorMode="molten"
            grain={true}
            grainIntensity={0.03}
            mouseInteraction={true}
            mouseStrength={0.2}
            opacity={1.0}
          />
        </div>
        <div className={styles.headerTopRow}>
          <div className={styles.headerTitleBlock}>
            <span className={styles.headerBadge}>
              <Sparkles size={11} />
              Fair-Launch Bonding Curve Protocol
            </span>
            <h1 className={styles.headerTitle}>Meme Token Radar & Launchpad</h1>
            <p className={styles.headerSubtitle}>
              Real-time smart money accumulation, bonding curves, influential caller conviction, and fair token launches across BNB Chain & Solana.
            </p>
          </div>

          <div className={styles.headerActions}>
            <button
              className={styles.launchTokenBtn}
              onClick={() => showToast("Meme Token Creation wizard opened")}
            >
              <Rocket size={14} />
              Launch Meme Token
            </button>
          </div>
        </div>

        {/* Telemetry Quick Bar */}
        <div className={styles.telemetryGrid}>
          <div className={styles.telemetryCell}>
            <span className={styles.telemetryLabel}>24H Meme Volume</span>
            <div className={styles.telemetryValRow}>
              <span className={styles.telemetryVal}>$14.2M</span>
              <span className={styles.telemetryChange}>+28.4%</span>
            </div>
          </div>
          <div className={styles.telemetryCell}>
            <span className={styles.telemetryLabel}>Active Launches</span>
            <div className={styles.telemetryValRow}>
              <span className={styles.telemetryVal}>42 Tokens</span>
            </div>
          </div>
          <div className={styles.telemetryCell}>
            <span className={styles.telemetryLabel}>Graduating Soon</span>
            <div className={styles.telemetryValRow}>
              <span className={styles.telemetryVal}>3 Tokens</span>
            </div>
          </div>
          <div className={styles.telemetryCell}>
            <span className={styles.telemetryLabel}>KOL Smart Wallets</span>
            <div className={styles.telemetryValRow}>
              <span className={styles.telemetryVal}>1,420</span>
              <span className={styles.telemetryChange}>+12 today</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── UNIFIED NAVIGATION & CONTROLS BAR ────────────────── */}
      <div className={styles.navControlsBar}>
        {/* View Switcher Tabs */}
        <div className={styles.viewSelectorGroup}>
          {VIEW_TYPES.map((v) => (
            <button
              key={v.id}
              className={`${styles.viewSelectorBtn} ${view === v.id ? styles.viewSelectorBtnActive : ""}`}
              onClick={() => setView(v.id as ViewType)}
            >
              {v.icon}
              <span>{v.label}</span>
            </button>
          ))}
        </div>

        {/* Status Subfilters */}
        <div className={styles.subFilterTabs}>
          {STATUS_FILTERS.map((s) => (
            <button
              key={s.id}
              className={`${styles.subFilterTab} ${activeFilter === s.id ? styles.subFilterTabActive : ""}`}
              onClick={() => setActiveFilter(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className={styles.searchSortGroup}>
          <div className={styles.searchWrap}>
            <Search size={13} className={styles.searchIcon} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search token, ticker, dev..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div style={{ position: "relative" }}>
            <button className={styles.sortDropdownBtn} onClick={() => setSortOpen((v) => !v)}>
              <TrendingUp size={12} />
              {sortBy}
              <ChevronDown size={11} />
            </button>
            {sortOpen && (
              <div className={styles.sortDropdownMenu}>
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    className={`${styles.sortDropdownItem} ${sortBy === opt ? styles.sortDropdownItemActive : ""}`}
                    onClick={() => { setSortBy(opt); setSortOpen(false); }}
                  >
                    {opt}
                    {sortBy === opt && <Check size={11} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT AREA ────────────────────────────────── */}
      <div className={styles.mainContent}>

        {/* ═══ VIEW 1: INTELLIGENCE MATRIX & BUBBLE MAP ═════ */}
        {view === "matrix" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
            {/* Top Bubble Map Controls & Interactive Canvas */}
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <div className={styles.bubbleControls}>
                <span className={styles.bubbleSizeLabel}>Size By:</span>
                <div className={styles.bubbleSizeBtns}>
                  {BUBBLE_SIZE_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      className={`${styles.bubbleSizeBtn} ${bubbleSizeBy === opt ? styles.bubbleSizeBtnActive : ""}`}
                      onClick={() => setBubbleSizeBy(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <div className={styles.bubbleDivider} />
                <span className={styles.bubbleColorLabel}>Colors:</span>
                <select className={styles.bubbleColorSelect}>
                  <option>24h Gain / Loss</option>
                  <option>KOL Holding</option>
                  <option>Bonding Curve</option>
                </select>
                <select className={styles.bubbleKolFilterSelect}>
                  <option>All KOLs</option>
                  <option>KOLs Holding</option>
                  <option>Top KOLs</option>
                </select>
                <ZoomIn size={14} style={{ color: "var(--text-tertiary)", cursor: "pointer" }} />
                <ZoomOut size={14} style={{ color: "var(--text-tertiary)", cursor: "pointer" }} />
                <RefreshCw size={13} style={{ color: "var(--text-tertiary)", cursor: "pointer" }} />
              </div>

              {/* ── BUBBLE MAP CANVAS ───────────────────────── */}
              <div className={styles.bubbleMapArea}>
                
                {/* Bottom Guide Legend */}
                <div className={styles.bubbleLegendBar}>
                  <div className={styles.legendItem}>
                    <span className={styles.legendDotGain} />
                    <span>Gain (+%)</span>
                  </div>
                  <div className={styles.legendItem}>
                    <span className={styles.legendDotLoss} />
                    <span>Loss (-%)</span>
                  </div>
                  <div className={styles.legendItem}>
                    <span className={styles.legendDotKol} />
                    <span>Top KOL Bag</span>
                  </div>
                  <span>| 💡 Click bubble for breakdown · Double-click to open terminal</span>
                </div>

                {/* Bubbles */}
                {filtered.map((token) => {
                  const isGain = token.change24h >= 0;
                  const isSelected = selectedBubbleToken?.id === token.id;
                  const orbitSize = token.bubbleSize + 24;

                  return (
                    <div
                      key={token.id}
                      className={styles.bubbleWrap}
                      style={{
                        left: `${token.bubbleX}%`,
                        top: `${token.bubbleY}%`,
                        width: orbitSize,
                        height: orbitSize,
                      }}
                      onMouseEnter={() => setHoveredToken(token)}
                      onMouseLeave={() => setHoveredToken(null)}
                      onClick={() => setSelectedBubbleToken(token)}
                      onDoubleClick={() => setTradingTerminalToken(token)}
                    >
                      {/* Orbit Ring with mini avatars if token has KOLs */}
                      {token.kolsHolding > 0 && (
                        <div
                          className={styles.bubbleOrbitRing}
                          style={{ width: orbitSize, height: orbitSize }}
                        >
                          <div className={styles.orbitKolAvatar} style={{ left: "50%", top: "0%" }}>
                            🦁
                          </div>
                          <div className={styles.orbitKolAvatar} style={{ left: "100%", top: "50%" }}>
                            🦊
                          </div>
                          <div className={styles.orbitKolAvatar} style={{ left: "50%", top: "100%" }}>
                            ⚡
                          </div>
                        </div>
                      )}

                      {/* Main Bubble Disk */}
                      <div
                        className={`${styles.bubble} ${!isGain ? styles.bubbleLoss : ""} ${isSelected ? styles.bubbleSelected : ""}`}
                        style={{
                          width: token.bubbleSize,
                          height: token.bubbleSize,
                        }}
                      >
                        <div className={styles.bubbleAvatarTop}>
                          {token.avatarImg ? (
                            <img
                              src={token.avatarImg}
                              alt={token.name}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              onError={(e) => { (e.target as HTMLElement).style.display = "none"; }}
                            />
                          ) : (
                            token.avatarEmoji || "💎"
                          )}
                        </div>
                        <span className={styles.bubbleTicker} style={{ fontSize: Math.max(10, token.bubbleSize * 0.13) }}>
                          {token.ticker}
                        </span>
                        <span
                          className={`${styles.bubbleKols} ${token.kolsHolding > 0 ? styles.bubbleKolsHighlight : ""}`}
                          style={{ fontSize: Math.max(9, token.bubbleSize * 0.1) }}
                        >
                          {token.kolsHolding > 0 ? `${token.kolsHolding} KOLs` : "0 KOLs"}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* ── HOVER POPUP TOOLTIP (matches Screenshot 1) ─── */}
                {hoveredToken && (
                  <div
                    className={styles.bubbleHoverTooltip}
                    style={{
                      left: `${Math.min(Math.max(hoveredToken.bubbleX, 22), 78)}%`,
                      top: `${hoveredToken.bubbleY}%`,
                      transform: hoveredToken.bubbleY < 42 ? "translate(-50%, 20%)" : "translate(-50%, -115%)",
                    }}
                  >
                    <div className={styles.hoverHeaderRow}>
                      <div className={styles.hoverIdentityBlock}>
                        <div className={styles.hoverAvatar}>
                          {hoveredToken.avatarImg ? (
                            <img src={hoveredToken.avatarImg} alt={hoveredToken.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          ) : (
                            hoveredToken.avatarEmoji || "💎"
                          )}
                        </div>
                        <div className={styles.hoverTitleStack}>
                          <div className={styles.hoverNameLine}>
                            <span>{hoveredToken.name}</span>
                            <span className={styles.hoverTickerText}>{hoveredToken.ticker}</span>
                          </div>
                          <span className={styles.hoverPriceText}>{hoveredToken.price}</span>
                        </div>
                      </div>
                      <span className={styles.hoverChangePill}>
                        +{hoveredToken.change24h.toFixed(2)}%
                      </span>
                    </div>

                    <div className={styles.hoverKolBox}>
                      <div className={styles.hoverKolBoxHeader}>
                        <span>👥 {hoveredToken.kolsHolding || 3} KOL Callers</span>
                        <span className={styles.hoverKolBagVal}>{hoveredToken.totalKolBag || "$46,000"}</span>
                      </div>
                      <div className={styles.hoverKolChipsRow}>
                        {(hoveredToken.kolDetails || [
                          { name: "Murad Mahm...", handle: "@murad" },
                          { name: "Cobie", handle: "@cobie" },
                          { name: "Rewkang", handle: "@rew" },
                        ]).map((k, i) => (
                          <span key={i} className={styles.hoverKolChip}>
                            <span>👤</span>
                            <span>{k.name}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={styles.hoverFooterRow}>
                      <span>Market Cap: {hoveredToken.marketCap}</span>
                      <span>24h Volume: {hoveredToken.volume24h}</span>
                    </div>
                  </div>
                )}

                {/* ── SIDE POPUP DETAIL CARD (matches Screenshot 2) ─── */}
                {selectedBubbleToken && (
                  <div className={styles.bubbleSidePopup}>
                    <div className={styles.sidePopupHeader}>
                      <div className={styles.sidePopupIdentity}>
                        <div className={styles.sidePopupAvatar}>
                          {selectedBubbleToken.avatarImg ? (
                            <img src={selectedBubbleToken.avatarImg} alt={selectedBubbleToken.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          ) : (
                            selectedBubbleToken.avatarEmoji || "💎"
                          )}
                        </div>
                        <div className={styles.sidePopupInfo}>
                          <span className={styles.sidePopupName}>{selectedBubbleToken.name}</span>
                          <div className={styles.sidePopupMeta}>
                            <span className={styles.sidePopupTickerBadge}>{selectedBubbleToken.ticker}</span>
                            <span>·</span>
                            <span>{selectedBubbleToken.price}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        className={styles.sidePopupCloseBtn}
                        onClick={() => setSelectedBubbleToken(null)}
                      >
                        <X size={13} />
                      </button>
                    </div>

                    {/* 4-Stat Grid */}
                    <div className={styles.sidePopupStatsGrid}>
                      <div className={styles.sidePopupStatCell}>
                        <span className={styles.sidePopupStatLabel}>24h Change</span>
                        <span className={styles.sidePopupStatVal} style={{ color: "var(--emerald-500)" }}>
                          +{selectedBubbleToken.change24h.toFixed(2)}%
                        </span>
                      </div>
                      <div className={styles.sidePopupStatCell}>
                        <span className={styles.sidePopupStatLabel}>Market Cap</span>
                        <span className={styles.sidePopupStatVal}>{selectedBubbleToken.marketCap}</span>
                      </div>
                      <div className={styles.sidePopupStatCell}>
                        <span className={styles.sidePopupStatLabel}>24h Volume</span>
                        <span className={styles.sidePopupStatVal}>{selectedBubbleToken.volume24h}</span>
                      </div>
                      <div className={styles.sidePopupStatCell}>
                        <span className={styles.sidePopupStatLabel}>Total Holders</span>
                        <span className={styles.sidePopupStatVal}>{selectedBubbleToken.holders.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* KOL Holders List */}
                    <div className={styles.sidePopupKolSection}>
                      <div className={styles.sidePopupKolHeader}>
                        <span>👥 KOL Holders ({selectedBubbleToken.kolsHolding || 3})</span>
                        <span style={{ color: "var(--emerald-400)", fontFamily: "var(--font-mono)" }}>
                          {selectedBubbleToken.totalKolBag || "$36,000"}
                        </span>
                      </div>

                      <div className={styles.sidePopupKolList}>
                        {(selectedBubbleToken.kolDetails || [
                          { name: "Ansem", handle: "@blknoiz06", multiple: "+5.7x", tier: "Tier 1 KOL" },
                          { name: "Murad Mahmudov", handle: "@MustStopMurad", multiple: "+15.3x", tier: "Tier 1 KOL" },
                          { name: "Cobie", handle: "@coffeebreak_sol", multiple: "+8.1x", tier: "Ecosystem Lead" },
                        ]).map((kol, idx) => (
                          <div key={idx} className={styles.sidePopupKolRow}>
                            <div className={styles.sidePopupKolLeft}>
                              <div className={styles.sidePopupKolAvatar}>👤</div>
                              <div>
                                <div className={styles.sidePopupKolName}>{kol.name}</div>
                                <div className={styles.sidePopupKolHandle}>{kol.handle}</div>
                              </div>
                            </div>
                            <div className={styles.sidePopupKolRight}>
                              <span className={styles.sidePopupKolMultiple}>{kol.multiple}</span>
                              <span className={styles.sidePopupKolTier}>{kol.tier}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <button
                      className={styles.sidePopupSnipeBtn}
                      onClick={() => handleBuy(selectedBubbleToken)}
                    >
                      <Zap size={14} />
                      Snipe Buy {selectedBubbleToken.ticker}
                    </button>

                    <button
                      className={styles.sidePopupTerminalBtn}
                      onClick={() => setTradingTerminalToken(selectedBubbleToken)}
                    >
                      <ExternalLink size={13} />
                      Open Trading Terminal
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Intelligence Matrix Table Card */}
            <div className={styles.matrixSectionCard}>
              <div className={styles.matrixSectionHeader}>
                <h2 className={styles.matrixSectionTitle}>Trending Meme Tokens Matrix</h2>
                <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>
                  Showing {filtered.length} active market tokens
                </span>
              </div>

              {/* Filter Dropdowns Bar */}
              <div className={styles.matrixFiltersBar}>
                <div className={styles.filterSelectGroup}>
                  <span className={styles.filterSelectLabel}>Blockchain</span>
                  <select
                    className={styles.filterSelect}
                    value={chainFilter}
                    onChange={(e) => setChainFilter(e.target.value)}
                  >
                    <option value="all">All Chains</option>
                    <option value="bnb">BNB Chain</option>
                    <option value="sol">Solana</option>
                    <option value="eth">Ethereum</option>
                  </select>
                </div>

                <div className={styles.filterSelectGroup}>
                  <span className={styles.filterSelectLabel}>Market Cap</span>
                  <select
                    className={styles.filterSelect}
                    value={capFilter}
                    onChange={(e) => setCapFilter(e.target.value)}
                  >
                    <option value="all">All Caps</option>
                    <option value="sub100k">&lt; $100K</option>
                    <option value="mid">$100K - $1M</option>
                    <option value="high">&gt; $1M</option>
                  </select>
                </div>

                <div className={styles.filterSelectGroup}>
                  <span className={styles.filterSelectLabel}>Min Liquidity</span>
                  <select
                    className={styles.filterSelect}
                    value={liqFilter}
                    onChange={(e) => setLiqFilter(e.target.value)}
                  >
                    <option value="any">Any Liquidity</option>
                    <option value="10k">&gt; $10K</option>
                    <option value="50k">&gt; $50K</option>
                    <option value="100k">&gt; $100K</option>
                  </select>
                </div>

                <div className={styles.filterSelectGroup}>
                  <span className={styles.filterSelectLabel}>Launch Age</span>
                  <select
                    className={styles.filterSelect}
                    value={ageFilter}
                    onChange={(e) => setAgeFilter(e.target.value)}
                  >
                    <option value="any">Any Age</option>
                    <option value="1h">&lt; 1 Hour</option>
                    <option value="24h">&lt; 24 Hours</option>
                    <option value="7d">&lt; 7 Days</option>
                  </select>
                </div>

                <div className={styles.filterSelectGroup}>
                  <span className={styles.filterSelectLabel}>Security Status</span>
                  <select
                    className={styles.filterSelect}
                    value={riskFilter}
                    onChange={(e) => setRiskFilter(e.target.value)}
                  >
                    <option value="all">All Risk Levels</option>
                    <option value="low">Low Risk Only</option>
                    <option value="verified">Verified Only</option>
                  </select>
                </div>
              </div>

              {/* Matrix Data Table */}
              <div className={styles.matrixTableWrapper}>
                <table className={styles.matrixTable}>
                  <thead>
                    <tr>
                      <th className={styles.matrixTh}>Asset</th>
                      <th className={styles.matrixTh}>Smart Money</th>
                      <th className={styles.matrixTh}>Influential Traders</th>
                      <th className={styles.matrixTh}>Whales</th>
                      <th className={styles.matrixTh}>Social Acceleration</th>
                      <th className={styles.matrixTh}>i5 Conviction</th>
                      <th className={styles.matrixTh}>Quick Trade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((token) => {
                      const snipeAmt = activeSnipe[token.id] || (token.chain === "SOL" ? "0.5" : "0.1");
                      const snipeOptions = token.chain === "SOL" ? ["0.2", "0.5", "1.5"] : ["0.1", "0.5", "1"];
                      const isGain = token.change24h >= 0;

                      return (
                        <tr key={token.id} className={styles.matrixTr}>
                          {/* ASSET CELL */}
                          <td className={styles.matrixTd}>
                            <div className={styles.assetCellWrap}>
                              <button
                                className={styles.assetStarBtn}
                                onClick={() => toggleFavorite(token.id)}
                              >
                                <Star
                                  size={13}
                                  fill={token.isFavorited ? "currentColor" : "none"}
                                />
                              </button>

                              <div className={`${styles.assetRankBadge} ${token.rank === 1 ? styles.assetRankBadgeTop : ""}`}>
                                {token.rank}
                              </div>

                              <div className={styles.assetAvatar}>
                                {token.avatarImg ? (
                                  <img
                                    src={token.avatarImg}
                                    alt={token.name}
                                    className={styles.assetAvatarImg}
                                    onError={(e) => { (e.target as HTMLElement).style.display = "none"; }}
                                  />
                                ) : token.avatarEmoji}
                              </div>

                              <div className={styles.assetInfoStack}>
                                <div className={styles.assetNameLine}>
                                  <span className={styles.assetNameText}>{token.name}</span>
                                  <span className={styles.assetTickerText}>{token.ticker}</span>
                                  <span className={styles.assetChainPillSmall}>{token.chain}</span>
                                </div>
                                <div className={styles.assetPriceLine}>
                                  <span className={styles.assetPriceVal}>{token.price}</span>
                                  <span className={isGain ? styles.assetChangeValUp : styles.assetChangeValDown}>
                                    {isGain ? "↗ +" : "↘ -"}{Math.abs(token.change24h).toFixed(2)}%
                                  </span>
                                  <span className={styles.assetCapVal}>· Cap: {token.marketCap}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* SMART MONEY */}
                          <td className={styles.matrixTd}>
                            <div className={styles.smartMoneyBox}>
                              <span className={styles.smartMoneyCountHeader}>{token.smartMoneyCount}</span>
                              <span className={styles.smartMoneyStatusText}>{token.smartMoneyLabel}</span>
                              <span className={styles.smartMoneySubLabel}>Smart Wallets</span>
                            </div>
                          </td>

                          {/* INFLUENTIAL TRADERS */}
                          <td className={styles.matrixTd}>
                            <div className={styles.cellStack}>
                              <span className={styles.influentialPill}>
                                <span className={styles.influentialDot} />
                                {token.kolBullishCount} bullish
                              </span>
                              <span className={styles.cellSubLabel}>KOL Alpha Calls</span>
                            </div>
                          </td>

                          {/* WHALES */}
                          <td className={styles.matrixTd}>
                            <div className={styles.cellStack}>
                              <span className={styles.whalePill}>
                                🐳 {token.whaleInflow}
                              </span>
                              <span className={styles.cellSubLabel}>Net Inflow</span>
                            </div>
                          </td>

                          {/* SOCIAL ACCELERATION */}
                          <td className={styles.matrixTd}>
                            <div className={styles.cellStack}>
                              <span className={styles.socialBox}>
                                ↗ ↑ {token.socialVelocity}
                              </span>
                              <span className={styles.cellSubLabel}>Viral Velocity</span>
                            </div>
                          </td>

                          {/* i5 CONVICTION */}
                          <td className={styles.matrixTd}>
                            <div className={styles.convictionWrap}>
                              <div className={styles.convictionScoreRow}>
                                <div className={styles.convictionTrack}>
                                  <div
                                    className={styles.convictionFill}
                                    style={{ width: `${token.convictionScore}%` }}
                                  />
                                </div>
                                <span className={styles.convictionScoreVal}>{token.convictionScore}</span>
                              </div>
                              <span className={styles.cellSubLabel}>{token.convictionTier}</span>
                            </div>
                          </td>

                          {/* QUICK TRADE */}
                          <td className={styles.matrixTd}>
                            <div className={styles.quickTradeCell}>
                              <div className={styles.matrixSnipeGroup}>
                                {snipeOptions.map((amt) => (
                                  <button
                                    key={amt}
                                    className={`${styles.matrixSnipeBtn} ${snipeAmt === amt ? styles.matrixSnipeBtnActive : ""}`}
                                    onClick={() => handleSnipe(token.id, amt)}
                                  >
                                    {amt}
                                  </button>
                                ))}
                              </div>
                              <button
                                className={styles.matrixBuyBtn}
                                onClick={() => handleBuy(token)}
                              >
                                <ShoppingCart size={11} />
                                Buy {snipeAmt} {token.chain === "SOL" ? "SOL" : "BNB"}
                              </button>
                              <button
                                className={styles.matrixChartBtn}
                                onClick={() => setTradingTerminalToken(token)}
                              >
                                <BarChart2 size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ═══ VIEW 2: HORIZONTAL CARDS ══════════════════════ */}
        {view === "horizontal" && (
          <div className={styles.hCardsList}>
            {filtered.map((token) => {
              const snipeAmt = activeSnipe[token.id] || "0.5";
              const snipeOptions = ["0.2", "0.5", "1.5"];
              const isGain = token.change24h >= 0;
              const rawTicker = token.ticker.replace(/^\$/, "");

              return (
                <div key={token.id} className={styles.hCard}>
                  {/* ── LEFT COLUMN ─────────────────────────────── */}
                  <div className={styles.hCardLeft}>
                    <div className={styles.hCardTopRow}>
                      <span className={styles.trendingBadge}>🔥 Trending</span>
                      <span className={styles.chainPill}>{token.chain}</span>
                      <span className={styles.ageMeta}>
                        <Clock size={11} />
                        {formatAge(token.ageMinutes)}
                      </span>
                      <button
                        className={`${styles.starBtn} ${token.isFavorited ? styles.starBtnActive : ""}`}
                        onClick={() => toggleFavorite(token.id)}
                      >
                        <Star size={14} fill={token.isFavorited ? "currentColor" : "none"} />
                      </button>
                    </div>

                    <div className={styles.hCardIdentityWrap}>
                      <div className={styles.hCardIdentity}>
                        <div className={styles.hCardAvatar}>
                          {token.avatarImg ? (
                            <img
                              src={token.avatarImg}
                              alt={token.name}
                              className={styles.hCardAvatarImg}
                              onError={(e) => { (e.target as HTMLElement).style.display = "none"; }}
                            />
                          ) : token.avatarEmoji}
                        </div>
                        <div className={styles.hCardIdentityText}>
                          <span className={styles.hCardTickerBadge}>{rawTicker}</span>
                          <span className={styles.hCardName}>{token.name}</span>
                          <span className={styles.hCardTicker}>{token.ticker}</span>
                        </div>
                      </div>

                      <div className={styles.hCardBadgeRow}>
                        {token.isVerified && (
                          <span className={styles.greenBadge}>
                            <Check size={11} strokeWidth={3} />
                            Verified
                          </span>
                        )}
                        <span className={styles.greenBadge}>Low Risk</span>
                      </div>
                    </div>

                    <div className={styles.devRow}>
                      <Globe size={12} />
                      dev: {token.devHandle}
                    </div>
                  </div>

                  {/* ── MIDDLE COLUMN: STATS ────────────────────── */}
                  <div className={styles.hCardMiddle}>
                    <div className={styles.statsGrid}>
                      <div className={styles.statsRow}>
                        <div className={styles.statCell}>
                          <span className={styles.statLabel}>Price</span>
                          <span className={styles.statVal}>{token.price}</span>
                        </div>
                        <div className={styles.statCell}>
                          <span className={styles.statLabel}>24H Change</span>
                          <span className={`${styles.statVal} ${isGain ? styles.statValUp : styles.statValDown}`}>
                            {isGain ? "↑" : "↓"}{Math.abs(token.change24h).toFixed(2)}%
                          </span>
                        </div>
                      </div>

                      <div className={styles.statsRow}>
                        <div className={styles.statCell}>
                          <span className={styles.statLabel}>Market Cap</span>
                          <span className={styles.statVal}>{token.marketCap}</span>
                        </div>
                        <div className={styles.statCell}>
                          <span className={styles.statLabel}>24H Volume</span>
                          <span className={styles.statVal}>{token.volume24h}</span>
                        </div>
                      </div>

                      <div className={styles.statsRow}>
                        <div className={styles.statCell}>
                          <span className={styles.statLabel}>Liquidity</span>
                          <span className={styles.statVal}>{token.liquidity}</span>
                        </div>
                        <div className={styles.statCell}>
                          <span className={styles.statLabel}>Holders</span>
                          <span className={styles.statVal}>{token.holders.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.middleFooterPills}>
                      <span className={styles.smartMoneyBadge}>Smart Money: accumulating</span>
                      <span className={styles.i5ScoreBadge}>i5 Score: {token.i5Score}</span>
                    </div>
                  </div>

                  {/* ── RIGHT COLUMN: CURVE & ACTIONS ───────────── */}
                  <div className={styles.hCardRight}>
                    <div className={styles.curveSection}>
                      <div className={styles.curveHeader}>
                        <div className={styles.curveHeaderLeft}>
                          <TrendingUp size={13} />
                          <span>Bonding Curve</span>
                        </div>
                        <span>{token.bondingPercent.toFixed(1)}%</span>
                      </div>
                      <div className={styles.curveProgressTrack}>
                        <div
                          className={styles.curveProgressFill}
                          style={{ width: `${token.bondingPercent}%` }}
                        />
                      </div>
                      <div className={styles.curveMetaRow}>
                        <div className={styles.curveMetaLeft}>
                          <Users size={12} />
                          <span>Top 10</span>
                        </div>
                        <span className={styles.curveMetaRight}>{token.topTenPct}</span>
                      </div>
                      <div className={styles.curveMetaRow}>
                        <div className={styles.curveMetaLeft}>
                          <Bot size={12} />
                          <span>Bot Activity</span>
                        </div>
                        <span className={styles.lowRiskBadgeSmall}>Low</span>
                      </div>
                    </div>

                    <div className={styles.dividerDotted} />

                    <div className={styles.quickSnipeWrap}>
                      <span className={styles.quickSnipeHeader}>Quick Snipe</span>
                      <div className={styles.snipeButtonsRow}>
                        {snipeOptions.map((amt) => (
                          <button
                            key={amt}
                            className={`${styles.snipeButton} ${snipeAmt === amt ? styles.snipeButtonActive : ""}`}
                            onClick={() => handleSnipe(token.id, amt)}
                          >
                            {amt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button className={styles.buyActionButton} onClick={() => handleBuy(token)}>
                      Buy {snipeAmt} {token.chain === "SOL" ? "SOL" : "BNB"}
                    </button>
                    <button className={styles.chartActionButton} onClick={() => setTradingTerminalToken(token)}>
                      <BarChart2 size={13} />
                      View Chart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ═══ VIEW 3: CARD GRID ═════════════════════════════ */}
        {view === "grid" && (
          <div className={styles.cardGrid}>
            {filtered.map((token) => (
              <div key={token.id} className={styles.gridCard} onClick={() => setTradingTerminalToken(token)}>
                {/* Top */}
                <div className={styles.gridCardTop}>
                  <div className={styles.gridCardIdentity}>
                    <div className={styles.gridCardAvatar}>
                      {token.avatarImg ? (
                        <img
                          src={token.avatarImg}
                          alt={token.name}
                          className={styles.gridCardAvatarImg}
                          onError={(e) => { (e.target as HTMLElement).style.display = "none"; }}
                        />
                      ) : token.avatarEmoji}
                    </div>
                    <div className={styles.gridCardMeta}>
                      <div className={styles.gridCardNameRow}>
                        <span className={styles.gridCardName}>{token.name}</span>
                        <span className={styles.gridCardTicker}>{token.ticker}</span>
                      </div>
                      <div className={styles.gridCardDev}>
                        by {token.devHandle}
                        {token.isVerified && <Check size={10} style={{ color: "var(--emerald-500)" }} strokeWidth={3} />}
                        <span className={styles.gridCardAge}>
                          <Clock size={9} />
                          {formatAge(token.ageMinutes)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", flexShrink: 0 }}>
                    <span className={`${styles.gridCardBadge} ${token.badge === "HIGH KOL BAG" ? styles.highKolBadge : styles.communityBadge}`}>
                      {token.badge}
                    </span>
                    <button
                      style={{ background: "transparent", border: "none", color: token.isFavorited ? "var(--text-primary)" : "var(--text-disabled)", cursor: "pointer", padding: "var(--space-1)" }}
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(token.id); }}
                    >
                      <Star size={13} fill={token.isFavorited ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>

                {/* Description */}
                <p className={styles.gridCardDesc}>{token.description}</p>

                {/* KOL Section */}
                <div className={styles.gridCardKolSection}>
                  <div className={styles.kolSectionHeader}>
                    <span className={styles.kolSectionTitle}>
                      <Users size={12} />
                      KOL Holders
                    </span>
                    <span className={`${styles.kolCountPill} ${token.kolsHolding > 0 ? styles.kolCountPillActive : ""}`}>
                      {token.kolsHolding} holding
                    </span>
                  </div>
                  {token.kolsHolding > 0 ? (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div className={styles.kolAvatarsRow}>
                        {token.kolAvatars.slice(0, 4).map((av, i) => (
                          <div key={i} className={styles.kolAvatar}>{av}</div>
                        ))}
                        {token.kolsHolding > 4 && (
                          <span style={{ fontSize: 10, color: "var(--text-tertiary)", marginLeft: "var(--space-2)" }}>
                            +{token.kolsHolding - 4}
                          </span>
                        )}
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 9, color: "var(--text-tertiary)" }}>KOL BAG</div>
                        <div className={`${styles.kolBagLabel} ${styles.kolBagValue}`}>{token.totalKolBag}</div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span className={styles.noKolsText}>No callers holding</span>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 9, color: "var(--text-tertiary)" }}>KOL BAG</div>
                        <div className={styles.kolBagLabel}>{token.totalKolBag}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className={styles.gridCardStats}>
                  <div className={styles.gridStatCell}>
                    <span className={styles.gridStatLabel}>Market Cap</span>
                    <span className={styles.gridStatValue}>{token.marketCap}</span>
                  </div>
                  <div className={styles.gridStatCell}>
                    <span className={styles.gridStatLabel}>24H Vol</span>
                    <span className={styles.gridStatValue}>{token.volume24h}</span>
                  </div>
                  <div className={styles.gridStatCell}>
                    <span className={styles.gridStatLabel}>Holders</span>
                    <span className={styles.gridStatValue}>{token.holders.toLocaleString()}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className={styles.gridCardFooter}>
                  <div className={styles.i5ScoreRow}>
                    <ShieldCheck size={11} />
                    <span className={styles.i5ScoreValue}>{token.i5Score}/100</span>
                  </div>
                  <span className={styles.top10Row}>Top 10: {token.topTenPct}</span>
                  <button
                    className={styles.quickBuyBtn}
                    onClick={(e) => { e.stopPropagation(); showToast(`Quick Buy ${token.ticker}`); }}
                  >
                    Quick Buy
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── TRADING TERMINAL MODAL (matches Screenshot 3) ──── */}
      {tradingTerminalToken && (
        <MemeTradingTerminal
          initialToken={tradingTerminalToken}
          allTokens={tokens}
          onClose={() => setTradingTerminalToken(null)}
        />
      )}

      {/* ── TOAST ────────────────────────────────────────────── */}
      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  );
}
