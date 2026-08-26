"use client";

import React, { useState } from "react";
import styles from "./BubbleMapCard.module.css";
import QuickTradeModal, { TradeTokenInfo } from "./QuickTradeModal";

interface BubbleData {
  id: string;
  symbol: string;
  name: string;
  change: number; // e.g. +23.27 or -16.58
  size: number; // diameter in px
  x: number; // percentage from left
  y: number; // percentage from top
  logoUrl?: string;
  logoBg?: string;
  floatClass?: string;
  marketCap?: string;
  vol24h?: string;
}

// Full set of tokens matching the user's reference mockup
const baseBubbles: BubbleData[] = [
  // Primary Mega Bubbles
  {
    id: "gt",
    symbol: "GT",
    name: "GateToken",
    change: 23.27,
    size: 154,
    x: 43,
    y: 36,
    logoBg: "#0052FF",
    floatClass: styles.floatA,
    marketCap: "$1.84B",
    vol24h: "$142M",
  },
  {
    id: "bdx",
    symbol: "BDX",
    name: "Beldex",
    change: -16.58,
    size: 140,
    x: 88,
    y: 44,
    logoBg: "#00E599",
    floatClass: styles.floatB,
    marketCap: "$820M",
    vol24h: "$95M",
  },
  {
    id: "beat",
    symbol: "BEAT",
    name: "MetaBeat",
    change: 16.85,
    size: 132,
    x: 19,
    y: 74,
    logoBg: "#A855F7",
    floatClass: styles.floatC,
    marketCap: "$340M",
    vol24h: "$64M",
  },
  {
    id: "cro",
    symbol: "CRO",
    name: "Cronos",
    change: -11.24,
    size: 122,
    x: 67,
    y: 80,
    logoBg: "#002D74",
    floatClass: styles.floatA,
    marketCap: "$2.45B",
    vol24h: "$180M",
  },
  {
    id: "ena",
    symbol: "ENA",
    name: "Ethena",
    change: -6.04,
    size: 96,
    x: 72,
    y: 40,
    logoBg: "#1E1B4B",
    floatClass: styles.floatB,
    marketCap: "$1.28B",
    vol24h: "$210M",
  },
  {
    id: "mnt",
    symbol: "MNT",
    name: "Mantle",
    change: 3.58,
    size: 88,
    x: 7,
    y: 20,
    logoBg: "#064E3B",
    floatClass: styles.floatC,
    marketCap: "$2.9B",
    vol24h: "$110M",
  },
  {
    id: "okb",
    symbol: "OKB",
    name: "OKB Token",
    change: 3.71,
    size: 82,
    x: 18,
    y: 33,
    logoBg: "#000000",
    floatClass: styles.floatA,
    marketCap: "$3.1B",
    vol24h: "$145M",
  },
  {
    id: "atom",
    symbol: "ATOM",
    name: "Cosmos Hub",
    change: 3.76,
    size: 78,
    x: 36,
    y: 90,
    logoBg: "#2E3148",
    floatClass: styles.floatB,
    marketCap: "$2.2B",
    vol24h: "$98M",
  },
  {
    id: "arb",
    symbol: "ARB",
    name: "Arbitrum",
    change: 2.37,
    size: 72,
    x: 71,
    y: 63,
    logoBg: "#28A0F0",
    floatClass: styles.floatC,
    marketCap: "$2.1B",
    vol24h: "$1.2B",
  },
  {
    id: "ton",
    symbol: "TON",
    name: "Toncoin",
    change: -4.85,
    size: 78,
    x: 93,
    y: 84,
    logoBg: "#0088CC",
    floatClass: styles.floatA,
    marketCap: "$14.5B",
    vol24h: "$380M",
  },
  {
    id: "near",
    symbol: "NEAR",
    name: "NEAR Protocol",
    change: -3.13,
    size: 68,
    x: 82,
    y: 91,
    logoBg: "#000000",
    floatClass: styles.floatB,
    marketCap: "$4.8B",
    vol24h: "$310M",
  },
  {
    id: "stable",
    symbol: "STABLE",
    name: "USDT / USDC",
    change: 1.87,
    size: 66,
    x: 60,
    y: 20,
    logoBg: "#134E4A",
    floatClass: styles.floatC,
    marketCap: "$120B",
    vol24h: "$45B",
  },
  {
    id: "bgb",
    symbol: "BGB",
    name: "Bitget Token",
    change: 1.58,
    size: 60,
    x: 74,
    y: 19,
    logoBg: "#00F0FF",
    floatClass: styles.floatA,
    marketCap: "$1.4B",
    vol24h: "$82M",
  },
  {
    id: "sol",
    symbol: "SOL",
    name: "Solana",
    change: 2.11,
    size: 58,
    x: 5,
    y: 90,
    logoBg: "#14F195",
    floatClass: styles.floatB,
    marketCap: "$68B",
    vol24h: "$4.1B",
  },
  {
    id: "pepe",
    symbol: "PEPE",
    name: "Pepe",
    change: 1.44,
    size: 56,
    x: 4,
    y: 66,
    logoBg: "#15803D",
    floatClass: styles.floatC,
    marketCap: "$4.2B",
    vol24h: "$780M",
  },
  {
    id: "link",
    symbol: "LINK",
    name: "Chainlink",
    change: 1.43,
    size: 54,
    x: 79,
    y: 65,
    logoBg: "#375BD2",
    floatClass: styles.floatA,
    marketCap: "$8.4B",
    vol24h: "$290M",
  },
  {
    id: "vvv",
    symbol: "VVV",
    name: "Victorium",
    change: -2.76,
    size: 56,
    x: 56,
    y: 63,
    logoBg: "#7F1D1D",
    floatClass: styles.floatB,
    marketCap: "$110M",
    vol24h: "$18M",
  },
  {
    id: "doge",
    symbol: "DOGE",
    name: "Dogecoin",
    change: 1.29,
    size: 50,
    x: 4,
    y: 47,
    logoBg: "#C2A633",
    floatClass: styles.floatC,
    marketCap: "$18B",
    vol24h: "$920M",
  },
  {
    id: "icp",
    symbol: "ICP",
    name: "Internet Computer",
    change: 1.29,
    size: 52,
    x: 32,
    y: 19,
    logoBg: "#29ABE2",
    floatClass: styles.floatA,
    marketCap: "$3.8B",
    vol24h: "$120M",
  },
  {
    id: "wld",
    symbol: "WLD",
    name: "Worldcoin",
    change: 1.65,
    size: 52,
    x: 45,
    y: 72,
    logoBg: "#000000",
    floatClass: styles.floatB,
    marketCap: "$920M",
    vol24h: "$210M",
  },
  {
    id: "morpho",
    symbol: "MORPHO",
    name: "Morpho Protocol",
    change: 1.27,
    size: 50,
    x: 44,
    y: 93,
    logoBg: "#0284C7",
    floatClass: styles.floatC,
    marketCap: "$420M",
    vol24h: "$38M",
  },
  {
    id: "wlfi",
    symbol: "WLFI",
    name: "World Liberty",
    change: -1.85,
    size: 52,
    x: 82,
    y: 18,
    logoBg: "#D97706",
    floatClass: styles.floatA,
    marketCap: "$290M",
    vol24h: "$42M",
  },
  {
    id: "lit",
    symbol: "LIT",
    name: "Litentry",
    change: -1.94,
    size: 46,
    x: 28,
    y: 47,
    logoBg: "#1E293B",
    floatClass: styles.floatB,
    marketCap: "$88M",
    vol24h: "$12M",
  },
  {
    id: "jup",
    symbol: "JUP",
    name: "Jupiter",
    change: -1.27,
    size: 48,
    x: 10,
    y: 39,
    logoBg: "#14B8A6",
    floatClass: styles.floatC,
    marketCap: "$1.4B",
    vol24h: "$190M",
  },
  {
    id: "m",
    symbol: "M",
    name: "Memecoin",
    change: -1.56,
    size: 44,
    x: 52,
    y: 87,
    logoBg: "#6B21A8",
    floatClass: styles.floatA,
    marketCap: "$180M",
    vol24h: "$24M",
  },
  // Micro Accents & Scatter Bubbles
  {
    id: "nexo",
    symbol: "NEXO",
    name: "Nexo",
    change: 0.89,
    size: 38,
    x: 24,
    y: 16,
    logoBg: "#1E3A8A",
    marketCap: "$620M",
  },
  {
    id: "ondo",
    symbol: "ONDO",
    name: "Ondo Finance",
    change: 0.75,
    size: 38,
    x: 27,
    y: 63,
    logoBg: "#0F766E",
    marketCap: "$1.1B",
  },
  {
    id: "xaut",
    symbol: "XAUT",
    name: "Tether Gold",
    change: 0.72,
    size: 34,
    x: 60,
    y: 47,
    logoBg: "#B45309",
    marketCap: "$590M",
  },
  {
    id: "wbnb",
    symbol: "WBNB",
    name: "Wrapped BNB",
    change: 0.61,
    size: 32,
    x: 69,
    y: 14,
    logoBg: "#F59E0B",
    marketCap: "$82B",
  },
  {
    id: "paxg",
    symbol: "PAXG",
    name: "PAX Gold",
    change: 0.64,
    size: 34,
    x: 84,
    y: 74,
    logoBg: "#D97706",
    marketCap: "$420M",
  },
  {
    id: "qnt",
    symbol: "QNT",
    name: "Quant",
    change: 0.56,
    size: 34,
    x: 76,
    y: 76,
    logoBg: "#000000",
    marketCap: "$1.2B",
  },
  {
    id: "pol",
    symbol: "POL",
    name: "Polygon Ecosystem",
    change: -0.83,
    size: 36,
    x: 64,
    y: 54,
    logoBg: "#7C3AED",
    marketCap: "$3.6B",
  },
  {
    id: "ada",
    symbol: "ADA",
    name: "Cardano",
    change: -1.25,
    size: 38,
    x: 9,
    y: 54,
    logoBg: "#0033AD",
    marketCap: "$14B",
  },
  {
    id: "wbt",
    symbol: "WBT",
    name: "WhiteBIT Coin",
    change: 0.84,
    size: 32,
    x: 96,
    y: 67,
    logoBg: "#1F2937",
    marketCap: "$2.8B",
  },
  {
    id: "weth",
    symbol: "WETH",
    name: "Wrapped Ether",
    change: 0.37,
    size: 30,
    x: 46,
    y: 84,
    logoBg: "#374151",
    marketCap: "$8.4B",
  },
];

