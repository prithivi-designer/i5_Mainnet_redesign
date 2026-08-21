"use client";

import React, { useState } from "react";
import { Waves, Rss, Newspaper, BarChart3, Target, Bot, Store, MessageSquare, SlidersHorizontal } from "lucide-react";
import PipelineArchitectureModal from "../components/dashboard/PipelineArchitectureModal";

const AGENTS = [
  {
    id: 1,
    title: "Whale Detection Agent",
    description: "Monitors on-chain wallet movements in real time to alert you on large token inflows and outflows that may signal upcoming price action or market manipulation.",
    icon: Waves,
    accentColor: "#60A5FA",
    stats: [
      { label: "Accuracy", value: "94.8%" },
      { label: "Latency", value: "25ms" },
      { label: "Type", value: "On-chain" },
    ],
    active: true,
  },
  {
    id: 2,
    title: "Social Sentiment Agent",
    description: "Analyzes Twitter/X, Reddit and Telegram in real time to gauge crowd sentiment and identify narrative shifts before they move the market.",
    icon: Rss,
    accentColor: "#C084FC",
    stats: [
      { label: "Accuracy", value: "89.2%" },
      { label: "Latency", value: "120ms" },
      { label: "Type", value: "NLP AI" },
    ],
    active: true,
  },
  {
    id: 3,
    title: "News Agent",
    description: "Aggregates top crypto news feeds and summarises breaking headlines that could impact your open positions, so you never miss a market-moving event.",
    icon: Newspaper,
    accentColor: "#F97316",
    stats: [
      { label: "Speed", value: "Instant" },
      { label: "Feeds", value: "80+" },
      { label: "Type", value: "LLM Agent" },
    ],
    active: false,
  },
  {
    id: 4,
    title: "Chart Pattern Agent",
    description: "Scans 500+ trading pairs for classical and AI-detected chart patterns (head & shoulders, flags, pennants) giving you a visual edge on breakouts.",
    icon: BarChart3,
    accentColor: "#2FCB73",
    stats: [
      { label: "Pairs", value: "500+" },
      { label: "Accuracy", value: "91.4%" },
      { label: "Type", value: "Vision AI" },
    ],
    active: false,
  },
  {
    id: 5,
    title: "Liquidation Radar Agent",
    description: "Tracks open liquidation clusters across all major perp exchanges and alerts you when a price sweep toward dense liq zones is imminent.",
    icon: Target,
    accentColor: "#E13B3B",
    stats: [
      { label: "Exchanges", value: "12" },
      { label: "Latency", value: "10ms" },
      { label: "Type", value: "On-chain" },
    ],
    active: false,
  },
  {
    id: 6,
    title: "Smart DCA Agent",
    description: "Automated dollar-cost averaging with AI-calculated entry zones based on RSI, volume profile, and market structure analysis.",
    icon: Bot,
    accentColor: "#A78BFA",
    stats: [
      { label: "Strategies", value: "8" },
      { label: "Win Rate", value: "78%" },
      { label: "Type", value: "Execution" },
    ],
    active: false,
  },
];

