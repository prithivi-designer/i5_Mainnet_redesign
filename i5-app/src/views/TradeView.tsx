"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, AlertTriangle, Settings, Maximize, LayoutGrid, Users, Bookmark, Sparkles, Globe, Bell, CandlestickChart, Smartphone, Zap, Bot, Star, Send } from "lucide-react";

/* ──────────────────────────────────────────────────────────
   MOCK TRADING DESK DATA
   ────────────────────────────────────────────────────────── */
const STATS = {
  symbol: "BTC/USD",
  leverage: "40x",
  markPrice: 64655,
  change24h: "+526",
  changePct: "+0.82%",
  vol24h: "$1.6B",
  openInterest: "$2.3B",
  fundingRate: "-0.0005%",
  countdown: "00:56:49",
};

const ASKS = [
  { price: "64,673", size: "244,831", total: "5,534,874", barPct: 100 },
  { price: "64,672", size: "2,142,924", total: "5,290,043", barPct: 95 },
  { price: "64,671", size: "529,315", total: "3,147,118", barPct: 56 },
  { price: "64,670", size: "1,137,093", total: "2,617,804", barPct: 47 },
  { price: "64,669", size: "415,172", total: "1,480,711", barPct: 26 },
  { price: "64,668", size: "490,981", total: "1,065,539", barPct: 19 },
  { price: "64,667", size: "574,557", total: "574,557", barPct: 10 },
];

const BIDS = [
  { price: "64,666", size: "268,676", total: "268,676", barPct: 10 },
  { price: "64,665", size: "1,167", total: "269,842", barPct: 11 },
  { price: "64,664", size: "22,736", total: "292,578", barPct: 12 },
  { price: "64,663", size: "91,766", total: "384,344", barPct: 15 },
  { price: "64,662", size: "16,325", total: "400,668", barPct: 16 },
  { price: "64,661", size: "17,755", total: "418,423", barPct: 17 },
  { price: "64,660", size: "238,905", total: "657,328", barPct: 25 },
];

const TOP_TRADERS = [
  { address: "0x45d2...4029", notional: "$17.47M", notionalColor: "var(--red-400)", entry: "$77,850", liq: "$132,682", pnl: "+$3.5M", funding: "+$2.51M", accountVal: "$28.42M" },
  { address: "0xd62d...7d91", notional: "$18.08M", notionalColor: "var(--red-400)", entry: "$75,151", liq: "$93,572", pnl: "+$2.87M", funding: "+$333.99K", accountVal: "$8.33M" },
  { address: "0x15a4...dfdb", notional: "$64.86M", notionalColor: "var(--emerald-500)", entry: "$62,354", liq: "$57,668", pnl: "+$2.51M", funding: "-$473.52K", accountVal: "$8.3M" },
  { address: "0xcc22...c838", notional: "$2.23M", notionalColor: "var(--red-400)", entry: "$110,430", liq: "$74,308", pnl: "+$1.57M", funding: "+$111.78K", accountVal: "$356.64K" },
  { address: "0x218a...7da2", notional: "$22.52M", notionalColor: "var(--red-400)", entry: "$69,309", liq: "$71,117", pnl: "+$1.54M", funding: "+$262.96K", accountVal: "$4.8M" },
  { address: "0x93ab...11f8", notional: "$19.46M", notionalColor: "var(--emerald-500)", entry: "$59,887", liq: "$47,721", pnl: "+$1.49M", funding: "-$164.87K", accountVal: "$5.32M" },
  { address: "0xf62e...2f30", notional: "$4.14M", notionalColor: "var(--red-400)", entry: "$87,966", liq: "$76,850", pnl: "+$1.47M", funding: "+$182.66K", accountVal: "$907.79K" },
  { address: "0x404c...5f03", notional: "$2.48M", notionalColor: "var(--red-400)", entry: "$102,960", liq: "$89,243", pnl: "+$1.46M", funding: "+$133.4K", accountVal: "$1.27M" },
];

const TICKER_BAR_ITEMS = [
  { name: "BTC", price: "$64,664", change: "+0.8%", isUp: true },
  { name: "ETH", price: "$3,284.20", change: "-0.8%", isUp: false },
  { name: "SOL", price: "$145.30", change: "+2.1%", isUp: true },
  { name: "HYPE", price: "$42.56", change: "-1.4%", isUp: false },
  { name: "AAPL", price: "$224.30", change: "+2.8%", isUp: true },
  { name: "NVDA", price: "$124.50", change: "+4.2%", isUp: true },
];

/* ──────────────────────────────────────────────────────────
   TRADINGVIEW CANDLESTICK CHART COMPONENT (EXACT SCREENSHOT STRUCTURE)
   ────────────────────────────────────────────────────────── */
function generateExactCandleStructure() {
  const pivots = [
    { len: 5, target: 65800 },
    { len: 4, target: 62200 },
    { len: 8, target: 74500 },
    { len: 6, target: 66000 },
    { len: 4, target: 69200 },
    { len: 5, target: 64100 },
    { len: 4, target: 67800 },
    { len: 4, target: 63000 },
    { len: 10, target: 84200 }, // ATH Peak at Center
    { len: 4, target: 78000 },
    { len: 3, target: 81200 },
    { len: 6, target: 73500 },
    { len: 3, target: 76200 },
    { len: 5, target: 69800 },
    { len: 3, target: 58200 }, // Big Cliff Drop
    { len: 3, target: 56800 }, // Long wick bottom
    { len: 6, target: 66200 },
    { len: 4, target: 62000 },
    { len: 4, target: 65400 },
    { len: 5, target: 57100 }, // Double bottom
    { len: 6, target: 66800 },
    { len: 4, target: 63500 },
    { len: 4, target: 67200 },
    { len: 4, target: 63800 },
    { len: 5, target: 64637 }, // Final close at 64,637
  ];

  const candles: { open: number; high: number; low: number; close: number; vol: number }[] = [];
  let currOpen = 60800;

  pivots.forEach((p) => {
    const step = (p.target - currOpen) / p.len;
    for (let i = 0; i < p.len; i++) {
      const open = currOpen;
      const noise = (Math.random() - 0.5) * Math.abs(step) * 0.4;
      const close = open + step + noise;

      const high = Math.max(open, close) + Math.random() * (Math.abs(step) * 0.5 + 180);
      const low = Math.min(open, close) - Math.random() * (Math.abs(step) * 0.5 + 180);
      const vol = Math.floor(Math.random() * 120 + 30);

      candles.push({ open, high, low, close, vol });
      currOpen = close;
    }
  });

  // Force last close to exact screenshot value 64,637
  candles[candles.length - 1].close = 64637;
  return candles;
}

