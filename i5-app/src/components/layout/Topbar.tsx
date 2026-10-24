"use client";

import React, { useState, useEffect } from "react";
import styles from "./Topbar.module.css";

/* Plus Icon */
function IconPlus() {
  return (
    <svg width={13} height={13} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/* Bell Icon */
function IconBell() {
  return (
    <svg width={16} height={16} viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M9 2a5 5 0 0 1 5 5v3l1.5 2.5H2.5L4 10V7a5 5 0 0 1 5-5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M7 13.5a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/* Sun / Theme Icon */
function IconSun() {
  return (
    <svg width={16} height={16} viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 1.5v1.5M9 15v1.5M1.5 9h1.5M15 9h1.5M3.7 3.7l1 1M13.3 13.3l1 1M3.7 14.3l1-1M13.3 4.7l1-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/* Moon / Theme Icon */
function IconMoon() {
  return (
    <svg width={16} height={16} viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M15.5 10.5a5.5 5.5 0 1 1-7-7 7 7 0 1 0 7 7z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Wallet Icon */
function IconWallet() {
  return (
    <svg width={16} height={16} viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect x="2" y="3.5" width="14" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2 7h14" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12.5" cy="10.5" r="1" fill="currentColor" />
    </svg>
  );
}

import AccountModal from "@/components/account/AccountModal";

function IconMenu() {
  return (
    <svg width={18} height={18} viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M2.5 5h13M2.5 9h13M2.5 13h13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

interface TopbarProps {
  onOpenAccount?: () => void;
  onMenuToggle?: () => void;
  showMenuBtn?: boolean;
}

export default function Topbar({ onOpenAccount, onMenuToggle, showMenuBtn }: TopbarProps) {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [walletAddress] = useState<string>("0x8f2A1346...c41B");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);
  const [accountInitialTab, setAccountInitialTab] = useState<"portfolio" | "wallet" | "profile" | "exchanges">("portfolio");

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
      onOpenAccount();
    } else {
      setIsAccountOpen(true);
    }
  };

  return (
    <>
      <header className={styles.topbar} role="banner">
        {/* Left: Brand Logo + Divider + Page Title */}
        <div className={styles.left}>
          {/* Hamburger — visible on mobile/tablet */}
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

        {/* Right: Portfolio, Trade Cash, Bell, Sun, Wallet Connect, Avatar */}
        <div className={styles.right}>
          {/* Portfolio & Trade Cash Navbar Widgets */}
          <div className={styles.navStatsGroup}>
            {/* Stack 1: Portfolio Card */}
            <div
              className={styles.navStatCard}
              onClick={() => handleOpenAccount("portfolio")}
              title="Open Portfolio ($4.58)"
              role="button"
              tabIndex={0}
            >
              <div className={styles.navStatHeader}>
                <span className={styles.navStatLabel}>Portfolio</span>
                <div className={styles.navPnlRow}>
                  <span className={styles.navChangeRed}>-$0.23</span>
                  <span className={styles.navChangeLabel}>24h</span>
                </div>
              </div>
              <div className={styles.navStatBigVal}>$4.58</div>
            </div>

            {/* Stack 2: Trade Cash Card with Plus Button */}
            <div
              className={styles.navStatCard}
              onClick={() => handleOpenAccount("portfolio")}
              title="Trade Cash ($0.33)"
              role="button"
              tabIndex={0}
            >
              <div className={styles.navCashRow}>
                <div className={styles.navCashMeta}>
                  <span className={styles.navStatLabel}>Trade cash</span>
                  <span className={styles.navCashBigVal}>$0.33</span>
                </div>
                <button
                  type="button"
                  className={styles.navPlusBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenAccount("portfolio");
                  }}
                  title="Add trade cash"
                  aria-label="Add trade cash"
                >
                  <IconPlus />
                </button>
              </div>
            </div>
          </div>

          {/* Notification Bell */}
          <div className={styles.bellWrap}>
            <button className={styles.iconBtn} aria-label="Notifications">
              <IconBell />
            </button>
            <span className={styles.notifDotPurple} aria-hidden />
          </div>

          {/* Theme Toggle Sun/Moon Icon — hidden on mobile */}
          <button className={`${styles.iconBtn} ${styles.hideOnMobile}`} aria-label="Toggle Theme" onClick={toggleTheme}>
            {theme === "light" ? <IconMoon /> : <IconSun />}
          </button>

          {/* Wallet Connect / Connected State Button — label hidden on mobile */}
          {!isConnected ? (
            <button
              className={styles.connectWalletBtn}
              onClick={() => setIsConnected(true)}
              title="Connect your crypto wallet"
            >
              <IconWallet />
              <span className={styles.walletLabel}>Connect Wallet</span>
            </button>
          ) : (
            <button
              className={styles.connectedPill}
              onClick={() => handleOpenAccount("portfolio")}
              title="Open Account & Settings"
            >
              <div className={styles.walletAvatar}><span>I5</span></div>
              <span className={`${styles.addressText} ${styles.hideOnMobile}`}>{walletAddress}</span>
            </button>
          )}
        </div>
      </header>

      {/* Account Profile Popup Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        initialTab={accountInitialTab}
        onSignOut={() => {
          setIsConnected(false);
          setIsAccountOpen(false);
        }}
      />
    </>
  );
}
