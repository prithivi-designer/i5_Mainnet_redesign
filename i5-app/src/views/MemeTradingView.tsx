"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  ArrowLeft,
  Zap,
  Lock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  BarChart2,
  Activity,
  Users,
  ShieldCheck,
  Copy,
  Check,
  Info,
  Flame,
  Search,
  Settings,
  Share2,
  AlertTriangle,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Eye,
  Sliders,
  Camera,
  Maximize2,
  Shield,
  Crosshair,
  Radio,
  FileText,
  Compass,
} from "lucide-react";
import styles from "./MemeTradingView.module.css";

/* ═══════════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════════ */
export interface MemeToken {
  id: string;
  name: string;
  ticker: string;
  avatarEmoji?: string;
  avatarImg?: string;
  avatarBg?: string;
  chain: "SOL" | "BNB" | "ETH";
  price: string;
  priceNum: number;
  change24h: number;
  marketCap: string;
  liquidity: string;
  volume24h: string;
  totalFees?: string;
  totalSupply?: string;
  holders: number;
  bondingPercent: number;
  contractAddress: string;
  poolCreated?: string;
  devHandle?: string;
  funding?: string;
  kolsHolding?: number;
  i5Score?: number;
  noMint?: boolean;
  noBlacklist?: boolean;
  burnt?: boolean;
  rugScore?: number;
  top10Pct?: number;
}

interface TradeRow {
  id: string;
  ageStr: string;
  ageMs: number;
  side: "Buy" | "Sell";
  mc: string;
  amount: string;
  totalUSD: string;
  gas: string;
  trader: string;
  isDev?: boolean;
  tag?: string;
}

interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface MemeTradingViewProps {
  token: MemeToken;
  onBack: () => void;
}

/* ═══════════════════════════════════════════════════════════
   MOCK TRADE GENERATOR
═══════════════════════════════════════════════════════════ */
const TRADERS = [
  "FtZg...ULzn",
  "DAX9...1oZc",
  "3NWo...rA78",
  "J8cC...gY1V",
  "CUyr...4TQ8",
  "2QQY...6x5o",
  "DF4q...DV4T",
  "9bwH...skHC",
  "5mSM...9SZg",
  "G91G...44vW",
  "2N7E...ckD6",
  "2gnL...3vGY",
  "7S85...6hHF",
  "HKBG...Kqsy",
  "dseg...4BFn",
  "ssss...xe7d",
  "TWIN...3oms",
  "HodL...URvd",
  "PUMP...scDS",
  "E4Xe...3W9r",
];

const TRADER_TAGS = ["🚀 KOL", "💎 Smart", "🎯 Sniper", "🐋 Whale", "⚡ Fast", "🤖 Bot", ""];

function genInitialTrades(token: MemeToken, count = 25): TradeRow[] {
  const basePrice = token.priceNum;
  return Array.from({ length: count }, (_, i) => {
    const side = Math.random() > 0.42 ? "Buy" : "Sell";
    const mcMult = 0.88 + Math.random() * 0.25;
    const mc = basePrice * 1_000_000_000 * mcMult;
    const amt = (Math.random() * 8 + 0.1) * 1_250_000;
    const usd = amt * basePrice;
    const isDev = i === 4;
    return {
      id: `trade-init-${i}`,
      ageStr: i === 0 ? "0s" : `${i * 2 + Math.floor(Math.random() * 3)}s`,
      ageMs: i * 2000,
      side,
      mc: mc >= 1000 ? `$${(mc / 1000).toFixed(1)}K` : `$${mc.toFixed(0)}`,
      amount: amt >= 1_000_000 ? `${(amt / 1_000_000).toFixed(1)}M` : `${(amt / 1000).toFixed(0)}K`,
      totalUSD: usd >= 1000 ? `$${(usd / 1000).toFixed(2)}K` : `$${usd.toFixed(2)}`,
      gas: Math.random() < 0.6 ? "<$0.001" : `$${(Math.random() * 0.015).toFixed(3)}`,
      trader: TRADERS[i % TRADERS.length],
      isDev,
      tag: isDev ? "DEV" : TRADER_TAGS[i % TRADER_TAGS.length],
    };
  });
}

/* ═══════════════════════════════════════════════════════════
   CANDLE GENERATOR
═══════════════════════════════════════════════════════════ */
function genCandles(basePrice: number, count = 65): Candle[] {
  const candles: Candle[] = [];
  let currentPrice = basePrice * 0.52;

  for (let i = 0; i < count; i++) {
    const isUp = Math.random() > 0.44;
    const volatility = currentPrice * (0.02 + Math.random() * 0.04);
    const open = currentPrice;
    const change = isUp ? Math.random() * volatility : -Math.random() * volatility;
    let close = Math.max(basePrice * 0.2, open + change);
    if (i === count - 1) {
      close = basePrice; // Pin last candle to exact current price
    }
    const high = Math.max(open, close) + Math.random() * volatility * 0.6;
    const low = Math.min(open, close) - Math.random() * volatility * 0.6;
    const volume = Math.random() * 18000 + 1200;

    candles.push({
      time: `${i}m`,
      open,
      high,
      low,
      close,
      volume,
    });
    currentPrice = close;
  }
  return candles;
}

