"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Bell,
  ChevronDown,
  Mail,
  MessageSquare,
  Send,
  MessageCircle,
  Link as LinkIcon,
  Phone,
  Monitor,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  Percent,
  RotateCcw,
  BarChart3,
  DollarSign,
  PieChart,
  Globe,
  Grid,
  PlusCircle,
  Database,
  BookOpen,
  Clock,
  Building2,
  Activity,
  List,
  Zap,
  Wallet,
  Scale,
  Anchor,
  History as HistoryIcon,
  Fuel,
  Hourglass,
  Box,
  Smartphone,
  Hash,
  X,
  Trash2,
  CheckCircle2,
  Sparkles,
  Info,
} from "lucide-react";
import styles from "./CreateAlertsView.module.css";

/* -------------------------------------------------------------------------
   DATA CONFIGURATIONS
   ------------------------------------------------------------------------- */
interface DropdownOption {
  value: string;
  icon: string | React.ReactNode;
}

const COIN_OPTIONS: DropdownOption[] = [
  { value: "Bitcoin (BTC)", icon: "₿" },
  { value: "Ethereum (ETH)", icon: "Ξ" },
  { value: "Solana (SOL)", icon: "◎" },
  { value: "Binance Coin (BNB)", icon: "B" },
  { value: "Cardano (ADA)", icon: "₳" },
  { value: "Dogecoin (DOGE)", icon: "Ð" },
  { value: "Avalanche (AVAX)", icon: "🔺" },
  { value: "Sui (SUI)", icon: "💧" },
  { value: "Chainlink (LINK)", icon: "⬡" },
];

const SPOT_EXCHANGES: DropdownOption[] = [
  { value: "Coinbase", icon: "©" },
  { value: "Binance", icon: "B" },
  { value: "Kraken", icon: "K" },
  { value: "OKX", icon: "O" },
  { value: "Bybit", icon: "B" },
  { value: "Global Average", icon: "🌐" },
];

const FUTURES_EXCHANGES: DropdownOption[] = [
  { value: "Binance Futures", icon: "B" },
  { value: "Bybit Futures", icon: "B" },
  { value: "OKX Futures", icon: "O" },
  { value: "Hyperliquid", icon: "⚡" },
];

const CURRENCIES: DropdownOption[] = [
  { value: "USD — Dollar", icon: "$" },
  { value: "EUR — Euro", icon: "€" },
  { value: "GBP — Pound", icon: "£" },
];

const TIMEFRAMES: DropdownOption[] = [
  { value: "5 minutes", icon: "⏱" },
  { value: "15 minutes", icon: "⏱" },
  { value: "1 hour", icon: "⏱" },
  { value: "4 hours", icon: "⏱" },
  { value: "1 day", icon: "⏱" },
];

const INTERVALS: DropdownOption[] = [
  { value: "Every 1 hour", icon: "⏱" },
  { value: "Every 4 hours", icon: "⏱" },
  { value: "Every 12 hours", icon: "⏱" },
  { value: "Every 24 hours", icon: "⏱" },
];

const VOL_TRIGGERS: DropdownOption[] = [
  { value: "Increases by", icon: "📈" },
  { value: "Decreases by", icon: "📉" },
];

const STOCK_OPTIONS: DropdownOption[] = [
  { value: "NVIDIA (NVDA)", icon: "📈" },
  { value: "Apple (AAPL)", icon: "🍎" },
  { value: "Tesla (TSLA)", icon: "⚡" },
  { value: "Microsoft (MSFT)", icon: "💻" },
  { value: "Amazon (AMZN)", icon: "📦" },
  { value: "Alphabet (GOOGL)", icon: "🔍" },
];

const ASSET_OPTIONS: DropdownOption[] = [
  { value: "Bitcoin (BTC)", icon: "₿" },
  { value: "Ethereum (ETH)", icon: "Ξ" },
  { value: "Solana (SOL)", icon: "◎" },
  { value: "Total Crypto Cap", icon: "🌐" },
];

const ONCHAIN_TIERS: DropdownOption[] = [
  { value: "Whale Tier ($1M+)", icon: "🐋" },
  { value: "Mega Whale ($10M+)", icon: "🌊" },
  { value: "Smart Money KOL", icon: "🧠" },
  { value: "Institutional CEX Inflow", icon: "🏦" },
];

const NOTIFY_CHANNELS = [
  { id: "Email", icon: <Mail size={16} /> },
  { id: "SMS", icon: <MessageSquare size={16} /> },
  { id: "Telegram", icon: <Send size={16} /> },
  { id: "Discord", icon: <MessageCircle size={16} /> },
  { id: "Slack", icon: <MessageCircle size={16} /> },
  { id: "Webhook", icon: <LinkIcon size={16} /> },
  { id: "Phone call", icon: <Phone size={16} /> },
  { id: "Browser", icon: <Monitor size={16} /> },
];

const COOLDOWNS = ["5m", "15m", "30m", "1h", "6h", "24h", "7d"];

const LIVE_PRICES: Record<string, { symbol: string; price: string }> = {
  "Bitcoin (BTC)": { symbol: "BTC", price: "$78,123.05" },
  "Ethereum (ETH)": { symbol: "ETH", price: "$2,740.20" },
  "Solana (SOL)": { symbol: "SOL", price: "$184.50" },
  "Binance Coin (BNB)": { symbol: "BNB", price: "$624.00" },
  "Cardano (ADA)": { symbol: "ADA", price: "$0.78" },
  "Dogecoin (DOGE)": { symbol: "DOGE", price: "$0.22" },
  "Avalanche (AVAX)": { symbol: "AVAX", price: "$32.40" },
  "Sui (SUI)": { symbol: "SUI", price: "$3.45" },
  "Chainlink (LINK)": { symbol: "LINK", price: "$18.90" },
  "NVIDIA (NVDA)": { symbol: "NVDA", price: "$128.40" },
  "Apple (AAPL)": { symbol: "AAPL", price: "$224.23" },
  "Tesla (TSLA)": { symbol: "TSLA", price: "$218.50" },
  "Microsoft (MSFT)": { symbol: "MSFT", price: "$415.80" },
  "Amazon (AMZN)": { symbol: "AMZN", price: "$186.20" },
  "Alphabet (GOOGL)": { symbol: "GOOGL", price: "$165.10" },
  "Total Crypto Cap": { symbol: "TOTAL", price: "$2.68T" },
};

interface AlertItem {
  id: string;
  type: string;
  asset: string;
  condition: string;
  notifyChannels: string[];
  cooldown: string;
  isOneTime: boolean;
  isActive: boolean;
  createdAt: string;
}

/* -------------------------------------------------------------------------
   MAIN COMPONENT: CreateAlertsView
   ------------------------------------------------------------------------- */
