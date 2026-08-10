"use client";
import { BarChart3, Wallet, Send } from "lucide-react";


import React, { useState } from "react";

const ALERT_TYPES = [
  { id: "Price", emoji: "💲", label: "Price" },
  { id: "Percent", emoji: <BarChart3 size={16} />, label: "Percent" },
  { id: "Volume", emoji: "📦", label: "Volume" },
  { id: "Funding", emoji: <Wallet size={16} />, label: "Funding" },
  { id: "Periodic", emoji: "⏱", label: "Periodic" },
  { id: "Marketcap", emoji: "🌐", label: "Mktcap" },
];

const NOTIFY_CHANNELS = [
  { id: "Email", emoji: "📧" },
  { id: "SMS", emoji: "💬" },
  { id: "Telegram", emoji: <Send size={16} /> },
  { id: "Discord", emoji: "🎮" },
  { id: "Browser", emoji: "🖥" },
  { id: "Webhook", emoji: "🔗" },
];

const COOLDOWNS = ["5m", "15m", "30m", "1h", "6h", "24h", "7d"];

const ACTIVE_ALERTS = [
  { id: 1, asset: "BTC", type: "Price", condition: "Above $70,000", notify: "Email", created: "2 days ago", status: "active" },
  { id: 2, asset: "ETH", type: "Percent", condition: "-5% in 1H", notify: "Telegram", created: "4 days ago", status: "active" },
  { id: 3, asset: "SOL", type: "Volume", condition: "Spike > 200%", notify: "Browser", created: "1 week ago", status: "triggered" },
];

