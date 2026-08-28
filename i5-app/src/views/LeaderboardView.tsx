"use client";

import React, { useState } from "react";
import { Check, Star, Zap, Award, Sparkles, Flame, ShieldCheck, Coins } from "lucide-react";

/* ── Mock data ─────────────────────────────────────────── */
const TRADERS = [
  {
    id: "murad",
    rank: 1,
    name: "Murad (Memecoin Oracle)",
    handle: "@MustStopMurad",
    avatar: "🧔",
    tier: "Ecosystem Lead",
    pnl: 64920000,
    winRate: 88.2,
    volume: 526800000,
    trades: 186,
    avgRoi: "+684%",
    topHolding: "$MCAT",
    topBag: "$58.0K",
  },
  {
    id: "lookonchain",
    rank: 2,
    name: "Lookonchain Smart Money",
    handle: "@lookonchain",
    avatar: "⚡",
    tier: "Alpha Caller",
    pnl: 63840000,
    winRate: 81.2,
    volume: 331200000,
    trades: 258,
    avgRoi: "+345%",
    topHolding: "$KATE",
    topBag: "$105.5K",
  },
  {
    id: "ansem",
    rank: 3,
    name: "Ansem",
    handle: "@blknoiz06",
    avatar: "🧢",
    tier: "Tier 1 KOL",
    pnl: 52840000,
    winRate: 84.6,
    volume: 518450000,
    trades: 156,
    avgRoi: "+412.5%",
    topHolding: "$PEPEBOT",
    topBag: "$120.2K",
  },
  {
    id: "degenspartan",
    rank: 4,
    name: "Degen Spartan",
    handle: "@DegenSpartan",
    avatar: "🛡️",
    tier: "OG Trader",
    pnl: 52650000,
    winRate: 82.0,
    volume: 519800000,
    trades: 114,
    avgRoi: "+375%",
    topHolding: "$FOUR",
    topBag: "$74.0K",
  },
  {
    id: "rookiexbt",
    rank: 5,
    name: "RookieXBT",
    handle: "@RookieXBT",
    avatar: "🐋",
    tier: "Whale KOL",
    pnl: 49200000,
    winRate: 78.5,
    volume: 514200000,
    trades: 140,
    avgRoi: "+290%",
    topHolding: "$CZPEPE",
    topBag: "$68.5K",
  },
  ...Array.from({ length: 45 }).map((_, i) => ({
    id: `t${i + 6}`,
    rank: i + 6,
    name: `Trader_${1000 + i * 37}`,
    handle: `@trader_${1000 + i * 37}`,
    avatar: String.fromCharCode(65 + (i % 26)),
    tier: i % 3 === 0 ? "Alpha Caller" : i % 2 === 0 ? "OG Trader" : "Whale KOL",
    pnl: (45000000 - i * 800000) * (Math.random() > 0.1 ? 1 : -0.2),
    winRate: 50 + Math.random() * 35,
    volume: 5000000 + Math.random() * 300000000,
    trades: Math.floor(Math.random() * 300) + 20,
    avgRoi: `+${Math.floor(Math.random() * 250 + 50)}%`,
    topHolding: `$TOKEN${i + 1}`,
    topBag: `$${Math.floor(Math.random() * 90 + 10)}K`,
  })),
];

const fmt = (n: number) =>
  Math.abs(n) >= 1e6
    ? `${(Math.abs(n) / 1e6).toFixed(2)}M`
    : Math.abs(n) >= 1e3
    ? `${(Math.abs(n) / 1e3).toFixed(1)}K`
    : Math.abs(n).toFixed(0);

const TOP5_THEMES = [
  {
    theme: "blue",
    color: "#38bdf8",
    bgAlpha: "rgba(56, 189, 248, 0.15)",
    borderAlpha: "rgba(56, 189, 248, 0.35)",
    barGradient: "linear-gradient(180deg, #60a5fa 0%, #2563eb 100%)",
    glow: "rgba(56, 189, 248, 0.08)",
    bars: [45, 70, 95, 40, 85, 60, 90],
    icon: <Award size={14} color="#38bdf8" />,
  },
  {
    theme: "purple",
    color: "#c084fc",
    bgAlpha: "rgba(192, 132, 252, 0.15)",
    borderAlpha: "rgba(192, 132, 252, 0.35)",
    barGradient: "linear-gradient(180deg, #c084fc 0%, #7c3aed 100%)",
    glow: "rgba(192, 132, 252, 0.08)",
    bars: [35, 75, 50, 90, 65, 85, 95],
    icon: <Sparkles size={14} color="#c084fc" />,
  },
  {
    theme: "orange",
    color: "#fb923c",
    bgAlpha: "rgba(251, 146, 60, 0.15)",
    borderAlpha: "rgba(251, 146, 60, 0.35)",
    barGradient: "linear-gradient(180deg, #fb923c 0%, #ea580c 100%)",
    glow: "rgba(251, 146, 60, 0.08)",
    bars: [60, 45, 75, 85, 100, 70, 90],
    icon: <Flame size={14} color="#fb923c" />,
  },
  {
    theme: "red",
    color: "#f87171",
    bgAlpha: "rgba(248, 113, 113, 0.15)",
    borderAlpha: "rgba(248, 113, 113, 0.35)",
    barGradient: "linear-gradient(180deg, #f87171 0%, #dc2626 100%)",
    glow: "rgba(248, 113, 113, 0.08)",
    bars: [55, 35, 65, 80, 95, 100, 85],
    icon: <ShieldCheck size={14} color="#f87171" />,
  },
  {
    theme: "emerald",
    color: "#34d399",
    bgAlpha: "rgba(52, 211, 153, 0.15)",
    borderAlpha: "rgba(52, 211, 153, 0.35)",
    barGradient: "linear-gradient(180deg, #34d399 0%, #059669 100%)",
    glow: "rgba(52, 211, 153, 0.08)",
    bars: [50, 65, 45, 85, 70, 90, 100],
    icon: <Coins size={14} color="#34d399" />,
  },
];

