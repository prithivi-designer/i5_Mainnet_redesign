"use client";

import React, { useState } from "react";

import { Users, Brain, Shield, ChevronDown, Copy, Bell, Link as LinkIcon, Edit2, Code, ArrowLeft } from "lucide-react";
import styles from "./TokenSmartMoneyView.module.css";

interface TokenSmartMoneyViewProps {
  onClose: () => void;
  onSelectWallet: (address: string) => void;
  tokenName?: string;
  tokenSymbol?: string;
}

export default function TokenSmartMoneyView({ onClose, onSelectWallet, tokenName = "Zcash", tokenSymbol = "ZEC" }: TokenSmartMoneyViewProps) {
  const [activeTab, setActiveTab] = useState("Top Traders");

  // Mock Traders Data
  const traders = [
    { wallet: "6vGB8M...aqg2", badge: "188", solBal: "6.24", lastActive: "23h", boughtAmt: "$2.87M", boughtAvg: "($40.85M)", soldAmt: "$2.8M", soldAvg: "($41.95M)", rPnl: "+$73.51K", uPnl: "+$11.43K", remaining: "$146.65K", funding: "0.33%" },
    { wallet: "BL3fey...31x2", badge: "17", solBal: "0", lastActive: "19h", boughtAmt: "$104.46K", boughtAvg: "($35.89M)", soldAmt: "$93.33K", soldAvg: "($45.79M)", rPnl: "+$20.16K", uPnl: "+$7.34K", remaining: "$42.61K", funding: "0.09%" },
    { wallet: "5eAFRU...SRwq", badge: "52", solBal: "0", lastActive: "11h", boughtAmt: "$4.84M", boughtAvg: "($38.59M)", soldAmt: "$5.19M", soldAvg: "($41.75M)", rPnl: "+$392.7K", uPnl: "+$6.75K", remaining: "$87.93K", funding: "0.19%" },
    { wallet: "5ntDL8...tK6J", badge: "5", solBal: "1.14", lastActive: "15h", boughtAmt: "$6.7K", boughtAvg: "($44.93M)", soldAmt: "$6.95K", soldAvg: "($44.94M)", rPnl: "+$0.68", uPnl: "$0", remaining: "$12.2", funding: "0%" },
    { wallet: "BH8K9x...2b9f", badge: "62", solBal: "0", lastActive: "5h", boughtAmt: "$3.78K", boughtAvg: "($44.73M)", soldAmt: "$3.8K", soldAvg: "($44.7M)", rPnl: "-$2.35", uPnl: "$0", remaining: "$0", funding: "0%" },
  ];

  return (
    <div className={styles.container}>
      {/* Back button overlay */}
      <button 
        onClick={onClose}
        style={{
          position: "absolute", top: 16, left: 16, zIndex: 10,
          background: "var(--bg-surface-raised)", border: "1px solid var(--border-color-default)",
          padding: "8px 12px", borderRadius: "var(--radius-md)", color: "var(--text-primary)",
          display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 13, fontWeight: 600
        }}
      >
        <ArrowLeft size={16} /> Back to Terminal
      </button>

      {/* LEFT PANE */}
      <div className={styles.leftPane}>
        <div className={styles.leftHeader}>
          <div style={{ marginLeft: 120, display: "flex", alignItems: "center", gap: 12 }}>
             <span style={{ fontSize: 18, fontWeight: 700 }}>{tokenSymbol}</span>
             <span style={{ color: "var(--text-tertiary)", fontSize: 14 }}>{tokenName}</span>
          </div>
        </div>

        {/* Fake Chart Area */}
        <div className={styles.chartContainer}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
          {/* Mock Candles */}
          <div style={{ position: "absolute", top: 100, left: 100, width: 4, height: 60, background: "var(--color-price-down)" }}></div>
          <div style={{ position: "absolute", top: 110, left: 98, width: 8, height: 20, background: "var(--color-price-down)" }}></div>
          <div style={{ position: "absolute", top: 150, left: 120, width: 4, height: 80, background: "var(--color-price-up)" }}></div>
          <div style={{ position: "absolute", top: 160, left: 118, width: 8, height: 30, background: "var(--color-price-up)" }}></div>
          
          <div style={{ position: "absolute", bottom: 20, left: 16, color: "var(--text-tertiary)", fontSize: 11, fontFamily: "var(--font-mono)" }}>
            TradingView Chart Mockup
          </div>
        </div>

        {/* Tabs Bar */}
        <div className={styles.bottomTabsBar}>
          {["Trades", "Top Traders", "Security (4)", "Holders (17.35K)", "Dev Tokens (1)", "Markets", "Positions"].map(tab => (
            <button
              key={tab}
              className={`${styles.bottomTab} ${activeTab === tab.split(" ")[0] || activeTab === tab ? styles.bottomTabActive : ""}`}
              onClick={() => setActiveTab(tab.split(" ")[0] === "Top" ? "Top Traders" : tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Bottom Content Area */}
        <div className={styles.bottomContent}>
          {activeTab === "Top Traders" && (
            <table className={styles.tradersTable}>
              <thead>
                <tr>
                  <th>Wallet</th>
                  <th>Sol Bal / Last Active</th>
                  <th>Bought / Avg MC</th>
                  <th>Sold / Avg MC</th>
                  <th>R PnL</th>
                  <th>U PnL</th>
                  <th>Remaining</th>
                  <th>Funding</th>
                </tr>
              </thead>
              <tbody>
                {traders.map((t, idx) => (
                  <tr key={idx} onClick={() => onSelectWallet(t.wallet)}>
                    <td>
                      <div className={styles.walletCol}>
                        <div className={styles.walletIcon} style={{ background: `hsl(${idx * 60}, 70%, 50%)` }} />
                        <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>{t.wallet}</span>
                        <span className={styles.walletBadge}>{t.badge}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <span style={{ color: "var(--text-primary)" }}>{t.solBal}</span>
                        <span style={{ color: "var(--text-tertiary)" }}>{t.lastActive}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <span className={styles.greenText}>{t.boughtAmt}</span>
                        <span style={{ color: "var(--text-tertiary)" }}>{t.boughtAvg}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <span className={styles.redText}>{t.soldAmt}</span>
                        <span style={{ color: "var(--text-tertiary)" }}>{t.soldAvg}</span>
                      </div>
                    </td>
                    <td>
                      <span className={t.rPnl.startsWith("+") ? styles.greenText : styles.redText}>{t.rPnl}</span>
                    </td>
                    <td>
                      <span className={t.uPnl.startsWith("+") ? styles.greenText : t.uPnl.startsWith("-") ? styles.redText : ""}>{t.uPnl}</span>
                    </td>
                    <td>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <span style={{ color: "var(--text-primary)" }}>{t.remaining}</span>
                        <span style={{ color: "var(--text-secondary)" }} className={styles.walletBadge}>{t.funding}</span>
                      </div>
                    </td>
                    <td>Binance 3y</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* RIGHT PANE */}
      <div className={styles.rightPane}>
        <div className={styles.rightHeader}>
          <span className={styles.rightHeaderTitle}>Token Info</span>
          <ChevronDown size={16} color="var(--text-secondary)" />
        </div>

        {/* Pills Grid */}
        <div className={styles.pillsGrid}>
          <div className={styles.infoPill}>
            <div className={styles.infoPillValue} style={{ color: "var(--red-400)" }}><Users size={12} /> 37.12%</div>
            <div className={styles.infoPillLabel}>Top 10 H.</div>
          </div>
          <div className={styles.infoPill}>
            <div className={styles.infoPillValue} style={{ color: "var(--text-secondary)" }}><Brain size={12} /> 0%</div>
            <div className={styles.infoPillLabel}>Dev H.</div>
          </div>
          <div className={styles.infoPill}>
            <div className={styles.infoPillValue} style={{ color: "var(--text-secondary)" }}><Shield size={12} /> 0%</div>
            <div className={styles.infoPillLabel}>Sniper H.</div>
          </div>
          <div className={styles.infoPill}>
            <div className={styles.infoPillValue} style={{ color: "var(--text-secondary)" }}><Brain size={12} /> 0%</div>
            <div className={styles.infoPillLabel}>Insider H.</div>
          </div>
          <div className={styles.infoPill}>
            <div className={styles.infoPillValue} style={{ color: "var(--text-secondary)" }}><Brain size={12} /> 3.23%</div>
            <div className={styles.infoPillLabel}>Bundlers H.</div>
          </div>
          <div className={styles.infoPill}>
            <div className={styles.infoPillValue} style={{ color: "var(--text-primary)" }}><Brain size={12} /> 12</div>
            <div className={styles.infoPillLabel}>Smart</div>
          </div>
          <div className={styles.infoPill}>
            <div className={styles.infoPillValue} style={{ color: "var(--text-primary)" }}><Users size={12} /> 2.03K</div>
            <div className={styles.infoPillLabel}>24h Traders</div>
          </div>
          <div className={styles.infoPill}>
            <div className={styles.infoPillValue} style={{ color: "var(--text-primary)" }}><Users size={12} /> 17.35K</div>
            <div className={styles.infoPillLabel}>Holders</div>
          </div>
          <div className={styles.infoPill}>
            <div className={styles.infoPillValue} style={{ color: "var(--blue-400)" }}>303.621</div>
            <div className={styles.infoPillLabel}>Total Fees</div>
          </div>
          <div className={styles.infoPill}>
            <div className={styles.infoPillValue} style={{ color: "var(--red-400)" }}><Shield size={12} /> 4</div>
            <div className={styles.infoPillLabel}>Security</div>
          </div>
        </div>

        {/* Addresses */}
        <div className={styles.addressBlock}>
          <div className={styles.addressRow}>
            <span className={styles.addressLabel}>📄 CA</span>
            <span className={styles.addressValue}>
              A7bdiY...QXaS
              <button className={styles.copyBtn}><Copy size={14} /></button>
            </span>
          </div>
          <div className={styles.addressRow}>
            <span className={styles.addressLabel}>👑 DA</span>
            <span className={styles.addressValue}>
              DuSs7r...kgbn
              <button className={styles.copyBtn}><Copy size={14} /></button>
            </span>
          </div>
        </div>

        {/* Stats List */}
        <div className={styles.statsList}>
          <div className={styles.statRow}>
            <span className={styles.statLabel}>Circulating supply</span>
            <span className={styles.statValue}>87,543.54</span>
          </div>
          <div className={styles.statRow}>
            <span className={styles.statLabel}>Total supply</span>
            <span className={styles.statValue}>87,545.83</span>
          </div>
          <div className={styles.statRow}>
            <span className={styles.statLabel}>Markets</span>
            <span className={styles.statValue}>394</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionGrid}>
          <button className={styles.actionBtn}><LinkIcon size={14} /> Embed Chart</button>
          <button className={styles.actionBtn}><Bell size={14} /> Alert</button>
          <button className={styles.actionBtn}><Edit2 size={14} /> Update <ChevronDown size={14} /></button>
          <button className={styles.actionBtn}><Code size={14} /> Token API</button>
        </div>
      </div>
    </div>
  );
}
