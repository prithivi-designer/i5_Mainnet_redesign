"use client";

import React, { useState, useEffect } from "react";
import styles from "./QuickTradeModal.module.css";

export interface TradeTokenInfo {
  symbol: string;
  name: string;
  price: string;
  change24h: string;
  isPositive: boolean;
  avatarBg?: string;
  exchanges?: string[];
}

export interface QuickTradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: TradeTokenInfo | null;
  initialSide?: "LONG" | "SHORT";
  exchange?: string;
}

/* Hyperliquid Official SVG Logo */
export function IconHyperliquid({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle" }}
      aria-hidden
    >
      <path
        d="M175.11589,99.27891c0,49.46366-30.3687,65.33789-46.47302,51.30413-13.11357-11.5031-17.02471-35.88989-36.81018-38.42055-25.07698-2.99085-27.37764,30.36839-43.94216,30.36839-19.3254,0-23.00642-27.83773-23.00642-42.33179,0-14.72405,4.14115-34.73961,20.47565-34.73961,19.09528,0,20.24566,28.75802,44.17226,27.14754,23.69661-1.61047,24.1567-31.51877,39.80103-44.17224,13.57335-11.27313,45.78283.69019,45.78283,50.84413Z"
        fill="#97fce4"
      />
    </svg>
  );
}

