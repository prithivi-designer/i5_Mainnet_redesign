"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Wallet,
  Bell,
  Activity,
  Globe,
  MessageCircle,
  Copy,
  Check,
  Upload,
  Download,
  Plus,
  ExternalLink,
  X,
  Zap,
  TrendingUp,
  BarChart2,
  Trash2,
  Rss,
  ArrowLeftRight,
  Clock,
  Calendar,
  CircleDollarSign,
} from "lucide-react";
import styles from "./MemeTrackersView.module.css";

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */
type ChainType = "solana" | "ethereum" | "base" | "bnb" | "arbitrum" | "polygon";

interface WalletEntry {
  id: string;
  label: string;
  address: string;
  chain: ChainType;
  balance: string;
  change24h: string;
  isUp: boolean;
  lastActive: string;        // Age, e.g. "1h", "2m"
  tokenCount: number;
  avatarInitials: string;
  avatarEmoji?: string;
  avatarColor: string;
  tags: string[];
  amount?: string;           // Amount, e.g. "0.021"
  timeLeft?: string;         // e.g. "3h"
  endsAtTime?: string;       // e.g. "12:45 PM"
  endsAtDate?: string;       // e.g. "May 28, 2025"
  notifyEnabled?: boolean;
  dotEnabled?: boolean;
  bubblesEnabled?: boolean;
  rssEnabled?: boolean;
  transfersEnabled?: boolean;
  chartEnabled?: boolean;
}

type AlertType = "buy" | "sell" | "new" | "social";

interface AlertItem {
  id: string;
  walletId: string;
  type: AlertType;
  chain: ChainType;
  tokenSymbol: string;
  tokenName: string;
  contract: string;
  avatarInitials: string;
  avatarBg: string;
  avatarType?: "brain" | "cat" | "moon" | "floki" | "pepe" | "wagmi" | "doge";
  relativeAge: string;       // e.g. "2h"
  createdAgo: string;        // e.g. "1m"
  mcap: string;              // e.g. "$6.29K"
  priceChange: string;       // e.g. "+0.026"
  priceSOL: string;          // Token price or delta
  isPositive: boolean;
  hasDex: boolean;
  hasClaim: boolean;
  hasTelegram: boolean;
  hasTwitter: boolean;
  hasWebsite: boolean;
  hasFeather?: boolean;
  hasMoneyBag?: boolean;
  description: string;
  volume: string;
  protocol: string;          // e.g. "BagsAMM", "SolWhale", "Raydium"
  protocolInitials: string;
  protocolBg: string;
  badgeType?: "timer" | "verified" | "claim" | null;
}

type SoundOption = "Default" | "Notification" | "Kaching" | "Bing" | "Ding" | "None";

/* ──────────────────────────────────────────────
   Mock data — Multi-Chain Profile Trackers
   ────────────────────────────────────────────── */
const MOCK_WALLETS: WalletEntry[] = [
  {
    id: "w1",
    label: "DEFAULT",
    address: "22FFo4…BAGS",
    chain: "solana",
    balance: "$12,430",
    change24h: "+18.4%",
    isUp: true,
    lastActive: "1h",
    tokenCount: 9,
    avatarInitials: "DF",
    avatarEmoji: "👻",
    avatarColor: "#2fcb73",
    tags: ["Smart Money"],
    amount: "0.021",
    timeLeft: "3h",
    endsAtTime: "12:45 PM",
    endsAtDate: "May 28, 2025",
    notifyEnabled: false,
    dotEnabled: true,
    bubblesEnabled: true,
    rssEnabled: true,
    transfersEnabled: true,
    chartEnabled: false,
  },
  {
    id: "w2",
    label: "Alphavybez",
    address: "0x8f3c…e4b1",
    chain: "ethereum",
    balance: "$34,210",
    change24h: "+12.1%",
    isUp: true,
    lastActive: "2m",
    tokenCount: 14,
    avatarInitials: "AV",
    avatarColor: "#8fe8b8",
    tags: ["KOL", "Whale"],
    amount: "2.450",
    timeLeft: "6h",
    endsAtTime: "04:15 PM",
    endsAtDate: "May 29, 2025",
    notifyEnabled: true,
    dotEnabled: true,
    bubblesEnabled: true,
    rssEnabled: false,
    transfersEnabled: true,
    chartEnabled: true,
  },
  {
    id: "w3",
    label: "BaseSniper #1",
    address: "0x12a9…7f3c",
    chain: "base",
    balance: "$8,950",
    change24h: "+41.8%",
    isUp: true,
    lastActive: "4m",
    tokenCount: 19,
    avatarInitials: "BS",
    avatarEmoji: "🔵",
    avatarColor: "#38bdf8",
    tags: ["Base", "Sniper"],
    amount: "4.120",
    timeLeft: "8h",
    endsAtTime: "08:30 PM",
    endsAtDate: "May 28, 2025",
    notifyEnabled: true,
    dotEnabled: true,
    bubblesEnabled: true,
    rssEnabled: true,
    transfersEnabled: true,
    chartEnabled: true,
  },
  {
    id: "w4",
    label: "BNB Master",
    address: "0xbb4c…19a3",
    chain: "bnb",
    balance: "$45,670",
    change24h: "+7.4%",
    isUp: true,
    lastActive: "14m",
    tokenCount: 8,
    avatarInitials: "BM",
    avatarEmoji: "🟡",
    avatarColor: "#f59e0b",
    tags: ["BNB", "Whale"],
    amount: "15.80",
    timeLeft: "1d",
    endsAtTime: "10:00 AM",
    endsAtDate: "May 30, 2025",
    notifyEnabled: false,
    dotEnabled: true,
    bubblesEnabled: true,
    rssEnabled: true,
    transfersEnabled: false,
    chartEnabled: true,
  },
  {
    id: "w5",
    label: "ArbiAlpha",
    address: "0x91d4…4c9a",
    chain: "arbitrum",
    balance: "$19,800",
    change24h: "-1.2%",
    isUp: false,
    lastActive: "32m",
    tokenCount: 6,
    avatarInitials: "AA",
    avatarColor: "#60a5fa",
    tags: ["Arbitrum", "L2"],
    amount: "1.890",
    timeLeft: "18h",
    endsAtTime: "11:00 AM",
    endsAtDate: "May 30, 2025",
    notifyEnabled: true,
    dotEnabled: false,
    bubblesEnabled: false,
    rssEnabled: true,
    transfersEnabled: true,
    chartEnabled: false,
  },
  {
    id: "w6",
    label: "PolyAccumulator",
    address: "0x7a2b…9f1c",
    chain: "polygon",
    balance: "$14,200",
    change24h: "+3.9%",
    isUp: true,
    lastActive: "1h",
    tokenCount: 11,
    avatarInitials: "PA",
    avatarColor: "#c084fc",
    tags: ["Polygon", "DeFi"],
    amount: "2,450",
    timeLeft: "2d",
    endsAtTime: "06:00 PM",
    endsAtDate: "Jun 01, 2025",
    notifyEnabled: true,
    dotEnabled: true,
    bubblesEnabled: true,
    rssEnabled: false,
    transfersEnabled: true,
    chartEnabled: true,
  },
];