/* ═══════════════════════════════════════════════════════════
   HIGH-FIDELITY CANDLESTICK CHART COMPONENT
═══════════════════════════════════════════════════════════ */
function CandlestickChart({
  token,
  candles,
  hoverCandle,
  setHoverCandle,
}: {
  token: MemeToken;
  candles: Candle[];
  hoverCandle: Candle | null;
  setHoverCandle: (c: Candle | null) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    if (W === 0 || H === 0 || candles.length === 0) return;

    // Background: true dark theme
    ctx.fillStyle = "#070b09";
    ctx.fillRect(0, 0, W, H);

    // Chart margins
    const rightMargin = 72; // price axis
    const bottomMargin = 22; // time axis
    const topMargin = 28;
    const chartW = W - rightMargin;
    const chartH = H - bottomMargin - topMargin;
    const volAreaH = Math.min(60, chartH * 0.22);
    const priceAreaH = chartH - volAreaH - 12;

    // Price extents
    let minPrice = Infinity;
    let maxPrice = -Infinity;
    let maxVol = 0;

    candles.forEach((c) => {
      if (c.low < minPrice) minPrice = c.low;
      if (c.high > maxPrice) maxPrice = c.high;
      if (c.volume > maxVol) maxVol = c.volume;
    });

    const pricePadding = (maxPrice - minPrice) * 0.08 || minPrice * 0.05;
    const pMin = Math.max(0, minPrice - pricePadding);
    const pMax = maxPrice + pricePadding;

    const getY = (val: number) => topMargin + priceAreaH - ((val - pMin) / (pMax - pMin)) * priceAreaH;
    const getVolY = (vol: number) => topMargin + priceAreaH + 12 + volAreaH - (vol / (maxVol || 1)) * volAreaH;

    // 1. Grid lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    ctx.lineWidth = 1;

    // Horizontal price grid
    const priceSteps = 6;
    for (let i = 0; i <= priceSteps; i++) {
      const y = topMargin + (priceAreaH / priceSteps) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(chartW, y);
      ctx.stroke();

      // Price labels on right axis
      const stepVal = pMax - ((pMax - pMin) / priceSteps) * i;
      ctx.fillStyle = "rgba(228, 228, 228, 0.4)";
      ctx.font = "9px monospace";
      ctx.textAlign = "left";
      const lbl =
        stepVal >= 1000
          ? `$${(stepVal / 1000).toFixed(2)}K`
          : stepVal >= 1
          ? `$${stepVal.toFixed(4)}`
          : stepVal >= 0.0001
          ? `$${stepVal.toFixed(6)}`
          : `$${stepVal.toExponential(2)}`;
      ctx.fillText(lbl, chartW + 8, y + 3);
    }

    // Vertical time grid
    const timeSteps = 8;
    for (let j = 0; j <= timeSteps; j++) {
      const x = (chartW / timeSteps) * j;
      ctx.beginPath();
      ctx.moveTo(x, topMargin);
      ctx.lineTo(x, H - bottomMargin);
      ctx.stroke();
    }

    // ATH line
    const athY = getY(maxPrice);
    ctx.save();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, athY);
    ctx.lineTo(chartW, athY);
    ctx.stroke();
    ctx.fillStyle = "#f59e0b";
    ctx.font = "9px monospace";
    ctx.textAlign = "left";
    ctx.fillText("All Time High", 10, athY - 4);
    ctx.restore();

    // Daumen target line
    const daumenY = getY(token.priceNum * 0.92);
    ctx.save();
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = "rgba(56, 189, 248, 0.6)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, daumenY);
    ctx.lineTo(chartW, daumenY);
    ctx.stroke();
    ctx.fillStyle = "rgba(56, 189, 248, 0.8)";
    ctx.font = "9px monospace";
    ctx.fillText("Daumen 1.16%", 10, daumenY - 4);
    ctx.restore();

    // 2. Volume Bars
    const candleCount = candles.length;
    const candleSlotW = chartW / candleCount;
    const candleBodyW = Math.max(2, candleSlotW * 0.72);

    candles.forEach((c, idx) => {
      const x = idx * candleSlotW + candleSlotW / 2;
      const isGreen = c.close >= c.open;
      const volTop = getVolY(c.volume);
      const volBase = topMargin + priceAreaH + 12 + volAreaH;

      ctx.fillStyle = isGreen ? "rgba(47, 203, 115, 0.28)" : "rgba(225, 59, 59, 0.28)";
      ctx.fillRect(x - candleBodyW / 2, volTop, candleBodyW, volBase - volTop);
    });

    // 3. Candlesticks
    candles.forEach((c, idx) => {
      const x = idx * candleSlotW + candleSlotW / 2;
      const isGreen = c.close >= c.open;
      const color = isGreen ? "#2fcb73" : "#e13b3b";

      const yHigh = getY(c.high);
      const yLow = getY(c.low);
      const yOpen = getY(c.open);
      const yClose = getY(c.close);

      const bodyTop = Math.min(yOpen, yClose);
      const bodyHeight = Math.max(1.5, Math.abs(yClose - yOpen));

      // Wick
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, yHigh);
      ctx.lineTo(x, yLow);
      ctx.stroke();

      // Body
      ctx.fillStyle = color;
      ctx.fillRect(x - candleBodyW / 2, bodyTop, candleBodyW, bodyHeight);
    });

    // 4. Current Price Line
    const curY = getY(token.priceNum);
    ctx.save();
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = "#2fcb73";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, curY);
    ctx.lineTo(chartW, curY);
    ctx.stroke();
    ctx.restore();

    // Current price badge on axis
    ctx.fillStyle = "#2fcb73";
    ctx.fillRect(chartW + 2, curY - 9, 66, 18);
    ctx.fillStyle = "#000";
    ctx.font = "bold 9px monospace";
    ctx.textAlign = "center";
    ctx.fillText(token.price, chartW + 35, curY + 3.5);

    // Current price pulse dot
    ctx.fillStyle = "#2fcb73";
    ctx.shadowColor = "rgba(47, 203, 115, 0.8)";
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(chartW, curY, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // 5. Crosshair (if mouse hovered)
    if (mousePos && mousePos.x <= chartW && mousePos.y <= topMargin + priceAreaH + volAreaH + 12) {
      ctx.save();
      ctx.setLineDash([2, 2]);
      ctx.strokeStyle = "rgba(228, 228, 228, 0.35)";
      ctx.lineWidth = 1;

      // Vertical crosshair
      ctx.beginPath();
      ctx.moveTo(mousePos.x, topMargin);
      ctx.lineTo(mousePos.x, H - bottomMargin);
      ctx.stroke();

      // Horizontal crosshair
      ctx.beginPath();
      ctx.moveTo(0, mousePos.y);
      ctx.lineTo(chartW, mousePos.y);
      ctx.stroke();

      // Y value box
      const crossPrice = pMax - ((mousePos.y - topMargin) / priceAreaH) * (pMax - pMin);
      if (mousePos.y <= topMargin + priceAreaH) {
        ctx.fillStyle = "#1e293b";
        ctx.fillRect(chartW + 2, mousePos.y - 8, 66, 16);
        ctx.fillStyle = "#e4e4e4";
        ctx.font = "9px monospace";
        ctx.textAlign = "center";
        const cPriceStr =
          crossPrice >= 1
            ? `$${crossPrice.toFixed(4)}`
            : crossPrice >= 0.0001
            ? `$${crossPrice.toFixed(6)}`
            : `$${crossPrice.toExponential(2)}`;
        ctx.fillText(cPriceStr, chartW + 35, mousePos.y + 3);
      }
      ctx.restore();
    }
  }, [candles, mousePos, token.price, token.priceNum]);

  // Resize handler
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      draw();
    });
    ro.observe(canvas.parentElement!);
    return () => ro.disconnect();
  }, [draw]);

  useEffect(() => {
    draw();
  }, [draw]);

  // Mouse move handler for crosshair & OHLC hover
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const rightMargin = 72;
    const chartW = canvas.width - rightMargin;
    if (x >= 0 && x <= chartW && candles.length > 0) {
      const candleSlotW = chartW / candles.length;
      const idx = Math.min(candles.length - 1, Math.max(0, Math.floor(x / candleSlotW)));
      setHoverCandle(candles[idx]);
    }
  };

  const handleMouseLeave = () => {
    setMousePos(null);
    setHoverCandle(null);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: "block", width: "100%", height: "100%", cursor: "crosshair" }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN MEME TRADING VIEW
