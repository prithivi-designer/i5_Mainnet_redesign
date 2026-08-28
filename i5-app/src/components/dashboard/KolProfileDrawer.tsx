"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Bell,
  BellOff,
  UserPlus,
  UserCheck,
  Copy,
  ExternalLink,
  Send,
  Check,
  TrendingUp,
  Coins,
  Zap,
  Calendar as CalendarIcon,
  Layers,
  Activity,
} from "lucide-react";
import styles from "./KolProfileDrawer.module.css";

export interface KolProfileData {
  id: string;
  rank?: number;
  kolName: string;
  kolHandle: string;
  kolAddress: string;
  kolAvatar: string;
  tierBadge: string;
  category?: string;
  followers?: string;
  winRate?: number;
  wins?: number;
  losses?: number;
  pnl?: string;
  pnlBnb?: string;
  avgRoi?: string;
  totalVolume?: string;
  bestCall?: string;
  topHolding?: {
    name: string;
    ticker: string;
    avatar: string;
    kolBag: string;
  };
  portfolioValue?: string;
  portfolioNative?: string;
  holdings?: {
    id: string;
    name: string;
    ticker: string;
    avatar: string;
    value: string;
    amount: string;
    avgEntry: string;
    pnlPct: number;
  }[];
  recentTrades?: {
    id: string;
    action: "BUY" | "SELL";
    tokenTicker: string;
    tokenName: string;
    tokenAvatar: string;
    txSize: string;
    timeAgo: string;
    pnlPct?: number;
    txHash: string;
  }[];
}

interface KolProfileDrawerProps {
  kol: KolProfileData;
  onClose: () => void;
  onOpenTerminal?: (token: any) => void;
}

type HorizonType = "1D" | "3D" | "7D" | "14D" | "30D" | "ALL";
type ProfileSubTab = "holdings" | "trades" | "tokenPnl" | "calendar";