// Stocks Bubbles Dataset with Official Brands & Logos
const stockBubbles: BubbleData[] = [
  {
    id: "nvda",
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    change: 4.15,
    size: 154,
    x: 43,
    y: 36,
    logoBg: "#064E3B",
    floatClass: styles.floatA,
    marketCap: "$3.15T",
    vol24h: "$34.2B",
  },
  {
    id: "aapl",
    symbol: "AAPL",
    name: "Apple Inc.",
    change: 1.20,
    size: 140,
    x: 86,
    y: 42,
    logoBg: "#1F2937",
    floatClass: styles.floatB,
    marketCap: "$3.45T",
    vol24h: "$18.4B",
  },
  {
    id: "tsla",
    symbol: "TSLA",
    name: "Tesla, Inc.",
    change: -2.40,
    size: 132,
    x: 19,
    y: 72,
    logoBg: "#450A0A",
    floatClass: styles.floatC,
    marketCap: "$792.4B",
    vol24h: "$22.6B",
  },
  {
    id: "msft",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    change: 0.85,
    size: 122,
    x: 67,
    y: 78,
    logoBg: "#0C2340",
    floatClass: styles.floatA,
    marketCap: "$3.10T",
    vol24h: "$14.1B",
  },
  {
    id: "amzn",
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    change: 2.30,
    size: 96,
    x: 72,
    y: 38,
    logoBg: "#3A2A14",
    floatClass: styles.floatB,
    marketCap: "$1.94T",
    vol24h: "$12.8B",
  },
  {
    id: "meta",
    symbol: "META",
    name: "Meta Platforms, Inc.",
    change: 3.10,
    size: 88,
    x: 8,
    y: 20,
    logoBg: "#0A2540",
    floatClass: styles.floatC,
    marketCap: "$1.30T",
    vol24h: "$11.2B",
  },
  {
    id: "googl",
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    change: 1.60,
    size: 82,
    x: 18,
    y: 34,
    logoBg: "#1E293B",
    floatClass: styles.floatA,
    marketCap: "$2.05T",
    vol24h: "$9.4B",
  },
  {
    id: "pltr",
    symbol: "PLTR",
    name: "Palantir Technologies",
    change: 6.80,
    size: 78,
    x: 36,
    y: 90,
    logoBg: "#18181B",
    floatClass: styles.floatB,
    marketCap: "$68.4B",
    vol24h: "$6.2B",
  },
  {
    id: "amd",
    symbol: "AMD",
    name: "Advanced Micro Devices",
    change: 5.40,
    size: 74,
    x: 71,
    y: 63,
    logoBg: "#2E1010",
    floatClass: styles.floatC,
    marketCap: "$249.2B",
    vol24h: "$8.6B",
  },
  {
    id: "coin",
    symbol: "COIN",
    name: "Coinbase Global",
    change: 7.25,
    size: 76,
    x: 93,
    y: 84,
    logoBg: "#0052FF",
    floatClass: styles.floatA,
    marketCap: "$52.8B",
    vol24h: "$5.4B",
  },
  {
    id: "nflx",
    symbol: "NFLX",
    name: "Netflix, Inc.",
    change: -1.85,
    size: 68,
    x: 82,
    y: 91,
    logoBg: "#450A0A",
    floatClass: styles.floatB,
    marketCap: "$294B",
    vol24h: "$4.1B",
  },
  {
    id: "intc",
    symbol: "INTC",
    name: "Intel Corporation",
    change: -3.12,
    size: 66,
    x: 60,
    y: 20,
    logoBg: "#0071C5",
    floatClass: styles.floatC,
    marketCap: "$98B",
    vol24h: "$3.2B",
  },
];