═══════════════════════════════════════════════════════════ */
export default function MemeTradingView({ token, onBack }: MemeTradingViewProps) {
  /* ── Order state ── */
  const [orderSide, setOrderSide] = useState<"buy" | "sell" | "auto">("buy");
  const [orderType, setOrderType] = useState<"market" | "limit" | "dca" | "adv">("market");
  const [preset, setPreset] = useState<"P1" | "P2" | "P3">("P1");
  const [amount, setAmount] = useState("0.5");
  const [activeQuick, setActiveQuick] = useState<string | null>("0.5");
  const [currencyMode, setCurrencyMode] = useState<"SOL" | "USD">("SOL");
  const [antiMev, setAntiMev] = useState(true);

  /* ── Bottom feed tabs & filters ── */
  const [feedTab, setFeedTab] = useState<"Trades" | "Positions" | "Orders" | "Holders" | "Top Traders" | "Dev Token">("Trades");
  const [feedFilter, setFeedFilter] = useState("All");
  const [trades, setTrades] = useState<TradeRow[]>(() => genInitialTrades(token));
  const [flashId, setFlashId] = useState<string | null>(null);

  /* ── Timeframe & chart state ── */
  const [tf, setTf] = useState("1m");
  const [priceOrMc, setPriceOrMc] = useState<"Price" | "MC">("Price");
  const [candles, setCandles] = useState<Candle[]>(() => genCandles(token.priceNum, 65));
  const [hoverCandle, setHoverCandle] = useState<Candle | null>(null);

  /* ── Community thesis state ── */
  const [thesisText, setThesisText] = useState("");
  const [thesisList, setThesisList] = useState<Array<{ user: string; text: string; time: string }>>([
    {
      user: "HazelBuddedTick",
      text: "Liquidity locked for 6 months. Dev holding 0%, whale accumulation confirmed on-chain.",
      time: "2m ago",
    },
  ]);

  /* ── Right panel accordions ── */
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    poolInfo: true,
    devInfo: true,
    basicData: true,
    tokenAudit: true,
    avatarReused: false,
    sameName: false,
  });

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  /* ── Feedback toast & clipboard ── */
  const [toast, setToast] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleCopy = (text: string, label = "Address") => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast(`${label} copied to clipboard`);
  };

  /* ── Live trades injector ── */
  useEffect(() => {
    const interval = setInterval(() => {
      const isBuy = Math.random() > 0.44;
      const basePrice = token.priceNum;
      const mult = 0.9 + Math.random() * 0.22;
      const mc = basePrice * 1_000_000_000 * mult;
      const amt = (Math.random() * 6 + 0.2) * 1_100_000;
      const usd = amt * basePrice;
      const id = `trade-live-${Date.now()}`;

      setFlashId(id);
      setTrades((prev) => [
        {
          id,
          ageStr: "0s",
          ageMs: 0,
          side: isBuy ? "Buy" : "Sell",
          mc: mc >= 1000 ? `$${(mc / 1000).toFixed(1)}K` : `$${mc.toFixed(0)}`,
          amount: amt >= 1_000_000 ? `${(amt / 1_000_000).toFixed(1)}M` : `${(amt / 1000).toFixed(0)}K`,
          totalUSD: usd >= 1000 ? `$${(usd / 1000).toFixed(2)}K` : `$${usd.toFixed(2)}`,
          gas: "<$0.001",
          trader: TRADERS[Math.floor(Math.random() * TRADERS.length)],
          isDev: false,
          tag: TRADER_TAGS[Math.floor(Math.random() * TRADER_TAGS.length)],
        },
        ...prev.slice(0, 39),
      ]);
      setTimeout(() => setFlashId(null), 700);
    }, 2400);

    return () => clearInterval(interval);
  }, [token]);

  /* ── Timeframe change regenerates candles ── */
  useEffect(() => {
    setCandles(genCandles(token.priceNum, 65));
  }, [tf, token.priceNum]);

  /* Calculations */
  const numAmount = parseFloat(amount) || 0;
  const chainSymbol = token.chain;
  const chainPriceSol = token.chain === "SOL" ? 185 : token.chain === "BNB" ? 590 : 2900;
  const receiveEst = Math.round((numAmount * chainPriceSol) / token.priceNum).toLocaleString();
  const usdApprox = (numAmount * chainPriceSol).toFixed(2);

  const handleExecute = () => {
    showToast(
      `✓ Successfully executed ${orderSide.toUpperCase()} of ${numAmount} ${chainSymbol} for ${token.ticker}`
    );
  };

  const handlePostThesis = () => {
    if (!thesisText.trim()) return;
    setThesisList([
      { user: "HazelBuddedTick", text: thesisText.trim(), time: "Just now" },
      ...thesisList,
    ]);
    setThesisText("");
    showToast("✓ Thesis update broadcasted to network");
  };

  const FEED_FILTERS = [
    "All",
    "KOL 1",
    "Tracking",
    "Renames",
    "DEV 1",
    "Smart",
    "FOMO",
    "Whale",
    "Fresh 30",
    "Snipers",
    "Top 24",
    "Insiders",
    "Bot Degens",
    "Bundler 65",
  ];

  // Active OHLC to display
  const displayCandle = hoverCandle || candles[candles.length - 1];

  return (
    <div className={styles.page}>
      {/* ═════════════════════════════════════════════════════════
          HEADER: GMGN-Style Comprehensive Top Navigation Bar
      ═════════════════════════════════════════════════════════ */}
      <header className={styles.header}>
        {/* Left: Back + Token Identity */}
        <div className={styles.headerLeft}>
          <button className={styles.backBtn} onClick={onBack} title="Return to Memes list">
            <ArrowLeft size={13} />
            <span>Back</span>
          </button>

          <div className={styles.tokenBrand}>
            <div className={styles.tokenAvatar} style={{ background: token.avatarBg || "#141414" }}>
              {token.avatarImg ? (
                <img
                  src={token.avatarImg}
                  alt={token.name}
                  className={styles.tokenAvatarImg}
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              ) : (
                <span>{token.avatarEmoji || token.ticker[0]}</span>
              )}
              <span className={styles.avatarChainBadge}>{token.chain}</span>
            </div>

            <div className={styles.tokenMeta}>
              <div className={styles.tokenTitleRow}>
                <span className={styles.tokenName}>{token.name}</span>
                <span className={styles.tokenTicker}>{token.ticker}</span>

                {/* Contract address copy pill */}
                <button
                  className={styles.contractAddressBtn}
                  onClick={() => handleCopy(token.contractAddress, "Token address")}
                  title="Copy token contract address"
                >
                  <span>{token.contractAddress.slice(0, 4)}...{token.contractAddress.slice(-4)}</span>
                  {copied ? <Check size={10} color="#2fcb73" /> : <Copy size={10} />}
                </button>

                <button
                  className={styles.iconActionBtn}
                  onClick={() => handleCopy(window.location.href, "Share link")}
                  title="Share token"
                >
                  <Share2 size={12} />
                </button>
              </div>

              {/* Protocol links */}
              <div className={styles.tokenSubLinks}>
                <span className={styles.ageBadge}>30s</span>
                <span className={styles.subLink}>Pump.fun</span>
                <span className={styles.subLinkDot}>•</span>
                <span className={styles.subLink}>Solscan</span>
                <span className={styles.subLinkDot}>•</span>
                <span className={styles.subLink}>Birdeye</span>
                <span className={styles.subLinkDot}>•</span>
                <span className={styles.subLink}>DexScreener</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Major Key Stats */}
        <div className={styles.headerCenter}>
          <div className={styles.bigMcapGroup}>
            <span className={styles.mcapLabel}>MARKET CAP</span>
            <span className={styles.mcapValue}>{token.marketCap}</span>
          </div>

          <div className={styles.headerStatDivider} />

          <div className={styles.statItem}>
            <span className={styles.statLabel}>Price</span>
            <span className={styles.statValueMono}>{token.price}</span>
          </div>

          <div className={styles.statItem}>
            <span className={styles.statLabel}>Liquidity</span>
            <span className={styles.statValueMono}>{token.liquidity}</span>
          </div>

          <div className={styles.statItem}>
            <span className={styles.statLabel}>24h Vol</span>
            <span className={styles.statValueMono}>{token.volume24h}</span>
          </div>

          <div className={styles.statItem}>
            <span className={styles.statLabel}>Total Fees</span>
            <span className={styles.statValueMono}>{token.totalFees || "0.3 SOL"}</span>
          </div>

          <div className={styles.statItem}>
            <span className={styles.statLabel}>Total Supply</span>
            <span className={styles.statValueMono}>{token.totalSupply || "1B"}</span>
          </div>
        </div>

        {/* Right: GMGN-style Multi-Timeframe Gain Badges & Flow Metrics */}
        <div className={styles.headerRight}>
          <div className={styles.tfChipsRow}>
            {[
              { label: "1m", change: "+210.4%" },
              { label: "5m", change: "+210.4%" },
              { label: "1h", change: "+210.4%" },
              { label: "24h", change: `+${token.change24h.toFixed(1)}%` },
            ].map((chip) => (
              <div key={chip.label} className={styles.tfChip}>
                <span className={styles.tfChipLabel}>{chip.label}</span>
                <span className={styles.tfChipVal}>{chip.change}</span>
              </div>
            ))}
          </div>

          <div className={styles.flowSummaryBar}>
            <div className={styles.flowItem}>
              <span className={styles.flowLabel}>Vol</span>
              <span className={styles.flowVal}>{token.volume24h}</span>
            </div>
            <div className={styles.flowItem}>
              <span className={styles.flowLabel}>Buys</span>
              <span className={styles.flowValGreen}>128 / $9K</span>
            </div>
            <div className={styles.flowItem}>
              <span className={styles.flowLabel}>Sells</span>
              <span className={styles.flowValRed}>56 / $6K</span>
            </div>
            <div className={styles.flowItem}>
              <span className={styles.flowLabel}>Net Buy</span>
              <span className={styles.flowValGreen}>+$3K</span>
            </div>
          </div>
        </div>
      </header>

      {/* ═════════════════════════════════════════════════════════
          BODY: Split View (Chart & Trades Left | Terminal Right)
      ═════════════════════════════════════════════════════════ */}
      <div className={styles.body}>
        {/* ── LEFT COLUMN ── */}
        <div className={styles.leftCol}>
          {/* Chart Controls Toolbar */}
          <div className={styles.chartToolbar}>
            {/* Timeframe selector */}
            <div className={styles.chartTimeframes}>
              {["1s", "30s", "1m", "1h", "4h", "1D"].map((t) => (
                <button
                  key={t}
                  className={`${styles.chartTfBtn} ${tf === t ? styles.chartTfBtnActive : ""}`}
                  onClick={() => setTf(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className={styles.toolbarDivider} />

            {/* Price vs MC toggle */}
            <div className={styles.chartToggleGroup}>
              <button
                className={`${styles.togglePill} ${priceOrMc === "Price" ? styles.togglePillActive : ""}`}
                onClick={() => setPriceOrMc("Price")}
              >
                Price
              </button>
              <button
                className={`${styles.togglePill} ${priceOrMc === "MC" ? styles.togglePillActive : ""}`}
                onClick={() => setPriceOrMc("MC")}
              >
                MC
              </button>
            </div>

            <div className={styles.toolbarDivider} />

            {/* OHLC Bar */}
            {displayCandle && (
              <div className={styles.ohlcBar}>
                <span className={styles.ohlcItem}>
                  <span className={styles.ohlcLabel}>O</span>
                  <span className={styles.ohlcVal}>
                    ${displayCandle.open >= 1 ? displayCandle.open.toFixed(4) : displayCandle.open.toFixed(6)}
                  </span>
                </span>
                <span className={styles.ohlcItem}>
                  <span className={styles.ohlcLabel}>H</span>
                  <span className={styles.ohlcVal}>
                    ${displayCandle.high >= 1 ? displayCandle.high.toFixed(4) : displayCandle.high.toFixed(6)}
                  </span>
                </span>
                <span className={styles.ohlcItem}>
                  <span className={styles.ohlcLabel}>L</span>
                  <span className={styles.ohlcVal}>
                    ${displayCandle.low >= 1 ? displayCandle.low.toFixed(4) : displayCandle.low.toFixed(6)}
                  </span>
                </span>
                <span className={styles.ohlcItem}>
                  <span className={styles.ohlcLabel}>C</span>
                  <span className={displayCandle.close >= displayCandle.open ? styles.ohlcValGreen : styles.ohlcValRed}>
                    ${displayCandle.close >= 1 ? displayCandle.close.toFixed(4) : displayCandle.close.toFixed(6)}
                  </span>
                </span>
                <span className={styles.ohlcItem}>
                  <span className={styles.ohlcLabel}>Vol</span>
                  <span className={styles.ohlcVal}>${(displayCandle.volume / 1000).toFixed(1)}K</span>
                </span>
              </div>
            )}

            <div className={styles.toolbarSpacer} />

            {/* Utility icons */}
            <div className={styles.chartToolIcons}>
              <button className={styles.toolIconBtn} title="Camera screenshot">
                <Camera size={13} />
              </button>
              <button className={styles.toolIconBtn} title="Chart Settings">
                <Settings size={13} />
              </button>
              <button className={styles.toolIconBtn} title="Expand Fullscreen">
                <Maximize2 size={13} />
              </button>
            </div>
          </div>

          {/* Interactive Candlestick Chart Area */}
          <div className={styles.chartArea}>
            <div className={styles.chartWatermark}>
              <span>i5 TRADING TERMINAL</span>
            </div>
            <CandlestickChart
              token={token}
              candles={candles}
              hoverCandle={hoverCandle}
              setHoverCandle={setHoverCandle}
            />
          </div>

          {/* ═════════════════════════════════════════════════════
              TRADES & ACTIVITY PANEL (Bottom Left)
          ═════════════════════════════════════════════════════ */}
          <div className={styles.feedPanel}>
            {/* Tab header */}
            <div className={styles.feedTabsHeader}>
              <div className={styles.feedTabsList}>
                {(
                  [
                    "Trades",
                    "Positions",
                    "Orders",
                    "Holders",
                    "Top Traders",
                    "Dev Token",
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab}
                    className={`${styles.feedTabBtn} ${feedTab === tab ? styles.feedTabBtnActive : ""}`}
                    onClick={() => setFeedTab(tab)}
                  >
                    {tab}
                    {tab === "Trades" && <span className={styles.tabCountBadge}>482</span>}
                    {tab === "Holders" && <span className={styles.tabCountBadge}>{token.holders}</span>}
                  </button>
                ))}
              </div>

              <div className={styles.feedHeaderActions}>
                <button
                  className={styles.instantTradeBtn}
                  onClick={() => showToast("⚡ Instant Sniper Active")}
                >
                  <Zap size={11} />
                  <span>Instant trade</span>
                </button>
                <button
                  className={styles.calloutBtn}
                  onClick={() => {
                    const el = document.getElementById("thesis-input-box");
                    el?.focus();
                    showToast("Jump to Community Thesis update");
                  }}
                >
                  <MessageSquare size={11} />
                  <span>Callout</span>
                </button>
              </div>
            </div>

            {/* Filter pills bar */}
            <div className={styles.filterPillsRow}>
              {FEED_FILTERS.map((f) => (
                <button
                  key={f}
                  className={`${styles.filterPill} ${feedFilter === f ? styles.filterPillActive : ""}`}
                  onClick={() => setFeedFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Trades Table */}
            <div className={styles.feedTableWrap}>
              <table className={styles.feedTable}>
                <thead>
                  <tr>
                    <th className={styles.thCol}>Age</th>
                    <th className={styles.thCol}>Type</th>
                    <th className={styles.thCol}>MC</th>
                    <th className={styles.thCol}>Amount</th>
                    <th className={styles.thCol}>Total USD</th>
                    <th className={styles.thCol}>Gas</th>
                    <th className={styles.thCol}>Trader</th>
                    <th className={styles.thCol}>Tag</th>
                  </tr>
                </thead>
                <tbody>
                  {trades.map((row) => (
                    <tr
                      key={row.id}
                      className={`${styles.feedTr} ${row.id === flashId ? styles.feedTrFlash : ""}`}
                    >
                      <td className={`${styles.tdCol} ${styles.tdAge}`}>{row.ageStr}</td>
                      <td
                        className={`${styles.tdCol} ${
                          row.side === "Buy" ? styles.sideBuy : styles.sideSell
                        }`}
                      >
                        {row.side}
                      </td>
                      <td className={`${styles.tdCol} ${styles.tdMono}`}>{row.mc}</td>
                      <td className={`${styles.tdCol} ${styles.tdMono}`}>{row.amount}</td>
                      <td
                        className={`${styles.tdCol} ${
                          row.side === "Buy" ? styles.amountBuy : styles.amountSell
                        }`}
                      >
                        {row.totalUSD}
                      </td>
                      <td className={`${styles.tdCol} ${styles.tdGas}`}>{row.gas}</td>
                      <td className={styles.tdCol}>
                        <span className={styles.traderLink}>
                          {row.trader}
                          <button
                            className={styles.inlineCopyBtn}
                            onClick={() => handleCopy(row.trader, "Trader address")}
                          >
                            <Copy size={9} />
                          </button>
                        </span>
                      </td>
                      <td className={styles.tdCol}>
                        {row.isDev ? (
                          <span className={styles.devTradeBadge}>DEV</span>
                        ) : row.tag ? (
                          <span className={styles.tagBadge}>{row.tag}</span>
                        ) : (
                          <span className={styles.tagEmpty}>—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: Complete GMGN-Style Execution Terminal ── */}
        <div className={styles.rightCol}>
          {/* Connection status bar */}
          <div className={styles.connectionStatusBar}>
            <div className={styles.connectionNode}>
              <span className={styles.greenDot} />
              <span>Connection 2</span>
              <span className={styles.pingTime}>28ms</span>
            </div>
            <div className={styles.presetGroup}>
              {(["P1", "P2", "P3"] as const).map((p) => (
                <button
                  key={p}
                  className={`${styles.presetBtn} ${preset === p ? styles.presetBtnActive : ""}`}
                  onClick={() => setPreset(p)}
                >
                  {p}
                </button>
              ))}
              <div className={styles.walletPicker}>
                <span>💼 1</span>
                <span className={styles.walletBal}>14.85 SOL</span>
              </div>
              <button className={styles.settingsIconBtn} title="RPC & Snipe settings">
                <Settings size={12} />
              </button>
            </div>
          </div>

          {/* Action switcher: Buy | Sell | Auto */}
          <div className={styles.actionTabGroup}>
            <button
              className={`${styles.actionTab} ${orderSide === "buy" ? styles.actionTabBuyActive : ""}`}
              onClick={() => setOrderSide("buy")}
            >
              Buy
            </button>
            <button
              className={`${styles.actionTab} ${orderSide === "sell" ? styles.actionTabSellActive : ""}`}
              onClick={() => setOrderSide("sell")}
            >
              Sell
            </button>
            <button
              className={`${styles.actionTab} ${orderSide === "auto" ? styles.actionTabAutoActive : ""}`}
              onClick={() => setOrderSide("auto")}
            >
              Auto
            </button>
          </div>

          {/* Order sub-tabs: Market | Limit | DCA | Adv. */}
          <div className={styles.orderTypeTabs}>
            {(["market", "limit", "dca", "adv"] as const).map((t) => (
              <button
                key={t}
                className={`${styles.orderTypeBtn} ${orderType === t ? styles.orderTypeBtnActive : ""}`}
                onClick={() => setOrderType(t)}
              >
                {t === "adv" ? "Adv." : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
            <div className={styles.orderTypeBalance}>
              <span>0 SOL</span>
            </div>
          </div>

          {/* Amount input & presets */}
          <div className={styles.orderCard}>
            <div className={styles.amountInputWrap}>
              <div className={styles.amountLabelRow}>
                <span className={styles.amountFieldLabel}>Amount</span>
                <span className={styles.amountFieldCurrency}>SOL</span>
              </div>
              <input
                type="number"
                className={styles.amountInputMain}
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setActiveQuick(null);
                }}
                placeholder="0.0"
                step="any"
              />
            </div>

            {/* Quick amount chips */}
            <div className={styles.quickAmountPills}>
              {["0.01", "0.1", "0.5", "1"].map((q) => (
                <button
                  key={q}
                  className={`${styles.quickPillBtn} ${activeQuick === q ? styles.quickPillBtnActive : ""}`}
                  onClick={() => {
                    setAmount(q);
                    setActiveQuick(q);
                  }}
                >
                  {q}
                </button>
              ))}
              <button
                className={styles.quickPillBtn}
                onClick={() => {
                  setAmount("14.85");
                  setActiveQuick("MAX");
                }}
              >
                MAX
              </button>
            </div>

            {/* Market cap ratio */}
            <div className={styles.ratioNotice}>
              <span>1 SOL ≈ 9.3M mcap</span>
            </div>

            {/* Advanced Trading Strategy Checkbox */}
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={antiMev}
                onChange={(e) => setAntiMev(e.target.checked)}
                className={styles.customCheckbox}
              />
              <span>Advanced Trading Strategy (Anti-MEV Frontrun)</span>
            </label>

            {/* Big Action Button */}
            <button
              className={`${styles.executeBtn} ${
                orderSide === "sell" ? styles.executeBtnSell : styles.executeBtnBuy
              }`}
              onClick={handleExecute}
            >
              <Zap size={14} />
              <span>
                {orderSide === "buy" ? "Buy" : orderSide === "sell" ? "Sell" : "Auto Trade"}{" "}
                {token.ticker}
              </span>
            </button>

            {/* Quick execution settings bar */}
            <div className={styles.bottomSettingsBar}>
              <span className={styles.settingTag}>Auto ▾</span>
              <span className={styles.settingTag}>⚡ 0.000123</span>
              <span className={styles.settingTag}>🛡️ &lt;0.01</span>
              <span className={styles.settingTagRed}>Red.</span>
            </div>
          </div>

          {/* ═════════════════════════════════════════════════════
              COMMUNITY CALLOUT / THESIS BOX
          ═════════════════════════════════════════════════════ */}
          <div className={styles.thesisCard}>
            <div className={styles.thesisHeader}>
              <div className={styles.thesisUserAvatar}>🌰</div>
              <span className={styles.thesisUserName}>HazelBuddedTick</span>
            </div>

            <textarea
              id="thesis-input-box"
              className={styles.thesisTextarea}
              placeholder="Add an update to your thesis..."
              value={thesisText}
              onChange={(e) => setThesisText(e.target.value)}
              rows={2}
              maxLength={3000}
            />

            <div className={styles.thesisFooter}>
              <span className={styles.charCount}>{thesisText.length}/3000</span>
              <button className={styles.postThesisBtn} onClick={handlePostThesis}>
                Callout
              </button>
            </div>

            {/* Prior thesis notes */}
            {thesisList.length > 0 && (
              <div className={styles.thesisUpdatesList}>
                {thesisList.map((item, idx) => (
                  <div key={idx} className={styles.thesisItem}>
                    <p className={styles.thesisItemText}>"{item.text}"</p>
                    <span className={styles.thesisItemTime}>— {item.user} · {item.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ═════════════════════════════════════════════════════
              4x3 SECURITY & KEY METRICS GRID
          ═════════════════════════════════════════════════════ */}
          <div className={styles.securityGridCard}>
            <div className={styles.securityGridTitle}>
              <ShieldCheck size={13} color="#2fcb73" />
              <span>Token Audit & Security Signals</span>
            </div>

            <div className={styles.metricGrid}>
              <div className={styles.metricCell}>
                <span className={styles.metricCellLabel}>Top 10</span>
                <span className={styles.metricCellValGreen}>
                  {token.top10Pct !== undefined ? `${token.top10Pct}%` : "22.59%"}
                </span>
              </div>
              <div className={styles.metricCell}>
                <span className={styles.metricCellLabel}>DEV</span>
                <span className={styles.metricCellValGreen}>0%</span>
              </div>
              <div className={styles.metricCell}>
                <span className={styles.metricCellLabel}>Holders</span>
                <span className={styles.metricCellValMono}>{token.holders}</span>
              </div>
              <div className={styles.metricCell}>
                <span className={styles.metricCellLabel}>Snipers</span>
                <span className={styles.metricCellValRed}>28.68%</span>
              </div>

              <div className={styles.metricCell}>
                <span className={styles.metricCellLabel}>Insiders</span>
                <span className={styles.metricCellValGreen}>0%</span>
              </div>
              <div className={styles.metricCell}>
                <span className={styles.metricCellLabel}>Phishing</span>
                <span className={styles.metricCellValGreen}>0.6%</span>
              </div>
              <div className={styles.metricCell}>
                <span className={styles.metricCellLabel}>Bundler</span>
                <span className={styles.metricCellValRed}>43.7%</span>
              </div>
              <div className={styles.metricCell}>
                <span className={styles.metricCellLabel}>Dex Paid</span>
                <span className={styles.metricCellValMuted}>Unpaid</span>
              </div>

              <div className={styles.metricCell}>
                <span className={styles.metricCellLabel}>NoMint</span>
                <span className={styles.metricCellValGreen}>✓</span>
              </div>
              <div className={styles.metricCell}>
                <span className={styles.metricCellLabel}>No Blacklist</span>
                <span className={styles.metricCellValGreen}>✓</span>
              </div>
              <div className={styles.metricCell}>
                <span className={styles.metricCellLabel}>Burnt</span>
                <span className={styles.metricCellValGreen}>100% 🔥</span>
              </div>
              <div className={styles.metricCell}>
                <span className={styles.metricCellLabel}>Rug %</span>
                <span className={styles.metricCellValGreen}>0%</span>
              </div>
            </div>
          </div>

          {/* ═════════════════════════════════════════════════════
              WARNING ALERT BANNER (From Reference Image 2)
          ═════════════════════════════════════════════════════ */}
          <div className={styles.warningBanner}>
            <AlertTriangle size={13} className={styles.warningIcon} />
            <span className={styles.warningText}>
              New tokens may not be accurately detected and could contain malicious methods. Trade cautiously.
            </span>
          </div>

          {/* ═════════════════════════════════════════════════════
              ACCORDION 1: PUMP Pool Info
          ═════════════════════════════════════════════════════ */}
          <div className={styles.accordionCard}>
            <button
              className={styles.accordionHeader}
              onClick={() => toggleSection("poolInfo")}
            >
              <div className={styles.accordionHeaderLeft}>
                <span>PUMP Pool Info</span>
                <Lock size={11} color="#2fcb73" />
              </div>
              {openSections.poolInfo ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>

            {openSections.poolInfo && (
              <div className={styles.accordionBody}>
                <div className={styles.dataRow}>
                  <span className={styles.dataKey}>Total liq</span>
                  <span className={styles.dataVal}>
                    $15.77K (39.54 SOL) <Lock size={9} style={{ display: "inline" }} />
                  </span>
                </div>
                <div className={styles.dataRow}>
                  <span className={styles.dataKey}>Pair Liq/Initial</span>
                  <span className={styles.dataVal}>413.1M / 1B (100%)</span>
                </div>
                <div className={styles.dataRow}>
                  <span className={styles.dataKey}>Bonding Progress</span>
                  <span className={styles.dataValGreen}>{token.bondingPercent}%</span>
                </div>
                <div className={styles.bondingProgressBar}>
                  <div
                    className={styles.bondingProgressFill}
                    style={{ width: `${Math.min(100, token.bondingPercent)}%` }}
                  />
                </div>
                <div className={styles.dataRow}>
                  <span className={styles.dataKey}>SOL Pool</span>
                  <span className={styles.dataVal}>
                    39.54 / 0.08 SOL <span className={styles.gainGreen}>(+&gt;99K%)</span>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* ═════════════════════════════════════════════════════
              ACCORDION 2: DEV Info
          ═════════════════════════════════════════════════════ */}
          <div className={styles.accordionCard}>
            <button
              className={styles.accordionHeader}
              onClick={() => toggleSection("devInfo")}
            >
              <div className={styles.accordionHeaderLeft}>
                <span>DEV Info</span>
                <span className={styles.scanBadge}>
                  <Activity size={9} /> Scan
                </span>
              </div>
              {openSections.devInfo ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>

            {openSections.devInfo && (
              <div className={styles.accordionBody}>
                <div className={styles.dataRow}>
                  <span className={styles.dataKey}>DEV Address</span>
                  <div className={styles.dataValGroup}>
                    <span className={styles.dataValAddress}>
                      {token.devHandle || "9nFn...Cg1E"} (15.4 SOL)
                    </span>
                    <button
                      className={styles.inlineCopyBtn}
                      onClick={() => handleCopy("9nFnMhQz7718Cg1E", "Dev address")}
                    >
                      <Copy size={9} />
                    </button>
                  </div>
                </div>
                <div className={styles.dataRow}>
                  <span className={styles.dataKey}>Funding</span>
                  <span className={styles.dataVal}>5tzF...uAi9 · 7.98 SOL (34m)</span>
                </div>
                <div className={styles.dataRow}>
                  <span className={styles.dataKey}>KOLs Holding</span>
                  <span className={styles.dataValGreen}>{token.kolsHolding || 6} KOLs</span>
                </div>
                {token.i5Score && (
                  <div className={styles.dataRow}>
                    <span className={styles.dataKey}>i5 Conviction</span>
                    <span className={styles.dataValGreen}>{token.i5Score}/100 Tier 1</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ═════════════════════════════════════════════════════
              ACCORDION 3: Basic Data
          ═════════════════════════════════════════════════════ */}
          <div className={styles.accordionCard}>
            <button
              className={styles.accordionHeader}
              onClick={() => toggleSection("basicData")}
            >
              <div className={styles.accordionHeaderLeft}>
                <span>Basic Data</span>
              </div>
              {openSections.basicData ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>

            {openSections.basicData && (
              <div className={styles.accordionBody}>
                <div className={styles.dataRow}>
                  <span className={styles.dataKey}>Market cap</span>
                  <span className={styles.dataVal}>{token.marketCap}</span>
                </div>
                <div className={styles.dataRow}>
                  <span className={styles.dataKey}>Holders</span>
                  <span className={styles.dataVal}>{token.holders.toLocaleString()}</span>
                </div>
                <div className={styles.dataRow}>
                  <span className={styles.dataKey}>Total supply</span>
                  <span className={styles.dataVal}>{token.totalSupply || "1B"}</span>
                </div>
                <div className={styles.dataRow}>
                  <span className={styles.dataKey}>Pair Contract</span>
                  <div className={styles.dataValGroup}>
                    <span className={styles.dataValAddress}>5UMA...2JSX</span>
                    <button
                      className={styles.inlineCopyBtn}
                      onClick={() => handleCopy("5UMAQr82k...2JSX", "Pair contract")}
                    >
                      <Copy size={9} />
                    </button>
                  </div>
                </div>
                <div className={styles.dataRow}>
                  <span className={styles.dataKey}>Token created</span>
                  <span className={styles.dataValMuted}>10/08/2026 16:47:56</span>
                </div>
                <div className={styles.dataRow}>
                  <span className={styles.dataKey}>Pool created</span>
                  <span className={styles.dataValMuted}>10/08/2026 16:47:56</span>
                </div>
              </div>
            )}
          </div>

          {/* ═════════════════════════════════════════════════════
              ACCORDION 4: Token Audit (GoPlus)
          ═════════════════════════════════════════════════════ */}
          <div className={styles.accordionCard}>
            <button
              className={styles.accordionHeader}
              onClick={() => toggleSection("tokenAudit")}
            >
              <div className={styles.accordionHeaderLeft}>
                <span>Token Audit</span>
                <span className={styles.auditGoPlusBadge}>GoPlus</span>
              </div>
              {openSections.tokenAudit ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>

            {openSections.tokenAudit && (
              <div className={styles.accordionBody}>
                <div className={styles.dataRow}>
                  <span className={styles.dataKey}>NoMint</span>
                  <span className={styles.dataValGreen}>✓ Verified</span>
                </div>
                <div className={styles.dataRow}>
                  <span className={styles.dataKey}>No Blacklist</span>
                  <span className={styles.dataValGreen}>✓ Verified</span>
                </div>
                <div className={styles.dataRow}>
                  <span className={styles.dataKey}>Burnt</span>
                  <span className={styles.dataValGreen}>✓ 100% Locked</span>
                </div>
                <div className={styles.dataRow}>
                  <span className={styles.dataKey}>Top 10 Wallets</span>
                  <span className={styles.dataValGreen}>20% Safe threshold</span>
                </div>
              </div>
            )}
          </div>

          {/* ═════════════════════════════════════════════════════
              ACCORDION 5: Avatar Reused Tokens
          ═════════════════════════════════════════════════════ */}
          <div className={styles.accordionCard}>
            <button
              className={styles.accordionHeader}
              onClick={() => toggleSection("avatarReused")}
            >
              <div className={styles.accordionHeaderLeft}>
                <span>Avatar Reused Tokens</span>
              </div>
              {openSections.avatarReused ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>

            {openSections.avatarReused && (
              <div className={styles.accordionBody}>
                <p className={styles.emptyAccordionText}>No Avatar Reused Tokens detected</p>
              </div>
            )}
          </div>

          {/* ═════════════════════════════════════════════════════
              ACCORDION 6: Same Name Tokens
          ═════════════════════════════════════════════════════ */}
          <div className={styles.accordionCard}>
            <button
              className={styles.accordionHeader}
              onClick={() => toggleSection("sameName")}
            >
              <div className={styles.accordionHeaderLeft}>
                <span>Same Name Tokens</span>
              </div>
              {openSections.sameName ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>

            {openSections.sameName && (
              <div className={styles.accordionBody}>
                <p className={styles.emptyAccordionText}>No duplicate same name tokens detected</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating feedback toast */}
      {toast && <div className={styles.floatingToast}>{toast}</div>}
    </div>
  );
}