export default function AgentMarketplaceView() {
  const [activeAgents, setActiveAgents] = useState<Set<number>>(new Set([1, 2]));
  const [chat, setChat] = useState<number | null>(null);
  const [showPipelineModal, setShowPipelineModal] = useState<boolean>(false);

  const toggleAgent = (id: number) => {
    setActiveAgents((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div style={{ height: "100%", overflowY: "auto", background: "var(--bg-app)", color: "var(--text-primary)", padding: 24, fontFamily: "var(--font-sans)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: 10 }}>
              <Store size={24} color="var(--text-primary)" /> Agent Marketplace
            </h1>
            <p style={{ fontSize: 13, color: "var(--text-tertiary)", marginTop: 4 }}>
              Deploy AI agents to monitor markets, detect opportunities and execute trades autonomously
            </p>
          </div>
          <button
            onClick={() => setShowPipelineModal(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 14px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-color-default)",
              background: "var(--button-secondary-bg)",
              color: "var(--button-secondary-text)",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <SlidersHorizontal size={15} />
            Pipeline Architecture
          </button>
        </div>

        {/* Active agents summary bar */}
        <div style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-color-default)",
          borderRadius: "var(--radius-lg)",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
          flexWrap: "wrap",
          gap: 12,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-price-up)", boxShadow: "0 0 8px var(--color-price-up)" }} />
            <span style={{ fontSize: 13, fontWeight: 600 }}>{activeAgents.size} agents active</span>
            <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>/ {AGENTS.length} available</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--text-tertiary)" }}>Pro plan: Unlimited agents</div>
        </div>

        {/* Agent grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
          {AGENTS.map((agent) => {
            const isActive = activeAgents.has(agent.id);
            return (
              <div key={agent.id} style={{
                background: "var(--bg-surface)",
                border: `1px solid ${isActive ? `${agent.accentColor}40` : "var(--border-color-default)"}`,
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                transition: "border-color 0.2s, transform 0.15s",
                position: "relative",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "none"; }}
              >
                {/* Top accent line */}
                <div style={{ height: 3, background: `linear-gradient(90deg, transparent, ${agent.accentColor}, transparent)`, opacity: isActive ? 1 : 0.3 }} />

                <div style={{ padding: 20 }}>
                  {/* Header */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12, gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: "var(--radius-md)",
                        background: `${agent.accentColor}15`,
                        border: `1px solid ${agent.accentColor}30`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        <agent.icon size={22} color={agent.accentColor} />
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{agent.title}</div>
                        {isActive && (
                          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-price-up)", animation: "pulse 2s infinite" }} />
                            <span style={{ fontSize: 11, color: "var(--color-price-up)" }}>Running</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: 13, color: "var(--text-tertiary)", lineHeight: 1.6, margin: "0 0 16px 0" }}>
                    {agent.description}
                  </p>

                  {/* Stats */}
                  <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                    {agent.stats.map((stat) => (
                      <div key={stat.label} style={{
                        flex: 1,
                        background: "var(--bg-surface-raised)",
                        border: "1px solid var(--border-color-default)",
                        borderRadius: "var(--radius-md)",
                        padding: "8px 10px",
                        textAlign: "center",
                      }}>
                        <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "var(--font-mono)", color: agent.accentColor }}>{stat.value}</div>
                        <div style={{ fontSize: 10, color: "var(--text-tertiary)", marginTop: 2 }}>{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => toggleAgent(agent.id)}
                      style={{
                        flex: 1, padding: "9px 0", borderRadius: "var(--radius-md)", border: "none", cursor: "pointer",
                        background: isActive ? "rgba(225,59,59,0.12)" : `${agent.accentColor}20`,
                        color: isActive ? "var(--color-price-down)" : agent.accentColor,
                        fontSize: 13, fontWeight: 700, fontFamily: "var(--font-sans)",
                        transition: "background 0.15s",
                      }}
                    >
                      {isActive ? "Deactivate" : "Deploy"}
                    </button>
                    <button
                      onClick={() => setChat(chat === agent.id ? null : agent.id)}
                      style={{
                        padding: "9px 14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color-default)", cursor: "pointer",
                        background: "transparent", color: "var(--text-secondary)", fontSize: 13, fontFamily: "var(--font-sans)",
                      }}
                    >
                      Chat
                    </button>
                  </div>

                  {/* Simple chat area */}
                  {chat === agent.id && (
                    <div style={{ marginTop: 12, background: "var(--bg-surface-raised)", borderRadius: "var(--radius-md)", padding: 12, border: "1px solid var(--border-color-default)" }}>
                      <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                        <MessageSquare size={14} /> Agent Chat
                      </div>
                      <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 8, padding: "8px 10px", background: "var(--bg-surface-overlay)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", gap: 6 }}>
                        <span>{agent.title} online</span>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-price-up)" }} />
                        <span>— Ready to assist. Ask me anything about market signals or configure my monitoring parameters.</span>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <input style={{
                          flex: 1, background: "var(--bg-app)", border: "1px solid var(--border-color-default)",
                          borderRadius: "var(--radius-md)", padding: "6px 10px",
                          color: "var(--text-primary)", fontSize: 12, fontFamily: "var(--font-sans)", outline: "none",
                        }} placeholder="Ask agent..." />
                        <button style={{
                          padding: "6px 12px", borderRadius: "var(--radius-md)", border: "none", cursor: "pointer",
                          background: "var(--button-primary-bg)", color: "var(--button-primary-text)",
                          fontSize: 12, fontFamily: "var(--font-sans)",
                        }}>Send</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Pipeline Architecture Popup Modal */}
      {showPipelineModal && (
        <PipelineArchitectureModal
          onClose={() => setShowPipelineModal(false)}
        />
      )}
    </div>
  );
}
