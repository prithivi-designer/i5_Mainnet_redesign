"use client";

import React, { useState, useEffect } from "react";
import styles from "./TrendingTokensModal.module.css";
import QuickTradeModal, {
  SelectExchangeModal,
  TradeTokenInfo,
  IconHyperliquid,
  IconAster,
} from "./QuickTradeModal";

export interface TrendingAssetItem {
  symbol: string;
  name: string;
  avatarBg: string;
  price: string;
  change24h: string;
  isPositive: boolean;
  vol24h: string;
  marketCap?: string;
  category?: string;
  exchanges: string[];
}

export const fullTrendingAssets: TrendingAssetItem[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    avatarBg: "#163A24",
    price: "$2,455.59",
    change24h: "+3.42%",
    isPositive: true,
    vol24h: "$14.2B",
    marketCap: "$295.4B",
    category: "Layer 1",
    exchanges: ["Hyperliquid", "Aster"],
  },
  {
    symbol: "SOL",
    name: "Solana",
    avatarBg: "#1F2B37",
    price: "$102.60",
    change24h: "-1.12%",
    isPositive: false,
    vol24h: "$4.1B",
    marketCap: "$47.8B",
    category: "Layer 1",
    exchanges: ["Hyperliquid", "Aster"],
  },
  {
    symbol: "TIA",
    name: "Celestia",
    avatarBg: "#133E38",
    price: "$18.26",
    change24h: "+8.15%",
    isPositive: true,
    vol24h: "$820M",
    marketCap: "$3.2B",
    category: "Modular",
    exchanges: ["Hyperliquid"],
  },
  {
    symbol: "ARB",
    name: "Arbitrum",
    avatarBg: "#3A2A14",
    price: "$2.11",
    change24h: "+2.10%",
    isPositive: true,
    vol24h: "$1.2B",
    marketCap: "$6.8B",
    category: "Layer 2",
    exchanges: ["Hyperliquid", "Aster"],
  },
  {
    symbol: "SUI",
    name: "Sui Network",
    avatarBg: "#163A24",
    price: "$3.45",
    change24h: "+12.40%",
    isPositive: true,
    vol24h: "$950M",
    marketCap: "$8.9B",
    category: "Layer 1",
    exchanges: ["Hyperliquid", "Aster"],
  },
  {
    symbol: "RENDER",
    name: "Render Token",
    avatarBg: "#133E38",
    price: "$6.45",
    change24h: "+5.80%",
    isPositive: true,
    vol24h: "$320M",
    marketCap: "$3.4B",
    category: "AI",
    exchanges: ["Aster"],
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    avatarBg: "#451A03",
    price: "$64,238.40",
    change24h: "+2.45%",
    isPositive: true,
    vol24h: "$28.4B",
    marketCap: "$1.26T",
    category: "Layer 1",
    exchanges: ["Hyperliquid", "Aster"],
  },
  {
    symbol: "AVAX",
    name: "Avalanche",
    avatarBg: "#3B181E",
    price: "$27.80",
    change24h: "+4.10%",
    isPositive: true,
    vol24h: "$480M",
    marketCap: "$11.2B",
    category: "Layer 1",
    exchanges: ["Hyperliquid"],
  },
  {
    symbol: "DOGE",
    name: "Dogecoin",
    avatarBg: "#4D3800",
    price: "$0.1420",
    change24h: "+7.80%",
    isPositive: true,
    vol24h: "$1.8B",
    marketCap: "$20.8B",
    category: "Meme",
    exchanges: ["Hyperliquid", "Aster"],
  },
  {
    symbol: "NEAR",
    name: "NEAR Protocol",
    avatarBg: "#1E293B",
    price: "$5.12",
    change24h: "+6.35%",
    isPositive: true,
    vol24h: "$410M",
    marketCap: "$5.9B",
    category: "AI",
    exchanges: ["Hyperliquid", "Aster"],
  },
  {
    symbol: "LINK",
    name: "Chainlink",
    avatarBg: "#0F172A",
    price: "$14.80",
    change24h: "+1.90%",
    isPositive: true,
    vol24h: "$380M",
    marketCap: "$8.9B",
    category: "DeFi",
    exchanges: ["Hyperliquid", "Aster"],
  },
  {
    symbol: "INJ",
    name: "Injective",
    avatarBg: "#164E63",
    price: "$22.40",
    change24h: "-2.80%",
    isPositive: false,
    vol24h: "$290M",
    marketCap: "$2.2B",
    category: "DeFi",
    exchanges: ["Hyperliquid"],
  },
  {
    symbol: "APT",
    name: "Aptos",
    avatarBg: "#1E1B4B",
    price: "$8.65",
    change24h: "+3.20%",
    isPositive: true,
    vol24h: "$240M",
    marketCap: "$4.1B",
    category: "Layer 1",
    exchanges: ["Hyperliquid", "Aster"],
  },
  {
    symbol: "OP",
    name: "Optimism",
    avatarBg: "#4C0519",
    price: "$1.84",
    change24h: "-0.75%",
    isPositive: false,
    vol24h: "$190M",
    marketCap: "$2.4B",
    category: "Layer 2",
    exchanges: ["Hyperliquid", "Aster"],
  },
];

interface TrendingTokensModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialExchange?: "All" | "Hyperliquid" | "Aster";
}

