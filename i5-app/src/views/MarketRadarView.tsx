"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Activity, Flame, TrendingUp, TrendingDown, BarChart3,
  Clock, Layers, Zap, AlertCircle, ChevronDown,
  RefreshCw, LayoutGrid, Filter, SlidersHorizontal,
  Search, X, Check,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   CONSTANTS & DATA
═══════════════════════════════════════════════════════════ */
export interface TokenItem {
  id: string;
  name: string;
  price: number;
  change: number;
  vol: string;
  category: "Layer 1" | "Layer 2" | "DeFi" | "Meme";
}

const ALL_TOKENS: TokenItem[] = [
  { id: "BTC",  name: "Bitcoin",     price: 81204,     change: +1.24, vol: "$2.1B",  category: "Layer 1" },
  { id: "ETH",  name: "Ethereum",    price: 3284,      change: -0.42, vol: "$824M",  category: "Layer 1" },
  { id: "SOL",  name: "Solana",      price: 145.3,     change: +2.87, vol: "$312M",  category: "Layer 1" },
  { id: "ARB",  name: "Arbitrum",    price: 0.122,     change: -1.12, vol: "$48M",   category: "Layer 2" },
  { id: "HYPE", name: "Hyperliquid", price: 42.56,     change: +0.63, vol: "$94M",   category: "DeFi" },
  { id: "DOGE", name: "Dogecoin",    price: 0.184,     change: +5.41, vol: "$180M",  category: "Meme" },
  { id: "XRP",  name: "Ripple",      price: 0.582,     change: +0.18, vol: "$240M",  category: "Layer 1" },
  { id: "SUI",  name: "Sui",         price: 1.94,      change: +4.12, vol: "$160M",  category: "Layer 1" },
  { id: "AVAX", name: "Avalanche",   price: 28.40,     change: -0.85, vol: "$95M",   category: "Layer 1" },
  { id: "LINK", name: "Chainlink",   price: 13.50,     change: +1.90, vol: "$72M",   category: "DeFi" },
  { id: "PEPE", name: "Pepe",        price: 0.0000094, change: +7.20, vol: "$210M", category: "Meme" },
  { id: "BNB",  name: "BNB",         price: 590.20,    change: +0.45, vol: "$350M",  category: "Layer 1" },
];

const ASSETS = ALL_TOKENS.slice(0, 5);

const TIME_FRAMES = ["1h", "4h", "12h", "24h", "48h", "7d"];
const EXCHANGES = ["All", "Binance", "Bybit", "OKX", "Hyperliquid", "Deribit"];

const DATA_TYPES = [
  { id: "liquidation", label: "Liquidation", color: "#e13b3b" },
  { id: "stoploss",    label: "Stop Loss",   color: "#F4C23A" },
  { id: "takeprofit",  label: "Take Profit", color: "#2fcb73" },
  { id: "limitorder",  label: "Limit Order", color: "#9480f4" },
];

const LIVE_FEED = [
  { id: 1, side: "Long",  asset: "BTC",  amount: "$2.4M",  exchange: "Binance",     time: "12s", flag: "🔥" },
  { id: 2, side: "Short", asset: "ETH",  amount: "$845K",  exchange: "Bybit",       time: "28s", flag: "" },
  { id: 3, side: "Long",  asset: "SOL",  amount: "$320K",  exchange: "OKX",         time: "1m",  flag: "" },
  { id: 4, side: "Long",  asset: "BTC",  amount: "$5.1M",  exchange: "Hyperliquid", time: "2m",  flag: "🔥" },
  { id: 5, side: "Short", asset: "ARB",  amount: "$125K",  exchange: "Binance",     time: "3m",  flag: "" },
  { id: 6, side: "Long",  asset: "HYPE", amount: "$210K",  exchange: "Bybit",       time: "4m",  flag: "" },
  { id: 7, side: "Short", asset: "BTC",  amount: "$1.8M",  exchange: "OKX",         time: "5m",  flag: "" },
  { id: 8, side: "Long",  asset: "ETH",  amount: "$670K",  exchange: "Binance",     time: "6m",  flag: "" },
];

/* ═══════════════════════════════════════════════════════════
   VIRIDIS COLORMAP (matching Coinglass exactly)
═══════════════════════════════════════════════════════════ */
function viridis(t: number): [number, number, number] {
  // Control points: dark purple → indigo → teal → green → yellow
  const stops: [number, [number,number,number]][] = [
    [0.00, [13,   2,  80]],  // darkest purple / near black
    [0.08, [68,   1,  84]],  // deep purple
    [0.20, [59,  82, 139]],  // blue-indigo
    [0.38, [33, 145, 140]],  // teal
    [0.60, [53, 183, 120]],  // green-teal
    [0.80, [94, 201,  98]],  // green
    [0.92, [190,220,  50]],  // yellow-green
    [1.00, [253,231,  37]],  // bright yellow
  ];
  const clamped = Math.max(0, Math.min(1, t));
  for (let i = 0; i < stops.length - 1; i++) {
    const [t0, c0] = stops[i];
    const [t1, c1] = stops[i + 1];
    if (clamped >= t0 && clamped <= t1) {
      const f = (clamped - t0) / (t1 - t0);
      return [
        Math.round(c0[0] + (c1[0] - c0[0]) * f),
        Math.round(c0[1] + (c1[1] - c0[1]) * f),
        Math.round(c0[2] + (c1[2] - c0[2]) * f),
      ];
    }
  }
  return stops[stops.length - 1][1];
}

/* ═══════════════════════════════════════════════════════════
   HEATMAP DATA GENERATOR
═══════════════════════════════════════════════════════════ */
interface HeatmapConfig {
  priceMin: number;
  priceMax: number;
  timeBuckets: number;
  priceBuckets: number;
  currentPrice: number;
}

