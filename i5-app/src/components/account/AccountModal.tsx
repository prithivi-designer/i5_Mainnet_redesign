"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  X,
  User,
  Wallet,
  Box,
  ChevronDown,
  ChevronRight,
  Copy,
  Pencil,
  Check,
  Link as LinkIcon,
  Layers,
  RotateCw,
  Gift,
  Shield,
  Sliders,
  Sparkles,
  Eye,
  EyeOff,
  CreditCard,
  HelpCircle,
  Plus,
  ArrowDownToLine,
  ArrowUpRight,
  ArrowLeftRight,
  ArrowRight,
  ArrowUpDown,
  Info,
  Search,
  MoreVertical,
  LayoutGrid,
  List,
} from "lucide-react";
import styles from "./AccountModal.module.css";
import { IconHyperliquid, IconAster } from "../dashboard/QuickTradeModal";

/* ----------------------------------------------------------
   Exchange Brand Icons (SVGs)
   ---------------------------------------------------------- */
const ExchangeIcons: Record<string, React.ReactNode> = {
  hyperliquid: <IconHyperliquid size={16} />,
  aster: <IconAster size={16} />,
  pacifica: (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1.5C5 4.5 4 7 4 9.5a4 4 0 0 0 8 0c0-2.5-1-5-4-8z"
        stroke="#ffffff"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle cx="8" cy="9.5" r="1.5" fill="#ffffff" />
    </svg>
  ),
  extended: (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
      <path
        d="M3.5 3.5L12.5 12.5M12.5 3.5L3.5 12.5"
        stroke="#2fcb73"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  ),
  grvt: (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="#8FE8B8" strokeWidth="1.4" />
      <path
        d="M8 4.5a3.5 3.5 0 1 1-3.5 3.5H8"
        stroke="#8FE8B8"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  ),
  hibachi: (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
      <path
        d="M8 2C8 2 11 5.5 11 9a3 3 0 0 1-6 0c0-2 1.5-3.5 1.5-3.5S7.5 7 8 7c0-2 0-5 0-5z"
        fill="#FF5722"
      />
    </svg>
  ),
  paradex: (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" fill="#00E5FF" fillOpacity="0.2" stroke="#00E5FF" strokeWidth="1.2" />
      <circle cx="8" cy="8" r="2.5" fill="#00E5FF" />
    </svg>
  ),
  decibel: (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="#FFEB3B" strokeWidth="1.5" />
      <circle cx="8" cy="8" r="2" fill="#FFEB3B" />
    </svg>
  ),
  hotstuff: (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
      <path
        d="M9 2L4 9h4.5L7 14l6-8H8.5L9 2z"
        fill="#E0E0E0"
      />
    </svg>
  ),
  risex: (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="#00E676" strokeWidth="1.4" />
      <path d="M5.5 10.5L10.5 5.5M10.5 5.5H7M10.5 5.5V9" stroke="#00E676" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  phoenix: (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" fill="#FF9800" fillOpacity="0.2" stroke="#FF9800" strokeWidth="1.2" />
      <path d="M8 4v8M4 8h8" stroke="#FF9800" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  ondo: (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="#BDBDBD" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="8" cy="8" r="4" stroke="#BDBDBD" strokeWidth="1" />
      <circle cx="8" cy="8" r="1.5" fill="#BDBDBD" />
    </svg>
  ),
  perpl: (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
      <path d="M4.5 3v10M11.5 3v10M4.5 8h7" stroke="#AB47BC" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
};

/* ----------------------------------------------------------
   Exchange definitions list
   ---------------------------------------------------------- */
interface ExchangeItem {
  id: string;
  name: string;
  iconKey: string;
}

const EXCHANGES: ExchangeItem[] = [
  { id: "hyperliquid", name: "Hyperliquid", iconKey: "hyperliquid" },
  { id: "aster", name: "Aster", iconKey: "aster" },
  { id: "pacifica", name: "Pacifica", iconKey: "pacifica" },
  { id: "extended", name: "Extended", iconKey: "extended" },
  { id: "grvt", name: "GRVT", iconKey: "grvt" },
  { id: "hibachi", name: "Hibachi", iconKey: "hibachi" },
  { id: "paradex", name: "Paradex", iconKey: "paradex" },
  { id: "decibel", name: "Decibel", iconKey: "decibel" },
  { id: "hotstuff", name: "HotStuff", iconKey: "hotstuff" },
  { id: "risex", name: "RiseX", iconKey: "risex" },
  { id: "phoenix", name: "Phoenix", iconKey: "phoenix" },
  { id: "ondo", name: "Ondo Perps", iconKey: "ondo" },
  { id: "perpl", name: "Perpl", iconKey: "perpl" },
];

/* Connected account model */
export interface ConnectedAccount {
  id: string;
  exchangeId: string;
  exchangeName: string;
  accountLabel: string;
  apiKeyMasked: string;
  permission: "Read-Only" | "Trading" | "Full Access";
  connectedAt: string;
}

export interface TokenPositionItem {
  id: string;
  kind: "token";
  name: string;
  ticker: string;
  amount: string;
  avatar: string;
  isCustomImg?: boolean;
  value: string;
  avgBuy: string;
  pnlDollar: string;
  change24h: string;
  isPositive: boolean;
  status: "Open" | "Closed";
  closedPrice?: string;
}

export interface PerpPositionItem {
  id: string;
  kind: "perp";
  pair: string;
  side: "LONG" | "SHORT";
  leverage: number;
  avatar: string;
  size: string;
  entryPrice: string;
  markPrice: string;
  liqPrice: string;
  pnl: string;
  pnlPercent: string;
  isPositive: boolean;
  margin: string;
  status: "Open" | "Closed";
  closedPrice?: string;
}

export type PositionItem = TokenPositionItem | PerpPositionItem;

/* ----------------------------------------------------------
   Blueprint Portfolio Layout Data Models & Mock Datasets
   ---------------------------------------------------------- */
export interface BlueprintPositionItem {
  id: string;
  name: string;
  ticker: string;
  typeBadge: string;
  isPerp?: boolean;
  amountSub: string;
  value: string;
  pnlDollar: string;
  pnlPercent: string;
  isPositive: boolean;
  avatar: string;
  isCustomImg?: boolean;
  category: "Tokens" | "Perps";
  sparkline: "up" | "down";
}

export const BLUEPRINT_POSITIONS: BlueprintPositionItem[] = [
  {
    id: "kate",
    name: "Kate Coin",
    ticker: "KATE",
    typeBadge: "SPOT",
    amountSub: "105.5K KATE • Avg $0.00074",
    value: "$110.78",
    pnlDollar: "+$85.40",
    pnlPercent: "41.20%",
    isPositive: true,
    avatar: "👑",
    category: "Tokens",
    sparkline: "up",
  },
  {
    id: "four",
    name: "Four Meme",
    ticker: "FOUR",
    typeBadge: "SPOT",
    amountSub: "50,000 FOUR • Avg $0.0018",
    value: "$74.00",
    pnlDollar: "-$16.00",
    pnlPercent: "12.40%",
    isPositive: false,
    avatar: "4",
    category: "Tokens",
    sparkline: "down",
  },
  {
    id: "pepe-perp",
    name: "PEPE-PERP",
    ticker: "PEPE",
    typeBadge: "10x LONG",
    isPerp: true,
    amountSub: "1,250 PEPE • Entry $0.00012",
    value: "$184.20",
    pnlDollar: "+$184.20",
    pnlPercent: "120.00%",
    isPositive: true,
    avatar: "🐸",
    category: "Perps",
    sparkline: "up",
  },
  {
    id: "doho",
    name: "DOHO",
    ticker: "DOHO",
    typeBadge: "SPOT",
    amountSub: "200 DOHO • Avg $0.0220",
    value: "$4.41",
    pnlDollar: "+$0.61",
    pnlPercent: "16.10%",
    isPositive: true,
    avatar: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=100&auto=format&fit=crop&q=60",
    isCustomImg: true,
    category: "Tokens",
    sparkline: "up",
  },
  {
    id: "cashcat",
    name: "CASHCAT",
    ticker: "CASHCAT",
    typeBadge: "SPOT",
    amountSub: "120 CASHCAT • Avg $0.0189",
    value: "$2.29",
    pnlDollar: "-$0.33",
    pnlPercent: "12.60%",
    isPositive: false,
    avatar: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=100&auto=format&fit=crop&q=60",
    isCustomImg: true,
    category: "Tokens",
    sparkline: "down",
  },
];

export interface BlueprintActivityItem {
  id: string;
  time: string;
  tokenName: string;
  tokenAvatar?: string;
  isPair?: boolean;
  pairFrom?: string;
  pairTo?: string;
  isDepositIcon?: boolean;
  action: "Buy" | "Swap" | "Deposit";
  actionCategory: "Trades" | "Transfers" | "Deposits";
  amount: string;
  value: string;
}

export const BLUEPRINT_ACTIVITIES: BlueprintActivityItem[] = [
  {
    id: "act-1",
    time: "2m ago",
    tokenName: "DOHO",
    tokenAvatar: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=100&auto=format&fit=crop&q=60",
    action: "Buy",
    actionCategory: "Trades",
    amount: "200 DOHO",
    value: "$4.41",
  },
  {
    id: "act-2",
    time: "18m ago",
    tokenName: "CASHCAT",
    tokenAvatar: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=100&auto=format&fit=crop&q=60",
    action: "Buy",
    actionCategory: "Trades",
    amount: "120 CASHCAT",
    value: "$2.29",
  },
  {
    id: "act-3",
    time: "2h ago",
    tokenName: "FOUR → KATE",
    isPair: true,
    pairFrom: "4",
    pairTo: "👑",
    action: "Swap",
    actionCategory: "Trades",
    amount: "50 FOUR → 2000 KATE",
    value: "$1.12",
  },
  {
    id: "act-4",
    time: "5h ago",
    tokenName: "Deposit",
    isDepositIcon: true,
    action: "Deposit",
    actionCategory: "Deposits",
    amount: "+$20.00",
    value: "$20.00",
  },
];

const SAMPLE_TOKEN_POSITIONS: TokenPositionItem[] = [
  {
    id: "cashcat",
    kind: "token",
    name: "Cash Cat",
    ticker: "CASHCAT",
    amount: "11.80 CASHCAT",
    avatar: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=100&auto=format&fit=crop&q=60",
    isCustomImg: true,
    value: "$2.29",
    avgBuy: "$0.164",
    pnlDollar: "+$0.35",
    change24h: "▲ 18.34%",
    isPositive: true,
    status: "Open",
  },
  {
    id: "mdoge",
    kind: "token",
    name: "Murad Doge",
    ticker: "MDOGE",
    amount: "1,250,000 MDOGE",
    avatar: "🐕",
    value: "$142.50",
    avgBuy: "$0.000089",
    pnlDollar: "+$31.20",
    change24h: "▲ 28.01%",
    isPositive: true,
    status: "Open",
  },
  {
    id: "pepebot",
    kind: "token",
    name: "PepeBot AI",
    ticker: "PEPEBOT",
    amount: "84,200 PEPEBOT",
    avatar: "🤖",
    value: "$68.40",
    avgBuy: "$0.00086",
    pnlDollar: "-$4.12",
    change24h: "▼ -5.68%",
    isPositive: false,
    status: "Open",
  },
  {
    id: "sol",
    kind: "token",
    name: "Solana Ecosystem",
    ticker: "SOL",
    amount: "2.45 SOL",
    avatar: "🟣",
    value: "$367.50",
    avgBuy: "$142.40",
    pnlDollar: "+$18.60",
    change24h: "▲ 5.33%",
    isPositive: true,
    status: "Open",
  },
  {
    id: "kate",
    kind: "token",
    name: "Kate Coin",
    ticker: "KATE",
    amount: "105.5K KATE",
    avatar: "👑",
    value: "$110.78",
    avgBuy: "$0.00074",
    pnlDollar: "+$85.40",
    change24h: "▲ 41.20%",
    isPositive: true,
    status: "Closed",
    closedPrice: "$0.00105",
  },
  {
    id: "four",
    kind: "token",
    name: "Four Meme",
    ticker: "FOUR",
    amount: "50,000 FOUR",
    avatar: "4️⃣",
    value: "$74.00",
    avgBuy: "$0.0018",
    pnlDollar: "-$16.00",
    change24h: "▼ -12.40%",
    isPositive: false,
    status: "Closed",
    closedPrice: "$0.00148",
  },
];

const SAMPLE_PERP_POSITIONS: PerpPositionItem[] = [
  {
    id: "btc-perp",
    kind: "perp",
    pair: "BTC-PERP",
    side: "LONG",
    leverage: 10,
    avatar: "₿",
    size: "$2,450.00",
    entryPrice: "$63,420",
    markPrice: "$64,810",
    liqPrice: "$57,800",
    pnl: "+$139.20",
    pnlPercent: "+56.81%",
    isPositive: true,
    margin: "$245.00",
    status: "Open",
  },
  {
    id: "sol-perp",
    kind: "perp",
    pair: "SOL-PERP",
    side: "LONG",
    leverage: 5,
    avatar: "◎",
    size: "$1,200.00",
    entryPrice: "$144.20",
    markPrice: "$150.00",
    liqPrice: "$118.50",
    pnl: "+$46.40",
    pnlPercent: "+19.33%",
    isPositive: true,
    margin: "$240.00",
    status: "Open",
  },
  {
    id: "eth-perp",
    kind: "perp",
    pair: "ETH-PERP",
    side: "SHORT",
    leverage: 15,
    avatar: "Ξ",
    size: "$1,850.00",
    entryPrice: "$3,480",
    markPrice: "$3,410",
    liqPrice: "$3,690",
    pnl: "+$37.80",
    pnlPercent: "+30.65%",
    isPositive: true,
    margin: "$123.33",
    status: "Open",
  },
  {
    id: "doge-perp",
    kind: "perp",
    pair: "DOGE-PERP",
    side: "LONG",
    leverage: 8,
    avatar: "Ð",
    size: "$800.00",
    entryPrice: "$0.102",
    markPrice: "$0.108",
    liqPrice: "$0.091",
    pnl: "+$47.05",
    pnlPercent: "+47.05%",
    isPositive: true,
    margin: "$100.00",
    status: "Open",
  },
  {
    id: "pepe-perp",
    kind: "perp",
    pair: "PEPE-PERP",
    side: "LONG",
    leverage: 10,
    avatar: "🐸",
    size: "$2,450.00",
    entryPrice: "$0.0000081",
    markPrice: "$0.0000142",
    liqPrice: "$0.0000073",
    pnl: "+$184.20",
    pnlPercent: "+75.18%",
    isPositive: true,
    margin: "$245.00",
    status: "Closed",
    closedPrice: "$0.0000142",
  },
  {
    id: "avax-perp",
    kind: "perp",
    pair: "AVAX-PERP",
    side: "SHORT",
    leverage: 5,
    avatar: "🔺",
    size: "$1,250.00",
    entryPrice: "$29.20",
    markPrice: "$27.80",
    liqPrice: "$34.50",
    pnl: "+$62.50",
    pnlPercent: "+25.00%",
    isPositive: true,
    margin: "$250.00",
    status: "Closed",
    closedPrice: "$27.80",
  },
  {
    id: "bnb-perp",
    kind: "perp",
    pair: "BNB-PERP",
    side: "LONG",
    leverage: 20,
    avatar: "🟡",
    size: "$2,500.00",
    entryPrice: "$578.00",
    markPrice: "$568.00",
    liqPrice: "$552.00",
    pnl: "-$45.00",
    pnlPercent: "-18.00%",
    isPositive: false,
    margin: "$125.00",
    status: "Closed",
    closedPrice: "$568.00",
  },
];

/* ----------------------------------------------------------
   Supported Deposit Network SVGs
   ---------------------------------------------------------- */
const IconBNB = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <path d="M12 2L4.5 9.5L7.5 12.5L12 8L16.5 12.5L19.5 9.5L12 2Z" fill="#F0B90B" />
    <path d="M4.5 14.5L7.5 11.5L9 13L6 16L4.5 14.5Z" fill="#F0B90B" />
    <path d="M19.5 14.5L18 16L15 13L16.5 11.5L19.5 14.5Z" fill="#F0B90B" />
    <path d="M12 22L4.5 14.5L7.5 11.5L12 16L16.5 11.5L19.5 14.5L12 22Z" fill="#F0B90B" />
    <path d="M12 11L14 13L12 15L10 13L12 11Z" fill="#F0B90B" />
  </svg>
);

const IconBase = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#0052FF" />
    <circle cx="12" cy="12" r="4.5" fill="#FFFFFF" />
  </svg>
);

const IconArbitrum = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 3L2 20H22L12 3Z"
      fill="#28A0F0"
      fillOpacity="0.25"
      stroke="#28A0F0"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M12 7L6 17H18L12 7Z" fill="#28A0F0" />
  </svg>
);