export default function CreateAlertsView() {
  const [alertType, setAlertType] = useState("Price");
  const [direction, setDirection] = useState<"Above" | "Below">("Above");
  const [notify, setNotify] = useState("Email");
  const [cooldown, setCooldown] = useState("24h");
  const [asset, setAsset] = useState("BTC");
  const [price, setPrice] = useState("70000");

  const tabStyle = (active: boolean): React.CSSProperties => ({
    display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
    padding: "10px 12px", borderRadius: "var(--radius-md)", border: "none",
    background: active ? "var(--bg-surface-overlay)" : "transparent",
    color: active ? "var(--text-primary)" : "var(--text-tertiary)",
    fontSize: 11, fontWeight: active ? 700 : 400, cursor: "pointer",
    fontFamily: "var(--font-sans)", transition: "all 0.15s ease",
  });

  return (
    <div style={{ height: "100%", overflowY: "auto", background: "var(--bg-app)", color: "var(--text-primary)", padding: 24, fontFamily: "var(--font-sans)" }}>
      <div style={{ maxWidth: 840, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>🔔 Create Alert</h1>
          <p style={{ fontSize: 13, color: "var(--text-tertiary)", marginTop: 4 }}>
            Get notified instantly when your market conditions are met
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>
          {/* Left: Alert builder */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Alert type */}
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-xl)", padding: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Alert Type</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {ALERT_TYPES.map((at) => (
                  <button key={at.id} style={tabStyle(alertType === at.id)} onClick={() => setAlertType(at.id)}>
                    <span style={{ fontSize: 18 }}>{at.emoji}</span>
                    <span>{at.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Asset & price */}
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-xl)", padding: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Condition</div>

              {/* Asset selector */}
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, color: "var(--text-tertiary)", display: "block", marginBottom: 6 }}>Asset</label>
                <select
                  value={asset}
                  onChange={(e) => setAsset(e.target.value)}
                  style={{
                    width: "100%", background: "var(--bg-surface-raised)", border: "1px solid var(--border-color-default)",
                    borderRadius: "var(--radius-md)", color: "var(--text-primary)", fontSize: 14,
                    padding: "10px 12px", fontFamily: "var(--font-sans)", outline: "none", cursor: "pointer",
                  }}
                >
                  {["BTC", "ETH", "SOL", "ARB", "HYPE", "PEPE", "LINK", "DOGE", "AVAX", "SUI"].map(a => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              </div>

              {/* Direction */}
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, color: "var(--text-tertiary)", display: "block", marginBottom: 6 }}>Direction</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {(["Above", "Below"] as const).map((d) => (
                    <button
                      key={d}
                      onClick={() => setDirection(d)}
                      style={{
                        flex: 1, padding: "10px 0", borderRadius: "var(--radius-md)", cursor: "pointer",
                        background: direction === d ? (d === "Above" ? "rgba(47,203,115,0.15)" : "rgba(225,59,59,0.15)") : "var(--bg-surface-raised)",
                        color: direction === d ? (d === "Above" ? "var(--color-price-up)" : "var(--color-price-down)") : "var(--text-tertiary)",
                        fontSize: 13, fontWeight: 700, fontFamily: "var(--font-sans)",
                        border: direction === d ? `1px solid ${d === "Above" ? "rgba(47,203,115,0.3)" : "rgba(225,59,59,0.3)"}` : "1px solid var(--border-color-default)",
                      }}
                    >
                      {d === "Above" ? "↑ Above" : "↓ Below"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price input */}
              <div>
                <label style={{ fontSize: 12, color: "var(--text-tertiary)", display: "block", marginBottom: 6 }}>Target Price (USD)</label>
                <div style={{ display: "flex", alignItems: "center", background: "var(--bg-surface-raised)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
                  <span style={{ padding: "10px 12px", color: "var(--text-tertiary)", fontSize: 14 }}>$</span>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    style={{
                      flex: 1, background: "transparent", border: "none", outline: "none",
                      color: "var(--text-primary)", fontSize: 14, fontFamily: "var(--font-mono)", padding: "10px 12px 10px 0",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Notification channels */}
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-xl)", padding: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Notify via</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {NOTIFY_CHANNELS.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => setNotify(ch.id)}
                    style={{
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                      padding: "10px 16px", borderRadius: "var(--radius-md)", cursor: "pointer",
                      background: notify === ch.id ? "var(--bg-surface-overlay)" : "var(--bg-surface-raised)",
                      border: `1px solid ${notify === ch.id ? "var(--border-color-strong)" : "var(--border-color-default)"}`,
                      color: notify === ch.id ? "var(--text-primary)" : "var(--text-tertiary)",
                      fontSize: 11, fontFamily: "var(--font-sans)",
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{ch.emoji}</span>
                    <span>{ch.id}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cooldown */}
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-xl)", padding: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Alert Cooldown</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {COOLDOWNS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCooldown(c)}
                    style={{
                      padding: "7px 14px", borderRadius: "var(--radius-md)", cursor: "pointer",
                      background: cooldown === c ? "var(--bg-surface-overlay)" : "var(--bg-surface-raised)",
                      border: `1px solid ${cooldown === c ? "var(--border-color-strong)" : "var(--border-color-default)"}`,
                      color: cooldown === c ? "var(--text-primary)" : "var(--text-tertiary)",
                      fontSize: 12, fontFamily: "var(--font-mono)",
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <button style={{
              width: "100%", padding: "12px 0", borderRadius: "var(--radius-lg)", border: "none", cursor: "pointer",
              background: "var(--button-primary-bg)", color: "var(--button-primary-text)",
              fontSize: 14, fontWeight: 700, fontFamily: "var(--font-sans)",
            }}>
              Create Alert
            </button>
          </div>

          {/* Right: Active alerts */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-xl)", padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>Active Alerts ({ACTIVE_ALERTS.length})</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {ACTIVE_ALERTS.map((alert) => (
                  <div key={alert.id} style={{
                    background: "var(--bg-surface-raised)",
                    border: "1px solid var(--border-color-default)",
                    borderRadius: "var(--radius-lg)",
                    padding: 12,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 28, height: 28, borderRadius: "var(--radius-sm)", background: "var(--bg-surface-overlay)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "var(--text-primary)" }}>{alert.asset}</div>
                        <span style={{ fontSize: 13, fontWeight: 700 }}>{alert.asset}</span>
                        <span style={{ fontSize: 10, color: "var(--text-tertiary)" }}>{alert.type}</span>
                      </div>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: alert.status === "active" ? "var(--color-price-up)" : "var(--text-tertiary)" }} />
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 4 }}>{alert.condition}</div>
                    <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>via {alert.notify} · {alert.created}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-xl)", padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>💡 Alert Tips</div>
              {["Use cooldown ≥1h to avoid duplicate alerts", "Telegram alerts are fastest (< 5s)", "Pro users get priority alert delivery", "Chain multiple alerts for bracket orders"].map((tip) => (
                <div key={tip} style={{ fontSize: 12, color: "var(--text-tertiary)", marginBottom: 8, display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ color: "var(--color-price-up)", flexShrink: 0 }}>•</span>
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