function buildHeatmapData(cfg: HeatmapConfig): Float32Array {
  const { priceMin, priceMax, timeBuckets, priceBuckets, currentPrice } = cfg;
  const data = new Float32Array(timeBuckets * priceBuckets);

  // Major liquidation walls — relative bands across price spectrum
  const walls: Array<{ priceFrac: number; strength: number; widthFrac: number; timeDecay: boolean }> = [
    { priceFrac: 0.94, strength: 0.55, widthFrac: 0.015, timeDecay: false },
    { priceFrac: 0.88, strength: 0.72, widthFrac: 0.022, timeDecay: false },
    { priceFrac: 0.82, strength: 0.48, widthFrac: 0.018, timeDecay: false },
    { priceFrac: 0.77, strength: 0.88, widthFrac: 0.028, timeDecay: false },
    { priceFrac: 0.72, strength: 0.52, widthFrac: 0.020, timeDecay: false },
    { priceFrac: 0.67, strength: 0.40, widthFrac: 0.016, timeDecay: false },
    { priceFrac: 0.61, strength: 0.62, widthFrac: 0.022, timeDecay: true  },
    { priceFrac: 0.55, strength: 0.95, widthFrac: 0.035, timeDecay: false },
    { priceFrac: 0.51, strength: 0.75, widthFrac: 0.025, timeDecay: true  },
    { priceFrac: 0.45, strength: 0.60, widthFrac: 0.022, timeDecay: false },
    { priceFrac: 0.39, strength: 0.45, widthFrac: 0.018, timeDecay: false },
    { priceFrac: 0.32, strength: 0.90, widthFrac: 0.032, timeDecay: false },
    { priceFrac: 0.26, strength: 0.55, widthFrac: 0.020, timeDecay: false },
    { priceFrac: 0.21, strength: 0.35, widthFrac: 0.016, timeDecay: false },
    { priceFrac: 0.15, strength: 0.80, widthFrac: 0.028, timeDecay: false },
    { priceFrac: 0.09, strength: 0.40, widthFrac: 0.018, timeDecay: false },
    { priceFrac: 0.04, strength: 0.65, widthFrac: 0.022, timeDecay: false },
  ];

  for (const wall of walls) {
    const centerRow = (1 - wall.priceFrac) * priceBuckets; // invert: high price = top
    const halfWidthRows = wall.widthFrac * priceBuckets;

    for (let t = 0; t < timeBuckets; t++) {
      const timeNorm = t / timeBuckets;
      // walls get brighter toward recent time (right side)
      const timeMult = wall.timeDecay ? (0.4 + timeNorm * 0.6) : (0.6 + timeNorm * 0.4);

      for (let ri = 0; ri < priceBuckets; ri++) {
        const dist = Math.abs(ri - centerRow);
        if (dist > halfWidthRows * 2.5) continue;
        const gaussian = Math.exp(-(dist * dist) / (2 * halfWidthRows * halfWidthRows * 0.4));
        const intensity = wall.strength * gaussian * timeMult;
        const idx = t * priceBuckets + ri;
        data[idx] = Math.min(1, data[idx] + intensity);
      }
    }
  }

  // Add some noise / scatter
  for (let i = 0; i < data.length; i++) {
    data[i] = Math.min(1, data[i] + Math.random() * 0.04);
  }

  return data;
}

/* ═══════════════════════════════════════════════════════════
   PRICE LINE PATH GENERATOR
═══════════════════════════════════════════════════════════ */
function buildPricePath(
  timeBuckets: number,
  startPrice: number,
  currentPrice: number,
): number[] {
  // Generate a realistic-looking BTC price path
  const prices: number[] = [startPrice];
  const totalChange = currentPrice - startPrice;
  let price = startPrice;

  // Create segments with trends
  const segments = [
    { len: 0.15, drift: totalChange * 0.1 / timeBuckets,  vol: 80  },
    { len: 0.10, drift: totalChange * 0.05 / timeBuckets, vol: 120 },
    { len: 0.20, drift: totalChange * 0.3 / timeBuckets,  vol: 150 },
    { len: 0.15, drift: -totalChange * 0.1 / timeBuckets, vol: 100 },
    { len: 0.20, drift: totalChange * 0.4 / timeBuckets,  vol: 90  },
    { len: 0.20, drift: totalChange * 0.25 / timeBuckets, vol: 60  },
  ];

  let t = 0;
  for (const seg of segments) {
    const len = Math.round(seg.len * timeBuckets);
    for (let i = 0; i < len; i++) {
      price += seg.drift + (Math.random() - 0.5) * seg.vol * 2;
      prices.push(price);
      t++;
    }
  }

  // Fill remaining
  while (prices.length < timeBuckets) {
    price += (Math.random() - 0.5) * 100;
    prices.push(price);
  }

  return prices.slice(0, timeBuckets);
}

/* ═══════════════════════════════════════════════════════════
   CANVAS HEATMAP COMPONENT
═══════════════════════════════════════════════════════════ */
interface CanvasHeatmapProps {
  asset: typeof ASSETS[0];
  timeframe: string;
  threshold: number;
}

