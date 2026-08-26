"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./MarketAssetTableCard.module.css";
import QuickTradeModal, {
  SelectExchangeModal,
  TradeTokenInfo,
  IconHyperliquid,
  IconAster,
} from "./QuickTradeModal";
import TrendingTokensModal from "./TrendingTokensModal";

interface AssetItem {
  symbol: string;
  name: string;
  avatarBg: string;
  price: string;
  change24h: string;
  isPositive: boolean;
  vol24h: string;
  exchanges: string[];
}

const mockCryptoData: AssetItem[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    avatarBg: "#163A24",
    price: "$2,455.59",
    change24h: "+3.42%",
    isPositive: true,
    vol24h: "$14.2B",
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
    exchanges: ["Hyperliquid"],
  },
];

const mockStockData: AssetItem[] = [
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    avatarBg: "#064E3B",
    price: "$128.40",
    change24h: "+4.15%",
    isPositive: true,
    vol24h: "$34.2B",
    exchanges: ["Hyperliquid", "Aster"],
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    avatarBg: "#1F2937",
    price: "$226.50",
    change24h: "+1.20%",
    isPositive: true,
    vol24h: "$18.4B",
    exchanges: ["Aster"],
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    avatarBg: "#450A0A",
    price: "$248.80",
    change24h: "-2.40%",
    isPositive: false,
    vol24h: "$22.6B",
    exchanges: ["Hyperliquid"],
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    avatarBg: "#0C2340",
    price: "$418.20",
    change24h: "+0.85%",
    isPositive: true,
    vol24h: "$14.1B",
    exchanges: ["Aster"],
  },
  {
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    avatarBg: "#3A2A14",
    price: "$186.40",
    change24h: "+2.30%",
    isPositive: true,
    vol24h: "$12.8B",
    exchanges: ["Hyperliquid"],
  },
  {
    symbol: "META",
    name: "Meta Platforms, Inc.",
    avatarBg: "#0A2540",
    price: "$512.90",
    change24h: "+3.10%",
    isPositive: true,
    vol24h: "$11.2B",
    exchanges: ["Aster"],
  },
  {
    symbol: "PLTR",
    name: "Palantir Technologies",
    avatarBg: "#18181B",
    price: "$31.40",
    change24h: "+6.80%",
    isPositive: true,
    vol24h: "$6.2B",
    exchanges: ["Hyperliquid"],
  },
  {
    symbol: "AMD",
    name: "Advanced Micro Devices",
    avatarBg: "#2E1010",
    price: "$154.20",
    change24h: "+5.40%",
    isPositive: true,
    vol24h: "$8.6B",
    exchanges: ["Aster"],
  },
  {
    symbol: "COIN",
    name: "Coinbase Global",
    avatarBg: "#0052FF",
    price: "$214.60",
    change24h: "+7.25%",
    isPositive: true,
    vol24h: "$5.4B",
    exchanges: ["Hyperliquid", "Aster"],
  },
];

const categoryPills = ["All", "Gainers", "Losers", "Trending", "Cryptos", "Stocks", "AI", "DeFi"];

