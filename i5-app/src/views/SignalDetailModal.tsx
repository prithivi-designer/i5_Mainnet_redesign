"use client";

import React, { useState, useEffect } from "react";
import { X, Star, ExternalLink, Shield, Settings2, Sparkles } from "lucide-react";
import styles from "./SignalDetailModal.module.css";

interface SignalDetailModalProps {
  signal: any;
  onClose: () => void;
}

type TabType = "Overview" | "AI thesis" | "Ownership" | "News";

export default function SignalDetailModal({ signal, onClose }: SignalDetailModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("Overview");

  // Prevent scrolling on body when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!signal) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={18} />
        </button>

        <div className={styles.content}>
          {/* Header */}
          <div className={styles.headerTop}>
            <div className={styles.assetInfo}>
              <div className={styles.assetIcon} style={{ position: 'relative', overflow: 'hidden' }}>
                <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {signal.asset.substring(0, 3)}
                </span>
                <img 
                  src={['NVDA', 'MSFT', 'TSLA', 'AAPL', 'AMD'].includes(signal.asset) ? `https://icons.duckduckgo.com/ip3/${({ NVDA: 'nvidia.com', MSFT: 'microsoft.com', TSLA: 'tesla.com', AAPL: 'apple.com', AMD: 'amd.com' } as Record<string, string>)[signal.asset]}.ico` : `https://assets.coincap.io/assets/icons/${signal.asset.toLowerCase()}@2x.png`} 
                  alt={signal.asset} 
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', borderRadius: '50%', objectFit: 'contain', padding: '2px', backgroundColor: 'inherit' }}
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.src.includes('coincap.io')) {
                      img.src = `https://cryptologos.cc/logos/${signal.assetName.toLowerCase().replace(' ', '-')}-${signal.asset.toLowerCase()}-logo.svg?v=032`;
                    } else {
                      img.style.display = 'none';
                    }
                  }}
                />
              </div>
              <div className={styles.assetDetails}>
                <div className={styles.assetName}>{signal.asset} Network</div>
                <div className={styles.assetMetaRow}>
                  <span className={styles.ticker}>{signal.asset}</span>
                  <span className={styles.dot} />
                  <span>Crypto</span>
                  <span className={styles.dot} />
                  <span>$3.48T</span>
                  <span className={styles.equityPill}>Tokenized equity available</span>
                </div>
              </div>
            </div>
            <div className={styles.priceBlock}>
              <div className={styles.livePrice}>$64,280.20</div>
              <div className={styles.priceChange}>
                ↗ +3.18%
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className={styles.actionsRow}>
            <button className={`${styles.actionBtn} ${styles.primary}`}>
              <Star size={14} fill="currentColor" />
              In watchlist
            </button>
            <button className={styles.actionBtn}>
              <ExternalLink size={14} />
              Open trading partner
            </button>
          </div>

          <div className={styles.divider} />

          {/* Current Signal Box */}
          <div className={styles.signalBox}>
            <div className={styles.signalHeader}>
              <div className={styles.signalTitle}>
                <Shield size={14} className={styles.shieldIcon} />
                CURRENT I5 SIGNAL
              </div>
              <div className={styles.longPill}>{signal.type || "Long"}</div>
            </div>
            
            <div className={styles.signalMetrics}>
              <div className={styles.metricBox}>
                <span className={styles.metricBoxLabel}>Entry</span>
                <span className={styles.metricBoxValue} style={{ color: "var(--text-primary)" }}>
                  {signal.range || "$183.5-188"}
                </span>
              </div>
              <div className={styles.metricBox}>
                <span className={styles.metricBoxLabel}>T1</span>
                <span className={styles.metricBoxValue} style={{ color: "var(--emerald-500)" }}>
                  {signal.target || "$202"}
                </span>
              </div>
              <div className={styles.metricBox}>
                <span className={styles.metricBoxLabel}>Stop</span>
                <span className={styles.metricBoxValue} style={{ color: "var(--red-500)" }}>
                  {signal.stopLoss || "$176.4"}
                </span>
              </div>
              <div className={styles.metricBox}>
                <span className={styles.metricBoxLabel}>R:R</span>
                <span className={styles.metricBoxValue} style={{ color: "var(--emerald-500)" }}>
                  2.8R
                </span>
              </div>
            </div>
          </div>

          {/* Tabs Nav */}
          <div className={styles.tabs}>
            {(["Overview", "AI thesis", "Ownership", "News"] as TabType[]).map((tab) => (
              <button
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content Rendering */}
          {activeTab === "Overview" && (
            <>
              {/* Key Metrics Grid */}
              <div>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionTitle}>KEY METRICS</div>
                </div>
                <div className={styles.metricsGrid}>
                  <div className={styles.keyMetricBox}>
                    <span className={styles.keyMetricLabel}>MARKET CAP</span>
                    <span className={styles.keyMetricValue}>$3.48T</span>
                  </div>
                  <div className={styles.keyMetricBox}>
                    <span className={styles.keyMetricLabel}>P/E (TTM)</span>
                    <span className={styles.keyMetricValue}>54.2</span>
                  </div>
                  <div className={styles.keyMetricBox}>
                    <span className={styles.keyMetricLabel}>52W RANGE</span>
                    <span className={styles.keyMetricValue}>$1.16 - $210</span>
                  </div>
                  <div className={styles.keyMetricBox}>
                    <span className={styles.keyMetricLabel}>AVG VOLUME</span>
                    <span className={styles.keyMetricValue}>82.9M</span>
                  </div>
                  <div className={styles.keyMetricBox}>
                    <span className={styles.keyMetricLabel}>BETA</span>
                    <span className={styles.keyMetricValue}>0.99</span>
                  </div>
                  <div className={styles.keyMetricBox}>
                    <span className={styles.keyMetricLabel}>SHORT INTEREST</span>
                    <span className={styles.keyMetricValue}>3.0%</span>
                  </div>
                  <div className={styles.keyMetricBox}>
                    <span className={styles.keyMetricLabel}>DIV YIELD</span>
                    <span className={styles.keyMetricValue}>0.0%</span>
                  </div>
                  <div className={styles.keyMetricBox}>
                    <span className={styles.keyMetricLabel}>FREE FLOAT</span>
                    <span className={styles.keyMetricValue}>94.2%</span>
                  </div>
                </div>
              </div>

              {/* Earnings History */}
              <div>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionTitle}>EARNINGS HISTORY</div>
                  <button className={styles.actionBtn} style={{ padding: 6, borderRadius: "50%" }}>
                    <Settings2 size={14} />
                  </button>
                </div>
                <div className={styles.listBlock} style={{ padding: "4px 16px" }}>
                  <div className={styles.listRow}>
                    <div className={styles.listRowItem} style={{ color: "var(--text-primary)" }}>Q2 26</div>
                    <div className={styles.listRowItem} style={{ textAlign: "center" }}>$1.24 vs $1.11</div>
                    <div className={`${styles.listRowItem} ${styles.right} ${styles.textGreen}`}>+11.7%</div>
                  </div>
                  <div className={styles.listRow}>
                    <div className={styles.listRowItem} style={{ color: "var(--text-primary)" }}>Q1 26</div>
                    <div className={styles.listRowItem} style={{ textAlign: "center" }}>$0.98 vs $0.94</div>
                    <div className={`${styles.listRowItem} ${styles.right} ${styles.textGreen}`}>+4.3%</div>
                  </div>
                  <div className={styles.listRow}>
                    <div className={styles.listRowItem} style={{ color: "var(--text-primary)" }}>Q4 25</div>
                    <div className={styles.listRowItem} style={{ textAlign: "center" }}>$0.89 vs $0.91</div>
                    <div className={`${styles.listRowItem} ${styles.right} ${styles.textRed}`}>-2.2%</div>
                  </div>
                  <div className={styles.listRow}>
                    <div className={styles.listRowItem} style={{ color: "var(--text-primary)" }}>Q3 25</div>
                    <div className={styles.listRowItem} style={{ textAlign: "center" }}>$0.81 vs $0.74</div>
                    <div className={`${styles.listRowItem} ${styles.right} ${styles.textGreen}`}>+9.5%</div>
                  </div>
                </div>
              </div>

              {/* Analyst Ratings */}
              <div>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionTitle}>ANALYST RATINGS</div>
                  <div className={styles.sectionTitle} style={{ color: "var(--emerald-500)" }}>TARGET $217.41</div>
                </div>
                <div className={styles.ratingsBlock}>
                  <div className={styles.ratingsStats}>
                    <span className={styles.buyText}>Buy 42</span>
                    <span className={styles.holdText}>Hold 9</span>
                    <span className={styles.sellText}>Sell 2</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div className={styles.progressBuy} />
                    <div className={styles.progressHold} />
                    <div className={styles.progressSell} />
                  </div>
                </div>
              </div>

              {/* Upcoming Catalysts */}
              <div style={{ paddingBottom: 24 }}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionTitle}>UPCOMING CATALYSTS</div>
                </div>
                <div className={styles.catalystCard}>
                  <div className={styles.catalystHeader}>
                    <div className={styles.catalystIconBox}>
                      <svg width={18} height={18} viewBox="0 0 16 16" fill="none" aria-hidden>
                        <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                        <path d="M5 1.5v3M11 1.5v3M2 6h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                        <circle cx="5.5" cy="8.5" r="0.75" fill="currentColor" />
                        <circle cx="8" cy="8.5" r="0.75" fill="currentColor" />
                        <circle cx="10.5" cy="8.5" r="0.75" fill="currentColor" />
                      </svg>
                    </div>
                    <span className={styles.catalystCategoryBadge}>UPCOMING CALENDAR</span>
                  </div>
                  <div className={styles.catalystListBlock}>
                    <div className={styles.catalystListRow}>
                      <div style={{ fontFamily: "var(--font-sans)" }}>Q3 earnings release</div>
                      <div className={styles.catalystHighlight}>Aug 10</div>
                    </div>
                    <div className={styles.catalystListRow}>
                      <div style={{ fontFamily: "var(--font-sans)" }}>Product / capital markets day</div>
                      <div className={styles.catalystHighlight}>Sep 04</div>
                    </div>
                    <div className={styles.catalystListRow}>
                      <div style={{ fontFamily: "var(--font-sans)" }}>Index rebalance</div>
                      <div className={styles.catalystHighlight}>Sep 19</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* AI Thesis Tab */}
          {activeTab === "AI thesis" && (
            <div className={styles.tabCard}>
              <div className={styles.thesisHeader}>
                <Sparkles size={16} />
                QUANTITATIVE AI THESIS REPORT
              </div>
              <p className={styles.thesisText}>
                {signal.thesis || "Large token unlock schedule approaching in 3 days. Short hedging positions from VC accounts detected across Binance & Bybit orderbooks."}
              </p>
              <div className={styles.confidenceBox}>
                <span className={styles.confidenceLabel}>AI Confidence Rating</span>
                <span className={styles.confidenceValue}>88% High Conviction</span>
              </div>
            </div>
          )}

          {/* Ownership Tab */}
          {activeTab === "Ownership" && (
            <div className={styles.tabCard}>
              <div className={styles.sectionTitle}>INSTITUTIONAL & INSIDER HOLDINGS</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div className={styles.ownershipRow}>
                  <span className={styles.ownershipLabel}>Institutional Ownership</span>
                  <span className={styles.ownershipValue}>68.4%</span>
                </div>
                <div className={styles.ownershipRow}>
                  <span className={styles.ownershipLabel}>Insider Ownership</span>
                  <span className={styles.ownershipValue}>4.2%</span>
                </div>
                <div className={styles.ownershipRow}>
                  <span className={styles.ownershipLabel}>Top Holder</span>
                  <span className={styles.ownershipValueGreen}>Vanguard Group (8.6%)</span>
                </div>
              </div>
            </div>
          )}

          {/* News Tab */}
          {activeTab === "News" && (
            <div className={styles.tabCard}>
              <div className={styles.sectionTitle}>LATEST HEADLINES</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div className={styles.newsCard}>
                  <div className={styles.newsTitle}>Private Alpha: Funding Rates turning</div>
                  <div className={styles.newsMeta}>35m ago • Benzinga</div>
                </div>
                <div className={styles.newsCard}>
                  <div className={styles.newsTitle}>Analyst raises target price following datacenter order momentum</div>
                  <div className={styles.newsMeta}>2h ago • Reuters</div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
