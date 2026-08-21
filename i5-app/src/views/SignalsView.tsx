"use client";

import React, { useState } from "react";
import { Settings, SlidersHorizontal, Clock, FileText, Lock } from "lucide-react";
import styles from "./SignalsView.module.css";
import SignalDetailModal from "./SignalDetailModal";

interface Signal {
  id: number;
  asset: string;
  assetName: string;
  type: "Long" | "Short";
  risk: "Low" | "Medium" | "High";
  range: string;
  target: string;
  stopLoss: string;
  time: string;
  source: string;
  thesis: string;
  locked?: boolean;
  category?: string; // used for macro filters
}

const TECHNICAL_SIGNALS: Signal[] = [
  { id: 1, asset: "BTC", assetName: "Bitcoin", type: "Long", risk: "Low", range: "$62,400 - $63,100", target: "$66,500", stopLoss: "$61,200", time: "4m ago", source: "Chart Analyzer", thesis: "Bitcoin RSI Oversold Bounce" },
  { id: 2, asset: "ETH", assetName: "Ethereum", type: "Long", risk: "Medium", range: "$3,450 - $3,380", target: "$3,750", stopLoss: "$3,250", time: "12m ago", source: "News Analyzer", thesis: "ETF Inflows Spiking heavily" },
  { id: 3, asset: "SOL", assetName: "Solana", type: "Long", risk: "Low", range: "$142.50 - $148.00", target: "$165.00", stopLoss: "$136.00", time: "1h ago", source: "Chart Analyzer", thesis: "Whale Accumulation Ping locally" },
  { id: 4, asset: "ARB", assetName: "Arbitrum", type: "Short", risk: "Medium", range: "$0.124 - $0.125", target: "$0.110", stopLoss: "$0.132", time: "2h ago", source: "News Analyzer", thesis: "Private Alpha: Funding Rates turning" },
  { id: 5, asset: "HYPE", assetName: "Hype", type: "Short", risk: "Medium", range: "$42.09 - $42.30", target: "$38.50", stopLoss: "$44.10", time: "3h ago", source: "Chart Analyzer", thesis: "Bluechip range breakout prep" },
  { id: 6, asset: "PEPE", assetName: "Pepe", type: "Long", risk: "High", range: "$0.000008 - $0.00001", target: "$0.0000140", stopLoss: "$0.0000070", time: "4h ago", source: "News Analyzer", thesis: "Exchange Listing Rumors detected", locked: true },
  { id: 7, asset: "LINK", assetName: "Chainlink", type: "Long", risk: "Low", range: "$14.20 - $15.50", target: "$18.20", stopLoss: "$13.10", time: "5h ago", source: "Chart Analyzer", thesis: "MACD bullish divergence on 4h", locked: true },
  { id: 8, asset: "DOGE", assetName: "Dogecoin", type: "Long", risk: "High", range: "$0.15 - $0.18", target: "$0.22", stopLoss: "$0.135", time: "6h ago", source: "Chart Analyzer", thesis: "Sudden Sentiment Spike across 10 groups", locked: true },
  { id: 9, asset: "AVAX", assetName: "Avalanche", type: "Short", risk: "Medium", range: "$35.20 - $34.00", target: "$30.00", stopLoss: "$37.00", time: "7h ago", source: "Chart Analyzer", thesis: "Liquidation cluster approaching - Fade setup", locked: true },
];