export default function MarketAssetTableCard() {
  const [activePill, setActivePill] = useState<string>("All");
  const [selectedExchange, setSelectedExchange] = useState<"All" | "Hyperliquid" | "Aster">("All");
  const [isExchangeMenuOpen, setIsExchangeMenuOpen] = useState<boolean>(false);

  // Modal States
  const [viewAllModalOpen, setViewAllModalOpen] = useState<boolean>(false);
  const [tradeModalOpen, setTradeModalOpen] = useState<boolean>(false);
  const [exchangePickerOpen, setExchangePickerOpen] = useState<boolean>(false);
  const [selectedTradeToken, setSelectedTradeToken] = useState<TradeTokenInfo | null>(null);
  const [activeTradeExchange, setActiveTradeExchange] = useState<string>("Hyperliquid");

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Listen for navigation / subsidebar filter changes (e.g. user clicks Stocks in sidepanel)
  useEffect(() => {
    const handleSidepanelFilter = (e: Event) => {
      const customEvent = e as CustomEvent<{ tab?: string }>;
      if (customEvent.detail?.tab === "stocks") {
        setActivePill("Stocks");
      } else if (customEvent.detail?.tab === "crypto") {
        setActivePill("Cryptos");
      }
    };
    window.addEventListener("i5-sidepanel-filter", handleSidepanelFilter);
    return () => window.removeEventListener("i5-sidepanel-filter", handleSidepanelFilter);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsExchangeMenuOpen(false);
      }
    }
    if (isExchangeMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isExchangeMenuOpen]);

  const isStockView = activePill === "Stocks";
  const currentBaseData = isStockView ? mockStockData : mockCryptoData;

  // Filter asset data by Category Pill and Selected Exchange
  const filteredAssets = currentBaseData.filter((asset) => {
    // Exchange filter
    if (selectedExchange !== "All" && !asset.exchanges.includes(selectedExchange)) {
      return false;
    }
    // Pill filter
    if (activePill === "Gainers" && !asset.isPositive) return false;
    if (activePill === "Losers" && asset.isPositive) return false;
    return true;
  });

  // Handle Trade Button Click
  const handleTradeClick = (asset: AssetItem) => {
    const tokenInfo: TradeTokenInfo = {
      symbol: asset.symbol,
      name: asset.name,
      price: asset.price,
      change24h: asset.change24h,
      isPositive: asset.isPositive,
      avatarBg: asset.avatarBg,
      exchanges: asset.exchanges,
    };

    setSelectedTradeToken(tokenInfo);

    if (selectedExchange !== "All") {
      // Case 1: Specific exchange already selected in dropdown
      setActiveTradeExchange(selectedExchange);
      setTradeModalOpen(true);
    } else {
      // Case 2: All is selected
      if (asset.exchanges.length > 1) {
        // Multi-exchange token: prompt user to pick exchange first
        setExchangePickerOpen(true);
      } else {
        // Single exchange token: open directly
        setActiveTradeExchange(asset.exchanges[0] || "Hyperliquid");
        setTradeModalOpen(true);
      }
    }
  };

  const handleSelectExchangeFromPicker = (exch: string) => {
    setActiveTradeExchange(exch);
    setExchangePickerOpen(false);
    setTradeModalOpen(true);
  };

  // Open Terminal on token click
  const handleOpenTerminal = (asset: AssetItem) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("i5-navigate", {
          detail: {
            targetId: "trade",
            symbol: asset.symbol,
            name: asset.name,
          },
        })
      );
    }
  };

  return (
    <div className={styles.card} role="region" aria-label="Market Asset Radar">
      {/* Clean Header without stroke or fill */}
      <div className={styles.tabsHeader}>
        <h3 className={styles.sectionHeading}>
          {isStockView ? "TRENDING STOCKS" : "TRENDING TOKENS"}
        </h3>

        {/* Right Header Controls: Exchange Dropdown + View More */}
        <div className={styles.rightHeaderControls}>
          {/* Exchange Dropdown Selector */}
          <div className={styles.exchangeDropdownWrapper} ref={dropdownRef}>
            <button
              className={styles.exchangeSelectBtn}
              onClick={() => setIsExchangeMenuOpen(!isExchangeMenuOpen)}
              aria-label="Select Exchange"
            >
              {selectedExchange === "Hyperliquid" ? (
                <IconHyperliquid size={14} />
              ) : selectedExchange === "Aster" ? (
                <IconAster size={14} />
              ) : (
                <svg width={14} height={14} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="5" height="5" rx="1" />
                  <rect x="9" y="2" width="5" height="5" rx="1" />
                  <rect x="2" y="9" width="5" height="5" rx="1" />
                  <rect x="9" y="9" width="5" height="5" rx="1" />
                </svg>
              )}
              <span>{selectedExchange === "All" ? "All Exchanges" : selectedExchange}</span>
              <span style={{ fontSize: "9px", opacity: 0.7 }}>▼</span>
            </button>

            {isExchangeMenuOpen && (
              <div className={styles.exchangeDropdownMenu}>
                <button
                  className={`${styles.exchangeMenuItem} ${
                    selectedExchange === "All" ? styles.exchangeMenuItemActive : ""
                  }`}
                  onClick={() => {
                    setSelectedExchange("All");
                    setIsExchangeMenuOpen(false);
                  }}
                >
                  <svg width={14} height={14} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="5" height="5" rx="1" />
                    <rect x="9" y="2" width="5" height="5" rx="1" />
                    <rect x="2" y="9" width="5" height="5" rx="1" />
                    <rect x="9" y="9" width="5" height="5" rx="1" />
                  </svg>
                  <span>All Exchanges</span>
                </button>

                <button
                  className={`${styles.exchangeMenuItem} ${
                    selectedExchange === "Hyperliquid" ? styles.exchangeMenuItemActive : ""
                  }`}
                  onClick={() => {
                    setSelectedExchange("Hyperliquid");
                    setIsExchangeMenuOpen(false);
                  }}
                >
                  <IconHyperliquid size={14} />
                  <span>Hyperliquid</span>
                </button>

                <button
                  className={`${styles.exchangeMenuItem} ${
                    selectedExchange === "Aster" ? styles.exchangeMenuItemActive : ""
                  }`}
                  onClick={() => {
                    setSelectedExchange("Aster");
                    setIsExchangeMenuOpen(false);
                  }}
                >
                  <IconAster size={14} />
                  <span>Aster</span>
                </button>
              </div>
            )}
          </div>

          <button
            className={styles.viewMoreLink}
            onClick={() => setViewAllModalOpen(true)}
            aria-label="View all trending tokens"
          >
            View all ↗
          </button>
        </div>
      </div>

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

      {/* Desktop Table View */}
      <div className={styles.desktopTableView}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ASSET</th>
                <th>PRICE</th>
                <th>24H %</th>
                <th>VOL (24H)</th>
                <th style={{ textAlign: "right" }}>TRADE</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.slice(0, 7).map((asset) => (
                <tr key={asset.symbol}>
                  {/* Asset Column */}
                  <td>
                    <div className={styles.assetCell}>
                      <span
                        className={styles.assetAvatar}
                        style={{ backgroundColor: asset.avatarBg }}
                      >
                        {!isStockView ? (
                          <img
                            src={`https://assets.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`}
                            alt={asset.symbol}
                            className={styles.avatarImg}
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                              if (fallback) fallback.style.display = "flex";
                            }}
                          />
                        ) : null}
                        <span
                          className={styles.avatarFallback}
                          style={{ display: isStockView ? "flex" : "none" }}
                        >
                          {asset.symbol.slice(0, 2)}
                        </span>
                      </span>
                      <div
                        className={`${styles.assetMeta} ${styles.tokenClickable}`}
                        onClick={() => handleOpenTerminal(asset)}
                        title="Click to open terminal"
                      >
                        <span className={styles.assetSymbol}>{asset.symbol}</span>
                        <div className={styles.nameRow}>
                          <span className={styles.assetName}>{asset.name}</span>
                          <div className={styles.exchangeIconsInline}>
                            {asset.exchanges.includes("Hyperliquid") && (
                              <span className={styles.exchangeIconMark} title="Available on Hyperliquid">
                                <IconHyperliquid size={13} />
                              </span>
                            )}
                            {asset.exchanges.includes("Aster") && (
                              <span className={styles.exchangeIconMark} title="Available on Aster">
                                <IconAster size={13} />
                              </span>
                            )}
                          </div>
                        </div>
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

                  {/* Trade Button */}
                  <td style={{ textAlign: "right" }}>
                    <button
                      className={styles.tradeBtn}
                      onClick={() => handleTradeClick(asset)}
                      title={`Trade ${asset.symbol}`}
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

      {/* Mobile Responsive Cards View */}
      <div className={styles.mobileCardsView}>
        {filteredAssets.slice(0, 7).map((asset) => (
          <div
            key={asset.symbol}
            className={styles.mobileAssetCard}
            onClick={() => handleOpenTerminal(asset)}
          >
            <div className={styles.mobileCardTop}>
              <div className={styles.mobileCardLeft}>
                <span
                  className={styles.assetAvatar}
                  style={{ backgroundColor: asset.avatarBg }}
                >
                  {!isStockView ? (
                    <img
                      src={`https://assets.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`}
                      alt={asset.symbol}
                      className={styles.avatarImg}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <span
                    className={styles.avatarFallback}
                    style={{ display: isStockView ? "flex" : "none" }}
                  >
                    {asset.symbol.slice(0, 2)}
                  </span>
                </span>
                <div className={styles.assetMeta}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span className={styles.assetSymbol}>{asset.symbol}</span>
                    <div className={styles.exchangeIconsInline}>
                      {asset.exchanges.includes("Hyperliquid") && (
                        <span className={styles.exchangeIconMark} title="Available on Hyperliquid">
                          <IconHyperliquid size={12} />
                        </span>
                      )}
                      {asset.exchanges.includes("Aster") && (
                        <span className={styles.exchangeIconMark} title="Available on Aster">
                          <IconAster size={12} />
                        </span>
                      )}
                    </div>
                  </div>
                  <span className={styles.assetName}>{asset.name}</span>
                </div>
              </div>

              <div className={styles.mobileCardRight}>
                <span className={styles.priceCell}>{asset.price}</span>
                <span className={asset.isPositive ? styles.gainCell : styles.lossCell}>
                  {asset.change24h}
                </span>
              </div>
            </div>

            <div className={styles.mobileCardBottom}>
              <span className={styles.mobileVolLabel}>
                Vol: <span className={styles.mobileVolVal}>{asset.vol24h}</span>
              </span>
              <button
                type="button"
                className={styles.tradeBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTradeClick(asset);
                }}
                title={`Trade ${asset.symbol}`}
              >
                TRADE
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* All Trending Tokens / Stocks Full View Modal */}
      <TrendingTokensModal
        isOpen={viewAllModalOpen}
        onClose={() => setViewAllModalOpen(false)}
        initialExchange={selectedExchange}
        isStockMode={isStockView}
      />

      {/* Select Exchange Prompt Modal (when All is selected and token has multiple exchanges) */}
      <SelectExchangeModal
        isOpen={exchangePickerOpen}
        onClose={() => setExchangePickerOpen(false)}
        token={selectedTradeToken}
        onSelectExchange={handleSelectExchangeFromPicker}
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
