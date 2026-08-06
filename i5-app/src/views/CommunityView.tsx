"use client";

import React, { useState } from "react";

const DISCUSSION_TABS = ["All Discussions", "KOL", "Telegram", "Groups"];

const DISCUSSIONS = [
  {
    id: 1,
    author: "0xFlash",
    avatar: "0",
    time: "2 hours ago",
    badge: "Pro Trader",
    badgeColor: "#60A5FA",
    content:
      "Just successfully front-ran a massive liquidation cluster on ETH. AI Slippage protection saved me about 0.5% in adverse execution. Anyone else playing the mean reversion?",
    likes: 42,
    comments: 12,
    asset: "ETH",
    sentiment: "Long",
  },
  {
    id: 2,
    author: "WhaleSurfer",
    avatar: "W",
    time: "4 hours ago",
    badge: "Standard",
    badgeColor: "#9A9A9A",
    content:
      "The Telegram Analyzer just pinged a huge accumulation phase for ARB across 4 major private alpha groups. Setting up localized limit bids between $0.124 and $0.125.",
    likes: 89,
    comments: 34,
    asset: "ARB",
    sentiment: "Long",
  },
  {
    id: 3,
    author: "AI_Trader99",
    avatar: "A",
    time: "6 hours ago",
    badge: "Starter",
    badgeColor: "#2FCB73",
    content:
      "Funding rates on SOL turning extremely negative. Shorts paying longs heavily. Easy perp strategy setting up here — who is fading this?",
    likes: 15,
    comments: 3,
    asset: "SOL",
    sentiment: "Short",
  },
  {
    id: 4,
    author: "HypeLiquidator",
    avatar: "H",
    time: "8 hours ago",
    badge: "Pro Trader",
    badgeColor: "#60A5FA",
    content:
      "HYPE showing textbook accumulation on 4H. Whale addresses quietly scooping spot. My target is $48 within 5 days. Low risk setup with SL at $40.",
    likes: 67,
    comments: 21,
    asset: "HYPE",
    sentiment: "Long",
  },
  {
    id: 5,
    author: "DegenMax",
    avatar: "D",
    time: "10 hours ago",
    badge: "Free",
    badgeColor: "#787878",
    content:
      "Anyone else notice BTC dominance dropping sharply? Classic alt season signal. Rotating into mid-caps. LINK and AVAX looking tasty at these levels.",
    likes: 31,
    comments: 8,
    asset: "BTC",
    sentiment: "Short",
  },
];

export default function CommunityView() {
  const [tab, setTab] = useState("All Discussions");
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [postText, setPostText] = useState("");

  const toggleLike = (id: number) =>
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: "7px 16px",
    borderRadius: 0,
    border: "none",
    borderBottom: active ? "2px solid var(--text-primary)" : "2px solid transparent",
    background: "transparent",
    color: active ? "var(--text-primary)" : "var(--text-tertiary)",
    fontSize: 13,
    fontWeight: active ? 700 : 400,
    cursor: "pointer",
    fontFamily: "var(--font-sans)",
    transition: "all 0.15s ease",
  });

  return (
    <div style={{ height: "100%", overflowY: "auto", background: "var(--bg-app)", color: "var(--text-primary)", padding: 24, fontFamily: "var(--font-sans)" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>💬 Community</h1>
          <p style={{ fontSize: 13, color: "var(--text-tertiary)", marginTop: 4 }}>
            Share trades, discuss signals, and collaborate with other AI traders
          </p>
        </div>

        {/* New post box */}
        <div style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-color-default)",
          borderRadius: "var(--radius-xl)",
          padding: 16,
          marginBottom: 20,
        }}>
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Share a trade insight, signal, or market observation..."
            style={{
              width: "100%", background: "transparent", border: "none", outline: "none",
              color: "var(--text-primary)", fontSize: 14, resize: "none", minHeight: 72,
              fontFamily: "var(--font-sans)", lineHeight: 1.6,
            }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8, borderTop: "1px solid var(--border-color-default)", paddingTop: 12 }}>
            <select style={{
              background: "var(--bg-surface-overlay)", border: "1px solid var(--border-color-default)",
              borderRadius: "var(--radius-md)", color: "var(--text-secondary)", fontSize: 12,
              padding: "6px 10px", fontFamily: "var(--font-sans)", outline: "none", cursor: "pointer",
            }}>
              <option>Long</option>
              <option>Short</option>
              <option>Neutral</option>
            </select>
            <button style={{
              padding: "7px 20px", borderRadius: "var(--radius-md)", border: "none", cursor: "pointer",
              background: "var(--button-primary-bg)", color: "var(--button-primary-text)",
              fontSize: 13, fontWeight: 700, fontFamily: "var(--font-sans)",
            }}>
              Post
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid var(--border-color-default)", marginBottom: 20 }}>
          {DISCUSSION_TABS.map((t) => (
            <button key={t} style={tabStyle(tab === t)} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>

        {/* Discussion list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {DISCUSSIONS.map((d) => (
            <div key={d.id} style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-color-default)",
              borderRadius: "var(--radius-xl)",
              padding: 16,
              transition: "border-color 0.15s",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-color-strong)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-color-default)"; }}
            >
              {/* Author row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--neutral-700)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: "var(--text-primary)", border: "1px solid var(--border-color-default)" }}>
                    {d.avatar}
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontWeight: 700, fontSize: 14 }}>{d.author}</span>
                      <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: "var(--radius-full)", background: `${d.badgeColor}20`, color: d.badgeColor, border: `1px solid ${d.badgeColor}30` }}>
                        {d.badge}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-tertiary)" }}>{d.time}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: "var(--radius-full)", fontWeight: 600, background: d.sentiment === "Long" ? "rgba(47,203,115,0.12)" : "rgba(225,59,59,0.12)", color: d.sentiment === "Long" ? "var(--color-price-up)" : "var(--color-price-down)", border: `1px solid ${d.sentiment === "Long" ? "rgba(47,203,115,0.3)" : "rgba(225,59,59,0.3)"}` }}>
                    {d.sentiment === "Long" ? "↑" : "↓"} {d.asset}
                  </span>
                </div>
              </div>

              {/* Content */}
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, margin: "0 0 12px 0" }}>{d.content}</p>

              {/* Actions */}
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <button
                  onClick={() => toggleLike(d.id)}
                  style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: liked.has(d.id) ? "var(--color-price-up)" : "var(--text-tertiary)", fontSize: 13, fontFamily: "var(--font-sans)" }}
                >
                  {liked.has(d.id) ? "♥" : "♡"} {d.likes + (liked.has(d.id) ? 1 : 0)}
                </button>
                <button style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "var(--text-tertiary)", fontSize: 13, fontFamily: "var(--font-sans)" }}>
                  💬 {d.comments}
                </button>
                <button style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "var(--text-tertiary)", fontSize: 13, fontFamily: "var(--font-sans)", marginLeft: "auto" }}>
                  ↗ Share
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
