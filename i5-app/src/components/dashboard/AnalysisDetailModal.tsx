"use client";

import React, { useState, useEffect } from "react";
import { X, Star, ExternalLink, Shield, Sparkles } from "lucide-react";
import styles from "./AnalysisDetailModal.module.css";
import { FeedItem } from "./IntelligenceFeed";

interface AnalysisDetailModalProps {
  item: FeedItem;
  onClose: () => void;
}

type TabType = "Overview" | "AI thesis" | "Ownership" | "News";

export default function AnalysisDetailModal({ item, onClose }: AnalysisDetailModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("Overview");

  // Prevent scrolling on body when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!item) return null;

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
                  {item.ticker.slice(0, 3)}
                </span>
                <img 
                  src={['NVDA', 'MSFT', 'TSLA', 'AAPL', 'AMD'].includes(item.ticker) ? `https://icons.duckduckgo.com/ip3/${({ NVDA: 'nvidia.com', MSFT: 'microsoft.com', TSLA: 'tesla.com', AAPL: 'apple.com', AMD: 'amd.com' } as Record<string, string>)[item.ticker]}.ico` : `https://assets.coincap.io/assets/icons/${item.ticker.toLowerCase()}@2x.png`} 
                  alt={item.ticker} 
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', borderRadius: '50%', objectFit: 'contain', padding: '2px', backgroundColor: 'inherit' }}
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.src.includes('coincap.io')) {
                      img.src = `https://cryptologos.cc/logos/${item.companyName.toLowerCase().split(' ')[0]}-${item.ticker.toLowerCase()}-logo.svg?v=032`;
                    } else {
                      img.style.display = 'none';
                    }
                  }}
                />
              </div>
              <div className={styles.assetDetails}>
                <div className={styles.assetName}>{item.companyName}</div>
                <div className={styles.assetMetaRow}>
                  <span className={styles.ticker}>{item.ticker}</span>
                  <span className={styles.dot} />
                  <span>{item.ticker === "NVDA" ? "Semiconductors" : "Crypto"}</span>
                  <span className={styles.dot} />
                  <span>$3.48T</span>
                  <span className={styles.equityPill}>Tokenized equity available</span>
                </div>
              </div>
            </div>
            <div className={styles.priceBlock}>
              <div className={styles.livePrice}>{item.publishPrice.split(' ')[0]}</div>
              <div className={`${styles.priceChange} ${item.isPositiveChange ? styles.priceUp : styles.priceDown}`}>
                {item.isPositiveChange ? "↗ " : "↘ "}
                {item.priceChange}
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

          {/* Chart Placeholder */}
          <div className={styles.chartContainer}>
            <div className={styles.chartHeader}>
              60-session price · chart placeholder (TradingView adapter pending)
            </div>
            <div className={styles.chartWrapper}>
              <svg className={styles.chartSvg} viewBox="0 0 400 140" preserveAspectRatio="none">
                <path
                  d="M0 120 C 40 80, 80 140, 120 120 C 160 100, 180 50, 240 50 C 280 50, 320 0, 360 20 L 400 0 L 400 140 L 0 140 Z"
                  fill="rgba(147, 51, 234, 0.05)"
                />
                <path
                  d="M0 120 C 40 80, 80 140, 120 120 C 160 100, 180 50, 240 50 C 280 50, 320 0, 360 20 L 400 0"
                  fill="none"
                  stroke="#9333EA"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line x1="0" y1="30" x2="400" y2="30" stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />
                <line x1="0" y1="85" x2="400" y2="85" stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />
                <text x="0" y="25" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="monospace">2.42</text>
                <text x="0" y="80" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="monospace">3.38</text>
                <text x="0" y="110" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="monospace">3.38</text>
              </svg>
            </div>
          </div>

          {/* Current Signal Box */}
          <div className={styles.signalBox}>
            <div className={styles.signalHeader}>
              <div className={styles.signalTitle}>
                <Shield size={14} className={styles.shieldIcon} />
                CURRENT I5 SIGNAL
              </div>
              <div className={item.position === "SHORT" ? styles.shortPill : styles.longPill}>
                {item.position || "LONG"}
              </div>
            </div>
            
            <div className={styles.signalMetrics}>
              <div>
                <span className={styles.metricBoxLabel}>Entry</span>
                <span className={styles.metricBoxValue} style={{ color: "var(--text-primary)" }}>
                  $183.5-188
                </span>
              </div>
              <div>
                <span className={styles.metricBoxLabel}>T1</span>
                <span className={styles.metricBoxValue} style={{ color: "var(--emerald-500)" }}>
                  $202
                </span>
              </div>
              <div>
                <span className={styles.metricBoxLabel}>Stop</span>
                <span className={styles.metricBoxValue} style={{ color: "var(--red-500)" }}>
                  $176.4
                </span>
              </div>
              <div>
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
                    <span className={styles.keyMetricValue}>$116 – $210</span>
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

              {/* Earnings History (Rounded Border Design) */}
              <div>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionTitle}>EARNINGS HISTORY</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className={styles.analysisListRow}>
                    <div className={styles.analysisListRowItem}>Q2 26</div>
                    <div className={`${styles.analysisListRowItem} ${styles.center}`}>$1.24 vs $1.11</div>
                    <div className={`${styles.analysisListRowItem} ${styles.right} ${styles.textGreen}`}>+11.7%</div>
                  </div>
                  <div className={styles.analysisListRow}>
                    <div className={styles.analysisListRowItem}>Q1 26</div>
                    <div className={`${styles.analysisListRowItem} ${styles.center}`}>$0.98 vs $0.94</div>
                    <div className={`${styles.analysisListRowItem} ${styles.right} ${styles.textGreen}`}>+4.3%</div>
                  </div>
                  <div className={styles.analysisListRow}>
                    <div className={styles.analysisListRowItem}>Q4 25</div>
                    <div className={`${styles.analysisListRowItem} ${styles.center}`}>$0.89 vs $0.91</div>
                    <div className={`${styles.analysisListRowItem} ${styles.right} ${styles.textRed}`}>-2.2%</div>
                  </div>
                  <div className={styles.analysisListRow}>
                    <div className={styles.analysisListRowItem}>Q3 25</div>
                    <div className={`${styles.analysisListRowItem} ${styles.center}`}>$0.81 vs $0.74</div>
                    <div className={`${styles.analysisListRowItem} ${styles.right} ${styles.textGreen}`}>+9.5%</div>
                  </div>
                </div>
              </div>

              {/* Analyst Ratings */}
              <div>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionTitle}>ANALYST RATINGS</div>
                </div>
                <div className={styles.ratingsBlock}>
                  <div className={styles.ratingsStats}>
                    <span className={styles.buyText}>Buy 42</span>
                    <span className={styles.holdText}>Hold 9</span>
                    <span className={styles.sellText}>Sell 2</span>
                    <span className={styles.targetText}>Target $217.41</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div className={styles.progressBuy} />
                    <div className={styles.progressHold} />
                    <div className={styles.progressSell} />
                  </div>
                </div>
              </div>

              {/* Upcoming Catalysts (Cyan Theme) */}
              <div style={{ paddingBottom: 24 }}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionTitle}>UPCOMING CATALYSTS</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className={styles.analysisCatalystRow}>
                    <div>Q3 earnings release</div>
                    <div className={styles.cyanText}>Aug 10</div>
                  </div>
                  <div className={styles.analysisCatalystRow}>
                    <div>Product / capital markets day</div>
                    <div className={styles.cyanText}>Sep 04</div>
                  </div>
                  <div className={styles.analysisCatalystRow}>
                    <div>Index rebalance</div>
                    <div className={styles.cyanText}>Sep 19</div>
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
                {item.summary}
              </p>
            </div>
          )}

          {/* Other Tabs */}
          {(activeTab === "Ownership" || activeTab === "News") && (
            <div className={styles.tabCard}>
              <p style={{ color: "var(--text-tertiary)", fontSize: 14 }}>
                Additional content for {activeTab} will appear here.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