const IconRobinhood = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2C7 2 3.5 7.5 3.5 13.5C3.5 18 7 21 12 21C13.5 21 15 20.5 16 19.5C18 17.5 19 14.5 19 10.5C19 6 15.5 2 12 2Z"
      fill="#00C805"
    />
    <path
      d="M12 6.5C14 6.5 15.5 8.5 15.5 11.5C15.5 14 14 15.5 12 15.5"
      stroke="#0a0a0c"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const IconI5Badge = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2L21 7.2V16.8L12 22L3 16.8V7.2L12 2Z"
      fill="rgba(228, 228, 228, 0.12)"
      stroke="var(--neutral-100, #e4e4e4)"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M12 6V18M7.5 9.5L16.5 14.5M16.5 9.5L7.5 14.5"
      stroke="var(--neutral-100, #e4e4e4)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const QrCodeVector = () => (
  <svg
    viewBox="0 0 100 100"
    width="100%"
    height="100%"
    shapeRendering="crispEdges"
    style={{ display: "block" }}
  >
    <rect width="100" height="100" fill="#ffffff" />
    {/* Top-Left Finder Pattern */}
    <rect x="8" y="8" width="24" height="24" rx="2" fill="#000000" />
    <rect x="11.5" y="11.5" width="17" height="17" rx="1.5" fill="#ffffff" />
    <rect x="14" y="14" width="12" height="12" rx="1" fill="#000000" />

    {/* Top-Right Finder Pattern */}
    <rect x="68" y="8" width="24" height="24" rx="2" fill="#000000" />
    <rect x="71.5" y="11.5" width="17" height="17" rx="1.5" fill="#ffffff" />
    <rect x="74" y="14" width="12" height="12" rx="1" fill="#000000" />

    {/* Bottom-Left Finder Pattern */}
    <rect x="8" y="68" width="24" height="24" rx="2" fill="#000000" />
    <rect x="11.5" y="71.5" width="17" height="17" rx="1.5" fill="#ffffff" />
    <rect x="14" y="74" width="12" height="12" rx="1" fill="#000000" />

    {/* Timing Patterns */}
    <rect x="36" y="14" width="4" height="4" fill="#000000" />
    <rect x="44" y="14" width="4" height="4" fill="#000000" />
    <rect x="52" y="14" width="4" height="4" fill="#000000" />
    <rect x="60" y="14" width="4" height="4" fill="#000000" />
    <rect x="14" y="36" width="4" height="4" fill="#000000" />
    <rect x="14" y="44" width="4" height="4" fill="#000000" />
    <rect x="14" y="52" width="4" height="4" fill="#000000" />
    <rect x="14" y="60" width="4" height="4" fill="#000000" />

    {/* Upper Data Blocks */}
    <rect x="36" y="8" width="4" height="4" fill="#000000" />
    <rect x="44" y="8" width="4" height="4" fill="#000000" />
    <rect x="56" y="8" width="4" height="4" fill="#000000" />
    <rect x="40" y="22" width="4" height="4" fill="#000000" />
    <rect x="48" y="22" width="4" height="4" fill="#000000" />
    <rect x="56" y="22" width="4" height="4" fill="#000000" />
    <rect x="36" y="28" width="4" height="4" fill="#000000" />
    <rect x="60" y="28" width="4" height="4" fill="#000000" />

    {/* Left/Right Data Blocks */}
    <rect x="8" y="36" width="4" height="4" fill="#000000" />
    <rect x="22" y="36" width="4" height="4" fill="#000000" />
    <rect x="26" y="44" width="4" height="4" fill="#000000" />
    <rect x="8" y="52" width="4" height="4" fill="#000000" />
    <rect x="22" y="60" width="4" height="4" fill="#000000" />

    <rect x="68" y="36" width="4" height="4" fill="#000000" />
    <rect x="76" y="36" width="4" height="4" fill="#000000" />
    <rect x="84" y="36" width="4" height="4" fill="#000000" />
    <rect x="72" y="44" width="4" height="4" fill="#000000" />
    <rect x="88" y="44" width="4" height="4" fill="#000000" />
    <rect x="68" y="52" width="4" height="4" fill="#000000" />
    <rect x="80" y="52" width="4" height="4" fill="#000000" />
    <rect x="76" y="60" width="4" height="4" fill="#000000" />
    <rect x="84" y="60" width="4" height="4" fill="#000000" />

    {/* Bottom Data Blocks */}
    <rect x="36" y="68" width="4" height="4" fill="#000000" />
    <rect x="44" y="68" width="4" height="4" fill="#000000" />
    <rect x="52" y="68" width="4" height="4" fill="#000000" />
    <rect x="60" y="68" width="4" height="4" fill="#000000" />
    <rect x="40" y="76" width="4" height="4" fill="#000000" />
    <rect x="56" y="76" width="4" height="4" fill="#000000" />
    <rect x="68" y="76" width="4" height="4" fill="#000000" />
    <rect x="84" y="76" width="4" height="4" fill="#000000" />
    <rect x="36" y="84" width="4" height="4" fill="#000000" />
    <rect x="48" y="84" width="4" height="4" fill="#000000" />
    <rect x="72" y="84" width="4" height="4" fill="#000000" />
    <rect x="88" y="84" width="4" height="4" fill="#000000" />
    <rect x="44" y="90" width="4" height="4" fill="#000000" />
    <rect x="60" y="90" width="4" height="4" fill="#000000" />
    <rect x="80" y="90" width="4" height="4" fill="#000000" />
  </svg>
);

/* Top 4 Balance Metrics (Respective Icons instead of colored dots) */
const BALANCE_METRICS = [
  {
    id: "main",
    label: "Main Balance",
    value: "$4.58",
    subtext: "Primary Cash • 0.33 USD Avail",
    iconType: "wallet" as const,
  },
  {
    id: "crypto",
    label: "Crypto Balance",
    value: "$14,250.00",
    subtext: "Spot Vault • 4 Assets",
    iconType: "vault" as const,
  },
  {
    id: "hyperliquid",
    label: "Hyperliquid Balance",
    value: "$8,420.50",
    subtext: "Perps Margin • 2 Open",
    iconType: "hyperliquid" as const,
  },
  {
    id: "aster",
    label: "Aster Balance",
    value: "$3,180.25",
    subtext: "Aster Ecosystem • Staked",
    iconType: "aster" as const,
  },
];

