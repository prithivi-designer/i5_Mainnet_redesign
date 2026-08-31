"use client";

import React, { useState, useMemo } from "react";
import {
  Rocket,
  Sparkles,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
  Check,
  TrendingUp,
  TrendingDown,
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
  MoreHorizontal,
  CircleDot,
  Radio,
  Award,
  Trophy,
  Activity,
  Wallet,
  Copy,
  ArrowUpRight,
  Filter,
  DollarSign,
  Settings,
  Volume2,
  VolumeX,
  Pause,
  Play,
  UserCheck,
  Coins,
  Compass,
  Eye,
  Info,
} from "lucide-react";
import styles from "./MemeLaunchpadView.module.css";
import MemeTradingTerminal, { TerminalToken } from "./MemeTradingTerminal";
import KolProfileDrawer from "./KolProfileDrawer";

/* ── KOL Radar Exact Reference Types & Mocks ───────────────── */
export interface KolTrendingToken {
  id: string;
  name: string;
  ticker: string;
  avatar: string;
  chain: "BNB" | "SOL" | "ETH" | "BASE";
  contractAddress: string;
  price: string;
  change24h: number;
  marketCap: string;
  liquidity: string;
  volume24h: string;
  holders: number;
  kolBuyCount: number;
  kolSellCount: number;
  netKolFlow: string;
  bondingPercent: number;
}

export interface KolActivityTrade {
  id: string;
  kolName: string;
  kolHandle: string;
  kolAvatar: string;
  action: "BUY" | "SELL";
  tokenName: string;
  tokenTicker: string;
  tokenAvatar: string;
  chain: "BNB" | "SOL" | "ETH" | "BASE";
  timeAgo: string;
  txSizeChain: string;
  txSizeUsd: string;
  tokenAmount: string;
  mcAtTrade: string;
  changeSinceTx: number;
  txHash: string;
}

export interface TopPerformingKol {
  rank: number;
  kolName: string;
  kolHandle: string;
  kolAvatar: string;
  tierBadge: string;
  winRate: number;
  realizedProfit: string;
  volume24h: string;
  followers: string;
}

export interface KolLeaderboardItem {
  rank: number;
  kolName: string;
  kolHandle: string;
  kolAvatar: string;
  tier: string;
  winRate7d: number;
  totalCalls: number;
  avgMultiple: string;
  bestCall: { ticker: string; multiple: string };
  pnl30d: string;
  followers: string;
}

export interface KolConsensusItem {
  id: string;
  tokenName: string;
  tokenTicker: string;
  tokenAvatar: string;
  chain: "SOL" | "ETH" | "BNB" | "BASE";
  currentPrice: string;
  marketCap: string;
  bondingPercent: number;
  kols: { name: string; avatar: string; handle: string; time: string }[];
  totalBagUsd: string;
  signalStrength: "SUPER_BULLISH" | "HIGH_CONVICTION" | "EMERGING";
  change24h: number;
}

const MOCK_KOL_TRENDING: KolTrendingToken[] = [
  {
    id: "kt-1",
    name: "MOONCAT",
    ticker: "$MCAT",
    avatar: "🐱",
    chain: "BNB",
    contractAddress: "0x38...mcat",
    price: "$0.000420",
    change24h: 34.8,
    marketCap: "$42.0K",
    liquidity: "$11.0K",
    volume24h: "$21.5K",
    holders: 286,
    kolBuyCount: 6,
    kolSellCount: 1,
    netKolFlow: "+$180.0K Net",
    bondingPercent: 73.3,
  },
  {
    id: "kt-2",
    name: "KATE",
    ticker: "$KATE",
    avatar: "👩",
    chain: "BNB",
    contractAddress: "0x77...kate",
    price: "$0.003415",
    change24h: 81.4,
    marketCap: "$341.5K",
    liquidity: "$82.0K",
    volume24h: "$1.45M",
    holders: 1840,
    kolBuyCount: 9,
    kolSellCount: 2,
    netKolFlow: "+$300.0K Net",
    bondingPercent: 93.6,
  },
  {
    id: "kt-3",
    name: "CashCat",
    ticker: "$CASHCAT",
    avatar: "🐶",
    chain: "BNB",
    contractAddress: "0x55...cash",
    price: "$0.000981",
    change24h: 124.0,
    marketCap: "$98.1K",
    liquidity: "$26.0K",
    volume24h: "$622.9K",
    holders: 740,
    kolBuyCount: 12,
    kolSellCount: 3,
    netKolFlow: "+$420.0K Net",
    bondingPercent: 83.8,
  },
  {
    id: "kt-4",
    name: "PEPECLON",
    ticker: "$PCLON",
    avatar: "🐸",
    chain: "SOL",
    contractAddress: "0x9c...pclon",
    price: "$0.006900",
    change24h: 342.8,
    marketCap: "$6.9M",
    liquidity: "$850K",
    volume24h: "$8.4M",
    holders: 5200,
    kolBuyCount: 14,
    kolSellCount: 2,
    netKolFlow: "+$680.0K Net",
    bondingPercent: 92.0,
  },
  {
    id: "kt-5",
    name: "GIGA CHAD AI",
    ticker: "$GIGAI",
    avatar: "🗿",
    chain: "SOL",
    contractAddress: "0x4f...giga",
    price: "$0.008400",
    change24h: 184.2,
    marketCap: "$8.4M",
    liquidity: "$1.2M",
    volume24h: "$4.8M",
    holders: 4200,
    kolBuyCount: 18,
    kolSellCount: 2,
    netKolFlow: "+$740.0K Net",
    bondingPercent: 100.0,
  },
  {
    id: "kt-6",
    name: "AURA PROTOCOL",
    ticker: "$AURA",
    avatar: "✨",
    chain: "ETH",
    contractAddress: "0x1a...aura",
    price: "$0.001850",
    change24h: 96.4,
    marketCap: "$1.85M",
    liquidity: "$340K",
    volume24h: "$1.9M",
    holders: 1950,
    kolBuyCount: 8,
    kolSellCount: 1,
    netKolFlow: "+$250.0K Net",
    bondingPercent: 78.0,
  },
];

const MOCK_KOL_ACTIVITY: KolActivityTrade[] = [
  {
    id: "ka-1",
    kolName: "RookieXBT",
    kolHandle: "@RookieXBT",
    kolAvatar: "🧔",
    action: "SELL",
    tokenName: "Cyber Banana",
    tokenTicker: "$NANER",
    tokenAvatar: "🍌",
    chain: "BNB",
    timeAgo: "just now",
    txSizeChain: "18.57 BNB",
    txSizeUsd: "($11.6K)",
    tokenAmount: "414.28M tokens",
    mcAtTrade: "$28.4K",
    changeSinceTx: -1.19,
    txHash: "0x8f...1a2d",
  },
  {
    id: "ka-2",
    kolName: "RookieXBT",
    kolHandle: "@RookieXBT",
    kolAvatar: "🧔",
    action: "SELL",
    tokenName: "Peanut the Squirrel",
    tokenTicker: "$PNUT",
    tokenAvatar: "🥜",
    chain: "BNB",
    timeAgo: "6s ago",
    txSizeChain: "14.73 BNB",
    txSizeUsd: "($9.2K)",
    tokenAmount: "1.92M tokens",
    mcAtTrade: "$4.62M",
    changeSinceTx: 3.82,
    txHash: "0x3c...9b4e",
  },
  {
    id: "ka-3",
    kolName: "RookieXBT",
    kolHandle: "@RookieXBT",
    kolAvatar: "🧔",
    action: "SELL",
    tokenName: "Retardio Gaming",
    tokenTicker: "$RETARDIO",
    tokenAvatar: "🤖",
    chain: "BNB",
    timeAgo: "12s ago",
    txSizeChain: "25.1 BNB",
    txSizeUsd: "($15.7K)",
    tokenAmount: "4.90M tokens",
    mcAtTrade: "$3.25M",
    changeSinceTx: -1.53,
    txHash: "0x5d...4f18",
  },
  {
    id: "ka-4",
    kolName: "Ansem",
    kolHandle: "@blknoiz06",
    kolAvatar: "🐯",
    action: "BUY",
    tokenName: "Spartan Treasury DAO",
    tokenTicker: "$SPARTAN",
    tokenAvatar: "🏛️",
    chain: "BNB",
    timeAgo: "17s ago",
    txSizeChain: "14 BNB",
    txSizeUsd: "($8.8K)",
    tokenAmount: "16.80M tokens",
    mcAtTrade: "$534.2K",
    changeSinceTx: -2.49,
    txHash: "0x1e...8a92",
  },
  {
    id: "ka-5",
    kolName: "RookieXBT",
    kolHandle: "@RookieXBT",
    kolAvatar: "🧔",
    action: "BUY",
    tokenName: "MOONCAT",
    tokenTicker: "$MCAT",
    tokenAvatar: "🐱",
    chain: "BNB",
    timeAgo: "23s ago",
    txSizeChain: "12.32 BNB",
    txSizeUsd: "($7.7K)",
    tokenAmount: "18.33M tokens",
    mcAtTrade: "$41.3K",
    changeSinceTx: 1.84,
    txHash: "0x7a...2b61",
  },
  {
    id: "ka-6",
    kolName: "Murad Mahmudov",
    kolHandle: "@MustStopMurad",
    kolAvatar: "🦁",
    action: "BUY",
    tokenName: "PEPECLON",
    tokenTicker: "$PCLON",
    tokenAvatar: "🐸",
    chain: "SOL",
    timeAgo: "45s ago",
    txSizeChain: "42.5 SOL",
    txSizeUsd: "($8.5K)",
    tokenAmount: "12.5M tokens",
    mcAtTrade: "$6.9M",
    changeSinceTx: 14.2,
    txHash: "0x4b...7c99",
  },
  {
    id: "ka-7",
    kolName: "Pow Calls",
    kolHandle: "@PowCalls",
    kolAvatar: "🚀",
    action: "BUY",
    tokenName: "GIGA CHAD AI",
    tokenTicker: "$GIGAI",
    tokenAvatar: "🗿",
    chain: "SOL",
    timeAgo: "1m ago",
    txSizeChain: "28.0 SOL",
    txSizeUsd: "($5.6K)",
    tokenAmount: "6.7M tokens",
    mcAtTrade: "$8.4M",
    changeSinceTx: 8.6,
    txHash: "0x9d...2e14",
  },
  {
    id: "ka-8",
    kolName: "Dingaling",
    kolHandle: "@dingalingts",
    kolAvatar: "🦊",
    action: "BUY",
    tokenName: "AURA PROTOCOL",
    tokenTicker: "$AURA",
    tokenAvatar: "✨",
    chain: "ETH",
    timeAgo: "2m ago",
    txSizeChain: "4.2 ETH",
    txSizeUsd: "($14.8K)",
    tokenAmount: "8.0M tokens",
    mcAtTrade: "$1.85M",
    changeSinceTx: 5.1,
    txHash: "0x2a...8c71",
  },
];