const MACRO_SIGNALS: Signal[] = [
  { id: 10, asset: "BTC", assetName: "Bitcoin", type: "Long", risk: "Low", range: "", target: "", stopLoss: "", time: "3 hours ago", source: "Crypto", thesis: "Bitcoin Surges Over $1K in One Minute on Binance" },
  { id: 11, asset: "BTC", assetName: "Bitcoin", type: "Long", risk: "Medium", range: "", target: "", stopLoss: "", time: "10 hours ago", source: "Crypto", thesis: "Amazon hires Bitcoin and crypto professionals, offers up to $500,000" },
  { id: 12, asset: "ETH", assetName: "Ethereum", type: "Long", risk: "Low", range: "", target: "", stopLoss: "", time: "14 hours ago", source: "Crypto", thesis: "CryptoPunks floor price surpasses 30 ETH amid rising demand" },
  { id: 13, asset: "BTC", assetName: "Bitcoin", type: "Long", risk: "Low", range: "", target: "", stopLoss: "", time: "16 hours ago", source: "AI Agents", thesis: "Whale deposits 300 Bitcoin worth $23.4M into Binance after 2 years" },
  { id: 14, asset: "ETH", assetName: "Ethereum", type: "Long", risk: "Medium", range: "", target: "", stopLoss: "", time: "a day ago", source: "Perpetual", thesis: "Ethereum Foundation unstakes $48.9M ETH from Lido's unstETH contract" },
  { id: 15, asset: "ASTER", assetName: "Aster", type: "Short", risk: "High", range: "", target: "", stopLoss: "", time: "a day ago", source: "AI", thesis: "$ASTER whale deposits 34.62M tokens into Aster, price drops 4.4%" },
  { id: 16, asset: "BTC", assetName: "Bitcoin", type: "Long", risk: "Low", range: "", target: "", stopLoss: "", time: "a day ago", source: "Crypto", thesis: "BlackRock Leads $1.9B Inflows into US Spot Bitcoin ETFs as BTC Nears $79K" },
  { id: 17, asset: "TRUMP", assetName: "Trump", type: "Short", risk: "High", range: "", target: "", stopLoss: "", time: "a day ago", source: "AI", thesis: "Trump team wallets dump 15.5M $TRUMP into OKX ahead of conference" },
  { id: 18, asset: "BTC", assetName: "Bitcoin", type: "Long", risk: "Low", range: "", target: "", stopLoss: "", time: "2 days ago", source: "Crypto", thesis: "BlackRock clients purchase $167M in Bitcoin" },
];

const MACRO_FILTERS = ["All", "AI Agents", "AI", "Crypto", "Perpetual"];