export default function CreateAlertsView() {
  const [activeTab, setActiveTab] = useState<string>("Price");
  const [direction, setDirection] = useState<"above" | "below">("above");
  const [notifyVia, setNotifyVia] = useState<string[]>(["Email", "Telegram"]);
  const [cooldown, setCooldown] = useState<string>("24h");
  const [note, setNote] = useState<string>("");
  const [isOneTime, setIsOneTime] = useState<boolean>(false);
  const [stockAlertType, setStockAlertType] = useState<string>("Price");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Form selections
  const [selectedCoin, setSelectedCoin] = useState<DropdownOption>(COIN_OPTIONS[0]);
  const [selectedExchange, setSelectedExchange] = useState<DropdownOption>(SPOT_EXCHANGES[0]);
  const [selectedFuturesExchange, setSelectedFuturesExchange] = useState<DropdownOption>(FUTURES_EXCHANGES[0]);
  const [selectedCurrency, setSelectedCurrency] = useState<DropdownOption>(CURRENCIES[0]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<DropdownOption>(TIMEFRAMES[0]);
  const [selectedInterval, setSelectedInterval] = useState<DropdownOption>(INTERVALS[0]);
  const [selectedVolTrigger, setSelectedVolTrigger] = useState<DropdownOption>(VOL_TRIGGERS[0]);
  const [selectedStock, setSelectedStock] = useState<DropdownOption>(STOCK_OPTIONS[0]);
  const [selectedAsset, setSelectedAsset] = useState<DropdownOption>(ASSET_OPTIONS[0]);
  const [selectedOnchainTier, setSelectedOnchainTier] = useState<DropdownOption>(ONCHAIN_TIERS[0]);

  // Target inputs
  const [targetPrice, setTargetPrice] = useState<string>("70000.00");
  const [targetPercent, setTargetPercent] = useState<string>("5.00");
  const [targetMultiplier, setTargetMultiplier] = useState<string>("5");
  const [targetFunding, setTargetFunding] = useState<string>("0.05");
  const [targetMarketCap, setTargetMarketCap] = useState<string>("100.00");
  const [targetDominance, setTargetDominance] = useState<string>("58.50");

  // Active alerts drawer & list
  const [activeAlerts, setActiveAlerts] = useState<AlertItem[]>([
    {
      id: "alert-1",
      type: "Price",
      asset: "Bitcoin (BTC)",
      condition: "Above $75,000.00 (Coinbase)",
      notifyChannels: ["Email", "Telegram"],
      cooldown: "1h",
      isOneTime: false,
      isActive: true,
      createdAt: "1h ago",
    },
    {
      id: "alert-2",
      type: "Percent",
      asset: "Ethereum (ETH)",
      condition: "Goes Down 5.00% in 1 hour",
      notifyChannels: ["Telegram", "Discord"],
      cooldown: "24h",
      isOneTime: true,
      isActive: true,
      createdAt: "3h ago",
    },
    {
      id: "alert-3",
      type: "Funding",
      asset: "Solana (SOL)",
      condition: "Funding Rate Above 0.05% (Binance Futures)",
      notifyChannels: ["Webhook", "Browser"],
      cooldown: "6h",
      isOneTime: false,
      isActive: false,
      createdAt: "1d ago",
    },
  ]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);

  const headerRef = useRef<HTMLDivElement>(null);

  // Close mega menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const toggleNotify = (id: string) => {
    setNotifyVia((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  // Header Title & Meta based on activeTab
  const getHeaderContent = () => {
    switch (activeTab) {
      case "Price":
        return {
          title: "Price Alert",
          desc: "Get notified when a coin crosses your target price threshold.",
          icon: <Bell size={24} />,
        };
      case "Percent":
        return {
          title: "Percentage Price Alert",
          desc: "Get notified when a coin changes in value by a specific percent.",
          icon: <Percent size={24} />,
        };
      case "Periodic":
        return {
          title: "Periodic Price Alerts",
          desc: "Get notified of the price of an asset at regular scheduled intervals.",
          icon: <RotateCcw size={24} />,
        };
      case "Volume":
        return {
          title: "Volume Alert",
          desc: "Get notified of unusual trading volume spikes on top crypto exchanges.",
          icon: <BarChart3 size={24} />,
        };
      case "Funding":
        return {
          title: "Funding Rates Alert",
          desc: "Get notified when perpetual futures funding rates reach extreme levels.",
          icon: <DollarSign size={24} />,
        };
      case "Marketcap":
        return {
          title: "Crypto MarketCap Alert",
          desc: "Monitor the market capitalization of specific assets or total crypto cap.",
          icon: <PieChart size={24} />,
        };
      case "Dominance":
        return {
          title: "Bitcoin Dominance Alert",
          desc: "Get notified when Bitcoin market share dominance crosses your target.",
          icon: <Globe size={24} />,
        };
      case "Stocks":
        if (stockAlertType === "Price") {
          return {
            title: "Stock Market Alert",
            desc: "Get notified when a stock price goes above or below a target price.",
            icon: <Building2 size={24} />,
          };
        } else if (stockAlertType === "Volatility") {
          return {
            title: "Stock Volatility Alert",
            desc: "Get notified when a major equity changes by a specified percentage.",
            icon: <Activity size={24} />,
          };
        } else {
          return {
            title: "Periodic Stock Price Alerts",
            desc: "Get regular scheduled market digests for your stock watchlist.",
            icon: <RotateCcw size={24} />,
          };
        }
      case "Listings":
        return {
          title: "Coin Listing Alert",
          desc: "Instant notifications when new tokens are listed on major CEXs and DEXs.",
          icon: <PlusCircle size={24} />,
        };
      case "OnChain":
        return {
          title: "On-Chain Whale Alert",
          desc: "Real-time alerts for large transaction movements and smart wallet flows.",
          icon: <Anchor size={24} />,
        };
      default:
        return {
          title: `${activeTab} Alert`,
          desc: `Configure your ${activeTab.toLowerCase()} alert.`,
          icon: <Bell size={24} />,
        };
    }
  };

  const headerContent = getHeaderContent();

  // Dynamic live price indicator
  const currentAssetKey = activeTab === "Stocks" ? selectedStock.value : activeTab === "Marketcap" || activeTab === "Dominance" ? selectedAsset.value : selectedCoin.value;
  const livePriceData = LIVE_PRICES[currentAssetKey] || { symbol: "BTC", price: "$78,123.05" };

  // Create Alert handler
  const handleSetAlert = () => {
    let cond = "";
    let assetName = selectedCoin.value;

    if (activeTab === "Price") {
      assetName = selectedCoin.value;
      cond = `${direction === "above" ? "Above" : "Below"} $${targetPrice} (${selectedExchange.value})`;
    } else if (activeTab === "Percent") {
      assetName = selectedCoin.value;
      cond = `${direction === "above" ? "Goes Up" : "Goes Down"} ${targetPercent}% in ${selectedTimeframe.value}`;
    } else if (activeTab === "Periodic") {
      assetName = selectedCoin.value;
      cond = `Scheduled ${selectedInterval.value} in ${selectedCurrency.value}`;
    } else if (activeTab === "Volume") {
      assetName = selectedCoin.value;
      cond = `Volume ${selectedVolTrigger.value} ${targetMultiplier}x (${selectedTimeframe.value})`;
    } else if (activeTab === "Funding") {
      assetName = selectedCoin.value;
      cond = `Funding Rate ${direction === "above" ? "Above" : "Below"} ${targetFunding}% (${selectedFuturesExchange.value})`;
    } else if (activeTab === "Marketcap") {
      assetName = selectedAsset.value;
      cond = `MarketCap ${direction === "above" ? "Above" : "Below"} $${targetMarketCap}B`;
    } else if (activeTab === "Dominance") {
      assetName = "BTC Dominance";
      cond = `Dominance ${direction === "above" ? "Above" : "Below"} ${targetDominance}%`;
    } else if (activeTab === "Stocks") {
      assetName = selectedStock.value;
      cond = stockAlertType === "Price" ? `${direction === "above" ? "Above" : "Below"} $${targetPrice}` : stockAlertType === "Volatility" ? `${direction === "above" ? "Up" : "Down"} ${targetPercent}%` : `Periodic ${selectedInterval.value}`;
    } else {
      assetName = selectedCoin.value;
      cond = `Custom ${activeTab} condition configured`;
    }

    const newAlert: AlertItem = {
      id: `alert-${Date.now()}`,
      type: activeTab,
      asset: assetName,
      condition: cond,
      notifyChannels: [...notifyVia],
      cooldown,
      isOneTime,
      isActive: true,
      createdAt: "Just now",
    };

    setActiveAlerts([newAlert, ...activeAlerts]);
    showToast(`Created alert: ${assetName} — ${cond}`);
  };

  const toggleAlertStatus = (id: string) => {
    setActiveAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a))
    );
    showToast("Updated alert state");
  };

  const deleteAlert = (id: string) => {
    setActiveAlerts((prev) => prev.filter((a) => a.id !== id));
    showToast("Alert removed");
  };

  /* -------------------------------------------------------------------------
     MEGA MENUS DEFINITIONS
     ------------------------------------------------------------------------- */
  const megaMenuData: Record<string, { title: string; items: { icon: React.ReactNode; title: string; desc: string; tab?: string; stockType?: string; tag?: string }[] }[]> = {
    Market: [
      {
        title: "CRYPTO ALERTS",
        items: [
          { icon: <TrendingUp size={16} color="#60a5fa" />, title: "Price Alert", desc: "Get notified when a coin goes above/below target.", tab: "Price" },
          { icon: <Percent size={16} color="#c084fc" />, title: "Percentage Price Alert", desc: "Get notified when a coin changes by percent.", tab: "Percent" },
          { icon: <Clock size={16} color="#fb923c" />, title: "Periodic Price Alert", desc: "Get asset prices at regular intervals.", tab: "Periodic" },
          { icon: <BarChart3 size={16} color="#34d399" />, title: "Volume Alert", desc: "Watch for unusual trading volume spikes.", tab: "Volume" },
          { icon: <DollarSign size={16} color="#facc15" />, title: "Funding Rates Alert", desc: "Monitor funding rate changes on futures.", tab: "Funding", tag: "NEW" },
        ],
      },
      {
        title: "MARKET METRICS",
        items: [
          { icon: <PieChart size={16} color="#f472b6" />, title: "MarketCap Alert", desc: "Monitor entire crypto space capitalization.", tab: "Marketcap" },
          { icon: <Globe size={16} color="#22d3ee" />, title: "BTC Dominance Alert", desc: "Track Bitcoin's market share vs altcoins.", tab: "Dominance" },
        ],
      },
      {
        title: "STOCKS",
        items: [
          { icon: <Building2 size={16} color="#818cf8" />, title: "Stock Market Alert", desc: "Price alerts for 10,000+ global equities.", tab: "Stocks", stockType: "Price" },
          { icon: <Activity size={16} color="#fb7185" />, title: "Stock Market Volatility", desc: "Catch sudden moves in major stock indices.", tab: "Stocks", stockType: "Volatility" },
          { icon: <RotateCcw size={16} color="#a78bfa" />, title: "Periodic Stock Price", desc: "Scheduled updates for your stock portfolio.", tab: "Stocks", stockType: "Periodic" },
        ],
      },
    ],
    Listings: [
      {
        title: "EXCHANGE MONITOR",
        items: [
          { icon: <PlusCircle size={16} color="#4ade80" />, title: "Coin Listing Alert", desc: "New listings across 100+ exchanges.", tab: "Listings" },
          { icon: <List size={16} color="#60a5fa" />, title: "Recent Exchange Listings", desc: "View recently detected market additions.", tab: "Listings" },
          { icon: <Zap size={16} color="#facc15" />, title: "Trending Coins", desc: "See the biggest gainers and trending assets.", tab: "Price" },
          { icon: <Database size={16} color="#c084fc" />, title: "Crypto Datasets", desc: "CSV/JSON data for research and analysis.", tab: "Volume" },
        ],
      },
    ],
    "On-chain": [
      {
        title: "WALLET & WHALES",
        items: [
          { icon: <Wallet size={16} color="#60a5fa" />, title: "Wallet Watch", desc: "Get notified of any on-chain transaction.", tab: "OnChain" },
          { icon: <Scale size={16} color="#9ca3af" />, title: "Minimum Balance", desc: "Alerts when balance drops below threshold.", tab: "OnChain" },
          { icon: <Anchor size={16} color="#22d3ee" />, title: "Whale Alerts", desc: "Real-time tracking of massive movements.", tab: "OnChain", tag: "BETA" },
          { icon: <HistoryIcon size={16} color="#818cf8" />, title: "Recent Whale Activity", desc: "Historical data on recent whale trades.", tab: "OnChain" },
        ],
      },
      {
        title: "BLOCKCHAIN NETWORK",
        items: [
          { icon: <Fuel size={16} color="#2dd4bf" />, title: "ETH Gas Price Alert", desc: "Trigger notifications for cheap gas fees.", tab: "OnChain" },
          { icon: <Hourglass size={16} color="#fbbf24" />, title: "Bitcoin Mempool Alert", desc: "Monitor network congestion status.", tab: "OnChain" },
          { icon: <Box size={16} color="#3b82f6" />, title: "Blockchain Metric Alert", desc: "On-chain metrics for BTC and ETH.", tab: "OnChain" },
        ],
      },
    ],
    Notifications: [
      {
        title: "DIRECT",
        items: [
          { icon: <Mail size={16} color="#e5e5e5" />, title: "Email", desc: "Instant HTML email alerts." },
          { icon: <Smartphone size={16} color="#e5e5e5" />, title: "SMS", desc: "Direct text messages worldwide." },
          { icon: <Phone size={16} color="#e5e5e5" />, title: "Phone Call", desc: "Automated voice alert for emergencies." },
          { icon: <Bell size={16} color="#e5e5e5" />, title: "Push Notification", desc: "Native iOS/Android push alerts." },
          { icon: <Monitor size={16} color="#e5e5e5" />, title: "Browser Notification", desc: "Desktop audio & popup alerts." },
        ],
      },
      {
        title: "INTEGRATIONS",
        items: [
          { icon: <Send size={16} color="#38bdf8" />, title: "Telegram Bot", desc: "High-speed 1s bot alerts." },
          { icon: <Hash size={16} color="#818cf8" />, title: "Discord Bot", desc: "Channel webhook alerts." },
          { icon: <MessageSquare size={16} color="#f472b6" />, title: "Slack Bot", desc: "Team trading room alerts." },
          { icon: <LinkIcon size={16} color="#34d399" />, title: "Webhook", desc: "Raw JSON payloads for custom trading bots." },
        ],
      },
    ],
  };

  return (
    <div className={styles.alertsContainer}>
      {/* ── 1. TOP NAVIGATION / HEADER BAR ───────────────────────────── */}
      <header className={styles.topHeader} ref={headerRef}>
        <div className={styles.topHeaderInner}>
          {/* Left: Brand Identity */}
          <div className={styles.brandGroup}>
            <div className={styles.brandIconBox}>
              <Bell size={20} />
            </div>
            <div className={styles.brandMeta}>
              <div className={styles.brandTitleRow}>
                <h1 className={styles.brandTitle}>crypto</h1>
                <span className={styles.brandBadge}>Alerts</span>
                <span className={styles.brandProTag}>PRO</span>
              </div>
              <p className={styles.brandSubtitle}>Real-time multi-channel market trigger workstation</p>
            </div>
          </div>

          {/* Center: Navigation Tabs & Mega Menus */}
          <nav className={styles.topNav}>
            {["Market", "Listings", "On-chain", "Notifications"].map((menuKey) => {
              const isOpen = activeMenu === menuKey;
              const menuIcons: Record<string, React.ReactNode> = {
                Market: <BarChart3 size={15} className={styles.navIcon} />,
                Listings: <PlusCircle size={15} className={styles.navIcon} />,
                "On-chain": <Database size={15} className={styles.navIcon} />,
                Notifications: <MessageSquare size={15} className={styles.navIcon} />,
              };

              return (
                <div key={menuKey} className={styles.navItemWrapper}>
                  <button
                    type="button"
                    className={`${styles.topNavBtn} ${isOpen ? styles.topNavBtnActive : ""}`}
                    onClick={() => setActiveMenu(isOpen ? null : menuKey)}
                  >
                    {menuIcons[menuKey]}
                    <span>{menuKey}</span>
                    <ChevronDown
                      size={13}
                      className={`${styles.navChevron} ${isOpen ? styles.navChevronOpen : ""}`}
                    />
                  </button>

                  {/* Mega Dropdown Menu */}
                  {isOpen && megaMenuData[menuKey] && (
                    <div className={styles.megaMenu}>
                      {megaMenuData[menuKey].map((col, cIdx) => (
                        <div key={cIdx} className={styles.megaColumn}>
                          <h4 className={styles.megaColTitle}>{col.title}</h4>
                          {col.items.map((item, iIdx) => (
                            <div
                              key={iIdx}
                              className={styles.megaItem}
                              onClick={() => {
                                if (item.tab) {
                                  setActiveTab(item.tab);
                                  if (item.stockType) setStockAlertType(item.stockType);
                                  showToast(`Switched to ${item.title}`);
                                }
                                setActiveMenu(null);
                              }}
                            >
                              <div className={styles.megaItemIcon}>{item.icon}</div>
                              <div className={styles.megaItemMeta}>
                                <div className={styles.megaItemTitleRow}>
                                  <span className={styles.megaItemTitle}>{item.title}</span>
                                  {item.tag && (
                                    <span
                                      className={`${styles.megaTag} ${item.tag === "NEW" ? styles.megaTagNew : styles.megaTagBeta}`}
                                    >
                                      {item.tag}
                                    </span>
                                  )}
                                </div>
                                <p className={styles.megaItemDesc}>{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right: Active Alerts Trigger & Wallet Pill */}
          <div className={styles.headerRight}>
            <button
              type="button"
              className={styles.activeAlertsPill}
              onClick={() => setIsDrawerOpen(true)}
              title="View your active alerts"
            >
              <span className={styles.pulseGreenDot} />
              <span>{activeAlerts.filter((a) => a.isActive).length} Active Alerts</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── 2. MAIN WORKSPACE / CARD BUILDER ─────────────────────────── */}
      <main className={styles.mainWorkspace}>
        {/* Main Alert Card */}
        <div className={styles.customCard}>
          {/* Card Header */}
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <div className={styles.cardIconCircle}>{headerContent.icon}</div>
              <div className={styles.cardTitleMeta}>
                {activeTab === "Stocks" ? (
                  <div className={styles.cardTitleSelectRow}>
                    <select
                      value={stockAlertType}
                      onChange={(e) => setStockAlertType(e.target.value)}
                      className={styles.cardTitleSelect}
                    >
                      <option value="Price">Stock Market Alert</option>
                      <option value="Volatility">Stock Volatility Alert</option>
                      <option value="Periodic">Periodic Stock Price Alerts</option>
                    </select>
                    <h2 className={styles.cardTitle}>{headerContent.title}</h2>
                    <ChevronDown size={16} color="#737373" />
                  </div>
                ) : (
                  <h2 className={styles.cardTitle}>{headerContent.title}</h2>
                )}
                <p className={styles.cardDesc}>{headerContent.desc}</p>
              </div>
            </div>

            {/* Live Ticker Pill */}
            <div className={styles.liveTickerPill}>
              <span className={styles.pulseGreenDot} />
              <span className={styles.tickerSymbol}>{livePriceData.symbol}</span>
              <span className={styles.tickerPrice}>{livePriceData.price}</span>
            </div>
          </div>

          {/* ── DYNAMIC FORM SECTIONS ───────────────────────────────── */}
          {/* 1. PRICE ALERT */}
          {activeTab === "Price" && (
            <div className={styles.formSection}>
              <div className={styles.fieldGrid3}>
                <Dropdown
                  label="COIN"
                  options={COIN_OPTIONS}
                  selected={selectedCoin}
                  onSelect={setSelectedCoin}
                />
                <Dropdown
                  label="EXCHANGE"
                  options={SPOT_EXCHANGES}
                  selected={selectedExchange}
                  onSelect={setSelectedExchange}
                />
                <Dropdown
                  label="CURRENCY"
                  options={CURRENCIES}
                  selected={selectedCurrency}
                  onSelect={setSelectedCurrency}
                />
              </div>

              <div className={styles.fieldGrid2}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>DIRECTION</label>
                  <div className={styles.directionGroup}>
                    <button
                      type="button"
                      className={`${styles.directionBtn} ${direction === "above" ? styles.directionBtnActiveAbove : ""}`}
                      onClick={() => setDirection("above")}
                    >
                      <ArrowUp size={16} />
                      <span>Above</span>
                    </button>
                    <button
                      type="button"
                      className={`${styles.directionBtn} ${direction === "below" ? styles.directionBtnActiveBelow : ""}`}
                      onClick={() => setDirection("below")}
                    >
                      <ArrowDown size={16} />
                      <span>Below</span>
                    </button>
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>TARGET PRICE</label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.inputPrefix}>$</span>
                    <input
                      type="text"
                      className={`${styles.textInput} ${styles.textInputWithPrefix}`}
                      placeholder="0.00"
                      value={targetPrice}
                      onChange={(e) => setTargetPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. PERCENTAGE ALERT */}
          {activeTab === "Percent" && (
            <div className={styles.formSection}>
              <div className={styles.fieldGrid3}>
                <Dropdown
                  label="COIN"
                  options={COIN_OPTIONS}
                  selected={selectedCoin}
                  onSelect={setSelectedCoin}
                />
                <Dropdown
                  label="EXCHANGE"
                  options={SPOT_EXCHANGES}
                  selected={selectedExchange}
                  onSelect={setSelectedExchange}
                />
                <Dropdown
                  label="TIMEFRAME"
                  options={TIMEFRAMES}
                  selected={selectedTimeframe}
                  onSelect={setSelectedTimeframe}
                />
              </div>

              <div className={styles.fieldGrid2}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>DIRECTION</label>
                  <div className={styles.directionGroup}>
                    <button
                      type="button"
                      className={`${styles.directionBtn} ${direction === "above" ? styles.directionBtnActiveAbove : ""}`}
                      onClick={() => setDirection("above")}
                    >
                      <ArrowUp size={16} />
                      <span>Goes Up</span>
                    </button>
                    <button
                      type="button"
                      className={`${styles.directionBtn} ${direction === "below" ? styles.directionBtnActiveBelow : ""}`}
                      onClick={() => setDirection("below")}
                    >
                      <ArrowDown size={16} />
                      <span>Goes Down</span>
                    </button>
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>PERCENTAGE CHANGE</label>
                  <div className={styles.inputWrapper}>
                    <input
                      type="text"
                      className={`${styles.textInput} ${styles.textInputWithSuffix}`}
                      placeholder="5.00"
                      value={targetPercent}
                      onChange={(e) => setTargetPercent(e.target.value)}
                    />
                    <span className={styles.inputSuffix}>%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. PERIODIC ALERT */}
          {activeTab === "Periodic" && (
            <div className={styles.formSection}>
              <div className={styles.fieldGrid3}>
                <Dropdown
                  label="COIN"
                  options={COIN_OPTIONS}
                  selected={selectedCoin}
                  onSelect={setSelectedCoin}
                />
                <Dropdown
                  label="EXCHANGE"
                  options={SPOT_EXCHANGES}
                  selected={selectedExchange}
                  onSelect={setSelectedExchange}
                />
                <Dropdown
                  label="CURRENCY"
                  options={CURRENCIES}
                  selected={selectedCurrency}
                  onSelect={setSelectedCurrency}
                />
              </div>

              <div className={styles.fieldGrid2}>
                <Dropdown
                  label="TIME INTERVAL"
                  options={INTERVALS}
                  selected={selectedInterval}
                  onSelect={setSelectedInterval}
                />
              </div>
            </div>
          )}

          {/* 4. VOLUME ALERT */}
          {activeTab === "Volume" && (
            <div className={styles.formSection}>
              <div className={styles.fieldGrid3}>
                <Dropdown
                  label="COIN"
                  options={COIN_OPTIONS}
                  selected={selectedCoin}
                  onSelect={setSelectedCoin}
                />
                <Dropdown
                  label="EXCHANGE"
                  options={SPOT_EXCHANGES}
                  selected={selectedExchange}
                  onSelect={setSelectedExchange}
                />
                <Dropdown
                  label="TIMEFRAME"
                  options={TIMEFRAMES}
                  selected={selectedTimeframe}
                  onSelect={setSelectedTimeframe}
                />
              </div>

              <div className={styles.fieldGrid2}>
                <Dropdown
                  label="VOLUME TRIGGER"
                  options={VOL_TRIGGERS}
                  selected={selectedVolTrigger}
                  onSelect={setSelectedVolTrigger}
                />

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>MULTIPLIER</label>
                  <div className={styles.inputWrapper}>
                    <input
                      type="text"
                      className={`${styles.textInput} ${styles.textInputWithSuffix}`}
                      placeholder="5"
                      value={targetMultiplier}
                      onChange={(e) => setTargetMultiplier(e.target.value)}
                    />
                    <span className={styles.inputSuffix}>x</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. FUNDING RATES ALERT */}
          {activeTab === "Funding" && (
            <div className={styles.formSection}>
              <div className={styles.fieldGrid2}>
                <Dropdown
                  label="COIN"
                  options={COIN_OPTIONS}
                  selected={selectedCoin}
                  onSelect={setSelectedCoin}
                />
                <Dropdown
                  label="FUTURES EXCHANGE"
                  options={FUTURES_EXCHANGES}
                  selected={selectedFuturesExchange}
                  onSelect={setSelectedFuturesExchange}
                />
              </div>

              <div className={styles.fieldGrid2}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>DIRECTION</label>
                  <div className={styles.directionGroup}>
                    <button
                      type="button"
                      className={`${styles.directionBtn} ${direction === "above" ? styles.directionBtnActiveAbove : ""}`}
                      onClick={() => setDirection("above")}
                    >
                      <ArrowUp size={16} />
                      <span>Above</span>
                    </button>
                    <button
                      type="button"
                      className={`${styles.directionBtn} ${direction === "below" ? styles.directionBtnActiveBelow : ""}`}
                      onClick={() => setDirection("below")}
                    >
                      <ArrowDown size={16} />
                      <span>Below</span>
                    </button>
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>TARGET FUNDING RATE</label>
                  <div className={styles.inputWrapper}>
                    <input
                      type="text"
                      className={`${styles.textInput} ${styles.textInputWithSuffix}`}
                      placeholder="0.05"
                      value={targetFunding}
                      onChange={(e) => setTargetFunding(e.target.value)}
                    />
                    <span className={styles.inputSuffix}>%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. MARKETCAP ALERT */}
          {activeTab === "Marketcap" && (
            <div className={styles.formSection}>
              <div className={styles.fieldGrid2}>
                <Dropdown
                  label="ASSET"
                  options={ASSET_OPTIONS}
                  selected={selectedAsset}
                  onSelect={setSelectedAsset}
                />
              </div>

              <div className={styles.fieldGrid2}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>DIRECTION</label>
                  <div className={styles.directionGroup}>
                    <button
                      type="button"
                      className={`${styles.directionBtn} ${direction === "above" ? styles.directionBtnActiveAbove : ""}`}
                      onClick={() => setDirection("above")}
                    >
                      <ArrowUp size={16} />
                      <span>Goes Above</span>
                    </button>
                    <button
                      type="button"
                      className={`${styles.directionBtn} ${direction === "below" ? styles.directionBtnActiveBelow : ""}`}
                      onClick={() => setDirection("below")}
                    >
                      <ArrowDown size={16} />
                      <span>Goes Below</span>
                    </button>
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>TARGET VALUATION</label>
                  <div className={styles.inputWrapper}>
                    <input
                      type="text"
                      className={`${styles.textInput} ${styles.textInputWithSuffix}`}
                      placeholder="100.00"
                      value={targetMarketCap}
                      onChange={(e) => setTargetMarketCap(e.target.value)}
                    />
                    <span className={styles.inputSuffix}>Billion USD</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 7. DOMINANCE ALERT */}
          {activeTab === "Dominance" && (
            <div className={styles.formSection}>
              <div className={styles.fieldGrid2}>
                <Dropdown
                  label="ASSET"
                  options={ASSET_OPTIONS}
                  selected={selectedAsset}
                  onSelect={setSelectedAsset}
                />
              </div>

              <div className={styles.fieldGrid2}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>DIRECTION</label>
                  <div className={styles.directionGroup}>
                    <button
                      type="button"
                      className={`${styles.directionBtn} ${direction === "above" ? styles.directionBtnActiveAbove : ""}`}
                      onClick={() => setDirection("above")}
                    >
                      <ArrowUp size={16} />
                      <span>Goes Above</span>
                    </button>
                    <button
                      type="button"
                      className={`${styles.directionBtn} ${direction === "below" ? styles.directionBtnActiveBelow : ""}`}
                      onClick={() => setDirection("below")}
                    >
                      <ArrowDown size={16} />
                      <span>Goes Below</span>
                    </button>
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>TARGET DOMINANCE</label>
                  <div className={styles.inputWrapper}>
                    <input
                      type="text"
                      className={`${styles.textInput} ${styles.textInputWithSuffix}`}
                      placeholder="58.50"
                      value={targetDominance}
                      onChange={(e) => setTargetDominance(e.target.value)}
                    />
                    <span className={styles.inputSuffix}>%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 8. STOCKS ALERT */}
          {activeTab === "Stocks" && (
            <div className={styles.formSection}>
              <div className={styles.fieldGrid2}>
                <Dropdown
                  label="STOCK / EQUITY"
                  options={STOCK_OPTIONS}
                  selected={selectedStock}
                  onSelect={setSelectedStock}
                />
                {stockAlertType === "Price" && (
                  <Dropdown
                    label="CURRENCY"
                    options={CURRENCIES}
                    selected={selectedCurrency}
                    onSelect={setSelectedCurrency}
                  />
                )}
                {stockAlertType === "Volatility" && (
                  <Dropdown
                    label="TIMEFRAME"
                    options={TIMEFRAMES}
                    selected={selectedTimeframe}
                    onSelect={setSelectedTimeframe}
                  />
                )}
                {stockAlertType === "Periodic" && (
                  <Dropdown
                    label="TIME INTERVAL"
                    options={INTERVALS}
                    selected={selectedInterval}
                    onSelect={setSelectedInterval}
                  />
                )}
              </div>

              {stockAlertType === "Price" && (
                <div className={styles.fieldGrid2}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>DIRECTION</label>
                    <div className={styles.directionGroup}>
                      <button
                        type="button"
                        className={`${styles.directionBtn} ${direction === "above" ? styles.directionBtnActiveAbove : ""}`}
                        onClick={() => setDirection("above")}
                      >
                        <ArrowUp size={16} />
                        <span>Above</span>
                      </button>
                      <button
                        type="button"
                        className={`${styles.directionBtn} ${direction === "below" ? styles.directionBtnActiveBelow : ""}`}
                        onClick={() => setDirection("below")}
                      >
                        <ArrowDown size={16} />
                        <span>Below</span>
                      </button>
                    </div>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>TARGET PRICE</label>
                    <div className={styles.inputWrapper}>
                      <span className={styles.inputPrefix}>$</span>
                      <input
                        type="text"
                        className={`${styles.textInput} ${styles.textInputWithPrefix}`}
                        placeholder="130.00"
                        value={targetPrice}
                        onChange={(e) => setTargetPrice(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {stockAlertType === "Volatility" && (
                <div className={styles.fieldGrid2}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>DIRECTION</label>
                    <div className={styles.directionGroup}>
                      <button
                        type="button"
                        className={`${styles.directionBtn} ${direction === "above" ? styles.directionBtnActiveAbove : ""}`}
                        onClick={() => setDirection("above")}
                      >
                        <ArrowUp size={16} />
                        <span>Goes Up</span>
                      </button>
                      <button
                        type="button"
                        className={`${styles.directionBtn} ${direction === "below" ? styles.directionBtnActiveBelow : ""}`}
                        onClick={() => setDirection("below")}
                      >
                        <ArrowDown size={16} />
                        <span>Goes Down</span>
                      </button>
                    </div>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>PERCENTAGE CHANGE</label>
                    <div className={styles.inputWrapper}>
                      <input
                        type="text"
                        className={`${styles.textInput} ${styles.textInputWithSuffix}`}
                        placeholder="3.50"
                        value={targetPercent}
                        onChange={(e) => setTargetPercent(e.target.value)}
                      />
                      <span className={styles.inputSuffix}>%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 9. ON-CHAIN / LISTINGS ALERTS */}
          {(activeTab === "Listings" || activeTab === "OnChain") && (
            <div className={styles.formSection}>
              <div className={styles.fieldGrid2}>
                <Dropdown
                  label="MONITOR TARGET"
                  options={activeTab === "Listings" ? SPOT_EXCHANGES : ONCHAIN_TIERS}
                  selected={activeTab === "Listings" ? selectedExchange : selectedOnchainTier}
                  onSelect={(opt) =>
                    activeTab === "Listings" ? setSelectedExchange(opt) : setSelectedOnchainTier(opt)
                  }
                />
                <Dropdown
                  label="CHAIN / NETWORK"
                  options={[
                    { value: "Ethereum Mainnet", icon: "Ξ" },
                    { value: "BNB Smart Chain", icon: "B" },
                    { value: "Solana Network", icon: "◎" },
                    { value: "Arbitrum One", icon: "🔺" },
                  ]}
                  selected={{ value: "BNB Smart Chain", icon: "B" }}
                  onSelect={() => {}}
                />
              </div>

              <div className={styles.fieldGrid2}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>TRANSACTION THRESHOLD (USD)</label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.inputPrefix}>$</span>
                    <input
                      type="text"
                      className={`${styles.textInput} ${styles.textInputWithPrefix}`}
                      placeholder="1,000,000"
                      value="1,000,000"
                      onChange={() => {}}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── NOTIFY VIA CHANNELS ─────────────────────────────────── */}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>NOTIFY VIA</label>
            <div className={styles.notifyGrid}>
              {NOTIFY_CHANNELS.map((ch) => {
                const isActive = notifyVia.includes(ch.id);
                return (
                  <button
                    key={ch.id}
                    type="button"
                    className={`${styles.notifyBtn} ${isActive ? styles.notifyBtnActive : ""}`}
                    onClick={() => toggleNotify(ch.id)}
                  >
                    <span className={styles.notifyIcon}>{ch.icon}</span>
                    <span className={styles.notifyLabel}>{ch.id}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── COOLDOWN & NOTE (OPTIONAL) ─────────────────────────── */}
          <div className={styles.fieldGrid2}>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>COOLDOWN</label>
              <div className={styles.cooldownGrid}>
                {COOLDOWNS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`${styles.cooldownBtn} ${cooldown === c ? styles.cooldownBtnActive : ""}`}
                    onClick={() => setCooldown(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <p className={styles.fieldHelperText}>Wait time between repeated alert triggers</p>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>NOTE (OPTIONAL)</label>
              <div className={styles.noteTextareaWrapper}>
                <textarea
                  className={styles.noteTextarea}
                  placeholder="e.g. ATH breakout watch, DCA order setup..."
                  maxLength={100}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <span className={styles.noteCharCount}>{note.length}/100</span>
              </div>
            </div>
          </div>

          {/* ── CARD FOOTER & SET ALERT CTA ─────────────────────────── */}
          <div className={styles.cardFooter}>
            <div
              className={styles.oneTimeToggleRow}
              onClick={() => setIsOneTime(!isOneTime)}
            >
              <div
                className={`${styles.switchTrack} ${isOneTime ? styles.switchTrackActive : ""}`}
              >
                <div
                  className={`${styles.switchThumb} ${isOneTime ? styles.switchThumbActive : ""}`}
                />
              </div>
              <div className={styles.oneTimeMeta}>
                <span className={styles.oneTimeTitle}>One-time alert</span>
                <span className={styles.oneTimeSubtitle}>
                  Get notified only once when this alert triggers.
                </span>
              </div>
            </div>

            <div className={styles.footerRightActions}>
              <span className={styles.activeAlertsCount}>
                {activeAlerts.filter((a) => a.isActive).length} active alerts
              </span>

              <button
                type="button"
                className={styles.btnPremiumGradient}
                onClick={handleSetAlert}
              >
                <span>Set alert</span>
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ── 3. DETAILS & FAQ EDUCATIONAL SECTION ──────────────────── */}
        <TabDetailsSection activeTab={activeTab} stockAlertType={stockAlertType} />
      </main>

      {/* ── 4. FLOATING BOTTOM NAVIGATION BAR (MATCHES REFERENCE) ────── */}
      <div className={styles.floatingBottomNav}>
        {[
          { id: "Price", label: "Price", icon: <TrendingUp size={15} /> },
          { id: "Percent", label: "Percent", icon: <Percent size={15} /> },
          { id: "Periodic", label: "Periodic", icon: <RotateCcw size={15} /> },
          { id: "Volume", label: "Volume", icon: <BarChart3 size={15} /> },
          { id: "Funding", label: "Funding", icon: <DollarSign size={15} /> },
          { id: "Marketcap", label: "Marketcap", icon: <PieChart size={15} /> },
          { id: "Dominance", label: "Dominance", icon: <Globe size={15} /> },
          { id: "Stocks", label: "Stocks", icon: <Grid size={15} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`${styles.bottomNavTab} ${activeTab === tab.id ? styles.bottomNavTabActive : ""}`}
            onClick={() => {
              setActiveTab(tab.id);
              showToast(`Switched to ${tab.label} alert tab`);
            }}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── 5. ACTIVE ALERTS SLIDE-OVER DRAWER ───────────────────────── */}
      {isDrawerOpen && (
        <div
          className={styles.activeAlertsDrawerOverlay}
          onClick={() => setIsDrawerOpen(false)}
        >
          <div
            className={styles.activeAlertsDrawer}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.drawerHeader}>
              <h3 className={styles.drawerTitle}>
                🔔 Active Alerts ({activeAlerts.length})
              </h3>
              <button
                type="button"
                className={styles.drawerCloseBtn}
                onClick={() => setIsDrawerOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className={styles.drawerBody}>
              {activeAlerts.length === 0 ? (
                <div style={{ padding: 30, textAlign: "center", color: "#737373" }}>
                  <p>No active alerts. Use the builder above to set your first alert.</p>
                </div>
              ) : (
                activeAlerts.map((alert) => (
                  <div key={alert.id} className={styles.alertListItem}>
                    <div className={styles.alertItemTop}>
                      <div className={styles.alertItemAssetGroup}>
                        <span className={styles.alertItemBadge}>{alert.type}</span>
                        <span className={styles.alertItemTitle}>{alert.asset}</span>
                      </div>
                      <div
                        className={styles.switchTrack}
                        style={{ cursor: "pointer", background: alert.isActive ? "#22c55e" : "#26262c" }}
                        onClick={() => toggleAlertStatus(alert.id)}
                        title={alert.isActive ? "Pause Alert" : "Resume Alert"}
                      >
                        <div
                          className={`${styles.switchThumb} ${alert.isActive ? styles.switchThumbActive : ""}`}
                        />
                      </div>
                    </div>

                    <div className={styles.alertItemCondition}>{alert.condition}</div>

                    <div className={styles.alertItemMeta}>
                      <span>
                        via {alert.notifyChannels.join(", ")} · {alert.createdAt}
                      </span>
                      <div className={styles.alertItemActions}>
                        <button
                          type="button"
                          className={styles.alertDeleteBtn}
                          onClick={() => deleteAlert(alert.id)}
                          title="Delete Alert"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── TOAST NOTIFICATION ───────────────────────────────────────── */}
      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  );
}

/* -------------------------------------------------------------------------
   SUB-COMPONENT: Custom Dropdown Box
   ------------------------------------------------------------------------- */
function Dropdown({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: DropdownOption[];
  selected: DropdownOption;
  onSelect: (opt: DropdownOption) => void;
}) {
  return (
    <div className={styles.fieldGroup}>
      <label className={styles.fieldLabel}>{label}</label>
      <div className={styles.dropdownBox}>
        <select
          className={styles.dropdownSelectNative}
          value={selected.value}
          onChange={(e) => {
            const found = options.find((o) => o.value === e.target.value);
            if (found) onSelect(found);
          }}
        >
          {options.map((opt, i) => (
            <option key={i} value={opt.value}>
              {opt.value}
            </option>
          ))}
        </select>
        <div className={styles.dropdownValueRow}>
          <span className={styles.dropdownIcon}>{selected.icon}</span>
          <span className={styles.dropdownText}>{selected.value}</span>
        </div>
        <ChevronDown size={14} color="#737373" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   SUB-COMPONENT: Educational Tab Details / FAQ Section
   ------------------------------------------------------------------------- */
function TabDetailsSection({
  activeTab,
  stockAlertType,
}: {
  activeTab: string;
  stockAlertType: string;
}) {
  const content: Record<string, { title: string; q1: string; a1: string; q2: string; a2: string }> = {
    Price: {
      title: "About Crypto Price Alerts",
      q1: "How do Crypto Price Alerts work?",
      a1: "Our market monitoring engine tracks real-time cryptocurrency prices across all major exchanges. Set an alert when a coin like Bitcoin or Ethereum crosses a specific price threshold, and we'll instantly notify you via your chosen channels.",
      q2: "Supported Exchanges & Aggregation",
      a2: "We aggregate data from leading cryptocurrency exchanges including Binance, Coinbase, Kraken, and OKX to ensure you get the most accurate and timely price movements.",
    },
    Percent: {
      title: "About Percentage Price Alerts",
      q1: "How do Percentage Alerts work?",
      a1: "Percentage alerts trigger when a cryptocurrency rises or falls by a customized percentage over a specific timeframe (e.g. 5 minutes, 1 hour, or 1 day). Ideal for catching sudden volatility and breakouts.",
      q2: "Why use Percentage Alerts?",
      a2: "Instead of tracking static price targets, percentage alerts adapt to prevailing market conditions, allowing traders to enter sudden momentum runs regardless of baseline price.",
    },
    Periodic: {
      title: "About Periodic Price Alerts",
      q1: "What is a Periodic Alert?",
      a1: "Periodic alerts send scheduled updates regarding the current price and market pulse of your chosen cryptocurrency directly to your phone, Telegram, or email.",
      q2: "Common Use Cases",
      a2: "Instead of staring at charts all day, receive scheduled hourly or daily digests of your portfolio's performance without manual monitoring.",
    },
    Volume: {
      title: "About Volume Alerts",
      q1: "How does Volume Tracking work?",
      a1: "Volume alerts monitor the 24-hour trading volume of cryptocurrencies, triggering when trading volume instantly spikes or drops by a specified multiplier.",
      q2: "Why track Volume?",
      a2: "Trading volume is a powerful indicator of institutional accumulation. Spikes in volume often precede and confirm breakout moves.",
    },
    Funding: {
      title: "About Funding Rate Alerts",
      q1: "What are perpetual funding rates?",
      a1: "Funding rates are periodic payments between long and short traders that balance perpetual futures with spot index prices. High positive rates signal overcrowded long sentiment.",
      q2: "Why set Funding Alerts?",
      a2: "Extreme funding rates reveal over-leveraged conditions, enabling traders to identify potential market tops, bottoms, and liquidation squeezes.",
    },
    Marketcap: {
      title: "About Market Cap Alerts",
      q1: "How are Market Cap alerts triggered?",
      a1: "Market capitalization represents circulating token supply multiplied by current price. Receive instant notifications when assets cross major billion-dollar milestones.",
      q2: "Total Market Tracking",
      a2: "Track the entire crypto industry valuation as it crosses trillion-dollar barriers to gauge macro market cycles.",
    },
    Dominance: {
      title: "About Bitcoin Dominance Alerts",
      q1: "What is BTC Dominance?",
      a1: "Bitcoin Dominance is the ratio of Bitcoin's market capitalization compared to the total market cap of all cryptocurrencies combined.",
      q2: "Why is Dominance important?",
      a2: "Tracking dominance helps traders identify 'Alt-season'. When Bitcoin dominance falls, capital flows aggressively into altcoins.",
    },
    Stocks: {
      title:
        stockAlertType === "Price"
          ? "About Stock Market Alerts"
          : stockAlertType === "Volatility"
          ? "About Stock Volatility Alerts"
          : "About Periodic Stock Alerts",
      q1: "How do Stock Tracking Alerts work?",
      a1: "We monitor global equities listed on NASDAQ and NYSE using ultra-low latency data feeds to execute immediate price and volatility alerts.",
      q2: "Advanced Stock Tools",
      a2: "In addition to price targets, our stock tracker supports percentage volatility and scheduled digests for equities and ETFs.",
    },
    Listings: {
      title: "About Coin Listing Alerts",
      q1: "How fast are listing notifications?",
      a1: "Our bots monitor exchange smart contracts and announcement APIs in real-time, delivering listing alerts within 1–3 seconds.",
      q2: "Which platforms are supported?",
      a2: "Supports Binance, Coinbase, Bybit, OKX, Uniswap, PancakeSwap, and major decentralized meme launchpads.",
    },
    OnChain: {
      title: "About On-Chain Whale Alerts",
      q1: "How does whale tracking operate?",
      a1: "Direct RPC node listeners watch for transactions exceeding $1M+ USD, exchange wallet inflows, and smart money caller movements.",
      q2: "Customizable Thresholds",
      a2: "Filter transactions by chain (Ethereum, BNB, Solana, Arbitrum), minimum dollar size, and specific wallet tags.",
    },
  };

  const curr = content[activeTab] || content.Price;

  return (
    <section className={styles.detailsSection}>
      <h3 className={styles.detailsTitle}>
        <Info size={18} color="#38bdf8" />
        <span>{curr.title}</span>
      </h3>
      <div className={styles.detailsGrid}>
        <div className={styles.faqCard}>
          <h4 className={styles.faqQuestion}>{curr.q1}</h4>
          <p className={styles.faqAnswer}>{curr.a1}</p>
        </div>
        <div className={styles.faqCard}>
          <h4 className={styles.faqQuestion}>{curr.q2}</h4>
          <p className={styles.faqAnswer}>{curr.a2}</p>
        </div>
      </div>
    </section>
  );
}