/* Aster Official SVG Logo */
export function IconAster({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 286 284"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle" }}
      aria-hidden
    >
      <path
        d="M80.7636 270.153L87.3964 239.51C94.7943 205.333 68.756 173.052 33.7906 173.052H3.40771C12.9894 215.995 42.0154 251.602 80.7636 270.153Z"
        fill="currentColor"
      />
      <path
        d="M94.0889 275.714C109.057 281.078 125.187 284 142 284C209.754 284 266.426 236.543 280.592 173.052H187.904C146.125 173.052 110.003 202.194 101.163 243.031L94.0889 275.714Z"
        fill="currentColor"
      />
      <path
        d="M283.009 158.851C283.663 153.321 284 147.693 284 141.987C284 67.4857 226.637 6.38369 153.672 0.446655L133.77 92.3928C126.372 126.57 152.41 158.851 187.376 158.851H283.009Z"
        fill="currentColor"
      />
      <path
        d="M139.24 0C62.0895 1.47074 0 64.4772 0 141.987C0 147.693 0.336509 153.321 0.990772 158.851H33.2625C75.0417 158.851 111.164 129.709 120.003 88.8719L139.24 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function QuickTradeModal({
  isOpen,
  onClose,
  token,
  initialSide = "LONG",
  exchange = "Hyperliquid",
}: QuickTradeModalProps) {
  const [side, setSide] = useState<"LONG" | "SHORT">(initialSide);
  const [orderType, setOrderType] = useState<"MARKET" | "LIMIT">("MARKET");
  const [payAmount, setPayAmount] = useState<string>("500");
  const [leverage, setLeverage] = useState<number>(5);
  const [marginMode, setMarginMode] = useState<string>("Isolated");
  const [isTpSlOpen, setIsTpSlOpen] = useState<boolean>(false);
  const [tpPrice, setTpPrice] = useState<string>("");
  const [slPrice, setSlPrice] = useState<string>("");
  const [activePercent, setActivePercent] = useState<string>("");
  const [orderPlacedToast, setOrderPlacedToast] = useState<boolean>(false);

  // Sync side when initialSide changes
  useEffect(() => {
    if (initialSide) setSide(initialSide);
  }, [initialSide, isOpen]);

  // Esc key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !token) return null;

  // Numeric Calculations
  const numericPrice = parseFloat(token.price.replace(/[^0-9.]/g, "")) || 64238.4;
  const payVal = parseFloat(payAmount) || 0;
  const positionVal = payVal * leverage;
  const tradingFee = Math.max(0.5, positionVal * 0.0005).toFixed(2);

  // Liquidation Price calculation based on side and leverage
  const liqMultiplier = 0.9 / leverage;
  const liqPrice =
    side === "LONG"
      ? numericPrice * (1 - liqMultiplier)
      : numericPrice * (1 + liqMultiplier);

  const handlePercentClick = (pct: number, label: string) => {
    setActivePercent(label);
    const balance = 2450.0;
    const calc = ((balance * pct) / 100).toFixed(0);
    setPayAmount(calc);
  };

  const handleExecuteTrade = () => {
    setOrderPlacedToast(true);
    setTimeout(() => {
      setOrderPlacedToast(false);
      onClose();
    }, 1200);
  };

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <button className={styles.backBtn} onClick={onClose} aria-label="Back">
            <svg width={14} height={14} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className={styles.headerTitle}>Quick Trade</span>
          <div className={styles.exchangeBadge}>
            {exchange === "Aster" ? <IconAster size={14} /> : <IconHyperliquid size={14} />}
            <span>{exchange}</span>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className={styles.body}>
          {/* Asset Info Row */}
          <div className={styles.assetRow}>
            <div className={styles.assetLeft}>
              <div
                className={styles.assetAvatar}
                style={{ backgroundColor: token.avatarBg || "#1F2937" }}
              >
                {token.symbol.slice(0, 2)}
              </div>
              <div className={styles.assetMeta}>
                <div className={styles.symbolRow}>
                  <span className={styles.symbolText}>{token.symbol}/USDC</span>
                  <span className={styles.perpTag}>PERP</span>
                </div>
                <span className={styles.assetSub}>Perpetual</span>
              </div>
            </div>
            <div className={styles.assetRight}>
              <span className={styles.priceText}>{token.price}</span>
              <span
                className={`${styles.changeText} ${
                  token.isPositive ? styles.changePositive : styles.changeNegative
                }`}
              >
                {token.change24h}
              </span>
            </div>
          </div>

          {/* Long / Short Toggle Buttons */}
          <div className={styles.sideToggleGroup}>
            <button
              className={`${styles.sideBtn} ${
                side === "LONG" ? styles.sideBtnActiveLong : ""
              }`}
              onClick={() => setSide("LONG")}
            >
              Long
            </button>
            <button
              className={`${styles.sideBtn} ${
                side === "SHORT" ? styles.sideBtnActiveShort : ""
              }`}
              onClick={() => setSide("SHORT")}
            >
              Short
            </button>
          </div>

          {/* Order Type Tabs */}
          <div className={styles.orderTypeTabs}>
            <button
              className={`${styles.orderTypeBtn} ${
                orderType === "MARKET" ? styles.orderTypeBtnActive : ""
              }`}
              onClick={() => setOrderType("MARKET")}
            >
              Market
            </button>
            <button
              className={`${styles.orderTypeBtn} ${
                orderType === "LIMIT" ? styles.orderTypeBtnActive : ""
              }`}
              onClick={() => setOrderType("LIMIT")}
            >
              Limit
            </button>
          </div>

          {/* Pay Input Section */}
          <div className={styles.paySection}>
            <div className={styles.payHeaderRow}>
              <span className={styles.payLabel}>Pay</span>
              <span className={styles.payBalance}>Balance: 2,450.00 USDC</span>
            </div>

            <div className={styles.payInputWrapper}>
              <input
                type="number"
                className={styles.payInput}
                value={payAmount}
                onChange={(e) => {
                  setPayAmount(e.target.value);
                  setActivePercent("");
                }}
                placeholder="0.0"
              />
              <div className={styles.currencySelector}>
                <span className={styles.usdcIcon}>$</span>
                <span>USDC</span>
                <span style={{ fontSize: "10px", color: "var(--text-tertiary)" }}>▼</span>
              </div>
            </div>

            <div className={styles.payFooterRow}>
              <span className={styles.approxVal}>
                ≈ ${payVal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <div className={styles.percentPills}>
                <button
                  className={`${styles.percentBtn} ${
                    activePercent === "25%" ? styles.percentBtnActive : ""
                  }`}
                  onClick={() => handlePercentClick(25, "25%")}
                >
                  25%
                </button>
                <button
                  className={`${styles.percentBtn} ${
                    activePercent === "50%" ? styles.percentBtnActive : ""
                  }`}
                  onClick={() => handlePercentClick(50, "50%")}
                >
                  50%
                </button>
                <button
                  className={`${styles.percentBtn} ${
                    activePercent === "MAX" ? styles.percentBtnActive : ""
                  }`}
                  onClick={() => handlePercentClick(100, "MAX")}
                >
                  MAX
                </button>
              </div>
            </div>
          </div>

          {/* Leverage Section */}
          <div className={styles.leverageSection}>
            <div className={styles.leverageHeader}>
              <span className={styles.leverageLabel}>Leverage</span>
              <span className={styles.leverageValue}>{leverage}x ▾</span>
            </div>

            <div className={styles.sliderContainer}>
              <input
                type="range"
                min={2}
                max={10}
                step={1}
                value={leverage}
                onChange={(e) => setLeverage(Number(e.target.value))}
                className={styles.sliderInput}
              />
              <div className={styles.sliderLabels}>
                <span>2×</span>
                <span style={{ color: "var(--emerald-500)", fontWeight: 700 }}>{leverage}×</span>
                <span>10×</span>
              </div>
            </div>
          </div>

          {/* Margin Mode Row */}
          <div className={styles.marginModeRow}>
            <span className={styles.marginModeLabel}>Margin Mode</span>
            <select
              className={styles.marginSelect}
              value={marginMode}
              onChange={(e) => setMarginMode(e.target.value)}
            >
              <option value="Isolated">Isolated</option>
              <option value="Cross">Cross</option>
            </select>
          </div>

          {/* Take Profit / Stop Loss Accordion */}
          <div className={styles.accordion}>
            <div
              className={styles.accordionHeader}
              onClick={() => setIsTpSlOpen(!isTpSlOpen)}
            >
              <span>📈 Take Profit / Stop Loss</span>
              <span>{isTpSlOpen ? "▲" : "▼"}</span>
            </div>
            {isTpSlOpen && (
              <div className={styles.accordionContent}>
                <div className={styles.tpslInputGroup}>
                  <span className={styles.tpslLabel}>Take Profit:</span>
                  <input
                    type="text"
                    className={styles.tpslField}
                    placeholder="TP Price (USDC)"
                    value={tpPrice}
                    onChange={(e) => setTpPrice(e.target.value)}
                  />
                </div>
                <div className={styles.tpslInputGroup}>
                  <span className={styles.tpslLabel}>Stop Loss:</span>
                  <input
                    type="text"
                    className={styles.tpslField}
                    placeholder="SL Price (USDC)"
                    value={slPrice}
                    onChange={(e) => setSlPrice(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Box */}
          <div className={styles.summaryBox}>
            <span className={styles.summaryTitle}>Order Summary</span>
            <div className={styles.summaryRow}>
              <span className={styles.summaryItemLabel}>Position Value</span>
              <span className={styles.summaryItemValue}>
                ${positionVal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryItemLabel}>Entry Price</span>
              <span className={styles.summaryItemValue}>
                ${numericPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryItemLabel}>Liquidation Price</span>
              <span className={`${styles.summaryItemValue} ${styles.liqPrice}`}>
                ${liqPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryItemLabel}>Trading Fee</span>
              <span className={styles.summaryItemValue}>${tradingFee}</span>
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            className={`${styles.submitBtn} ${
              side === "LONG" ? styles.submitBtnLong : styles.submitBtnShort
            }`}
            onClick={handleExecuteTrade}
          >
            {orderPlacedToast ? "Order Submitted ✓" : side === "LONG" ? "Open Long" : "Open Short"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* Exchange Selector Modal (shown when "All" is active and token is on multiple exchanges) */
export function SelectExchangeModal({
  isOpen,
  onClose,
  token,
  onSelectExchange,
}: {
  isOpen: boolean;
  onClose: () => void;
  token: TradeTokenInfo | null;
  onSelectExchange: (exchange: string) => void;
}) {
  if (!isOpen || !token) return null;

  const exchanges = token.exchanges && token.exchanges.length > 0 ? token.exchanges : ["Hyperliquid", "Aster"];

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.exchangeModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header} style={{ padding: "0 0 12px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <span className={styles.headerTitle}>Select Exchange</span>
          <button className={styles.backBtn} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <p style={{ fontSize: "13px", color: "var(--text-tertiary)", margin: 0 }}>
          {token.symbol} is available on multiple DEX perps. Choose your execution venue:
        </p>

        <div className={styles.exchangeList}>
          {exchanges.includes("Hyperliquid") && (
            <button
              className={styles.exchangeOptionBtn}
              onClick={() => onSelectExchange("Hyperliquid")}
            >
              <div className={styles.exchangeLeft}>
                <div className={styles.exchangeIconBox} style={{ backgroundColor: "#052E2B" }}>
                  <IconHyperliquid size={22} />
                </div>
                <div className={styles.exchangeDetails}>
                  <span className={styles.exchangeName}>Hyperliquid</span>
                  <span className={styles.exchangeSub}>Deep Liquidity · 0.02% Fee</span>
                </div>
              </div>
              <span style={{ fontSize: "14px", color: "var(--emerald-500)", fontWeight: 700 }}>Trade →</span>
            </button>
          )}

          {exchanges.includes("Aster") && (
            <button
              className={styles.exchangeOptionBtn}
              onClick={() => onSelectExchange("Aster")}
            >
              <div className={styles.exchangeLeft}>
                <div className={styles.exchangeIconBox} style={{ backgroundColor: "#2E1065" }}>
                  <IconAster size={22} />
                </div>
                <div className={styles.exchangeDetails}>
                  <span className={styles.exchangeName}>Aster</span>
                  <span className={styles.exchangeSub}>Multi-chain Perps · 0.02% Fee</span>
                </div>
              </div>
              <span style={{ fontSize: "14px", color: "var(--purple-400, #C084FC)", fontWeight: 700 }}>Trade →</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
