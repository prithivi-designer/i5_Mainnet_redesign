"use client";

import React, { useState } from "react";

const MISSIONS = [
  { id: 1, title: "First Signal Trade", description: "Execute a trade based on an AI signal recommendation", points: 500, progress: 100, total: 1, category: "Trading", completed: true },
  { id: 2, title: "7-Day Streak", description: "Log into the platform for 7 consecutive days", points: 750, progress: 5, total: 7, category: "Engagement", completed: false },
  { id: 3, title: "Volume Milestone", description: "Trade $10,000+ in total volume this month", points: 1000, progress: 6240, total: 10000, category: "Trading", completed: false },
  { id: 4, title: "Community Contributor", description: "Post 5 market insights in the community forum", points: 300, progress: 3, total: 5, category: "Social", completed: false },
  { id: 5, title: "Alert Master", description: "Create 10 price alerts across different assets", points: 400, progress: 7, total: 10, category: "Tools", completed: false },
  { id: 6, title: "Agent Deployer", description: "Deploy 3 AI agents from the marketplace", points: 600, progress: 2, total: 3, category: "Agents", completed: false },
  { id: 7, title: "First Referral", description: "Invite a friend who signs up and completes onboarding", points: 1500, progress: 1, total: 1, category: "Referrals", completed: true },
  { id: 8, title: "Pro Trader Badge", description: "Achieve a 60%+ win rate across 20+ signal trades", points: 2000, progress: 11, total: 20, category: "Trading", completed: false },
];

const REFERRAL_CODE = "I5-ALPHA-X9K2";

