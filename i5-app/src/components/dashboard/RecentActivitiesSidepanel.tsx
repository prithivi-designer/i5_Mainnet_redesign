"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  X,
  Play,
  Pause,
  ExternalLink,
  Flame,
  Zap,
  TrendingUp,
  Radio,
  Lock,
  Globe,
} from "lucide-react";
import styles from "./RecentActivitiesSidepanel.module.css";

export type ActivityType = "buy" | "sell" | "whale" | "signal" | "unlock" | "macro";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  entityName: string;
  tokenSymbol: string;
  tokenName: string;
  tokenAvatar?: string;
  avatarIcon?: string;
  actionText: string;
  amount: string;
  venue?: string;
  timestamp: string;
  secondsAgo: number;
  highlightGain?: string;
  txHash?: string;
}

const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: "act-1",
    type: "buy",
    entityName: "Murad (Oracle)",
    tokenSymbol: "$DOHO",
    tokenName: "Doho Token",
    avatarIcon: "🐶",
    tokenAvatar: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=80&h=80&fit=crop&q=80",
    actionText: "Bought 14,200 $DOHO",
    amount: "$4,410.00",
    venue: "Hyperliquid",
    timestamp: "Just now",
    secondsAgo: 3,
    highlightGain: "+18.4%",
    txHash: "0x8f2a...b3dc",
  },
  {
    id: "act-2",
    type: "whale",
    entityName: "Whale Inflow 🐋",
    tokenSymbol: "$USDC",
    tokenName: "USD Coin",
    avatarIcon: "🐋",
    actionText: "Deposited 500 ETH ($1.62M)",
    amount: "$1.62M",
    venue: "Arbitrum Perps",
    timestamp: "18s ago",
    secondsAgo: 18,
    txHash: "0x32c1...94a1",
  },
  {
    id: "act-3",
    type: "buy",
    entityName: "0x71a...94f",
    tokenSymbol: "$CASHCAT",
    tokenName: "Cash Cat",
    avatarIcon: "🐱",
    tokenAvatar: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=80&h=80&fit=crop&q=80",
    actionText: "Bought 11.80 $CASHCAT",
    amount: "$2,290.00",
    venue: "Aster",
    timestamp: "42s ago",
    secondsAgo: 42,
    highlightGain: "+14.2%",
    txHash: "0x71a4...94f2",
  },
  {
    id: "act-4",
    type: "signal",
    entityName: "Technical Signal ⚡",
    tokenSymbol: "$SOL",
    tokenName: "Solana",
    avatarIcon: "⚡",
    actionText: "4H Golden Cross Breakout",
    amount: "$184.20",
    venue: "Mainnet",
    timestamp: "1m ago",
    secondsAgo: 70,
    highlightGain: "+8.9%",
  },
  {
    id: "act-5",
    type: "sell",
    entityName: "AlphaBot AI",
    tokenSymbol: "$PEPEBOT",
    tokenName: "PepeBot AI",
    avatarIcon: "🤖",
    tokenAvatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&h=80&fit=crop&q=80",
    actionText: "Sold 3,400 $PEPEBOT",
    amount: "$1,820.00",
    venue: "Pacifica",
    timestamp: "2m ago",
    secondsAgo: 120,
    txHash: "0x98b2...12e4",
  },
  {
    id: "act-6",
    type: "buy",
    entityName: "Top Trader #4",
    tokenSymbol: "$FOUR",
    tokenName: "FOUR BNB",
    avatarIcon: "🌊",
    tokenAvatar: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=80&h=80&fit=crop&q=80",
    actionText: "Bought 82,000 $FOUR",
    amount: "$12,450.00",
    venue: "Hyperliquid",
    timestamp: "3m ago",
    secondsAgo: 180,
    highlightGain: "+24.6%",
    txHash: "0x12d4...88f1",
  },
  {
    id: "act-7",
    type: "unlock",
    entityName: "Catalyst Alert 🔓",
    tokenSymbol: "$OP",
    tokenName: "Optimism",
    avatarIcon: "🔓",
    actionText: "2.4% Supply Cliff Release",
    amount: "$34.2M",
    venue: "Optimism",
    timestamp: "5m ago",
    secondsAgo: 300,
  },
  {
    id: "act-8",
    type: "buy",
    entityName: "KOL Murad",
    tokenSymbol: "$MCAT",
    tokenName: "MOONCAT",
    avatarIcon: "🐱",
    tokenAvatar: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=80&h=80&fit=crop&q=80",
    actionText: "Accumulated 45,000 $MCAT",
    amount: "$8,500.00",
    venue: "Aster",
    timestamp: "7m ago",
    secondsAgo: 420,
    highlightGain: "+34.8%",
    txHash: "0x55c9...a123",
  },
  {
    id: "act-9",
    type: "macro",
    entityName: "Macro Event 🌐",
    tokenSymbol: "$BTC",
    tokenName: "Bitcoin",
    avatarIcon: "🌐",
    actionText: "Core CPI Cooling at -0.2%",
    amount: "$68,400.00",
    venue: "Global",
    timestamp: "12m ago",
    secondsAgo: 720,
    highlightGain: "+3.4%",
  },
  {
    id: "act-10",
    type: "sell",
    entityName: "0x89d...43a",
    tokenSymbol: "$KATE",
    tokenName: "KATE",
    avatarIcon: "👩",
    tokenAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&q=80",
    actionText: "Took Profit 1,200 $KATE",
    amount: "$4,100.00",
    venue: "GRVT",
    timestamp: "18m ago",
    secondsAgo: 1080,
    txHash: "0x89d1...43ae",
  },
];