export default function TrendingTokensModal({
  isOpen,
  onClose,
  initialExchange = "All",
}: TrendingTokensModalProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activePill, setActivePill] = useState<string>("All");
  const [selectedExchange, setSelectedExchange] = useState<"All" | "Hyperliquid" | "Aster">(
    initialExchange
  );

  // Trade modals
  const [tradeModalOpen, setTradeModalOpen] = useState<boolean>(false);
  const [exchangePickerOpen, setExchangePickerOpen] = useState<boolean>(false);
  const [selectedTradeToken, setSelectedTradeToken] = useState<TradeTokenInfo | null>(null);
  const [activeTradeExchange, setActiveTradeExchange] = useState<string>("Hyperliquid");

  // Esc key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categoryPills = ["All", "Gainers", "Losers", "Layer 1", "Layer 2", "AI", "DeFi", "Meme"];

  const filtered = fullTrendingAssets.filter((token) => {
    // Exchange filter
    if (selectedExchange !== "All" && !token.exchanges.includes(selectedExchange)) {
      return false;
    }
    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!token.symbol.toLowerCase().includes(q) && !token.name.toLowerCase().includes(q)) {
        return false;
      }
    }
    // Category pill
    if (activePill === "Gainers" && !token.isPositive) return false;
    if (activePill === "Losers" && token.isPositive) return false;
    if (activePill === "Layer 1" && token.category !== "Layer 1") return false;
    if (activePill === "Layer 2" && token.category !== "Layer 2") return false;
    if (activePill === "AI" && token.category !== "AI") return false;
    if (activePill === "DeFi" && token.category !== "DeFi") return false;
    if (activePill === "Meme" && token.category !== "Meme") return false;

    return true;
  });

  const handleOpenTerminal = (token: TrendingAssetItem) => {
    onClose();
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("i5-navigate", {
          detail: {
            targetId: "trade",
            symbol: token.symbol,
            name: token.name,
          },
        })
      );
    }
  };

  const handleTradeClick = (token: TrendingAssetItem) => {
    const tokenInfo: TradeTokenInfo = {
      symbol: token.symbol,
      name: token.name,
      price: token.price,
      change24h: token.change24h,
      isPositive: token.isPositive,
      avatarBg: token.avatarBg,
      exchanges: token.exchanges,
    };

    setSelectedTradeToken(tokenInfo);

    if (selectedExchange !== "All") {
      setActiveTradeExchange(selectedExchange);
      setTradeModalOpen(true);
    } else {
      if (token.exchanges.length > 1) {
        setExchangePickerOpen(true);
      } else {
        setActiveTradeExchange(token.exchanges[0] || "Hyperliquid");
        setTradeModalOpen(true);
      }
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>All Trending Tokens</h2>
            <span className={styles.badgeTotal}>{filtered.length} Assets</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        {/* Controls Bar */}
        <div className={styles.controlsBar}>
          <div className={styles.searchBox}>
            <svg width={14} height={14} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="7" cy="7" r="5" />
              <path d="M11 11l3.5 3.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search symbol or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className={styles.pillsList}>
            {categoryPills.map((pill) => (
              <button
                key={pill}
                className={`${styles.pillBtn} ${activePill === pill ? styles.pillBtnActive : ""}`}
                onClick={() => setActivePill(pill)}
              >
                {pill}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className={styles.tableArea}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ASSET</th>
                <th>PRICE</th>
                <th>24H %</th>
                <th>VOL (24H)</th>
                <th>MARKET CAP</th>
                <th style={{ textAlign: "right" }}>TRADE</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((token) => (
                <tr key={token.symbol}>
                  <td>
                    <div className={styles.assetCell}>
                      <span
                        className={styles.avatar}
                        style={{ backgroundColor: token.avatarBg }}
                      >
                        {token.symbol.slice(0, 2)}
                      </span>
                      <div
                        className={styles.assetMeta}
                        onClick={() => handleOpenTerminal(token)}
                        title="Click to open trade terminal"
                        style={{ cursor: "pointer" }}
                      >
                        <span className={styles.symbol}>{token.symbol}</span>
                        <div className={styles.nameRow}>
                          <span className={styles.name}>{token.name}</span>
                          <div className={styles.exchangeIconsInline}>
                            {token.exchanges.includes("Hyperliquid") && (
                              <IconHyperliquid size={13} />
                            )}
                            {token.exchanges.includes("Aster") && (
                              <IconAster size={13} />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className={styles.price}>{token.price}</td>
                  <td className={token.isPositive ? styles.changePos : styles.changeNeg}>
                    {token.change24h}
                  </td>
                  <td className={styles.vol}>{token.vol24h}</td>
                  <td className={styles.vol}>{token.marketCap || "—"}</td>
                  <td style={{ textAlign: "right" }}>
                    <button
                      className={styles.tradeBtn}
                      onClick={() => handleTradeClick(token)}
                    >
                      TRADE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Select Exchange Prompt Modal */}
      <SelectExchangeModal
        isOpen={exchangePickerOpen}
        onClose={() => setExchangePickerOpen(false)}
        token={selectedTradeToken}
        onSelectExchange={(exch) => {
          setActiveTradeExchange(exch);
          setExchangePickerOpen(false);
          setTradeModalOpen(true);
        }}
      />

      {/* Quick Trade Modal */}
      <QuickTradeModal
        isOpen={tradeModalOpen}
        onClose={() => setTradeModalOpen(false)}
        token={selectedTradeToken}
        initialSide="LONG"
        exchange={activeTradeExchange}
      />
    </div>
  );
}
