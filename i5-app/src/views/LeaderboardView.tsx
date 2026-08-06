"use client";

import React, { useState } from "react";

/* ── Mock data ─────────────────────────────────────────── */
const TRADERS = Array.from({ length: 50 }).map((_, i) => ({
  id: `t${i}`,
  rank: i + 1,
  name:
    i === 0
      ? "CryptoWhale_99"
      : i === 1
      ? "AlphaSeeker"
      : i === 2
      ? "DeFi_Degen"
      : `Trader_${1000 + i * 37}`,
  avatar: String.fromCharCode(65 + (i % 26)),
  pnl: ((Math.random() * 80000 + 2000) * (Math.random() > 0.2 ? 1 : -1) * (50 - i)) / 10,
  winRate: 40 + Math.random() * 50,
  volume: 10000 + Math.random() * 4000000,
  trades: Math.floor(Math.random() * 400) + 10,
})).sort((a, b) => b.pnl - a.pnl).map((t, idx) => ({ ...t, rank: idx + 1 }));

const fmt = (n: number) =>
  Math.abs(n) >= 1e6
    ? `${(Math.abs(n) / 1e6).toFixed(2)}M`
    : Math.abs(n) >= 1e3
    ? `${(Math.abs(n) / 1e3).toFixed(1)}K`
    : Math.abs(n).toFixed(0);

export default function LeaderboardView() {
  const [timeframe, setTimeframe] = useState<"Daily" | "Weekly" | "Monthly" | "All Time">("Weekly");
  const [metric, setMetric] = useState<"PNL" | "Volume">("PNL");
  const [search, setSearch] = useState("");

  const top3 = TRADERS.slice(0, 3);
  const rest = TRADERS.slice(3).filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
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

  const podiumCardStyle = (place: 1 | 2 | 3): React.CSSProperties => ({
    background:
      place === 1
        ? "linear-gradient(160deg, var(--neutral-800) 0%, var(--neutral-850) 100%)"
        : "var(--bg-surface)",
    border: `1px solid ${
      place === 1
        ? "rgba(244,194,58,0.25)"
        : "var(--border-color-default)"
    }`,
    borderRadius: "var(--radius-xl)",
    padding: place === 1 ? "20px 16px 16px" : "16px 12px 12px",
    textAlign: "center" as const,
    position: "relative" as const,
    marginTop: place === 1 ? 0 : place === 2 ? 16 : 32,
  });

  const rankBadgeStyle = (place: 1 | 2 | 3): React.CSSProperties => ({
    position: "absolute" as const,
    top: -16,
    left: "50%",
    transform: "translateX(-50%)",
    width: place === 1 ? 38 : 28,
    height: place === 1 ? 38 : 28,
    borderRadius: "50%",
    background:
      place === 1 ? "#F4C23A" : place === 2 ? "#B0BEC5" : "#CD7F32",
    color: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: place === 1 ? 16 : 12,
    fontWeight: 800,
    border: "2px solid var(--bg-app)",
    zIndex: 2,
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
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--text-primary)", margin: 0, display: "flex", alignItems: "center", gap: 10 }}>
              🏆 Leaderboard
            </h1>
            <p style={{ fontSize: 13, color: "var(--text-tertiary)", marginTop: 4 }}>
              Top performing traders ranked by PnL &amp; volume
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

        {/* Top 3 Podium */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24, alignItems: "flex-end" }}>
          {/* 2nd */}
          <div style={podiumCardStyle(2)}>
            <div style={rankBadgeStyle(2)}>2</div>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--neutral-700)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 18, color: "var(--text-primary)", margin: "12px auto 8px", border: "2px solid var(--border-color-strong)" }}>
              {top3[1]?.avatar}
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 4 }}>{top3[1]?.name}</div>
            <div style={{ fontSize: 18, fontWeight: 800, fontFamily: "var(--font-mono)", color: top3[1]?.pnl >= 0 ? "var(--color-price-up)" : "var(--color-price-down)" }}>
              {top3[1]?.pnl >= 0 ? "+" : "-"}${fmt(top3[1]?.pnl)}
            </div>
            <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 4 }}>{top3[1]?.trades} Trades</div>
          </div>

          {/* 1st */}
          <div style={podiumCardStyle(1)}>
            <div style={rankBadgeStyle(1)}>🥇</div>
            <div style={{ width: 60, height: 60, borderRadius: "50%", background: "var(--neutral-700)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 22, color: "var(--text-primary)", margin: "12px auto 8px", border: "2px solid rgba(244,194,58,0.5)" }}>
              {top3[0]?.avatar}
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 4 }}>{top3[0]?.name}</div>
            <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "var(--font-mono)", color: top3[0]?.pnl >= 0 ? "var(--color-price-up)" : "var(--color-price-down)" }}>
              {top3[0]?.pnl >= 0 ? "+" : "-"}${fmt(top3[0]?.pnl)}
            </div>
            <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 4 }}>{top3[0]?.trades} Trades · {top3[0]?.winRate.toFixed(1)}% WR</div>
          </div>

          {/* 3rd */}
          <div style={podiumCardStyle(3)}>
            <div style={rankBadgeStyle(3)}>3</div>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--neutral-700)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15, color: "var(--text-primary)", margin: "12px auto 8px", border: "2px solid var(--border-color-strong)" }}>
              {top3[2]?.avatar}
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 4 }}>{top3[2]?.name}</div>
            <div style={{ fontSize: 16, fontWeight: 800, fontFamily: "var(--font-mono)", color: top3[2]?.pnl >= 0 ? "var(--color-price-up)" : "var(--color-price-down)" }}>
              {top3[2]?.pnl >= 0 ? "+" : "-"}${fmt(top3[2]?.pnl)}
            </div>
            <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 4 }}>{top3[2]?.trades} Trades</div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-md)", padding: "0 12px", height: 36, flex: "0 1 240px" }}>
            <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="var(--text-tertiary)" strokeWidth="1.5" />
              <path d="M11 11l3 3" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              style={{ background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontSize: 13, width: "100%", fontFamily: "var(--font-sans)" }}
              placeholder="Search trader..."
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
                  {["Rank", "Trader", "PNL", "Win Rate", "Volume", "Trades (30D)"].map((h) => (
                    <th key={h} style={{
                      padding: "10px 16px", fontSize: 11, fontWeight: 600, color: "var(--text-tertiary)",
                      textTransform: "uppercase", letterSpacing: "0.06em", background: "var(--bg-surface-raised)",
                      borderBottom: "1px solid var(--border-color-default)", whiteSpace: "nowrap",
                      textAlign: ["Rank", "Trader"].includes(h) ? "left" : "right",
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
                        <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{trader.name}</span>
                      </div>
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