export default function SignalsView() {
  const [activeTab, setActiveTab] = useState<"TECHNICAL SIGNALS" | "MACRO SIGNALS">("TECHNICAL SIGNALS");
  const [macroFilter, setMacroFilter] = useState("All");
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);

  const displaySignals = activeTab === "TECHNICAL SIGNALS" 
    ? TECHNICAL_SIGNALS 
    : MACRO_SIGNALS.filter(s => macroFilter === "All" || s.source === macroFilter);

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        
        {/* Header section with Tabs */}
        <div className={styles.header}>
          <div className={styles.tabsContainer}>
            <button 
              className={`${styles.tab} ${activeTab === "TECHNICAL SIGNALS" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("TECHNICAL SIGNALS")}
            >
              TECHNICAL SIGNALS
            </button>
            <button 
              className={`${styles.tab} ${activeTab === "MACRO SIGNALS" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("MACRO SIGNALS")}
            >
              MACRO SIGNALS
            </button>
          </div>

          <div className={styles.headerActions}>
            {activeTab === "TECHNICAL SIGNALS" && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginRight: 16, fontSize: 11, color: "var(--text-tertiary)" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--emerald-500)" }} />
                Last updated: 2 mins ago
              </div>
            )}
            <button className={styles.iconButton}>
              <Settings size={16} />
            </button>
            <button className={styles.filterButton}>
              <SlidersHorizontal size={14} />
              Filters
              <div className={styles.filterBadge}>2</div>
            </button>
          </div>
        </div>

        {/* Macro Filters */}
        {activeTab === "MACRO SIGNALS" && (
          <div className={styles.subFilters}>
            {MACRO_FILTERS.map(f => (
              <button 
                key={f}
                className={`${styles.subFilterPill} ${macroFilter === f ? styles.subFilterPillActive : ""}`}
                onClick={() => setMacroFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        )}

        {/* Signals Grid */}
        <div className={styles.grid}>
          {displaySignals.map(sig => {
            const isTechnical = activeTab === "TECHNICAL SIGNALS";
            const isLocked = sig.locked;

            return (
              <div key={sig.id} className={`${styles.card} ${isLocked ? styles.lockedCard : ""}`}>
                
                {/* Top Header */}
                <div className={styles.cardHeader}>
                  <div className={styles.assetInfo}>
                    <div className={styles.assetIcon} style={{ position: 'relative', overflow: 'hidden' }}>
                      <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {sig.asset.substring(0, 3)}
                      </span>
                      <img 
                        src={['NVDA', 'MSFT', 'TSLA', 'AAPL', 'AMD'].includes(sig.asset) ? `https://icons.duckduckgo.com/ip3/${({ NVDA: 'nvidia.com', MSFT: 'microsoft.com', TSLA: 'tesla.com', AAPL: 'apple.com', AMD: 'amd.com' } as Record<string, string>)[sig.asset]}.ico` : `https://assets.coincap.io/assets/icons/${sig.asset.toLowerCase()}@2x.png`} 
                        alt={sig.asset} 
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', borderRadius: '50%', objectFit: 'contain', padding: '2px', backgroundColor: 'inherit' }}
                        onError={(e) => {
                          const img = e.currentTarget;
                          if (img.src.includes('coincap.io')) {
                            img.src = `https://cryptologos.cc/logos/${sig.assetName.toLowerCase().replace(' ', '-')}-${sig.asset.toLowerCase()}-logo.svg?v=032`;
                          } else {
                            img.style.display = 'none';
                          }
                        }}
                      />
                    </div>
                    <span className={styles.assetTicker}>{sig.asset}</span>
                    <span className={styles.assetName}>({sig.assetName})</span>
                  </div>
                  {isTechnical ? (
                    <div className={sig.type === "Long" ? styles.longPill : styles.shortPill}>
                      {sig.type.toUpperCase()}
                    </div>
                  ) : (
                    <div className={styles.categoryPill}>
                      {sig.source}
                    </div>
                  )}
                </div>

                {isTechnical && (
                  <div style={{ display: "flex", marginBottom: 4 }}>
                    <div className={styles.categoryPill}>
                      {sig.source}
                    </div>
                  </div>
                )}

                {/* Title */}
                <h3 className={styles.cardTitle}>{sig.thesis}</h3>

                {/* Middle Content */}
                {isTechnical ? (
                  <div className={styles.metricsBox}>
                    <div>
                      <div className={styles.metricLabel}>Range</div>
                      <div className={styles.metricValue}>{sig.range}</div>
                    </div>
                    <div>
                      <div className={styles.metricLabel}>Risk Factor</div>
                      <div className={`${styles.metricValue} ${styles[`risk${sig.risk}`]}`}>
                        {sig.risk} Risk
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.timeAgo}>
                    <Clock size={12} />
                    {sig.time}
                  </div>
                )}

                {/* Footer Buttons */}
                <div className={styles.cardFooter}>
                  <button className={styles.viewThesisBtn} onClick={() => setSelectedSignal(sig)}>
                    <FileText size={14} />
                    View Thesis
                  </button>
                  <div className={styles.actionPills}>
                    <button className={sig.type === "Long" && !isLocked ? styles.longPill : styles.longPillInactive}>
                      Long
                    </button>
                    <button className={sig.type === "Short" && !isLocked ? styles.shortPill : styles.shortPillInactive}>
                      Short
                    </button>
                  </div>
                </div>

                {/* Locked Overlay */}
                {isLocked && (
                  <div className={styles.lockedOverlay}>
                    <div className={styles.proBadge}>
                      <Lock size={12} />
                      PRO SUBSCRIPTION REQUIRED
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Signal Detail Drawer/Modal */}
      {selectedSignal && (
        <SignalDetailModal 
          signal={selectedSignal} 
          onClose={() => setSelectedSignal(null)} 
        />
      )}
    </div>
  );
}