const MOCK_ALERTS: AlertItem[] = [
  {
    id: "a1",
    walletId: "w1",
    type: "social",
    chain: "solana",
    tokenSymbol: "JOB",
    tokenName: "JOB",
    contract: "D6CZ…tZYS",
    avatarInitials: "JB",
    avatarBg: "#2fcb73",
    avatarType: "brain",
    relativeAge: "2h",
    createdAgo: "1m",
    mcap: "$6.29K",
    priceChange: "+0.026",
    priceSOL: "+0.026",
    isPositive: true,
    hasDex: true,
    hasClaim: true,
    hasTelegram: false,
    hasTwitter: true,
    hasWebsite: true,
    hasFeather: true,
    hasMoneyBag: true,
    description: "New social alert & BagsAMM liquidity locked",
    volume: "$8.2K",
    protocol: "BagsAMM",
    protocolInitials: "BA",
    protocolBg: "#17864a",
    badgeType: "timer",
  },
  {
    id: "a2",
    walletId: "w2",
    type: "buy",
    chain: "ethereum",
    tokenSymbol: "BONKCAT",
    tokenName: "Bonk Cat",
    contract: "0x9xbM…3rKp",
    avatarInitials: "BC",
    avatarBg: "#2fcb73",
    avatarType: "cat",
    relativeAge: "4m",
    createdAgo: "4m",
    mcap: "$42.5K",
    priceChange: "+0.042",
    priceSOL: "+0.042",
    isPositive: true,
    hasDex: true,
    hasClaim: true,
    hasTelegram: true,
    hasTwitter: true,
    hasWebsite: false,
    hasFeather: true,
    hasMoneyBag: true,
    description: "Alphavybez bought 1.2 ETH",
    volume: "$18.4K",
    protocol: "Uniswap",
    protocolInitials: "UN",
    protocolBg: "#8fe8b8",
    badgeType: "timer",
  },
  {
    id: "a3",
    walletId: "w3",
    type: "social",
    chain: "base",
    tokenSymbol: "MOON9",
    tokenName: "Moon Nine",
    contract: "0x6bPX…1mVn",
    avatarInitials: "M9",
    avatarBg: "#38bdf8",
    avatarType: "moon",
    relativeAge: "9m",
    createdAgo: "9m",
    mcap: "$18.2K",
    priceChange: "+0.018",
    priceSOL: "+0.018",
    isPositive: true,
    hasDex: false,
    hasClaim: true,
    hasTelegram: true,
    hasTwitter: false,
    hasWebsite: true,
    hasFeather: true,
    hasMoneyBag: true,
    description: "Base sniper signal & influencer endorsement",
    volume: "$5.4K",
    protocol: "Aerodrome",
    protocolInitials: "AE",
    protocolBg: "#0052FF",
    badgeType: "claim",
  },
  {
    id: "a4",
    walletId: "w4",
    type: "buy",
    chain: "bnb",
    tokenSymbol: "FLOKIDAO",
    tokenName: "Floki DAO",
    contract: "0x7hKM…5pXd",
    avatarInitials: "FD",
    avatarBg: "#f59e0b",
    avatarType: "floki",
    relativeAge: "22m",
    createdAgo: "15m",
    mcap: "$91.4K",
    priceChange: "+0.091",
    priceSOL: "+0.091",
    isPositive: true,
    hasDex: true,
    hasClaim: true,
    hasTelegram: false,
    hasTwitter: true,
    hasWebsite: true,
    hasFeather: true,
    hasMoneyBag: true,
    description: "BNB Master accumulated 15 BNB position",
    volume: "$31K",
    protocol: "PancakeSwap",
    protocolInitials: "PS",
    protocolBg: "#F0B90B",
    badgeType: "timer",
  },
  {
    id: "a5",
    walletId: "w5",
    type: "sell",
    chain: "arbitrum",
    tokenSymbol: "PEPEKING",
    tokenName: "Pepe King",
    contract: "0x3vQN…8kTs",
    avatarInitials: "PK",
    avatarBg: "#e13b3b",
    avatarType: "pepe",
    relativeAge: "17m",
    createdAgo: "17m",
    mcap: "$7.4K",
    priceChange: "-0.004",
    priceSOL: "-0.004",
    isPositive: false,
    hasDex: false,
    hasClaim: false,
    hasTelegram: true,
    hasTwitter: true,
    hasWebsite: false,
    hasFeather: false,
    hasMoneyBag: false,
    description: "Arbitrum pool detected",
    volume: "$980",
    protocol: "Camelot",
    protocolInitials: "CA",
    protocolBg: "#28A0F0",
    badgeType: "timer",
  },
  {
    id: "a6",
    walletId: "w6",
    type: "buy",
    chain: "polygon",
    tokenSymbol: "WAGMI",
    tokenName: "WAGMI",
    contract: "0x5sPN…2bLr",
    avatarInitials: "WG",
    avatarBg: "#c084fc",
    avatarType: "wagmi",
    relativeAge: "44m",
    createdAgo: "22m",
    mcap: "$224K",
    priceChange: "+0.224",
    priceSOL: "+0.224",
    isPositive: true,
    hasDex: true,
    hasClaim: true,
    hasTelegram: true,
    hasTwitter: true,
    hasWebsite: true,
    hasFeather: true,
    hasMoneyBag: true,
    description: "PolyAccumulator bought 2,000 POL",
    volume: "$74K",
    protocol: "QuickSwap",
    protocolInitials: "QS",
    protocolBg: "#8247E5",
    badgeType: "verified",
  },
];

