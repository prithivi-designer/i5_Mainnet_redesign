"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  User,
  Box,
  ChevronDown,
  Copy,
  Pencil,
  Check,
  Link as LinkIcon,
  Layers,
} from "lucide-react";
import styles from "./AccountModal.module.css";

/* ----------------------------------------------------------
   Exchange Brand Icons (SVGs)
   ---------------------------------------------------------- */
const ExchangeIcons: Record<string, React.ReactNode> = {
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
  hyperliquid: (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
      <ellipse cx="6" cy="8" rx="3.5" ry="5.5" stroke="#26A69A" strokeWidth="1.4" />
      <ellipse cx="10" cy="8" rx="3.5" ry="5.5" stroke="#26A69A" strokeWidth="1.4" />
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
  { id: "pacifica", name: "Pacifica", iconKey: "pacifica" },
  { id: "extended", name: "Extended", iconKey: "extended" },
  { id: "grvt", name: "GRVT", iconKey: "grvt" },
  { id: "hibachi", name: "Hibachi", iconKey: "hibachi" },
  { id: "paradex", name: "Paradex", iconKey: "paradex" },
  { id: "decibel", name: "Decibel", iconKey: "decibel" },
  { id: "hyperliquid", name: "Hyperliquid", iconKey: "hyperliquid" },
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
  // Navigation State
  const [activeTab, setActiveTab] = useState<"userInfo" | "exchanges">("userInfo");
  const [selectedExchangeFilter, setSelectedExchangeFilter] = useState<string>("all");
  const [isExchangeAccordionOpen, setIsExchangeAccordionOpen] = useState<boolean>(true);

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
  const [targetExchangeId, setTargetExchangeId] = useState<string>("pacifica");
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
        if (isConnectModalOpen) {
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
  }, [isOpen, isConnectModalOpen, isConnectingEmail, onClose]);

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
        {/* Close Button (X) */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close Account Modal">
          <X size={16} />
        </button>

        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Account</h2>
          <p className={styles.subtitle}>Manage your account preferences and system configurations.</p>
        </div>

        {/* Decorative Node Line (o───────o) */}
        <div className={styles.nodeDivider}>
          <div className={styles.nodeDot} />
          <div className={styles.nodeLine} />
          <div className={styles.nodeDot} />
        </div>

        {/* Modal Body (2 Columns) */}
        <div className={styles.body}>
          {/* Left Navigation Sidebar */}
          <aside className={styles.sidebar}>
            {/* Tab 1: User Info */}
            <button
              className={`${styles.navItem} ${activeTab === "userInfo" ? styles.navItemActive : ""}`}
              onClick={() => setActiveTab("userInfo")}
            >
              <span className={styles.navItemIcon}>
                <User size={16} />
              </span>
              <span>User Info</span>
            </button>

            {/* Tab 2: Exchange Accounts (Accordion) */}
            <div>
              <button
                className={`${styles.accordionHeader} ${
                  activeTab === "exchanges" ? styles.accordionHeaderActive : ""
                }`}
                onClick={() => {
                  setActiveTab("exchanges");
                  setIsExchangeAccordionOpen((prev) => !prev);
                }}
              >
                <div className={styles.accordionHeaderLeft}>
                  <span className={styles.navItemIcon}>
                    <Box size={16} />
                  </span>
                  <span>Exchange Accounts</span>
                </div>
                <ChevronDown
                  size={14}
                  className={`${styles.chevronIcon} ${isExchangeAccordionOpen ? styles.chevronOpen : ""}`}
                />
              </button>

              {/* Collapsible Sub-item List */}
              {isExchangeAccordionOpen && (
                <div className={styles.exchangeList}>
                  {/* All Accounts */}
                  <button
                    className={`${styles.exchangeSubItem} ${
                      activeTab === "exchanges" && selectedExchangeFilter === "all"
                        ? styles.exchangeSubItemActive
                        : ""
                    }`}
                    onClick={() => {
                      setActiveTab("exchanges");
                      setSelectedExchangeFilter("all");
                    }}
                  >
                    <span>All Accounts</span>
                    <span className={styles.countBadge}>({accounts.length})</span>
                  </button>

                  {/* Exchanges 1-12 */}
                  {EXCHANGES.map((ex) => {
                    const count = getExchangeCount(ex.id);
                    return (
                      <button
                        key={ex.id}
                        className={`${styles.exchangeSubItem} ${
                          activeTab === "exchanges" && selectedExchangeFilter === ex.id
                            ? styles.exchangeSubItemActive
                            : ""
                        }`}
                        onClick={() => {
                          setActiveTab("exchanges");
                          setSelectedExchangeFilter(ex.id);
                        }}
                      >
                        <div className={styles.exchangeItemLeft}>
                          <span className={styles.exchangeIconWrap}>{ExchangeIcons[ex.iconKey]}</span>
                          <span>{ex.name}</span>
                        </div>
                        <span className={styles.countBadge}>({count})</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </aside>

          {/* Right Content Area */}
          <main className={styles.contentArea}>
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

              {/* VIEW 2: EXCHANGE ACCOUNTS */}
              {activeTab === "exchanges" && (
                <>
                  <div className={styles.exchangeHeader}>
                    {selectedExchangeFilter === "all"
                      ? `All Accounts (${accounts.length})`
                      : `${EXCHANGES.find((e) => e.id === selectedExchangeFilter)?.name || ""} Accounts (${filteredAccounts.length})`}
                  </div>

                  {filteredAccounts.length === 0 ? (
                    <div className={styles.emptyState}>
                      <div className={styles.emptyIconBox}>
                        <Layers size={20} />
                      </div>
                      <h4 className={styles.emptyTitle}>No account yet</h4>
                      <p className={styles.emptySub}>All account will appear here.</p>
                    </div>
                  ) : (
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

                  {/* Corner-Bracketed Cyber Button: "Connect a new account +" */}
                  <button
                    className={styles.connectAccountBtn}
                    onClick={() => {
                      if (selectedExchangeFilter !== "all") {
                        setTargetExchangeId(selectedExchangeFilter);
                      }
                      setIsConnectModalOpen(true);
                    }}
                  >
                    <span className={styles.cornerTL} />
                    <span className={styles.cornerTR} />
                    <span className={styles.cornerBL} />
                    <span className={styles.cornerBR} />
                    <span className={styles.btnText}>Connect a new account +</span>
                  </button>
                </>
              )}
            </div>
          </main>
        </div>

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
