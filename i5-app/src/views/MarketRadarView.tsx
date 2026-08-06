"use client";

import React, { useState } from "react";

const TABS = ["Liquidation", "Stop Loss", "Take Profit", "Limit Order"];

const SELL_LEVELS = [
  { price: "~88,203", vol: "$34.3M", size: 34.3, max: 60 },
  { price: "~87,895", vol: "$59.2M", size: 59.2, max: 60 },
  { price: "~85,421", vol: "$28.1M", size: 28.1, max: 60 },
  { price: "~84,200", vol: "$19.5M", size: 19.5, max: 60 },
  { price: "~82,297", vol: "$45.5M", size: 45.5, max: 60 },
  { price: "~81,000", vol: "$22.4M", size: 22.4, max: 60 },
];

const BUY_LEVELS = [
  { price: "~77,900", vol: "$15.8M", size: 15.8, max: 60 },
  { price: "~76,500", vol: "$38.2M", size: 38.2, max: 60 },
  { price: "~75,900", vol: "$52.1M", size: 52.1, max: 60 },
  { price: "~74,100", vol: "$20.3M", size: 20.3, max: 60 },
  { price: "~73,000", vol: "$12.7M", size: 12.7, max: 60 },
  { price: "~70,400", vol: "$67.4M", size: 67.4, max: 60 },
];

const ASSETS = ["BTC", "ETH", "SOL", "ARB", "HYPE"];

const RECENT_LIQUIDATIONS = [
  { id: 1, side: "Long", asset: "BTC", amount: "$2.4M", price: "$81,420", exchange: "Binance", time: "12s ago" },
  { id: 2, side: "Short", asset: "ETH", amount: "$845K", price: "$3,290", exchange: "Bybit", time: "28s ago" },
  { id: 3, side: "Long", asset: "SOL", amount: "$320K", price: "$143.20", exchange: "OKX", time: "1m ago" },
  { id: 4, side: "Long", asset: "BTC", amount: "$5.1M", price: "$80,950", exchange: "Hyperliquid", time: "2m ago" },
  { id: 5, side: "Short", asset: "ARB", amount: "$125K", price: "$0.122", exchange: "Binance", time: "3m ago" },
];