/* USDC Brand Icon SVG */
const IconUSDC = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="16" fill="#2775CA" />
    <path
      d="M16 6.5C10.753 6.5 6.5 10.753 6.5 16s4.253 9.5 9.5 9.5 9.5-4.253 9.5-9.5S21.247 6.5 16 6.5zm0 17.5c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"
      fill="#ffffff"
      fillOpacity="0.25"
    />
    <path
      d="M17.8 11.2h-3.4c-1.1 0-2 .9-2 2s.9 2 2 2h3.2c1.1 0 2 .9 2 2s-.9 2-2 2h-3.8m2-10.2v2.2m0 8v2.2"
      stroke="#ffffff"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* Transfer Routing Flow Accounts */
interface TransferAccountOption {
  id: string;
  name: string;
  sub: string;
  avail: string;
  availNum: number;
  type: "vault" | "wallet" | "hyperliquid" | "aster";
  exchange?: string;
}

const TRANSFER_ACCOUNTS: TransferAccountOption[] = [
  {
    id: "crypto",
    name: "Crypto Balance (Spot Vault)",
    sub: "Spot Vault",
    avail: "$14,250.00",
    availNum: 14250.0,
    type: "vault",
    exchange: "hyperliquid",
  },
  {
    id: "main",
    name: "Main Balance",
    sub: "Primary Cash",
    avail: "$4.58",
    availNum: 4.58,
    type: "wallet",
  },
  {
    id: "hyperliquid",
    name: "Hyperliquid Balance",
    sub: "Perps Margin",
    avail: "$8,420.50",
    availNum: 8420.5,
    type: "hyperliquid",
    exchange: "hyperliquid",
  },
  {
    id: "aster",
    name: "Aster Balance",
    sub: "Aster Ecosystem",
    avail: "$3,180.25",
    availNum: 3180.25,
    type: "aster",
    exchange: "aster",
  },
];

/* Transfer Select Asset Items */
interface TransferAssetOption {
  symbol: string;
  name: string;
  network: string;
  avail: number;
  price: number;
}

const TRANSFER_ASSETS: TransferAssetOption[] = [
  {
    symbol: "USDC",
    name: "USDC • USD Coin",
    network: "Arbitrum Native • Instant Sync",
    avail: 2450.0,
    price: 1.0,
  },
  {
    symbol: "USDT",
    name: "USDT • Tether USD",
    network: "Ethereum Direct • Zero Fee",
    avail: 850.5,
    price: 1.0,
  },
  {
    symbol: "ETH",
    name: "ETH • Ethereum",
    network: "Arbitrum One • Instant L2",
    avail: 1.45,
    price: 3450.0,
  },
  {
    symbol: "SOL",
    name: "SOL • Solana",
    network: "Solana Direct • Fast TPS",
    avail: 12.8,
    price: 180.0,
  },
];

/* Wallet Activity Feed Models */
interface WalletActivityItem {
  id: string;
  type: "deposit" | "transfer" | "withdrawal";
  title: string;
  badge: string;
  badgeType: "completed" | "instant" | "confirmed";
  networkOrRoute: string;
  timeAgo: string;
  amount: string;
  amountColor: string;
  feeOrAddress: string;
}

