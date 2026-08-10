"use client";

import React, { useState } from "react";

import { ArrowLeft, Copy, TrendingUp, AlertTriangle, Info } from "lucide-react";
import styles from "./WalletProfileView.module.css";

interface WalletProfileViewProps {
  onClose: () => void;
  walletAddress?: string;
}

export default function WalletProfileView({ onClose, walletAddress = "6vGB8M...aqg2" }: WalletProfileViewProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const tradedTokens = [
    { symbol: "TNOS", name: "TNOS", avatar: "https://cryptologos.cc/logos/stellar-xlm-logo.png", boughtAmt: "$392", boughtAvg: "($2.41K)", soldAmt: "$139.73", soldAvg: "($3.43K)", rPnl: "-$131.69", uPnl: "+$4.61K", remaining: "$4.73K", hold: "11d", lastActive: "1d" },
    { symbol: "Aura", name: "Aura", avatar: "https://cryptologos.cc/logos/aave-aave-logo.png", boughtAmt: "$737.52", boughtAvg: "($22.06K)", soldAmt: "$202", soldAvg: "($34.02K)", rPnl: "-$54.67", uPnl: "+$230.93", remaining: "$377.78", hold: "8d", lastActive: "2d" },
    { symbol: "ZEC", name: "Zcash", avatar: "https://cryptologos.cc/logos/zcash-zec-logo.png", boughtAmt: "$55.77K", boughtAvg: "($29.47M)", soldAmt: "$65.43K", soldAvg: "($31.11M)", rPnl: "+$9.66K", uPnl: "$0", remaining: "$0", hold: "2mo", lastActive: "2d" },
    { symbol: "GOOGLx", name: "Alphabet xStock", avatar: "https://cryptologos.cc/logos/google-logo.png", boughtAmt: "$68.79K", boughtAvg: "($562.91M)", soldAmt: "$89.51K", soldAvg: "($766.19M)", rPnl: "+$20.72K", uPnl: "$0", remaining: "$0", hold: "10mo", lastActive: "3d" },
  ];

  // Calendar mock data
  const calendarDays = Array.from({ length: 35 }).map((_, i) => {
    if (i === 12 || i === 15) return "calGreen4";
    if (i === 4 || i === 22) return "calRed2";
    if (i % 7 === 0) return "calGreen2";
    if (i % 5 === 0) return "calGreen1";
    if (i % 9 === 0) return "calRed1";
    return "";
  });

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button 
            onClick={onClose}
            style={{
              background: "var(--bg-surface-raised)", border: "1px solid var(--border-color-default)",
              padding: "8px 12px", borderRadius: "var(--radius-md)", color: "var(--text-primary)",
              display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 13, fontWeight: 600,
              marginRight: 16
            }}
          >
            <ArrowLeft size={16} /> Back
          </button>
          
          <span className={styles.walletAddress}>
            {walletAddress}
            <button className={styles.copyBtn}><Copy size={16} /></button>
          </span>
          <span className={styles.ageBadge}>3y</span>
          <div style={{ width: 1, height: 24, backgroundColor: "var(--border-color-default)", margin: "0 8px" }}></div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Net Worth</span>
            <span className={styles.netWorth}>$147.45K</span>
          </div>
        </div>

        <div className={styles.headerRight}>
           <div className={styles.sparkline}></div>
        </div>
      </div>

      <div className={styles.content}>
        {/* Filters */}
        <div className={styles.filtersRow}>
          {["All", "Degen", "NFT"].map(f => (
            <button 
              key={f} 
              className={`${styles.filterBtn} ${activeFilter === f ? styles.filterBtnActive : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Top Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Realized PnL <Info size={12} /></span>
            <span className={`${styles.statValue} ${styles.statValueGreen}`}>+$408.82K</span>
            <span className={styles.statSub}>Total PnL: +$408.82K</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Winrate <Info size={12} /></span>
            <span className={styles.statValue}>67%</span>
            <span className={styles.statSub}>46 / 68</span>
            <div className={styles.profitBar}>
              <div className={styles.profitSegment} style={{ width: "67%", backgroundColor: "var(--emerald-500)" }}></div>
              <div className={styles.profitSegment} style={{ width: "20%", backgroundColor: "var(--bg-surface-raised)" }}></div>
              <div className={styles.profitSegment} style={{ width: "13%", backgroundColor: "var(--red-500)" }}></div>
            </div>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Volume <Info size={12} /></span>
            <span className={styles.statValue}>$119.5M</span>
            <span className={styles.statSub}>Buy: $59.43M | Sell: $60.07M</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Total Txns <Info size={12} /></span>
            <span className={styles.statValue}>1,840</span>
            <span className={styles.statSub}>Buy: 902 | Sell: 938</span>
          </div>
        </div>

        {/* Main Layout */}
        <div className={styles.mainLayout}>
          {/* Left Sidebar */}
          <div className={styles.leftSidebar}>
            {/* Calendar */}
            <div className={styles.panel}>
              <div className={styles.panelTitle}>Realized PnL <span style={{ color: "var(--text-tertiary)", fontWeight: 500 }}>Oct 1 - Oct 31</span></div>
              <div className={styles.calendarGrid}>
                {calendarDays.map((c, i) => (
                  <div key={i} className={`${styles.calDay} ${c ? styles[c] : ""}`}></div>
                ))}
              </div>
            </div>

            {/* Suspicious Actions */}
            <div className={styles.panel}>
              <div className={styles.panelTitle}>Suspicious Actions <AlertTriangle size={14} color="var(--yellow-500)" /></div>
              <div className={styles.suspiciousList}>
                <div className={styles.susItem}>
                  <div className={styles.susHeader}>
                    <span>Sold &gt; Bought</span>
                    <span>23% (581)</span>
                  </div>
                  <div className={styles.susBar}><div className={styles.susFill} style={{ width: "23%" }}></div></div>
                </div>
                <div className={styles.susItem}>
                  <div className={styles.susHeader}>
                    <span>Instant Sell</span>
                    <span>23% (590)</span>
                  </div>
                  <div className={styles.susBar}><div className={styles.susFill} style={{ width: "23%" }}></div></div>
                </div>
                <div className={styles.susItem}>
                  <div className={styles.susHeader}>
                    <span>Pump &amp; Dump</span>
                    <span>3% (77)</span>
                  </div>
                  <div className={styles.susBar}><div className={styles.susFill} style={{ width: "3%" }}></div></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className={styles.rightContent}>
            <table className={styles.tokensTable}>
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Bought / Avg Price</th>
                  <th>Sold / Avg Price</th>
                  <th>R PnL</th>
                  <th>U PnL</th>
                  <th>Remaining</th>
                  <th>Hold / Last Active</th>
                </tr>
              </thead>
              <tbody>
                {tradedTokens.map((t, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className={styles.tokenCol}>
                        <img src={t.avatar} alt={t.symbol} className={styles.tokenAvatar} />
                        <div className={styles.tokenDetails}>
                          <span className={styles.tokenSymbol}>{t.symbol}</span>
                          <span className={styles.tokenName}>{t.name}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className={styles.cellStack}>
                        <span className={styles.greenText}>{t.boughtAmt}</span>
                        <span className={styles.cellSecondary}>{t.boughtAvg}</span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.cellStack}>
                        <span className={styles.redText}>{t.soldAmt}</span>
                        <span className={styles.cellSecondary}>{t.soldAvg}</span>
                      </div>
                    </td>
                    <td>
                      <span className={t.rPnl.startsWith("+") ? styles.greenText : styles.redText}>{t.rPnl}</span>
                    </td>
                    <td>
                      <span className={t.uPnl.startsWith("+") ? styles.greenText : t.uPnl.startsWith("-") ? styles.redText : ""}>{t.uPnl}</span>
                    </td>
                    <td>
                      <span className={styles.cellPrimary}>{t.remaining}</span>
                    </td>
                    <td>
                      <div className={styles.cellStack}>
                        <span className={styles.cellPrimary}>{t.hold}</span>
                        <span className={styles.cellSecondary}>{t.lastActive}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
