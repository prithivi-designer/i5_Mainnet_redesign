"use client";

import React, { useState, useEffect } from "react";
import styles from "./Topbar.module.css";
import AccountModal from "@/components/account/AccountModal";

/* Refresh Icon */
function IconRefresh({ isSpinning }: { isSpinning?: boolean }) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 16 16"
      fill="none"
      className={isSpinning ? styles.spinIcon : undefined}
      aria-hidden
    >
      <path
        d="M13.5 2.5v3.5h-3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 13.5v-3.5h3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.1 6A5.5 5.5 0 0 0 3.7 4.2L2.5 6M13.5 10l-1.2 1.8a5.5 5.5 0 0 1-9.4-1.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Deposit Icon (Tray down arrow) */
function IconDeposit() {
  return (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M2.75 9.75v3a.75.75 0 0 0 .75.75h9a.75.75 0 0 0 .75-.75v-3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 2.5v7.25m0 0l-2.75-2.75M8 9.75l2.75-2.75"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Sun / Theme Icon */
function IconSun() {
  return (
    <svg width={18} height={18} viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="3.2" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M9 1.5v1.8M9 14.7v1.8M1.5 9h1.8M14.7 9h1.8M3.7 3.7l1.3 1.3M13 13l1.3 1.3M3.7 14.3l1.3-1.3M13 5l1.3-1.3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* Moon / Theme Icon */
function IconMoon() {
  return (
    <svg width={17} height={17} viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M15.5 10.5a5.5 5.5 0 1 1-7-7 7 7 0 1 0 7 7z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Menu Hamburger */
function IconMenu() {
  return (
    <svg width={18} height={18} viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M2.5 5h13M2.5 9h13M2.5 13h13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* Info Icon */
function IconInfo() {
  return (
    <svg width={13} height={13} viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 7v4M8 4.75v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* Next / Chevron Right Icon */
function IconChevronRight() {
  return (
    <svg width={12} height={12} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M6 3.5L10.5 8L6 12.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface TopbarProps {
  onOpenAccount?: (tab?: "portfolio" | "wallet" | "profile" | "exchanges") => void;
  onMenuToggle?: () => void;
  showMenuBtn?: boolean;
  portfolioBalance?: string;
  portfolio24hChange?: string;
  mainBalance?: string;
  userEmail?: string;
}

export default function Topbar({
  onOpenAccount,
  onMenuToggle,
  showMenuBtn,
  portfolioBalance = "$0.00",
  portfolio24hChange = "$0.00 24h",
  mainBalance = "$0.00",
  userEmail = "prithiv******ions.in",
}: TopbarProps) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);
  const [accountInitialTab, setAccountInitialTab] = useState<"portfolio" | "wallet" | "profile" | "exchanges">("portfolio");
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [isPortfolioTooltipOpen, setIsPortfolioTooltipOpen] = useState<boolean>(false);
  const [isMainBalanceTooltipOpen, setIsMainBalanceTooltipOpen] = useState<boolean>(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("i5-theme");
    if (savedTheme === "light") {
      setTheme("light");
      document.documentElement.setAttribute("data-theme", "light");
      document.documentElement.classList.add("light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("i5-theme", newTheme);
    if (newTheme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.removeAttribute("data-theme");
      document.documentElement.classList.remove("light");
    }
  };

  const handleOpenAccount = (tab: "portfolio" | "wallet" | "profile" | "exchanges" = "portfolio") => {
    setAccountInitialTab(tab);
    if (onOpenAccount) {
      onOpenAccount(tab);
    } else {
      setIsAccountOpen(true);
    }
  };

  const handleRefresh = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
    }, 700);
  };

  return (
    <>
      <header className={styles.topbar} role="banner">
        {/* Left: Brand Logo + Hamburger */}
        <div className={styles.left}>
          {showMenuBtn && (
            <button
              className={styles.hamburgerBtn}
              onClick={onMenuToggle}
              aria-label="Open navigation menu"
            >
              <IconMenu />
            </button>
          )}
          <div className={styles.brandMark} aria-label="i5">
            <img
              src="/i5_sticker.svg"
              alt="i5 Logo"
              width={36}
              height={36}
              className={styles.brandLogoImg}
            />
          </div>
        </div>

        {/* Right Section: [Portfolio | Main Balance + Refresh + Deposit]  [Sun]  [Avatar + Email] */}
        <div className={styles.right}>
          {/* Unified Financial Capsule */}
          <div className={styles.financialCapsule}>
            {/* Portfolio Section */}
            <div
              className={styles.statSection}
              onClick={() => handleOpenAccount("portfolio")}
              role="button"
              tabIndex={0}
              title="Portfolio"
            >
              <div className={styles.statLabelRow}>
                <span className={styles.statLabel}>Portfolio</span>
                <div className={styles.statActionBtns}>
                  <div className={styles.infoBtnWrap}>
                    <button
                      type="button"
                      className={styles.statIconBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPortfolioTooltipOpen((v) => !v);
                      }}
                      aria-label="Portfolio Info"
                      title="Portfolio Info"
                    >
                      <IconInfo />
                    </button>
                    <span className={`${styles.infoTooltip} ${isPortfolioTooltipOpen ? styles.infoTooltipVisible : ""}`}>
                      Total portfolio value across connected accounts, including unrealized PnL.
                    </span>
                  </div>
                  <button
                    type="button"
                    className={`${styles.statIconBtn} ${styles.statIconBtnNext}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenAccount("portfolio");
                    }}
                    aria-label="Next: View portfolio"
                    title="View portfolio"
                  >
                    <IconChevronRight />
                  </button>
                </div>
              </div>
              <div className={styles.valRow}>
                <span className={styles.statVal}>{portfolioBalance}</span>
                <span className={styles.statSubVal}>{portfolio24hChange}</span>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className={styles.capsuleDivider} />

            {/* Main Balance Section */}
            <div
              className={styles.statSection}
              onClick={() => handleOpenAccount("wallet")}
              role="button"
              tabIndex={0}
              title="Main Balance"
            >
              <div className={styles.statLabelRow}>
                <span className={styles.statLabel}>Main Balance</span>
                <div className={styles.statActionBtns}>
                  <div className={styles.infoBtnWrap}>
                    <button
                      type="button"
                      className={styles.statIconBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMainBalanceTooltipOpen((v) => !v);
                      }}
                      aria-label="Main Balance Info"
                      title="Main Balance Info"
                    >
                      <IconInfo />
                    </button>
                    <span className={`${styles.infoTooltip} ${isMainBalanceTooltipOpen ? styles.infoTooltipVisible : ""}`}>
                      Available cash and margin balance ready for trading, transfers, and withdrawals.
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.valRow}>
                <span className={styles.statVal}>{mainBalance}</span>
              </div>
            </div>

            {/* Refresh Button */}
            <button
              type="button"
              className={styles.refreshBtn}
              onClick={handleRefresh}
              title="Refresh balances"
              aria-label="Refresh balances"
            >
              <IconRefresh isSpinning={isSpinning} />
            </button>

            {/* Deposit Button */}
            <button
              type="button"
              className={styles.depositBtn}
              onClick={() => handleOpenAccount("wallet")}
              title="Deposit funds"
            >
              <IconDeposit />
              <span>Deposit</span>
            </button>
          </div>

          {/* Theme Toggle Sun Icon */}
          <button
            type="button"
            className={styles.themeToggleBtn}
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "light" ? <IconMoon /> : <IconSun />}
          </button>

          {/* User Profile Capsule */}
          <div
            className={styles.profileCapsule}
            onClick={() => handleOpenAccount("profile")}
            role="button"
            tabIndex={0}
            title={`Account: ${userEmail}`}
          >
            <div className={styles.avatarWrap}>
              <img
                src="/user_avatar.png"
                alt="User avatar"
                width={36}
                height={36}
                className={styles.avatarImg}
              />
            </div>
            <span className={styles.userEmailText}>{userEmail}</span>
          </div>
        </div>
      </header>

      {/* Account Profile Popup Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        initialTab={accountInitialTab}
        onSignOut={() => {
          setIsAccountOpen(false);
        }}
      />
    </>
  );
}