export default function KolProfileDrawer({
  kol,
  onClose,
  onOpenTerminal,
}: KolProfileDrawerProps) {
  const [horizon, setHorizon] = useState<HorizonType>("30D");
  const [activeTab, setActiveTab] = useState<ProfileSubTab>("holdings");
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isAlertsEnabled, setIsAlertsEnabled] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  // Prevent background scrolling while drawer is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!kol) return null;

  // Normalized values matching user screenshot reference
  const winRateVal = kol.winRate ?? 82.0;
  const winsCount = kol.wins ?? 95;
  const lossesCount = kol.losses ?? 21;
  const pnlVal = kol.pnl ?? "+$2.65M";
  const pnlSubtext = kol.avgRoi ? `${kol.avgRoi} ROI` : "+375% ROI";
  const portfolioVal = kol.portfolioValue ?? "$890.0K";
  const portfolioNative = kol.portfolioNative ?? (kol.pnlBnb ? kol.pnlBnb.replace("+", "") : "110.0 BNB");
  const volumeVal = kol.totalVolume ?? "$19.80M";
  const followersText = kol.followers ? kol.followers.replace("$", "") : "395.0K followers";
  const addressText = kol.kolAddress.length > 12 
    ? `${kol.kolAddress.slice(0, 6)}...${kol.kolAddress.slice(-4)}` 
    : kol.kolAddress;

  // Mock holdings or derived holdings
  const holdingsList = kol.holdings || (kol.topHolding ? [
    {
      id: "top-holding",
      name: kol.topHolding.name,
      ticker: kol.topHolding.ticker,
      avatar: kol.topHolding.avatar,
      value: kol.topHolding.kolBag,
      amount: "14,200,000",
      avgEntry: "$0.0041",
      pnlPct: 142.5,
    }
  ] : []);

  // Mock trades if not provided
  const tradesList = kol.recentTrades || [
    {
      id: "t1",
      action: "BUY" as const,
      tokenTicker: "$MCAT",
      tokenName: "MoonCat",
      tokenAvatar: "🐱",
      txSize: "4.5 BNB ($2,840)",
      timeAgo: "12m ago",
      pnlPct: 42.8,
      txHash: "0x8fa3...419a",
    },
    {
      id: "t2",
      action: "BUY" as const,
      tokenTicker: "$KATE",
      tokenName: "Kate AI",
      tokenAvatar: "👑",
      txSize: "12.0 BNB ($7,580)",
      timeAgo: "2h ago",
      pnlPct: 88.4,
      txHash: "0x3bc1...99e1",
    },
    {
      id: "t3",
      action: "SELL" as const,
      tokenTicker: "$FOUR",
      tokenName: "FOUR",
      tokenAvatar: "4️⃣",
      txSize: "6.2 BNB ($3,920)",
      timeAgo: "5h ago",
      pnlPct: -14.2,
      txHash: "0x77d2...c82a",
    },
  ];

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(kol.kolAddress);
    showToast(`Copied ${kol.kolName} address to clipboard`);
  };

  const handleToggleFollow = () => {
    const next = !isFollowing;
    setIsFollowing(next);
    showToast(next ? `Now following ${kol.kolName}` : `Unfollowed ${kol.kolName}`);
  };

  const handleToggleAlerts = () => {
    const next = !isAlertsEnabled;
    setIsAlertsEnabled(next);
    showToast(next ? `Enabled instant smart alerts for ${kol.kolName}` : `Muted alerts for ${kol.kolName}`);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        
        {/* ── 1. TOP HEADER SECTION (MATCHES SCREENSHOT) ───── */}
        <div className={styles.headerTop}>
          <div className={styles.callerIdentityRow}>
            <div className={styles.avatarWrap}>
              <span>{kol.kolAvatar}</span>
              <span className={styles.onlineBadgeDot} title="Caller is actively trading" />
            </div>

            <div className={styles.callerMetaCol}>
              <div className={styles.nameTierRow}>
                <span className={styles.callerName}>{kol.kolName}</span>
                <span className={styles.tierPill}>{kol.tierBadge}</span>
              </div>

              <div className={styles.handleFollowersRow}>
                <span className={styles.handleText}>{kol.kolHandle}</span>
                <span className={styles.dotSep}>•</span>
                <span>{followersText}</span>
              </div>

              <div className={styles.addressSocialRow}>
                <button
                  type="button"
                  className={styles.addressPill}
                  onClick={handleCopyAddress}
                  title="Click to copy on-chain address"
                >
                  <span>{addressText}</span>
                  <Copy size={11} />
                </button>

                <a
                  href={`https://bscscan.com/address/${kol.kolAddress}`}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.socialIconBtn}
                  title="View on Explorer"
                >
                  <ExternalLink size={12} />
                </a>

                <a
                  href={`https://twitter.com/${kol.kolHandle.replace("@", "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.socialIconBtn}
                  title="View Twitter Profile"
                >
                  <svg width={11} height={11} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                <button
                  type="button"
                  className={styles.socialIconBtn}
                  onClick={() => showToast(`Opening Telegram channel for ${kol.kolName}`)}
                  title="Telegram Channel"
                >
                  <Send size={12} />
                </button>
              </div>
            </div>
          </div>

          {/* Top Right Action Buttons */}
          <div className={styles.headerTopActions}>
            <button
              type="button"
              className={`${styles.alertToggleBtn} ${isAlertsEnabled ? styles.alertToggleBtnActive : ""}`}
              onClick={handleToggleAlerts}
              title={isAlertsEnabled ? "Mute wallet alerts" : "Enable wallet alerts"}
            >
              {isAlertsEnabled ? <Bell size={14} /> : <BellOff size={14} />}
            </button>

            <button
              type="button"
              className={`${styles.followBtn} ${isFollowing ? styles.followBtnActive : ""}`}
              onClick={handleToggleFollow}
            >
              {isFollowing ? (
                <>
                  <UserCheck size={13} />
                  <span>Following</span>
                </>
              ) : (
                <>
                  <UserPlus size={13} />
                  <span>Follow</span>
                </>
              )}
            </button>

            <button
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              title="Close Drawer (Esc)"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* ── 2. PERFORMANCE HORIZON FILTER ────────────────── */}
        <div className={styles.horizonSection}>
          <span className={styles.horizonLabel}>Performance Horizon:</span>
          <div className={styles.horizonPillTrack}>
            {(["1D", "3D", "7D", "14D", "30D", "ALL"] as HorizonType[]).map((tf) => (
              <button
                key={tf}
                type="button"
                className={`${styles.horizonBtn} ${horizon === tf ? styles.horizonBtnActive : ""}`}
                onClick={() => setHorizon(tf)}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* ── 3. 4-METRIC CARDS GRID (EXACT REFERENCE) ─────── */}
        <div className={styles.statsGridSection}>
          {/* Card 1: PORTFOLIO VALUE */}
          <div className={styles.statCard}>
            <span className={styles.statCardHeader}>PORTFOLIO VALUE</span>
            <div className={styles.statCardValueRow}>
              <span className={styles.statCardValue}>{portfolioVal}</span>
            </div>
            <span className={styles.statCardSubtext}>{portfolioNative}</span>
          </div>

          {/* Card 2: WIN RATE */}
          <div className={styles.statCard}>
            <span className={styles.statCardHeader}>WIN RATE</span>
            <div className={styles.statCardValueRow}>
              <span className={`${styles.statCardValue} ${styles.statCardValueGain}`}>
                {winRateVal.toFixed(1)}% ↗
              </span>
            </div>
            <span className={styles.statCardSubtext}>
              {winsCount}W / {lossesCount}L
            </span>
          </div>

          {/* Card 3: REALIZED PNL */}
          <div className={styles.statCard}>
            <span className={styles.statCardHeader}>REALIZED PNL</span>
            <div className={styles.statCardValueRow}>
              <span className={`${styles.statCardValue} ${styles.statCardValueGain}`}>
                {pnlVal}
              </span>
            </div>
            <span className={`${styles.statCardSubtext} ${styles.statCardSubtextGain}`}>
              {pnlSubtext}
            </span>
          </div>

          {/* Card 4: TOTAL VOLUME */}
          <div className={styles.statCard}>
            <span className={styles.statCardHeader}>TOTAL VOLUME</span>
            <div className={styles.statCardValueRow}>
              <span className={styles.statCardValue}>{volumeVal}</span>
            </div>
            <span className={styles.statCardSubtext}>Avg: 5d 10h</span>
          </div>
        </div>

        {/* ── 4. SUB-TABS NAVIGATION ────────────────────────── */}
        <div className={styles.subTabsHeader}>
          <button
            type="button"
            className={`${styles.subTabBtn} ${activeTab === "holdings" ? styles.subTabBtnActive : ""}`}
            onClick={() => setActiveTab("holdings")}
          >
            <Coins size={13} />
            <span>Holdings ({holdingsList.length})</span>
          </button>

          <button
            type="button"
            className={`${styles.subTabBtn} ${activeTab === "trades" ? styles.subTabBtnActive : ""}`}
            onClick={() => setActiveTab("trades")}
          >
            <Layers size={13} />
            <span>DeFi Trades ({tradesList.length})</span>
          </button>

          <button
            type="button"
            className={`${styles.subTabBtn} ${activeTab === "tokenPnl" ? styles.subTabBtnActive : ""}`}
            onClick={() => setActiveTab("tokenPnl")}
          >
            <TrendingUp size={13} />
            <span>Token PnL</span>
          </button>

          <button
            type="button"
            className={`${styles.subTabBtn} ${activeTab === "calendar" ? styles.subTabBtnActive : ""}`}
            onClick={() => setActiveTab("calendar")}
          >
            <CalendarIcon size={13} />
            <span>PnL Calendar</span>
          </button>
        </div>

        {/* ── 5. SUB-TAB CONTENT PANELS ─────────────────────── */}
        <div className={styles.panelContent}>
          {/* TAB 1: HOLDINGS */}
          {activeTab === "holdings" && (
            <>
              {holdingsList.length === 0 ? (
                <div className={styles.emptyStateWrap}>
                  <div className={styles.emptyStateIconBox}>
                    <Coins size={22} />
                  </div>
                  <p className={styles.emptyStateTitle}>
                    No active token holdings in tracked wallet.
                  </p>
                </div>
              ) : (
                holdingsList.map((h) => (
                  <div key={h.id} className={styles.holdingCard}>
                    <div className={styles.holdingLeft}>
                      <div className={styles.holdingAvatar}>{h.avatar}</div>
                      <div className={styles.holdingMeta}>
                        <div className={styles.holdingNameRow}>
                          <span className={styles.holdingName}>{h.name}</span>
                          <span className={styles.holdingTicker}>{h.ticker}</span>
                        </div>
                        <span className={styles.holdingBag}>{h.value} • {h.amount} tokens</span>
                      </div>
                    </div>

                    <div className={styles.holdingRight}>
                      <span className={styles.tradeGainText}>+{h.pnlPct}% ↗</span>
                      <button
                        type="button"
                        className={styles.holdingSnipeBtn}
                        onClick={() => {
                          if (onOpenTerminal) onOpenTerminal(h);
                          else showToast(`Opening ${h.ticker} Terminal`);
                        }}
                      >
                        <Zap size={11} />
                        <span>Snipe</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {/* TAB 2: DEFI TRADES */}
          {activeTab === "trades" && (
            <>
              {tradesList.map((t) => (
                <div key={t.id} className={styles.tradeRow}>
                  <div className={styles.tradeLeft}>
                    <span className={t.action === "BUY" ? styles.tradeActionBuy : styles.tradeActionSell}>
                      {t.action}
                    </span>
                    <div className={styles.holdingAvatar}>{t.tokenAvatar}</div>
                    <div className={styles.tradeTokenCol}>
                      <span className={styles.tradeTokenTicker}>{t.tokenTicker}</span>
                      <span className={styles.tradeTime}>{t.timeAgo} • {t.tokenName}</span>
                    </div>
                  </div>

                  <div className={styles.tradeMidCol}>
                    <span className={styles.tradeSizeText}>{t.txSize}</span>
                    {t.pnlPct !== undefined && (
                      <span className={t.pnlPct >= 0 ? styles.tradeGainText : styles.tradeActionSell}>
                        {t.pnlPct >= 0 ? "+" : ""}{t.pnlPct}%
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    className={styles.holdingSnipeBtn}
                    onClick={() => {
                      if (onOpenTerminal) onOpenTerminal({ ticker: t.tokenTicker, name: t.tokenName, avatar: t.tokenAvatar });
                      else showToast(`Opening ${t.tokenTicker} Terminal`);
                    }}
                  >
                    <Zap size={11} />
                    <span>Snipe</span>
                  </button>
                </div>
              ))}
            </>
          )}

          {/* TAB 3: TOKEN PNL */}
          {activeTab === "tokenPnl" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { ticker: "$MCAT", name: "MoonCat", pnl: "+$740.5K", roi: "+680%", win: "100%", avatar: "🐱" },
                { ticker: "$KATE", name: "Kate AI", pnl: "+$490.2K", roi: "+410%", win: "100%", avatar: "👑" },
                { ticker: "$PEPEBOT", name: "PepeBot", pnl: "+$320.0K", roi: "+295%", win: "85%", avatar: "🤖" },
                { ticker: "$FOUR", name: "FOUR BNB", pnl: "+$185.4K", roi: "+180%", win: "75%", avatar: "4️⃣" },
              ].map((tp) => (
                <div key={tp.ticker} className={styles.holdingCard}>
                  <div className={styles.holdingLeft}>
                    <div className={styles.holdingAvatar}>{tp.avatar}</div>
                    <div className={styles.holdingMeta}>
                      <span className={styles.holdingName}>{tp.name} ({tp.ticker})</span>
                      <span className={styles.tradeTime}>Win Rate: {tp.win}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className={styles.tradeGainText}>{tp.pnl}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>{tp.roi} ROI</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: PNL CALENDAR */}
          {activeTab === "calendar" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", color: "var(--text-secondary)" }}>
                <span>Trading Activity (Last 28 Days)</span>
                <span style={{ color: "var(--emerald-500)", fontWeight: 700 }}>24 Green / 4 Red Days</span>
              </div>
              <div className={styles.calendarGrid}>
                {Array.from({ length: 28 }).map((_, i) => {
                  const isRed = i === 5 || i === 12 || i === 19 || i === 25;
                  const val = isRed ? `-$${(i * 1.4 + 2).toFixed(1)}K` : `+$${(i * 3.8 + 8).toFixed(1)}K`;
                  return (
                    <div
                      key={i}
                      className={`${styles.calendarCell} ${isRed ? styles.calendarCellRed : styles.calendarCellGreen}`}
                      title={`Day ${i + 1}: ${val}`}
                    >
                      <span style={{ fontSize: "9px", opacity: 0.7 }}>D{i + 1}</span>
                      <span style={{ fontWeight: 700 }}>{val}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Toast Feedback */}
        {toast && (
          <div
            style={{
              position: "fixed",
              bottom: "24px",
              right: "24px",
              background: "var(--bg-surface)",
              border: "1px solid var(--border-color-emphasis)",
              color: "var(--text-primary)",
              padding: "10px 18px",
              borderRadius: "var(--radius-md)",
              fontSize: "12px",
              fontWeight: 600,
              boxShadow: "var(--shadow-lg)",
              zIndex: 9999,
            }}
          >
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}