/* ──────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────── */
function alertCountForWallet(walletId: string) {
  return MOCK_ALERTS.filter((a) => a.walletId === walletId).length;
}

/* ──────────────────────────────────────────────
   Multi-Chain SVG Logos
   ────────────────────────────────────────────── */
function SolanaIcon({ size = 14 }: { size?: number }) {
  const height = Math.round((size * 11) / 14);
  return (
    <svg width={size} height={height} viewBox="0 0 397 311" fill="none" style={{ flexShrink: 0 }}>
      <path
        d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z"
        fill="var(--emerald-500)"
      />
      <path
        d="M64.6 3.8C67 1.4 70.3 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z"
        fill="var(--emerald-500)"
      />
      <path
        d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z"
        fill="var(--emerald-500)"
      />
    </svg>
  );
}

function ChainLogo({ chain, size = 14 }: { chain?: ChainType | string; size?: number }) {
  if (chain === "ethereum") {
    return (
      <svg width={size} height={size} viewBox="0 0 256 417" fill="none" style={{ flexShrink: 0 }}>
        <path d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z" fill="#8fe8b8" opacity="0.95" />
        <path d="M127.962 0L0 212.32l127.962 75.639V154.158z" fill="#2fcb73" />
        <path d="M127.961 312.187l-1.571 1.915v101.35l1.571 4.582 128.038-180.207z" fill="#8fe8b8" opacity="0.95" />
        <path d="M127.962 420.034V312.187L0 239.827z" fill="#2fcb73" />
      </svg>
    );
  }

  if (chain === "base") {
    return (
      <svg width={size} height={size} viewBox="0 0 115 115" fill="none" style={{ flexShrink: 0 }}>
        <circle cx="57.5" cy="57.5" r="57.5" fill="#0052FF" />
        <path d="M57.5 95C78.2107 95 95 78.2107 95 57.5C95 36.7893 78.2107 20 57.5 20C37.8997 20 21.8291 35.034 20.1554 54.195H68.5V60.805H20.1554C21.8291 79.966 37.8997 95 57.5 95Z" fill="#ffffff" />
      </svg>
    );
  }

  if (chain === "bnb") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
        <path d="M12 2L16.5 6.5L14.4 8.6L12 6.2L9.6 8.6L7.5 6.5L12 2Z" fill="#F0B90B" />
        <path d="M22 12L17.5 16.5L15.4 14.4L17.8 12L15.4 9.6L17.5 7.5L22 12Z" fill="#F0B90B" />
        <path d="M12 22L7.5 17.5L9.6 15.4L12 17.8L14.4 15.4L16.5 17.5L12 22Z" fill="#F0B90B" />
        <path d="M2 12L6.5 7.5L8.6 9.6L6.2 12L8.6 14.4L6.5 16.5L2 12Z" fill="#F0B90B" />
        <path d="M12 9.5L14.5 12L12 14.5L9.5 12L12 9.5Z" fill="#F0B90B" />
      </svg>
    );
  }

  if (chain === "arbitrum") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
        <circle cx="12" cy="12" r="11" fill="#28A0F0" />
        <path d="M12 5L7 14.5L9 18L12 12.5L15 18L17 14.5L12 5Z" fill="#ffffff" />
      </svg>
    );
  }

  if (chain === "polygon") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
        <path d="M16.5 8.5L12.5 6L8.5 8.5V13.5L12.5 16L16.5 13.5V8.5Z" stroke="#c084fc" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="12.5" cy="11" r="2" fill="#c084fc" />
      </svg>
    );
  }

  // Default: Solana
  return <SolanaIcon size={size} />;
}

function FeatherSvg() {
  return (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
      <line x1="16" y1="8" x2="2" y2="22" />
      <line x1="17.5" y1="15" x2="9" y2="15" />
    </svg>
  );
}

function MoneyBagSvg({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C9.24 2 7 4.24 7 7c0 .76.17 1.48.47 2.12C5.07 10.15 3.5 12.39 3.5 15c0 3.87 3.8 7 8.5 7s8.5-3.13 8.5-7c0-2.61-1.57-4.85-3.97-5.88.3-.64.47-1.36.47-2.12 0-2.76-2.24-5-5-5zm-1 9h2v2h-2v-2zm0 4h2v2h-2v-2z" />
    </svg>
  );
}

function BubblesSvg({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor">
      <circle cx="10" cy="5" r="2.5" />
      <circle cx="5.5" cy="14" r="2.5" />
      <circle cx="14.5" cy="14" r="2.5" />
    </svg>
  );
}

function ChartSvg({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="M7 16l4-4 4 2 6-8" />
    </svg>
  );
}