const MOCK_TOP_KOLS: TopPerformingKol[] = [
  {
    rank: 1,
    kolName: "Ansem",
    kolHandle: "@blknoiz06",
    kolAvatar: "🐯",
    tierBadge: "Tier 1 KOL",
    winRate: 84.6,
    realizedProfit: "+$2.84M",
    volume24h: "$18.45M",
    followers: "680K",
  },
  {
    rank: 2,
    kolName: "Murad (Memecoin Oracle)",
    kolHandle: "@MustStopMurad",
    kolAvatar: "🦁",
    tierBadge: "Ecosystem Lead",
    winRate: 88.2,
    realizedProfit: "+$4.92M",
    volume24h: "$26.80M",
    followers: "420K",
  },
  {
    rank: 3,
    kolName: "Lookonchain Smart Mon...",
    kolHandle: "@lookonchain",
    kolAvatar: "🦊",
    tierBadge: "Alpha Caller",
    winRate: 81.2,
    realizedProfit: "+$3.84M",
    volume24h: "$31.20M",
    followers: "890K",
  },
  {
    rank: 4,
    kolName: "RookieXBT",
    kolHandle: "@RookieXBT",
    kolAvatar: "🧔",
    tierBadge: "Whale KOL",
    winRate: 78.5,
    realizedProfit: "+$1.98M",
    volume24h: "$14.20M",
    followers: "310K",
  },
  {
    rank: 5,
    kolName: "Degen Spartan",
    kolHandle: "@DegenSpartan",
    kolAvatar: "🛡️",
    tierBadge: "OG Trader",
    winRate: 82.0,
    realizedProfit: "+$2.65M",
    volume24h: "$19.80M",
    followers: "490K",
  },
];

export interface FullKolLeaderboardEntry {
  id: string;
  rank: number;
  kolName: string;
  kolHandle: string;
  kolAddress: string;
  kolAvatar: string;
  tierBadge: string;
  tierIcon: string;
  category: "Tier 1 KOLs" | "Alpha Callers" | "Whale KOLs" | "OG Traders";
  followers: string;
  winRate: number;
  wins: number;
  losses: number;
  pnl: string;
  pnlBnb: string;
  avgRoi: string;
  kdaRatio: string;
  totalVolume: string;
  bestCall: string;
  topHolding: {
    name: string;
    ticker: string;
    avatar: string;
    kolBag: string;
  };
}

const MOCK_KOL_LEADERBOARD_ENTRIES: FullKolLeaderboardEntry[] = [
  {
    id: "murad",
    rank: 1,
    kolName: "Murad (Memecoin Oracle)",
    kolHandle: "@MustStopMurad",
    kolAddress: "0x88...E769",
    kolAvatar: "🧔",
    tierBadge: "Ecosystem Lead",
    tierIcon: "👑",
    category: "Tier 1 KOLs",
    followers: "$480.0K followers",
    winRate: 88.2,
    wins: 164,
    losses: 22,
    pnl: "+$64.92M",
    pnlBnb: "+3216.0 BNB",
    avgRoi: "+684%",
    kdaRatio: "7.45",
    totalVolume: "$526.80M",
    bestCall: "$SPX6900 (+$720.0K)",
    topHolding: {
      name: "MOONCAT",
      ticker: "$MCAT",
      avatar: "🐱",
      kolBag: "$58.0K",
    },
  },
  {
    id: "lookonchain",
    rank: 2,
    kolName: "Lookonchain Smart Money",
    kolHandle: "@lookonchain",
    kolAddress: "0x1F...F994",
    kolAvatar: "⚡",
    tierBadge: "Alpha Caller",
    tierIcon: "⚡",
    category: "Alpha Callers",
    followers: "$710.0K followers",
    winRate: 81.2,
    wins: 210,
    losses: 48,
    pnl: "+$63.84M",
    pnlBnb: "+6930.0 BNB",
    avgRoi: "+345%",
    kdaRatio: "4.38",
    totalVolume: "$331.20M",
    bestCall: "$CHILL (+$490.0K)",
    topHolding: {
      name: "KATE",
      ticker: "$KATE",
      avatar: "👑",
      kolBag: "$105.5K",
    },
  },
  {
    id: "ansem",
    rank: 3,
    kolName: "Ansem",
    kolHandle: "@blknoiz06",
    kolAddress: "0x3a...4f5E",
    kolAvatar: "🧢",
    tierBadge: "Tier 1 KOL",
    tierIcon: "🔥",
    category: "Tier 1 KOLs",
    followers: "$520.0K followers",
    winRate: 84.6,
    wins: 132,
    losses: 24,
    pnl: "+$52.84M",
    pnlBnb: "+5951.3 BNB",
    avgRoi: "+412.5%",
    kdaRatio: "5.50",
    totalVolume: "$518.45M",
    bestCall: "$PEPEBOT (+$384.0K)",
    topHolding: {
      name: "PEPEBOT",
      ticker: "$PEPEBOT",
      avatar: "🤖",
      kolBag: "$120.2K",
    },
  },
  {
    id: "degenspartan",
    rank: 4,
    kolName: "Degen Spartan",
    kolHandle: "@DegenSpartan",
    kolAddress: "0x0D...deA9",
    kolAvatar: "🛡️",
    tierBadge: "OG Trader",
    tierIcon: "👑",
    category: "OG Traders",
    followers: "$395.0K followers",
    winRate: 82.0,
    wins: 93,
    losses: 21,
    pnl: "+$52.65M",
    pnlBnb: "+4544.0 BNB",
    avgRoi: "+375%",
    kdaRatio: "4.43",
    totalVolume: "$519.80M",
    bestCall: "$FOUR (+$210.0K)",
    topHolding: {
      name: "FOUR",
      ticker: "$FOUR",
      avatar: "4️⃣",
      kolBag: "$74.0K",
    },
  },
  {
    id: "rookiexbt",
    rank: 5,
    kolName: "RookieXBT",
    kolHandle: "@RookieXBT",
    kolAddress: "0xA5...c4cE",
    kolAvatar: "🐋",
    tierBadge: "Whale KOL",
    tierIcon: "🐋",
    category: "Whale KOLs",
    followers: "$410.0K followers",
    winRate: 78.5,
    wins: 110,
    losses: 30,
    pnl: "+$51.91M",
    pnlBnb: "+3900.0 BNB",
    avgRoi: "+290%",
    kdaRatio: "3.67",
    totalVolume: "$514.20M",
    bestCall: "$CZPEPE (+$195.0K)",
    topHolding: {
      name: "CZPEPE",
      ticker: "$CZPEPE",
      avatar: "🐸",
      kolBag: "$68.5K",
    },
  },
  {
    id: "cobie",
    rank: 6,
    kolName: "Cobie",
    kolHandle: "@coffeebreak_sol",
    kolAddress: "0x7E...c912",
    kolAvatar: "🦁",
    tierBadge: "OG Trader",
    tierIcon: "👑",
    category: "OG Traders",
    followers: "$890.0K followers",
    winRate: 78.0,
    wins: 85,
    losses: 24,
    pnl: "+$46.20M",
    pnlBnb: "+3420.0 BNB",
    avgRoi: "+310%",
    kdaRatio: "3.54",
    totalVolume: "$420.50M",
    bestCall: "$GCAT (+$280.0K)",
    topHolding: {
      name: "GCAT",
      ticker: "$GCAT",
      avatar: "💎",
      kolBag: "$92.0K",
    },
  },
  {
    id: "powcalls",
    rank: 7,
    kolName: "Pow Calls",
    kolHandle: "@PowCalls",
    kolAddress: "0x9D...2E14",
    kolAvatar: "🚀",
    tierBadge: "Alpha Caller",
    tierIcon: "⚡",
    category: "Alpha Callers",
    followers: "$240.0K followers",
    winRate: 75.5,
    wins: 68,
    losses: 22,
    pnl: "+$38.50M",
    pnlBnb: "+2840.0 BNB",
    avgRoi: "+260%",
    kdaRatio: "3.09",
    totalVolume: "$340.10M",
    bestCall: "$GIGAI (+$310.0K)",
    topHolding: {
      name: "GIGAI",
      ticker: "$GIGAI",
      avatar: "🗿",
      kolBag: "$45.0K",
    },
  },
  {
    id: "dingaling",
    rank: 8,
    kolName: "Dingaling",
    kolHandle: "@dingalingts",
    kolAddress: "0x2A...8C71",
    kolAvatar: "🦊",
    tierBadge: "Whale KOL",
    tierIcon: "🐋",
    category: "Whale KOLs",
    followers: "$195.0K followers",
    winRate: 74.0,
    wins: 54,
    losses: 19,
    pnl: "+$32.10M",
    pnlBnb: "+2390.0 BNB",
    avgRoi: "+220%",
    kdaRatio: "2.84",
    totalVolume: "$280.40M",
    bestCall: "$AURA (+$185.0K)",
    topHolding: {
      name: "AURA",
      ticker: "$AURA",
      avatar: "✨",
      kolBag: "$38.0K",
    },
  },
];

const MOCK_KOL_LEADERBOARD: KolLeaderboardItem[] = [
  {
    rank: 1,
    kolName: "Murad Mahmudov",
    kolHandle: "@MustStopMurad",
    kolAvatar: "🦁",
    tier: "Tier 1 Legend",
    winRate7d: 91.2,
    totalCalls: 48,
    avgMultiple: "+11.4x",
    bestCall: { ticker: "GIGAI", multiple: "+42.5x" },
    pnl30d: "+$1,420,000",
    followers: "420K",
  },
  {
    rank: 2,
    kolName: "Ansem",
    kolHandle: "@blknoiz06",
    kolAvatar: "🐯",
    tier: "Tier 1 Legend",
    winRate7d: 87.5,
    totalCalls: 64,
    avgMultiple: "+9.8x",
    bestCall: { ticker: "PCLON", multiple: "+38.0x" },
    pnl30d: "+$980,500",
    followers: "680K",
  },
  {
    rank: 3,
    kolName: "Pow",
    kolHandle: "@PowCalls",
    kolAvatar: "🚀",
    tier: "Tier 1 Legend",
    winRate7d: 85.0,
    totalCalls: 52,
    avgMultiple: "+8.2x",
    bestCall: { ticker: "DOGE2", multiple: "+24.3x" },
    pnl30d: "+$640,000",
    followers: "240K",
  },
  {
    rank: 4,
    kolName: "Dingaling",
    kolHandle: "@dingalingts",
    kolAvatar: "🦊",
    tier: "Alpha Whale",
    winRate7d: 82.4,
    totalCalls: 39,
    avgMultiple: "+7.6x",
    bestCall: { ticker: "AURA", multiple: "+19.2x" },
    pnl30d: "+$510,000",
    followers: "195K",
  },
  {
    rank: 5,
    kolName: "Crash",
    kolHandle: "@CrashTrading",
    kolAvatar: "⚡",
    tier: "Early Sniper",
    winRate7d: 79.1,
    totalCalls: 78,
    avgMultiple: "+6.9x",
    bestCall: { ticker: "QCAT", multiple: "+16.5x" },
    pnl30d: "+$425,000",
    followers: "310K",
  },
];

