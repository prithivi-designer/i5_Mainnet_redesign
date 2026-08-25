"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  User,
  Box,
  ChevronDown,
  ChevronRight,
  Copy,
  Pencil,
  Check,
  Link as LinkIcon,
  Layers,
  RotateCw,
  Gift,
  Shield,
  Sliders,
  Sparkles,
  Eye,
  EyeOff,
  CreditCard,
  HelpCircle,
  Plus,
} from "lucide-react";
import styles from "./AccountModal.module.css";
import { IconHyperliquid, IconAster } from "../dashboard/QuickTradeModal";

/* ----------------------------------------------------------
   Exchange Brand Icons (SVGs)
   ---------------------------------------------------------- */
const ExchangeIcons: Record<string, React.ReactNode> = {
  hyperliquid: <IconHyperliquid size={16} />,
  aster: <IconAster size={16} />,
  pacifica: (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1.5C5 4.5 4 7 4 9.5a4 4 0 0 0 8 0c0-2.5-1-5-4-8z"
        stroke="#ffffff"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle cx="8" cy="9.5" r="1.5" fill="#ffffff" />
    </svg>
  ),
  extended: (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
      <path
        d="M3.5 3.5L12.5 12.5M12.5 3.5L3.5 12.5"
        stroke="#2fcb73"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  ),
  grvt: (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="#8FE8B8" strokeWidth="1.4" />
      <path
        d="M8 4.5a3.5 3.5 0 1 1-3.5 3.5H8"
        stroke="#8FE8B8"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  ),
  hibachi: (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
      <path
        d="M8 2C8 2 11 5.5 11 9a3 3 0 0 1-6 0c0-2 1.5-3.5 1.5-3.5S7.5 7 8 7c0-2 0-5 0-5z"
        fill="#FF5722"
      />
    </svg>
  ),
  paradex: (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" fill="#00E5FF" fillOpacity="0.2" stroke="#00E5FF" strokeWidth="1.2" />
      <circle cx="8" cy="8" r="2.5" fill="#00E5FF" />
    </svg>
  ),
  decibel: (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="#FFEB3B" strokeWidth="1.5" />
      <circle cx="8" cy="8" r="2" fill="#FFEB3B" />
    </svg>
  ),
  hotstuff: (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
      <path
        d="M9 2L4 9h4.5L7 14l6-8H8.5L9 2z"
        fill="#E0E0E0"
      />
    </svg>
  ),
  risex: (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="#00E676" strokeWidth="1.4" />
      <path d="M5.5 10.5L10.5 5.5M10.5 5.5H7M10.5 5.5V9" stroke="#00E676" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  phoenix: (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" fill="#FF9800" fillOpacity="0.2" stroke="#FF9800" strokeWidth="1.2" />
      <path d="M8 4v8M4 8h8" stroke="#FF9800" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  ondo: (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="#BDBDBD" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="8" cy="8" r="4" stroke="#BDBDBD" strokeWidth="1" />
      <circle cx="8" cy="8" r="1.5" fill="#BDBDBD" />
    </svg>
  ),
  perpl: (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
      <path d="M4.5 3v10M11.5 3v10M4.5 8h7" stroke="#AB47BC" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
};

/* ----------------------------------------------------------
   Exchange definitions list
   ---------------------------------------------------------- */
interface ExchangeItem {
  id: string;
  name: string;
  iconKey: string;
}

const EXCHANGES: ExchangeItem[] = [
  { id: "hyperliquid", name: "Hyperliquid", iconKey: "hyperliquid" },
  { id: "aster", name: "Aster", iconKey: "aster" },
  { id: "pacifica", name: "Pacifica", iconKey: "pacifica" },
  { id: "extended", name: "Extended", iconKey: "extended" },
  { id: "grvt", name: "GRVT", iconKey: "grvt" },
  { id: "hibachi", name: "Hibachi", iconKey: "hibachi" },
  { id: "paradex", name: "Paradex", iconKey: "paradex" },
  { id: "decibel", name: "Decibel", iconKey: "decibel" },
  { id: "hotstuff", name: "HotStuff", iconKey: "hotstuff" },
  { id: "risex", name: "RiseX", iconKey: "risex" },
  { id: "phoenix", name: "Phoenix", iconKey: "phoenix" },
  { id: "ondo", name: "Ondo Perps", iconKey: "ondo" },
  { id: "perpl", name: "Perpl", iconKey: "perpl" },
];

/* Connected account model */
export interface ConnectedAccount {
  id: string;
  exchangeId: string;
  exchangeName: string;
  accountLabel: string;
  apiKeyMasked: string;
  permission: "Read-Only" | "Trading" | "Full Access";
  connectedAt: string;
}

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccountModal({ isOpen, onClose }: AccountModalProps) {
  // Navigation State — Default to Profile Menu
  const [activeTab, setActiveTab] = useState<"profile" | "userInfo" | "exchanges">("profile");
  const [selectedExchangeFilter, setSelectedExchangeFilter] = useState<string>("all");
  const [isExchangeAccordionOpen, setIsExchangeAccordionOpen] = useState<boolean>(true);

  // Profile View States (Matching Reference Screenshots)
  const [profileName, setProfileName] = useState<string>("web3noob3");
  const [profileHandle, setProfileHandle] = useState<string>("@web3noob3");
  const [followingCount] = useState<number>(3);
  const [followersCount] = useState<number>(1);
  const [tradesCount] = useState<number>(1);
  const [isBalanceVisible, setIsBalanceVisible] = useState<boolean>(true);
  const [portfolioTimeframe, setPortfolioTimeframe] = useState<"24H" | "7D" | "30D" | "ALL">("24H");
  const [positionsStatus, setPositionsStatus] = useState<"Open" | "Closed">("Open");
  const [positionsFilter, setPositionsFilter] = useState<"All" | "Tokens" | "Perps">("All");
  const [swapsFilter, setSwapsFilter] = useState<"All swaps" | "Buys" | "Sells">("All swaps");

  // Edit Profile Sub-Dialog
  const [isEditProfileOpen, setIsEditProfileOpen] = useState<boolean>(false);
  const [editNameInput, setEditNameInput] = useState<string>("web3noob3");
  const [editHandleInput, setEditHandleInput] = useState<string>("@web3noob3");

  // User Info States
  const [email, setEmail] = useState<string>("");
  const [walletAddress] = useState<string>("0x8f2A134659b3dc");
  const [telegram, setTelegram] = useState<string>("");
  const [isEditingTelegram, setIsEditingTelegram] = useState<boolean>(false);
  const [telegramDraft, setTelegramDraft] = useState<string>("");
  const [discordConnected, setDiscordConnected] = useState<boolean>(false);
  const [xConnected, setXConnected] = useState<boolean>(false);

  // Connected Exchange Accounts
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([]);

  // Sub-modal for connecting exchange
  const [isConnectModalOpen, setIsConnectModalOpen] = useState<boolean>(false);
  const [targetExchangeId, setTargetExchangeId] = useState<string>("hyperliquid");
  const [accountLabelInput, setAccountLabelInput] = useState<string>("");
  const [apiKeyInput, setApiKeyInput] = useState<string>("");
  const [permissionInput, setPermissionInput] = useState<"Read-Only" | "Trading" | "Full Access">("Trading");

  // Email sub-prompt
  const [isConnectingEmail, setIsConnectingEmail] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>("");

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isEditProfileOpen) {
          setIsEditProfileOpen(false);
        } else if (isConnectModalOpen) {
          setIsConnectModalOpen(false);
        } else if (isConnectingEmail) {
          setIsConnectingEmail(false);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isEditProfileOpen, isConnectModalOpen, isConnectingEmail, onClose]);

  if (!isOpen) return null;

  // Copy helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard`);
  };

  // Telegram save
  const handleSaveTelegram = () => {
    setTelegram(telegramDraft.trim());
    setIsEditingTelegram(false);
    showToast("Telegram username updated");
  };

  // Add connected account
  const handleAddAccount = () => {
    const exchange = EXCHANGES.find((e) => e.id === targetExchangeId);
    if (!exchange) return;

    const newAcc: ConnectedAccount = {
      id: Math.random().toString(36).substring(2, 9),
      exchangeId: exchange.id,
      exchangeName: exchange.name,
      accountLabel: accountLabelInput.trim() || `${exchange.name} Main`,
      apiKeyMasked: apiKeyInput ? `****${apiKeyInput.slice(-4)}` : "****b3dc",
      permission: permissionInput,
      connectedAt: "Just now",
    };

    setAccounts((prev) => [newAcc, ...prev]);
    setIsConnectModalOpen(false);
    setAccountLabelInput("");
    setApiKeyInput("");
    showToast(`Connected ${exchange.name} account`);
  };

  // Disconnect account
  const handleDisconnect = (id: string, name: string) => {
    setAccounts((prev) => prev.filter((a) => a.id !== id));
    showToast(`Disconnected ${name}`);
  };

  // Filter accounts
  const filteredAccounts =
    selectedExchangeFilter === "all"
      ? accounts
      : accounts.filter((a) => a.exchangeId === selectedExchangeFilter);

  const getExchangeCount = (exchangeId: string) => {
    return accounts.filter((a) => a.exchangeId === exchangeId).length;
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header (Title + Subtitle on Left, Close Button on Right) */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>Account</h2>
            <p className={styles.subtitle}>Manage your account preferences and system configurations.</p>
          </div>

          <button className={styles.closeBtn} onClick={onClose} aria-label="Close Account Modal">
            <X size={16} />
          </button>
        </div>

        {/* Modal Body (2 Columns) */}
        <div className={styles.body}>
          {/* Left Navigation Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarNavGroup}>
              {/* Tab 1: Profile (New Reference Feature) */}
              <button
                className={`${styles.navItem} ${activeTab === "profile" ? styles.navItemActive : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                <span className={styles.navItemIcon}>
                  <User size={16} />
                </span>
                <span>Profile</span>
              </button>

              {/* Tab 2: User Info */}
              <button
                className={`${styles.navItem} ${activeTab === "userInfo" ? styles.navItemActive : ""}`}
                onClick={() => setActiveTab("userInfo")}
              >
                <span className={styles.navItemIcon}>
                  <Sliders size={16} />
                </span>
                <span>User Info</span>
              </button>

              {/* Tab 3: Exchange Accounts (Clean Standard Tab) */}
              <button
                className={`${styles.navItem} ${activeTab === "exchanges" ? styles.navItemActive : ""}`}
                onClick={() => setActiveTab("exchanges")}
              >
                <span className={styles.navItemIcon}>
                  <Box size={16} />
                </span>
                <span>Exchange Accounts</span>
                <span className={styles.countBadge}>({accounts.length})</span>
              </button>
            </div>

            {/* Sidebar Bottom Group: Vertical Stack */}
            <div className={styles.sidebarBottomGroup}>
              {/* Stack 1: Portfolio Value & 24h PnL */}
              <div className={styles.sidebarStatCard}>
                <div className={styles.sidebarStatHeader}>
                  <span className={styles.sidebarStatLabel}>Portfolio</span>
                  <div className={styles.sidebarPnlRow}>
                    <span className={styles.sidebarChangeRed}>-$0.23</span>
                    <span className={styles.sidebarChangeLabel}>24h</span>
                  </div>
                </div>
                <div className={styles.sidebarStatBigVal}>$4.58</div>
              </div>

              {/* Stack 2: Trade Cash with Separate Plus Button */}
              <div className={styles.sidebarStatCard}>
                <div className={styles.sidebarCashRow}>
                  <div className={styles.sidebarCashMeta}>
                    <span className={styles.sidebarStatLabel}>Trade cash</span>
                    <span className={styles.sidebarCashBigVal}>$0.33</span>
                  </div>
                  <button
                    className={styles.sidebarPlusBtn}
                    onClick={() => showToast("Add trade cash modal opened")}
                    title="Add trade cash"
                    aria-label="Add trade cash"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Stack 3: Need Help Card */}
              <div
                className={styles.sidebarHelpCard}
                onClick={() => showToast("Opening documentation & support...")}
              >
                <div className={styles.helpIconBox}>
                  <HelpCircle size={15} />
                </div>
                <div className={styles.helpContent}>
                  <span className={styles.helpTitle}>Need help?</span>
                  <span className={styles.helpSub}>Visit our docs or contact support.</span>
                </div>
                <ChevronRight size={14} className={styles.helpArrow} />
              </div>
            </div>
          </aside>

          {/* Right Content Area */}
          <main className={styles.contentArea}>
            {/* VIEW 0: PROFILE (Matching Reference Mockup) */}
            {activeTab === "profile" && (
              <div className={styles.profileContainer}>
                {/* Block 1: Hero Top Banner Card */}
                <div className={styles.heroBannerCard}>
                  {/* Glowing Wave SVG Background */}
                  <div className={styles.heroWaveBg}>
                    <svg
                      className={styles.heroWaveSvg}
                      viewBox="0 0 700 120"
                      preserveAspectRatio="none"
                      fill="none"
                    >
                      <path
                        d="M0 60 C 150 90, 280 20, 420 70 C 550 110, 620 40, 700 80"
                        stroke="rgba(255, 42, 133, 0.4)"
                        strokeWidth="2.5"
                      />
                      <path
                        d="M0 75 C 180 30, 320 100, 480 40 C 580 10, 650 70, 700 50"
                        stroke="rgba(56, 189, 248, 0.45)"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>

                  <div className={styles.heroLeft}>
                    <div
                      className={styles.heroAvatarWrap}
                      onClick={() => setIsEditProfileOpen(true)}
                      title="Click to edit profile"
                    >
                      <svg className={styles.heroAvatarPillsSvg} viewBox="0 0 100 100" fill="currentColor">
                        <rect x="20" y="32" width="24" height="36" rx="12" fill="#ffffff" transform="rotate(-15 32 50)" />
                        <rect x="52" y="32" width="24" height="36" rx="12" fill="#ffffff" transform="rotate(-15 64 50)" />
                      </svg>
                    </div>

                    <div className={styles.heroMetaCol}>
                      <h3 className={styles.heroDisplayName}>{profileName}</h3>
                      <p className={styles.heroHandle}>{profileHandle}</p>
                      <div className={styles.heroChipsRow}>
                        <span className={styles.heroChip}>🕒 No hold time</span>
                        <span className={styles.heroChip}>⚡ {tradesCount} trade</span>
                        <span className={styles.heroChip}>📅 Joined Aug 2026</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.heroRight}>
                    <div className={styles.heroActionsRow}>
                      <button
                        className={styles.heroEditBtn}
                        onClick={() => {
                          setEditNameInput(profileName);
                          setEditHandleInput(profileHandle);
                          setIsEditProfileOpen(true);
                        }}
                      >
                        <Pencil size={12} />
                        <span>Edit profile</span>
                      </button>
                      <button
                        className={styles.heroIconBtn}
                        title="Reload / Trade History"
                        onClick={() => showToast("Trade history refreshed")}
                      >
                        <RotateCw size={14} />
                      </button>
                      <button
                        className={styles.heroIconBtn}
                        title="Rewards & Referral Gift"
                        onClick={() => showToast("Rewards program active")}
                      >
                        <Gift size={14} />
                      </button>
                    </div>

                    <div className={styles.heroStatsRow}>
                      <div className={styles.heroStatItem}>
                        <span className={styles.heroStatNum}>{followingCount}</span>
                        <span className={styles.heroStatLabel}>Following</span>
                      </div>
                      <div className={styles.heroStatDivider} />
                      <div className={styles.heroStatItem}>
                        <span className={styles.heroStatNum}>{followersCount}</span>
                        <span className={styles.heroStatLabel}>Followers</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Block 2: Middle Grid (Portfolio Value + All Swaps) */}
                <div className={styles.middleGrid}>
                  {/* Left Column: Portfolio Value Card */}
                  <div className={styles.portfolioCard}>
                    <div className={styles.portfolioHeader}>
                      <div className={styles.portfolioTitleRow}>
                        <span>Portfolio Value</span>
                        <button
                          className={styles.eyeIconBtn}
                          onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                          title={isBalanceVisible ? "Hide balance" : "Show balance"}
                        >
                          {isBalanceVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                        </button>
                      </div>

                      <div className={styles.timeframeSelector}>
                        {(["24H", "7D", "30D", "ALL"] as const).map((tf) => (
                          <button
                            key={tf}
                            className={`${styles.tfButton} ${
                              portfolioTimeframe === tf ? styles.tfButtonActive : ""
                            }`}
                            onClick={() => setPortfolioTimeframe(tf)}
                          >
                            {tf}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className={styles.portfolioBalanceRow}>
                      <div className={styles.portfolioBigVal}>
                        {isBalanceVisible ? "$4.58" : "••••••"}
                      </div>
                      <div className={styles.portfolioChangeRow}>
                        <span className={styles.portfolioChangeVal}>
                          {isBalanceVisible ? "-$0.23 (-4.78%)" : "••••"}
                        </span>
                        <span className={styles.portfolioChangeLabel}>24h</span>
                      </div>
                    </div>

                    {/* Detailed Chart with Y-Axis and X-Axis labels */}
                    <div className={styles.chartContainer}>
                      <div className={styles.yAxisLabels}>
                        <span>$5.00</span>
                        <span>$4.00</span>
                        <span>$3.00</span>
                        <span>$2.00</span>
                      </div>
                      <div className={styles.chartPlotArea}>
                        <div className={styles.chartSvgWrap}>
                          <svg
                            className={styles.chartSvg}
                            viewBox="0 0 320 65"
                            preserveAspectRatio="none"
                          >
                            <defs>
                              <linearGradient id="pnlGradArea" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#ff3b69" stopOpacity="0.32" />
                                <stop offset="100%" stopColor="#ff3b69" stopOpacity="0.0" />
                              </linearGradient>
                            </defs>
                            <path
                              d="M 0 45 Q 15 48 30 54 Q 40 56 45 42 Q 55 12 75 14 Q 150 14 200 13 Q 260 16 320 12 L 320 65 L 0 65 Z"
                              fill="url(#pnlGradArea)"
                            />
                            <path
                              d="M 0 45 Q 15 48 30 54 Q 40 56 45 42 Q 55 12 75 14 Q 150 14 200 13 Q 260 16 320 12"
                              fill="none"
                              stroke="#ff3b69"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        <div className={styles.xAxisLabels}>
                          <span>00:00</span>
                          <span>06:00</span>
                          <span>12:00</span>
                          <span>18:00</span>
                          <span>24:00</span>
                        </div>
                      </div>
                    </div>

                    {/* Total Cash Card inside */}
                    <div className={styles.totalCashRow}>
                      <div className={styles.totalCashLeft}>
                        <div className={styles.walletIconBox}>
                          <CreditCard size={16} />
                        </div>
                        <div className={styles.cashTextMeta}>
                          <span className={styles.cashSmallLabel}>Total cash</span>
                          <span className={styles.cashAmountVal}>$0.33</span>
                        </div>
                      </div>
                      <div className={styles.cashBtnGroup}>
                        <button
                          className={styles.withdrawActionBtn}
                          onClick={() => showToast("Withdrawal flow opened")}
                        >
                          Withdraw
                        </button>
                        <button
                          className={styles.depositActionBtn}
                          onClick={() => showToast("Deposit modal opened")}
                        >
                          Deposit
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: All Swaps Card */}
                  <div className={styles.swapsCard}>
                    <div>
                      <div className={styles.swapsNavRow}>
                        {(["All swaps", "Buys", "Sells"] as const).map((tab) => (
                          <button
                            key={tab}
                            className={`${styles.swapNavItem} ${
                              swapsFilter === tab ? styles.swapNavItemActive : ""
                            }`}
                            onClick={() => setSwapsFilter(tab)}
                          >
                            {tab}
                            {swapsFilter === tab && <div className={styles.swapActiveLine} />}
                          </button>
                        ))}
                      </div>

                      <div className={styles.swapsTableHead}>
                        <span>Token</span>
                        <span>Action</span>
                        <span style={{ textAlign: "right" }}>Amount</span>
                        <span />
                      </div>

                      <div className={styles.swapsItemsList}>
                        {/* Row 1: DOHO */}
                        <div
                          className={styles.swapItemRow}
                          onClick={() => showToast("DOHO transaction detail opened")}
                        >
                          <div className={styles.swapTokenBox}>
                            <img
                              src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=100&auto=format&fit=crop&q=60"
                              alt="DOHO"
                              className={styles.swapTokenAvatar}
                            />
                            <span className={styles.swapTokenName}>DOHO</span>
                          </div>
                          <div>
                            <span className={styles.buyBadge}>Buy</span>
                          </div>
                          <div className={styles.swapAmountText}>$4.41</div>
                          <div className={styles.swapRowChevron}>
                            <ChevronRight size={14} />
                          </div>
                        </div>

                        {/* Row 2: CASHCAT */}
                        <div
                          className={styles.swapItemRow}
                          onClick={() => showToast("CASHCAT transaction detail opened")}
                        >
                          <div className={styles.swapTokenBox}>
                            <img
                              src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=100&auto=format&fit=crop&q=60"
                              alt="CASHCAT"
                              className={styles.swapTokenAvatar}
                            />
                            <span className={styles.swapTokenName}>CASHCAT</span>
                          </div>
                          <div>
                            <span className={styles.buyBadge}>Buy</span>
                          </div>
                          <div className={styles.swapAmountText}>$2.29</div>
                          <div className={styles.swapRowChevron}>
                            <ChevronRight size={14} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      className={styles.viewAllSwapsLink}
                      onClick={() => showToast("Showing all historical swaps")}
                    >
                      <span>View all swaps</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

                {/* Block 3: Bottom Full-Width Card: Positions */}
                <div className={styles.positionsCardFull}>
                  <div className={styles.posHeaderRow}>
                    <h4 className={styles.posTitleBig}>
                      Positions <span className={styles.posCountMuted}>(1)</span>
                    </h4>
                    <div className={styles.openClosedSegment}>
                      <button
                        className={positionsStatus === "Open" ? styles.openTabActive : styles.closedTabInactive}
                        onClick={() => setPositionsStatus("Open")}
                      >
                        <span className={styles.openCyanDot} />
                        Open
                      </button>
                      <button
                        className={positionsStatus === "Closed" ? styles.openTabActive : styles.closedTabInactive}
                        onClick={() => setPositionsStatus("Closed")}
                      >
                        Closed
                      </button>
                    </div>
                  </div>

                  <div className={styles.posSubTabsRow}>
                    {(["All", "Tokens", "Perps"] as const).map((filter) => (
                      <button
                        key={filter}
                        className={`${styles.posFilterChip} ${
                          positionsFilter === filter ? styles.posFilterChipActive : ""
                        }`}
                        onClick={() => setPositionsFilter(filter)}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>

                  {/* Full-width Position Row */}
                  <div
                    className={styles.fullPosRow}
                    onClick={() => showToast("Navigating to Cash Cat trading terminal")}
                  >
                    <div className={styles.fullPosLeft}>
                      <div className={styles.posAvatarBox}>
                        <img
                          src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=100&auto=format&fit=crop&q=60"
                          alt="Cash Cat"
                          className={styles.posAvatarImg}
                        />
                        <span className={styles.blueCheckBadge}>✓</span>
                      </div>
                      <div className={styles.posNames}>
                        <span className={styles.posMainName}>Cash Cat</span>
                        <span className={styles.posTickerMuted}>11.80 CASHCAT</span>
                      </div>
                    </div>

                    <div className={styles.fullPosRight}>
                      <div className={styles.posPriceBlock}>
                        <span className={styles.posPriceVal}>$2.29</span>
                        <span className={styles.posGainGreen}>▲ 18.34%</span>
                      </div>

                      {/* Mini green wave sparkline */}
                      <svg className={styles.posSparklineWave} viewBox="0 0 80 28" fill="none">
                        <defs>
                          <linearGradient id="posGreenArea" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0 24 Q 20 22 35 16 T 55 18 T 80 4 L 80 28 L 0 28 Z"
                          fill="url(#posGreenArea)"
                        />
                        <path
                          d="M0 24 Q 20 22 35 16 T 55 18 T 80 4"
                          stroke="#10b981"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>

                      <ChevronRight size={16} className={styles.posChevron} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 1 & 2 in standard panelCard container */}
            {activeTab !== "profile" && (
              <div className={styles.panelCard}>
                {/* VIEW 1: USER INFO */}
                {activeTab === "userInfo" && (
                  <div className={styles.userInfoList}>
                  {/* Row 1: Email Login */}
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Email Login</span>
                    {email ? (
                      <div className={styles.infoValueGroup}>
                        <span className={styles.infoMonoValue}>{email}</span>
                        <button
                          className={styles.iconOnlyBtn}
                          onClick={() => {
                            setEmail("");
                            showToast("Email disconnected");
                          }}
                          title="Disconnect email"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : isConnectingEmail ? (
                      <div className={styles.infoValueGroup}>
                        <input
                          type="email"
                          className={styles.inlineInput}
                          placeholder="user@domain.com"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && emailInput) {
                              setEmail(emailInput);
                              setIsConnectingEmail(false);
                              setEmailInput("");
                              showToast("Email connected");
                            }
                          }}
                          autoFocus
                        />
                        <button
                          className={styles.saveBtn}
                          onClick={() => {
                            if (emailInput) {
                              setEmail(emailInput);
                              setIsConnectingEmail(false);
                              setEmailInput("");
                              showToast("Email connected");
                            }
                          }}
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <button
                        className={styles.actionBtn}
                        onClick={() => setIsConnectingEmail(true)}
                      >
                        <LinkIcon size={12} />
                        <span>CONNECT EMAIL</span>
                      </button>
                    )}
                  </div>

                  {/* Row 2: Wallet Address */}
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Wallet Address</span>
                    <div className={styles.infoValueGroup}>
                      <span className={styles.infoMonoValue}>****b3dc</span>
                      <button
                        className={styles.iconOnlyBtn}
                        onClick={() => handleCopy(walletAddress, "Wallet address")}
                        title="Copy wallet address"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Row 3: Telegram */}
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Telegram</span>
                    {isEditingTelegram ? (
                      <div className={styles.infoValueGroup}>
                        <input
                          type="text"
                          className={styles.inlineInput}
                          placeholder="@username"
                          value={telegramDraft}
                          onChange={(e) => setTelegramDraft(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSaveTelegram();
                          }}
                          autoFocus
                        />
                        <button className={styles.saveBtn} onClick={handleSaveTelegram}>
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className={styles.infoValueGroup}>
                        <span className={styles.infoMonoValue}>{telegram || "—"}</span>
                        <button
                          className={styles.iconOnlyBtn}
                          onClick={() => {
                            setTelegramDraft(telegram);
                            setIsEditingTelegram(true);
                          }}
                          title="Edit Telegram handle"
                        >
                          <Pencil size={13} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Row 4: Discord */}
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Discord</span>
                    {discordConnected ? (
                      <div className={styles.infoValueGroup}>
                        <span className={styles.infoMonoValue}>i5_trader#0001</span>
                        <button
                          className={`${styles.actionBtn} ${styles.actionBtnConnected}`}
                          onClick={() => {
                            setDiscordConnected(false);
                            showToast("Discord disconnected");
                          }}
                        >
                          CONNECTED
                        </button>
                      </div>
                    ) : (
                      <button
                        className={styles.actionBtn}
                        onClick={() => {
                          setDiscordConnected(true);
                          showToast("Discord connected successfully");
                        }}
                      >
                        CONNECT DISCORD
                      </button>
                    )}
                  </div>

                  {/* Row 5: X (Twitter) */}
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>X</span>
                    {xConnected ? (
                      <div className={styles.infoValueGroup}>
                        <span className={styles.infoMonoValue}>@i5_trader</span>
                        <button
                          className={`${styles.actionBtn} ${styles.actionBtnConnected}`}
                          onClick={() => {
                            setXConnected(false);
                            showToast("X account disconnected");
                          }}
                        >
                          CONNECTED
                        </button>
                      </div>
                    ) : (
                      <button
                        className={styles.actionBtn}
                        onClick={() => {
                          setXConnected(true);
                          showToast("X account connected successfully");
                        }}
                      >
                        CONNECT X
                      </button>
                    )}
                  </div>

                  {/* Guided Setup Section */}
                  <div className={styles.guidedSetupSection}>
                    <div className={styles.guidedSetupLeft}>
                      <span className={styles.guidedSetupTitle}>Guided setup</span>
                      <span className={styles.guidedSetupDesc}>
                        Review your display name, avatar, and Arbitai features.
                      </span>
                    </div>
                    <button
                      className={styles.actionBtn}
                      onClick={() => showToast("Starting Guided Setup...")}
                    >
                      RESTART SETUP
                    </button>
                  </div>
                </div>
              )}

              {/* VIEW 2: EXCHANGE ACCOUNTS (All Exchanges Shown Inside View) */}
              {activeTab === "exchanges" && (
                <>
                  {/* Top Header Row */}
                  <div className={styles.exchangeHeaderRow}>
                    <div className={styles.exchangeHeaderLeft}>
                      <span className={styles.exchangeHeaderTitle}>Exchange Accounts</span>
                      <span className={styles.exchangeHeaderSub}>
                        Manage connected exchange API keys and multi-venue trade execution routing.
                      </span>
                    </div>
                    <button
                      className={styles.actionBtn}
                      onClick={() => {
                        if (selectedExchangeFilter !== "all") {
                          setTargetExchangeId(selectedExchangeFilter);
                        }
                        setIsConnectModalOpen(true);
                      }}
                      title="Connect exchange account"
                    >
                      <Plus size={13} />
                      <span>CONNECT ACCOUNT</span>
                    </button>
                  </div>

                  {/* Horizontal Exchange Filter Pills */}
                  <div className={styles.exchangeFilterBar}>
                    <button
                      className={`${styles.exchangeFilterPill} ${
                        selectedExchangeFilter === "all" ? styles.exchangeFilterPillActive : ""
                      }`}
                      onClick={() => setSelectedExchangeFilter("all")}
                    >
                      <span>All Accounts</span>
                      <span className={styles.countBadge}>({accounts.length})</span>
                    </button>

                    {EXCHANGES.map((ex) => {
                      const count = getExchangeCount(ex.id);
                      return (
                        <button
                          key={ex.id}
                          className={`${styles.exchangeFilterPill} ${
                            selectedExchangeFilter === ex.id ? styles.exchangeFilterPillActive : ""
                          }`}
                          onClick={() => setSelectedExchangeFilter(ex.id)}
                        >
                          <span className={styles.exchangeIconWrap}>{ExchangeIcons[ex.iconKey]}</span>
                          <span>{ex.name}</span>
                          <span className={styles.countBadge}>({count})</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Connected Accounts for Selected Filter */}
                  {filteredAccounts.length > 0 && (
                    <div className={styles.connectedAccountsList}>
                      {filteredAccounts.map((acc) => (
                        <div key={acc.id} className={styles.accountCard}>
                          <div className={styles.accountCardLeft}>
                            <div className={styles.accountLogoBox}>
                              {ExchangeIcons[acc.exchangeId] || <Box size={14} />}
                            </div>
                            <div className={styles.accountInfo}>
                              <span className={styles.accountName}>{acc.accountLabel}</span>
                              <div className={styles.accountMeta}>
                                <span className={styles.statusDot} />
                                <span>{acc.apiKeyMasked}</span>
                                <span>·</span>
                                <span>{acc.connectedAt}</span>
                              </div>
                            </div>
                          </div>
                          <div className={styles.accountCardRight}>
                            <span className={styles.permBadge}>{acc.permission}</span>
                            <button
                              className={styles.disconnectBtn}
                              onClick={() => handleDisconnect(acc.id, acc.accountLabel)}
                            >
                              Disconnect
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Supported Exchanges Directory Grid */}
                  <div className={styles.exchangesDirectoryGrid}>
                    {EXCHANGES.filter(
                      (ex) => selectedExchangeFilter === "all" || selectedExchangeFilter === ex.id
                    ).map((ex) => {
                      const isConnected = accounts.some((a) => a.exchangeId === ex.id);
                      const count = getExchangeCount(ex.id);
                      return (
                        <div key={ex.id} className={styles.exchangeDirectoryCard}>
                          <div className={styles.exchangeDirLeft}>
                            <div className={styles.exchangeDirIcon}>
                              {ExchangeIcons[ex.iconKey]}
                            </div>
                            <div className={styles.exchangeDirMeta}>
                              <span className={styles.exchangeDirName}>{ex.name}</span>
                              <span
                                className={`${styles.exchangeDirStatus} ${
                                  isConnected ? styles.exchangeDirStatusActive : ""
                                }`}
                              >
                                {isConnected ? `${count} Connected` : "Not connected"}
                              </span>
                            </div>
                          </div>
                          <button
                            className={styles.exchangeConnectSmallBtn}
                            onClick={() => {
                              setTargetExchangeId(ex.id);
                              setIsConnectModalOpen(true);
                            }}
                          >
                            <Plus size={11} />
                            <span>{isConnected ? "Add Account" : "Connect"}</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}
        </main>
      </div>

        {/* Sub-Dialog: Edit Profile Modal */}
        {isEditProfileOpen && (
          <div className={styles.subModalOverlay} onClick={() => setIsEditProfileOpen(false)}>
            <div className={styles.subModal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.subModalHeader}>
                <h3 className={styles.subModalTitle}>Edit Profile</h3>
                <button
                  className={styles.iconOnlyBtn}
                  onClick={() => setIsEditProfileOpen(false)}
                >
                  <X size={16} />
                </button>
              </div>

              <div className={styles.subModalField}>
                <label className={styles.subModalLabel}>Display Name</label>
                <input
                  type="text"
                  className={styles.subModalInput}
                  value={editNameInput}
                  onChange={(e) => setEditNameInput(e.target.value)}
                  placeholder="e.g. web3noob3"
                />
              </div>

              <div className={styles.subModalField}>
                <label className={styles.subModalLabel}>Handle / Username</label>
                <input
                  type="text"
                  className={styles.subModalInput}
                  value={editHandleInput}
                  onChange={(e) => setEditHandleInput(e.target.value)}
                  placeholder="e.g. @web3noob3"
                />
              </div>

              <div className={styles.subModalActions}>
                <button
                  className={styles.subModalCancelBtn}
                  onClick={() => setIsEditProfileOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className={styles.subModalSubmitBtn}
                  onClick={() => {
                    if (editNameInput.trim()) setProfileName(editNameInput.trim());
                    if (editHandleInput.trim()) {
                      const h = editHandleInput.trim().startsWith("@")
                        ? editHandleInput.trim()
                        : `@${editHandleInput.trim()}`;
                      setProfileHandle(h);
                    }
                    setIsEditProfileOpen(false);
                    showToast("Profile details updated");
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sub-Dialog: Connect Exchange Modal */}
        {isConnectModalOpen && (
          <div className={styles.subModalOverlay} onClick={() => setIsConnectModalOpen(false)}>
            <div className={styles.subModal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.subModalHeader}>
                <h3 className={styles.subModalTitle}>Connect Exchange Account</h3>
                <button
                  className={styles.iconOnlyBtn}
                  onClick={() => setIsConnectModalOpen(false)}
                >
                  <X size={16} />
                </button>
              </div>

              <div className={styles.subModalField}>
                <label className={styles.subModalLabel}>Select Exchange</label>
                <select
                  className={styles.subModalSelect}
                  value={targetExchangeId}
                  onChange={(e) => setTargetExchangeId(e.target.value)}
                >
                  {EXCHANGES.map((ex) => (
                    <option key={ex.id} value={ex.id}>
                      {ex.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.subModalField}>
                <label className={styles.subModalLabel}>Account Label</label>
                <input
                  type="text"
                  className={styles.subModalInput}
                  placeholder="e.g. Primary Trading, Bot 01"
                  value={accountLabelInput}
                  onChange={(e) => setAccountLabelInput(e.target.value)}
                />
              </div>

              <div className={styles.subModalField}>
                <label className={styles.subModalLabel}>API Key / Wallet Signature</label>
                <input
                  type="password"
                  className={styles.subModalInput}
                  placeholder="Enter API Key or Public Address"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                />
              </div>

              <div className={styles.subModalField}>
                <label className={styles.subModalLabel}>Permission Mode</label>
                <select
                  className={styles.subModalSelect}
                  value={permissionInput}
                  onChange={(e) =>
                    setPermissionInput(
                      e.target.value as "Read-Only" | "Trading" | "Full Access"
                    )
                  }
                >
                  <option value="Trading">Trading (Order Execution)</option>
                  <option value="Read-Only">Read-Only (Portfolio & Balances)</option>
                  <option value="Full Access">Full Access (Trade + Withdrawals)</option>
                </select>
              </div>

              <div className={styles.subModalActions}>
                <button
                  className={styles.subModalCancelBtn}
                  onClick={() => setIsConnectModalOpen(false)}
                >
                  Cancel
                </button>
                <button className={styles.subModalSubmitBtn} onClick={handleAddAccount}>
                  Connect Account
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast Feedback */}
        {toastMessage && (
          <div className={styles.toast}>
            <Check size={14} color="var(--emerald-400, #56d68f)" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}
