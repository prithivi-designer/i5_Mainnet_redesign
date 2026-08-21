"use client";

import React, { useState, useEffect } from "react";
import {
  Zap,
  SlidersHorizontal,
  X,
  Lock,
  History,
  ExternalLink,
} from "lucide-react";
import styles from "./MemeTradingTerminal.module.css";

export interface TerminalToken {
  id: string;
  name: string;
  ticker: string;
  avatarImg?: string;
  avatarEmoji?: string;
  chain: "BNB" | "SOL" | "ETH";
  ageMinutes?: number;
  devHandle?: string;
  isVerified?: boolean;
  price: string;
  priceNum?: number;
  change24h?: number;
  marketCap: string;
  volume24h?: string;
  liquidity?: string;
  holders?: number;
  bondingPercent?: number;
  kolsHolding?: number;
  totalKolBag?: string;
  topTenPct?: string;
  i5Score?: number;
  status?: string;
}

interface MemeTradingTerminalProps {
  initialToken: TerminalToken;
  initialPayAmount?: string;
  allTokens?: TerminalToken[];
  onClose: () => void;
}

interface SwapHistoryItem {
  id: string;
  action: "BUY" | "SELL";
  amount: string;
  valueUsd: string;
  time: string;
  hash: string;
}

export default function MemeTradingTerminal({
  initialToken,
  initialPayAmount,
  onClose,
}: MemeTradingTerminalProps) {
  const [selectedToken, setSelectedToken] = useState<TerminalToken>(initialToken);
  const [swapMode, setSwapMode] = useState<"buy" | "sell">("buy");
  const [payAmount, setPayAmount] = useState<string>(
    initialPayAmount || (initialToken.chain === "SOL" ? "0.5" : "0.1")
  );
  const [thesisNote, setThesisNote] = useState<string>("");
  const [historyFilter, setHistoryFilter] = useState<"my" | "live">("my");
  const [showToast, setShowToast] = useState<string | null>(null);

  const [myTrades, setMyTrades] = useState<SwapHistoryItem[]>([
    {
      id: "my-1",
      action: "BUY",
      amount: "38,409",
      valueUsd: "$295.00",
      time: "2m ago",
      hash: "0x8fa3...419a",
    },
    {
      id: "my-2",
      action: "BUY",
      amount: "76,818",
      valueUsd: "$590.00",
      time: "1h ago",
      hash: "0x3bc1...99e1",
    },
  ]);

  const [allTrades] = useState<SwapHistoryItem[]>([
    {
      id: "live-1",
      action: "BUY",
      amount: "142,500",
      valueUsd: "$1,094.00",
      time: "Just now",
      hash: "0x4aa2...88f1",
    },
    {
      id: "live-2",
      action: "BUY",
      amount: "38,409",
      valueUsd: "$295.00",
      time: "2m ago",
      hash: "0x8fa3...419a",
    },
    {
      id: "live-3",
      action: "SELL",
      amount: "21,000",
      valueUsd: "$161.20",
      time: "5m ago",
      hash: "0x77d2...c82a",
    },
    {
      id: "live-4",
      action: "BUY",
      amount: "250,000",
      valueUsd: "$1,920.00",
      time: "12m ago",
      hash: "0x91e8...55c2",
    },
    {
      id: "live-5",
      action: "BUY",
      amount: "85,400",
      valueUsd: "$655.80",
      time: "18m ago",
      hash: "0x2e91...44bc",
    },
  ]);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 2500);
  };

  // Close on Escape & prevent background scroll
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

  if (!selectedToken) return null;

  const chainSymbol = selectedToken.chain === "SOL" ? "SOL" : "BNB";
  const numPay = parseFloat(payAmount || "0") || 0;
  const tokenTicker = selectedToken.ticker.startsWith("$") ? selectedToken.ticker : `$${selectedToken.ticker}`;

  // Estimate calculations
  const receiveEstimate = Math.round(numPay * 76818).toLocaleString();
  const usdApprox = (numPay * (selectedToken.chain === "SOL" ? 185 : 590)).toFixed(2);
  const routePool = selectedToken.chain === "SOL" ? "Raydium V4 Pool" : "PancakeSwap V3 Pool";

  const handleExecuteSwap = () => {
    const newTrade: SwapHistoryItem = {
      id: `my-${Date.now()}`,
      action: swapMode === "buy" ? "BUY" : "SELL",
      amount: receiveEstimate,
      valueUsd: `$${usdApprox}`,
      time: "Just now",
      hash: `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`,
    };
    setMyTrades((prev) => [newTrade, ...prev]);
    triggerToast(`Executed ${payAmount} ${chainSymbol} swap for ${tokenTicker} on ${routePool}`);
  };

  return (
    <div className={styles.terminalOverlay} onClick={onClose}>
      <div className={styles.swapCardModal} onClick={(e) => e.stopPropagation()}>
        
        {/* ════════════════════════════════════════════════════
           LEFT COLUMN: INSTANT SWAP (MATCHES SCREENSHOT)
           ════════════════════════════════════════════════════ */}
        <div className={styles.swapLeftCol}>
          {/* Header */}
          <div className={styles.swapHeader}>
            <div className={styles.swapTitleRow}>
              <Zap size={18} className={styles.swapZapIcon} />
              <span className={styles.swapTitleText}>Instant Swap</span>
            </div>

            <button
              type="button"
              className={styles.iconBtn}
              onClick={() => triggerToast("Opened Advanced Slippage & Gas Settings")}
              title="Swap Settings"
            >
              <SlidersHorizontal size={14} />
            </button>
          </div>

          {/* Buy / Sell Segmented Control */}
          <div className={styles.swapSegmentTabs}>
            <button
              type="button"
              className={`${styles.swapSegmentBtn} ${swapMode === "buy" ? styles.swapSegmentBtnActiveBuy : ""}`}
              onClick={() => setSwapMode("buy")}
            >
              Buy {tokenTicker}
            </button>
            <button
              type="button"
              className={`${styles.swapSegmentBtn} ${swapMode === "sell" ? styles.swapSegmentBtnActiveSell : ""}`}
              onClick={() => setSwapMode("sell")}
            >
              Sell Position
            </button>
          </div>

          {/* Pay With Box */}
          <div className={styles.swapInputBox}>
            <div className={styles.swapInputTop}>
              <span>Pay with</span>
              <span className={styles.swapBalanceText}>Balance: 14.85 {chainSymbol}</span>
            </div>

            <div className={styles.swapInputMain}>
              <input
                type="number"
                className={styles.swapAmountInput}
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                placeholder="0.0"
                step="any"
              />
              <span className={styles.swapCurrencyBadge}>{chainSymbol}</span>
            </div>

            <div className={styles.swapQuickPills}>
              {["0.1", "0.5", "1", "2", "MAX"].map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`${styles.swapQuickPill} ${payAmount === p ? styles.swapQuickPillActive : ""}`}
                  onClick={() => setPayAmount(p === "MAX" ? "14.85" : p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* You Receive Estimated Box */}
          <div className={styles.swapOutputBox}>
            <span className={styles.swapOutputLabel}>YOU RECEIVE (ESTIMATED)</span>
            <div className={styles.swapOutputValRow}>
              <span className={styles.swapOutputVal}>{receiveEstimate}</span>
              <span className={styles.swapOutputVal} style={{ fontSize: "16px", color: "var(--text-secondary)" }}>
                {tokenTicker}
              </span>
            </div>
            <span className={styles.swapOutputUsd}>≈ ${usdApprox}</span>
          </div>

          {/* Route & Execution Details */}
          <div className={styles.swapRouteDetails}>
            <div className={styles.routeRow}>
              <span>Token Price:</span>
              <span className={styles.routeRowVal}>{selectedToken.price}</span>
            </div>
            <div className={styles.routeRow}>
              <span>Est. Market Cap After:</span>
              <span className={styles.routeRowVal}>{selectedToken.marketCap}</span>
            </div>
            <div className={styles.routeRow}>
              <span>Price Impact:</span>
              <span className={`${styles.routeRowVal} ${styles.routeGainVal}`}>0.02%</span>
            </div>
            <div className={styles.routeRow}>
              <span>Platform Fee:</span>
              <span className={styles.routeRowVal}>0.5% (MemeLaunch)</span>
            </div>
            <div className={styles.routeRow}>
              <span>Route:</span>
              <span className={styles.routeRowVal}>{routePool}</span>
            </div>
          </div>

          {/* Optional Thesis Note */}
          <input
            type="text"
            className={styles.thesisInput}
            placeholder="Attach Thesis Note (Optional)..."
            value={thesisNote}
            onChange={(e) => setThesisNote(e.target.value)}
          />

          {/* Primary Quick Buy Button */}
          <button
            type="button"
            className={styles.instantBuyActionBtn}
            onClick={handleExecuteSwap}
          >
            <Zap size={16} />
            <span>
              {swapMode === "buy" ? "Quick Buy" : "Quick Sell"} {tokenTicker} ({payAmount} {chainSymbol})
            </span>
          </button>

          {/* MEV Protection Notice */}
          <div className={styles.mevProtectionNotice}>
            <Lock size={11} />
            <span>Encrypted · 0% MEV Frontrun Protection</span>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════
           RIGHT COLUMN: RECENT TRADE HISTORY (ON RIGHT SIDE)
           ════════════════════════════════════════════════════ */}
        <div className={styles.swapRightCol}>
          {/* Top Bar with Filter Tabs and Modal Close Button */}
          <div className={styles.historyTopBar}>
            <div className={styles.historyTitleWrap}>
              <History size={16} style={{ color: "var(--emerald-500)" }} />
              <span className={styles.historyTitleText}>Trade History</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div className={styles.historyFilterTabs}>
                <button
                  type="button"
                  className={`${styles.historyTabBtn} ${historyFilter === "my" ? styles.historyTabBtnActive : ""}`}
                  onClick={() => setHistoryFilter("my")}
                >
                  My Swaps ({myTrades.length})
                </button>
                <button
                  type="button"
                  className={`${styles.historyTabBtn} ${historyFilter === "live" ? styles.historyTabBtnActive : ""}`}
                  onClick={() => setHistoryFilter("live")}
                >
                  Live Pool ({allTrades.length})
                </button>
              </div>

              <button
                type="button"
                className={styles.iconBtn}
                onClick={onClose}
                title="Close Modal (Esc)"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Live Status Indicator Row */}
          <div className={styles.liveIndicatorRow}>
            <div className={styles.liveStreamBadge}>
              <span className={styles.liveDot} />
              <span>Real-time On-Chain Stream</span>
            </div>
            <span>{historyFilter === "my" ? "Wallet Activity" : `${selectedToken.chain} Dex Pool`}</span>
          </div>

          {/* List of Recent Trades */}
          <div className={styles.historyList}>
            {(historyFilter === "my" ? myTrades : allTrades).map((tx) => (
              <div key={tx.id} className={styles.historyRow}>
                <div className={styles.historyLeft}>
                  <span className={tx.action === "BUY" ? styles.actionBuyBadge : styles.actionSellBadge}>
                    {tx.action}
                  </span>
                  <div className={styles.historyTokenMeta}>
                    <span className={styles.historyAmountText}>
                      {tx.amount} {tokenTicker}
                    </span>
                    <span className={styles.historyTimeText}>{tx.time}</span>
                  </div>
                </div>

                <div className={styles.historyRight}>
                  <span className={styles.historyValueText}>{tx.valueUsd}</span>
                  <a
                    href="#"
                    className={styles.historyHashLink}
                    onClick={(e) => {
                      e.preventDefault();
                      triggerToast(`Viewing on-chain TX: ${tx.hash}`);
                    }}
                    title="View Transaction on Explorer"
                  >
                    <span>{tx.hash}</span>
                    <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── TOAST NOTIFICATION ─────────────────────────── */}
        {showToast && (
          <div
            style={{
              position: "fixed",
              bottom: "24px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "var(--neutral-900)",
              border: "1px solid var(--emerald-500)",
              color: "var(--emerald-400)",
              padding: "9px 18px",
              borderRadius: "8px",
              fontSize: "12px",
              fontWeight: 700,
              boxShadow: "0 8px 24px rgba(0,0,0,0.85)",
              whiteSpace: "nowrap",
              zIndex: 9999,
            }}
          >
            ✓ {showToast}
          </div>
        )}

      </div>
    </div>
  );
}