function CanvasHeatmap({ asset, timeframe, threshold }: CanvasHeatmapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  // Price range based on asset
  const priceRange = {
    BTC:  { min: 65000, max: 96000, start: 79000 },
    ETH:  { min: 2800,  max: 4200,  start: 3100  },
    SOL:  { min: 110,   max: 190,   start: 138   },
    ARB:  { min: 0.08,  max: 0.18,  start: 0.13  },
    HYPE: { min: 32,    max: 58,    start: 40    },
    BNB:  { min: 480,   max: 720,   start: 580   },
    AVAX: { min: 20,    max: 38,    start: 27    },
    LINK: { min: 9,     max: 18,    start: 13    },
    SUI:  { min: 1.2,   max: 2.8,   start: 1.9   },
    XRP:  { min: 0.42,  max: 0.78,  start: 0.57  },
    DOGE: { min: 0.12,  max: 0.26,  start: 0.18  },
    PEPE: { min: 0.000006, max: 0.000014, start: 0.000009 },
  }[asset.id] ?? {
    min: asset.price * 0.75,
    max: asset.price * 1.25,
    start: asset.price * 0.96,
  };

  const BUCKETS_T = 280; // time columns
  const BUCKETS_P = 320; // price rows

  const heatDataRef = useRef<Float32Array | null>(null);
  const pricePathRef = useRef<number[]>([]);

  useEffect(() => {
    heatDataRef.current = buildHeatmapData({
      priceMin: priceRange.min,
      priceMax: priceRange.max,
      timeBuckets: BUCKETS_T,
      priceBuckets: BUCKETS_P,
      currentPrice: asset.price,
    });
    pricePathRef.current = buildPricePath(BUCKETS_T, priceRange.start, asset.price);
  }, [asset.id, timeframe]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !heatDataRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const LEGEND_W = 44;
    const AXIS_R = 56;
    const chartW = W - LEGEND_W - AXIS_R;
    const chartH = H;

    // Clear
    ctx.fillStyle = "#0c0014";
    ctx.fillRect(0, 0, W, H);

    // ── Draw heatmap pixels ──────────────────────────────
    const imageData = ctx.createImageData(chartW, chartH);
    const pxData = imageData.data;
    const data = heatDataRef.current;

    for (let py = 0; py < chartH; py++) {
      for (let px = 0; px < chartW; px++) {
        // Map canvas pixel → bucket
        const ti = Math.floor((px / chartW) * BUCKETS_T);
        const pi = Math.floor((py / chartH) * BUCKETS_P);
        const bucketIdx = ti * BUCKETS_P + pi;
        const rawVal = data[bucketIdx] ?? 0;

        // Apply threshold masking (below threshold → very dark)
        const val = rawVal < threshold * 0.05
          ? rawVal * 0.15
          : rawVal;

        const [r, g, b] = viridis(val);
        const pixIdx = (py * chartW + px) * 4;
        pxData[pixIdx]     = r;
        pxData[pixIdx + 1] = g;
        pxData[pixIdx + 2] = b;
        pxData[pixIdx + 3] = 255;
      }
    }
    ctx.putImageData(imageData, LEGEND_W, 0);

    // ── Slight scanline vignette ─────────────────────────
    const vignette = ctx.createLinearGradient(LEGEND_W, 0, LEGEND_W + chartW, 0);
    vignette.addColorStop(0,   "rgba(0,0,0,0.55)");
    vignette.addColorStop(0.1, "rgba(0,0,0,0)");
    vignette.addColorStop(0.9, "rgba(0,0,0,0)");
    vignette.addColorStop(1,   "rgba(0,0,0,0.2)");
    ctx.fillStyle = vignette;
    ctx.fillRect(LEGEND_W, 0, chartW, chartH);

    // ── Price axis (right) ───────────────────────────────
    const priceMin = priceRange.min;
    const priceMax = priceRange.max;
    const priceStep =
      asset.id === "BTC" ? 5000 :
      asset.id === "ETH" ? 200 :
      asset.id === "BNB" ? 25 :
      asset.id === "SOL" ? 10 :
      asset.id === "HYPE" ? 5 :
      asset.id === "AVAX" ? 2 :
      asset.id === "LINK" ? 1 :
      asset.id === "SUI" ? 0.2 :
      asset.id === "XRP" ? 0.05 :
      asset.id === "DOGE" ? 0.02 :
      asset.id === "ARB" ? 0.02 :
      asset.id === "PEPE" ? 0.000001 :
      asset.price >= 1000 ? 100 :
      asset.price >= 100 ? 10 :
      asset.price >= 10 ? 1 :
      asset.price >= 1 ? 0.1 : 0.01;

    ctx.fillStyle = "#0c0014";
    ctx.fillRect(LEGEND_W + chartW, 0, AXIS_R, H);

    ctx.font = "10px 'SF Mono', 'Fira Code', monospace";
    ctx.textAlign = "left";
    ctx.fillStyle = "rgba(228,228,228,0.55)";

    let p = Math.ceil(priceMin / priceStep) * priceStep;
    while (p <= priceMax) {
      const y = ((priceMax - p) / (priceMax - priceMin)) * chartH;
      // Grid line
      ctx.strokeStyle = "rgba(228,228,228,0.07)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(LEGEND_W, y);
      ctx.lineTo(LEGEND_W + chartW, y);
      ctx.stroke();
      // Label
      const label = asset.id === "BTC" ? `${(p / 1000).toFixed(0)}k` :
                    asset.id === "ETH" || asset.id === "BNB" ? `${p.toFixed(0)}` :
                    p >= 1 ? `${p.toFixed(0)}` :
                    p >= 0.01 ? `${p.toFixed(2)}` : `${p.toFixed(6)}`;
      ctx.fillText(label, LEGEND_W + chartW + 6, y + 3.5);
      p += priceStep;
    }

    // ── Price line (orange-red candlestick path) ─────────
    const path = pricePathRef.current;
    if (path.length > 1) {
      // Glow pass
      ctx.save();
      ctx.shadowColor = "rgba(255,120,40,0.8)";
      ctx.shadowBlur = 8;
      ctx.strokeStyle = "rgba(255,140,60,0.9)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      path.forEach((price, i) => {
        const x = LEGEND_W + (i / BUCKETS_T) * chartW;
        const y = ((priceMax - price) / (priceMax - priceMin)) * chartH;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.restore();

      // Sharp line on top
      ctx.strokeStyle = "rgba(255,180,80,1)";
      ctx.lineWidth = 1;
      ctx.shadowBlur = 0;
      ctx.beginPath();
      path.forEach((price, i) => {
        const x = LEGEND_W + (i / BUCKETS_T) * chartW;
        const y = ((priceMax - price) / (priceMax - priceMin)) * chartH;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Current price dot + label
      const lastPrice = path[path.length - 1];
      const dotX = LEGEND_W + chartW - 2;
      const dotY = ((priceMax - lastPrice) / (priceMax - priceMin)) * chartH;
      // Horizontal dash to axis
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = "rgba(255,180,80,0.5)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(dotX, dotY);
      ctx.lineTo(LEGEND_W + chartW + AXIS_R, dotY);
      ctx.stroke();
      ctx.setLineDash([]);
      // Price tag
      ctx.fillStyle = "#ff9933";
      ctx.fillRect(LEGEND_W + chartW + 1, dotY - 8, AXIS_R - 2, 16);
      ctx.fillStyle = "#000";
      ctx.font = "bold 9px 'SF Mono', monospace";
      ctx.textAlign = "center";
      const tagLabel = asset.id === "BTC"
        ? `${Math.round(asset.price / 100) * 100}`
        : asset.id === "ETH" || asset.id === "BNB" ? `${Math.round(asset.price)}`
        : asset.price >= 10 ? `${asset.price.toFixed(1)}`
        : asset.price >= 1 ? `${asset.price.toFixed(2)}`
        : `${asset.price}`;
      ctx.fillText(tagLabel, LEGEND_W + chartW + AXIS_R / 2, dotY + 3.5);
      ctx.textAlign = "left";
      // Dot
      ctx.fillStyle = "#ffaa44";
      ctx.beginPath();
      ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // ── Left legend bar ──────────────────────────────────
    const legendGrad = ctx.createLinearGradient(0, 0, 0, H);
    // From top (highest = yellow) to bottom (lowest = dark purple)
    const stops = [0.0, 0.12, 0.25, 0.4, 0.55, 0.7, 0.85, 1.0];
    stops.forEach(s => {
      const [r, g, b] = viridis(1 - s);
      legendGrad.addColorStop(s, `rgb(${r},${g},${b})`);
    });
    const BAR_X = 8;
    const BAR_W = 14;
    ctx.fillStyle = legendGrad;
    ctx.fillRect(BAR_X, 10, BAR_W, H - 20);
    ctx.strokeStyle = "rgba(228,228,228,0.15)";
    ctx.lineWidth = 0.5;
    ctx.strokeRect(BAR_X, 10, BAR_W, H - 20);

    // Legend labels
    ctx.font = "9px 'SF Mono', monospace";
    ctx.textAlign = "right";
    ctx.fillStyle = "rgba(228,228,228,0.7)";
    ctx.fillText("1.05M", BAR_X + BAR_W + 18, 18);
    ctx.fillText("500K",  BAR_X + BAR_W + 18, Math.round(H * 0.33) + 4);
    ctx.fillText("100K",  BAR_X + BAR_W + 18, Math.round(H * 0.66) + 4);
    ctx.fillText("10K",   BAR_X + BAR_W + 18, H - 14);

  }, [asset, priceRange, threshold]);

  useEffect(() => {
    let animating = true;
    const loop = () => {
      if (!animating) return;
      draw();
    };
    loop();
    return () => { animating = false; cancelAnimationFrame(animFrameRef.current); };
  }, [draw]);

  // Handle resize
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

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════ */
function fmtPrice(p: number) {
  if (p >= 1000) return `$${p.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  if (p >= 1)    return `$${p.toFixed(2)}`;
  return `$${p.toFixed(4)}`;
}

function genLevels(basePrice: number, count: number, above: boolean) {
  return Array.from({ length: count }, (_, i) => {
    const offset = (i + 1) * (basePrice * 0.004 + Math.random() * basePrice * 0.004);
    const price = above ? basePrice + offset : basePrice - offset;
    const vol = Math.random() * 75 + 10;
    return { price, vol, isWall: vol > 58 };
  });
}

/* ═══════════════════════════════════════════════════════════
   CLUSTER VIEW (pair mode)
═══════════════════════════════════════════════════════════ */
function ClusterView({ asset }: { asset: typeof ASSETS[0] }) {
  const sell = genLevels(asset.price, 9, true).sort((a, b) => b.price - a.price);
  const buy  = genLevels(asset.price, 9, false);
  const maxVol = Math.max(...sell.map(l => l.vol), ...buy.map(l => l.vol));

  const Bar = ({ level, side }: { level: typeof sell[0]; side: "sell" | "buy" }) => {
    const isSell = side === "sell";
    const pct = (level.vol / maxVol) * 100;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 90, fontSize: 10, color: "var(--text-tertiary)", fontFamily: "var(--font-mono)", textAlign: "right", flexShrink: 0 }}>
          {fmtPrice(level.price)}
        </div>
        <div style={{ flex: 1, height: 18, background: "var(--bg-surface-overlay)", borderRadius: "var(--radius-sm)", overflow: "hidden", position: "relative" }}>
          <div style={{
            position: "absolute", [isSell ? "right" : "left"]: 0, top: 0, bottom: 0,
            width: `${pct}%`,
            background: isSell
              ? level.isWall ? "rgba(47,203,115,0.42)" : "rgba(47,203,115,0.18)"
              : level.isWall ? "rgba(225,59,59,0.42)"  : "rgba(225,59,59,0.18)",
            borderLeft:  isSell  ? "2px solid rgba(47,203,115,0.75)" : "none",
            borderRight: !isSell ? "2px solid rgba(225,59,59,0.75)"  : "none",
          }} />
          {level.isWall && (
            <div style={{
              position: "absolute", [isSell ? "right" : "left"]: 5,
              top: "50%", transform: "translateY(-50%)",
              fontSize: 8, fontWeight: 700, letterSpacing: "0.05em",
              color: isSell ? "#2fcb73" : "#e13b3b",
            }}>WALL</div>
          )}
        </div>
        <div style={{ width: 54, fontSize: 10, fontFamily: "var(--font-mono)", textAlign: "right", flexShrink: 0, color: isSell ? "#2fcb73" : "#e13b3b" }}>
          ${level.vol.toFixed(1)}M
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <div style={{ fontSize: 9, fontWeight: 600, color: "#2fcb73", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 5, display: "flex" }}>
        ↑ Short Liquidations · Above Price
        <span style={{ marginLeft: "auto", color: "var(--text-tertiary)", fontWeight: 400, textTransform: "none" }}>Bars grow right→</span>
      </div>
      {sell.map((l, i) => <Bar key={i} level={l} side="sell" />)}
      <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "8px 0" }}>
        <div style={{ flex: 1, height: 1, background: "rgba(228,228,228,0.15)" }} />
        <div style={{
          fontSize: 12, fontWeight: 700, fontFamily: "var(--font-mono)",
          padding: "5px 14px", background: "var(--bg-surface-overlay)",
          borderRadius: "var(--radius-md)", border: "1px solid rgba(228,228,228,0.20)",
          whiteSpace: "nowrap", color: "var(--text-primary)",
        }}>
          ⊙ {fmtPrice(asset.price)}
          <span style={{ marginLeft: 8, fontSize: 11, color: asset.change >= 0 ? "#2fcb73" : "#e13b3b" }}>
            {asset.change >= 0 ? "▲" : "▼"} {Math.abs(asset.change)}%
          </span>
        </div>
        <div style={{ flex: 1, height: 1, background: "rgba(228,228,228,0.15)" }} />
      </div>
      <div style={{ fontSize: 9, fontWeight: 600, color: "#e13b3b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 5, display: "flex" }}>
        ↓ Long Liquidations · Below Price
        <span style={{ marginLeft: "auto", color: "var(--text-tertiary)", fontWeight: 400, textTransform: "none" }}>Bars grow left←</span>
      </div>
      {buy.map((l, i) => <Bar key={i} level={l} side="buy" />)}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DEPTH VIEW
═══════════════════════════════════════════════════════════ */
function DepthView({ asset }: { asset: typeof ASSETS[0] }) {
  const sell = genLevels(asset.price, 12, true);
  const buy  = genLevels(asset.price, 12, false);
  const maxVol = Math.max(...sell.map(l => l.vol), ...buy.map(l => l.vol));
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: 340, background: "var(--bg-surface-overlay)", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--border-color-default)" }}>
      <div style={{ padding: "14px 12px", borderRight: "1px solid var(--border-color-default)" }}>
        <div style={{ fontSize: 9, fontWeight: 600, color: "#2fcb73", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.07em" }}>Short Liq / Above</div>
        {sell.map((l, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
            <div style={{ height: 14, borderRadius: 3, background: "rgba(47,203,115,0.25)", borderRight: "2px solid rgba(47,203,115,0.7)", width: `${(l.vol / maxVol) * 100}%`, maxWidth: "100%", minWidth: 4 }} />
            <span style={{ fontSize: 9, color: "#2fcb73", fontFamily: "var(--font-mono)", whiteSpace: "nowrap" }}>${l.vol.toFixed(0)}M</span>
          </div>
        ))}
      </div>
      <div style={{ padding: "14px 12px" }}>
        <div style={{ fontSize: 9, fontWeight: 600, color: "#e13b3b", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.07em" }}>Long Liq / Below</div>
        {buy.map((l, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
            <div style={{ height: 14, borderRadius: 3, background: "rgba(225,59,59,0.25)", borderLeft: "2px solid rgba(225,59,59,0.7)", width: `${(l.vol / maxVol) * 100}%`, maxWidth: "100%", minWidth: 4 }} />
            <span style={{ fontSize: 9, color: "#e13b3b", fontFamily: "var(--font-mono)", whiteSpace: "nowrap" }}>${l.vol.toFixed(0)}M</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ASSET CARD
═══════════════════════════════════════════════════════════ */
function AssetCard({ a, selected, onClick }: { a: typeof ASSETS[0]; selected: boolean; onClick: () => void }) {
  const up = a.change >= 0;
  return (
    <button onClick={onClick} style={{
      display: "flex", flexDirection: "column", gap: 2,
      padding: "7px 11px", borderRadius: "var(--radius-lg)", cursor: "pointer",
      border: `1px solid ${selected ? "rgba(228,228,228,0.28)" : "var(--border-color-default)"}`,
      background: selected ? "var(--bg-surface-overlay)" : "var(--bg-surface)",
      transition: "all 0.15s ease", minWidth: 68, textAlign: "left",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 5 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>{a.id}</span>
        <span style={{
          fontSize: 8, fontWeight: 600, padding: "1px 4px", borderRadius: "var(--radius-sm)",
          background: up ? "rgba(47,203,115,0.12)" : "rgba(225,59,59,0.12)",
          color: up ? "#2fcb73" : "#e13b3b",
        }}>
          {up ? "▲" : "▼"} {Math.abs(a.change)}%
        </span>
      </div>
      <span style={{ fontSize: 9, color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}>{fmtPrice(a.price)}</span>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN VIEW
═══════════════════════════════════════════════════════════ */
export default function MarketRadarView() {
  const [asset, setAsset]           = useState(ASSETS[0]);
  const [tf, setTf]                 = useState("48h");
  const [viewMode, setViewMode]     = useState("heatmap"); // default = heatmap
  const [dataType, setDataType]     = useState("liquidation");
  const [exchange, setExchange]     = useState("Binance");
  const [feed, setFeed]             = useState(LIVE_FEED);
  const [flashId, setFlashId]       = useState<number | null>(null);
  const [countdown, setCountdown]   = useState(4);
  const [exOpen, setExOpen]         = useState(false);
  const [threshold, setThreshold]   = useState(0.9);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"All" | "Layer 1" | "Layer 2" | "DeFi" | "Meme">("All");
  const searchRef                   = useRef<HTMLDivElement>(null);
  const searchInputRef              = useRef<HTMLInputElement>(null);
  const exRef                       = useRef<HTMLDivElement>(null);
  const intervalRef                 = useRef<ReturnType<typeof setInterval> | null>(null);

  const filteredTokens = ALL_TOKENS.filter(t => {
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q || t.id.toLowerCase().includes(q) || t.name.toLowerCase().includes(q);
    const matchesCat = categoryFilter === "All" || t.category === categoryFilter;
    return matchesQuery && matchesCat;
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 40);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setExOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
      if (exRef.current && !exRef.current.contains(e.target as Node)) {
        setExOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          const sides  = ["Long", "Short"] as const;
          const aIds   = ["BTC", "ETH", "SOL", "HYPE"];
          const exs    = ["Binance", "Bybit", "OKX", "Hyperliquid"];
          const amts   = ["$180K", "$540K", "$1.2M", "$3.4M", "$720K", "$290K"];
          const side   = sides[Math.floor(Math.random() * 2)];
          const aId    = aIds[Math.floor(Math.random() * 4)];
          const amt    = amts[Math.floor(Math.random() * 6)];
          const ex     = exs[Math.floor(Math.random() * 4)];
          const newId  = Date.now();
          setFlashId(newId);
          setFeed(f => [{ id: newId, side, asset: aId, amount: amt, exchange: ex, time: "0s", flag: "" }, ...f.slice(0, 7)]);
          setTimeout(() => setFlashId(null), 900);
          return 4;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  /* Style helpers */
  const tfBtn = (id: string): React.CSSProperties => ({
    padding: "4px 10px", borderRadius: "var(--radius-md)", cursor: "pointer",
    background: tf === id ? "var(--bg-surface)" : "transparent",
    color: tf === id ? "var(--text-primary)" : "var(--text-tertiary)",
    fontSize: 11, fontWeight: tf === id ? 700 : 400, border: "none",
    fontFamily: "var(--font-mono)", transition: "all 0.15s ease",
  });

  const vmBtn = (id: string): React.CSSProperties => ({
    display: "flex", alignItems: "center", gap: 5,
    padding: "5px 10px", borderRadius: "var(--radius-sm)", border: "none",
    background: viewMode === id ? "var(--bg-surface)" : "transparent",
    color: viewMode === id ? "var(--text-primary)" : "var(--text-tertiary)",
    fontSize: 11, fontWeight: viewMode === id ? 600 : 400, cursor: "pointer",
    transition: "all 0.15s ease",
  });

  const VIEW_MODES = [
    { id: "heatmap", label: "Heatmap", icon: Layers },
    { id: "pair",    label: "Cluster", icon: LayoutGrid },
    { id: "depth",   label: "Depth",   icon: BarChart3 },
  ];

  return (
    <div style={{ height: "100%", overflowY: "auto", background: "var(--bg-app)", color: "var(--text-primary)", padding: "14px 18px 28px", fontFamily: "var(--font-sans)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>

        {/* ── HEADER ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: "var(--radius-md)", background: "linear-gradient(135deg,rgba(225,59,59,0.22),rgba(47,203,115,0.10))", border: "1px solid rgba(225,59,59,0.30)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Activity size={15} color="#e13b3b" />
            </div>
            <div>
              <h1 style={{ fontSize: 16, fontWeight: 700, margin: 0, letterSpacing: "-0.01em" }}>Market Radar</h1>
              <p style={{ fontSize: 10, color: "var(--text-tertiary)", margin: 0 }}>Liquidation Heatmap · Stop Hunts · Order Walls</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: "var(--radius-full)", background: "rgba(47,203,115,0.08)", border: "1px solid rgba(47,203,115,0.20)" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#2fcb73", boxShadow: "0 0 6px #2fcb73", animation: "mrPulse 1.5s ease-in-out infinite" }} />
              <span style={{ fontSize: 10, color: "#2fcb73", fontWeight: 600 }}>LIVE · {countdown}s</span>
            </div>
            <button style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: "var(--radius-md)", background: "var(--bg-surface-overlay)", border: "1px solid var(--border-color-default)", cursor: "pointer", fontSize: 10, color: "var(--text-secondary)" }}>
              <RefreshCw size={10} /> Refresh
            </button>
          </div>
        </div>

        {/* ── STAT CARDS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
          {([
            { label: "Total Liquidated 24H", value: "$284.5M", sub: "+12.4% vs yesterday", icon: Flame,       ci: "#F4C23A" },
            { label: "Long Liquidations",    value: "$198.2M", sub: "69.7% of total",      icon: TrendingDown, ci: "#e13b3b" },
            { label: "Short Liquidations",   value: "$86.3M",  sub: "30.3% of total",      icon: TrendingUp,   ci: "#2fcb73" },
            { label: "Largest Single Liq",   value: "$12.4M",  sub: "BTC · Binance",       icon: Zap,          ci: "#9480f4" },
          ] as const).map(({ label, value, sub, icon: Icon, ci }) => (
            <div key={label} style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-lg)", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: "var(--radius-md)", flexShrink: 0, background: `${ci}18`, border: `1px solid ${ci}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={13} color={ci} />
              </div>
              <div>
                <div style={{ fontSize: 9, color: "var(--text-tertiary)", marginBottom: 1 }}>{label}</div>
                <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "var(--font-mono)" }}>{value}</div>
                <div style={{ fontSize: 9, color: "var(--text-disabled)", marginTop: 1 }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── MAIN CONTENT: HEATMAP PANEL (full-width) + sidebar ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 12, alignItems: "start" }}>

          {/* LEFT: Main chart area */}
          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>

            {/* Panel Toolbar */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderBottom: "1px solid var(--border-color-default)", flexWrap: "wrap" }}>
              {/* Asset pills */}
              <div style={{ display: "flex", gap: 5 }}>
                {ASSETS.map(a => <AssetCard key={a.id} a={a} selected={asset.id === a.id} onClick={() => setAsset(a)} />)}
              </div>
              {/* Divider */}
              <div style={{ width: 1, height: 32, background: "var(--border-color-default)", flexShrink: 0 }} />
              {/* Token Search Bar (Look like search bar with token name shown) */}
              <div ref={searchRef} style={{ position: "relative" }}>
                <div
                  onClick={() => {
                    setSearchOpen(true);
                    setTimeout(() => searchInputRef.current?.focus(), 30);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    height: 32,
                    padding: "0 10px",
                    background: searchOpen ? "var(--bg-surface-raised)" : "var(--bg-surface-overlay)",
                    border: searchOpen ? "1px solid var(--border-color-strong)" : "1px solid var(--border-color-default)",
                    borderRadius: "var(--radius-md)",
                    cursor: "pointer",
                    boxShadow: searchOpen ? "0 0 0 1px var(--border-color-strong), 0 4px 12px rgba(0,0,0,0.35)" : "none",
                    transition: "all 0.15s ease",
                    minWidth: 225,
                  }}
                  title="Search tokens (⌘K)"
                >
                  <Search size={13} style={{ color: searchOpen ? "var(--text-primary)" : "var(--text-tertiary)", flexShrink: 0 }} />

                  {searchOpen ? (
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder={`Search token (e.g. ${asset.id}, SOL, DOGE)...`}
                      style={{
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        fontSize: 11.5,
                        fontWeight: 500,
                        color: "var(--text-primary)",
                        width: "100%",
                        padding: 0,
                        fontFamily: "var(--font-sans)",
                      }}
                      autoFocus
                    />
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: 5, flex: 1, userSelect: "none" }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
                        {asset.id}/USDT
                      </span>
                      <span style={{
                        fontSize: 9,
                        fontWeight: 600,
                        color: "var(--text-tertiary)",
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        padding: "1px 5px",
                        borderRadius: 3,
                        letterSpacing: "0.03em"
                      }}>
                        Perpetual
                      </span>
                    </div>
                  )}

                  {/* Right: Shortcut & Chevron / Clear */}
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginLeft: "auto", flexShrink: 0 }}>
                    {searchOpen && searchQuery ? (
                      <button
                        onClick={(e) => { e.stopPropagation(); setSearchQuery(""); searchInputRef.current?.focus(); }}
                        style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", color: "var(--text-tertiary)" }}
                      >
                        <X size={12} />
                      </button>
                    ) : (
                      <>
                        <span style={{
                          fontSize: 9,
                          fontFamily: "var(--font-mono)",
                          color: "var(--text-disabled)",
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid var(--border-color-default)",
                          padding: "1px 4px",
                          borderRadius: 3,
                          lineHeight: "12px",
                        }}>
                          ⌘K
                        </span>
                        <ChevronDown
                          size={11}
                          style={{
                            color: "var(--text-tertiary)",
                            transform: searchOpen ? "rotate(180deg)" : "none",
                            transition: "transform 0.15s ease",
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>

                {/* Dropdown for Token Search */}
                {searchOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 5px)",
                      left: 0,
                      zIndex: 1000,
                      width: 320,
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border-color-default)",
                      borderRadius: "var(--radius-lg)",
                      boxShadow: "0 16px 36px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
                      overflow: "hidden",
                    }}
                  >
                    {/* Category filter tabs */}
                    <div style={{ display: "flex", gap: 4, padding: "8px 10px", borderBottom: "1px solid var(--border-color-default)", background: "rgba(255,255,255,0.01)" }}>
                      {(["All", "Layer 1", "Layer 2", "DeFi", "Meme"] as const).map(cat => (
                        <button
                          key={cat}
                          onClick={(e) => { e.stopPropagation(); setCategoryFilter(cat); }}
                          style={{
                            padding: "3px 8px",
                            fontSize: 10,
                            fontWeight: 500,
                            borderRadius: "var(--radius-sm)",
                            border: "none",
                            cursor: "pointer",
                            background: categoryFilter === cat ? "var(--bg-surface-overlay)" : "transparent",
                            color: categoryFilter === cat ? "var(--text-primary)" : "var(--text-tertiary)",
                            transition: "all 0.1s ease",
                          }}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    {/* Token List */}
                    <div style={{ maxHeight: 250, overflowY: "auto", padding: "4px" }}>
                      {filteredTokens.length === 0 ? (
                        <div style={{ padding: "16px 12px", textAlign: "center", fontSize: 11, color: "var(--text-tertiary)" }}>
                          No perpetual pairs found for "{searchQuery}"
                        </div>
                      ) : (
                        filteredTokens.map(t => {
                          const isSelected = asset.id === t.id;
                          return (
                            <div
                              key={t.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                setAsset(t);
                                setSearchOpen(false);
                                setSearchQuery("");
                              }}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "7px 10px",
                                borderRadius: "var(--radius-md)",
                                cursor: "pointer",
                                background: isSelected ? "var(--bg-surface-overlay)" : "transparent",
                                transition: "background 0.1s ease",
                              }}
                              onMouseEnter={e => { if (!isSelected) (e.currentTarget.style.background = "rgba(255,255,255,0.03)"); }}
                              onMouseLeave={e => { if (!isSelected) (e.currentTarget.style.background = "transparent"); }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <div style={{
                                  width: 24,
                                  height: 24,
                                  borderRadius: "50%",
                                  background: isSelected ? "var(--brand-primary, #9480f4)" : "var(--bg-surface-raised)",
                                  border: "1px solid var(--border-color-default)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: 9,
                                  fontWeight: 800,
                                  color: isSelected ? "#fff" : "var(--text-secondary)",
                                }}>
                                  {t.id.slice(0, 3)}
                                </div>
                                <div>
                                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)" }}>{t.id}</span>
                                    <span style={{ fontSize: 10, color: "var(--text-tertiary)" }}>/USDT</span>
                                    <span style={{ fontSize: 8.5, color: "var(--text-disabled)", background: "rgba(255,255,255,0.04)", padding: "1px 3px", borderRadius: 2 }}>PERP</span>
                                    {isSelected && <Check size={11} color="#2fcb73" style={{ marginLeft: 3 }} />}
                                  </div>
                                  <div style={{ fontSize: 9.5, color: "var(--text-tertiary)" }}>{t.name} · Vol {t.vol}</div>
                                </div>
                              </div>

                              <div style={{ textAlign: "right" }}>
                                <div style={{ fontSize: 11.5, fontWeight: 600, fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>
                                  {fmtPrice(t.price)}
                                </div>
                                <div style={{ fontSize: 9.5, fontFamily: "var(--font-mono)", color: t.change >= 0 ? "#2fcb73" : "#e13b3b" }}>
                                  {t.change >= 0 ? "+" : ""}{t.change.toFixed(2)}%
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Dot Separator */}
              <span style={{ fontSize: 10, color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}>·</span>

              {/* Exchange selector */}
              <div ref={exRef} style={{ position: "relative" }}>
                <button
                  onClick={() => setExOpen(o => !o)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    height: 32,
                    padding: "0 10px",
                    borderRadius: "var(--radius-md)",
                    background: "var(--bg-surface-overlay)",
                    border: "1px solid var(--border-color-default)",
                    cursor: "pointer",
                    fontSize: 11,
                    fontWeight: 500,
                    color: "var(--text-secondary)",
                    transition: "all 0.15s ease",
                  }}
                >
                  {exchange} <ChevronDown size={10} style={{ transform: exOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
                </button>
                {exOpen && (
                  <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 200, background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-lg)", minWidth: 120, overflow: "hidden" }}>
                    {EXCHANGES.map(ex => (
                      <button key={ex} onClick={() => { setExchange(ex); setExOpen(false); }} style={{ display: "block", width: "100%", padding: "7px 12px", textAlign: "left", fontSize: 11, cursor: "pointer", border: "none", background: exchange === ex ? "var(--bg-surface-overlay)" : "transparent", color: exchange === ex ? "var(--text-primary)" : "var(--text-secondary)", transition: "background 0.1s" }}>
                        {ex}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {/* Timeframe */}
              <div style={{ display: "flex", background: "var(--bg-surface-overlay)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-md)", padding: 2 }}>
                {["1h","4h","12h","24h","48h","7d"].map(t => <button key={t} style={tfBtn(t)} onClick={() => setTf(t)}>{t}</button>)}
              </div>
              {/* View mode */}
              <div style={{ marginLeft: "auto", display: "flex", background: "var(--bg-surface-overlay)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-md)", padding: 2 }}>
                {VIEW_MODES.map(vm => {
                  const Icon = vm.icon;
                  return <button key={vm.id} style={vmBtn(vm.id)} onClick={() => setViewMode(vm.id)}><Icon size={11} />{vm.label}</button>;
                })}
              </div>
            </div>

            {/* Data type + threshold row (only for heatmap) */}
            {viewMode === "heatmap" && (
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", borderBottom: "1px solid var(--border-color-default)", flexWrap: "wrap" }}>
                {/* Color mode swatches */}
                <div style={{ display: "flex", gap: 5 }}>
                  {[
                    { gradient: "linear-gradient(90deg,#440154,#31688e,#35b779,#fde725)", active: dataType === "liquidation" },
                    { gradient: "linear-gradient(90deg,#0d0221,#6d23b6,#c77dff)", active: dataType === "stoploss" },
                    { gradient: "linear-gradient(90deg,#023020,#2d6a4f,#52b788)", active: dataType === "takeprofit" },
                    { gradient: "linear-gradient(90deg,#180040,#5a0080,#b000e0)", active: dataType === "limitorder" },
                  ].map((sw, i) => (
                    <div
                      key={i}
                      onClick={() => setDataType(["liquidation","stoploss","takeprofit","limitorder"][i])}
                      style={{
                        width: 28, height: 16, borderRadius: 4, cursor: "pointer",
                        background: sw.gradient,
                        border: sw.active ? "2px solid rgba(228,228,228,0.7)" : "1px solid rgba(228,228,228,0.15)",
                      }}
                    />
                  ))}
                </div>
                {/* Liquidity threshold slider */}
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginLeft: 4 }}>
                  <SlidersHorizontal size={11} color="var(--text-tertiary)" />
                  <span style={{ fontSize: 10, color: "var(--text-tertiary)", whiteSpace: "nowrap" }}>
                    Liquidity Threshold = <span style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>{threshold.toFixed(1)}</span>
                  </span>
                  <input
                    type="range" min={0} max={1} step={0.05} value={threshold}
                    onChange={e => setThreshold(parseFloat(e.target.value))}
                    style={{ width: 100, accentColor: "#2fcb73", cursor: "pointer" }}
                  />
                </div>
              </div>
            )}

            {/* Chart body */}
            <div style={{
              height: viewMode === "heatmap" ? 460 : "auto",
              position: "relative",
              background: viewMode === "heatmap" ? "#0c0014" : "transparent",
            }}>
              {viewMode === "heatmap" ? (
                <CanvasHeatmap asset={asset} timeframe={tf} threshold={threshold} />
              ) : viewMode === "depth" ? (
                <div style={{ padding: "14px 16px" }}><DepthView asset={asset} /></div>
              ) : (
                <div style={{ padding: "14px 16px" }}><ClusterView asset={asset} /></div>
              )}
            </div>

            {/* Bottom: exchange breakdown */}
            <div style={{ padding: "12px 14px", borderTop: "1px solid var(--border-color-default)" }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: "var(--text-tertiary)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                Exchange Breakdown · {asset.id}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
                {[
                  { name: "Binance",     long: 68, short: 32, total: "$114M" },
                  { name: "Bybit",       long: 55, short: 45, total: "$72M"  },
                  { name: "OKX",         long: 72, short: 28, total: "$49M"  },
                  { name: "Hyperliquid", long: 48, short: 52, total: "$32M"  },
                  { name: "Deribit",     long: 38, short: 62, total: "$18M"  },
                ].map(ex => (
                  <div key={ex.name} style={{ background: "var(--bg-surface-overlay)", borderRadius: "var(--radius-lg)", padding: "9px 11px", border: "1px solid var(--border-color-default)" }}>
                    <div style={{ fontSize: 9, fontWeight: 700, marginBottom: 3 }}>{ex.name}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, fontFamily: "var(--font-mono)", marginBottom: 6 }}>{ex.total}</div>
                    <div style={{ height: 3, borderRadius: 2, overflow: "hidden", display: "flex", marginBottom: 4 }}>
                      <div style={{ width: `${ex.long}%`, background: "#e13b3b" }} />
                      <div style={{ width: `${ex.short}%`, background: "#2fcb73" }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 8 }}>
                      <span style={{ color: "#e13b3b" }}>L {ex.long}%</span>
                      <span style={{ color: "#2fcb73" }}>S {ex.short}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

            {/* Live Feed */}
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 12px", borderBottom: "1px solid var(--border-color-default)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#e13b3b", boxShadow: "0 0 5px #e13b3b", animation: "mrPulse 1.2s ease-in-out infinite" }} />
                  <span style={{ fontSize: 11, fontWeight: 700 }}>Live Feed</span>
                </div>
                <span style={{ fontSize: 9, color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}>All pairs</span>
              </div>
              <div style={{ padding: "7px", display: "flex", flexDirection: "column", gap: 4 }}>
                {feed.map(liq => {
                  const isLong = liq.side === "Long";
                  const isNew  = liq.id === flashId;
                  return (
                    <div key={liq.id} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "7px 9px",
                      background: isNew ? (isLong ? "rgba(225,59,59,0.10)" : "rgba(47,203,115,0.10)") : "var(--bg-surface-raised)",
                      border: `1px solid ${isLong ? "rgba(225,59,59,0.18)" : "rgba(47,203,115,0.18)"}`,
                      borderRadius: "var(--radius-md)", gap: 6, transition: "background 0.8s ease",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <div style={{ fontSize: 8, fontWeight: 700, padding: "2px 5px", borderRadius: "var(--radius-sm)", background: isLong ? "rgba(225,59,59,0.15)" : "rgba(47,203,115,0.15)", color: isLong ? "#e13b3b" : "#2fcb73" }}>
                          {liq.side.toUpperCase()}
                        </div>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                            <span style={{ fontSize: 11, fontWeight: 700 }}>{liq.asset}</span>
                            {liq.flag && <span style={{ fontSize: 9 }}>{liq.flag}</span>}
                          </div>
                          <div style={{ fontSize: 9, color: "var(--text-tertiary)" }}>{liq.exchange}</div>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 11, fontWeight: 700, fontFamily: "var(--font-mono)", color: isLong ? "#e13b3b" : "#2fcb73" }}>{liq.amount}</div>
                        <div style={{ fontSize: 9, color: "var(--text-tertiary)" }}>{liq.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 24H Summary */}
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-xl)", padding: "11px 13px" }}>
              <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 9, display: "flex", alignItems: "center", gap: 5 }}>
                <Clock size={11} color="var(--text-tertiary)" /> 24H Summary · {asset.id}
              </div>
              {[
                { label: "Total Liquidated", value: "$284.5M", sub: "All exchanges",  c: "var(--text-primary)" },
                { label: "Long Liq",         value: "$198.2M", sub: "69.7%",          c: "#e13b3b" },
                { label: "Short Liq",        value: "$86.3M",  sub: "30.3%",          c: "#2fcb73" },
                { label: "Largest",          value: "$12.4M",  sub: "BTC · Binance",  c: "#F4C23A" },
                { label: "Events",           value: "4,821",   sub: "All pairs",       c: "var(--text-secondary)" },
              ].map(st => (
                <div key={st.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", borderBottom: "1px solid var(--border-color-default)" }}>
                  <div>
                    <div style={{ fontSize: 10, color: "var(--text-tertiary)" }}>{st.label}</div>
                    <div style={{ fontSize: 8, color: "var(--text-disabled)", marginTop: 1 }}>{st.sub}</div>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, fontFamily: "var(--font-mono)", color: st.c }}>{st.value}</span>
                </div>
              ))}
            </div>

            {/* Alert */}
            <div style={{ display: "flex", gap: 8, padding: "9px 11px", background: "rgba(244,194,58,0.06)", border: "1px solid rgba(244,194,58,0.22)", borderRadius: "var(--radius-lg)" }}>
              <AlertCircle size={13} color="#F4C23A" style={{ flexShrink: 0, marginTop: 1 }} />
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#F4C23A", marginBottom: 2 }}>High-Density Cluster</div>
                <div style={{ fontSize: 9, color: "var(--text-tertiary)", lineHeight: 1.5 }}>
                  {asset.id === "BTC" ? "$80,000" : asset.id === "ETH" ? "$3,450" : "$152.00"} holds{" "}
                  ${asset.id === "BTC" ? "142M" : "38M"} in stacked liquidations. Price approaching.
                </div>
              </div>
            </div>

            {/* Data type filter */}
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color-default)", borderRadius: "var(--radius-xl)", padding: "11px 13px" }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: "var(--text-tertiary)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.07em" }}>Data Type</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {DATA_TYPES.map(d => (
                  <button key={d.id} onClick={() => setDataType(d.id)} style={{
                    display: "flex", alignItems: "center", gap: 8, padding: "6px 10px",
                    borderRadius: "var(--radius-md)", cursor: "pointer",
                    background: dataType === d.id ? `${d.color}12` : "transparent",
                    border: `1px solid ${dataType === d.id ? `${d.color}40` : "transparent"}`,
                    color: dataType === d.id ? d.color : "var(--text-secondary)",
                    fontSize: 11, fontWeight: dataType === d.id ? 600 : 400, textAlign: "left",
                    transition: "all 0.15s ease",
                  }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: d.color, flexShrink: 0 }} />
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        @keyframes mrPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.75); }
        }
        input[type="range"]::-webkit-slider-thumb { background: #2fcb73; }
        input[type="range"]::-webkit-slider-runnable-track { background: rgba(228,228,228,0.12); border-radius: 4px; }
      `}</style>
    </div>
  );
}
