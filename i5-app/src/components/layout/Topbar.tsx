"use client";

import React, { useState, useEffect } from "react";
import styles from "./Topbar.module.css";

/* Search Icon */
function IconSearch() {
  return (
    <svg width={15} height={15} viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
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
  const [searchValue, setSearchValue] = useState<string>("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);

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

  const handleOpenAccount = () => {
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="2" y="2" width="20" height="20" rx="6" fill="var(--text-primary)" />
              <text
                x="12"
                y="16"
                textAnchor="middle"
                fill="var(--bg-app)"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                i5
              </text>
            </svg>
          </div>
          <div className={styles.headerDivider} aria-hidden />
          <h1 className={`${styles.pageTitle} text-h4`}>Dashboard</h1>
        </div>

        {/* Right: Search, Bell, Sun, Wallet Connect, Avatar */}
        <div className={styles.right}>
          {/* Search Bar — hidden on mobile */}
          <div className={`${styles.searchBar} ${styles.searchBarResponsive}`}>
            <IconSearch />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search stocks, sectors or themes"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
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
              onClick={() => setIsConnected(false)}
              title="Click to disconnect wallet"
            >
              <span className={styles.dotGreenPulse} />
              <span className={`${styles.addressText} ${styles.hideOnMobile}`}>{walletAddress}</span>
            </button>
          )}

          {/* User Avatar Circle */}
          <button
            className={styles.avatar}
            aria-label="Account Menu"
            onClick={handleOpenAccount}
            title="Open Account & Settings"
          >
            <span>I5</span>
          </button>
        </div>
      </header>

      {/* Account Profile Popup Modal */}
      <AccountModal isOpen={isAccountOpen} onClose={() => setIsAccountOpen(false)} />
    </>
  );
}
