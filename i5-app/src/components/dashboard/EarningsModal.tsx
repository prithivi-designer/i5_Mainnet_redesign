"use client";

import React, { useState, useEffect, useMemo } from "react";
import styles from "./EarningsModal.module.css";

/* ── Crypto Logos Helper ────────────────────────────────────────── */
function CryptoLogo({ ticker, bg, color }: { ticker: string; bg: string; color?: string }) {
  switch (ticker) {
    case "GFAL":
      return (
        <div className={styles.cryptoLogoBox} style={{ backgroundColor: bg || "#E11D48" }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"
              stroke="#FFF"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <path
              d="M12 8V12L15.5 14"
              stroke="#FFF"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      );
    case "NAVX":
      return (
        <div className={styles.cryptoLogoBox} style={{ backgroundColor: bg || "#0D9488" }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <path
              d="M6 18V6L18 18V6"
              stroke="#FFF"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      );
    case "STIK":
      return (
        <div className={styles.cryptoLogoBox} style={{ backgroundColor: bg || "#EA580C" }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <path
              d="M7 16.5C7 16.5 8.5 19 12 19C15.5 19 17 16.5 17 14C17 10.5 12 10.5 12 7.5C12 5.5 13.5 4.5 15.5 4.5M12 2V4.5"
              stroke="#FFF"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
        </div>
      );
    case "TIA":
      return (
        <div className={styles.cryptoLogoBox} style={{ backgroundColor: bg || "#7C3AED" }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4" fill="#FFF" />
            <circle cx="12" cy="4" r="2" fill="#FFF" opacity="0.8" />
            <circle cx="20" cy="12" r="2" fill="#FFF" opacity="0.8" />
            <circle cx="12" cy="20" r="2" fill="#FFF" opacity="0.8" />
            <circle cx="4" cy="12" r="2" fill="#FFF" opacity="0.8" />
          </svg>
        </div>
      );
    case "OP":
      return (
        <div className={styles.cryptoLogoBox} style={{ backgroundColor: bg || "#DC2626" }}>
          <span style={{ color: "#FFF", fontWeight: 900, fontSize: 10, letterSpacing: -0.5 }}>OP</span>
        </div>
      );
    case "ARB":
      return (
        <div className={styles.cryptoLogoBox} style={{ backgroundColor: bg || "#2563EB" }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <path d="M12 3L3 19H8L12 11L16 19H21L12 3Z" fill="#FFF" />
          </svg>
        </div>
      );
    case "SUI":
      return (
        <div className={styles.cryptoLogoBox} style={{ backgroundColor: bg || "#0284C7" }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2.5C12 2.5 5 11 5 16C5 19.866 8.134 23 12 23C15.866 23 19 19.866 19 16C19 11 12 2.5 12 2.5Z"
              fill="#FFF"
            />
          </svg>
        </div>
      );
    case "APT":
      return (
        <div className={styles.cryptoLogoBox} style={{ backgroundColor: bg || "#1E293B" }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <path d="M4 17L12 5L20 17H16L12 10L8 17H4Z" fill="#FFF" />
          </svg>
        </div>
      );
    case "WLD":
      return (
        <div className={styles.cryptoLogoBox} style={{ backgroundColor: bg || "#111827" }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="7.5" stroke="#FFF" strokeWidth="2" />
            <circle cx="12" cy="12" r="3" fill="#FFF" />
          </svg>
        </div>
      );
    case "STRK":
      return (
        <div className={styles.cryptoLogoBox} style={{ backgroundColor: bg || "#312E81" }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
              fill="#FFF"
            />
          </svg>
        </div>
      );
    default:
      return (
        <div className={styles.cryptoLogoBox} style={{ backgroundColor: bg || "#333333" }}>
          <span style={{ color: color || "#FFF", fontWeight: 700, fontSize: 10 }}>
            {ticker.slice(0, 3)}
          </span>
        </div>
      );
  }
}

/* ── Token Unlock Item Interface ────────────────────────────────── */
export interface TokenUnlockItem {
  id: string;
  ticker: string;
  projectName: string;
  logoBg: string;
  dateKey: string; // YYYY-MM-DD
  dateDisplay: string;
  price: string;
  priceNum: number;
  change24h: number;
  reportedMcap: string;
  mcapNum: number;
  releasedPercent: number; // e.g. 71.10
  upcomingValue: string; // e.g. "$17.42K"
  upcomingValNum: number;
  upcomingPercent: string; // e.g. "0.34%"
  countdownSecondsInitial: number; // total remaining seconds for ticker
  next7dEmission: string; // e.g. "$59.81K"
  next7dPercent: string; // e.g. "1.17%"
  isWatching: boolean;
  unlockType: "Cliff" | "Linear";
}

/* ── Stock Earnings Interface ──────────────────────────────────── */
export interface EarningsReport {
  id: string;
  ticker: string;
  companyName: string;
  avatarBg: string;
  date: string; // YYYY-MM-DD
  dateDisplay: string;
  dayName: string;
  session: "AH" | "PRE";
  epsEst: string;
  revEst: string;
  impliedMove: string;
  mktCap: string;
  sector: "Technology" | "Consumer" | "Energy" | "Finance" | "Crypto";
  isWatching: boolean;
  hasStar?: boolean;
  highlightMove?: boolean;
  isConfirmed?: boolean;
}

/* ── Token Unlocks Dataset (Matching User Reference Image) ─────── */
const initialUnlockData: TokenUnlockItem[] = [
  {
    id: "gfal",
    ticker: "GFAL",
    projectName: "Games for a Living",
    logoBg: "#E11D48",
    dateKey: "2026-07-30",
    dateDisplay: "Thu, Jul 30, 2026",
    price: "$0.000718",
    priceNum: 0.000718,
    change24h: -1.09,
    reportedMcap: "$5.16M",
    mcapNum: 5160000,
    releasedPercent: 71.1,
    upcomingValue: "$17.42K",
    upcomingValNum: 17420,
    upcomingPercent: "0.34%",
    countdownSecondsInitial: 32296, // 0D 8H 58M 16S
    next7dEmission: "$59.81K",
    next7dPercent: "1.17%",
    isWatching: false,
    unlockType: "Cliff",
  },
  {
    id: "navx",
    ticker: "NAVX",
    projectName: "NAVI Protocol",
    logoBg: "#0D9488",
    dateKey: "2026-07-30",
    dateDisplay: "Thu, Jul 30, 2026",
    price: "$0.007806",
    priceNum: 0.007806,
    change24h: -0.53,
    reportedMcap: "$6.43M",
    mcapNum: 6430000,
    releasedPercent: 92.49,
    upcomingValue: "$22.71K",
    upcomingValNum: 22710,
    upcomingPercent: "0.31%",
    countdownSecondsInitial: 32296, // 0D 8H 58M 16S
    next7dEmission: "$22.71K",
    next7dPercent: "0.31%",
    isWatching: false,
    unlockType: "Cliff",
  },
  {
    id: "stik",
    ticker: "STIK",
    projectName: "StakeStone",
    logoBg: "#EA580C",
    dateKey: "2026-07-30",
    dateDisplay: "Thu, Jul 30, 2026",
    price: "$0.006304",
    priceNum: 0.006304,
    change24h: 4.46,
    reportedMcap: "--",
    mcapNum: 0,
    releasedPercent: 33.95,
    upcomingValue: "$9.86K",
    upcomingValNum: 9860,
    upcomingPercent: "1.85%",
    countdownSecondsInitial: 32296, // 0D 8H 58M 16S
    next7dEmission: "$19.29K",
    next7dPercent: "3.62%",
    isWatching: false,
    unlockType: "Cliff",
  },
  {
    id: "tia",
    ticker: "TIA",
    projectName: "Celestia",
    logoBg: "#7C3AED",
    dateKey: "2026-07-31",
    dateDisplay: "Fri, Jul 31, 2026",
    price: "$6.12",
    priceNum: 6.12,
    change24h: -2.41,
    reportedMcap: "$1.24B",
    mcapNum: 1240000000,
    releasedPercent: 38.2,
    upcomingValue: "$124.50M",
    upcomingValNum: 124500000,
    upcomingPercent: "10.02%",
    countdownSecondsInitial: 51730, // 0D 14H 22M 10S
    next7dEmission: "$124.50M",
    next7dPercent: "10.02%",
    isWatching: true,
    unlockType: "Cliff",
  },
  {
    id: "op",
    ticker: "OP",
    projectName: "Optimism",
    logoBg: "#DC2626",
    dateKey: "2026-07-31",
    dateDisplay: "Fri, Jul 31, 2026",
    price: "$1.45",
    priceNum: 1.45,
    change24h: 3.12,
    reportedMcap: "$1.82B",
    mcapNum: 1820000000,
    releasedPercent: 32.4,
    upcomingValue: "$45.20M",
    upcomingValNum: 45200000,
    upcomingPercent: "2.48%",
    countdownSecondsInitial: 101564, // 1D 04H 12M 44S
    next7dEmission: "$45.20M",
    next7dPercent: "2.48%",
    isWatching: false,
    unlockType: "Cliff",
  },
  {
    id: "arb",
    ticker: "ARB",
    projectName: "Arbitrum",
    logoBg: "#2563EB",
    dateKey: "2026-07-31",
    dateDisplay: "Fri, Jul 31, 2026",
    price: "$0.54",
    priceNum: 0.54,
    change24h: -1.8,
    reportedMcap: "$1.92B",
    mcapNum: 1920000000,
    releasedPercent: 34.1,
    upcomingValue: "$51.80M",
    upcomingValNum: 51800000,
    upcomingPercent: "2.70%",
    countdownSecondsInitial: 239400, // 2D 18H 30M 00S
    next7dEmission: "$51.80M",
    next7dPercent: "2.70%",
    isWatching: false,
    unlockType: "Cliff",
  },
  {
    id: "sui",
    ticker: "SUI",
    projectName: "Sui",
    logoBg: "#0284C7",
    dateKey: "2026-08-01",
    dateDisplay: "Sat, Aug 01, 2026",
    price: "$3.45",
    priceNum: 3.45,
    change24h: 8.2,
    reportedMcap: "$9.80B",
    mcapNum: 9800000000,
    releasedPercent: 28.6,
    upcomingValue: "$78.40M",
    upcomingValNum: 78400000,
    upcomingPercent: "0.80%",
    countdownSecondsInitial: 283512, // 3D 06H 45M 12S
    next7dEmission: "$78.40M",
    next7dPercent: "0.80%",
    isWatching: true,
    unlockType: "Cliff",
  },
  {
    id: "apt",
    ticker: "APT",
    projectName: "Aptos",
    logoBg: "#1E293B",
    dateKey: "2026-08-01",
    dateDisplay: "Sat, Aug 01, 2026",
    price: "$8.90",
    priceNum: 8.9,
    change24h: -0.9,
    reportedMcap: "$4.20B",
    mcapNum: 4200000000,
    releasedPercent: 45.8,
    upcomingValue: "$98.20M",
    upcomingValNum: 98200000,
    upcomingPercent: "2.34%",
    countdownSecondsInitial: 388800, // 4D 12H 00M 00S
    next7dEmission: "$98.20M",
    next7dPercent: "2.34%",
    isWatching: false,
    unlockType: "Cliff",
  },
  {
    id: "wld",
    ticker: "WLD",
    projectName: "Worldcoin",
    logoBg: "#111827",
    dateKey: "2026-08-01",
    dateDisplay: "Sat, Aug 01, 2026",
    price: "$1.85",
    priceNum: 1.85,
    change24h: 1.2,
    reportedMcap: "$1.15B",
    mcapNum: 1150000000,
    releasedPercent: 14.5,
    upcomingValue: "$32.10M",
    upcomingValNum: 32100000,
    upcomingPercent: "2.79%",
    countdownSecondsInitial: 436530, // 5D 02H 15M 30S
    next7dEmission: "$32.10M",
    next7dPercent: "2.79%",
    isWatching: false,
    unlockType: "Linear",
  },
  {
    id: "strk",
    ticker: "STRK",
    projectName: "Starknet",
    logoBg: "#312E81",
    dateKey: "2026-08-05",
    dateDisplay: "Wed, Aug 05, 2026",
    price: "$0.38",
    priceNum: 0.38,
    change24h: -3.1,
    reportedMcap: "$780.0M",
    mcapNum: 780000000,
    releasedPercent: 22.4,
    upcomingValue: "$24.50M",
    upcomingValNum: 24500000,
    upcomingPercent: "3.14%",
    countdownSecondsInitial: 504000, // 5D 20H 00M 00S
    next7dEmission: "$24.50M",
    next7dPercent: "3.14%",
    isWatching: false,
    unlockType: "Cliff",
  },
];

/* ── Stock Earnings Dataset ────────────────────────────────────── */
const mockReports: EarningsReport[] = [
  {
    id: "aapl",
    ticker: "AAPL",
    companyName: "Apple Inc.",
    avatarBg: "#1F2937",
    date: "2026-07-30",
    dateDisplay: "07-30",
    dayName: "Thu",
    session: "AH",
    epsEst: "$1.61",
    revEst: "$94.20B",
    impliedMove: "±4.1%",
    mktCap: "$3.42T",
    sector: "Technology",
    isWatching: true,
    hasStar: true,
    isConfirmed: true,
  },
  {
    id: "amzn",
    ticker: "AMZN",
    companyName: "Amazon.com Inc.",
    avatarBg: "#372717",
    date: "2026-07-30",
    dateDisplay: "07-30",
    dayName: "Thu",
    session: "AH",
    epsEst: "$1.33",
    revEst: "$160.10B",
    impliedMove: "±6.3%",
    mktCap: "$1.98T",
    sector: "Consumer",
    isWatching: false,
    isConfirmed: true,
  },
  {
    id: "xom",
    ticker: "XOM",
    companyName: "Exxon Mobil Corp.",
    avatarBg: "#3F1D24",
    date: "2026-07-30",
    dateDisplay: "07-30",
    dayName: "Thu",
    session: "PRE",
    epsEst: "$1.88",
    revEst: "$88.40B",
    impliedMove: "±2.4%",
    mktCap: "$465B",
    sector: "Energy",
    isWatching: false,
    isConfirmed: true,
  },
  {
    id: "coin",
    ticker: "COIN",
    companyName: "Coinbase Global Inc.",
    avatarBg: "#112F4E",
    date: "2026-07-31",
    dateDisplay: "07-31",
    dayName: "Fri",
    session: "AH",
    epsEst: "$1.64",
    revEst: "$2.02B",
    impliedMove: "±9.8%",
    mktCap: "$58B",
    sector: "Crypto",
    isWatching: true,
    hasStar: true,
    isConfirmed: true,
  },
  {
    id: "amd",
    ticker: "AMD",
    companyName: "Advanced Micro Devices",
    avatarBg: "#3A2A14",
    date: "2026-07-31",
    dateDisplay: "07-31",
    dayName: "Fri",
    session: "AH",
    epsEst: "$0.94",
    revEst: "$7.60B",
    impliedMove: "±7.2%",
    mktCap: "$240B",
    sector: "Technology",
    isWatching: false,
    isConfirmed: true,
  },
  {
    id: "pltr",
    ticker: "PLTR",
    companyName: "Palantir Technologies",
    avatarBg: "#1C2A3A",
    date: "2026-07-31",
    dateDisplay: "07-31",
    dayName: "Fri",
    session: "AH",
    epsEst: "$0.09",
    revEst: "$678M",
    impliedMove: "±11.4%",
    mktCap: "$62B",
    sector: "Technology",
    isWatching: false,
    isConfirmed: true,
  },
  {
    id: "nvda",
    ticker: "NVDA",
    companyName: "NVIDIA Corp.",
    avatarBg: "#19351C",
    date: "2026-08-03",
    dateDisplay: "08-03",
    dayName: "Mon",
    session: "AH",
    epsEst: "$0.65",
    revEst: "$28.60B",
    impliedMove: "±8.7%",
    mktCap: "$3.05T",
    sector: "Technology",
    isWatching: true,
    hasStar: true,
    isConfirmed: true,
  },
  {
    id: "meta",
    ticker: "META",
    companyName: "Meta Platforms Inc.",
    avatarBg: "#152E46",
    date: "2026-08-03",
    dateDisplay: "08-03",
    dayName: "Mon",
    session: "AH",
    epsEst: "$4.72",
    revEst: "$38.30B",
    impliedMove: "±7.8%",
    mktCap: "$1.28T",
    sector: "Technology",
    isWatching: false,
    isConfirmed: true,
  },
  {
    id: "googl",
    ticker: "GOOGL",
    companyName: "Alphabet Inc.",
    avatarBg: "#3B261D",
    date: "2026-08-03",
    dateDisplay: "08-03",
    dayName: "Mon",
    session: "AH",
    epsEst: "$1.85",
    revEst: "$84.20B",
    impliedMove: "±5.1%",
    mktCap: "$2.15T",
    sector: "Technology",
    isWatching: false,
    isConfirmed: true,
  },
];

/* ── Countdown String Formatter ────────────────────────────────── */
function formatCountdown(totalSec: number): string {
  if (totalSec <= 0) return "0D 0H 0M 0S";
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  return `${days}D ${hours}H ${minutes}M ${seconds < 10 ? `0${seconds}` : seconds}S`;
}

interface EarningsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "unlocks" | "earnings";
}

export default function EarningsModal({ isOpen, onClose, initialTab }: EarningsModalProps) {
  // Main Modal Tab: "unlocks" (Crypto) vs "earnings" (Stocks)
  const [modalTab, setModalTab] = useState<"unlocks" | "earnings">(initialTab || "unlocks");

  // View Mode: "agenda" (cards) vs "table" vs "calendar"
  const [viewMode, setViewMode] = useState<"agenda" | "table" | "calendar">("agenda");

  useEffect(() => {
    if (initialTab) {
      setModalTab(initialTab);
    }
  }, [initialTab, isOpen]);

  // Unlocks State & Filters
  const [unlockItems, setUnlockItems] = useState<TokenUnlockItem[]>(initialUnlockData);
  const [unlockSearch, setUnlockSearch] = useState<string>("");
  const [unlockTimeframe, setUnlockTimeframe] = useState<"All" | "24H" | "7D" | "30D">("All");
  const [unlockTypeFilter, setUnlockTypeFilter] = useState<"All" | "Cliff" | "Linear">("All");
  const [unlockWatchlistOnly, setUnlockWatchlistOnly] = useState<boolean>(false);
  const [sortField, setSortField] = useState<string>("countdown");
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  // Live countdown second ticker
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setSecondsElapsed((v) => v + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Stock Earnings States
  const [reports, setReports] = useState<EarningsReport[]>(mockReports);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Keyboard shortcut Esc to close
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Toggle watchlist
  const toggleUnlockWatch = (id: string) => {
    setUnlockItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isWatching: !item.isWatching } : item))
    );
  };

  // Sort handler
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortAsc((prev) => !prev);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  // Filtered and Sorted Token Unlocks
  const filteredUnlocks = useMemo(() => {
    return unlockItems
      .filter((item) => {
        if (unlockSearch.trim()) {
          const q = unlockSearch.toLowerCase();
          const matchTicker = item.ticker.toLowerCase().includes(q);
          const matchName = item.projectName.toLowerCase().includes(q);
          if (!matchTicker && !matchName) return false;
        }
        if (unlockWatchlistOnly && !item.isWatching) return false;
        if (unlockTypeFilter !== "All" && item.unlockType !== unlockTypeFilter) return false;
        return true;
      })
      .sort((a, b) => {
        let valA: number | string = 0;
        let valB: number | string = 0;

        switch (sortField) {
          case "project":
            valA = a.ticker;
            valB = b.ticker;
            break;
          case "price":
            valA = a.priceNum;
            valB = b.priceNum;
            break;
          case "change":
            valA = a.change24h;
            valB = b.change24h;
            break;
          case "mcap":
            valA = a.mcapNum;
            valB = b.mcapNum;
            break;
          case "released":
            valA = a.releasedPercent;
            valB = b.releasedPercent;
            break;
          case "upcoming":
            valA = a.upcomingValNum;
            valB = b.upcomingValNum;
            break;
          case "countdown":
            valA = a.countdownSecondsInitial;
            valB = b.countdownSecondsInitial;
            break;
          default:
            valA = a.countdownSecondsInitial;
            valB = b.countdownSecondsInitial;
        }

        if (typeof valA === "string" && typeof valB === "string") {
          return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return sortAsc ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
      });
  }, [unlockItems, unlockSearch, unlockWatchlistOnly, unlockTypeFilter, sortField, sortAsc]);

  // Group filtered unlocks by date for Agenda (Cards) view
  const groupedUnlocks = useMemo(() => {
    const map = new Map<string, { label: string; items: TokenUnlockItem[] }>();
    filteredUnlocks.forEach((item) => {
      if (!map.has(item.dateKey)) {
        map.set(item.dateKey, {
          label: item.dateDisplay,
          items: [],
        });
      }
      map.get(item.dateKey)!.items.push(item);
    });
    return Array.from(map.entries()).map(([key, value]) => ({
      dateKey: key,
      dateLabel: value.label,
      items: value.items,
    }));
  }, [filteredUnlocks]);

  // Month Calendar Days for Crypto
  const cryptoCalendarDays = useMemo(() => {
    const totalDays = 31;
    const paddingBefore = 3; // Starts on Wed/Thu
    const daysArr = [];

    for (let i = 0; i < paddingBefore; i++) {
      daysArr.push({ isBlank: true, dayNum: 0, dateKey: "" });
    }

    for (let d = 1; d <= totalDays; d++) {
      const dayStr = d < 10 ? `0${d}` : `${d}`;
      const dateKey = `2026-07-${dayStr}`;
      const dayUnlocks = unlockItems.filter((u) => u.dateKey === dateKey);

      daysArr.push({
        isBlank: false,
        dayNum: d,
        dateKey,
        dayUnlocks,
      });
    }

    return daysArr;
  }, [unlockItems]);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Top Header Row */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.calendarIconBox}>
              {modalTab === "unlocks" ? (
                <svg width={22} height={22} viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="12" cy="16" r="1.5" fill="currentColor" />
                </svg>
              ) : (
                <svg width={22} height={22} viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect x="3" y="4" width="18" height="17" rx="3" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M8 2v4M16 2v4M3 9h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              )}
            </div>

            <div className={styles.titleMeta}>
              <div className={styles.titleRow}>
                <h3 className={styles.title}>
                  {modalTab === "unlocks" ? "Upcoming Token Unlocks" : "Upcoming Earnings Calendar"}
                </h3>
                <span className={styles.liveBadge}>LIVE DATA</span>
              </div>
              <p className={styles.subtitle}>
                {modalTab === "unlocks"
                  ? "Track major cliff & linear token emissions, released percentage, market cap, and live countdowns."
                  : "Track quarterly financial announcements, estimated EPS, revenue & implied moves."}
              </p>
            </div>
          </div>

          {/* Top Right Actions: Mode Switcher, View Switcher & Close */}
          <div className={styles.headerRight}>
            {/* Mode Switcher: Crypto Unlocks vs Stocks Earnings */}
            <div className={styles.modeSelectorGroup}>
              <button
                className={`${styles.modeTabBtn} ${
                  modalTab === "unlocks" ? styles.modeTabBtnActive : ""
                }`}
                onClick={() => {
                  setModalTab("unlocks");
                  setViewMode("table");
                }}
              >
                <span>🪙</span> Token Unlocks
              </button>
              <button
                className={`${styles.modeTabBtn} ${
                  modalTab === "earnings" ? styles.modeTabBtnActive : ""
                }`}
                onClick={() => {
                  setModalTab("earnings");
                  setViewMode("agenda");
                }}
              >
                <span>📊</span> Earnings
              </button>
            </div>

            {/* View Switcher: Cards / Table / Calendar */}
            <div className={styles.viewToggleGroup}>
              <button
                className={`${styles.viewToggleBtn} ${
                  viewMode === "agenda" ? styles.activeViewBtn : ""
                }`}
                onClick={() => setViewMode("agenda")}
                title="Cards / Agenda View"
              >
                <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="2" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4" />
                  <rect x="8.5" y="2" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4" />
                  <rect x="2" y="8.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4" />
                  <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4" />
                </svg>
                Cards
              </button>

              {modalTab === "unlocks" && (
                <button
                  className={`${styles.viewToggleBtn} ${
                    viewMode === "table" ? styles.activeViewBtn : ""
                  }`}
                  onClick={() => setViewMode("table")}
                  title="Table View"
                >
                  <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
                    <path d="M2 3.5h12M2 7.5h12M2 11.5h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  Table
                </button>
              )}

              <button
                className={`${styles.viewToggleBtn} ${
                  viewMode === "calendar" ? styles.activeViewBtn : ""
                }`}
                onClick={() => setViewMode("calendar")}
                title="Month Calendar Grid"
              >
                <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="2.5" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M5 1.5v2M11 1.5v2M2 6h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                Calendar
              </button>
            </div>

            <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
              ✕
            </button>
          </div>
        </div>

        {/* 4 Summary Stat Cards Row */}
        {modalTab === "unlocks" ? (
          <div className={styles.summaryGrid}>
            <div className={styles.summaryCard}>
              <div className={styles.cardStatHeader}>
                <div className={styles.summaryHeaderLeft}>
                  <span className={styles.summaryIcon}>🔓</span>
                  <span className={styles.summaryLabel}>TOTAL UPCOMING</span>
                </div>
                <span className={styles.moreDots}>•••</span>
              </div>
              <div className={styles.insetMainBox}>
                <span className={styles.summaryValue}>$348.2M</span>
              </div>
              <div className={styles.cardFooterRow}>
                <span className={styles.summarySubtext}>{filteredUnlocks.length} Active Tracks</span>
                <div className={`${styles.badgePill} ${styles.greenBadge}`}>
                  <span>▲</span> Active
                </div>
              </div>
            </div>

            <div className={styles.summaryCard}>
              <div className={styles.cardStatHeader}>
                <div className={styles.summaryHeaderLeft}>
                  <span className={styles.summaryIcon}>⏱️</span>
                  <span className={styles.summaryLabel}>NEXT 24H CLIFF</span>
                </div>
                <span className={styles.moreDots}>•••</span>
              </div>
              <div className={styles.insetMainBox}>
                <span className={styles.summaryValue}>$49.99K</span>
              </div>
              <div className={styles.cardFooterRow}>
                <span className={styles.summarySubtext}>GFAL, NAVX, STIK</span>
                <div className={`${styles.badgePill} ${styles.orangeBadge}`}>
                  <span>●</span> 0D 8H 58M
                </div>
              </div>
            </div>

            <div className={styles.summaryCard}>
              <div className={styles.cardStatHeader}>
                <div className={styles.summaryHeaderLeft}>
                  <span className={styles.summaryIcon}>📊</span>
                  <span className={styles.summaryLabel}>7D EMISSION</span>
                </div>
                <span className={styles.moreDots}>•••</span>
              </div>
              <div className={styles.insetMainBox}>
                <span className={styles.summaryValue}>$101.81K</span>
              </div>
              <div className={styles.cardFooterRow}>
                <span className={styles.summarySubtext}>Weekly scheduled</span>
                <div className={`${styles.badgePill} ${styles.greenBadge}`}>
                  <span>▲</span> 1.8% Supply
                </div>
              </div>
            </div>

            <div className={styles.summaryCard}>
              <div className={styles.cardStatHeader}>
                <div className={styles.summaryHeaderLeft}>
                  <span className={styles.summaryIcon}>🔥</span>
                  <span className={styles.summaryLabel}>LARGEST CLIFF</span>
                </div>
                <span className={styles.moreDots}>•••</span>
              </div>
              <div className={styles.insetMainBox}>
                <span className={styles.summaryValue}>TIA ($124.5M)</span>
              </div>
              <div className={styles.cardFooterRow}>
                <span className={styles.summarySubtext}>10.02% of Supply</span>
                <div className={`${styles.badgePill} ${styles.purpleBadge}`}>
                  <span>★</span> High Impact
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.summaryGrid}>
            <div className={styles.summaryCard}>
              <div className={styles.cardStatHeader}>
                <div className={styles.summaryHeaderLeft}>
                  <span className={styles.summaryIcon}>📈</span>
                  <span className={styles.summaryLabel}>TOTAL UPCOMING</span>
                </div>
                <span className={styles.moreDots}>•••</span>
              </div>
              <div className={styles.insetMainBox}>
                <span className={styles.summaryValue}>{reports.length} Reports</span>
              </div>
              <div className={styles.cardFooterRow}>
                <span className={styles.summarySubtext}>Matching active filters</span>
                <div className={`${styles.badgePill} ${styles.greenBadge}`}>
                  <span>▲</span> Active
                </div>
              </div>
            </div>

            <div className={styles.summaryCard}>
              <div className={styles.cardStatHeader}>
                <div className={styles.summaryHeaderLeft}>
                  <span className={styles.summaryIcon}>💰</span>
                  <span className={styles.summaryLabel}>REVENUE ON DECK</span>
                </div>
                <span className={styles.moreDots}>•••</span>
              </div>
              <div className={styles.insetMainBox}>
                <span className={styles.summaryValue}>$683.5B</span>
              </div>
              <div className={styles.cardFooterRow}>
                <span className={styles.summarySubtext}>Combined estimate</span>
                <div className={`${styles.badgePill} ${styles.greenBadge}`}>
                  <span>▲</span> +14.2% YoY
                </div>
              </div>
            </div>

            <div className={styles.summaryCard}>
              <div className={styles.cardStatHeader}>
                <div className={styles.summaryHeaderLeft}>
                  <span className={styles.summaryIcon}>⚡</span>
                  <span className={styles.summaryLabel}>HIGH VOLATILITY</span>
                </div>
                <span className={styles.moreDots}>•••</span>
              </div>
              <div className={styles.insetMainBox}>
                <span className={styles.summaryValue}>COIN (±9.8%)</span>
              </div>
              <div className={styles.cardFooterRow}>
                <span className={styles.summarySubtext}>Top implied move</span>
                <div className={`${styles.badgePill} ${styles.purpleBadge}`}>
                  <span>★</span> High Move
                </div>
              </div>
            </div>

            <div className={styles.summaryCard}>
              <div className={styles.cardStatHeader}>
                <div className={styles.summaryHeaderLeft}>
                  <span className={styles.summaryIcon}>🏢</span>
                  <span className={styles.summaryLabel}>MEGA CAPS DUE</span>
                </div>
                <span className={styles.moreDots}>•••</span>
              </div>
              <div className={styles.insetMainBox}>
                <span className={styles.summaryValue}>AAPL, AMZN</span>
              </div>
              <div className={styles.cardFooterRow}>
                <span className={styles.summarySubtext}>Market movers</span>
                <div className={`${styles.badgePill} ${styles.orangeBadge}`}>
                  <span>●</span> 2 Mega Caps
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TOKEN UNLOCKS (CRYPTO MODE) ─────────────────────────── */}
        {modalTab === "unlocks" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            {/* Search & Filter Bar */}
            <div className={styles.searchBarRow}>
              <div className={styles.searchInputWrap}>
                <svg width={15} height={15} viewBox="0 0 16 16" fill="none" className={styles.searchIcon}>
                  <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M10 10l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  placeholder="Search token, project (e.g. GFAL, NAVX, TIA)..."
                  value={unlockSearch}
                  onChange={(e) => setUnlockSearch(e.target.value)}
                  className={styles.searchInput}
                />
                {unlockSearch && (
                  <button className={styles.clearSearchBtn} onClick={() => setUnlockSearch("")}>
                    ✕
                  </button>
                )}
              </div>

              {/* Timeframe Chips */}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {(["All", "24H", "7D", "30D"] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setUnlockTimeframe(tf)}
                    className={`${styles.filterChip} ${
                      unlockTimeframe === tf ? styles.activeFilterChip : ""
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              {/* Unlock Type Filter */}
              <div className={styles.customSelectWrap}>
                <label className={styles.filterLabel}>Type</label>
                <select
                  value={unlockTypeFilter}
                  onChange={(e) => setUnlockTypeFilter(e.target.value as "All" | "Cliff" | "Linear")}
                  className={styles.customSelect}
                >
                  <option value="All">All Types</option>
                  <option value="Cliff">Cliff Unlock</option>
                  <option value="Linear">Linear Unlock</option>
                </select>
              </div>

              {/* Watchlist Toggle */}
              <button
                className={`${styles.filterToggleBtn} ${
                  unlockWatchlistOnly ? styles.filterToggleActive : ""
                }`}
                onClick={() => setUnlockWatchlistOnly((v) => !v)}
              >
                ★ Watchlist
              </button>
            </div>

            {/* VIEW 1: TABLE VIEW (EXACT MATCH TO REFERENCE IMAGE) */}
            {viewMode === "table" && (
              <div className={styles.unlocksTableWrapper}>
                <table className={styles.unlocksTable}>
                  <thead className={styles.unlocksThead}>
                    <tr>
                      <th className={styles.unlocksTh} style={{ width: 44, textAlign: "center" }}>
                        <span className={styles.infoIcon}>★</span>
                      </th>
                      <th className={styles.unlocksTh} onClick={() => handleSort("project")}>
                        <span className={styles.thContent}>
                          Project Name
                          <span className={styles.sortArrows}>▲▼</span>
                        </span>
                      </th>
                      <th className={styles.unlocksTh} onClick={() => handleSort("price")}>
                        <span className={styles.thContent}>
                          Price
                          <span className={styles.sortArrows}>▲▼</span>
                        </span>
                      </th>
                      <th className={styles.unlocksTh} onClick={() => handleSort("change")}>
                        <span className={styles.thContent}>
                          24h %
                          <span className={styles.sortArrows}>▲▼</span>
                        </span>
                      </th>
                      <th className={styles.unlocksTh} onClick={() => handleSort("mcap")}>
                        <span className={styles.thContent}>
                          Reported MCap
                          <span className={styles.sortArrows}>▲▼</span>
                        </span>
                      </th>
                      <th className={styles.unlocksTh} onClick={() => handleSort("released")}>
                        <span className={styles.thContent}>
                          Released Percentage
                          <span className={styles.infoIcon}>ℹ</span>
                          <span className={styles.sortArrows}>▲▼</span>
                        </span>
                      </th>
                      <th className={styles.unlocksTh} onClick={() => handleSort("upcoming")}>
                        <span className={styles.thContent}>
                          Upcoming Value
                          <span className={styles.infoIcon}>ℹ</span>
                          <span className={styles.sortArrows}>▲▼</span>
                        </span>
                      </th>
                      <th className={styles.unlocksTh}>
                        <span className={styles.thContent}>
                          Next 7D Emission
                          <span className={styles.infoIcon}>ℹ</span>
                          <span className={styles.sortArrows}>▲▼</span>
                        </span>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredUnlocks.map((item) => {
                      const remainingSec = Math.max(
                        0,
                        item.countdownSecondsInitial - secondsElapsed
                      );

                      return (
                        <tr key={item.id} className={styles.unlocksTr}>
                          {/* Star Favorite */}
                          <td className={styles.unlocksTd} style={{ textAlign: "center" }}>
                            <button
                              className={`${styles.starBtn} ${
                                item.isWatching ? styles.starBtnActive : ""
                              }`}
                              onClick={() => toggleUnlockWatch(item.id)}
                              aria-label="Star watchlist"
                            >
                              {item.isWatching ? "★" : "☆"}
                            </button>
                          </td>

                          {/* Project Logo + Name */}
                          <td className={styles.unlocksTd}>
                            <div className={styles.projectCell}>
                              <CryptoLogo ticker={item.ticker} bg={item.logoBg} />
                              <span className={styles.projectTicker}>{item.ticker}</span>
                            </div>
                          </td>

                          {/* Price */}
                          <td className={styles.unlocksTd}>
                            <span className={styles.priceVal}>{item.price}</span>
                          </td>

                          {/* 24h % */}
                          <td className={styles.unlocksTd}>
                            <span
                              className={
                                item.change24h >= 0 ? styles.changeValGreen : styles.changeValRed
                              }
                            >
                              {item.change24h >= 0 ? `+${item.change24h.toFixed(2)}%` : `${item.change24h.toFixed(2)}%`}
                            </span>
                          </td>

                          {/* Reported MCap */}
                          <td className={styles.unlocksTd}>
                            <span className={styles.mcapVal}>{item.reportedMcap}</span>
                          </td>

                          {/* Released Percentage with Progress Bar */}
                          <td className={styles.unlocksTd}>
                            <div className={styles.releasedCell}>
                              <span className={styles.releasedText}>
                                {item.releasedPercent.toFixed(2)}%
                              </span>
                              <div className={styles.progressTrack}>
                                <div
                                  className={styles.progressFill}
                                  style={{ width: `${item.releasedPercent}%` }}
                                />
                                <div
                                  className={styles.progressTriangle}
                                  style={{ left: `${item.releasedPercent}%` }}
                                />
                              </div>
                            </div>
                          </td>

                          {/* Upcoming Value + Cliff Badge + Countdown Pill */}
                          <td className={styles.unlocksTd}>
                            <div className={styles.upcomingValCell}>
                              <div className={styles.cliffBadge} title="Cliff Unlock">
                                <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
                                  <path
                                    d="M2 13V9h4v-3h4V3h4v10H2Z"
                                    fill="currentColor"
                                    opacity="0.8"
                                  />
                                </svg>
                              </div>

                              <div className={styles.upcomingAmountGroup}>
                                <span className={styles.upcomingAmount}>{item.upcomingValue}</span>
                                <span className={styles.upcomingPercent}>{item.upcomingPercent}</span>
                              </div>

                              <div className={styles.countdownPill}>
                                {formatCountdown(remainingSec)}
                              </div>
                            </div>
                          </td>

                          {/* Next 7D Emission */}
                          <td className={styles.unlocksTd}>
                            <div className={styles.next7dPill}>
                              <span className={styles.emissionAmount}>{item.next7dEmission}</span>
                              <span className={styles.emissionPercent}>{item.next7dPercent}</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* VIEW 2: AGENDA (CARDS) VIEW FOR CRYPTO UNLOCKS */}
            {viewMode === "agenda" && (
              <div className={styles.agendaContainer}>
                {groupedUnlocks.map((group) => (
                  <div key={group.dateKey} className={styles.dateGroupSection}>
                    <div className={styles.dateGroupHeader}>
                      <div className={styles.dateBadge}>
                        <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
                          <rect x="2" y="2.5" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.4" />
                          <path d="M5 1.5v2M11 1.5v2M2 6h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                        </svg>
                        <span className={styles.dateGroupLabel}>{group.dateLabel}</span>
                      </div>
                      <span className={styles.dateGroupCount}>{group.items.length} unlocks</span>
                    </div>

                    <div className={styles.cardsGrid}>
                      {group.items.map((item) => {
                        const remainingSec = Math.max(
                          0,
                          item.countdownSecondsInitial - secondsElapsed
                        );

                        return (
                          <div key={item.id} className={styles.unlockCard}>
                            {/* Card Top: Logo, Ticker, Name, Unlock Type Badge */}
                            <div className={styles.unlockCardTopRow}>
                              <div className={styles.unlockTokenInfo}>
                                <CryptoLogo ticker={item.ticker} bg={item.logoBg} />
                                <div>
                                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    <h4 className={styles.ticker}>{item.ticker}</h4>
                                    <span
                                      className={
                                        item.change24h >= 0 ? styles.changeValGreen : styles.changeValRed
                                      }
                                      style={{ fontSize: 12 }}
                                    >
                                      {item.change24h >= 0 ? `+${item.change24h}%` : `${item.change24h}%`}
                                    </span>
                                  </div>
                                  <p className={styles.companyName}>{item.projectName}</p>
                                </div>
                              </div>

                              <span
                                className={`${styles.unlockTypeBadge} ${
                                  item.unlockType === "Linear" ? styles.linearTypeBadge : ""
                                }`}
                              >
                                {item.unlockType === "Cliff" ? "⚡ CLIFF UNLOCK" : "📈 LINEAR"}
                              </span>
                            </div>

                            {/* Card Metrics Grid */}
                            <div className={styles.unlockCardMetrics}>
                              <div className={styles.unlockMetricBox}>
                                <span className={styles.unlockMetricLabel}>Price</span>
                                <span className={styles.unlockMetricVal}>{item.price}</span>
                              </div>

                              <div className={styles.unlockMetricBox}>
                                <span className={styles.unlockMetricLabel}>Upcoming</span>
                                <span className={styles.unlockMetricVal} style={{ color: "#f472b6" }}>
                                  {item.upcomingValue}
                                </span>
                              </div>

                              <div className={styles.unlockMetricBox}>
                                <span className={styles.unlockMetricLabel}>Released</span>
                                <span className={styles.unlockMetricVal} style={{ color: "var(--emerald-400, #56d68f)" }}>
                                  {item.releasedPercent.toFixed(1)}%
                                </span>
                              </div>

                              <div className={styles.unlockMetricBox}>
                                <span className={styles.unlockMetricLabel}>7D Emission</span>
                                <span className={styles.unlockMetricVal}>{item.next7dEmission}</span>
                              </div>
                            </div>

                            {/* Progress bar */}
                            <div>
                              <div className={styles.progressTrack} style={{ width: "100%" }}>
                                <div
                                  className={styles.progressFill}
                                  style={{ width: `${item.releasedPercent}%` }}
                                />
                              </div>
                            </div>

                            {/* Card Footer: Live Countdown & Actions */}
                            <div className={styles.unlockCardFooter}>
                              <div className={styles.countdownPill}>
                                ⏱️ {formatCountdown(remainingSec)}
                              </div>

                              <div style={{ display: "flex", gap: 8 }}>
                                <button
                                  className={`${styles.watchBtn} ${
                                    item.isWatching ? styles.watchingActive : ""
                                  }`}
                                  onClick={() => toggleUnlockWatch(item.id)}
                                >
                                  {item.isWatching ? "★ Watching" : "☆ Watch"}
                                </button>

                                <button
                                  className={styles.tradeBtn}
                                  onClick={() => {
                                    onClose();
                                    window.dispatchEvent(
                                      new CustomEvent("i5-navigate", {
                                        detail: { targetId: "trade", symbol: item.ticker },
                                      })
                                    );
                                  }}
                                >
                                  Trade
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* VIEW 3: CALENDAR GRID VIEW FOR CRYPTO UNLOCKS */}
            {viewMode === "calendar" && (
              <div className={styles.calendarGridWrapper}>
                <div className={styles.calendarGridHeader}>
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName) => (
                    <div key={dayName} className={styles.calendarDayHeaderCell}>
                      {dayName}
                    </div>
                  ))}
                </div>

                <div className={styles.calendarDaysGrid}>
                  {cryptoCalendarDays.map((cell, idx) => {
                    if (cell.isBlank) {
                      return <div key={`blank-${idx}`} className={styles.blankDayCell} />;
                    }

                    const hasUnlocks = (cell.dayUnlocks?.length || 0) > 0;

                    return (
                      <div
                        key={cell.dateKey}
                        className={`${styles.calendarDayCell} ${
                          hasUnlocks ? styles.hasReportsDayCell : ""
                        }`}
                      >
                        <div className={styles.cellDayNumberRow}>
                          <span className={styles.cellDayNumber}>{cell.dayNum}</span>
                          {hasUnlocks && (
                            <span className={styles.cellReportCount}>
                              {cell.dayUnlocks?.length} unlocks
                            </span>
                          )}
                        </div>

                        {/* Mini Crypto Badges inside day cell */}
                        <div className={styles.miniTickersList}>
                          {cell.dayUnlocks?.map((u) => (
                            <div
                              key={u.id}
                              className={styles.miniTickerBadge}
                              style={{
                                backgroundColor: "rgba(236, 72, 153, 0.15)",
                                borderColor: "rgba(236, 72, 153, 0.35)",
                                color: "#f472b6",
                              }}
                            >
                              <span className={styles.miniTickerSymbol}>{u.ticker}</span>
                              <span className={styles.miniTickerMove}>{u.upcomingValue}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── STOCKS EARNINGS (STOCKS MODE) ────────────────────────── */}
        {modalTab === "earnings" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <div className={styles.searchBarRow}>
              <div className={styles.searchInputWrap}>
                <svg width={15} height={15} viewBox="0 0 16 16" fill="none" className={styles.searchIcon}>
                  <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M10 10l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  placeholder="Search stock ticker, company (e.g. AAPL, AMZN)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
            </div>

            <div className={styles.agendaContainer}>
              <div className={styles.dateGroupHeader}>
                <span className={styles.dateGroupLabel}>Thursday, Jul 30, 2026</span>
                <span className={styles.dateGroupCount}>{reports.length} reports</span>
              </div>

              <div className={styles.cardsGrid}>
                {reports.map((r) => (
                  <div key={r.id} className={styles.reportCard}>
                    <div className={styles.cardHeader}>
                      <div className={styles.companyInfo}>
                        <div className={styles.tickerAvatar} style={{ backgroundColor: r.avatarBg }}>
                          {r.ticker.slice(0, 2)}
                        </div>
                        <div>
                          <h4 className={styles.ticker}>{r.ticker}</h4>
                          <p className={styles.companyName}>{r.companyName}</p>
                        </div>
                      </div>
                      <span className={styles.sessionBadge}>{r.session === "AH" ? "AMC" : "BMO"}</span>
                    </div>

                    <div className={styles.financialMetrics}>
                      <div className={styles.metricItem}>
                        <span className={styles.metricLabel}>EPS EST</span>
                        <span className={styles.metricVal}>{r.epsEst}</span>
                      </div>
                      <div className={styles.metricItem}>
                        <span className={styles.metricLabel}>REV EST</span>
                        <span className={styles.metricVal}>{r.revEst}</span>
                      </div>
                      <div className={styles.metricItem}>
                        <span className={styles.metricLabel}>MOVE</span>
                        <span className={styles.metricVal}>{r.impliedMove}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