export default function MissionsReferralsView() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"missions" | "referrals">("missions");

  const totalPoints = MISSIONS.filter(m => m.completed).reduce((acc, m) => acc + m.points, 0);
  const pendingPoints = MISSIONS.filter(m => !m.completed).reduce((acc, m) => acc + m.points, 0);

  const copyCode = () => {
    navigator.clipboard.writeText(REFERRAL_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: "8px 24px", borderRadius: "var(--radius-md)", border: "none",
    background: active ? "var(--bg-surface-overlay)" : "transparent",
    color: active ? "var(--text-primary)" : "var(--text-tertiary)",
    fontSize: 13, fontWeight: active ? 700 : 400, cursor: "pointer",
    fontFamily: "var(--font-sans)", transition: "all 0.15s ease",
  });

  const categoryColors: Record<string, string> = {
    Trading: "#60A5FA",
    Engagement: "#C084FC",
    Social: "#F97316",
    Tools: "#2FCB73",
    Agents: "#F4C23A",
    Referrals: "#E13B3B",
  };

  return (
    <div style={{ height: "100%", overflowY: "auto", background: "var(--bg-app)", color: "var(--text-primary)", padding: 24, fontFamily: "var(--font-sans)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>🎯 Missions & Referrals</h1>
          <p style={{ fontSize: 13, color: "var(--text-tertiary)", marginTop: 4 }}>
            Complete missions to earn points and unlock exclusive rewards
          </p>
        </div>

        {/* Points summary */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
          {[
            { label: "Points Earned", value: totalPoints.toLocaleString(), color: "#F4C23A", emoji: "⭐" },
            { label: "Points Pending", value: pendingPoints.toLocaleString(), color: "var(--text-tertiary)", emoji: "⏳" },
            { label: "Referrals", value: "2 active", color: "var(--color-price-up)", emoji: "👥" },
          ].map((stat) => (
            <div key={stat.label} style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-xl)", padding: 20 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{stat.emoji}</div>
              <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "var(--font-mono)", color: stat.color, marginBottom: 4 }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: "var(--text-tertiary)" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-lg)", padding: 4, marginBottom: 24, width: "fit-content" }}>
          <button style={tabStyle(activeTab === "missions")} onClick={() => setActiveTab("missions")}>🎯 Missions</button>
          <button style={tabStyle(activeTab === "referrals")} onClick={() => setActiveTab("referrals")}>👥 Referrals</button>
        </div>

        {activeTab === "missions" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {MISSIONS.map((mission) => {
              const pct = Math.min((mission.progress / mission.total) * 100, 100);
              return (
                <div key={mission.id} style={{
                  background: "var(--bg-surface)",
                  border: `1px solid ${mission.completed ? "rgba(47,203,115,0.2)" : "var(--border-color-default)"}`,
                  borderRadius: "var(--radius-xl)",
                  padding: 16,
                  opacity: mission.completed ? 0.8 : 1,
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        {mission.completed && <span style={{ fontSize: 14 }}>✅</span>}
                        <span style={{ fontSize: 14, fontWeight: 700 }}>{mission.title}</span>
                        <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: "var(--radius-full)", background: `${categoryColors[mission.category]}15`, color: categoryColors[mission.category] }}>
                          {mission.category}
                        </span>
                      </div>
                      <div style={{ fontSize: 12, color: "var(--text-tertiary)" }}>{mission.description}</div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: 16, fontWeight: 800, fontFamily: "var(--font-mono)", color: "#F4C23A" }}>+{mission.points}</div>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>pts</div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ flex: 1, height: 4, background: "var(--bg-surface-overlay)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: mission.completed ? "var(--color-price-up)" : "var(--text-primary)", borderRadius: "var(--radius-full)", transition: "width 0.3s ease" }} />
                    </div>
                    <span style={{ fontSize: 11, color: "var(--text-tertiary)", whiteSpace: "nowrap", fontFamily: "var(--font-mono)" }}>
                      {mission.progress}/{mission.total}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Referrals tab */
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Referral code card */}
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-xl)", padding: 24 }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Your Referral Code</div>
              <div style={{ fontSize: 13, color: "var(--text-tertiary)", marginBottom: 16 }}>Share your code and earn 1,500 points for every successful referral</div>

              <div style={{ display: "flex", gap: 10, alignItems: "stretch" }}>
                <div style={{
                  flex: 1, background: "var(--bg-surface-raised)", border: "1px solid var(--border-color-default)",
                  borderRadius: "var(--radius-md)", padding: "12px 16px",
                  fontFamily: "var(--font-mono)", fontSize: 18, fontWeight: 800, color: "var(--text-primary)",
                  letterSpacing: "0.1em", display: "flex", alignItems: "center",
                }}>
                  {REFERRAL_CODE}
                </div>
                <button onClick={copyCode} style={{
                  padding: "0 20px", borderRadius: "var(--radius-md)", border: "none", cursor: "pointer",
                  background: copied ? "rgba(47,203,115,0.15)" : "var(--button-primary-bg)",
                  color: copied ? "var(--color-price-up)" : "var(--button-primary-text)",
                  fontSize: 13, fontWeight: 700, fontFamily: "var(--font-sans)", flexShrink: 0,
                  transition: "all 0.2s",
                }}>
                  {copied ? "✓ Copied!" : "Copy"}
                </button>
              </div>

              <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                {["Share on X", "Share on Telegram", "Share Link"].map((btn) => (
                  <button key={btn} style={{
                    padding: "7px 14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color-default)", cursor: "pointer",
                    background: "transparent", color: "var(--text-secondary)", fontSize: 12, fontFamily: "var(--font-sans)",
                  }}>{btn}</button>
                ))}
              </div>
            </div>

            {/* Referral stats */}
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-xl)", padding: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Referral Stats</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {[
                  { label: "Invited", value: "5" },
                  { label: "Converted", value: "2" },
                  { label: "Points Earned", value: "3,000" },
                ].map((stat) => (
                  <div key={stat.label} style={{ background: "var(--bg-surface-raised)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-lg)", padding: "14px 16px", textAlign: "center" }}>
                    <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "var(--font-mono)", color: "var(--text-primary)", marginBottom: 4 }}>{stat.value}</div>
                    <div style={{ fontSize: 12, color: "var(--text-tertiary)" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reward tiers */}
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-xl)", padding: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Referral Reward Tiers</div>
              {[
                { count: "1 Referral", reward: "1,500 Points", unlocked: true },
                { count: "5 Referrals", reward: "10,000 Points + Starter 1 Month Free", unlocked: false },
                { count: "10 Referrals", reward: "25,000 Points + Pro 1 Month Free", unlocked: false },
                { count: "25 Referrals", reward: "Lifetime Pro Access", unlocked: false },
              ].map((tier, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
                  padding: "10px 12px", borderRadius: "var(--radius-md)", marginBottom: 8,
                  background: tier.unlocked ? "rgba(47,203,115,0.06)" : "var(--bg-surface-raised)",
                  border: `1px solid ${tier.unlocked ? "rgba(47,203,115,0.2)" : "var(--border-color-default)"}`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 14 }}>{tier.unlocked ? "✅" : "🔒"}</span>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{tier.count}</span>
                  </div>
                  <span style={{ fontSize: 13, color: tier.unlocked ? "var(--color-price-up)" : "var(--text-tertiary)" }}>{tier.reward}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