const GENERATED_CANDLES = generateExactCandleStructure();

function TradingViewChart() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleRender = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const w = rect.width;
      const h = rect.height;

      // Dark surface fill
      ctx.fillStyle = "#080808";
      ctx.fillRect(0, 0, w, h);

      const paddingRight = 65;
      const paddingBottom = 24;
      const chartW = w - paddingRight;
      const chartH = h - paddingBottom;

      const minP = 54000;
      const maxP = 86000;

      // 1. Grid lines & Y-Axis Labels
      ctx.strokeStyle = "rgba(228, 228, 228, 0.07)";
      ctx.lineWidth = 1;
      ctx.font = "10px monospace";
      ctx.fillStyle = "#787878";
      ctx.textAlign = "left";

      const prices = [84000, 80000, 76000, 72000, 68000, 64000, 60000];
      prices.forEach((p) => {
        const y = Math.round(chartH - ((p - minP) / (maxP - minP)) * (chartH - 20) - 10);
        ctx.beginPath();
        ctx.setLineDash([2, 2]);
        ctx.moveTo(0, y);
        ctx.lineTo(chartW, y);
        ctx.stroke();

        ctx.setLineDash([]);
        ctx.fillText(p.toLocaleString(), chartW + 8, y + 3);
      });

      // 2. Candlesticks & Volume Bars
      const count = GENERATED_CANDLES.length;
      const candleW = chartW / count;

      GENERATED_CANDLES.forEach((c, i) => {
        const isBull = c.close >= c.open;
        const color = isBull ? "#2fcb73" : "#e13b3b";
        const volColor = isBull ? "rgba(47, 203, 115, 0.35)" : "rgba(225, 59, 59, 0.35)";

        const x = i * candleW + candleW / 2;
        const barW = Math.max(candleW - 1.6, 2.5);

        const yHigh = Math.round(chartH - ((c.high - minP) / (maxP - minP)) * (chartH - 20) - 10);
        const yLow = Math.round(chartH - ((c.low - minP) / (maxP - minP)) * (chartH - 20) - 10);
        const yOpen = Math.round(chartH - ((c.open - minP) / (maxP - minP)) * (chartH - 20) - 10);
        const yClose = Math.round(chartH - ((c.close - minP) / (maxP - minP)) * (chartH - 20) - 10);

        const bodyY = Math.min(yOpen, yClose);
        const bodyH = Math.max(Math.abs(yClose - yOpen), 1.5);

        // Volume bar at bottom
        const volH = (c.vol / 200) * 45;
        ctx.fillStyle = volColor;
        ctx.fillRect(Math.round(x - barW / 2), Math.round(chartH - volH), barW, volH);

        // Wick
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(Math.round(x), yHigh);
        ctx.lineTo(Math.round(x), yLow);
        ctx.stroke();

        // Body
        ctx.fillStyle = color;
        ctx.fillRect(Math.round(x - barW / 2), bodyY, barW, bodyH);
      });

      // 3. Current Price Line ($64,637)
      const currentY = Math.round(chartH - ((64637 - minP) / (maxP - minP)) * (chartH - 20) - 10);
      ctx.strokeStyle = "#2fcb73";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(0, currentY);
      ctx.lineTo(chartW, currentY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Current Price Tag on Y-Axis
      ctx.fillStyle = "#2fcb73";
      ctx.fillRect(chartW, currentY - 10, 58, 20);
      ctx.fillStyle = "#080808";
      ctx.font = "bold 10px monospace";
      ctx.textAlign = "center";
      ctx.fillText("64,637", chartW + 29, currentY + 4);

      // 4. Time Axis Months (Apr, May, Jun, Jul, Aug)
      ctx.font = "10px sans-serif";
      ctx.fillStyle = "#787878";
      ctx.textAlign = "center";
      const months = [
        { name: "Apr", idx: 10 },
        { name: "May", idx: 32 },
        { name: "Jun", idx: 55 },
        { name: "Jul", idx: 78 },
        { name: "Aug", idx: 98 },
      ];
      months.forEach((m) => {
        const monthX = m.idx * candleW;
        ctx.fillText(m.name, monthX, chartH + 16);
      });
    };

    handleRender();
    window.addEventListener("resize", handleRender);
    return () => window.removeEventListener("resize", handleRender);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "var(--bg-app)", display: "flex", flexDirection: "column" }}>
      {/* TradingView Chart Top Info Bar */}
      <div style={{ padding: "8px 14px", borderBottom: "1px solid var(--border-color-default)", display: "flex", alignItems: "center", gap: 12, fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-tertiary)", flexWrap: "wrap", flexShrink: 0 }}>
        <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>BTC/USD · 1D · Hyperdash</span>
        <span>O <span style={{ color: "var(--emerald-500)" }}>64,625</span></span>
        <span>H <span style={{ color: "var(--emerald-500)" }}>64,967</span></span>
        <span>L <span style={{ color: "var(--emerald-500)" }}>64,425</span></span>
        <span>C <span style={{ color: "var(--emerald-500)" }}>64,637</span></span>
        <span style={{ color: "var(--emerald-500)", fontWeight: 700 }}>12.000 (+0.02%)</span>
      </div>

      {/* Volume Info Badge */}
      <div style={{ padding: "4px 14px", fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-tertiary)", display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
        <span>Volume</span>
        <span style={{ color: "var(--emerald-500)", fontWeight: 700 }}>5.4 K</span>
      </div>

      {/* Canvas Container */}
      <div style={{ flex: 1, position: "relative", width: "100%", minHeight: 0 }}>
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />

        {/* Floating TV Logo Badge */}
        <div style={{ position: "absolute", bottom: 12, left: 14, background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-md)", padding: "4px 8px", fontSize: 11, fontWeight: 800, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: 4 }}>
          <span>TV</span>
        </div>

        {/* Bottom Right Volume Badge Tag (5.4 K) */}
        <div style={{ position: "absolute", bottom: 12, right: 75, background: "var(--emerald-500)", color: "var(--bg-app)", borderRadius: "3px", padding: "2px 6px", fontSize: 10, fontWeight: 800, fontFamily: "var(--font-mono)" }}>
          5.4 K
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   MAIN TRADE VIEW COMPONENT (NO GREEN / MINT ON BUTTONS)
   ────────────────────────────────────────────────────────── */
export default function TradeView() {
  const [activeRightTab, setActiveRightTab] = useState<"autopilot" | "copilot" | "manual">("manual");
  const [activeBottomTab, setActiveBottomTab] = useState<string>("Top Traders");
  const [topTradersFilter, setTopTradersFilter] = useState<"All" | "Long" | "Short">("All");

  // Right Terminal Drawer Open/Collapsed state
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(true);

  // Manual Form States
  const [orderType, setOrderType] = useState<"MARKET" | "LIMIT" | "PRO">("MARKET");
  const [side, setSide] = useState<"Long" | "Short">("Long");
  const [sizeInput, setSizeInput] = useState("");
  const [sliderPct, setSliderPct] = useState(0);
  const [tpSlChecked, setTpSlChecked] = useState(false);

  // Copilot Chat States
  const [copilotInput, setCopilotInput] = useState("");
  const [copilotMsgs, setCopilotMsgs] = useState([
    {
      id: 1,
      sender: "ai",
      text: "A&S AI Co-Pilot Online — I'm monitoring your trading desk. I can analyze charts, evaluate leverage, plan breakout DCA strategies, or execute commands from your text input!",
    },
  ]);

  // Autopilot State
  const [autopilotActive, setAutopilotActive] = useState(false);

  const handleSendCopilotMsg = () => {
    if (!copilotInput.trim()) return;
    const userMsg = { id: Date.now(), sender: "user", text: copilotInput };
    setCopilotMsgs((prev) => [...prev, userMsg]);
    setCopilotInput("");
    setTimeout(() => {
      setCopilotMsgs((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: "Analyzing market structure: BTC/USD shows strong orderbook imbalance on 15M. Recommending entry at $64,650 with a tight stop at $63,800.",
        },
      ]);
    }, 750);
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "var(--bg-app)", color: "var(--text-primary)", fontFamily: "var(--font-sans)", overflow: "hidden", userSelect: "none", position: "relative" }}>
      
      {/* ──────────────────────────────────────────────────────────
          1. TOP TICKER & METRICS HEADER BAR
         ────────────────────────────────────────────────────────── */}
      <div style={{ height: 46, background: "var(--bg-surface)", borderBottom: "1px solid var(--border-color-default)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--bg-surface-raised)", border: "1px solid var(--border-color-strong)", borderRadius: "var(--radius-md)", padding: "4px 10px", color: "var(--text-primary)", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            <span style={{ color: "#F59E0B" }}>₿</span> {STATS.symbol} <span style={{ fontSize: 11, color: "#60A5FA" }}>{STATS.leverage}</span> <span>+</span>
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 11, fontFamily: "var(--font-mono)" }}>
            <div>
              <span style={{ color: "var(--text-tertiary)", display: "block", fontSize: 9 }}>MARK</span>
              <span style={{ fontWeight: 800 }}>${STATS.markPrice.toLocaleString()}</span>
            </div>
            <div>
              <span style={{ color: "var(--text-tertiary)", display: "block", fontSize: 9 }}>24H CHANGE</span>
              <span style={{ color: "var(--emerald-500)", fontWeight: 800 }}>{STATS.change24h} / {STATS.changePct}</span>
            </div>
            <div>
              <span style={{ color: "var(--text-tertiary)", display: "block", fontSize: 9 }}>24H VOLUME</span>
              <span style={{ fontWeight: 700 }}>{STATS.vol24h}</span>
            </div>
            <div>
              <span style={{ color: "var(--text-tertiary)", display: "block", fontSize: 9 }}>OPEN INTEREST</span>
              <span style={{ fontWeight: 700 }}>{STATS.openInterest}</span>
            </div>
            <div>
              <span style={{ color: "var(--text-tertiary)", display: "block", fontSize: 9 }}>FUNDING/COUNTDOWN</span>
              <span style={{ color: "var(--red-500)", fontWeight: 700 }}>{STATS.fundingRate} <span style={{ color: "var(--text-primary)" }}>{STATS.countdown}</span></span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 600, color: "var(--text-tertiary)" }}>
          <span style={{ color: "var(--text-primary)", cursor: "pointer" }}>Chart</span>
          <span style={{ cursor: "pointer" }}>Liquidations</span>
          <span style={{ cursor: "pointer" }}>Stops</span>
          <div style={{ display: "flex", gap: 6, marginLeft: 4 }}>
            {[
              <Settings size={12} key="settings" />,
              <Maximize size={12} key="maximize" />,
              <LayoutGrid size={12} key="layout" />
            ].map((icon, idx) => (
              <button key={idx} style={{ background: "var(--bg-surface-raised)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-sm)", padding: "3px 6px", color: "var(--text-tertiary)", cursor: "pointer", display: "flex", alignItems: "center" }}>
                {icon}
              </button>
            ))}
          </div>

          {/* 5 Pill Buttons next to grid option (Tokenized Theme Style) */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: 6 }}>
            {[
              { label: "Cohorts", icon: <Users size={12} /> },
              { label: "Copytrading", icon: <Bookmark size={12} /> },
              { label: "Tagged", icon: <Sparkles size={12} />, iconColor: "#F59E0B" },
              { label: "Global", icon: <Globe size={12} /> },
              { label: "Set Alert", icon: <Bell size={12} /> },
            ].map((pill, idx) => (
              <button
                key={idx}
                style={{
                  background: "var(--bg-surface-raised)",
                  border: "1px solid var(--border-color-default)",
                  borderRadius: "var(--radius-full)",
                  padding: "4px 10px",
                  color: "var(--text-secondary)",
                  fontSize: 11,
                  fontWeight: 600,
                  fontFamily: "var(--font-sans)",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  boxShadow: "var(--shadow-sm)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--bg-surface-overlay)";
                  e.currentTarget.style.borderColor = "var(--border-color-strong)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--bg-surface-raised)";
                  e.currentTarget.style.borderColor = "var(--border-color-default)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                <span style={{ color: pill.iconColor || "inherit", fontSize: 11 }}>{pill.icon}</span>
                <span>{pill.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          2. MAIN TRADING DESK GRID LAYOUT
         ────────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: isTerminalOpen ? "1fr 270px 360px" : "1fr 290px", gridTemplateRows: "1fr 260px", overflow: "hidden", transition: "grid-template-columns 0.2s ease" }}>
        
        {/* TOP LEFT: CHART */}
        <div style={{ gridColumn: 1, gridRow: 1, borderRight: "1px solid var(--border-color-default)", borderBottom: "1px solid var(--border-color-default)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ height: 34, background: "var(--bg-surface)", borderBottom: "1px solid var(--border-color-default)", display: "flex", alignItems: "center", gap: 6, padding: "0 12px", fontSize: 12, flexShrink: 0 }}>
            {["1m", "5m", "15m", "1h", "D ∨"].map((tf) => (
              <button key={tf} style={{ background: tf.startsWith("D") ? "var(--bg-surface-overlay)" : "transparent", border: tf.startsWith("D") ? "1px solid var(--border-color-strong)" : "none", color: tf.startsWith("D") ? "var(--text-primary)" : "var(--text-tertiary)", padding: "2px 8px", borderRadius: "var(--radius-sm)", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                {tf}
              </button>
            ))}
            <div style={{ width: 1, height: 14, background: "var(--border-color-default)", margin: "0 4px" }} />
            <button style={{ background: "transparent", border: "none", color: "var(--text-tertiary)", cursor: "pointer", display: "flex", alignItems: "center" }}><CandlestickChart size={14} /></button>
            <button style={{ background: "transparent", border: "none", color: "var(--text-tertiary)", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>fx Indicators</button>
          </div>

          <div style={{ flex: 1, overflow: "hidden" }}>
            <TradingViewChart />
          </div>
        </div>

        {/* MIDDLE: ORDERBOOK */}
        <div style={{ gridColumn: 2, gridRow: 1, background: "var(--bg-surface)", borderRight: "1px solid var(--border-color-default)", borderBottom: "1px solid var(--border-color-default)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ height: 34, background: "var(--bg-surface)", borderBottom: "1px solid var(--border-color-default)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px", flexShrink: 0 }}>
            <div style={{ display: "flex", gap: 16, fontSize: 12, fontWeight: 700 }}>
              <span style={{ color: "var(--text-primary)", borderBottom: "2px solid var(--text-primary)", paddingBottom: 6 }}>Orderbook</span>
              <span style={{ color: "var(--text-tertiary)", cursor: "pointer" }}>Trades</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}>
              <span>1 ∨</span>
              <span>USD ∨</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "6px 12px", fontSize: 10, fontFamily: "var(--font-mono)", color: "var(--text-tertiary)", borderBottom: "1px solid var(--border-color-default)" }}>
            <span>PRICE</span>
            <span style={{ textAlign: "right" }}>SIZE</span>
            <span style={{ textAlign: "right" }}>TOTAL</span>
          </div>

          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {ASKS.map((ask) => (
                <div key={ask.price} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "3px 12px", fontSize: 11, fontFamily: "var(--font-mono)", position: "relative" }}>
                  <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: `${ask.barPct}%`, background: "rgba(225, 59, 59, 0.12)", pointerEvents: "none" }} />
                  <span style={{ color: "var(--red-500)", fontWeight: 700, zIndex: 1 }}>{ask.price}</span>
                  <span style={{ textAlign: "right", color: "var(--text-primary)", zIndex: 1 }}>{ask.size}</span>
                  <span style={{ textAlign: "right", color: "var(--text-tertiary)", zIndex: 1 }}>{ask.total}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 12px", background: "var(--bg-app)", borderTop: "1px solid var(--border-color-default)", borderBottom: "1px solid var(--border-color-default)", fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}>
              <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>Spread</span>
              <span>$1</span>
              <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>0.002%</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {BIDS.map((bid) => (
                <div key={bid.price} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "3px 12px", fontSize: 11, fontFamily: "var(--font-mono)", position: "relative" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${bid.barPct}%`, background: "rgba(47, 203, 115, 0.12)", pointerEvents: "none" }} />
                  <span style={{ color: "var(--emerald-500)", fontWeight: 700, zIndex: 1 }}>{bid.price}</span>
                  <span style={{ textAlign: "right", color: "var(--text-primary)", zIndex: 1 }}>{bid.size}</span>
                  <span style={{ textAlign: "right", color: "var(--text-tertiary)", zIndex: 1 }}>{bid.total}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: "6px 12px", borderTop: "1px solid var(--border-color-default)", background: "var(--bg-surface)" }}>
            <div style={{ display: "flex", borderRadius: "var(--radius-sm)", overflow: "hidden", height: 16, fontSize: 10, fontFamily: "var(--font-mono)", fontWeight: 800 }}>
              <div style={{ width: "20%", background: "var(--neutral-700)", color: "var(--text-primary)", display: "flex", alignItems: "center", paddingLeft: 4 }}>B 20%</div>
              <div style={{ width: "80%", background: "var(--red-600)", color: "var(--neutral-0)", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 4 }}>80% S</div>
            </div>
          </div>
        </div>

        {/* BOTTOM LEFT: MULTI-TAB ANALYTICS TABLE */}
        <div style={{ gridColumn: isTerminalOpen ? "1 / 3" : "1 / 3", gridRow: 2, background: "var(--bg-surface)", borderRight: "1px solid var(--border-color-default)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ height: 38, background: "var(--bg-surface)", borderBottom: "1px solid var(--border-color-default)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px", flexShrink: 0 }}>
            <div style={{ display: "flex", gap: 16, fontSize: 12, overflowX: "auto" }}>
              {["Positions", "Copytrade", "Balances", "Open Orders", "TWAP", "History", "Top Traders", "Cohorts", "Position Changes", "Current TWAPs"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveBottomTab(tab)}
                  style={{
                    background: "transparent", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700,
                    color: activeBottomTab === tab ? "var(--text-primary)" : "var(--text-tertiary)",
                    borderBottom: activeBottomTab === tab ? "2px solid var(--text-primary)" : "2px solid transparent",
                    paddingBottom: 8, whiteSpace: "nowrap",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontFamily: "var(--font-mono)" }}>
              {(["All", "Long", "Short"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setTopTradersFilter(f)}
                  style={{
                    background: topTradersFilter === f ? "var(--bg-surface-overlay)" : "transparent",
                    border: topTradersFilter === f ? "1px solid var(--border-color-strong)" : "none",
                    color: f === "Long" ? "var(--text-primary)" : f === "Short" ? "var(--red-500)" : "var(--text-primary)",
                    padding: "2px 8px", borderRadius: "var(--radius-sm)", cursor: "pointer", fontWeight: 700,
                  }}
                >
                  {f} {f === "Long" ? "18977" : f === "Short" ? "15466" : ""}
                </button>
              ))}
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "0 14px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: "var(--font-sans)" }}>
              <thead>
                <tr style={{ color: "var(--text-tertiary)", textAlign: "left", borderBottom: "1px solid var(--border-color-default)", fontSize: 10, fontFamily: "var(--font-mono)" }}>
                  <th style={{ padding: "8px 0", fontWeight: 600 }}>ADDRESS</th>
                  <th style={{ padding: "8px 0", fontWeight: 600 }}>NOTIONAL ↕</th>
                  <th style={{ padding: "8px 0", fontWeight: 600 }}>ENTRY ↕</th>
                  <th style={{ padding: "8px 0", fontWeight: 600 }}>LIQUIDATION ↕</th>
                  <th style={{ padding: "8px 0", fontWeight: 600 }}>UNREALIZED PNL ↕</th>
                  <th style={{ padding: "8px 0", fontWeight: 600 }}>FUNDING ↕</th>
                  <th style={{ padding: "8px 0", fontWeight: 600, textAlign: "right" }}>ACCOUNT VALUE ↕</th>
                </tr>
              </thead>
              <tbody>
                {TOP_TRADERS.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid var(--border-color-default)", fontFamily: "var(--font-mono)" }}>
                    <td style={{ padding: "8px 0", color: "var(--text-primary)", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ color: "var(--text-tertiary)", display: "flex", alignItems: "center" }}><Smartphone size={12} /></span> {row.address}
                    </td>
                    <td style={{ padding: "8px 0", color: row.notionalColor, fontWeight: 700 }}>{row.notional}</td>
                    <td style={{ padding: "8px 0", color: "var(--text-secondary)" }}>{row.entry}</td>
                    <td style={{ padding: "8px 0", color: "var(--text-secondary)" }}>{row.liq}</td>
                    <td style={{ padding: "8px 0", color: "var(--emerald-500)", fontWeight: 700 }}>{row.pnl}</td>
                    <td style={{ padding: "8px 0", color: row.funding.startsWith("+") ? "var(--emerald-500)" : "var(--red-500)", fontWeight: 700 }}>{row.funding}</td>
                    <td style={{ padding: "8px 0", color: "var(--text-primary)", fontWeight: 700, textAlign: "right" }}>{row.accountVal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────
            FAR RIGHT: 3-MODE TRADING TERMINAL (NEUTRAL / NO GREEN BUTTONS)
           ────────────────────────────────────────────────────────── */}
        {isTerminalOpen && (
          <div style={{ gridColumn: 3, gridRow: "1 / 3", background: "var(--bg-surface)", borderLeft: "1px solid var(--border-color-default)", padding: 14, display: "flex", flexDirection: "column", gap: 14, overflowY: "auto" }}>
            
            {/* Top Segmented Mode Selector Tab Bar (Neutral Design Tokens) */}
            <div style={{ background: "var(--bg-app)", border: "1px solid var(--border-color-strong)", borderRadius: "var(--radius-xl)", padding: 4, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4, flexShrink: 0 }}>
              <button
                onClick={() => setActiveRightTab("autopilot")}
                style={{
                  padding: "8px 0", borderRadius: "var(--radius-lg)", border: activeRightTab === "autopilot" ? "1px solid var(--border-color-strong)" : "none",
                  background: activeRightTab === "autopilot" ? "var(--bg-surface-overlay)" : "transparent",
                  color: activeRightTab === "autopilot" ? "var(--text-primary)" : "var(--text-tertiary)",
                  fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                  transition: "all 0.15s ease",
                }}
              >
                <Zap size={14} /> i5 Autopilot
              </button>

              <button
                onClick={() => setActiveRightTab("copilot")}
                style={{
                  padding: "8px 0", borderRadius: "var(--radius-lg)", border: activeRightTab === "copilot" ? "1px solid var(--border-color-strong)" : "none",
                  background: activeRightTab === "copilot" ? "var(--bg-surface-overlay)" : "transparent",
                  color: activeRightTab === "copilot" ? "var(--text-primary)" : "var(--text-tertiary)",
                  fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                  transition: "all 0.15s ease",
                }}
              >
                <Bot size={14} /> i5 Copilot
              </button>

              <button
                onClick={() => setActiveRightTab("manual")}
                style={{
                  padding: "8px 0", borderRadius: "var(--radius-lg)", border: activeRightTab === "manual" ? "1px solid var(--border-color-strong)" : "none",
                  background: activeRightTab === "manual" ? "var(--bg-surface-overlay)" : "transparent",
                  color: activeRightTab === "manual" ? "var(--text-primary)" : "var(--text-tertiary)",
                  fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                  transition: "all 0.15s ease",
                }}
              >
                <Star size={14} /> Manual
              </button>
            </div>

            {/* ────────────────────────────────────────────────────────
                MODE 1: MANUAL TRADING TERMINAL (NEUTRAL BUTTONS)
               ──────────────────────────────────────────────────────── */}
            {activeRightTab === "manual" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Margin & Leverage selector */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <button style={{ padding: "9px 0", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color-strong)", background: "var(--bg-app)", color: "var(--text-primary)", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                    Cross
                  </button>
                  <button style={{ padding: "9px 0", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color-strong)", background: "var(--bg-app)", color: "var(--text-primary)", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                    10x
                  </button>
                </div>

                {/* Order Type Tabs */}
                <div style={{ display: "flex", gap: 16, borderBottom: "1px solid var(--border-color-default)", paddingBottom: 6 }}>
                  {(["MARKET", "LIMIT", "PRO ∨"] as const).map((ot) => (
                    <button
                      key={ot}
                      onClick={() => { if (ot === "MARKET" || ot === "LIMIT") setOrderType(ot); }}
                      style={{
                        background: "transparent", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700,
                        color: (orderType === "MARKET" && ot === "MARKET") || (orderType === "LIMIT" && ot === "LIMIT") ? "var(--text-primary)" : "var(--text-tertiary)",
                        borderBottom: (orderType === "MARKET" && ot === "MARKET") || (orderType === "LIMIT" && ot === "LIMIT") ? "2px solid var(--text-primary)" : "2px solid transparent",
                        paddingBottom: 4, letterSpacing: "0.05em",
                      }}
                    >
                      {ot}
                    </button>
                  ))}
                </div>

                {/* Balances */}
                <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 11, fontFamily: "var(--font-mono)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-tertiary)" }}>
                    <span>AVAILABLE TO TRADE</span>
                    <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>$0.00</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-tertiary)" }}>
                    <span>CURRENT POSITION</span>
                    <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>0 HYPE</span>
                  </div>
                </div>

                {/* Long / Short Buttons (Desaturated Neutral Styling) */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <button
                    onClick={() => setSide("Long")}
                    style={{
                      padding: "10px 0", borderRadius: "var(--radius-lg)",
                      border: side === "Long" ? "1px solid var(--border-color-strong)" : "1px solid var(--border-color-default)",
                      background: side === "Long" ? "var(--bg-surface-overlay)" : "var(--bg-app)",
                      color: side === "Long" ? "var(--text-primary)" : "var(--text-secondary)",
                      fontSize: 13, fontWeight: 700, cursor: "pointer",
                    }}
                  >
                    Long
                  </button>
                  <button
                    onClick={() => setSide("Short")}
                    style={{
                      padding: "10px 0", borderRadius: "var(--radius-lg)",
                      border: side === "Short" ? "1px solid var(--border-color-strong)" : "1px solid var(--border-color-default)",
                      background: side === "Short" ? "var(--bg-surface-overlay)" : "var(--bg-app)",
                      color: side === "Short" ? "var(--text-primary)" : "var(--text-secondary)",
                      fontSize: 13, fontWeight: 700, cursor: "pointer",
                    }}
                  >
                    Short
                  </button>
                </div>

                {/* Size Input Box */}
                <div style={{ background: "var(--bg-app)", border: "1px solid var(--border-color-strong)", borderRadius: "var(--radius-lg)", padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 600 }}>Size</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <input
                      type="text"
                      placeholder="0.00"
                      value={sizeInput}
                      onChange={(e) => setSizeInput(e.target.value)}
                      style={{ background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontSize: 14, fontWeight: 700, fontFamily: "var(--font-mono)", textAlign: "right", width: 80 }}
                    />
                    <span style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 600, borderLeft: "1px solid var(--border-color-default)", paddingLeft: 6 }}>USD ∨</span>
                  </div>
                </div>

                {/* Slider */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={sliderPct}
                    onChange={(e) => setSliderPct(Number(e.target.value))}
                    style={{ flex: 1, accentColor: "var(--text-primary)" }}
                  />
                  <span style={{ fontSize: 10, fontFamily: "var(--font-mono)", background: "var(--bg-app)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-sm)", padding: "3px 6px", color: "var(--text-secondary)" }}>
                    {sliderPct}%
                  </span>
                </div>

                {/* Checkbox */}
                <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--text-secondary)", cursor: "pointer" }}>
                  <input type="checkbox" checked={tpSlChecked} onChange={(e) => setTpSlChecked(e.target.checked)} style={{ accentColor: "var(--text-primary)" }} />
                  Take Profit / Stop Loss
                </label>

                {/* Action Button (Platinum White Fill with Dark Text) */}
                <button
                  style={{
                    width: "100%", padding: "12px 0", borderRadius: "var(--radius-xl)", border: "none",
                    background: "var(--button-primary-bg)",
                    color: "var(--button-primary-text)", fontSize: 13, fontWeight: 800, letterSpacing: "0.06em", cursor: "pointer",
                    boxShadow: "var(--shadow-md)",
                  }}
                >
                  {side === "Long" ? "LONG HYPE" : "SHORT HYPE"}
                </button>

                {/* Details Breakdown */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 10, fontFamily: "var(--font-mono)", marginTop: 2 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-tertiary)" }}>
                    <span>LIQUIDATION PRICE</span>
                    <span style={{ color: "var(--text-primary)" }}>N/A</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-tertiary)" }}>
                    <span>ORDER VALUE</span>
                    <span style={{ color: "var(--text-primary)" }}>$0.00</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-tertiary)" }}>
                    <span>MARGIN REQUIRED</span>
                    <span style={{ color: "var(--text-primary)" }}>$0.00</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-tertiary)" }}>
                    <span>SLIPPAGE</span>
                    <span style={{ color: "var(--red-500)" }}>Est: 0.00% / Max 8%</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-tertiary)" }}>
                    <span>FEES</span>
                    <span style={{ color: "var(--text-secondary)" }}>0.0450% / 0.0150%</span>
                  </div>
                </div>
              </div>
            )}

            {/* ────────────────────────────────────────────────────────
                MODE 2: i5 COPILOT CHAT ASSISTANT
               ──────────────────────────────────────────────────────── */}
            {activeRightTab === "copilot" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, overflow: "hidden" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <span style={{ fontSize: 10, fontWeight: 800, fontFamily: "var(--font-mono)", color: "var(--text-primary)", background: "var(--bg-surface-overlay)", border: "1px solid var(--border-color-strong)", borderRadius: "var(--radius-full)", padding: "3px 10px" }}>
                    ACTIVE SESSION
                  </span>
                </div>

                <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
                  {copilotMsgs.map((m) => (
                    <div key={m.id} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      {m.sender === "ai" && (
                        <div style={{ width: 26, height: 26, borderRadius: "var(--radius-md)", background: "var(--bg-surface-overlay)", border: "1px solid var(--border-color-strong)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-primary)", flexShrink: 0 }}>
                          <Bot size={14} />
                        </div>
                      )}
                      <div
                        style={{
                          background: m.sender === "ai" ? "var(--bg-app)" : "var(--bg-surface-overlay)",
                          border: "1px solid var(--border-color-strong)", borderRadius: "var(--radius-xl)",
                          padding: "8px 12px", fontSize: 11, lineHeight: 1.4, color: "var(--text-primary)", maxWidth: "85%",
                          marginLeft: m.sender === "user" ? "auto" : 0,
                        }}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ background: "var(--bg-app)", border: "1px solid var(--border-color-strong)", borderRadius: "var(--radius-xl)", padding: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: "var(--text-tertiary)", letterSpacing: "0.06em" }}>SETUP (OPTIONAL)</span>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                    <div>
                      <span style={{ fontSize: 8, color: "var(--text-tertiary)", display: "block", marginBottom: 2 }}>MARGIN</span>
                      <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-md)", padding: "4px 6px", fontSize: 10, fontWeight: 700, fontFamily: "var(--font-mono)" }}>$ 100</div>
                    </div>
                    <div>
                      <span style={{ fontSize: 8, color: "var(--text-tertiary)", display: "block", marginBottom: 2 }}>STYLE</span>
                      <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-md)", padding: "4px 6px", fontSize: 10, fontWeight: 700 }}>Day ∨</div>
                    </div>
                    <div>
                      <span style={{ fontSize: 8, color: "var(--text-tertiary)", display: "block", marginBottom: 2 }}>STRATEGY</span>
                      <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-md)", padding: "4px 6px", fontSize: 10, fontWeight: 700 }}>Max Gain ∨</div>
                    </div>
                  </div>
                </div>

                <div style={{ background: "var(--bg-app)", border: "1px solid var(--border-color-strong)", borderRadius: "var(--radius-xl)", padding: "6px 10px", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "var(--text-secondary)", display: "flex", alignItems: "center" }}><Sparkles size={14} /></span>
                  <input
                    type="text"
                    placeholder="Message AI..."
                    value={copilotInput}
                    onChange={(e) => setCopilotInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendCopilotMsg()}
                    style={{ background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontSize: 11, flex: 1 }}
                  />
                  <button onClick={handleSendCopilotMsg} style={{ background: "transparent", border: "none", color: "var(--text-primary)", cursor: "pointer", display: "flex", alignItems: "center" }}><Send size={14} /></button>
                </div>
              </div>
            )}

            {/* ────────────────────────────────────────────────────────
                MODE 3: i5 AUTOPILOT AUTOMATED EXECUTION (PLATINUM WHITE BUTTON)
               ──────────────────────────────────────────────────────── */}
            {activeRightTab === "autopilot" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, overflowY: "auto" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--bg-surface-overlay)", border: "1px solid var(--border-color-strong)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-primary)" }}>
                      <Bot size={16} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: 14, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.2 }}>i5 Autopilot</h3>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>Ready to execute</span>
                    </div>
                  </div>

                  <div style={{ background: "var(--bg-app)", border: "1px solid var(--border-color-strong)", borderRadius: "var(--radius-md)", padding: "4px 8px", display: "flex", flexDirection: "column", gap: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700 }}>
                      <span style={{ color: "#F59E0B" }}>₿</span> BTC
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "var(--emerald-500)" }}>Bullish 📈</span>
                  </div>
                </div>

                <div style={{ background: "var(--bg-app)", border: "1px solid var(--border-color-strong)", borderRadius: "var(--radius-xl)", padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: "var(--text-tertiary)", letterSpacing: "0.05em" }}> MISSION STATUS</div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "var(--text-primary)", background: "var(--bg-surface-overlay)", border: "1px solid var(--border-color-strong)", borderRadius: "var(--radius-full)", padding: "2px 6px" }}>
                      Favorable 🗸
                    </span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8, borderBottom: "1px solid var(--border-color-default)", paddingBottom: 8 }}>
                    <div>
                      <span style={{ fontSize: 8, color: "var(--text-tertiary)", display: "block" }}>Portfolio Balance</span>
                      <span style={{ fontSize: 12, fontWeight: 800, fontFamily: "var(--font-mono)" }}>$12,450.00</span>
                    </div>
                    <div>
                      <span style={{ fontSize: 8, color: "var(--text-tertiary)", display: "block" }}>Available to Trade</span>
                      <span style={{ fontSize: 12, fontWeight: 800, fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>$3,250.00</span>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
                    <div>
                      <span style={{ fontSize: 8, color: "var(--text-tertiary)", display: "block" }}>Expected Return</span>
                      <span style={{ fontSize: 13, fontWeight: 800, color: "var(--emerald-500)" }}>+12.8%</span>
                    </div>
                    <div>
                      <span style={{ fontSize: 8, color: "var(--text-tertiary)", display: "block" }}>Confidence</span>
                      <span style={{ fontSize: 12, fontWeight: 800, color: "var(--text-primary)" }}>87% High</span>
                    </div>
                  </div>
                </div>

                {/* Primary Autopilot Execution Button (Platinum White Fill with Dark Text — NO GREEN) */}
                <button
                  onClick={() => setAutopilotActive(!autopilotActive)}
                  style={{
                    width: "100%", padding: "14px 0", borderRadius: "var(--radius-xl)", border: "none",
                    background: autopilotActive ? "var(--red-600)" : "var(--button-primary-bg)",
                    color: autopilotActive ? "#ffffff" : "var(--button-primary-text)", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", gap: 2, boxShadow: "var(--shadow-md)",
                  }}
                >
                  <span>{autopilotActive ? "⏹ STOP AUTOPILOT" : "▶ ACTIVATE AI"}</span>
                  <span style={{ fontSize: 10, fontWeight: 500, opacity: 0.9 }}>
                    {autopilotActive ? "Click to halt automated execution" : "Start automated execution"}
                  </span>
                </button>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <button style={{ background: "var(--bg-app)", border: "1px solid var(--border-color-strong)", borderRadius: "var(--radius-lg)", padding: "8px 10px", color: "var(--text-primary)", cursor: "pointer", textAlign: "left" }}>
                    <div style={{ fontSize: 11, fontWeight: 700 }}>Add Funds</div>
                    <div style={{ fontSize: 9, color: "var(--text-tertiary)" }}>Deposit to start ›</div>
                  </button>

                  <button style={{ background: "var(--bg-app)", border: "1px solid var(--border-color-strong)", borderRadius: "var(--radius-lg)", padding: "8px 10px", color: "var(--text-primary)", cursor: "pointer", textAlign: "left" }}>
                    <div style={{ fontSize: 11, fontWeight: 700 }}>Settings</div>
                    <div style={{ fontSize: 9, color: "var(--text-tertiary)" }}>Preferences ›</div>
                  </button>
                </div>

                <div style={{ fontSize: 9, color: "var(--text-tertiary)", textAlign: "center", marginTop: "auto" }}>
                  ⚠️ AI-generated trade suggestions. Always review before execution.
                </div>
              </div>
            )}

          </div>
        )}

        {/* Floating Panel Toggle Drawer Button on Right Edge */}
        <button
          onClick={() => setIsTerminalOpen(!isTerminalOpen)}
          style={{
            position: "absolute", right: isTerminalOpen ? 368 : 12, top: 60, zIndex: 10,
            width: 32, height: 32, borderRadius: "50%", background: "var(--bg-surface-raised)",
            border: "1px solid var(--border-color-strong)", color: "var(--text-primary)",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            boxShadow: "var(--shadow-md)", transition: "right 0.2s ease",
          }}
          title={isTerminalOpen ? "Collapse Right Terminal Panel" : "Expand Right Terminal Panel"}
        >
          {isTerminalOpen ? <ChevronRight size={16} /> : <Settings size={16} />}
        </button>
      </div>

      {/* ──────────────────────────────────────────────────────────
          3. BOTTOM LIVE TICKER FOOTER BAR
         ────────────────────────────────────────────────────────── */}
      <div style={{ height: 30, background: "var(--bg-app)", borderTop: "1px solid var(--border-color-default)", display: "flex", alignItems: "center", gap: 16, padding: "0 14px", fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-tertiary)", overflowX: "auto", flexShrink: 0 }}>
        <span style={{ color: "var(--emerald-500)", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--emerald-500)" }} /> Connected
        </span>
        <span style={{ color: "var(--text-tertiary)" }}>%</span>
        {TICKER_BAR_ITEMS.map((item, idx) => (
          <div key={idx} style={{ display: "flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }}>
            <span style={{ color: item.isUp ? "var(--emerald-500)" : "var(--red-500)" }}>{item.isUp ? "🔺" : "🔻"}</span>
            <span style={{ color: "var(--text-secondary)" }}>{item.name}</span>
            <span style={{ color: item.isUp ? "var(--emerald-500)" : "var(--red-500)", fontWeight: 700 }}>{item.price}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