const SAMPLE_WALLET_ACTIVITIES: WalletActivityItem[] = [
  {
    id: "act-1",
    type: "deposit",
    title: "USDC Deposit",
    badge: "Completed",
    badgeType: "completed",
    networkOrRoute: "Arbitrum One",
    timeAgo: "12 mins ago",
    amount: "+$500.00 USDC",
    amountColor: "var(--emerald-400, #56d68f)",
    feeOrAddress: "Fee $0.12",
  },
  {
    id: "act-2",
    type: "transfer",
    title: "Internal Transfer",
    badge: "Instant",
    badgeType: "instant",
    networkOrRoute: "Spot Vault → Perps Margin",
    timeAgo: "2 hrs ago",
    amount: "$2,000.00 USD",
    amountColor: "var(--text-primary, #e4e4e4)",
    feeOrAddress: "Free ($0.00)",
  },
  {
    id: "act-3",
    type: "withdrawal",
    title: "SOL Withdrawal",
    badge: "Confirmed",
    badgeType: "confirmed",
    networkOrRoute: "Solana Network",
    timeAgo: "1 day ago",
    amount: "-1.85 SOL",
    amountColor: "var(--text-primary, #e4e4e4)",
    feeOrAddress: "0x98f2...34b1",
  },
];

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccountModal({ isOpen, onClose }: AccountModalProps) {
  // Navigation State — Default to Profile Menu
  const [activeTab, setActiveTab] = useState<"profile" | "wallet" | "userInfo" | "exchanges">("profile");
  const [selectedExchangeFilter, setSelectedExchangeFilter] = useState<string>("all");
  const [isExchangeAccordionOpen, setIsExchangeAccordionOpen] = useState<boolean>(true);

  // Profile View States (Matching Reference Screenshots)
  const [profileName, setProfileName] = useState<string>("web3noob3");
  const [profileHandle, setProfileHandle] = useState<string>("@web3noob3");
  const [followingCount] = useState<number>(3);
  const [followersCount] = useState<number>(1);
  const [tradesCount] = useState<number>(1);
  const [isBalanceVisible, setIsBalanceVisible] = useState<boolean>(true);
  const [portfolioTimeframe, setPortfolioTimeframe] = useState<"24H" | "7D" | "30D" | "ALL">("24H");
  const [positionsStatus, setPositionsStatus] = useState<"Open" | "Closed">("Closed");
  const [positionsFilter, setPositionsFilter] = useState<"All" | "Tokens" | "Perps">("All");
  const [swapsFilter, setSwapsFilter] = useState<"All swaps" | "Buys" | "Sells">("All swaps");

  const [portfolioSearchQuery, setPortfolioSearchQuery] = useState<string>("");
  const [positionsSearchQuery, setPositionsSearchQuery] = useState<string>("");
  const [positionsViewMode, setPositionsViewMode] = useState<"grid" | "list">("grid");
  const [activityFilter, setActivityFilter] = useState<"All" | "Trades" | "Transfers" | "Deposits">("All");

  // Wallet View States (Matching Reference Screenshots)
  const [walletActivityFilter, setWalletActivityFilter] = useState<"All Activity" | "Deposits" | "Transfers">("All Activity");

  // Deposit Tokens Sub-Modal Dialog (Matching Reference Screenshots)
  const [isDepositModalOpen, setIsDepositModalOpen] = useState<boolean>(false);
  const [depositChainType, setDepositChainType] = useState<"EVM" | "Solana">("EVM");

  // Transfer Sub-Modal State (Matching Transfer Flow Blueprint)
  const [isTransferModalOpen, setIsTransferModalOpen] = useState<boolean>(false);
  const [fromAccount, setFromAccount] = useState<TransferAccountOption>(TRANSFER_ACCOUNTS[0]);
  const [toAccount, setToAccount] = useState<TransferAccountOption>(TRANSFER_ACCOUNTS[1]);
  const [isFromDropdownOpen, setIsFromDropdownOpen] = useState<boolean>(false);
  const [isToDropdownOpen, setIsToDropdownOpen] = useState<boolean>(false);
  const [selectedTransferAsset, setSelectedTransferAsset] = useState<TransferAssetOption>(TRANSFER_ASSETS[0]);
  const [isAssetDropdownOpen, setIsAssetDropdownOpen] = useState<boolean>(false);
  const [transferAmount, setTransferAmount] = useState<string>("");

  const filteredBlueprintPositions = useMemo<BlueprintPositionItem[]>(() => {
    return BLUEPRINT_POSITIONS.filter((pos) => {
      const q = positionsSearchQuery.trim().toLowerCase();
      const matchesSearch = !q || pos.name.toLowerCase().includes(q) || pos.ticker.toLowerCase().includes(q);
      if (!matchesSearch) return false;
      if (positionsFilter === "Tokens") return pos.category === "Tokens";
      if (positionsFilter === "Perps") return pos.category === "Perps";
      return true;
    });
  }, [positionsSearchQuery, positionsFilter]);

  const filteredBlueprintActivities = useMemo<BlueprintActivityItem[]>(() => {
    return BLUEPRINT_ACTIVITIES.filter((act) => {
      if (activityFilter === "Trades") return act.actionCategory === "Trades";
      if (activityFilter === "Transfers") return act.actionCategory === "Transfers";
      if (activityFilter === "Deposits") return act.actionCategory === "Deposits";
      return true;
    });
  }, [activityFilter]);

  const filteredPositions = useMemo<PositionItem[]>(() => {
    const tokens = SAMPLE_TOKEN_POSITIONS.filter((t) => t.status === positionsStatus);
    const perps = SAMPLE_PERP_POSITIONS.filter((p) => p.status === positionsStatus);

    if (positionsFilter === "Tokens") {
      return tokens;
    }
    if (positionsFilter === "Perps") {
      return perps;
    }
    return [...tokens, ...perps];
  }, [positionsStatus, positionsFilter]);

  // Edit Profile Sub-Dialog
  const [isEditProfileOpen, setIsEditProfileOpen] = useState<boolean>(false);
  const [editNameInput, setEditNameInput] = useState<string>("web3noob3");
  const [editHandleInput, setEditHandleInput] = useState<string>("@web3noob3");

  // User Info States
  const [email, setEmail] = useState<string>("");
  const [walletAddress] = useState<string>("0x8f2A134659b3dc");
  const [telegram, setTelegram] = useState<string>("");
  const [isEditingTelegram, setIsEditingTelegram] = useState<boolean>(false);
  const [telegramDraft, setTelegramDraft] = useState<string>("");
  const [discordConnected, setDiscordConnected] = useState<boolean>(false);
  const [xConnected, setXConnected] = useState<boolean>(false);

  // Connected Exchange Accounts
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([]);

  // Sub-modal for connecting exchange
  const [isConnectModalOpen, setIsConnectModalOpen] = useState<boolean>(false);
  const [targetExchangeId, setTargetExchangeId] = useState<string>("hyperliquid");
  const [accountLabelInput, setAccountLabelInput] = useState<string>("");
  const [apiKeyInput, setApiKeyInput] = useState<string>("");
  const [permissionInput, setPermissionInput] = useState<"Read-Only" | "Trading" | "Full Access">("Trading");

  // Email sub-prompt
  const [isConnectingEmail, setIsConnectingEmail] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>("");

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isTransferModalOpen) {
          setIsTransferModalOpen(false);
          setIsFromDropdownOpen(false);
          setIsToDropdownOpen(false);
          setIsAssetDropdownOpen(false);
        } else if (isDepositModalOpen) {
          setIsDepositModalOpen(false);
        } else if (isEditProfileOpen) {
          setIsEditProfileOpen(false);
        } else if (isConnectModalOpen) {
          setIsConnectModalOpen(false);
        } else if (isConnectingEmail) {
          setIsConnectingEmail(false);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isTransferModalOpen, isDepositModalOpen, isEditProfileOpen, isConnectModalOpen, isConnectingEmail, onClose]);

  const filteredWalletActivities = useMemo(() => {
    if (walletActivityFilter === "Deposits") {
      return SAMPLE_WALLET_ACTIVITIES.filter((a) => a.type === "deposit");
    }
    if (walletActivityFilter === "Transfers") {
      return SAMPLE_WALLET_ACTIVITIES.filter((a) => a.type === "transfer" || a.type === "withdrawal");
    }
    return SAMPLE_WALLET_ACTIVITIES;
  }, [walletActivityFilter]);

  if (!isOpen) return null;

  // Copy helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard`);
  };

  // Telegram save
  const handleSaveTelegram = () => {
    setTelegram(telegramDraft.trim());
    setIsEditingTelegram(false);
    showToast("Telegram username updated");
  };

  // Add connected account
  const handleAddAccount = () => {
    const exchange = EXCHANGES.find((e) => e.id === targetExchangeId);
    if (!exchange) return;

    const newAcc: ConnectedAccount = {
      id: Math.random().toString(36).substring(2, 9),
      exchangeId: exchange.id,
      exchangeName: exchange.name,
      accountLabel: accountLabelInput.trim() || `${exchange.name} Main`,
      apiKeyMasked: apiKeyInput ? `****${apiKeyInput.slice(-4)}` : "****b3dc",
      permission: permissionInput,
      connectedAt: "Just now",
    };

    setAccounts((prev) => [newAcc, ...prev]);
    setIsConnectModalOpen(false);
    setAccountLabelInput("");
    setApiKeyInput("");
    showToast(`Connected ${exchange.name} account`);
  };

  // Disconnect account
  const handleDisconnect = (id: string, name: string) => {
    setAccounts((prev) => prev.filter((a) => a.id !== id));
    showToast(`Disconnected ${name}`);
  };

  // Filter accounts
  const filteredAccounts =
    selectedExchangeFilter === "all"
      ? accounts
      : accounts.filter((a) => a.exchangeId === selectedExchangeFilter);

  const getExchangeCount = (exchangeId: string) => {
    return accounts.filter((a) => a.exchangeId === exchangeId).length;
  };

  // Helper: Render account exchange logo or respective icon
  const renderAccountIcon = (acc: TransferAccountOption, size: number = 15) => {
    if (acc.exchange === "hyperliquid" || acc.type === "hyperliquid") {
      return <IconHyperliquid size={size} />;
    }
    if (acc.exchange === "aster" || acc.type === "aster") {
      return <IconAster size={size} />;
    }
    if (acc.type === "wallet") {
      return <Wallet size={size} />;
    }
    return <Box size={size} />;
  };

  // Helper: Shared Top 4 Balance Metric Cards (Respective icons instead of dots)
  const renderBalanceCards = (showSubtext: boolean = true) => (
    <div className={styles.balanceCardsGrid}>
      {BALANCE_METRICS.map((metric) => (
        <div key={metric.id} className={styles.balanceCard}>
          <div className={styles.balanceCardHeader}>
            <span className={styles.balanceCardLabel}>{metric.label}</span>
            <div className={styles.balanceCardIconWrap}>
              {metric.iconType === "wallet" && <Wallet size={13} />}
              {metric.iconType === "vault" && <Box size={13} />}
              {metric.iconType === "hyperliquid" && <IconHyperliquid size={14} />}
              {metric.iconType === "aster" && <IconAster size={14} />}
            </div>
          </div>
          <div className={styles.balanceCardValue}>
            {isBalanceVisible ? metric.value : "••••••"}
          </div>
          {showSubtext && <div className={styles.balanceCardSub}>{metric.subtext}</div>}
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header (Title + Subtitle on Left, Close Button on Right) */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>Account</h2>
            <p className={styles.subtitle}>Manage your account preferences and system configurations.</p>
          </div>

          <button className={styles.closeBtn} onClick={onClose} aria-label="Close Account Modal">
            <X size={16} />
          </button>
        </div>

        {/* Modal Body (2 Columns) */}
        <div className={styles.body}>
          {/* Left Navigation Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarNavGroup}>
              {/* Tab 1: Profile (Screenshot 1) */}
              <button
                className={`${styles.navItem} ${activeTab === "profile" ? styles.navItemActive : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                <span className={styles.navItemIcon}>
                  <User size={16} />
                </span>
                <span>Profile</span>
              </button>

              {/* Tab 2: Wallet with ACTIVE badge (Screenshot 2) */}
              <button
                className={`${styles.navItem} ${activeTab === "wallet" ? styles.navItemActive : ""}`}
                onClick={() => setActiveTab("wallet")}
              >
                <span className={styles.navItemIcon}>
                  <Wallet size={16} />
                </span>
                <span>Wallet</span>
                <span className={styles.walletActiveBadge}>ACTIVE</span>
              </button>

              {/* Tab 3: User Info (Screenshot 4) */}
              <button
                className={`${styles.navItem} ${activeTab === "userInfo" ? styles.navItemActive : ""}`}
                onClick={() => setActiveTab("userInfo")}
              >
                <span className={styles.navItemIcon}>
                  <Sliders size={16} />
                </span>
                <span>User Info</span>
              </button>

              {/* Tab 4: Exchange Accounts */}
              <button
                className={`${styles.navItem} ${activeTab === "exchanges" ? styles.navItemActive : ""}`}
                onClick={() => setActiveTab("exchanges")}
              >
                <span className={styles.navItemIcon}>
                  <Box size={16} />
                </span>
                <span>Exchange Accounts</span>
                <span className={styles.countBadge}>({accounts.length})</span>
              </button>
            </div>

            {/* Sidebar Bottom Group: Vertical Stack */}
            <div className={styles.sidebarBottomGroup}>
              {/* Stack 1: Portfolio Value & 24h PnL */}
              <div className={styles.sidebarStatCard}>
                <div className={styles.sidebarStatHeader}>
                  <span className={styles.sidebarStatLabel}>Portfolio</span>
                  <div className={styles.sidebarPnlRow}>
                    <span className={styles.sidebarChangeRed}>-$0.23</span>
                    <span className={styles.sidebarChangeLabel}>24h</span>
                  </div>
                </div>
                <div className={styles.sidebarStatBigVal}>$4.58</div>
              </div>

              {/* Stack 2: Trade Cash with Separate Plus Button */}
              <div className={styles.sidebarStatCard}>
                <div className={styles.sidebarCashRow}>
                  <div className={styles.sidebarCashMeta}>
                    <span className={styles.sidebarStatLabel}>Trade cash</span>
                    <span className={styles.sidebarCashBigVal}>$0.33</span>
                  </div>
                  <button
                    className={styles.sidebarPlusBtn}
                    onClick={() => showToast("Add trade cash modal opened")}
                    title="Add trade cash"
                    aria-label="Add trade cash"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Stack 3: Need Help Card */}
              <div
                className={styles.sidebarHelpCard}
                onClick={() => showToast("Opening documentation & support...")}
              >
                <div className={styles.helpIconBox}>
                  <HelpCircle size={15} />
                </div>
                <div className={styles.helpContent}>
                  <span className={styles.helpTitle}>Need help?</span>
                  <span className={styles.helpSub}>Visit our docs or contact support.</span>
                </div>
                <ChevronRight size={14} className={styles.helpArrow} />
              </div>
            </div>
          </aside>

          {/* Right Content Area */}
          <main className={styles.contentArea}>
            {/* VIEW 0: PROFILE (BLUEPRINT LAYOUT) */}
            {activeTab === "profile" && (
              <div className={styles.profileContainer}>
                {/* 1. TOP SECTION: PORTFOLIO TITLE & SEARCH BAR */}
                <div className={styles.portfolioTopHeader}>
                  <div className={styles.portfolioTopTitleCol}>
                    <h2 className={styles.portfolioPageTitle}>Portfolio</h2>
                    <p className={styles.portfolioPageSub}>
                      Real-time performance across all your tokens and positions
                    </p>
                  </div>
                  <div className={styles.portfolioSearchWrap}>
                    <Search size={14} className={styles.searchIconMuted} />
                    <input
                      type="text"
                      placeholder="Search tokens, pairs, or wallets..."
                      value={portfolioSearchQuery}
                      onChange={(e) => setPortfolioSearchQuery(e.target.value)}
                      className={styles.portfolioSearchInput}
                    />
                    <span className={styles.kbdShortcut}>⌘ K</span>
                  </div>
                </div>

                {/* 2. TOP GRID: PORTFOLIO VALUE (LEFT) + 3 STACKED CARDS (RIGHT) */}
                <div className={styles.portfolioTopGrid}>
                  {/* Left Column: Portfolio Value Card with Chart */}
                  <div className={styles.portfolioCard}>
                    <div className={styles.portfolioHeader}>
                      <div className={styles.portfolioTitleRow}>
                        <span>Portfolio Value</span>
                        <button
                          className={styles.eyeIconBtn}
                          onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                          title={isBalanceVisible ? "Hide balance" : "Show balance"}
                        >
                          {isBalanceVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                        </button>
                      </div>

                      <div className={styles.timeframeSelector}>
                        {(["24H", "7D", "30D", "ALL"] as const).map((tf) => (
                          <button
                            key={tf}
                            className={`${styles.tfButton} ${
                              portfolioTimeframe === tf ? styles.tfButtonActive : ""
                            }`}
                            onClick={() => setPortfolioTimeframe(tf)}
                          >
                            {tf}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className={styles.portfolioBalanceRow}>
                      <div className={styles.portfolioBigVal}>
                        {isBalanceVisible ? "$4.58" : "••••••"}
                      </div>
                      <div className={styles.portfolioChangeRow}>
                        <span className={styles.portfolioChangeVal}>
                          {isBalanceVisible ? "-$0.23 (-4.78%)" : "••••"}
                        </span>
                        <span className={styles.portfolioChangeLabel}>24h</span>
                      </div>
                    </div>

                    {/* Detailed Chart with Y-Axis and X-Axis labels matching blueprint */}
                    <div className={styles.chartContainer}>
                      <div className={styles.yAxisLabels}>
                        <span>$5.00</span>
                        <span>$4.00</span>
                        <span>$3.00</span>
                        <span>$2.00</span>
                      </div>
                      <div className={styles.chartPlotArea}>
                        <div className={styles.chartSvgWrap}>
                          <svg
                            className={styles.chartSvg}
                            viewBox="0 0 360 80"
                            preserveAspectRatio="none"
                          >
                            <defs>
                              <linearGradient id="portfolioAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
                                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                              </linearGradient>
                            </defs>
                            <path
                              d="M 0 48 C 20 50 30 60 45 60 C 60 60 70 25 100 22 C 150 20 220 22 280 20 C 320 18 340 14 360 12 L 360 80 L 0 80 Z"
                              fill="url(#portfolioAreaGrad)"
                            />
                            <path
                              d="M 0 48 C 20 50 30 60 45 60 C 60 60 70 25 100 22 C 150 20 220 22 280 20 C 320 18 340 14 360 12"
                              fill="none"
                              stroke="#ffffff"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        <div className={styles.xAxisLabels}>
                          <span>00:00</span>
                          <span>06:00</span>
                          <span>12:00</span>
                          <span>18:00</span>
                          <span>24:00</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: 3 Stacked Cards */}
                  <div className={styles.topStatsStackCol}>
                    {/* Card 1: Total Cash */}
                    <div className={styles.topMiniCard}>
                      <div className={styles.topMiniCardHeader}>
                        <span className={styles.topMiniCardLabel}>Total Cash</span>
                        <button
                          className={styles.miniCardIconBtn}
                          onClick={() => setActiveTab("wallet")}
                          title="Manage cash in wallet"
                        >
                          <CreditCard size={15} />
                        </button>
                      </div>
                      <div className={styles.topMiniCardBigVal}>$0.33</div>
                    </div>

                    {/* Card 2: Assets */}
                    <div
                      className={`${styles.topMiniCard} ${styles.topMiniCardClickable}`}
                      onClick={() => {
                        setPositionsFilter("All");
                        showToast("Showing all positions");
                      }}
                    >
                      <div className={styles.topMiniCardHeader}>
                        <span className={styles.topMiniCardLabel}>Assets</span>
                        <ChevronRight size={15} className={styles.chevronMuted} />
                      </div>
                      <div className={styles.topMiniCardBigVal}>5</div>
                      <div className={styles.assetsBreakdownList}>
                        <div className={styles.assetBreakdownRow}>
                          <span className={styles.assetDotLabel}>
                            <span className={styles.dotIndicatorTokens} /> Tokens
                          </span>
                          <span className={styles.assetBreakdownNum}>3</span>
                        </div>
                        <div className={styles.assetBreakdownRow}>
                          <span className={styles.assetDotLabel}>
                            <span className={styles.dotIndicatorPerps} /> Perps
                          </span>
                          <span className={styles.assetBreakdownNum}>2</span>
                        </div>
                      </div>
                    </div>

                    {/* Card 3: 24H P&L */}
                    <div className={styles.topMiniCard}>
                      <div className={styles.topMiniCardHeader}>
                        <span className={styles.topMiniCardLabel}>24H P&L</span>
                      </div>
                      <div className={styles.pnlCardContentRow}>
                        <div>
                          <div className={styles.pnlCardBigVal}>-$0.23</div>
                          <div className={styles.pnlCardSubRow}>
                            <span>-4.78%</span>
                            <ChevronDown size={12} />
                          </div>
                        </div>
                        {/* Mini downward sparkline */}
                        <svg className={styles.pnlMiniSparkline} viewBox="0 0 76 24" fill="none">
                          <path
                            d="M 2 4 C 18 4 30 10 44 12 C 56 14 66 20 74 22"
                            stroke="#ffffff"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. MIDDLE SECTION: YOUR POSITIONS (5) */}
                <div className={styles.positionsSection}>
                  <div className={styles.positionsSectionHeader}>
                    <div className={styles.positionsTitleCol}>
                      <h3 className={styles.positionsSectionTitle}>
                        Your Positions <span className={styles.positionsCountMuted}>({filteredBlueprintPositions.length})</span>
                      </h3>
                      <p className={styles.positionsSectionSub}>
                        Live performance across your tokens and perps
                      </p>
                    </div>

                    <div className={styles.positionsControlsRow}>
                      {/* Search Bar */}
                      <div className={styles.posSearchBarWrap}>
                        <Search size={13} className={styles.searchIconMuted} />
                        <input
                          type="text"
                          placeholder="Search positions..."
                          value={positionsSearchQuery}
                          onChange={(e) => setPositionsSearchQuery(e.target.value)}
                          className={styles.posSearchInput}
                        />
                      </div>

                      {/* Filter Pills */}
                      <div className={styles.posFilterSegment}>
                        {(["All", "Tokens", "Perps"] as const).map((tab) => (
                          <button
                            key={tab}
                            className={`${styles.posFilterBtn} ${
                              positionsFilter === tab ? styles.posFilterBtnActive : ""
                            }`}
                            onClick={() => setPositionsFilter(tab)}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>

                      {/* View Mode Toggle Buttons */}
                      <div className={styles.viewModeToggleGroup}>
                        <button
                          className={`${styles.viewToggleBtn} ${
                            positionsViewMode === "grid" ? styles.viewToggleBtnActive : ""
                          }`}
                          onClick={() => setPositionsViewMode("grid")}
                          title="Grid view"
                        >
                          <LayoutGrid size={15} />
                        </button>
                        <button
                          className={`${styles.viewToggleBtn} ${
                            positionsViewMode === "list" ? styles.viewToggleBtnActive : ""
                          }`}
                          onClick={() => setPositionsViewMode("list")}
                          title="List view"
                        >
                          <List size={15} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Render Grid Mode or List Mode */}
                  {positionsViewMode === "grid" ? (
                    <div className={styles.positionsGrid}>
                      {filteredBlueprintPositions.map((pos) => (
                        <div
                          key={pos.id}
                          className={styles.positionGridCard}
                          onClick={() => showToast(`Navigating to ${pos.name} (${pos.ticker}) market terminal`)}
                        >
                          {/* Card Top Row: Avatar, Name, Badge, 3-Dots */}
                          <div className={styles.posGridCardTop}>
                            <div className={styles.posGridCardLeft}>
                              <div className={styles.posAvatarCircle}>
                                {pos.isCustomImg ? (
                                  <img
                                    src={pos.avatar}
                                    alt={pos.name}
                                    className={styles.posAvatarCircleImg}
                                  />
                                ) : (
                                  <span>{pos.avatar}</span>
                                )}
                              </div>
                              <div>
                                <div className={styles.posNameBadgeRow}>
                                  <span className={styles.posCardTitle}>{pos.name}</span>
                                  <span
                                    className={
                                      pos.isPerp ? styles.posTypeBadgePerp : styles.posTypeBadge
                                    }
                                  >
                                    {pos.typeBadge}
                                  </span>
                                </div>
                                <div className={styles.posCardMetaSub}>{pos.amountSub}</div>
                              </div>
                            </div>

                            <button
                              className={styles.posCardMenuBtn}
                              onClick={(e) => {
                                e.stopPropagation();
                                showToast(`${pos.name} options`);
                              }}
                              title="More options"
                            >
                              <MoreVertical size={15} />
                            </button>
                          </div>

                          {/* Card Middle: Position Value */}
                          <div className={styles.posGridCardValueSection}>
                            <span className={styles.posGridCardValueLabel}>Position Value</span>
                            <span className={styles.posGridCardValue}>{pos.value}</span>
                          </div>

                          {/* Card Bottom: P&L + Sparkline */}
                          <div className={styles.posGridCardBottom}>
                            <div className={styles.posCardPnlCol}>
                              <span className={styles.posCardPnlLabel}>P&L</span>
                              <span
                                className={
                                  pos.isPositive ? styles.posCardPnlValGreen : styles.posCardPnlValRed
                                }
                              >
                                {pos.pnlDollar} ({pos.pnlPercent})
                              </span>
                            </div>

                            {/* Sparkline Graph */}
                            {pos.sparkline === "up" ? (
                              <svg className={styles.posCardSparkline} viewBox="0 0 76 24" fill="none">
                                <path
                                  d="M 2 20 C 14 19 24 16 34 16 C 44 16 52 10 62 8 C 68 6 72 3 74 2"
                                  stroke="#ffffff"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                              </svg>
                            ) : (
                              <svg className={styles.posCardSparkline} viewBox="0 0 76 24" fill="none">
                                <path
                                  d="M 2 4 C 14 5 24 8 34 10 C 44 12 52 16 62 18 C 68 20 72 22 74 22"
                                  stroke="#ffffff"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                      ))}

                      {/* 6th Card: Explore More Tokens Card */}
                      <div
                        className={styles.exploreTokensCard}
                        onClick={() => showToast("Exploring all available tokens & opportunities...")}
                      >
                        <div className={styles.explorePlusCircle}>
                          <Plus size={19} />
                        </div>
                        <div>
                          <h4 className={styles.exploreTitle}>Explore more tokens</h4>
                          <p className={styles.exploreSub}>Discover new opportunities</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* List Mode Table */
                    <div className={styles.positionsListWrap}>
                      <table className={styles.positionsTable}>
                        <thead>
                          <tr>
                            <th className={styles.positionsTh}>Asset</th>
                            <th className={styles.positionsTh}>Type</th>
                            <th className={styles.positionsTh}>Holdings / Size</th>
                            <th className={styles.positionsTh}>Position Value</th>
                            <th className={styles.positionsTh}>P&L</th>
                            <th className={styles.positionsTh}>Trend</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredBlueprintPositions.map((pos) => (
                            <tr
                              key={pos.id}
                              className={styles.positionsTr}
                              onClick={() => showToast(`Navigating to ${pos.name} (${pos.ticker}) terminal`)}
                            >
                              <td className={styles.positionsTd}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                  <div className={styles.posAvatarCircle} style={{ width: 28, height: 28, fontSize: 13 }}>
                                    {pos.isCustomImg ? (
                                      <img src={pos.avatar} alt={pos.name} className={styles.posAvatarCircleImg} />
                                    ) : (
                                      <span>{pos.avatar}</span>
                                    )}
                                  </div>
                                  <span style={{ fontWeight: 600, color: "var(--text-primary, #ffffff)" }}>{pos.name}</span>
                                </div>
                              </td>
                              <td className={styles.positionsTd}>
                                <span className={pos.isPerp ? styles.posTypeBadgePerp : styles.posTypeBadge}>
                                  {pos.typeBadge}
                                </span>
                              </td>
                              <td className={styles.positionsTd} style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary, #c2c2c2)" }}>
                                {pos.amountSub}
                              </td>
                              <td className={styles.positionsTd} style={{ fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--text-primary, #ffffff)" }}>
                                {pos.value}
                              </td>
                              <td className={styles.positionsTd}>
                                <span className={pos.isPositive ? styles.posCardPnlValGreen : styles.posCardPnlValRed}>
                                  {pos.pnlDollar} ({pos.pnlPercent})
                                </span>
                              </td>
                              <td className={styles.positionsTd}>
                                {pos.sparkline === "up" ? (
                                  <svg style={{ width: 60, height: 18 }} viewBox="0 0 76 24" fill="none">
                                    <path d="M 2 20 C 14 19 24 16 34 16 C 44 16 52 10 62 8 C 68 6 72 3 74 2" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                                  </svg>
                                ) : (
                                  <svg style={{ width: 60, height: 18 }} viewBox="0 0 76 24" fill="none">
                                    <path d="M 2 4 C 14 5 24 8 34 10 C 44 12 52 16 62 18 C 68 20 72 22 74 22" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                                  </svg>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* 4. BOTTOM SECTION: RECENT ACTIVITY & DISCOVER NEXT OPPORTUNITY */}
                <div className={styles.bottomGrid}>
                  {/* Left Column: Recent Activity Card */}
                  <div className={styles.recentActivityCard}>
                    <div className={styles.recentActivityHeader}>
                      <h4 className={styles.recentActivityTitle}>Recent Activity</h4>

                      {/* Activity Segment Filters */}
                      <div className={styles.activityTabsSegment}>
                        {(["All", "Trades", "Transfers", "Deposits"] as const).map((tab) => (
                          <button
                            key={tab}
                            className={`${styles.activityTabBtn} ${
                              activityFilter === tab ? styles.activityTabBtnActive : ""
                            }`}
                            onClick={() => setActivityFilter(tab)}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>

                      <button
                        className={styles.viewAllActivityLink}
                        onClick={() => showToast("Opening full transaction history...")}
                      >
                        <span>View all</span>
                        <ChevronRight size={13} />
                      </button>
                    </div>

                    {/* Activity Table */}
                    <div className={styles.activityTableWrap}>
                      <table className={styles.activityTable}>
                        <thead>
                          <tr>
                            <th className={styles.activityTh}>Time</th>
                            <th className={styles.activityTh}>Token</th>
                            <th className={styles.activityTh}>Action</th>
                            <th className={styles.activityTh}>Amount</th>
                            <th className={styles.activityTh}>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredBlueprintActivities.length === 0 ? (
                            <tr>
                              <td colSpan={5} className={styles.emptyStateRow}>
                                No recent activity found in this category
                              </td>
                            </tr>
                          ) : (
                            filteredBlueprintActivities.map((act) => (
                              <tr
                                key={act.id}
                                className={styles.activityTr}
                                onClick={() => showToast(`${act.tokenName} transaction detail opened`)}
                              >
                                <td className={`${styles.activityTd} ${styles.activityTimeCell}`}>
                                  {act.time}
                                </td>
                                <td className={styles.activityTd}>
                                  <div className={styles.activityTokenCell}>
                                    {act.isPair ? (
                                      <div className={styles.activityPairAvatarGroup}>
                                        <div className={styles.activityPairAvatar}>
                                          {act.pairFrom}
                                        </div>
                                        <span className={styles.activityPairArrow}>→</span>
                                        <div className={styles.activityPairAvatar}>
                                          {act.pairTo}
                                        </div>
                                      </div>
                                    ) : act.isDepositIcon ? (
                                      <div className={styles.activityTokenAvatar}>
                                        <CreditCard size={12} color="var(--text-secondary, #c2c2c2)" />
                                      </div>
                                    ) : act.tokenAvatar ? (
                                      <img
                                        src={act.tokenAvatar}
                                        alt={act.tokenName}
                                        className={styles.activityTokenAvatar}
                                      />
                                    ) : null}
                                    <span className={styles.activityTokenName}>{act.tokenName}</span>
                                  </div>
                                </td>
                                <td className={styles.activityTd}>
                                  {act.action === "Buy" && (
                                    <span className={styles.activityBadgeBuy}>Buy</span>
                                  )}
                                  {act.action === "Swap" && (
                                    <span className={styles.activityBadgeSwap}>Swap</span>
                                  )}
                                  {act.action === "Deposit" && (
                                    <span className={styles.activityBadgeDeposit}>Deposit</span>
                                  )}
                                </td>
                                <td className={`${styles.activityTd} ${styles.activityAmountCell}`}>
                                  {act.amount}
                                </td>
                                <td className={`${styles.activityTd} ${styles.activityValueCell}`}>
                                  {act.value}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Right Column: Discover Next Opportunity Card */}
                  <div className={styles.discoverOpportunityCard}>
                    {/* Contoured Waves Background Overlay */}
                    <svg
                      className={styles.discoverWaveCanvas}
                      viewBox="0 0 300 220"
                      preserveAspectRatio="none"
                      fill="none"
                    >
                      <path
                        d="M 0 140 C 60 110 120 180 200 130 C 260 90 280 40 300 20 L 300 220 L 0 220 Z"
                        fill="url(#discoverGradArea)"
                      />
                      <path
                        d="M 0 160 C 80 140 140 210 220 150 C 270 110 290 70 300 50"
                        stroke="rgba(255, 255, 255, 0.14)"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M 0 180 C 90 170 160 220 240 170 C 280 140 295 100 300 80"
                        stroke="rgba(255, 255, 255, 0.08)"
                        strokeWidth="1.2"
                      />
                      <defs>
                        <linearGradient id="discoverGradArea" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.03" />
                          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.12" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <div className={styles.discoverCardContent}>
                      <span className={styles.discoverEyebrow}>DISCOVER</span>
                      <h4 className={styles.discoverTitle}>{"Find the\nnext opportunity"}</h4>
                      <p className={styles.discoverDesc}>
                        Explore trending tokens, new markets and top traders.
                      </p>
                    </div>

                    <button
                      className={styles.discoverActionBtn}
                      onClick={() => showToast("Opening Market Explorer...")}
                      title="Explore opportunities"
                    >
                      <ArrowRight size={17} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 1: WALLET */}
            {activeTab === "wallet" && (
              <div className={styles.profileContainer}>
                {/* Top 4 Balance Metric Cards Row (without subtext) */}
                {renderBalanceCards(false)}

                {/* 3 Quick Action Cards Row */}
                <div className={styles.actionCardsRow}>
                  {/* Card 1: Deposit */}
                  <div className={styles.actionCard}>
                    <div className={styles.actionCardTop}>
                      <div className={`${styles.actionIconWrap} ${styles.actionIconWrapDeposit}`}>
                        <ArrowDownToLine size={18} />
                      </div>
                      <span className={styles.actionBadgeGreen}>Instant EVM</span>
                    </div>
                    <div className={styles.actionCardBody}>
                      <h4 className={styles.actionCardTitle}>Deposit</h4>
                      <p className={styles.actionCardDesc}>
                        Deposit crypto or fiat into your account via EVM or Solana networks
                      </p>
                    </div>
                    <button
                      className={styles.actionBtnDeposit}
                      onClick={() => setIsDepositModalOpen(true)}
                    >
                      <span>Deposit</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Card 2: Withdraw */}
                  <div className={styles.actionCard}>
                    <div className={styles.actionCardTop}>
                      <div className={`${styles.actionIconWrap} ${styles.actionIconWrapWithdraw}`}>
                        <ArrowUpRight size={18} />
                      </div>
                    </div>
                    <div className={styles.actionCardBody}>
                      <h4 className={styles.actionCardTitle}>Withdraw</h4>
                      <p className={styles.actionCardDesc}>
                        Withdraw funds directly to external Web3 wallets or bank accounts
                      </p>
                    </div>
                    <button
                      className={styles.actionBtnSecondary}
                      onClick={() => showToast("Withdrawal portal: enter destination address")}
                    >
                      <span>Withdraw</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  {/* Card 3: Transfer */}
                  <div className={styles.actionCard}>
                    <div className={styles.actionCardTop}>
                      <div className={`${styles.actionIconWrap} ${styles.actionIconWrapTransfer}`}>
                        <ArrowLeftRight size={18} />
                      </div>
                      <span className={styles.actionBadgeBlue}>Internal</span>
                    </div>
                    <div className={styles.actionCardBody}>
                      <h4 className={styles.actionCardTitle}>Transfer</h4>
                      <p className={styles.actionCardDesc}>
                        Instant zero-fee transfer between Main, Crypto, Hyperliquid, and Aster balances
                      </p>
                    </div>
                    <button
                      className={styles.actionBtnSecondary}
                      onClick={() => setIsTransferModalOpen(true)}
                    >
                      <span>Transfer</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

                {/* Bottom Card: Wallet Activity (Recent) */}
                <div className={styles.activityCard}>
                  <div className={styles.activityHeaderRow}>
                    <div className={styles.activityHeaderLeft}>
                      <div className={styles.activityTitleRow}>
                        <span className={styles.activityMainTitle}>Wallet Activity</span>
                        <span className={styles.activityRecentTag}>(Recent)</span>
                      </div>
                      <span className={styles.activitySubtitle}>
                        Recent deposits, withdrawals, and internal transfers across accounts.
                      </span>
                    </div>

                    <div className={styles.activityFilters}>
                      {(["All Activity", "Deposits", "Transfers"] as const).map((filter) => (
                        <button
                          key={filter}
                          className={`${styles.activityFilterBtn} ${
                            walletActivityFilter === filter ? styles.activityFilterBtnActive : ""
                          }`}
                          onClick={() => setWalletActivityFilter(filter)}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Activity Items List */}
                  <div className={styles.activityList}>
                    {filteredWalletActivities.map((act) => (
                      <div key={act.id} className={styles.activityRow}>
                        <div className={styles.activityRowLeft}>
                          <div
                            className={styles.activityIconCircle}
                            style={{
                              backgroundColor:
                                act.type === "deposit"
                                  ? "var(--color-chart-bullish-fill, rgba(47, 203, 115, 0.12))"
                                  : "var(--neutral-800, #1c1c1c)",
                              color:
                                act.type === "deposit"
                                  ? "var(--emerald-400, #56d68f)"
                                  : "var(--neutral-200, #c2c2c2)",
                              border:
                                act.type === "deposit"
                                  ? "var(--border-width-default) solid rgba(47, 203, 115, 0.30)"
                                  : "var(--border-width-default) solid var(--border-color-default, rgba(228, 228, 228, 0.10))",
                            }}
                          >
                            {act.type === "deposit" ? (
                              <ArrowDownToLine size={15} />
                            ) : act.type === "transfer" ? (
                              <ArrowLeftRight size={15} />
                            ) : (
                              <ArrowUpRight size={15} />
                            )}
                          </div>
                          <div className={styles.activityMeta}>
                            <div className={styles.activityNameRow}>
                              <span className={styles.activityName}>{act.title}</span>
                              <span
                                className={
                                  act.badgeType === "completed"
                                    ? styles.activityBadgeCompleted
                                    : act.badgeType === "instant"
                                    ? styles.activityBadgeInstant
                                    : styles.activityBadgeConfirmed
                                }
                              >
                                {act.badge}
                              </span>
                            </div>
                            <span className={styles.activitySub}>
                              {act.networkOrRoute} • {act.timeAgo}
                            </span>
                          </div>
                        </div>

                        <div className={styles.activityRowRight}>
                          <span
                            className={styles.activityAmount}
                            style={{ color: act.amountColor }}
                          >
                            {act.amount}
                          </span>
                          <span
                            className={styles.activityFee}
                            style={{
                              color:
                                act.feeOrAddress.includes("Free")
                                  ? "var(--emerald-400, #56d68f)"
                                  : undefined,
                            }}
                          >
                            {act.feeOrAddress}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 2 & 3 in standard panelCard container */}
            {(activeTab === "userInfo" || activeTab === "exchanges") && (
              <div className={styles.panelCard}>
                {/* VIEW 2: USER INFO (Screenshot 4) */}
                {activeTab === "userInfo" && (
                  <div className={styles.userInfoCenterWrap}>
                    <div className={styles.userInfoIconCircle}>
                      <Info size={22} />
                    </div>
                    <h3 className={styles.userInfoMainHeading}>User Info & Preferences</h3>
                    <p className={styles.userInfoSubHeading}>
                      Manage your personal details, security settings, and notification alerts.
                    </p>
                    <button
                      className={styles.returnProfileBtn}
                      onClick={() => setActiveTab("profile")}
                    >
                      Return to Profile
                    </button>
                  </div>
                )}

              {/* VIEW 2: EXCHANGE ACCOUNTS (All Exchanges Shown Inside View) */}
              {activeTab === "exchanges" && (
                <>
                  {/* Top Header Row */}
                  <div className={styles.exchangeHeaderRow}>
                    <div className={styles.exchangeHeaderLeft}>
                      <span className={styles.exchangeHeaderTitle}>Exchange Accounts</span>
                      <span className={styles.exchangeHeaderSub}>
                        Manage connected exchange API keys and multi-venue trade execution routing.
                      </span>
                    </div>
                    <button
                      className={styles.actionBtn}
                      onClick={() => {
                        if (selectedExchangeFilter !== "all") {
                          setTargetExchangeId(selectedExchangeFilter);
                        }
                        setIsConnectModalOpen(true);
                      }}
                      title="Connect exchange account"
                    >
                      <Plus size={13} />
                      <span>CONNECT ACCOUNT</span>
                    </button>
                  </div>

                  {/* Horizontal Exchange Filter Pills */}
                  <div className={styles.exchangeFilterBar}>
                    <button
                      className={`${styles.exchangeFilterPill} ${
                        selectedExchangeFilter === "all" ? styles.exchangeFilterPillActive : ""
                      }`}
                      onClick={() => setSelectedExchangeFilter("all")}
                    >
                      <span>All Accounts</span>
                      <span className={styles.countBadge}>({accounts.length})</span>
                    </button>

                    {EXCHANGES.map((ex) => {
                      const count = getExchangeCount(ex.id);
                      return (
                        <button
                          key={ex.id}
                          className={`${styles.exchangeFilterPill} ${
                            selectedExchangeFilter === ex.id ? styles.exchangeFilterPillActive : ""
                          }`}
                          onClick={() => setSelectedExchangeFilter(ex.id)}
                        >
                          <span className={styles.exchangeIconWrap}>{ExchangeIcons[ex.iconKey]}</span>
                          <span>{ex.name}</span>
                          <span className={styles.countBadge}>({count})</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Connected Accounts for Selected Filter */}
                  {filteredAccounts.length > 0 && (
                    <div className={styles.connectedAccountsList}>
                      {filteredAccounts.map((acc) => (
                        <div key={acc.id} className={styles.accountCard}>
                          <div className={styles.accountCardLeft}>
                            <div className={styles.accountLogoBox}>
                              {ExchangeIcons[acc.exchangeId] || <Box size={14} />}
                            </div>
                            <div className={styles.accountInfo}>
                              <span className={styles.accountName}>{acc.accountLabel}</span>
                              <div className={styles.accountMeta}>
                                <span className={styles.statusDot} />
                                <span>{acc.apiKeyMasked}</span>
                                <span>·</span>
                                <span>{acc.connectedAt}</span>
                              </div>
                            </div>
                          </div>
                          <div className={styles.accountCardRight}>
                            <span className={styles.permBadge}>{acc.permission}</span>
                            <button
                              className={styles.disconnectBtn}
                              onClick={() => handleDisconnect(acc.id, acc.accountLabel)}
                            >
                              Disconnect
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Supported Exchanges Directory Grid */}
                  <div className={styles.exchangesDirectoryGrid}>
                    {EXCHANGES.filter(
                      (ex) => selectedExchangeFilter === "all" || selectedExchangeFilter === ex.id
                    ).map((ex) => {
                      const isConnected = accounts.some((a) => a.exchangeId === ex.id);
                      const count = getExchangeCount(ex.id);
                      return (
                        <div key={ex.id} className={styles.exchangeDirectoryCard}>
                          <div className={styles.exchangeDirLeft}>
                            <div className={styles.exchangeDirIcon}>
                              {ExchangeIcons[ex.iconKey]}
                            </div>
                            <div className={styles.exchangeDirMeta}>
                              <span className={styles.exchangeDirName}>{ex.name}</span>
                              <span
                                className={`${styles.exchangeDirStatus} ${
                                  isConnected ? styles.exchangeDirStatusActive : ""
                                }`}
                              >
                                {isConnected ? `${count} Connected` : "Not connected"}
                              </span>
                            </div>
                          </div>
                          <button
                            className={styles.exchangeConnectSmallBtn}
                            onClick={() => {
                              setTargetExchangeId(ex.id);
                              setIsConnectModalOpen(true);
                            }}
                          >
                            <Plus size={11} />
                            <span>{isConnected ? "Add Account" : "Connect"}</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}
        </main>
      </div>

        {/* Sub-Dialog: Edit Profile Modal */}
        {isEditProfileOpen && (
          <div className={styles.subModalOverlay} onClick={() => setIsEditProfileOpen(false)}>
            <div className={styles.subModal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.subModalHeader}>
                <h3 className={styles.subModalTitle}>Edit Profile</h3>
                <button
                  className={styles.iconOnlyBtn}
                  onClick={() => setIsEditProfileOpen(false)}
                >
                  <X size={16} />
                </button>
              </div>

              <div className={styles.subModalField}>
                <label className={styles.subModalLabel}>Display Name</label>
                <input
                  type="text"
                  className={styles.subModalInput}
                  value={editNameInput}
                  onChange={(e) => setEditNameInput(e.target.value)}
                  placeholder="e.g. web3noob3"
                />
              </div>

              <div className={styles.subModalField}>
                <label className={styles.subModalLabel}>Handle / Username</label>
                <input
                  type="text"
                  className={styles.subModalInput}
                  value={editHandleInput}
                  onChange={(e) => setEditHandleInput(e.target.value)}
                  placeholder="e.g. @web3noob3"
                />
              </div>

              <div className={styles.subModalActions}>
                <button
                  className={styles.subModalCancelBtn}
                  onClick={() => setIsEditProfileOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className={styles.subModalSubmitBtn}
                  onClick={() => {
                    if (editNameInput.trim()) setProfileName(editNameInput.trim());
                    if (editHandleInput.trim()) {
                      const h = editHandleInput.trim().startsWith("@")
                        ? editHandleInput.trim()
                        : `@${editHandleInput.trim()}`;
                      setProfileHandle(h);
                    }
                    setIsEditProfileOpen(false);
                    showToast("Profile details updated");
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sub-Dialog: Connect Exchange Modal */}
        {isConnectModalOpen && (
          <div className={styles.subModalOverlay} onClick={() => setIsConnectModalOpen(false)}>
            <div className={styles.subModal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.subModalHeader}>
                <h3 className={styles.subModalTitle}>Connect Exchange Account</h3>
                <button
                  className={styles.iconOnlyBtn}
                  onClick={() => setIsConnectModalOpen(false)}
                >
                  <X size={16} />
                </button>
              </div>

              <div className={styles.subModalField}>
                <label className={styles.subModalLabel}>Select Exchange</label>
                <select
                  className={styles.subModalSelect}
                  value={targetExchangeId}
                  onChange={(e) => setTargetExchangeId(e.target.value)}
                >
                  {EXCHANGES.map((ex) => (
                    <option key={ex.id} value={ex.id}>
                      {ex.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.subModalField}>
                <label className={styles.subModalLabel}>Account Label</label>
                <input
                  type="text"
                  className={styles.subModalInput}
                  placeholder="e.g. Primary Trading, Bot 01"
                  value={accountLabelInput}
                  onChange={(e) => setAccountLabelInput(e.target.value)}
                />
              </div>

              <div className={styles.subModalField}>
                <label className={styles.subModalLabel}>API Key / Wallet Signature</label>
                <input
                  type="password"
                  className={styles.subModalInput}
                  placeholder="Enter API Key or Public Address"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                />
              </div>

              <div className={styles.subModalField}>
                <label className={styles.subModalLabel}>Permission Mode</label>
                <select
                  className={styles.subModalSelect}
                  value={permissionInput}
                  onChange={(e) =>
                    setPermissionInput(
                      e.target.value as "Read-Only" | "Trading" | "Full Access"
                    )
                  }
                >
                  <option value="Trading">Trading (Order Execution)</option>
                  <option value="Read-Only">Read-Only (Portfolio & Balances)</option>
                  <option value="Full Access">Full Access (Trade + Withdrawals)</option>
                </select>
              </div>

              <div className={styles.subModalActions}>
                <button
                  className={styles.subModalCancelBtn}
                  onClick={() => setIsConnectModalOpen(false)}
                >
                  Cancel
                </button>
                <button className={styles.subModalSubmitBtn} onClick={handleAddAccount}>
                  Connect Account
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sub-Dialog: Deposit Tokens Modal (Screenshot 3) */}
        {isDepositModalOpen && (
          <div className={styles.subModalOverlay} onClick={() => setIsDepositModalOpen(false)}>
            <div className={styles.depositModal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.depositModalHeader}>
                <h3 className={styles.depositModalTitle}>Deposit tokens</h3>
                <button
                  className={styles.iconOnlyBtn}
                  onClick={() => setIsDepositModalOpen(false)}
                  aria-label="Close deposit dialog"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Chain Type Selector Tabs (EVM / Solana) */}
              <div className={styles.depositTabsRow}>
                <button
                  className={`${styles.depositTabBtn} ${
                    depositChainType === "EVM" ? styles.depositTabBtnActive : ""
                  }`}
                  onClick={() => setDepositChainType("EVM")}
                >
                  EVM
                </button>
                <button
                  className={`${styles.depositTabBtn} ${
                    depositChainType === "Solana" ? styles.depositTabBtnActive : ""
                  }`}
                  onClick={() => setDepositChainType("Solana")}
                >
                  Solana
                </button>
              </div>

              {/* QR Code Card */}
              <div className={styles.depositQrCard}>
                <div className={styles.depositQrInner}>
                  <QrCodeVector />
                  <div className={styles.depositQrBadge}>
                    <IconI5Badge />
                  </div>
                </div>
              </div>

              {/* Address Field */}
              <div
                className={styles.depositAddressBox}
                onClick={() => {
                  const addr =
                    depositChainType === "EVM"
                      ? "0x487fbecc6b8ed61e5d5c28dea8f9a900ad6d6ec91"
                      : "6vGB8MtqZpL49P4eP3N9k2XN1Y5J3qL1oW9m6aqg2";
                  handleCopy(addr, `${depositChainType} deposit address`);
                }}
                title="Click to copy full address"
              >
                <span className={styles.depositAddressText}>
                  {depositChainType === "EVM"
                    ? "0x487fbecc6b8ed61e5d5c28dea8f9a900ad6d6..."
                    : "6vGB8MtqZpL49P4eP3N9k2XN1Y5J3qL1oW9m..."}
                </span>
                <div className={styles.depositCopyIconBtn}>
                  <Copy size={13} />
                </div>
              </div>

              {/* Supported Networks */}
              <div className={styles.supportedNetworksSection}>
                <span className={styles.supportedNetworksLabel}>Supported networks:</span>
                <div className={styles.supportedNetworksList}>
                  {depositChainType === "EVM" ? (
                    <>
                      <div className={styles.networkPill}>
                        <IconBNB />
                        <span>BNB</span>
                      </div>
                      <div className={styles.networkPill}>
                        <IconBase />
                        <span>Base</span>
                      </div>
                      <div className={styles.networkPill}>
                        <IconArbitrum />
                        <span>Arbitrum</span>
                      </div>
                      <div className={styles.networkPill}>
                        <IconRobinhood />
                        <span>Robinhood</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={styles.networkPill}>
                        <span style={{ color: "var(--neutral-200, #c2c2c2)", fontSize: "12px", lineHeight: 1 }}>◎</span>
                        <span>Solana</span>
                      </div>
                      <div className={styles.networkPill}>
                        <span style={{ color: "var(--neutral-200, #c2c2c2)", fontSize: "12px", lineHeight: 1 }}>🌑</span>
                        <span>Eclipse</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Notice */}
              <p className={styles.depositWarning}>
                Only deposit on supported chains. Deposits on unsupported networks may be lost.
              </p>

              {/* Action Button */}
              <button
                className={styles.depositCopyBtn}
                onClick={() => {
                  const addr =
                    depositChainType === "EVM"
                      ? "0x487fbecc6b8ed61e5d5c28dea8f9a900ad6d6ec91"
                      : "6vGB8MtqZpL49P4eP3N9k2XN1Y5J3qL1oW9m6aqg2";
                  handleCopy(addr, `${depositChainType} deposit address`);
                }}
              >
                Copy Address
              </button>
            </div>
          </div>
        )}

        {/* Sub-Dialog: Transfer Modal (Matching Reference Blueprint Flow) */}
        {isTransferModalOpen && (
          <div
            className={styles.subModalOverlay}
            onClick={() => {
              setIsTransferModalOpen(false);
              setIsFromDropdownOpen(false);
              setIsToDropdownOpen(false);
              setIsAssetDropdownOpen(false);
            }}
          >
            <div
              className={styles.transferModal}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {/* Header */}
              <div className={styles.transferHeader}>
                <div className={styles.transferHeaderLeft}>
                  <div className={styles.transferIconBox}>
                    <ArrowLeftRight size={18} />
                  </div>
                  <div className={styles.transferTitleGroup}>
                    <div className={styles.transferTitleRow}>
                      <h3 className={styles.transferTitle}>Transfer</h3>
                      <span className={styles.transferZeroFeeBadge}>ZERO FEE</span>
                    </div>
                    <p className={styles.transferSubtitle}>
                      Instant zero-gas internal routing
                    </p>
                  </div>
                </div>
                <button
                  className={styles.iconOnlyBtn}
                  onClick={() => setIsTransferModalOpen(false)}
                  aria-label="Close transfer dialog"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Routing Stack: FROM ACCOUNT & TO DESTINATION with Center Swap */}
              <div className={styles.transferRoutingStack}>
                {/* FROM ACCOUNT Card */}
                <div className={styles.transferAccountCard}>
                  <div className={styles.transferCardMetaRow}>
                    <span className={styles.transferFieldLabel}>From Account</span>
                    <span className={styles.transferAvailText}>
                      Avail:{" "}
                      <span className={styles.transferAvailNum}>
                        {fromAccount.avail}
                      </span>
                    </span>
                  </div>

                  <div
                    className={styles.transferAccountBox}
                    onClick={() => {
                      setIsFromDropdownOpen(!isFromDropdownOpen);
                      setIsToDropdownOpen(false);
                      setIsAssetDropdownOpen(false);
                    }}
                  >
                    <div className={styles.transferAccountLeft}>
                      {/* Exchange Logo in From Account Input */}
                      <div className={styles.transferExchangeLogoWrap}>
                        {renderAccountIcon(fromAccount, 16)}
                      </div>
                      <span className={styles.transferAccountName}>
                        {fromAccount.name}
                      </span>
                    </div>
                    <div className={styles.transferChevronBox}>
                      <ChevronDown
                        size={15}
                        style={{
                          transform: isFromDropdownOpen ? "rotate(180deg)" : "none",
                          transition: "transform 0.15s ease",
                        }}
                      />
                    </div>
                  </div>

                  {/* From Account Dropdown */}
                  {isFromDropdownOpen && (
                    <div className={styles.transferDropdownMenu}>
                      {TRANSFER_ACCOUNTS.map((acc) => (
                        <div
                          key={acc.id}
                          className={`${styles.transferDropdownItem} ${
                            acc.id === fromAccount.id ? styles.transferDropdownItemActive : ""
                          }`}
                          onClick={() => {
                            setFromAccount(acc);
                            setIsFromDropdownOpen(false);
                          }}
                        >
                          <div className={styles.transferDropdownItemLeft}>
                            <div className={styles.transferExchangeLogoWrapSmall}>
                              {renderAccountIcon(acc, 13)}
                            </div>
                            <div>
                              <div className={styles.transferDropdownItemName}>{acc.name}</div>
                              <div className={styles.transferDropdownItemSub}>{acc.sub}</div>
                            </div>
                          </div>
                          <span className={styles.transferDropdownItemBal}>{acc.avail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Central Swap Invert Button */}
                <div className={styles.transferSwapWrap}>
                  <button
                    type="button"
                    className={styles.transferSwapBtn}
                    onClick={() => {
                      const temp = fromAccount;
                      setFromAccount(toAccount);
                      setToAccount(temp);
                      setIsFromDropdownOpen(false);
                      setIsToDropdownOpen(false);
                    }}
                    title="Swap accounts"
                    aria-label="Swap accounts"
                  >
                    <ArrowUpDown size={14} />
                  </button>
                </div>

                {/* TO DESTINATION Card */}
                <div className={styles.transferAccountCard}>
                  <div className={styles.transferCardMetaRow}>
                    <span className={styles.transferFieldLabel}>To Destination</span>
                    <span className={styles.transferAvailText}>
                      Current:{" "}
                      <span className={styles.transferAvailNum}>
                        {toAccount.avail}
                      </span>
                    </span>
                  </div>

                  <div
                    className={styles.transferAccountBox}
                    onClick={() => {
                      setIsToDropdownOpen(!isToDropdownOpen);
                      setIsFromDropdownOpen(false);
                      setIsAssetDropdownOpen(false);
                    }}
                  >
                    <div className={styles.transferAccountLeft}>
                      <div className={styles.transferExchangeLogoWrap}>
                        {renderAccountIcon(toAccount, 16)}
                      </div>
                      <span className={styles.transferAccountName}>
                        {toAccount.name}
                      </span>
                    </div>
                    <div className={styles.transferChevronBox}>
                      <ChevronDown
                        size={15}
                        style={{
                          transform: isToDropdownOpen ? "rotate(180deg)" : "none",
                          transition: "transform 0.15s ease",
                        }}
                      />
                    </div>
                  </div>

                  {/* To Destination Dropdown */}
                  {isToDropdownOpen && (
                    <div className={styles.transferDropdownMenu}>
                      {TRANSFER_ACCOUNTS.map((acc) => (
                        <div
                          key={acc.id}
                          className={`${styles.transferDropdownItem} ${
                            acc.id === toAccount.id ? styles.transferDropdownItemActive : ""
                          }`}
                          onClick={() => {
                            setToAccount(acc);
                            setIsToDropdownOpen(false);
                          }}
                        >
                          <div className={styles.transferDropdownItemLeft}>
                            <div className={styles.transferExchangeLogoWrapSmall}>
                              {renderAccountIcon(acc, 13)}
                            </div>
                            <div>
                              <div className={styles.transferDropdownItemName}>{acc.name}</div>
                              <div className={styles.transferDropdownItemSub}>{acc.sub}</div>
                            </div>
                          </div>
                          <span className={styles.transferDropdownItemBal}>{acc.avail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* SELECT ASSET Card */}
              <div className={styles.transferAssetCard}>
                <div className={styles.transferCardMetaRow}>
                  <span className={styles.transferFieldLabel}>Select Asset</span>
                  <span className={styles.transferAvailText}>
                    Avail:{" "}
                    <span className={styles.transferAvailNum}>
                      {selectedTransferAsset.avail.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      {selectedTransferAsset.symbol}
                    </span>
                  </span>
                </div>

                <div
                  className={styles.transferAssetBox}
                  onClick={() => {
                    setIsAssetDropdownOpen(!isAssetDropdownOpen);
                    setIsFromDropdownOpen(false);
                    setIsToDropdownOpen(false);
                  }}
                >
                  <div className={styles.transferAssetLeft}>
                    {selectedTransferAsset.symbol === "USDC" ? (
                      <IconUSDC size={28} />
                    ) : (
                      <div className={styles.transferExchangeLogoWrap}>
                        <span style={{ fontSize: "12px", fontWeight: 700 }}>
                          {selectedTransferAsset.symbol.slice(0, 3)}
                        </span>
                      </div>
                    )}
                    <div className={styles.transferAssetDetails}>
                      <span className={styles.transferAssetName}>
                        {selectedTransferAsset.name}
                      </span>
                      <span className={styles.transferAssetSub}>
                        {selectedTransferAsset.network}
                      </span>
                    </div>
                  </div>
                  <div className={styles.transferChevronBox}>
                    <ChevronDown
                      size={15}
                      style={{
                        transform: isAssetDropdownOpen ? "rotate(180deg)" : "none",
                        transition: "transform 0.15s ease",
                      }}
                    />
                  </div>
                </div>

                {/* Asset Dropdown */}
                {isAssetDropdownOpen && (
                  <div className={styles.transferDropdownMenu}>
                    {TRANSFER_ASSETS.map((asset) => (
                      <div
                        key={asset.symbol}
                        className={`${styles.transferDropdownItem} ${
                          asset.symbol === selectedTransferAsset.symbol ? styles.transferDropdownItemActive : ""
                        }`}
                        onClick={() => {
                          setSelectedTransferAsset(asset);
                          setIsAssetDropdownOpen(false);
                        }}
                      >
                        <div className={styles.transferDropdownItemLeft}>
                          {asset.symbol === "USDC" ? (
                            <IconUSDC size={22} />
                          ) : (
                            <div className={styles.transferExchangeLogoWrapSmall}>
                              <span style={{ fontSize: "11px", fontWeight: 700 }}>
                                {asset.symbol.slice(0, 3)}
                              </span>
                            </div>
                          )}
                          <div>
                            <div className={styles.transferDropdownItemName}>{asset.name}</div>
                            <div className={styles.transferDropdownItemSub}>{asset.network}</div>
                          </div>
                        </div>
                        <span className={styles.transferDropdownItemBal}>
                          {asset.avail.toLocaleString()} {asset.symbol}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* TRANSFER AMOUNT Card */}
              <div className={styles.transferAmountCard}>
                <div className={styles.transferCardMetaRow}>
                  <span className={styles.transferFieldLabel}>Transfer Amount</span>
                  <span className={styles.transferInstantBadge}>
                    <span className={styles.transferInstantDot} /> Instant Settlement
                  </span>
                </div>

                <div className={styles.transferAmountInputWrap}>
                  <div className={styles.transferAmountInputRow}>
                    <input
                      type="text"
                      className={styles.transferAmountInput}
                      value={transferAmount}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === "" || /^\d*\.?\d*$/.test(val)) {
                          setTransferAmount(val);
                        }
                      }}
                      placeholder="0"
                    />
                    <div className={styles.transferAmountRight}>
                      <span className={styles.transferTokenTicker}>
                        {selectedTransferAsset.symbol}
                      </span>
                      <button
                        type="button"
                        className={styles.transferMaxBtn}
                        onClick={() => setTransferAmount(selectedTransferAsset.avail.toString())}
                      >
                        MAX
                      </button>
                    </div>
                  </div>
                  <span className={styles.transferAmountUsdSub}>
                    ≈ $
                    {(
                      (parseFloat(transferAmount) || 0) * selectedTransferAsset.price
                    ).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    USD
                  </span>
                </div>

                {/* Percentage Selector Row */}
                <div className={styles.transferPercentRow}>
                  {[25, 50, 75, 100].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      className={styles.transferPercentBtn}
                      onClick={() => {
                        const calculated = ((selectedTransferAsset.avail * pct) / 100).toFixed(2);
                        setTransferAmount(calculated);
                      }}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Routing & Summary Box */}
              <div className={styles.transferSummaryBox}>
                <div className={styles.transferSummaryRow}>
                  <span className={styles.transferSummaryLabel}>Route</span>
                  <span className={styles.transferSummaryVal}>
                    {fromAccount.name.replace(/\s*\(.*\)/, "")}{" "}
                    <ArrowRight size={12} />{" "}
                    {toAccount.name.replace(/\s*\(.*\)/, "")}
                  </span>
                </div>
                <div className={styles.transferSummaryRow}>
                  <span className={styles.transferSummaryLabel}>Internal Network Fee</span>
                  <span className={styles.transferSummaryFeeFree}>$0.00 (Free)</span>
                </div>
                <div className={styles.transferSummaryRow}>
                  <span className={styles.transferSummaryLabel}>Estimated Execution</span>
                  <span className={styles.transferSummaryVal}>&lt; 1 sec</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                className={styles.transferConfirmBtn}
                onClick={() => {
                  const num = parseFloat(transferAmount);
                  if (!num || num <= 0) {
                    showToast("Please enter an amount to transfer");
                    return;
                  }
                  showToast(
                    `Transferred ${num.toLocaleString()} ${selectedTransferAsset.symbol} from ${fromAccount.name.replace(/\s*\(.*\)/, "")} to ${toAccount.name.replace(/\s*\(.*\)/, "")}`
                  );
                  setIsTransferModalOpen(false);
                  setTransferAmount("");
                  setIsFromDropdownOpen(false);
                  setIsToDropdownOpen(false);
                  setIsAssetDropdownOpen(false);
                }}
              >
                <span>Confirm Transfer</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* Toast Feedback */}
        {toastMessage && (
          <div className={styles.toast}>
            <Check size={14} color="var(--emerald-400, #56d68f)" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}