function BellWithDot({ size = 13, active = false }: { size?: number; active?: boolean }) {
  return (
    <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <Bell size={size} />
      <span
        style={{
          position: "absolute",
          top: "-1px",
          right: "-1px",
          width: "4px",
          height: "4px",
          borderRadius: "50%",
          background: active ? "var(--emerald-500)" : "var(--neutral-400)",
        }}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────
   Sub: CopyButton
   ────────────────────────────────────────────── */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className={styles.copyBtn}
      onClick={(e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(text).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      title="Copy"
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
    </button>
  );
}

/* ──────────────────────────────────────────────
   Sub: Sound Dropdown
   ────────────────────────────────────────────── */
const SOUND_OPTIONS: SoundOption[] = [
  "Default", "Notification", "Kaching", "Bing", "Ding", "None",
];

function SoundDropdown({
  selected,
  onSelect,
  onClose,
}: {
  selected: SoundOption;
  onSelect: (v: SoundOption) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [onClose]);

  return (
    <div className={styles.soundDropdown} ref={ref}>
      {SOUND_OPTIONS.map((opt) => (
        <button
          key={opt}
          className={`${styles.soundOption} ${selected === opt ? styles.soundOptionActive : ""}`}
          onClick={() => { onSelect(opt); onClose(); }}
        >
          {opt}
          {selected === opt && <Check size={11} className={styles.soundCheck} />}
        </button>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Sub: Toolbar Button with Tooltip
   ────────────────────────────────────────────── */
function ToolbarBtn({
  icon,
  tooltip,
  active,
  danger,
  onClick,
  children,
}: {
  icon: React.ReactNode;
  tooltip: string;
  active?: boolean;
  danger?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div className={styles.toolbarBtnWrapper}>
      <button
        className={`${styles.toolbarBtn} ${active ? styles.toolbarBtnActive : ""} ${danger ? styles.toolbarBtnDanger : ""}`}
        onClick={onClick}
        aria-label={tooltip}
      >
        {icon}
      </button>
      <span className={styles.tooltip}>{tooltip}</span>
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Main Component
   Left: Social Alerts Feed (Main)
   Right: Multi-Chain Wallet Manager Section
   ────────────────────────────────────────────── */
export default function MemeTrackersView() {
  const [managerTab, setManagerTab] = useState<"manager" | "live" | "transfers" | "monitor" | "kols">("manager");
  const [feedTab, setFeedTab] = useState<"alerts" | "socials">("alerts");

  // null = "All wallets" feed; a walletId = filter to that wallet's feed
  const [activeWalletFilter, setActiveWalletFilter] = useState<string | null>(null);

  // Feed type filters
  type FeedFilter = "all" | "buy" | "sell" | "social" | "new" | "transfers" | "analytics";
  const [activeFeedFilters, setActiveFeedFilters] = useState<Set<FeedFilter>>(new Set());

  function toggleFeedFilter(f: FeedFilter) {
    setActiveFeedFilters((prev) => {
      const next = new Set(prev);
      if (f === "all") { next.clear(); return next; }
      if (next.has(f)) { next.delete(f); } else { next.add(f); }
      return next;
    });
  }

  const [addressInput, setAddressInput] = useState("");
  const [selectedChain, setSelectedChain] = useState<ChainType>("solana");
  const [wallets, setWallets] = useState<WalletEntry[]>(MOCK_WALLETS);
  const [feedSound1, setFeedSound1] = useState<SoundOption>("Default");
  const [feedSound2, setFeedSound2] = useState<SoundOption>("None");
  const [openDropdown, setOpenDropdown] = useState<"feedBell1" | "feedBell2" | null>(null);

  // Toggle actions per wallet card
  function handleToggleAction(
    walletId: string,
    action: "notify" | "dot" | "bubbles" | "rss" | "transfers" | "chart"
  ) {
    setWallets((prev) =>
      prev.map((w) => {
        if (w.id !== walletId) return w;
        switch (action) {
          case "notify": return { ...w, notifyEnabled: !w.notifyEnabled };
          case "dot": return { ...w, dotEnabled: !w.dotEnabled };
          case "bubbles": return { ...w, bubblesEnabled: !w.bubblesEnabled };
          case "rss": return { ...w, rssEnabled: !w.rssEnabled };
          case "transfers": return { ...w, transfersEnabled: !w.transfersEnabled };
          case "chart": return { ...w, chartEnabled: !w.chartEnabled };
          default: return w;
        }
      })
    );
  }

  // Compute filtered alerts
  const walletFiltered = activeWalletFilter
    ? MOCK_ALERTS.filter((a) => a.walletId === activeWalletFilter)
    : MOCK_ALERTS;

  const filteredAlerts = activeFeedFilters.size === 0
    ? walletFiltered
    : walletFiltered.filter((a) => {
        const typeKey = a.type as FeedFilter;
        return activeFeedFilters.has(typeKey);
      });

  const activeWallet = wallets.find((w) => w.id === activeWalletFilter) ?? null;

  function handleWalletClick(walletId: string) {
    setActiveWalletFilter((prev) => (prev === walletId ? null : walletId));
  }

  return (
    <div className={styles.container}>
      {/* ════════════════════════════════════════
          LEFT SECTION — Social Alerts Feed (Main)
          ════════════════════════════════════════ */}
      <div className={styles.feedPanel}>
        {/* Feed header */}
        <div className={styles.feedHeader}>
          <div className={styles.feedTabsLeft}>
            {(["alerts", "socials"] as const).map((t) => (
              <button
                key={t}
                className={`${styles.feedTab} ${feedTab === t ? styles.feedTabActive : ""}`}
                onClick={() => setFeedTab(t)}
              >
                {t === "alerts" ? <Bell size={11} /> : <Globe size={11} />}
                {t === "alerts" ? "Social Alerts" : "Socials"}
                {t === "alerts" && (
                  <span className={styles.feedTabBadge}>{filteredAlerts.length}</span>
                )}
              </button>
            ))}
          </div>

          <div className={styles.feedHeaderRight}>
            {/* Active wallet filter pill */}
            {activeWallet && (
              <div
                className={styles.activeFilterPill}
                style={{ borderColor: activeWallet.avatarColor + "55", background: activeWallet.avatarColor + "14" }}
              >
                <span className={styles.activeFilterDot} style={{ background: activeWallet.avatarColor }} />
                <span className={styles.activeFilterLabel}>{activeWallet.label}</span>
                <span className={styles.activeFilterChainTag}>
                  <ChainLogo chain={activeWallet.chain} size={10} />
                </span>
                <button className={styles.activeFilterClose} title="Clear filter" onClick={() => setActiveWalletFilter(null)}>
                  <X size={9} />
                </button>
              </div>
            )}
            <span className={styles.liveLabel}>
              <span className={styles.livePulse} />
              LIVE
            </span>
          </div>
        </div>

        {/* Feed type filter toolbar */}
        <div className={styles.feedFilterBar}>
          <div className={styles.feedFilterBarLeft}>
            {/* Bell 1 */}
            <div className={styles.toolbarBtnWrapper}>
              <button
                className={`${styles.feedFilterBtn} ${
                  activeFeedFilters.has("buy") || openDropdown === "feedBell1" ? styles.feedFilterBtnActive : ""
                }`}
                onClick={() => setOpenDropdown(openDropdown === "feedBell1" ? null : "feedBell1")}
                aria-label="Alert Sound / Buy filter"
              >
                <Bell size={13} />
              </button>
              <span className={styles.tooltip}>Alert Sound</span>
              {openDropdown === "feedBell1" && (
                <SoundDropdown selected={feedSound1} onSelect={setFeedSound1} onClose={() => setOpenDropdown(null)} />
              )}
            </div>

            {/* Bell 2 */}
            <div className={styles.toolbarBtnWrapper}>
              <button
                className={`${styles.feedFilterBtn} ${
                  activeFeedFilters.has("sell") || openDropdown === "feedBell2" ? styles.feedFilterBtnActive : ""
                }`}
                onClick={() => setOpenDropdown(openDropdown === "feedBell2" ? null : "feedBell2")}
                aria-label="Transfer Sound / Sell filter"
              >
                <span className={styles.bellBadgeWrapper}>
                  <Bell size={13} />
                  <span className={styles.bellArrow}>→</span>
                </span>
              </button>
              <span className={styles.tooltip}>Transfer Sound</span>
              {openDropdown === "feedBell2" && (
                <SoundDropdown selected={feedSound2} onSelect={setFeedSound2} onClose={() => setOpenDropdown(null)} />
              )}
            </div>

            {/* Show Bubbles */}
            <div className={styles.toolbarBtnWrapper}>
              <button
                className={`${styles.feedFilterBtn} ${
                  activeFeedFilters.has("social") ? styles.feedFilterBtnActive : ""
                }`}
                onClick={() => toggleFeedFilter("social")}
                aria-label="Show Bubbles / Social filter"
              >
                <svg width={13} height={13} viewBox="0 0 20 20" fill="none">
                  <circle cx="7" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="13" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="14" cy="14" r="2" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
              <span className={styles.tooltip}>Show Bubbles</span>
            </div>

            {/* RSS */}
            <div className={styles.toolbarBtnWrapper}>
              <button
                className={`${styles.feedFilterBtn} ${
                  activeFeedFilters.has("new") ? styles.feedFilterBtnActive : ""
                }`}
                onClick={() => toggleFeedFilter("new")}
                aria-label="Show Feed / New filter"
              >
                <Rss size={13} />
              </button>
              <span className={styles.tooltip}>Show Feed</span>
            </div>

            {/* Swap */}
            <div className={styles.toolbarBtnWrapper}>
              <button
                className={`${styles.feedFilterBtn} ${
                  activeFeedFilters.has("transfers") ? styles.feedFilterBtnActive : ""
                }`}
                onClick={() => toggleFeedFilter("transfers")}
                aria-label="Show Transfers"
              >
                <ArrowLeftRight size={13} />
              </button>
              <span className={styles.tooltip}>Show Transfers</span>
            </div>

            {/* Analytics */}
            <div className={styles.toolbarBtnWrapper}>
              <button
                className={`${styles.feedFilterBtn} ${
                  activeFeedFilters.has("analytics") ? styles.feedFilterBtnActive : ""
                }`}
                onClick={() => toggleFeedFilter("analytics")}
                aria-label="Analytics"
              >
                <BarChart2 size={13} />
              </button>
              <span className={styles.tooltip}>Analytics</span>
            </div>
          </div>

          {/* Active filter count / clear */}
          {activeFeedFilters.size > 0 && (
            <button
              className={styles.feedFilterClearBtn}
              onClick={() => setActiveFeedFilters(new Set())}
              title="Clear all type filters"
            >
              Clear · {activeFeedFilters.size}
              <X size={9} />
            </button>
          )}
        </div>

        {/* Feed content — i5 Social Alert Cards */}
        <div className={styles.feedScrollArea}>
          {feedTab === "alerts" ? (
            filteredAlerts.length > 0 ? (
              <div className={styles.alertCardGrid}>
                {filteredAlerts.map((alert) => {
                  return (
                    <SocialAlertCard
                      key={alert.id}
                      alert={alert}
                    />
                  );
                })}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <Bell size={22} />
                <p>No alerts found</p>
                <span>Try selecting different filters or wallets</span>
              </div>
            )
          ) : (
            <div className={styles.emptyState}>
              <Globe size={22} />
              <p>Social feed coming soon</p>
            </div>
          )}
        </div>
      </div>

      {/* ════════════════════════════════════════
          RIGHT SECTION — Multi-Chain Manager Section
          ════════════════════════════════════════ */}
      <div className={styles.managerPanel}>
        {/* Sub-tabs */}
        <div className={styles.managerTabs}>
          {(["manager", "live", "transfers", "monitor", "kols"] as const).map((t) => (
            <button
              key={t}
              className={`${styles.managerTab} ${managerTab === t ? styles.managerTabActive : ""}`}
              onClick={() => setManagerTab(t)}
            >
              {t === "live" && <span className={styles.livePulse} />}
              {t === "kols" ? "KOLs" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Address input & Chain selector */}
        <div className={styles.addressBar}>
          {/* Chain badge picker */}
          <div className={styles.chainSelectorWrapper}>
            <button
              className={styles.chainSelectorBtn}
              title={`Chain: ${selectedChain.toUpperCase()}`}
              onClick={() => {
                const chains: ChainType[] = ["solana", "ethereum", "base", "bnb", "arbitrum", "polygon"];
                const nextIdx = (chains.indexOf(selectedChain) + 1) % chains.length;
                setSelectedChain(chains[nextIdx]);
              }}
            >
              <ChainLogo chain={selectedChain} size={13} />
            </button>
          </div>

          <input
            className={styles.addressInput}
            type="text"
            placeholder="Paste wallet address…"
            value={addressInput}
            onChange={(e) => setAddressInput(e.target.value)}
          />
          {addressInput && (
            <button className={styles.clearBtn} onClick={() => setAddressInput("")} title="Clear">
              <X size={11} />
            </button>
          )}
          <button className={styles.actionBtnSecondary} title="Import wallets"><Upload size={11} /></button>
          <button className={styles.actionBtnSecondary} title="Export wallets"><Download size={11} /></button>
          <button
            className={styles.actionBtnPrimary}
            onClick={() => {
              if (!addressInput.trim()) return;
              setWallets((prev) => [{
                id: `w${Date.now()}`,
                label: addressInput.slice(0, 8) + "…",
                address: addressInput.slice(0, 4) + "…" + addressInput.slice(-4),
                chain: selectedChain,
                balance: "$0",
                change24h: "—",
                isUp: true,
                lastActive: "now",
                tokenCount: 0,
                avatarInitials: addressInput.slice(0, 2).toUpperCase(),
                avatarColor: "#2fcb73",
                tags: [selectedChain.toUpperCase()],
                amount: "0.00",
                timeLeft: "24h",
                endsAtTime: "12:00 PM",
                endsAtDate: "May 30, 2025",
                notifyEnabled: true,
                dotEnabled: true,
                bubblesEnabled: true,
                rssEnabled: true,
                transfersEnabled: true,
                chartEnabled: true,
              }, ...prev]);
              setAddressInput("");
            }}
          >
            <Plus size={11} /> Add
          </button>
        </div>

        {/* "All feeds" shortcut row */}
        <div className={styles.allFeedsRow}>
          <button
            className={`${styles.allFeedsBtn} ${activeWalletFilter === null ? styles.allFeedsBtnActive : ""}`}
            onClick={() => setActiveWalletFilter(null)}
          >
            <span className={styles.allFeedsIcon}>
              <Globe size={12} />
            </span>
            All Wallets
            <span className={styles.allFeedsBadge}>{MOCK_ALERTS.length}</span>
          </button>
        </div>

        {/* Manager Cards List */}
        <div className={styles.walletCardList}>
          {managerTab === "manager" && wallets.length > 0
            ? wallets.map((w) => {
                const isFiltered = activeWalletFilter === w.id;
                return (
                  <ManagerCard
                    key={w.id}
                    wallet={w}
                    isFiltered={isFiltered}
                    onSelect={() => handleWalletClick(w.id)}
                    onToggleAction={handleToggleAction}
                    onRemove={() => {
                      setWallets((prev) => prev.filter((x) => x.id !== w.id));
                      if (activeWalletFilter === w.id) setActiveWalletFilter(null);
                    }}
                  />
                );
              })
            : managerTab === "manager" && (
                <div className={styles.emptyState}>
                  <Wallet size={20} />
                  <p>No wallets added</p>
                  <span>Paste an address above to start tracking</span>
                </div>
              )}

          {managerTab !== "manager" && (
            <div className={styles.emptyState}>
              {managerTab === "live" && <Activity size={20} />}
              {managerTab === "transfers" && <TrendingUp size={20} />}
              {managerTab === "monitor" && <Bell size={20} />}
              {managerTab === "kols" && <Zap size={20} />}
              <p>
                {managerTab === "live" && "No live trades"}
                {managerTab === "transfers" && "No transfers"}
                {managerTab === "monitor" && "No monitors"}
                {managerTab === "kols" && "No KOLs tracked"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Manager Card — Multi-Chain Profile Logo
   Row 1: Chain Box (Age) | Avatar + Chain Badge + Label + Address | Chain Box (Amount)
   Row 2: TIME LEFT box | ENDS AT box
   Row 3: 7 Action / Filter Toggle Buttons
   ────────────────────────────────────────────── */
function ManagerCard({
  wallet: w,
  isFiltered,
  onSelect,
  onToggleAction,
  onRemove,
}: {
  wallet: WalletEntry;
  isFiltered: boolean;
  onSelect: () => void;
  onToggleAction: (
    walletId: string,
    action: "notify" | "dot" | "bubbles" | "rss" | "transfers" | "chart"
  ) => void;
  onRemove: () => void;
}) {
  return (
    <div
      className={`${styles.managerCard} ${isFiltered ? styles.managerCardFiltered : ""}`}
      onClick={onSelect}
      title={isFiltered ? `Active filter: ${w.label} (click to reset)` : `Click to filter feed to ${w.label}`}
    >
      {/* ── ROW 1: Chain Age Box | Profile + Chain Badge + Address | Chain Amount Box ── */}
      <div className={styles.managerCardRow1}>
        {/* Left: Chain Age Box */}
        <div className={styles.managerAgeBlock}>
          <div className={styles.managerChainIconBox} title={`Chain: ${w.chain.toUpperCase()}`}>
            <ChainLogo chain={w.chain} size={15} />
          </div>
          <div className={styles.managerMetaTextCol}>
            <span className={styles.managerMetaLabel}>AGE</span>
            <span className={styles.managerMetaValue}>{w.lastActive || "1h"}</span>
          </div>
        </div>

        {/* Center: Profile Avatar + Chain Mini Badge + Title + Address */}
        <div className={styles.managerWalletInfoBlock}>
          <div className={styles.managerAvatarBox}>
            {w.avatarEmoji ? (
              <span className={styles.avatarEmojiText}>{w.avatarEmoji}</span>
            ) : (
              <span style={{ color: w.avatarColor, fontSize: 11, fontWeight: 800 }}>
                {w.avatarInitials}
              </span>
            )}
            {/* Chain Mini Badge on Avatar */}
            <div className={styles.avatarChainBadge} title={`Chain: ${w.chain.toUpperCase()}`}>
              <ChainLogo chain={w.chain} size={9} />
            </div>
          </div>
          <div className={styles.managerMetaTextCol}>
            <span className={styles.managerWalletTitle}>{w.label}</span>
            <div className={styles.managerAddressRow}>
              <span className={styles.managerAddressText}>{w.address}</span>
              <CopyButton text={w.address} />
            </div>
          </div>
        </div>

        {/* Right: Chain Amount Box */}
        <div className={styles.managerAmountBlock}>
          <div className={styles.managerChainIconBox} title={`Native currency: ${w.chain.toUpperCase()}`}>
            <ChainLogo chain={w.chain} size={15} />
          </div>
          <div className={styles.managerMetaTextCol} style={{ alignItems: "flex-end" }}>
            <div className={styles.managerAmountValueRow}>
              <span className={styles.managerAmountValue}>{w.amount || "0.0"}</span>
              <span className={styles.managerAmountSubscript}>21</span>
            </div>
            <span className={styles.managerMetaLabel}>AMOUNT</span>
          </div>
        </div>
      </div>

      {/* ── ROW 2: Time Left Box | Ends At Box ── */}
      <div className={styles.managerExpiryBox}>
        {/* Left: Time Left */}
        <div className={styles.managerExpiryLeft}>
          <div className={styles.managerExpiryIconBox}>
            <Clock size={14} className={styles.expiryClockIcon} />
          </div>
          <div className={styles.managerMetaTextCol}>
            <span className={styles.managerMetaLabel}>TIME LEFT</span>
            <span className={styles.managerExpiryValue}>{w.timeLeft || "3h"}</span>
            <span className={styles.managerExpirySubLabel}>UNTIL END</span>
          </div>
        </div>

        <div className={styles.managerExpiryDivider} />

        {/* Right: Ends At */}
        <div className={styles.managerExpiryRight}>
          <div className={styles.managerExpiryIconBox}>
            <Calendar size={14} className={styles.expiryCalendarIcon} />
          </div>
          <div className={styles.managerMetaTextCol}>
            <span className={styles.managerMetaLabel}>ENDS AT</span>
            <div className={styles.managerEndsAtText}>
              <span className={styles.managerEndsAtTime}>{w.endsAtTime || "12:45 PM"}</span>
              <span className={styles.managerEndsAtDot}>•</span>
              <span className={styles.managerEndsAtDate}>{w.endsAtDate || "May 28, 2025"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── ROW 3: Action Toolbar Row ── */}
      <div className={styles.managerToolbarRow}>
        {/* 1. Bell */}
        <button
          className={`${styles.managerActionBtn} ${w.notifyEnabled ? styles.managerActionBtnActive : ""}`}
          title="Alert Sound"
          onClick={(e) => {
            e.stopPropagation();
            onToggleAction(w.id, "notify");
          }}
        >
          <Bell size={13} />
        </button>

        {/* 2. Bell with Dot */}
        <button
          className={`${styles.managerActionBtn} ${w.dotEnabled ? styles.managerActionBtnActive : ""}`}
          title="Active Alert Bell"
          onClick={(e) => {
            e.stopPropagation();
            onToggleAction(w.id, "dot");
          }}
        >
          <BellWithDot size={13} active={w.dotEnabled} />
        </button>

        {/* 3. Bubbles */}
        <button
          className={`${styles.managerActionBtn} ${w.bubblesEnabled ? styles.managerActionBtnActive : ""}`}
          title="Bubbles"
          onClick={(e) => {
            e.stopPropagation();
            onToggleAction(w.id, "bubbles");
          }}
        >
          <BubblesSvg size={13} />
        </button>

        {/* 4. RSS */}
        <button
          className={`${styles.managerActionBtn} ${w.rssEnabled ? styles.managerActionBtnActive : ""}`}
          title="RSS Feed"
          onClick={(e) => {
            e.stopPropagation();
            onToggleAction(w.id, "rss");
          }}
        >
          <Rss size={13} />
        </button>

        {/* 5. Transfers / Swap */}
        <button
          className={`${styles.managerActionBtn} ${w.transfersEnabled ? styles.managerActionBtnActive : ""}`}
          title="Transfers"
          onClick={(e) => {
            e.stopPropagation();
            onToggleAction(w.id, "transfers");
          }}
        >
          <ArrowLeftRight size={13} />
        </button>

        {/* 6. Chart / Analytics */}
        <button
          className={`${styles.managerActionBtn} ${w.chartEnabled ? styles.managerActionBtnActive : ""}`}
          title="Analytics"
          onClick={(e) => {
            e.stopPropagation();
            onToggleAction(w.id, "chart");
          }}
        >
          <ChartSvg size={13} />
        </button>

        {/* 7. Trash / Remove */}
        <button
          className={`${styles.managerActionBtn} ${styles.managerActionBtnDelete}`}
          title="Remove Tracker"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Social Alert Card
   True i5 Design Token Styled & Proportionally Sized
   ────────────────────────────────────────────── */
function SocialAlertCard({ alert }: { alert: AlertItem }) {
  const renderAvatarGraphic = () => {
    if (alert.avatarType === "brain") {
      return (
        <div className={styles.brainAvatar}>
          <svg viewBox="0 0 100 100" className={styles.avatarSvg}>
            <defs>
              <radialGradient id="brainGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--emerald-400)" stopOpacity="0.8" />
                <stop offset="60%" stopColor="var(--emerald-600)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--bg-surface)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="46" fill="var(--bg-surface)" />
            <circle cx="50" cy="46" r="32" fill="url(#brainGlow)" />
            <path
              d="M32 75 C32 60, 40 50, 48 45 C42 40, 42 32, 48 26 C55 20, 68 22, 70 34 C72 44, 66 52, 60 56 C68 62, 72 70, 72 75 Z"
              fill="var(--emerald-500)"
              opacity="0.8"
            />
            <circle cx="52" cy="34" r="3" fill="var(--neutral-100)" />
            <circle cx="62" cy="40" r="2" fill="var(--emerald-300)" />
            <circle cx="44" cy="38" r="2" fill="var(--emerald-300)" />
            <line x1="52" y1="34" x2="62" y2="40" stroke="var(--emerald-200)" strokeWidth="1" />
            <line x1="52" y1="34" x2="44" y2="38" stroke="var(--emerald-200)" strokeWidth="1" />
            <line x1="52" y1="34" x2="56" y2="24" stroke="var(--emerald-200)" strokeWidth="1" />
            <circle cx="56" cy="24" r="2" fill="var(--neutral-100)" />
          </svg>
        </div>
      );
    }

    if (alert.avatarType === "cat") {
      return (
        <div className={styles.genericAvatar} style={{ background: "linear-gradient(135deg, var(--bg-surface-overlay), var(--bg-surface))" }}>
          <span style={{ fontSize: 18 }}>🐱</span>
        </div>
      );
    }

    if (alert.avatarType === "moon") {
      return (
        <div className={styles.genericAvatar} style={{ background: "linear-gradient(135deg, var(--bg-surface-overlay), var(--bg-surface))" }}>
          <span style={{ fontSize: 18 }}>🌙</span>
        </div>
      );
    }

    if (alert.avatarType === "floki") {
      return (
        <div className={styles.genericAvatar} style={{ background: "linear-gradient(135deg, var(--bg-surface-overlay), var(--bg-surface))" }}>
          <span style={{ fontSize: 18 }}>⚡</span>
        </div>
      );
    }

    if (alert.avatarType === "pepe") {
      return (
        <div className={styles.genericAvatar} style={{ background: "linear-gradient(135deg, var(--bg-surface-overlay), var(--bg-surface))" }}>
          <span style={{ fontSize: 18 }}>🐸</span>
        </div>
      );
    }

    return (
      <div
        className={styles.genericAvatar}
        style={{
          background: `linear-gradient(135deg, ${alert.avatarBg}33, var(--bg-surface))`,
          borderColor: alert.avatarBg + "44",
        }}
      >
        <span style={{ color: "var(--text-primary)", fontSize: 14, fontWeight: 700 }}>
          {alert.avatarInitials}
        </span>
      </div>
    );
  };

  return (
    <div className={styles.socialAlertCard}>
      {/* ── TOP SECTION ── */}
      <div className={styles.cardTop}>
        {/* Left: Avatar + Token Metadata */}
        <div className={styles.cardTopLeft}>
          {/* Avatar with Badge */}
          <div className={styles.tokenAvatarWrapper}>
            {renderAvatarGraphic()}

            {alert.badgeType === "timer" && (
              <div className={styles.avatarTimerBadge} title="Timer active">
                <Clock size={9} className={styles.timerIcon} />
              </div>
            )}
            {alert.badgeType === "claim" && (
              <div className={styles.avatarClaimBadge} title="Claimable">
                <CircleDollarSign size={9} className={styles.claimIcon} />
              </div>
            )}
            {alert.badgeType === "verified" && (
              <div className={styles.avatarVerifiedBadge} title="Verified">
                <Check size={9} />
              </div>
            )}
          </div>

          {/* Token Info */}
          <div className={styles.tokenInfo}>
            {/* Symbol + Name + Copy */}
            <div className={styles.tokenSymbolRow}>
              <span className={styles.tokenSymbol}>{alert.tokenSymbol}</span>
              <span className={styles.tokenName}>{alert.tokenName}</span>
              <CopyButton text={alert.tokenSymbol} />
            </div>

            {/* Age + Divider + Icons */}
            <div className={styles.tokenMetaRow}>
              <span className={styles.ageBadge}>
                {alert.relativeAge}
                <Clock size={10} className={styles.ageClock} />
              </span>

              <span className={styles.metaDivider}>|</span>

              <span className={styles.metaIcon} title="Post active">
                <FeatherSvg />
              </span>

              <span className={styles.metaDivider}>|</span>

              <span className={styles.metaIcon} title="Website">
                <Globe size={11} className={styles.globeIcon} />
              </span>

              <span className={styles.metaDivider}>|</span>

              <span className={styles.metaMoneyBag} title="Rewards active">
                <MoneyBagSvg size={11} />
              </span>
            </div>
          </div>
        </div>

        {/* Right: Stat Box */}
        <div className={styles.cardPriceBox}>
          {/* Chain / Solana + Price Delta */}
          <div className={styles.priceRow}>
            <ChainLogo chain={alert.chain} size={14} />
            <span
              className={
                alert.isPositive ? styles.priceValueUp : styles.priceValueDown
              }
            >
              {alert.priceSOL}
            </span>
          </div>

          {/* Market Cap */}
          <div className={styles.mcapRow}>
            <span className={styles.mcapLabel}>MC</span>
            <span className={styles.mcapValue}>{alert.mcap}</span>
          </div>
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div className={styles.cardDivider} />

      {/* ── BOTTOM FOOTER SECTION ── */}
      <div className={styles.cardFooter}>
        {/* Col 1: Time ago */}
        <div className={styles.footerItem}>
          <span className={styles.timeAgoNumber}>{alert.createdAgo}</span>
          <span className={styles.timeAgoLabel}>ago</span>
        </div>

        <div className={styles.footerColDivider} />

        {/* Col 2: Claim button / badge */}
        <div className={styles.footerItem}>
          <div className={styles.claimWrapper}>
            <span className={styles.claimBagCircle}>
              <MoneyBagSvg size={10} />
            </span>
            <span className={styles.claimText}>Claim</span>
          </div>
        </div>

        <div className={styles.footerColDivider} />

        {/* Col 3: Protocol badge + Name */}
        <div className={styles.footerItem}>
          <div className={styles.protocolWrapper}>
            <div
              className={styles.protocolIconCircle}
              style={{ background: alert.protocolBg }}
            >
              <span className={styles.protocolInitialText}>
                {alert.protocolInitials}
              </span>
            </div>
            <span className={styles.protocolName}>{alert.protocol}</span>
          </div>
        </div>

        <div className={styles.footerColDivider} />

        {/* Col 4: Contract Address + Copy */}
        <div className={styles.footerItem}>
          <div className={styles.contractWrapper}>
            <span className={styles.contractAddress}>{alert.contract}</span>
            <CopyButton text={alert.contract} />
          </div>
        </div>
      </div>
    </div>
  );
}