// Helper to render official brand logos for stocks
function StockLogo({ symbol, size = 16 }: { symbol: string; size?: number }) {
  const sym = symbol.toUpperCase();
  switch (sym) {
    case "NVDA":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M8.7 7.2C11.5 7.2 13.8 9.5 13.8 12.3C13.8 15.1 11.5 17.4 8.7 17.4C7.3 17.4 6 16.8 5.1 15.9L3.5 17.5C4.8 18.9 6.7 19.7 8.7 19.7C12.8 19.7 16.1 16.4 16.1 12.3C16.1 8.2 12.8 4.9 8.7 4.9C6.1 4.9 3.8 6.2 2.4 8.2L4.2 9.5C5.2 8.1 6.8 7.2 8.7 7.2Z" fill="#76B900" />
          <path d="M8.7 2.3C4.1 2.3 0.3 5.4 0 9.7L2.3 10.3C2.7 6.9 5.4 4.5 8.7 4.5C13 4.5 16.5 8 16.5 12.3C16.5 16.6 13 20.1 8.7 20.1C5.6 20.1 2.9 17.9 2.4 14.7L0.1 15.3C0.8 19.4 4.4 22.4 8.7 22.4C14.3 22.4 18.8 17.9 18.8 12.3C18.8 6.7 14.3 2.3 8.7 2.3Z" fill="#76B900" opacity="0.65" />
        </svg>
      );
    case "AAPL":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#ffffff">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.87c.66-.82 1.11-1.96.99-3.1-.96.04-2.12.64-2.8 1.44-.6.69-1.12 1.83-.98 2.95 1.07.08 2.15-.55 2.79-1.29z"/>
        </svg>
      );
    case "TSLA":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#ffffff">
          <path d="M12 4.2c2.2 0 4.9.4 7.2 1.6l.8-2.6C17.3 2 14.5 1.5 12 1.5S6.7 2 4 3.2l.8 2.6c2.3-1.2 5-1.6 7.2-1.6zm0 4.1c1.3 0 3.2.2 4.7.9l.6-2.1C15.8 6.5 13.9 6.3 12 6.3s-3.8.2-5.3.8l.6 2.1c1.5-.7 3.4-.9 4.7-.9zm-1.1 3.5h2.2v8.7h-2.2z"/>
        </svg>
      );
    case "MSFT":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24">
          <rect x="2" y="2" width="9" height="9" fill="#F25022"/>
          <rect x="13" y="2" width="9" height="9" fill="#7FBA00"/>
          <rect x="2" y="13" width="9" height="9" fill="#00A4EF"/>
          <rect x="13" y="13" width="9" height="9" fill="#FFB900"/>
        </svg>
      );
    case "AMZN":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#FF9900">
          <path d="M14.5 13.5c-2.1 1.7-5.3 2.6-8 .9-.2-.1-.5.1-.3.3 1.8 1.9 4.9 2.5 7.6 1.1.3-.2.3-.6-.1-.7l.8-1.6zm4.8 3c-.3-.4-1.9-.2-2.9 0-.3.1-.3-.2-.1-.4 1.2-1.3 3.3-.9 3.5-.6.2.3-.2 2.3-1.3 3.3-.2.2-.4.1-.3-.1.5-.8 1.4-1.8 1.1-2.2zm-9.8-7.7c-.5.8-.8 1.8-.8 2.8 0 2.2 1.4 3.7 3.3 3.7 1.3 0 2.4-.7 2.9-1.8v1.5h2V7.7h-2v1.4c-.6-.9-1.6-1.4-2.8-1.4-1.6 0-2.6 1.1-2.6 2.1z"/>
        </svg>
      );
    case "META":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#0081FB">
          <path d="M16.9 5.3c-1.9 0-3.6 1.1-4.9 2.7-1.3-1.6-3-2.7-4.9-2.7C3.1 5.3 0 8.7 0 12.8c0 4.1 3.1 7.5 7.1 7.5 2.1 0 4-1 5.1-2.6 1.1 1.6 3 2.6 5.1 2.6 4 0 6.7-3.4 6.7-7.5 0-4.1-3.1-7.5-7.1-7.5zm-9.8 12.6c-2.8 0-4.9-2.4-4.9-5.1s2.1-5.1 4.9-5.1c1.6 0 3.2 1 4.2 2.7-1.3 2.4-2.6 4.9-4.2 7.5zm9.8 0c-1.6-2.6-2.9-5.1-4.2-7.5 1-1.7 2.6-2.7 4.2-2.7 2.8 0 4.9 2.4 4.9 5.1 0 2.8-2.1 5.1-4.9 5.1z"/>
        </svg>
      );
    case "GOOGL":
    case "GOOG":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
        </svg>
      );
    case "AMD":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#ED1C24">
          <path d="M22 2H10.5l4.5 4.5H22v11.5l4.5 4.5V2zm-9 6.5L8.5 4 4 8.5 8.5 13zm-8 4.5L2 16h6.5l4.5-4.5H5z"/>
        </svg>
      );
    case "PLTR":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#ffffff">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
        </svg>
      );
    case "COIN":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#0052FF">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-2-8h4v4h-4z"/>
        </svg>
      );
    case "NFLX":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#E50914">
          <path d="M5.398 0v24c1.867-.367 3.734-.783 5.602-1.15V0H5.398zm7.6 0v10.633l5.604 12.217V0h-5.604zm0 14.867L8.8 22.85V24h.133l4.065-9.133z"/>
        </svg>
      );
    case "INTC":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#0071C5">
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 14.5h-2v-5h2v5zm-1-6.2c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"/>
        </svg>
      );
    default:
      return (
        <span
          style={{
            fontSize: `${Math.max(6, size * 0.55)}px`,
            fontWeight: 900,
            color: "#ffffff",
          }}
        >
          {symbol.slice(0, 1)}
        </span>
      );
  }
}