const MOCK_KOL_CONSENSUS: KolConsensusItem[] = [
  {
    id: "kc-1",
    tokenName: "PEPECLON",
    tokenTicker: "PCLON",
    tokenAvatar: "🐸",
    chain: "SOL",
    currentPrice: "$0.0069",
    marketCap: "$6.9M",
    bondingPercent: 92,
    kols: [
      { name: "Ansem", avatar: "🐯", handle: "@blknoiz06", time: "7m ago" },
      { name: "Murad", avatar: "🦁", handle: "@MustStopMurad", time: "18m ago" },
      { name: "Pow", avatar: "🚀", handle: "@PowCalls", time: "32m ago" },
      { name: "Crash", avatar: "⚡", handle: "@CrashTrading", time: "1h ago" },
      { name: "Dingaling", avatar: "🦊", handle: "@dingalingts", time: "2h ago" },
    ],
    totalBagUsd: "$182,500",
    signalStrength: "SUPER_BULLISH",
    change24h: 342.8,
  },
  {
    id: "kc-2",
    tokenName: "GIGA CHAD AI",
    tokenTicker: "GIGAI",
    tokenAvatar: "🗿",
    chain: "SOL",
    currentPrice: "$0.0084",
    marketCap: "$8.4M",
    bondingPercent: 100,
    kols: [
      { name: "Murad", avatar: "🦁", handle: "@MustStopMurad", time: "2m ago" },
      { name: "Pow", avatar: "🚀", handle: "@PowCalls", time: "34m ago" },
      { name: "Ansem", avatar: "🐯", handle: "@blknoiz06", time: "55m ago" },
      { name: "Crash", avatar: "⚡", handle: "@CrashTrading", time: "2h ago" },
    ],
    totalBagUsd: "$145,000",
    signalStrength: "SUPER_BULLISH",
    change24h: 184.2,
  },
  {
    id: "kc-3",
    tokenName: "AURA PROTOCOL",
    tokenTicker: "AURA",
    tokenAvatar: "✨",
    chain: "ETH",
    currentPrice: "$0.00185",
    marketCap: "$1.85M",
    bondingPercent: 78,
    kols: [
      { name: "Dingaling", avatar: "🦊", handle: "@dingalingts", time: "14m ago" },
      { name: "Machi", avatar: "👑", handle: "@machibigbrother", time: "1h ago" },
      { name: "Pow", avatar: "🚀", handle: "@PowCalls", time: "3h ago" },
    ],
    totalBagUsd: "$94,000",
    signalStrength: "HIGH_CONVICTION",
    change24h: 96.4,
  },
];

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

/* ── Chain Logos & Icons ─────────────────────────────────── */
export function ChainIconBNB({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="12" fill="#F3BA2F" />
      <path
        d="M12 4.5L14.475 6.975L8.55 12.9L6.075 10.425L12 4.5ZM17.925 10.425L19.5 12L12 19.5L9.525 17.025L17.925 10.425ZM12 8.4L15.6 12L12 15.6L8.4 12L12 8.4Z"
        fill="#000000"
      />
      <path
        d="M4.5 12L6.075 10.425L7.65 12L6.075 13.575L4.5 12ZM19.5 12L17.925 10.425L16.35 12L17.925 13.575L19.5 12Z"
        fill="#000000"
      />
    </svg>
  );
}