export default function MarketRadarView() {
  const [activeTab, setActiveTab] = useState("Liquidation");
  const [selectedAsset, setSelectedAsset] = useState("BTC");

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: "7px 16px", borderRadius: "var(--radius-md)", border: "none",
    background: active ? "var(--bg-surface-overlay)" : "transparent",
    color: active ? "var(--text-primary)" : "var(--text-tertiary)",
    fontSize: 13, fontWeight: active ? 600 : 400, cursor: "pointer",
    fontFamily: "var(--font-sans)", transition: "all 0.15s ease",
  });

  return (
    <div style={{ height: "100%", overflowY: "auto", background: "var(--bg-app)", color: "var(--text-primary)", padding: 24, fontFamily: "var(--font-sans)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>📡 Market Radar</h1>
            <p style={{ fontSize: 13, color: "var(--text-tertiary)", marginTop: 4 }}>
              Real-time liquidation clusters, stop hunts, and limit order walls
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-price-up)", boxShadow: "0 0 8px var(--color-price-up)" }} />
            <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>Live · Updated 3s ago</span>
          </div>
        </div>

        {/* Asset + Tab selectors */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 8 }}>
            {ASSETS.map(a => (
              <button key={a} onClick={() => setSelectedAsset(a)} style={{
                padding: "6px 14px", borderRadius: "var(--radius-md)", cursor: "pointer",
                background: selectedAsset === a ? "var(--bg-surface-overlay)" : "var(--bg-surface)",
                border: `1px solid ${selectedAsset === a ? "var(--border-color-strong)" : "var(--border-color-default)"}`,
                color: selectedAsset === a ? "var(--text-primary)" : "var(--text-tertiary)",
                fontSize: 12, fontWeight: 700, fontFamily: "var(--font-mono)",
              }}>
                {a}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 4, background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-lg)", padding: 4, marginLeft: "auto" }}>
            {TABS.map(t => (
              <button key={t} style={tabStyle(activeTab === t)} onClick={() => setActiveTab(t)}>{t}</button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16 }}>
          {/* Main liquidation cluster viz */}
          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-xl)", padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{selectedAsset}/USDT — {activeTab} Clusters</div>
                <div style={{ fontSize: 12, color: "var(--text-tertiary)" }}>Size of bar = notional volume at that price level</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 24, fontWeight: 800, fontFamily: "var(--font-mono)" }}>
                  {selectedAsset === "BTC" ? "$81,204" : selectedAsset === "ETH" ? "$3,284" : "$145.30"}
                </div>
                <div style={{ fontSize: 12, color: "var(--color-price-up)" }}>▲ 1.24%</div>
              </div>
            </div>

            {/* Sell side (liquidation levels above price) */}
            <div style={{ marginBottom: 4 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-price-up)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                ↑ Sell / Short Liquidations (Above price)
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {SELL_LEVELS.map((level, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 80, fontSize: 11, color: "var(--text-tertiary)", fontFamily: "var(--font-mono)", textAlign: "right", flexShrink: 0 }}>{level.price}</div>
                    <div style={{ flex: 1, height: 20, background: "var(--bg-surface-overlay)", borderRadius: "var(--radius-sm)", overflow: "hidden", position: "relative" }}>
                      <div style={{
                        position: "absolute", right: 0, top: 0, bottom: 0,
                        width: `${(level.size / level.max) * 100}%`,
                        background: "rgba(47,203,115,0.3)",
                        borderLeft: "2px solid rgba(47,203,115,0.6)",
                        borderRadius: "var(--radius-sm) 0 0 var(--radius-sm)",
                      }} />
                    </div>
                    <div style={{ width: 60, fontSize: 11, color: "var(--color-price-up)", fontFamily: "var(--font-mono)", textAlign: "right", flexShrink: 0 }}>{level.vol}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Current price divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "10px 0" }}>
              <div style={{ flex: 1, height: 1, background: "var(--border-color-strong)" }} />
              <div style={{ fontSize: 13, fontWeight: 800, fontFamily: "var(--font-mono)", color: "var(--text-primary)", padding: "4px 12px", background: "var(--bg-surface-overlay)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color-strong)", whiteSpace: "nowrap" }}>
                ⊙ Current Price
              </div>
              <div style={{ flex: 1, height: 1, background: "var(--border-color-strong)" }} />
            </div>

            {/* Buy side (liquidation levels below price) */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-price-down)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                ↓ Buy / Long Liquidations (Below price)
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {BUY_LEVELS.map((level, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 80, fontSize: 11, color: "var(--text-tertiary)", fontFamily: "var(--font-mono)", textAlign: "right", flexShrink: 0 }}>{level.price}</div>
                    <div style={{ flex: 1, height: 20, background: "var(--bg-surface-overlay)", borderRadius: "var(--radius-sm)", overflow: "hidden", position: "relative" }}>
                      <div style={{
                        position: "absolute", left: 0, top: 0, bottom: 0,
                        width: `${(level.size / level.max) * 100}%`,
                        background: "rgba(225,59,59,0.3)",
                        borderRight: "2px solid rgba(225,59,59,0.6)",
                        borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
                      }} />
                    </div>
                    <div style={{ width: 60, fontSize: 11, color: "var(--color-price-down)", fontFamily: "var(--font-mono)", textAlign: "right", flexShrink: 0 }}>{level.vol}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel: recent liquidations */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Live feed */}
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-xl)", padding: 16, flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-price-down)", animation: "pulse 1.5s infinite" }} />
                <span style={{ fontSize: 13, fontWeight: 700 }}>Live Liquidations</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {RECENT_LIQUIDATIONS.map((liq) => (
                  <div key={liq.id} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "10px 12px", background: "var(--bg-surface-raised)",
                    border: `1px solid ${liq.side === "Long" ? "rgba(225,59,59,0.15)" : "rgba(47,203,115,0.15)"}`,
                    borderRadius: "var(--radius-md)", gap: 8,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{
                        fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: "var(--radius-sm)",
                        background: liq.side === "Long" ? "rgba(225,59,59,0.15)" : "rgba(47,203,115,0.15)",
                        color: liq.side === "Long" ? "var(--color-price-down)" : "var(--color-price-up)",
                      }}>
                        {liq.side}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700 }}>{liq.asset}</div>
                        <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{liq.exchange}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "var(--font-mono)", color: liq.side === "Long" ? "var(--color-price-down)" : "var(--color-price-up)" }}>{liq.amount}</div>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{liq.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats card */}
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-xl)", padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>24H Liquidation Summary</div>
              {[
                { label: "Total Liquidated", value: "$284.5M", color: "var(--text-primary)" },
                { label: "Long Liquidations", value: "$198.2M", color: "var(--color-price-down)" },
                { label: "Short Liquidations", value: "$86.3M", color: "var(--color-price-up)" },
                { label: "Largest Single Liq", value: "$12.4M", color: "#F4C23A" },
              ].map((stat) => (
                <div key={stat.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border-color-default)" }}>
                  <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>{stat.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "var(--font-mono)", color: stat.color }}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