// Helper to render official brand logos for stocks or cryptos
function BubbleLogo({ symbol, size = 16, isStock = false }: { symbol: string; size?: number; isStock?: boolean }) {
  if (isStock) {
    return <StockLogo symbol={symbol} size={size} />;
  }

  const sym = symbol.toUpperCase();
  if (sym === "BTC") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#F7931A">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.18 10.3c.78-.45 1.25-1.22 1.25-2.22 0-1.78-1.42-2.73-3.63-2.73h-3.3v9.3h3.75c2.18 0 3.65-1.02 3.65-2.75 0-.82-.47-1.47-1.72-1.6zm-3.68-3.15h1.35c1.05 0 1.7.42 1.7 1.25s-.65 1.25-1.7 1.25h-1.35V9.15zm1.55 5.7h-1.55v-2.7h1.55c1.2 0 1.95.48 1.95 1.35s-.75 1.35-1.95 1.35z"/>
      </svg>
    );
  }
  if (sym === "ETH") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#627EEA">
        <path d="M12 2L4.5 14.5L12 18.5L19.5 14.5L12 2ZM12 19.8L4.5 15.6L12 22L19.5 15.6L12 19.8Z"/>
      </svg>
    );
  }
  if (sym === "SOL") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#14F195">
        <path d="M4 18.5h12.5l3.5-3.5H7.5L4 18.5zm0-6.5h12.5l3.5-3.5H7.5L4 12zm3.5-10L4 5.5h12.5L20 2H7.5z"/>
      </svg>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
      <img
        src={`https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}
        alt={symbol}
        style={{ width: `${size}px`, height: `${size}px`, objectFit: "contain" }}
        onError={(e) => {
          e.currentTarget.style.display = "none";
          const fallback = e.currentTarget.nextElementSibling as HTMLElement;
          if (fallback) fallback.style.display = "flex";
        }}
      />
      <span
        style={{
          display: "none",
          fontSize: `${Math.max(6, size * 0.55)}px`,
          fontWeight: 900,
          color: "#ffffff",
        }}
      >
        {symbol.slice(0, 1)}
      </span>
    </div>
  );
}

export default function BubbleMapCard() {
  const [mapMode, setMapMode] = useState<"crypto" | "stocks">("crypto");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [timeframe, setTimeframe] = useState<string>("24H");
  const [hoveredBubble, setHoveredBubble] = useState<BubbleData | null>(null);
  const [tradeModalOpen, setTradeModalOpen] = useState<boolean>(false);
  const [selectedTradeToken, setSelectedTradeToken] = useState<TradeTokenInfo | null>(null);
  const [tradeSide, setTradeSide] = useState<"LONG" | "SHORT">("LONG");
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const menuRef = React.useRef<HTMLDivElement>(null);

  // Listen to sidebar navigation events (e.g. user selects Stocks)
  React.useEffect(() => {
    const handleSidepanelFilter = (e: Event) => {
      const customEvent = e as CustomEvent<{ tab?: string }>;
      if (customEvent.detail?.tab === "stocks") {
        setMapMode("stocks");
      } else if (customEvent.detail?.tab === "crypto") {
        setMapMode("crypto");
      }
    };
    window.addEventListener("i5-sidepanel-filter", handleSidepanelFilter);
    return () => window.removeEventListener("i5-sidepanel-filter", handleSidepanelFilter);
  }, []);

  // Outside click for map dropdown
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Dynamic multiplier based on selected timeframe
  const timeframeMultiplier: Record<string, number> = {
    "4H": 0.35,
    "24H": 1.0,
    "7D": 2.4,
    "30D": 4.8,
    "1Y": 11.2,
  };

  const mult = timeframeMultiplier[timeframe] || 1.0;

  const currentBubbles = mapMode === "stocks" ? stockBubbles : baseBubbles;

  const handleBubbleClick = (bubble: BubbleData, isPositive: boolean, dynamicChange: number) => {
    const tokenInfo: TradeTokenInfo = {
      symbol: bubble.symbol,
      name: bubble.name,
      price:
        bubble.symbol === "NVDA"
          ? "$128.40"
          : bubble.symbol === "AAPL"
          ? "$226.50"
          : bubble.symbol === "TSLA"
          ? "$248.80"
          : bubble.symbol === "MSFT"
          ? "$418.20"
          : bubble.symbol === "AMZN"
          ? "$186.40"
          : bubble.symbol === "META"
          ? "$512.90"
          : bubble.symbol === "GT"
          ? "$12.45"
          : bubble.symbol === "BDX"
          ? "$0.048"
          : bubble.symbol === "ATOM"
          ? "$9.20"
          : bubble.symbol === "ARB"
          ? "$2.11"
          : bubble.symbol === "TON"
          ? "$5.60"
          : "$4.85",
      change24h: `${isPositive ? "+" : ""}${dynamicChange}%`,
      isPositive: isPositive,
      avatarBg: bubble.logoBg,
      exchanges: ["Hyperliquid", "Aster"],
    };

    setSelectedTradeToken(tokenInfo);
    // If green/positive -> LONG, if red/negative -> SHORT
    setTradeSide(isPositive ? "LONG" : "SHORT");
    setTradeModalOpen(true);
  };

  return (
    <div className={styles.card} role="region" aria-label="Bubble Map Visualization">
      {/* Top Header Bar */}
      <div className={styles.header}>
        {/* Left Dropdown Pill + Expand Action */}
        <div className={styles.leftControls}>
          <div className={styles.dropdownWrapper} ref={menuRef}>
            <button
              className={styles.dropdownPill}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Select Bubble Map view"
            >
              <span className={styles.scatterIcon}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="5" cy="5" r="2.5" />
                  <circle cx="11" cy="7" r="3.5" />
                  <circle cx="6" cy="12" r="2" />
                </svg>
              </span>
              <span>{mapMode === "stocks" ? "STOCKS BUBBLE MAP" : "BUBBLE MAP"}</span>
              <span className={styles.infoIcon}>ⓘ</span>
              <span className={styles.chevronIcon}>▼</span>
            </button>

            {isMenuOpen && (
              <div className={styles.mapSelectMenu}>
                <button
                  className={`${styles.mapSelectItem} ${mapMode === "crypto" ? styles.mapSelectItemActive : ""}`}
                  onClick={() => {
                    setMapMode("crypto");
                    setIsMenuOpen(false);
                  }}
                >
                  <span>🪙</span>
                  <span>Crypto Bubbles</span>
                </button>
                <button
                  className={`${styles.mapSelectItem} ${mapMode === "stocks" ? styles.mapSelectItemActive : ""}`}
                  onClick={() => {
                    setMapMode("stocks");
                    setIsMenuOpen(false);
                  }}
                >
                  <span>📈</span>
                  <span>Stock Bubbles</span>
                </button>
              </div>
            )}
          </div>

          <button className={styles.expandBtn} aria-label="Expand Bubble Map view">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 2.5h3.5V6M13.5 2.5L7.5 8.5M6 13.5H2.5V10M2.5 13.5L8.5 7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Right Timeframe Filter Switcher */}
        <div className={styles.timeframeGroup}>
          {["4H", "24H", "7D", "30D", "1Y"].map((tf) => (
            <button
              key={tf}
              className={`${styles.tfBtn} ${timeframe === tf ? styles.tfBtnActive : ""}`}
              onClick={() => setTimeframe(tf)}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive 3D Bubble Canvas Container */}
      <div className={styles.canvasArea}>
        {currentBubbles.map((bubble) => {
          const dynamicChange = Number((bubble.change * mult).toFixed(2));
          const isPositive = dynamicChange >= 0;
          const formattedChange = `${isPositive ? "+" : ""}${dynamicChange}%`;

          // Scale bubble dimensions on mobile for ideal fit
          const scaleFactor = isMobile ? 0.6 : 1.0;
          const scaledSize = Math.round(bubble.size * scaleFactor);

          // Scale font size according to bubble diameter
          const isTiny = bubble.size < 42;
          const isSmall = bubble.size >= 42 && bubble.size < 70;
          const isMedium = bubble.size >= 70 && bubble.size < 110;
          const isLarge = bubble.size >= 110;

          const symbolSize = isLarge ? (isMobile ? 12 : 20) : isMedium ? (isMobile ? 9.5 : 14) : isSmall ? (isMobile ? 7.5 : 10) : 6.5;
          const changeSize = isLarge ? (isMobile ? 9 : 14) : isMedium ? (isMobile ? 7.5 : 11) : isSmall ? (isMobile ? 6.5 : 9) : 6;
          const logoDimension = isLarge ? (isMobile ? 18 : 32) : isMedium ? (isMobile ? 13 : 22) : isSmall ? (isMobile ? 9 : 14) : 8;

          return (
            <div
              key={bubble.id}
              className={`${styles.bubble} ${isPositive ? styles.bubbleGreen : styles.bubbleRed} ${
                bubble.floatClass || ""
              }`}
              style={{
                width: `${scaledSize}px`,
                height: `${scaledSize}px`,
                left: `calc(${bubble.x}% - ${scaledSize / 2}px)`,
                top: `calc(${bubble.y}% - ${scaledSize / 2}px)`,
                cursor: "pointer",
              }}
              onClick={() => handleBubbleClick(bubble, isPositive, dynamicChange)}
              onMouseEnter={() => setHoveredBubble(bubble)}
              onMouseLeave={() => setHoveredBubble(null)}
              title={`Click to Quick Trade ${isPositive ? "Long" : "Short"} on ${bubble.symbol}`}
            >
              {/* Token Icon / Official Brand Logo Badge */}
              <div
                className={styles.bubbleLogo}
                style={{
                  width: `${logoDimension}px`,
                  height: `${logoDimension}px`,
                  backgroundColor: bubble.logoBg || "rgba(0,0,0,0.35)",
                }}
              >
                <BubbleLogo
                  symbol={bubble.symbol}
                  size={Math.round(logoDimension * 0.75)}
                  isStock={mapMode === "stocks"}
                />
              </div>

              {/* Symbol Ticker */}
              <span className={styles.bubbleSymbol} style={{ fontSize: `${symbolSize}px` }}>
                {bubble.symbol}
              </span>

              {/* Change % */}
              <span className={styles.bubbleChange} style={{ fontSize: `${changeSize}px` }}>
                {formattedChange}
              </span>

              {/* Detailed Metrics Tooltip on Hover */}
              {hoveredBubble?.id === bubble.id && (
                <div className={styles.tooltip}>
                  <div className={styles.tooltipTitle}>{bubble.name}</div>
                  <div className={styles.tooltipMeta}>
                    Vol: {bubble.vol24h || "$50M+"} · MC: {bubble.marketCap || "$500M+"}
                  </div>
                  <div style={{ marginTop: "4px", fontSize: "10px", color: isPositive ? "var(--emerald-500)" : "var(--rose-500)", fontWeight: 700 }}>
                    ⚡ Click to Trade {isPositive ? "LONG" : "SHORT"}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Trade Modal */}
      <QuickTradeModal
        isOpen={tradeModalOpen}
        onClose={() => setTradeModalOpen(false)}
        token={selectedTradeToken}
        initialSide={tradeSide}
        exchange="Hyperliquid"
      />
    </div>
  );
}