export function ChainIconSOL({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="12" fill="#14151a" />
      <path
        d="M5.5 17.5L8 15H18.5L16 17.5H5.5ZM5.5 12L8 9.5H18.5L16 12H5.5ZM8 6.5L5.5 4H16L18.5 6.5H8Z"
        fill="url(#sol_grad_meme)"
      />
      <defs>
        <linearGradient id="sol_grad_meme" x1="5.5" y1="4" x2="18.5" y2="17.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9945FF" />
          <stop offset="1" stopColor="#14F195" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function ChainIconETH({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="12" fill="#627EEA" />
      <path d="M12 3.5L6.5 12.5L12 16L17.5 12.5L12 3.5Z" fill="#FFFFFF" fillOpacity="0.7" />
      <path d="M12 3.5L12 16L17.5 12.5L12 3.5Z" fill="#FFFFFF" />
      <path d="M12 17.2L6.5 13.7L12 21.5L17.5 13.7L12 17.2Z" fill="#FFFFFF" fillOpacity="0.7" />
      <path d="M12 17.2L12 21.5L17.5 13.7L12 17.2Z" fill="#FFFFFF" />
    </svg>
  );
}

export function ChainIconBASE({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="12" fill="#0052FF" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5ZM12.75 8.5V15.5H11.25V8.5H12.75Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function renderChainLogo(chain?: string, size = 14) {
  const norm = (chain || "").toUpperCase();
  if (norm.includes("BNB") || norm.includes("BSC")) return <ChainIconBNB size={size} />;
  if (norm.includes("SOL")) return <ChainIconSOL size={size} />;
  if (norm.includes("ETH")) return <ChainIconETH size={size} />;
  if (norm.includes("BASE")) return <ChainIconBASE size={size} />;
  return <ChainIconBNB size={size} />;
}

const VIEW_TYPES = [
  { id: "grid", label: "Card Grid", icon: <LayoutGrid size={14} /> },
  { id: "matrix", label: "Bubble Map", icon: <CircleDot size={14} /> },
] as const;

const STATUS_FILTERS = [
  { id: "all", label: "All Tokens", icon: null },
  { id: "trending", label: "Trending", icon: <Flame size={12} /> },
  { id: "new", label: "New Launches", icon: <Zap size={12} /> },
  { id: "graduating", label: "KOL Bag", icon: <Sprout size={12} /> },
] as const;

const SORT_OPTIONS = ["Market Cap", "Trending Momentum", "24h Volume", "24h Change", "Bonding %", "KOL Count"];
const BUBBLE_SIZE_OPTIONS = ["KOLs Count", "KOL Bag USD", "Market Cap", "24h Volume", "24h Change"];

type ViewType = "grid" | "matrix";

function formatAge(minutes: number): string {
  if (minutes < 60) return `${minutes}m ago`;
  if (minutes < 1440) return `${Math.round(minutes / 60)}h ago`;
  return `${Math.round(minutes / 1440)}d ago`;
}

export default function MemeLaunchpadView() {
  /* ── Master Tabs State (Launchpad vs KOL Radar) ──────────── */
  const [masterTab, setMasterTab] = useState<"launchpad" | "kol-radar">("launchpad");
  const [kolSubTab, setKolSubTab] = useState<"signals" | "tokens" | "leaderboard" | "watchlist">("signals");
  const [kolChainSelected, setKolChainSelected] = useState<"BNB" | "SOL" | "ETH" | "BASE">("BNB");
  const [isFeedPaused, setIsFeedPaused] = useState<boolean>(false);
  const [isSoundAlerts, setIsSoundAlerts] = useState<boolean>(true);
  const [kolSearch, setKolSearch] = useState<string>("");
  const [followedKols, setFollowedKols] = useState<Record<string, boolean>>({
    "@blknoiz06": true,
    "@MustStopMurad": true,
  });
  const [favoritedTrending, setFavoritedTrending] = useState<Record<string, boolean>>({
    "kt-1": true,
  });

  const [view, setView] = useState<ViewType>("grid");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isMemeFilterSheetOpen, setIsMemeFilterSheetOpen] = useState<boolean>(false);
  const [isChainDropdownOpen, setIsChainDropdownOpen] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);
  const [sortOpen, setSortOpen] = useState(false);
  const [bubbleSizeBy, setBubbleSizeBy] = useState(BUBBLE_SIZE_OPTIONS[0]);
  const [tokens, setTokens] = useState<LaunchpadToken[]>(TOKENS);
  const [toast, setToast] = useState<string | null>(null);
  const [activeSnipe, setActiveSnipe] = useState<Record<string, string>>({});

  const filterDropdownRef = React.useRef<HTMLDivElement>(null);
  const chainDropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        setIsMemeFilterSheetOpen(false);
      }
      if (
        chainDropdownRef.current &&
        !chainDropdownRef.current.contains(event.target as Node)
      ) {
        setIsChainDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeFilterObj = STATUS_FILTERS.find((s) => s.id === activeFilter) || STATUS_FILTERS[0];

  /* Interactive Bubble Hover & Popups */
  const [hoveredToken, setHoveredToken] = useState<LaunchpadToken | null>(null);
  const [selectedBubbleToken, setSelectedBubbleToken] = useState<LaunchpadToken | null>(null);
  const [tradingTerminalToken, setTradingTerminalToken] = useState<LaunchpadToken | null>(null);
  const [tradingTerminalAmount, setTradingTerminalAmount] = useState<string | undefined>(undefined);
  const [activeKolProfile, setActiveKolProfile] = useState<any | null>(null);

  /* Leaderboard States */
  const [leaderboardTimeframe, setLeaderboardTimeframe] = useState<"24H" | "7D" | "30D" | "All-Time">("7D");
  const [leaderboardCategory, setLeaderboardCategory] = useState<string>("All Callers");
  const [leaderboardSearch, setLeaderboardSearch] = useState<string>("");
  const [leaderboardPage, setLeaderboardPage] = useState<number>(1);

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

  const toggleFavoriteTrending = (id: string) => {
    setFavoritedTrending((prev) => {
      const next = !prev[id];
      showToast(next ? "Added token to KOL Watchlist" : "Removed token from KOL Watchlist");
      return { ...prev, [id]: next };
    });
  };

  const toggleFollowKol = (handle: string) => {
    setFollowedKols((prev) => {
      const next = !prev[handle];
      showToast(next ? `Started tracking alerts for ${handle}` : `Stopped tracking alerts for ${handle}`);
      return { ...prev, [handle]: next };
    });
  };

  const handleSnipe = (tokenId: string, amount: string) => {
    setActiveSnipe((prev) => ({ ...prev, [tokenId]: amount }));
  };

  const handleBuy = (token: LaunchpadToken) => {
    const amt = activeSnipe[token.id] || (token.chain === "SOL" ? "0.5" : "0.1");
    openTerminalForToken(token, amt);
  };

  const openTerminalForToken = (tokenObj: any, customAmount?: string) => {
    if (!tokenObj) return;
    if (customAmount) {
      setTradingTerminalAmount(customAmount);
    }
    const cleanTicker = (tokenObj.ticker || "").replace("$", "").toLowerCase();
    const existing = tokens.find(
      (t) => t.id === tokenObj.id || t.ticker.replace("$", "").toLowerCase() === cleanTicker
    );
    if (existing) {
      setTradingTerminalToken(existing);
      return;
    }

    const syntheticToken: LaunchpadToken = {
      id: tokenObj.id || cleanTicker || "token-terminal",
      rank: 1,
      name: tokenObj.name || tokenObj.ticker || "Meme Token",
      ticker: tokenObj.ticker?.startsWith("$") ? tokenObj.ticker : `$${tokenObj.ticker || "TOKEN"}`,
      avatarEmoji: tokenObj.avatar || tokenObj.avatarEmoji || "💎",
      avatarImg: tokenObj.avatarImg,
      chain: (tokenObj.chain as "BNB" | "SOL" | "ETH") || (kolChainSelected === "SOL" ? "SOL" : "BNB"),
      ageMinutes: tokenObj.ageMinutes || 120,
      devHandle: tokenObj.devHandle || "@alpha_deployer",
      isVerified: true,
      isFavorited: false,
      price: tokenObj.price || "$0.00582",
      priceNum: parseFloat(String(tokenObj.price || "0.00582").replace(/[^0-9.]/g, "")) || 0.00582,
      change24h: typeof tokenObj.change24h === "number" ? tokenObj.change24h : parseFloat(String(tokenObj.change24h || "142.5").replace(/[^0-9.-]/g, "")) || 142.5,
      marketCap: tokenObj.marketCap || "$5.82M",
      volume24h: tokenObj.volume24h || "$2.4M",
      liquidity: tokenObj.liquidity || "$740K",
      holders: tokenObj.holders || 3840,
      bondingPercent: tokenObj.bondingPercent || 88,
      isGraduatingSoon: false,
      kolsHolding: tokenObj.kolsHolding || tokenObj.kolBuyCount || 8,
      kolAvatars: ["🧔", "⚡", "🧢", "🛡️"],
      totalKolBag: tokenObj.totalKolBag || tokenObj.netKolFlow || "$142.5K",
      topTenPct: tokenObj.topTenPct || "18.4%",
      i5Score: tokenObj.i5Score || 94,
      badge: "HIGH KOL BAG",
      status: "trending",
      description: tokenObj.description || `${tokenObj.name || tokenObj.ticker} live trading terminal with real-time on-chain order flow and charts.`,
      bubbleSize: 45,
      bubbleX: 50,
      bubbleY: 50,
      smartMoneyCount: tokenObj.kolBuyCount || 8,
      smartMoneyLabel: "HIGH INFLOW",
      kolBullishCount: 6,
      whaleInflow: tokenObj.netKolFlow || "$142.5K",
      socialVelocity: "HIGH",
      convictionScore: 92,
      convictionTier: "TIER 1 ALPHA",
    };

    setTradingTerminalToken(syntheticToken);
  };

  const openKolProfile = (kolOrTrade: any) => {
    if (!kolOrTrade) return;
    if (kolOrTrade.winRate !== undefined && kolOrTrade.kolName) {
      setActiveKolProfile(kolOrTrade);
      return;
    }
    const handle = (kolOrTrade.kolHandle || "").toLowerCase();
    const name = (kolOrTrade.kolName || "").toLowerCase();
    const found = MOCK_KOL_LEADERBOARD_ENTRIES.find(
      (k) =>
        (handle && k.kolHandle.toLowerCase() === handle) ||
        (name && k.kolName.toLowerCase().includes(name))
    );
    if (found) {
      setActiveKolProfile(found);
      return;
    }

    setActiveKolProfile({
      id: kolOrTrade.id || handle || name || "kol-profile",
      kolName: kolOrTrade.kolName || "Degen Spartan",
      kolHandle: kolOrTrade.kolHandle || "@DegenSpartan",
      kolAddress: kolOrTrade.kolAddress || "0x0000...00dEaD",
      kolAvatar: kolOrTrade.kolAvatar || "🛡️",
      tierBadge: kolOrTrade.tierBadge || "OG Trader",
      followers: kolOrTrade.followers || "395.0K followers",
      winRate: kolOrTrade.winRate ?? 82.0,
      wins: kolOrTrade.wins ?? 95,
      losses: kolOrTrade.losses ?? 21,
      pnl: kolOrTrade.pnl || "+$2.65M",
      avgRoi: kolOrTrade.avgRoi || "+375%",
      totalVolume: kolOrTrade.totalVolume || "$19.80M",
      portfolioValue: "$890.0K",
      portfolioNative: "110.0 BNB",
    });
  };

  const filteredTrendingTokens = useMemo(() => {
    return MOCK_KOL_TRENDING.filter((t) => {
      if (kolChainSelected !== "BNB" && t.chain !== kolChainSelected) {
        if (t.chain !== kolChainSelected) return false;
      }
      if (kolSearch.trim()) {
        const q = kolSearch.toLowerCase();
        return (
          t.name.toLowerCase().includes(q) ||
          t.ticker.toLowerCase().includes(q) ||
          t.contractAddress.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [kolChainSelected, kolSearch]);

  const filteredActivityTrades = useMemo(() => {
    return MOCK_KOL_ACTIVITY.filter((a) => {
      if (kolChainSelected !== "BNB" && a.chain !== kolChainSelected) {
        if (a.chain !== kolChainSelected) return false;
      }
      if (kolSubTab === "watchlist") {
        if (!followedKols[a.kolHandle]) return false;
      }
      if (kolSearch.trim()) {
        const q = kolSearch.toLowerCase();
        return (
          a.kolName.toLowerCase().includes(q) ||
          a.kolHandle.toLowerCase().includes(q) ||
          a.tokenName.toLowerCase().includes(q) ||
          a.tokenTicker.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [kolChainSelected, kolSubTab, followedKols, kolSearch]);

  const filteredKolLeaderboard = useMemo(() => {
    return MOCK_KOL_LEADERBOARD.filter((k) => {
      if (kolSearch.trim()) {
        const q = kolSearch.toLowerCase();
        return k.kolName.toLowerCase().includes(q) || k.kolHandle.toLowerCase().includes(q);
      }
      return true;
    });
  }, [kolSearch]);

  const filteredKolConsensus = useMemo(() => {
    return MOCK_KOL_CONSENSUS.filter((c) => {
      if (kolChainSelected !== "BNB" && c.chain !== kolChainSelected) return false;
      if (kolSearch.trim()) {
        const q = kolSearch.toLowerCase();
        return (
          c.tokenName.toLowerCase().includes(q) ||
          c.tokenTicker.toLowerCase().includes(q) ||
          c.kols.some((k) => k.name.toLowerCase().includes(q) || k.handle.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [kolChainSelected, kolSearch]);

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

  const filteredLeaderboardEntries = useMemo(() => {
    return MOCK_KOL_LEADERBOARD_ENTRIES.filter((k) => {
      const matchesCat =
        leaderboardCategory === "All Callers" ||
        k.category === leaderboardCategory ||
        k.tierBadge.toLowerCase().includes(leaderboardCategory.toLowerCase());
      const matchesSearch =
        !leaderboardSearch.trim() ||
        k.kolName.toLowerCase().includes(leaderboardSearch.toLowerCase()) ||
        k.kolHandle.toLowerCase().includes(leaderboardSearch.toLowerCase()) ||
        k.kolAddress.toLowerCase().includes(leaderboardSearch.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [leaderboardCategory, leaderboardSearch]);

  const renderLeaderboardSection = () => (
    <div className={styles.leaderboardSectionWrapper}>
      {/* 1. Header Bar */}
      <div className={styles.lbHeaderRow}>
        <div className={styles.lbHeaderLeft}>
          <div className={styles.lbBadgeRow}>
            <span className={styles.lbSmartBadge}>
              <Sparkles size={11} />
              Smart Money & Alpha Radar
            </span>
          </div>
          <div className={styles.lbTitleRow}>
            <h2 className={styles.lbMainTitle}>KOL Leaderboard</h2>
          </div>
          <p className={styles.lbSubtitle}>
            Track top verified meme traders, profitable alpha callers, and their live accumulations in real time.
          </p>
        </div>

        {/* Header Controls: Timeframe Pills & Sort Dropdown */}
        <div className={styles.lbHeaderRight}>
          <div className={styles.lbTimeframeGroup}>
            {(["24H", "7D", "30D", "All-Time"] as const).map((tf) => (
              <button
                key={tf}
                type="button"
                className={`${styles.lbTfBtn} ${leaderboardTimeframe === tf ? styles.lbTfBtnActive : ""}`}
                onClick={() => {
                  setLeaderboardTimeframe(tf);
                  showToast(`Leaderboard filtered to ${tf}`);
                }}
              >
                {tf}
              </button>
            ))}
          </div>

          <div className={styles.lbSortPill} onClick={() => showToast("Sorting by Realized PnL")}>
            <span className={styles.lbSortLabel}>Sort:</span>
            <span className={styles.lbSortValue}>Realized PnL ▾</span>
          </div>
        </div>
      </div>

      {/* 2. Subfilter Tabs & Search Bar */}
      <div className={styles.lbFilterControlsBar}>
        <div className={styles.lbCategoryGroup}>
          {[
            { id: "All Callers", label: "All Callers" },
            { id: "Tier 1 KOLs", label: "Tier 1 KOLs" },
            { id: "Alpha Callers", label: "Alpha Callers" },
            { id: "Whale KOLs", label: "Whale KOLs" },
            { id: "OG Traders", label: "OG Traders" },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`${styles.lbCategoryBtn} ${leaderboardCategory === cat.id ? styles.lbCategoryBtnActive : ""}`}
              onClick={() => {
                setLeaderboardCategory(cat.id);
                showToast(`Showing ${cat.label}`);
              }}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        <div className={styles.lbSearchBox}>
          <Search size={13} className={styles.lbSearchIcon} />
          <input
            type="text"
            placeholder="Search KOL name, handle, address..."
            value={leaderboardSearch}
            onChange={(e) => setLeaderboardSearch(e.target.value)}
            className={styles.lbSearchInput}
          />
        </div>
      </div>

      {/* 3. Top 4 Featured Leaderboard Cards */}
      <div className={styles.lbTop5Grid}>
        {filteredLeaderboardEntries.slice(0, 4).map((kol, idx) => {
          const cardThemes = [
            {
              theme: "blue",
              iconClass: styles.metricIconBlue,
              barClass: styles.barBlue,
              rankBadgeClass: styles.rankBadgeBlue,
              borderGlowClass: styles.cardGlowBlue,
              bars: ["45%", "70%", "95%", "40%", "85%", "60%", "90%"],
              label: "Tier 1 Ecosystem Alpha",
            },
            {
              theme: "purple",
              iconClass: styles.metricIconPurple,
              barClass: styles.barPurple,
              rankBadgeClass: styles.rankBadgePurple,
              borderGlowClass: styles.cardGlowPurple,
              bars: ["35%", "75%", "50%", "90%", "65%", "85%", "95%"],
              label: "Verified Smart Money",
            },
            {
              theme: "orange",
              iconClass: styles.metricIconOrange,
              barClass: styles.barOrange,
              rankBadgeClass: styles.rankBadgeOrange,
              borderGlowClass: styles.cardGlowOrange,
              bars: ["60%", "45%", "75%", "85%", "100%", "70%", "90%"],
              label: "High Momentum Caller",
            },
            {
              theme: "red",
              iconClass: styles.metricIconRed,
              barClass: styles.barRed,
              rankBadgeClass: styles.rankBadgeRed,
              borderGlowClass: styles.cardGlowRed,
              bars: ["55%", "35%", "65%", "80%", "95%", "100%", "85%"],
              label: "OG High Conviction",
            },
            {
              theme: "emerald",
              iconClass: styles.metricIconEmerald,
              barClass: styles.barEmerald,
              rankBadgeClass: styles.rankBadgeEmerald,
              borderGlowClass: styles.cardGlowEmerald,
              bars: ["50%", "65%", "45%", "85%", "70%", "90%", "100%"],
              label: "Whale On-Chain Accumulator",
            },
          ];

          const cfg = cardThemes[idx] || cardThemes[0];

          return (
            <div
              key={kol.id}
              className={`${styles.metricCard} ${cfg.borderGlowClass}`}
              onClick={() => openKolProfile(kol)}
              style={{ cursor: "pointer" }}
              title={`View ${kol.kolName} Profile`}
            >
              {/* Header: Rank, Avatar, Name & Follow */}
              <div className={styles.metricCardHeader}>
                <div className={styles.metricTitleGroup}>
                  <span className={`${styles.top5RankPill} ${cfg.rankBadgeClass}`}>#{kol.rank}</span>
                  <div className={styles.top5Avatar}>{kol.kolAvatar}</div>
                  <div className={styles.top5NameMeta}>
                    <div className={styles.top5NameRow}>
                      <span className={styles.top5NameText}>{kol.kolName}</span>
                      <Check size={11} className={styles.refCheckIcon} strokeWidth={3} />
                    </div>
                    <span className={styles.tableTierPill}>{kol.tierBadge}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className={styles.metricMoreBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFollowKol(kol.kolHandle);
                  }}
                  title={followedKols[kol.kolHandle] ? "Unfollow KOL" : "Follow KOL"}
                >
                  <Star
                    size={14}
                    fill={followedKols[kol.kolHandle] ? "#fbbf24" : "none"}
                    color={followedKols[kol.kolHandle] ? "#fbbf24" : "currentColor"}
                  />
                </button>
              </div>

              {/* Inset Well: Realized PnL & Win Rate */}
              <div className={styles.metricInnerWell}>
                <div className={styles.metricValueGroup}>
                  <span className={styles.metricBigVal}>{kol.pnl}</span>
                  <span className={styles.metricValUnit}>{kol.winRate}% WR</span>
                </div>
              </div>

              {/* Middle Mini Stat Row Removed */}

              {/* Footer: Avg ROI Delta + Copy Buy CTA Button */}
              <div className={styles.metricCardFooter}>
                <div className={styles.metricDeltaGreen}>
                  <span className={styles.deltaArrow}>▲</span>
                  <span>{kol.avgRoi} ROI</span>
                </div>
                <button
                  type="button"
                  className={styles.top5CopyBuyBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    openTerminalForToken(kol.topHolding);
                  }}
                  title="Quick Copy Buy"
                >
                  <Zap size={10} />
                  <span>Copy Buy</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Comprehensive On-Chain Table (Exact Columns & Token Colors) */}
      <div className={styles.lbTableContainer}>
        <table className={styles.lbTable}>
          <thead>
            <tr className={styles.lbTableHeadRow}>
              <th className={styles.lbThCaller}>RANK & CALLER</th>
              <th className={styles.lbThWinRate}>WIN RATE</th>
              <th className={styles.lbThPnl}>REALIZED PNL</th>
              <th className={styles.lbThRoi}>AVG ROI</th>
              <th className={styles.lbThVol}>TOTAL VOLUME</th>
              <th className={styles.lbThHolding}>TOP ALPHA HOLDINGS</th>
              <th className={styles.lbThActions}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaderboardEntries.slice((leaderboardPage - 1) * 6, leaderboardPage * 6).map((kol) => {
              const rankPillClass =
                kol.rank === 1
                  ? styles.rankPillGold
                  : kol.rank === 2
                    ? styles.rankPillSilver
                    : kol.rank === 3
                      ? styles.rankPillBronze
                      : styles.rankPillNormal;

              return (
                <tr key={kol.id} className={styles.lbTableRow}>
                  {/* Rank & Caller */}
                  <td className={styles.lbTdCaller}>
                    <div
                      className={styles.tableCallerCell}
                      onClick={() => openKolProfile(kol)}
                      style={{ cursor: "pointer" }}
                      title={`View ${kol.kolName} Profile`}
                    >
                      <span className={`${styles.tableRankCircle} ${rankPillClass}`}>{kol.rank}</span>
                      <div className={styles.tableAvatar}>{kol.kolAvatar}</div>
                      <div className={styles.tableCallerMeta}>
                        <div className={styles.tableNameRow}>
                          <span className={styles.tableNameText}>{kol.kolName}</span>
                          <Check size={12} className={styles.tableCheckIcon} strokeWidth={3} />
                          <span className={styles.tableTierPill}>{kol.tierBadge}</span>
                        </div>
                        <div className={styles.tableSubMetaRow}>
                          <span className={styles.tableHandleText}>{kol.kolHandle}</span>
                          <span className={styles.tableAddressText}>{kol.kolAddress}</span>
                          <span className={styles.tableFollowersText}>• {kol.followers}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Win Rate */}
                  <td className={styles.lbTdWinRate}>
                    <div className={styles.tableWinRateCell}>
                      <span className={styles.tableWinRatePct}>{kol.winRate}%</span>
                      <div className={styles.tableWinRateTrack}>
                        <div className={styles.tableWinRateFill} style={{ width: `${kol.winRate}%` }} />
                      </div>
                      <span className={styles.tableWinLossCount}>
                        {kol.wins}W / {kol.losses}L
                      </span>
                    </div>
                  </td>

                  {/* Realized PnL */}
                  <td className={styles.lbTdPnl}>
                    <div className={styles.tablePnlCell}>
                      <span className={styles.tablePnlVal}>{kol.pnl}</span>
                      <span className={styles.tablePnlBnbVal}>{kol.pnlBnb}</span>
                    </div>
                  </td>

                  {/* Avg ROI */}
                  <td className={styles.lbTdRoi}>
                    <span className={styles.tableRoiBadge}>↗ {kol.avgRoi}</span>
                  </td>

                  {/* Total Volume */}
                  <td className={styles.lbTdVol}>
                    <span className={styles.tableVolumeVal}>{kol.totalVolume}</span>
                  </td>

                  {/* Top Alpha Holdings */}
                  <td className={styles.lbTdHolding}>
                    <div
                      className={styles.tableHoldingCell}
                      onClick={() => openTerminalForToken(kol.topHolding)}
                      style={{ cursor: "pointer" }}
                      title="Open in Terminal"
                    >
                      <span className={styles.tableHoldingAvatar}>{kol.topHolding.avatar}</span>
                      <span className={styles.tableHoldingTicker}>{kol.topHolding.ticker}</span>
                      <button
                        type="button"
                        className={styles.tableSnipeBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          openTerminalForToken(kol.topHolding);
                        }}
                      >
                        <Zap size={11} />
                        <span>Snipe</span>
                      </button>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className={styles.lbTdActions}>
                    <div className={styles.tableActionsCell}>
                      <button
                        type="button"
                        className={styles.tableProfileBtn}
                        onClick={() => openKolProfile(kol)}
                      >
                        <span>Profile</span>
                        <ChevronDown size={12} style={{ transform: "rotate(-90deg)" }} />
                      </button>
                      <button
                        type="button"
                        className={`${styles.tableStarBtn} ${followedKols[kol.id] ? styles.tableStarBtnActive : ""}`}
                        onClick={() => toggleFollowKol(kol.id)}
                        title="Add to Watchlist"
                      >
                        <Star size={13} fill={followedKols[kol.id] ? "currentColor" : "none"} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 5. Pagination Bar (Exact Reference Style) */}
      <div className={styles.lbPaginationBar}>
        <button
          type="button"
          className={`${styles.lbPageNavBtn} ${leaderboardPage === 1 ? styles.lbPageNavBtnDisabled : ""}`}
          onClick={() => setLeaderboardPage((p) => Math.max(1, p - 1))}
          disabled={leaderboardPage === 1}
        >
          <ChevronLeft size={14} />
          <span>Previous</span>
        </button>

        <div className={styles.lbPageNumbers}>
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              type="button"
              className={`${styles.lbPageNumBtn} ${leaderboardPage === page ? styles.lbPageNumBtnActive : ""}`}
              onClick={() => setLeaderboardPage(page)}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          type="button"
          className={`${styles.lbPageNavBtn} ${leaderboardPage === 4 ? styles.lbPageNavBtnDisabled : ""}`}
          onClick={() => setLeaderboardPage((p) => Math.min(4, p + 1))}
          disabled={leaderboardPage === 4}
        >
          <span>Next</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>

      {/* ── MASTER TABS (LAUNCHPAD vs KOL RADAR) ────────────────── */}
      <div className={styles.masterTabsWrapper}>
        <div className={styles.masterTabsBar}>
          <button
            type="button"
            className={`${styles.masterTabBtn} ${masterTab === "launchpad" ? styles.masterTabBtnActive : ""}`}
            onClick={() => setMasterTab("launchpad")}
          >
            <span>Meme Radar</span>
          </button>

          <button
            type="button"
            className={`${styles.masterTabBtn} ${masterTab === "kol-radar" ? styles.masterTabBtnActive : ""}`}
            onClick={() => setMasterTab("kol-radar")}
          >
            <span>KOL Radar</span>
          </button>
        </div>


      </div>

      {masterTab === "launchpad" ? (
        <>
          {/* ── TOP METRIC STATS CARDS (IMAGE 1 LAYOUT STYLE) ─────── */}
          <div className={styles.metricsGrid}>
            {/* Card 1: 24H Meme Volume */}
            <div className={styles.metricCard}>
              <div className={styles.metricCardHeader}>
                <div className={styles.metricTitleGroup}>
                  <Sparkles size={15} className={styles.metricIconBlue} />
                  <span className={styles.metricTitle}>24H Meme Volume</span>
                </div>
                <button className={styles.metricMoreBtn} aria-label="More options">
                  <MoreHorizontal size={16} />
                </button>
              </div>

              <div className={styles.metricInnerWell}>
                <div className={styles.metricValueGroup}>
                  <span className={styles.metricBigVal}>$14.2</span>
                  <span className={styles.metricValUnit}>M</span>
                </div>
                <div className={styles.miniBarChart} aria-hidden="true">
                  <span className={`${styles.chartBar} ${styles.barBlue}`} style={{ height: "45%" }} />
                  <span className={`${styles.chartBar} ${styles.barBlue}`} style={{ height: "30%" }} />
                  <span className={`${styles.chartBar} ${styles.barBlue}`} style={{ height: "95%" }} />
                  <span className={`${styles.chartBar} ${styles.barBlue}`} style={{ height: "25%" }} />
                  <span className={`${styles.chartBar} ${styles.barBlue}`} style={{ height: "75%" }} />
                  <span className={`${styles.chartBar} ${styles.barBlue}`} style={{ height: "60%" }} />
                  <span className={`${styles.chartBar} ${styles.barBlue}`} style={{ height: "85%" }} />
                </div>
              </div>

              <div className={styles.metricCardFooter}>
                <span className={styles.metricFooterLabel}>Volume Increased by</span>
                <div className={styles.metricDeltaGreen}>
                  <span className={styles.deltaArrow}>▲</span>
                  <span>+28.4% vs yesterday</span>
                </div>
              </div>
            </div>

            {/* Card 2: Active Tokens */}
            <div className={styles.metricCard}>
              <div className={styles.metricCardHeader}>
                <div className={styles.metricTitleGroup}>
                  <Flame size={15} className={styles.metricIconPurple} />
                  <span className={styles.metricTitle}>Active Tokens</span>
                </div>
                <button className={styles.metricMoreBtn} aria-label="More options">
                  <MoreHorizontal size={16} />
                </button>
              </div>

              <div className={styles.metricInnerWell}>
                <div className={styles.metricValueGroup}>
                  <span className={styles.metricBigVal}>42</span>
                  <span className={styles.metricValUnit}>Tokens</span>
                </div>
                <div className={styles.miniBarChart} aria-hidden="true">
                  <span className={`${styles.chartBar} ${styles.barPurple}`} style={{ height: "35%" }} />
                  <span className={`${styles.chartBar} ${styles.barPurple}`} style={{ height: "70%" }} />
                  <span className={`${styles.chartBar} ${styles.barPurple}`} style={{ height: "45%" }} />
                  <span className={`${styles.chartBar} ${styles.barPurple}`} style={{ height: "90%" }} />
                  <span className={`${styles.chartBar} ${styles.barPurple}`} style={{ height: "65%" }} />
                  <span className={`${styles.chartBar} ${styles.barPurple}`} style={{ height: "85%" }} />
                  <span className={`${styles.chartBar} ${styles.barPurple}`} style={{ height: "60%" }} />
                </div>
              </div>

              <div className={styles.metricCardFooter}>
                <span className={styles.metricFooterLabel}>Tokens Increased by</span>
                <div className={styles.metricDeltaGreen}>
                  <span className={styles.deltaArrow}>▲</span>
                  <span>+8 today</span>
                </div>
              </div>
            </div>

            {/* Card 3: KOL Bag */}
            <div className={styles.metricCard}>
              <div className={styles.metricCardHeader}>
                <div className={styles.metricTitleGroup}>
                  <Zap size={15} className={styles.metricIconOrange} />
                  <span className={styles.metricTitle}>KOL Bag</span>
                </div>
                <button className={styles.metricMoreBtn} aria-label="More options">
                  <MoreHorizontal size={16} />
                </button>
              </div>

              <div className={styles.metricInnerWell}>
                <div className={styles.metricValueGroup}>
                  <span className={styles.metricBigVal}>$2.48M</span>
                  <span className={styles.metricValUnit}>Tracked</span>
                </div>
                <div className={styles.miniBarChart} aria-hidden="true">
                  <span className={`${styles.chartBar} ${styles.barOrange}`} style={{ height: "65%" }} />
                  <span className={`${styles.chartBar} ${styles.barOrange}`} style={{ height: "40%" }} />
                  <span className={`${styles.chartBar} ${styles.barOrange}`} style={{ height: "70%" }} />
                  <span className={`${styles.chartBar} ${styles.barOrange}`} style={{ height: "85%" }} />
                  <span className={`${styles.chartBar} ${styles.barOrange}`} style={{ height: "100%" }} />
                  <span className={`${styles.chartBar} ${styles.barOrange}`} style={{ height: "75%" }} />
                  <span className={`${styles.chartBar} ${styles.barOrange}`} style={{ height: "90%" }} />
                </div>
              </div>

              <div className={styles.metricCardFooter}>
                <span className={styles.metricFooterLabel}>KOL Bag Increased by</span>
                <div className={styles.metricDeltaGreen}>
                  <span className={styles.deltaArrow}>▲</span>
                  <span>+18.4% this week</span>
                </div>
              </div>
            </div>

            {/* Card 4: KOL Smart Wallets */}
            <div className={styles.metricCard}>
              <div className={styles.metricCardHeader}>
                <div className={styles.metricTitleGroup}>
                  <ShieldCheck size={15} className={styles.metricIconRed} />
                  <span className={styles.metricTitle}>KOL Smart Wallets</span>
                </div>
                <button className={styles.metricMoreBtn} aria-label="More options">
                  <MoreHorizontal size={16} />
                </button>
              </div>

              <div className={styles.metricInnerWell}>
                <div className={styles.metricValueGroup}>
                  <span className={styles.metricBigVal}>1,420</span>
                  <span className={styles.metricValUnit}>wallets</span>
                </div>
                <div className={styles.miniBarChart} aria-hidden="true">
                  <span className={`${styles.chartBar} ${styles.barRed}`} style={{ height: "55%" }} />
                  <span className={`${styles.chartBar} ${styles.barRed}`} style={{ height: "35%" }} />
                  <span className={`${styles.chartBar} ${styles.barRed}`} style={{ height: "60%" }} />
                  <span className={`${styles.chartBar} ${styles.barRed}`} style={{ height: "75%" }} />
                  <span className={`${styles.chartBar} ${styles.barRed}`} style={{ height: "90%" }} />
                  <span className={`${styles.chartBar} ${styles.barRed}`} style={{ height: "100%" }} />
                  <span className={`${styles.chartBar} ${styles.barRed}`} style={{ height: "80%" }} />
                </div>
              </div>

              <div className={styles.metricCardFooter}>
                <span className={styles.metricFooterLabel}>Wallets Increased by</span>
                <div className={styles.metricDeltaGreen}>
                  <span className={styles.deltaArrow}>▲</span>
                  <span>+12 today</span>
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

            {/* Search & Unified Filter Control */}
            <div className={styles.searchSortGroup}>
              {/* Chain Dropdown Filter */}
              <div className={styles.chainDropdownWrapper} ref={chainDropdownRef}>
                <button
                  type="button"
                  className={`${styles.chainDropdownBtn} ${isChainDropdownOpen ? styles.chainDropdownBtnActive : ""}`}
                  onClick={() => setIsChainDropdownOpen((prev) => !prev)}
                  aria-label="Filter by Blockchain"
                >
                  {renderChainLogo(chainFilter === "all" ? "BNB" : chainFilter, 14)}
                  <span>
                    {chainFilter === "all"
                      ? "All Chains"
                      : chainFilter.toUpperCase() + " Chain"}
                  </span>
                  <ChevronDown
                    size={11}
                    className={`${styles.filterChevron} ${isChainDropdownOpen ? styles.filterChevronOpen : ""}`}
                  />
                </button>

                {isChainDropdownOpen && (
                  <div className={styles.chainDropdownMenu}>
                    {[
                      { id: "all", label: "All Chains" },
                      { id: "bnb", label: "BNB Chain", chain: "BNB" },
                      { id: "sol", label: "Solana", chain: "SOL" },
                      { id: "eth", label: "Ethereum", chain: "ETH" },
                      { id: "base", label: "Base", chain: "BASE" },
                    ].map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        className={`${styles.chainMenuItem} ${
                          chainFilter === c.id ? styles.chainMenuItemActive : ""
                        }`}
                        onClick={() => {
                          setChainFilter(c.id);
                          setIsChainDropdownOpen(false);
                          showToast(`Chain filtered: ${c.label}`);
                        }}
                      >
                        {c.id !== "all" && renderChainLogo(c.chain, 14)}
                        <span>{c.label}</span>
                        {chainFilter === c.id && (
                          <Check size={12} strokeWidth={2.5} style={{ marginLeft: "auto", color: "var(--emerald-500)" }} />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

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

              {/* Single Unified Filter Control (Status + Sort + Network with Titled Tabs) */}
              <div className={styles.filterDropdownWrapper} ref={filterDropdownRef}>
                <button
                  type="button"
                  className={`${styles.unifiedFilterBtn} ${isMemeFilterSheetOpen ? styles.unifiedFilterBtnActive : ""}`}
                  onClick={() => setIsMemeFilterSheetOpen((prev) => !prev)}
                  aria-label="Open token filters and sorting"
                >
                  <Filter size={13} />
                  <span className={styles.filterBtnLabel}>Filter</span>
                  <span className={styles.filterBtnDetails}>
                    <span className={styles.filterStatusTag}>{activeFilterObj.label}</span>
                    <span className={styles.filterDivider}>•</span>
                    <span className={styles.filterSortTag}>{sortBy}</span>
                  </span>
                  <ChevronDown
                    size={11}
                    className={`${styles.filterChevron} ${isMemeFilterSheetOpen ? styles.filterChevronOpen : ""}`}
                  />
                </button>

                {/* Unified Filter & Sort Dropdown Menu */}
                {isMemeFilterSheetOpen && (
                  <div className={styles.filterDropdownMenu}>
                    {/* Section 1: STATUS & CATEGORY Tabs */}
                    <div className={styles.dropdownSection}>
                      <span className={styles.dropdownSectionTitle}>STATUS & CATEGORY</span>
                      <div className={styles.dropdownTabsGrid}>
                        {STATUS_FILTERS.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            className={`${styles.dropdownTabBtn} ${activeFilter === s.id ? styles.dropdownTabBtnActive : ""
                              }`}
                            onClick={() => {
                              setActiveFilter(s.id);
                              showToast(`Status: ${s.label}`);
                            }}
                          >
                            {s.icon}
                            <span>{s.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className={styles.dropdownDivider} />

                    {/* Section 2: SORT BY List */}
                    <div className={styles.dropdownSection}>
                      <span className={styles.dropdownSectionTitle}>SORT BY</span>
                      <div className={styles.dropdownSortList}>
                        {SORT_OPTIONS.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            className={`${styles.dropdownSortItem} ${sortBy === opt ? styles.dropdownSortItemActive : ""
                              }`}
                            onClick={() => {
                              setSortBy(opt);
                              setIsMemeFilterSheetOpen(false);
                              showToast(`Sorted by ${opt}`);
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                              <TrendingUp size={11} />
                              <span>{opt}</span>
                            </div>
                            {sortBy === opt && <Check size={12} className={styles.dropdownSortCheck} strokeWidth={2.5} />}
                          </button>
                        ))}
                      </div>
                    </div>
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
                    {filtered.map((token, index) => {
                      const isGain = token.change24h >= 0;
                      const isSelected = selectedBubbleToken?.id === token.id;
                      const size = token.bubbleSize;
                      const floatClass = [styles.floatA, styles.floatB, styles.floatC][index % 3];
                      const logoSize = Math.max(16, Math.min(28, size * 0.22));
                      const symbolFontSize = Math.max(10, Math.min(16, size * 0.16));
                      const changeFontSize = Math.max(9, Math.min(13, size * 0.13));

                      return (
                        <div
                          key={token.id}
                          className={`${styles.bubbleWrap} ${floatClass}`}
                          style={{
                            left: `${token.bubbleX}%`,
                            top: `${token.bubbleY}%`,
                            width: size,
                            height: size,
                          }}
                          onMouseEnter={() => setHoveredToken(token)}
                          onMouseLeave={() => setHoveredToken(null)}
                          onClick={() => setSelectedBubbleToken(token)}
                          onDoubleClick={() => setTradingTerminalToken(token)}
                        >
                          {/* Main 3D Glossy Sphere (Identical to Crypto Bubble Map) */}
                          <div
                            className={`${styles.bubble} ${isGain ? styles.bubbleGreen : styles.bubbleRed} ${isSelected ? styles.bubbleSelected : ""}`}
                            style={{
                              width: size,
                              height: size,
                            }}
                          >
                            {/* Avatar / Logo */}
                            <div className={styles.bubbleLogo} style={{ width: logoSize, height: logoSize }}>
                              {token.avatarImg ? (
                                <img
                                  src={token.avatarImg}
                                  alt={token.name}
                                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                  onError={(e) => { (e.target as HTMLElement).style.display = "none"; }}
                                />
                              ) : (
                                <span>{token.avatarEmoji || "💎"}</span>
                              )}
                            </div>

                            {/* Symbol / Ticker */}
                            <span className={styles.bubbleSymbol} style={{ fontSize: symbolFontSize }}>
                              {token.ticker}
                            </span>

                            {/* 24h Change */}
                            <span className={styles.bubbleChange} style={{ fontSize: changeFontSize }}>
                              {isGain ? `+${token.change24h.toFixed(1)}%` : `${token.change24h.toFixed(1)}%`}
                            </span>

                            {/* KOL Badge if size allows */}
                            {size >= 85 && token.kolsHolding > 0 && (
                              <span className={styles.bubbleKolBadge} style={{ fontSize: Math.max(8.5, size * 0.08) }}>
                                {token.kolsHolding} KOLs
                              </span>
                            )}
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
                                      <div className={styles.exchangeIconsInline}>
                                        <span className={styles.exchangeIconMark} title={`${token.chain} Chain`}>
                                          {renderChainLogo(token.chain, 13)}
                                        </span>
                                      </div>
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



            {/* ═══ VIEW 3: CARD GRID ═════════════════════════════ */}
            {view === "grid" && (
              <div className={styles.cardGrid}>
                {filtered.map((token) => (
                  <div key={token.id} className={styles.gridCard} onClick={() => setTradingTerminalToken(token)}>
                    {/* Top Header Row */}
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
                            <div className={styles.exchangeIconsInline}>
                              <span className={styles.exchangeIconMark} title={`${token.chain} Chain`}>
                                {renderChainLogo(token.chain, 13)}
                              </span>
                            </div>
                          </div>
                          <div className={styles.gridCardDev}>
                            <span>by {token.devHandle}</span>
                            {token.isVerified && <Check size={10} style={{ color: "var(--emerald-500)" }} strokeWidth={3} />}
                            <span className={styles.gridCardDot}>·</span>
                            <span className={styles.gridCardAge}>
                              {formatAge(token.ageMinutes)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.gridCardTopRight}>
                        <span className={`${styles.gridCardBadge} ${token.badge === "HIGH KOL BAG" ? styles.highKolBadge : styles.communityBadge}`}>
                          {token.badge}
                        </span>
                        <button
                          className={styles.gridCardFavBtn}
                          onClick={(e) => { e.stopPropagation(); toggleFavorite(token.id); }}
                          aria-label="Favorite token"
                        >
                          <Star size={13} fill={token.isFavorited ? "#ffffff" : "none"} color={token.isFavorited ? "#ffffff" : "var(--text-disabled)"} />
                        </button>
                      </div>
                    </div>

                    {/* Description (Clamped with fixed 2-line height for aligned cards) */}
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
                      <div className={styles.kolBodyRow}>
                        {token.kolsHolding > 0 ? (
                          <div className={styles.kolAvatarsRow}>
                            {token.kolAvatars.slice(0, 4).map((av, i) => (
                              <div key={i} className={styles.kolAvatar}>{av}</div>
                            ))}
                            {token.kolsHolding > 4 && (
                              <span className={styles.kolMoreCount}>
                                +{token.kolsHolding - 4}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className={styles.noKolsText}>No callers holding</span>
                        )}
                        <div className={styles.kolBagBlock}>
                          <span className={styles.kolBagMeta}>KOL BAG</span>
                          <span className={`${styles.kolBagLabel} ${token.kolsHolding > 0 ? styles.kolBagValue : ""}`}>{token.totalKolBag}</span>
                        </div>
                      </div>
                    </div>

                    {/* Metrics Stats Row */}
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

                    {/* Footer Action Row */}
                    <div className={styles.gridCardFooter}>
                      <span className={styles.top10Row}>Top 10: {token.topTenPct}</span>
                      <button
                        className={styles.quickBuyBtn}
                        onClick={(e) => { e.stopPropagation(); handleBuy(token); }}
                      >
                        Quick Buy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── KOL LEADERBOARD FULL SECTION (BELOW CARD GRID) ──── */}
          {renderLeaderboardSection()}
        </>
      ) : (
        /* ══════════════════════════════════════════════════════════
           KOL RADAR VIEW (MATCHES REFERENCE IN i5 THEME & STYLE)
           ══════════════════════════════════════════════════════════ */
        <div className={styles.kolRadarContainer}>

          {/* ── TOP HEADER & BREADCRUMB BAR ────────────────────── */}
          <div className={styles.kolHeaderBar}>
            {/* Left: Title & Subtitle */}
            <div className={styles.kolHeaderLeft}>
              <div className={styles.kolTitleMeta}>
                <div className={styles.kolTitleRow}>
                  <h2 className={styles.kolMainTitle}>KOL Radar</h2>
                </div>
                <p className={styles.kolSubtitle}>
                  Track top verified meme traders, profitable alpha callers, and their live moves in real time.
                </p>
              </div>
            </div>
          </div>

          {/* ── TOP 4 LEADERBOARD CARDS ──── */}
          <div className={styles.metricsGrid}>
            {filteredLeaderboardEntries.slice(0, 4).map((kol, idx) => {
              const cardThemes = [
                {
                  theme: "blue",
                  iconClass: styles.metricIconBlue,
                  barClass: styles.barBlue,
                  rankBadgeClass: styles.rankBadgeBlue,
                  borderGlowClass: styles.cardGlowBlue,
                  bars: ["45%", "30%", "95%", "25%", "75%", "60%", "85%"],
                },
                {
                  theme: "purple",
                  iconClass: styles.metricIconPurple,
                  barClass: styles.barPurple,
                  rankBadgeClass: styles.rankBadgePurple,
                  borderGlowClass: styles.cardGlowPurple,
                  bars: ["35%", "70%", "45%", "90%", "65%", "85%", "60%"],
                },
                {
                  theme: "orange",
                  iconClass: styles.metricIconOrange,
                  barClass: styles.barOrange,
                  rankBadgeClass: styles.rankBadgeOrange,
                  borderGlowClass: styles.cardGlowOrange,
                  bars: ["65%", "40%", "70%", "85%", "100%", "75%", "90%"],
                },
                {
                  theme: "red",
                  iconClass: styles.metricIconRed,
                  barClass: styles.barRed,
                  rankBadgeClass: styles.rankBadgeRed,
                  borderGlowClass: styles.cardGlowRed,
                  bars: ["55%", "35%", "60%", "75%", "90%", "100%", "80%"],
                },
              ];

              const cfg = cardThemes[idx] || cardThemes[0];

              return (
                <div
                  key={kol.id}
                  className={`${styles.metricCard} ${cfg.borderGlowClass}`}
                  onClick={() => openKolProfile(kol)}
                  style={{ cursor: "pointer" }}
                  title={`View ${kol.kolName} Profile`}
                >
                  {/* Header: Rank Badge, Avatar, Name & Follow Star */}
                  <div className={styles.metricCardHeader}>
                    <div className={styles.metricTitleGroup}>
                      <span className={`${styles.top5RankPill} ${cfg.rankBadgeClass}`}>#{kol.rank}</span>
                      <div className={styles.top5Avatar} style={{ width: 24, height: 24, fontSize: 13 }}>{kol.kolAvatar}</div>
                      <span className={styles.metricTitle} style={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                        {kol.kolName}
                        <Check size={11} className={styles.refCheckIcon} strokeWidth={3} />
                      </span>
                    </div>
                    <button
                      type="button"
                      className={styles.metricMoreBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFollowKol(kol.kolHandle);
                      }}
                      title={followedKols[kol.kolHandle] ? "Unfollow KOL" : "Follow KOL"}
                    >
                      <Star
                        size={14}
                        fill={followedKols[kol.kolHandle] ? "#fbbf24" : "none"}
                        color={followedKols[kol.kolHandle] ? "#fbbf24" : "currentColor"}
                      />
                    </button>
                  </div>

                  {/* Inset Well: Realized PnL & Win Rate */}
                  <div className={styles.metricInnerWell}>
                    <div className={styles.metricValueGroup}>
                      <span className={styles.metricBigVal}>{kol.pnl}</span>
                      <span className={styles.metricValUnit}>{kol.winRate}% WR</span>
                    </div>
                  </div>

                  {/* Footer: Clean single row with holding/record and ROI delta */}
                  <div className={styles.metricCardFooter}>
                    <span className={styles.metricFooterLabel}>
                      {kol.wins}W / {kol.losses}L · {kol.topHolding.ticker}
                    </span>
                    <div className={styles.metricDeltaGreen}>
                      <span className={styles.deltaArrow}>▲</span>
                      <span>{kol.avgRoi} ROI</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── SUBTABS NAVIGATION & CONTROLS BAR ─────────────────────────── */}
          <div className={styles.kolNavControlsBar}>
            {/* Left: Subtabs Group */}
            <div className={styles.kolSubTabGroup}>


              <button
                type="button"
                className={`${styles.kolSubTabBtn} ${kolSubTab === "signals" ? styles.kolSubTabBtnActive : ""}`}
                onClick={() => setKolSubTab("signals")}
              >
                <Activity size={14} />
                <span>Live Trades</span>
                <span className={styles.kolSubTabCountBadge}>10</span>
              </button>

              <button
                type="button"
                className={`${styles.kolSubTabBtn} ${kolSubTab === "tokens" ? styles.kolSubTabBtnActive : ""}`}
                onClick={() => setKolSubTab("tokens")}
              >
                <Layers size={14} />
                <span>Token Radar</span>
              </button>

              <button
                type="button"
                className={`${styles.kolSubTabBtn} ${kolSubTab === "leaderboard" ? styles.kolSubTabBtnActive : ""}`}
                onClick={() => setKolSubTab("leaderboard")}
              >
                <Award size={14} />
                <span>KOL Leaderboard</span>
              </button>

              <button
                type="button"
                className={`${styles.kolSubTabBtn} ${kolSubTab === "watchlist" ? styles.kolSubTabBtnActive : ""}`}
                onClick={() => setKolSubTab("watchlist")}
              >
                <Star size={14} />
                <span>Watchlist</span>
                <span className={styles.kolSubTabCountBadge}>
                  {Object.values(followedKols).filter(Boolean).length || 3}
                </span>
              </button>
            </div>

            {/* Right: Chain Selector, Live Price Ticker, Search, Feed Controls & Settings */}
            <div className={styles.kolHeaderRight}>
              {/* Chain Selector Pills */}
              <div className={styles.kolChainButtonGroup}>
                {(["BNB", "SOL", "ETH", "BASE"] as const).map((chain) => {
                  const isActive = kolChainSelected === chain;
                  const isAvailable = chain === "BNB" || chain === "SOL";
                  return (
                    <button
                      key={chain}
                      type="button"
                      className={`${styles.kolChainSelectBtn} ${isActive ? styles.kolChainSelectBtnActive : ""}`}
                      onClick={() => {
                        setKolChainSelected(chain);
                        showToast(`Switched feed to ${chain} Chain`);
                      }}
                    >
                      {chain}
                      {!isAvailable && <span className={styles.soonPill}>Soon</span>}
                    </button>
                  );
                })}
              </div>

              {/* Price Ticker Pill */}
              <div className={styles.kolPriceTickerPill}>
                <span className={styles.tickerSymbol}>
                  {kolChainSelected === "BNB" ? "BNB:" : kolChainSelected === "SOL" ? "SOL:" : "ETH:"}
                </span>
                <span className={styles.tickerPrice}>
                  {kolChainSelected === "BNB" ? "$624.00" : kolChainSelected === "SOL" ? "$184.50" : "$2,740.00"}
                </span>
                <span className={styles.tickerDeltaUp}>+3.4%</span>
              </div>

              {/* Search Box */}
              <div className={styles.kolTopSearchBox}>
                <Search size={13} className={styles.kolSearchIcon} />
                <input
                  type="text"
                  placeholder="Search wallet, KOL, token..."
                  value={kolSearch}
                  onChange={(e) => setKolSearch(e.target.value)}
                  className={styles.kolTopSearchInput}
                />
              </div>

              {/* Feed Controls (Pause & Sound) */}
              <div className={styles.kolFeedControlGroup}>
                <button
                  type="button"
                  className={`${styles.kolFeedControlBtn} ${isFeedPaused ? styles.kolFeedPausedBtn : ""}`}
                  onClick={() => {
                    setIsFeedPaused(!isFeedPaused);
                    showToast(isFeedPaused ? "Resumed live on-chain stream" : "Paused live on-chain stream");
                  }}
                  title={isFeedPaused ? "Resume Live Stream" : "Pause Live Stream"}
                >
                  {isFeedPaused ? <Play size={13} /> : <Pause size={13} />}
                  <span>{isFeedPaused ? "Resume" : "Pause"}</span>
                </button>

                <button
                  type="button"
                  className={`${styles.kolFeedControlBtn} ${isSoundAlerts ? styles.kolSoundActiveBtn : ""}`}
                  onClick={() => {
                    setIsSoundAlerts(!isSoundAlerts);
                    showToast(isSoundAlerts ? "Muted trade sound alerts" : "Enabled audio alerts for Smart KOL calls");
                  }}
                  title={isSoundAlerts ? "Audio Alerts Enabled" : "Audio Alerts Muted"}
                >
                  {isSoundAlerts ? <Volume2 size={14} /> : <VolumeX size={14} />}
                </button>
              </div>

              {/* Settings Action Button */}
              <button
                type="button"
                className={styles.kolSettingsBtn}
                onClick={() => showToast("Leaderboard Configuration & Alert Thresholds")}
                title="Leaderboard Settings"
              >
                <Settings size={15} />
              </button>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════
             MAIN CONTENT: OVERVIEW (LATEST KOL ACTIVITY ONLY) & DEDICATED TABS
             ════════════════════════════════════════════════════════ */}
          {kolSubTab === "tokens" && (
            /* ── SECTION 1: TRENDING AMONG KOLS (TOKEN RADAR ONLY) ─── */
            <div className={styles.kolSectionWrapper}>
              <div className={styles.kolSectionHeaderRow}>
                <div>
                  <h3 className={styles.kolSectionTitle}>
                    Trending Among KOLs
                  </h3>
                  <p className={styles.kolSectionSubtitle}>
                    Meme tokens experiencing highest net buy accumulation by verified wallets
                  </p>
                </div>
                <button
                  type="button"
                  className={styles.kolSectionLinkBtn}
                  onClick={() => setKolSubTab("tokens")}
                >
                  <span>View All in Token Radar</span>
                  <ArrowUpRight size={13} />
                </button>
              </div>

              <div className={styles.trendingCardsGrid}>
                {filteredTrendingTokens.map((token) => (
                  <div
                    key={token.id}
                    className={styles.modernCard}
                    onClick={() => openTerminalForToken(token)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* 1. Header: Avatar + Title/Chain/Address + Badge/Star */}
                    <div className={styles.modernCardHeader}>
                      <div className={styles.modernCardIdentity}>
                        <div className={styles.modernAvatar}>
                          <span>{token.avatar}</span>
                        </div>
                        <div className={styles.modernMeta}>
                          <div className={styles.modernNameRow}>
                            <span className={styles.modernName}>{token.name}</span>
                            <span className={styles.modernTicker}>{token.ticker}</span>
                            <div className={styles.exchangeIconsInline}>
                              <span className={styles.exchangeIconMark} title={`${token.chain} Chain`}>
                                {renderChainLogo(token.chain, 13)}
                              </span>
                            </div>
                          </div>
                          <div className={styles.modernSubRow}>
                            <span className={styles.modernChainPill}>{token.chain} Chain</span>
                            <button
                              type="button"
                              className={styles.modernAddressBtn}
                              onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard?.writeText(token.contractAddress);
                                showToast(`Copied ${token.name} contract address`);
                              }}
                              title="Copy Contract"
                            >
                              <span>{token.contractAddress}</span>
                              <Copy size={10} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className={styles.modernHeaderRight}>
                        <span className={styles.modernAlphaBadge}>HOT ALPHA</span>
                        <button
                          type="button"
                          className={`${styles.modernStarBtn} ${favoritedTrending[token.id] ? styles.modernStarBtnActive : ""}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavoriteTrending(token.id);
                          }}
                          title="Add to Watchlist"
                        >
                          <Star size={13} fill={favoritedTrending[token.id] ? "currentColor" : "none"} />
                        </button>
                      </div>
                    </div>

                    {/* 2. Unified Merged Inner Card */}
                    <div className={styles.modernInnerCard}>
                      {/* Row 1: Price, Market Cap, 24H Vol */}
                      <div className={styles.modernInnerPriceRow}>
                        <div className={styles.modernPriceLeft}>
                          <span className={styles.modernBoxLabel}>PRICE</span>
                          <div className={styles.modernPriceValRow}>
                            <span className={styles.modernPriceVal}>{token.price}</span>
                            <span className={styles.modernGainBadge}>+{token.change24h}% ↗</span>
                          </div>
                        </div>

                        <div className={styles.modernPriceRight}>
                          <div className={styles.modernMetricItem}>
                            <span className={styles.modernBoxLabel}>MARKET CAP</span>
                            <span className={styles.modernCapVal}>{token.marketCap}</span>
                          </div>
                          <div className={styles.modernMetricItem}>
                            <span className={styles.modernBoxLabel}>24H VOL</span>
                            <span className={styles.modernVolVal}>{token.volume24h}</span>
                          </div>
                        </div>
                      </div>

                      {/* Row 2: Smart Wallets Flow */}
                      <div className={styles.modernInnerSmartRow}>
                        <div className={styles.modernSmartTitle}>
                          <Users size={12} className={styles.modernSmartIcon} />
                          <span>Smart Wallets</span>
                          <span className={styles.modernBuySellPill}>{token.kolBuyCount} Buy / {token.kolSellCount} Sell</span>
                        </div>
                        <div className={styles.modernNetFlow}>
                          <strong className={styles.modernNetVal}>{token.netKolFlow}</strong>
                        </div>
                      </div>

                      {/* Row 3: Holders, Liquidity, Security */}
                      <div className={styles.modernInnerStatsRow}>
                        <div className={styles.modernStatCell}>
                          <span className={styles.modernStatCellLabel}>HOLDERS</span>
                          <span className={styles.modernStatCellValue}>{token.holders.toLocaleString()}</span>
                        </div>
                        <div className={styles.modernStatCell}>
                          <span className={styles.modernStatCellLabel}>LIQUIDITY</span>
                          <span className={styles.modernStatCellValue}>{token.liquidity}</span>
                        </div>
                        {/* Security Cell Removed */}
                      </div>
                    </div>

                    {/* 5. Footer Actions */}
                    <div className={styles.modernCardFooter}>
                      <div className={styles.modernSecondaryActions}>
                        <button
                          type="button"
                          className={styles.modernSecBtn}
                          onClick={(e) => {
                            e.stopPropagation();
                            openTerminalForToken(token);
                          }}
                          title="Open Interactive Chart"
                        >
                          <TrendingUp size={12} />
                          <span>Chart</span>
                        </button>
                        <button
                          type="button"
                          className={styles.modernSecBtn}
                          onClick={(e) => {
                            e.stopPropagation();
                            showToast(`${token.name}: ${token.kolBuyCount} smart callers holding with ${token.netKolFlow}`);
                          }}
                        >
                          <Info size={12} />
                          <span>Details</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        className={styles.modernQuickBuyBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          openTerminalForToken(token);
                        }}
                        title="Quick Buy via Trading Terminal"
                      >
                        <Zap size={12} />
                        <span>Quick Buy</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── SECTION 2: LATEST KOL ACTIVITY (REAL-TIME STREAM IN OVERVIEW & SIGNALS) ──── */}
          {(kolSubTab === "signals" || kolSubTab === "watchlist") && (
            <div className={styles.kolSectionWrapper}>
              <div className={styles.kolSectionHeaderRow}>
                <div>
                  <h3 className={styles.kolSectionTitle}>
                    Latest KOL Activity
                  </h3>
                  <p className={styles.kolSectionSubtitle}>
                    Real-time transaction stream from monitored smart wallets on {kolChainSelected} Chain
                  </p>
                </div>
                <button
                  type="button"
                  className={styles.kolSectionLinkBtn}
                  onClick={() => setKolSubTab("signals")}
                >
                  <span>View All Live Trades</span>
                  <ArrowUpRight size={13} />
                </button>
              </div>

              <div className={styles.activityTradesList}>
                {filteredActivityTrades.map((trade) => (
                  <div
                    key={trade.id}
                    className={styles.activityTradeRow}
                    onClick={() => openTerminalForToken({
                      id: trade.id,
                      ticker: trade.tokenTicker,
                      name: trade.tokenName,
                      avatar: trade.tokenAvatar,
                      chain: trade.chain,
                      price: trade.txSizeUsd,
                      devHandle: trade.kolHandle,
                    })}
                    style={{ cursor: "pointer" }}
                    title={`Open ${trade.tokenTicker} in Terminal`}
                  >
                    {/* Left: Caller Info & Action Badge */}
                    <div
                      className={styles.tradeCallerGroup}
                      onClick={(e) => {
                        e.stopPropagation();
                        openKolProfile(trade);
                      }}
                      style={{ cursor: "pointer" }}
                      title={`View ${trade.kolName} Profile`}
                    >
                      <div className={styles.tradeCallerAvatar}>{trade.kolAvatar}</div>
                      <div className={styles.tradeCallerMeta}>
                        <div className={styles.tradeCallerNameRow}>
                          <span className={styles.tradeCallerName}>{trade.kolName}</span>
                          <span className={trade.action === "BUY" ? styles.tradeActionBuyBadge : styles.tradeActionSellBadge}>
                            {trade.action}
                          </span>
                        </div>
                        <div className={styles.tradeTokenSummaryRow}>
                          <span className={styles.tradeTokenAvatar}>{trade.tokenAvatar}</span>
                          <span className={styles.tradeTokenName}>{trade.tokenName}</span>
                          <span className={styles.tradeTokenTicker}>{trade.tokenTicker}</span>
                          <span className={styles.tradeDotDivider}>·</span>
                          <span className={styles.tradeTimeAgo}>{trade.timeAgo}</span>
                        </div>
                      </div>
                    </div>

                    {/* Middle: Transaction Size & Token Count */}
                    <div className={styles.tradeTxSizeCol}>
                      <span className={styles.tradeColLabel}>Transaction Size</span>
                      <div className={styles.tradeTxValRow}>
                        <span className={styles.tradeTxSizeBold}>{trade.txSizeChain} {trade.txSizeUsd}</span>
                      </div>
                      <span className={styles.tradeTokenAmtText}>{trade.tokenAmount}</span>
                    </div>

                    {/* Right Middle: MC at Trade & % Change Since Tx */}
                    <div className={styles.tradeMcCol}>
                      <span className={styles.tradeColLabel}>MC at Trade</span>
                      <div className={styles.tradeMcValRow}>
                        <span className={styles.tradeMcValBold}>{trade.mcAtTrade}</span>
                      </div>
                      <span className={trade.changeSinceTx >= 0 ? styles.tradeChangeGreen : styles.tradeChangeRed}>
                        {trade.changeSinceTx >= 0 ? "+" : ""}{trade.changeSinceTx.toFixed(2)}% since tx
                      </span>
                    </div>

                    {/* Right Actions: Tx Link, Profile/Track, and Snipe Button */}
                    <div className={styles.tradeActionsGroup}>
                      <a
                        href="#"
                        className={styles.tradeTxIconBtn}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          showToast(`Viewing On-Chain Tx ${trade.txHash}`);
                        }}
                        title="View Tx on Explorer"
                      >
                        <ExternalLink size={13} />
                      </a>

                      <button
                        type="button"
                        className={`${styles.tradeProfileIconBtn} ${followedKols[trade.kolHandle] ? styles.tradeProfileActive : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          openKolProfile(trade);
                        }}
                        title="View Caller Profile"
                      >
                        <UserCheck size={13} />
                      </button>

                      <button
                        type="button"
                        className={styles.tradeSnipeBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          openTerminalForToken({
                            id: trade.id,
                            ticker: trade.tokenTicker,
                            name: trade.tokenName,
                            avatar: trade.tokenAvatar,
                            chain: trade.chain,
                            price: trade.txSizeUsd,
                            devHandle: trade.kolHandle,
                          });
                        }}
                        title="Snipe via Terminal"
                      >
                        <Zap size={12} />
                        <span>Snipe</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── SECTION 3: KOL LEADERBOARD FULL SECTION (DEDICATED TAB ONLY) ──── */}
          {kolSubTab === "leaderboard" && renderLeaderboardSection()}

        </div>
      )}

      {/* ── TRADING TERMINAL MODAL (matches Screenshot 3) ──── */}
      {tradingTerminalToken && (
        <MemeTradingTerminal
          initialToken={tradingTerminalToken}
          initialPayAmount={tradingTerminalAmount}
          allTokens={tokens}
          onClose={() => {
            setTradingTerminalToken(null);
            setTradingTerminalAmount(undefined);
          }}
        />
      )}

      {/* ── KOL PROFILE SIDE DRAWER (matches User Reference) ── */}
      {activeKolProfile && (
        <KolProfileDrawer
          kol={activeKolProfile}
          onClose={() => setActiveKolProfile(null)}
          onOpenTerminal={openTerminalForToken}
        />
      )}

      {/* ── TOAST ────────────────────────────────────────────── */}
      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  );
}