export default function RecentActivitiesSidepanel() {
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState<"all" | "trades" | "whales" | "signals" | "unlocks">("all");
  const [isLiveStreaming, setIsLiveStreaming] = useState(true);

  // Simulated live feed additions
  useEffect(() => {
    if (!isLiveStreaming) return;

    const interval = setInterval(() => {
      const liveEvents: ActivityItem[] = [
        {
          id: `live-${Date.now()}-1`,
          type: "buy",
          entityName: "Smart Wallet #12",
          tokenSymbol: "$DOHO",
          tokenName: "Doho Token",
          avatarIcon: "🐶",
          tokenAvatar: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=80&h=80&fit=crop&q=80",
          actionText: "Executed Instant Swap",
          amount: "$3,890.00",
          venue: "Hyperliquid",
          timestamp: "Just now",
          secondsAgo: 1,
          highlightGain: "+18.4%",
        },
        {
          id: `live-${Date.now()}-2`,
          type: "whale",
          entityName: "Whale Alert 🐋",
          tokenSymbol: "$ETH",
          tokenName: "Ethereum",
          avatarIcon: "🐋",
          actionText: "Transferred 350 ETH to Perp Vault",
          amount: "$1.14M",
          venue: "Pacifica",
          timestamp: "Just now",
          secondsAgo: 1,
        },
        {
          id: `live-${Date.now()}-3`,
          type: "buy",
          entityName: "KOL Murad",
          tokenSymbol: "$CASHCAT",
          tokenName: "Cash Cat",
          avatarIcon: "🐱",
          tokenAvatar: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=80&h=80&fit=crop&q=80",
          actionText: "Accumulated 18.4 CASHCAT",
          amount: "$4,210.00",
          venue: "Aster",
          timestamp: "Just now",
          secondsAgo: 1,
          highlightGain: "+14.2%",
        },
      ];

      const randomEvent = liveEvents[Math.floor(Math.random() * liveEvents.length)];
      setActivities((prev) => [randomEvent, ...prev.slice(0, 19)]);
    }, 9000);

    return () => clearInterval(interval);
  }, [isLiveStreaming]);

  // Filtering
  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      // Filter tab
      if (filterTab === "trades" && act.type !== "buy" && act.type !== "sell") return false;
      if (filterTab === "whales" && act.type !== "whale") return false;
      if (filterTab === "signals" && act.type !== "signal" && act.type !== "macro") return false;
      if (filterTab === "unlocks" && act.type !== "unlock") return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchEntity = act.entityName.toLowerCase().includes(q);
        const matchToken = act.tokenSymbol.toLowerCase().includes(q) || act.tokenName.toLowerCase().includes(q);
        const matchVenue = act.venue?.toLowerCase().includes(q);
        if (!matchEntity && !matchToken && !matchVenue) return false;
      }

      return true;
    });
  }, [activities, filterTab, searchQuery]);

  const handleOpenTrade = (item: ActivityItem) => {
    const cleanSymbol = item.tokenSymbol.replace("$", "").trim();
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-trade-terminal", {
          detail: {
            symbol: cleanSymbol,
            name: item.tokenName,
            price: item.amount,
          },
        })
      );
    }
  };

  return (
    <div className={styles.container}>
      {/* 1. Header with Live Status Pulse */}
      <div className={styles.headerRow}>
        <div className={styles.headerTitleGroup}>
          <h3 className={styles.headerTitle}>Recent Activities</h3>
          <div className={styles.liveBadge} title="Real-time live on-chain stream">
            <span className={styles.liveDot} />
            <span>LIVE</span>
          </div>
        </div>

        <button
          className={styles.pauseBtn}
          onClick={() => setIsLiveStreaming(!isLiveStreaming)}
          title={isLiveStreaming ? "Pause Live Feed" : "Resume Live Feed"}
          aria-label={isLiveStreaming ? "Pause Live Feed" : "Resume Live Feed"}
        >
          {isLiveStreaming ? <Pause size={13} /> : <Play size={13} />}
        </button>
      </div>

      {/* 2. Search Input */}
      <div className={styles.searchWrapper}>
        <Search size={12} className={styles.searchIcon} />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Filter token, wallet or venue..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            className={styles.clearSearchBtn}
            onClick={() => setSearchQuery("")}
            title="Clear search"
          >
            <X size={12} />
          </button>
        )}
      </div>

      {/* 3. Category Filter Pills */}
      <div className={styles.filterPillsRow}>
        {(
          [
            { id: "all", label: "All" },
            { id: "trades", label: "Trades" },
            { id: "whales", label: "Whales" },
            { id: "signals", label: "Signals" },
            { id: "unlocks", label: "Unlocks" },
          ] as const
        ).map((pill) => (
          <button
            key={pill.id}
            className={`${styles.filterPill} ${
              filterTab === pill.id ? styles.filterPillActive : ""
            }`}
            onClick={() => setFilterTab(pill.id)}
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* 4. Activity Feed List */}
      <div className={styles.activityList}>
        {filteredActivities.length === 0 ? (
          <div className={styles.emptyState}>No activity found</div>
        ) : (
          filteredActivities.map((act) => (
            <div
              key={act.id}
              className={styles.activityCard}
              onClick={() => handleOpenTrade(act)}
              title={`Trade ${act.tokenSymbol} (${act.actionText})`}
            >
              {/* Left Side: Avatar + Details */}
              <div className={styles.activityLeft}>
                <div className={styles.avatarWrap}>
                  {act.tokenAvatar ? (
                    <img src={act.tokenAvatar} alt={act.tokenSymbol} className={styles.avatarImg} />
                  ) : (
                    <div className={styles.avatarIconFallback}>{act.avatarIcon || "⚡"}</div>
                  )}
                </div>

                <div className={styles.activityMeta}>
                  <div className={styles.activityTitleRow}>
                    {/* Action Badge */}
                    {act.type === "buy" && <span className={styles.badgeBuy}>BUY</span>}
                    {act.type === "sell" && <span className={styles.badgeSell}>SELL</span>}
                    {act.type === "whale" && <span className={styles.badgeWhale}>WHALE</span>}
                    {act.type === "signal" && <span className={styles.badgeSignal}>SIGNAL</span>}
                    {act.type === "unlock" && <span className={styles.badgeUnlock}>UNLOCK</span>}
                    {act.type === "macro" && <span className={styles.badgeMacro}>MACRO</span>}

                    <span className={styles.entityName}>{act.tokenSymbol}</span>
                  </div>

                  <div className={styles.activitySubRow}>
                    <span>{act.entityName}</span>
                    {act.venue && (
                      <>
                        <span>•</span>
                        <span className={styles.venueTag}>{act.venue}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Side: Amount + Time */}
              <div className={styles.activityRight}>
                <span className={styles.amountVal}>{act.amount}</span>
                <span className={styles.timeAgo}>{act.timestamp}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