export default function LeaderboardView() {
  const [timeframe, setTimeframe] = useState<"Daily" | "Weekly" | "Monthly" | "All Time">("Weekly");
  const [metric, setMetric] = useState<"PNL" | "Volume">("PNL");
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    murad: true,
    lookonchain: true,
  });

  const top5 = TRADERS.slice(0, 5);
  const rest = TRADERS.slice(5).filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.handle.toLowerCase().includes(search.toLowerCase())
  );

  const timeframes = ["Daily", "Weekly", "Monthly", "All Time"] as const;

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: "6px 14px",
    borderRadius: "var(--radius-md)",
    border: "none",
    background: active ? "var(--bg-surface-overlay)" : "transparent",
    color: active ? "var(--text-primary)" : "var(--text-tertiary)",
    fontSize: 12,
    fontWeight: active ? 700 : 500,
    cursor: "pointer",
    fontFamily: "var(--font-sans)",
    transition: "all 0.15s ease",
    whiteSpace: "nowrap" as const,
  });

  return (
    <div style={{
      height: "100%",
      overflowY: "auto",
      background: "var(--bg-app)",
      color: "var(--text-primary)",
      padding: "24px",
      fontFamily: "var(--font-sans)",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--text-primary)", margin: 0, display: "flex", alignItems: "center", gap: 10 }}>
              🏆 Top 5 KOL &amp; Smart Money Leaderboard
            </h1>
            <p style={{ fontSize: 13, color: "var(--text-tertiary)", marginTop: 4 }}>
              Real-time on-chain rankings by realized PnL, win rate, and total volume
            </p>
          </div>
          <div style={{ display: "flex", gap: 4, background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-lg)", padding: 4 }}>
            {timeframes.map((tf) => (
              <button key={tf} style={tabStyle(timeframe === tf)} onClick={() => setTimeframe(tf)}>
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* ── TOP 5 FEATURED LEADERBOARD CARDS (LAUNCHPAD VIEW MODEL STYLE & COLORS) ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 14,
          marginBottom: 24,
        }}>
          {top5.map((trader, idx) => {
            const theme = TOP5_THEMES[idx] || TOP5_THEMES[0];
            return (
              <div
                key={trader.id}
                style={{
                  background: "var(--bg-surface-raised)",
                  border: `1px solid ${theme.borderAlpha}`,
                  borderRadius: "var(--radius-xl)",
                  padding: "16px 16px 14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  boxShadow: `0 0 16px ${theme.glow}`,
                  transition: "all 0.15s ease",
                  position: "relative",
                }}
              >
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      fontWeight: 800,
                      padding: "2px 7px",
                      borderRadius: "var(--radius-sm)",
                      background: theme.bgAlpha,
                      color: theme.color,
                      border: `1px solid ${theme.borderAlpha}`,
                      flexShrink: 0,
                    }}>
                      #{trader.rank}
                    </span>
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "var(--bg-surface-overlay)",
                      border: "1px solid var(--border-color-strong)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                      flexShrink: 0,
                    }}>
                      {trader.avatar}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {trader.name}
                        </span>
                        <Check size={11} color="#38bdf8" strokeWidth={3} style={{ flexShrink: 0 }} />
                      </div>
                      <span style={{ fontSize: 9.5, color: "var(--text-tertiary)", textTransform: "uppercase", fontWeight: 600 }}>
                        {trader.tier}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    style={{ background: "transparent", border: "none", color: favorites[trader.id] ? "#fbbf24" : "var(--text-tertiary)", cursor: "pointer", padding: 2 }}
                    onClick={() => setFavorites((p) => ({ ...p, [trader.id]: !p[trader.id] }))}
                  >
                    <Star size={14} fill={favorites[trader.id] ? "#fbbf24" : "none"} />
                  </button>
                </div>

                {/* Inset Well: Big PnL & Win Rate */}
                <div style={{
                  background: "var(--bg-app)",
                  border: "1px solid var(--border-color-default)",
                  borderRadius: "var(--radius-lg)",
                  padding: "10px 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 8,
                }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 20, fontWeight: 700, color: "var(--neutral-0)", lineHeight: 1 }}>
                      +${fmt(trader.pnl)}
                    </span>
                    <span style={{ fontSize: 11, color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}>
                      {trader.winRate.toFixed(1)}% Win Rate
                    </span>
                  </div>
                </div>

                {/* Middle Stat Row: W/L Record & Top Holding */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6, fontSize: 11 }}>
                  <span style={{ color: "var(--text-tertiary)" }}>
                    <strong style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>{trader.trades}</strong> Trades
                  </span>
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid var(--border-color-default)",
                    borderRadius: "var(--radius-sm)",
                    padding: "2px 6px",
                  }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--text-primary)" }}>
                      {trader.topHolding}
                    </span>
                    <span style={{ color: "var(--text-tertiary)", fontSize: 10 }}>({trader.topBag})</span>
                  </div>
                </div>

                {/* Footer: Avg ROI & Quick Action */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 8, marginTop: 2 }}>
                  <span style={{ color: "var(--emerald-500)", fontWeight: 700, fontSize: 11.5, display: "inline-flex", alignItems: "center", gap: 3 }}>
                    ▲ {trader.avgRoi} ROI
                  </span>
                  <button
                    type="button"
                    style={{
                      height: 22,
                      padding: "0 8px",
                      borderRadius: "var(--radius-sm)",
                      background: "var(--button-primary-bg)",
                      border: "none",
                      color: "var(--button-primary-text)",
                      fontFamily: "var(--font-sans)",
                      fontSize: 10.5,
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <Zap size={10} />
                    <span>Copy Buy</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-md)", padding: "0 12px", height: 36, flex: "0 1 280px" }}>
            <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="var(--text-tertiary)" strokeWidth="1.5" />
              <path d="M11 11l3 3" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              style={{ background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontSize: 13, width: "100%", fontFamily: "var(--font-sans)" }}
              placeholder="Search trader, handle, token..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Rank by:</span>
            <div style={{ display: "flex", gap: 4, background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-md)", padding: 4 }}>
              {(["PNL", "Volume"] as const).map((m) => (
                <button key={m} style={tabStyle(metric === m)} onClick={() => setMetric(m)}>{m}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Rank", "Caller / Trader", "Tier", "Realized PnL", "Win Rate", "Total Volume", "Trades (30D)"].map((h) => (
                    <th key={h} style={{
                      padding: "10px 16px", fontSize: 11, fontWeight: 600, color: "var(--text-tertiary)",
                      textTransform: "uppercase", letterSpacing: "0.06em", background: "var(--bg-surface-raised)",
                      borderBottom: "1px solid var(--border-color-default)", whiteSpace: "nowrap",
                      textAlign: ["Rank", "Caller / Trader", "Tier"].includes(h) ? "left" : "right",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rest.map((trader) => (
                  <tr key={trader.id}
                    style={{ transition: "background 0.1s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = "var(--bg-surface-raised)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = "transparent"; }}
                  >
                    <td style={{ padding: "10px 16px", fontSize: 13, borderBottom: "1px solid var(--border-color-default)", fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}>
                      #{trader.rank}
                    </td>
                    <td style={{ padding: "10px 16px", fontSize: 13, borderBottom: "1px solid var(--border-color-default)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--neutral-700)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "var(--text-primary)", border: "1px solid var(--border-color-default)", flexShrink: 0 }}>
                          {trader.avatar}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{trader.name}</span>
                          <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{trader.handle}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "10px 16px", fontSize: 12, borderBottom: "1px solid var(--border-color-default)" }}>
                      <span style={{
                        padding: "2px 7px",
                        borderRadius: "var(--radius-sm)",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid var(--border-color-default)",
                        color: "var(--text-secondary)",
                        fontSize: 10.5,
                        fontWeight: 600,
                        textTransform: "uppercase",
                      }}>
                        {trader.tier}
                      </span>
                    </td>
                    <td style={{ padding: "10px 16px", fontSize: 13, borderBottom: "1px solid var(--border-color-default)", textAlign: "right" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: trader.pnl >= 0 ? "var(--color-price-up)" : "var(--color-price-down)" }}>
                        {trader.pnl >= 0 ? "+" : "-"}${fmt(trader.pnl)}
                      </span>
                    </td>
                    <td style={{ padding: "10px 16px", fontSize: 13, borderBottom: "1px solid var(--border-color-default)", textAlign: "right" }}>
                      <span style={{ background: "var(--bg-surface-overlay)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-sm)", padding: "2px 8px", fontFamily: "var(--font-mono)", fontSize: 12 }}>
                        {trader.winRate.toFixed(1)}%
                      </span>
                    </td>
                    <td style={{ padding: "10px 16px", fontSize: 13, borderBottom: "1px solid var(--border-color-default)", textAlign: "right", fontFamily: "var(--font-mono)" }}>
                      ${fmt(trader.volume)}
                    </td>
                    <td style={{ padding: "10px 16px", fontSize: 13, borderBottom: "1px solid var(--border-color-default)", textAlign: "right", fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}>
                      {trader.trades}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border-color-default)", textAlign: "center", fontSize: 13, color: "var(--text-tertiary)", cursor: "pointer" }}>
            Load More Traders
          </div>
        </div>

      </div>
    </div>
  );
}
