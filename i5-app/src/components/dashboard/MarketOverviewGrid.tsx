"use client";

import React from "react";
import styles from "./MarketOverviewGrid.module.css";

interface MarketItem {
  id: string;
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
  sparklinePath: string;
}

/* Y-normalized crisp high-detail sparkline paths */
const gainPath1 =
  "M0,20 L6,18 L10,28 L14,16 L20,18 L26,22 L32,18 L38,12 L44,18 L50,14 L56,16 L62,13 L68,18 L74,12 L80,22 L86,10 L92,20 L98,18 L104,15 L110,8 L116,6 L122,10 L128,18 L134,16 L140,18 L146,13 L152,16 L158,16 L164,20 L170,18 L176,18 L182,18 L188,16 L194,10 L200,15 L206,20 L212,28 L218,10 L224,12 L230,5 L240,8";
const gainPath2 =
  "M0,22 L8,20 L14,14 L20,18 L28,12 L34,20 L40,16 L48,10 L54,18 L60,12 L68,20 L74,16 L82,8 L88,12 L94,6 L102,16 L108,10 L116,14 L124,8 L130,18 L138,14 L146,18 L152,12 L160,16 L168,10 L174,14 L182,8 L190,12 L198,6 L206,10 L214,24 L222,8 L230,10 L240,4";
const gainPath3 =
  "M0,24 L10,22 L18,25 L26,18 L34,20 L42,14 L50,16 L58,10 L66,14 L74,12 L82,18 L90,10 L98,14 L106,6 L114,12 L122,8 L130,16 L138,10 L146,14 L154,8 L162,12 L170,6 L178,12 L186,16 L194,8 L202,12 L210,26 L218,8 L226,12 L240,5";

const lossPath1 =
  "M0,8 L6,10 L12,5 L18,14 L24,12 L30,8 L36,10 L42,18 L48,12 L54,16 L60,14 L66,18 L72,10 L78,18 L84,8 L90,22 L96,10 L102,12 L108,14 L114,24 L120,26 L126,20 L132,10 L138,12 L144,10 L150,16 L156,12 L162,12 L168,8 L174,10 L180,10 L186,10 L192,12 L198,20 L204,14 L210,8 L216,4 L222,22 L228,20 L234,28 L240,24";
const lossPath2 =
  "M0,6 L8,8 L14,12 L20,9 L28,14 L34,8 L40,10 L48,16 L54,8 L60,14 L68,7 L74,10 L82,18 L88,14 L94,20 L102,10 L108,16 L116,12 L124,18 L130,7 L138,12 L146,8 L152,14 L160,10 L168,16 L174,12 L182,18 L190,14 L198,22 L206,16 L214,4 L222,20 L230,16 L240,25";

const marketData: MarketItem[] = [
  {
    id: "sp500",
    name: "S&P 500",
    value: "5,921.44",
    change: "+0.62%",
    isPositive: true,
    sparklinePath: gainPath1,
  },
  {
    id: "nasdaq100",
    name: "NASDAQ 100",
    value: "21,344.18",
    change: "+1.08%",
    isPositive: true,
    sparklinePath: gainPath2,
  },
  {
    id: "dowjones",
    name: "DOW JONES",
    value: "44,218.90",
    change: "+0.14%",
    isPositive: true,
    sparklinePath: gainPath3,
  },
  {
    id: "russell2000",
    name: "RUSSELL 2000",
    value: "2,318.72",
    change: "-0.44%",
    isPositive: false,
    sparklinePath: lossPath1,
  },
  {
    id: "vix",
    name: "VIX",
    value: "14.28",
    change: "-3.61%",
    isPositive: false,
    sparklinePath: lossPath2,
  },
  {
    id: "bitcoin",
    name: "BITCOIN",
    value: "$96,412.00",
    change: "+2.34%",
    isPositive: true,
    sparklinePath: gainPath1,
  },
  {
    id: "treasury10y",
    name: "10Y TREASURY",
    value: "4.312%",
    change: "-0.86%",
    isPositive: false,
    sparklinePath: lossPath1,
  },
];

function ChevronRight() {
  return (
    <svg width={12} height={12} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M4.5 9L7.5 6L4.5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function MarketOverviewGrid() {
  // Duplicate array for seamless infinite marquee loop
  const displayItems = [...marketData, ...marketData];

  return (
    <section className={styles.container} aria-label="Market overview auto-scrolling cards">
      {/* Outer track with marquee animation & soft gradient edge mask */}
      <div className={styles.scrollMask}>
        <div className={styles.scrollTrack}>
          {displayItems.map((item, index) => {
            const colorClass = item.isPositive ? styles.positive : styles.negative;
            const strokeColor = item.isPositive ? "#2FCB73" : "#EA5E5E";

            return (
              <div key={`${item.id}-${index}`} className={styles.card}>
                {/* Top Header: Title + Arrow */}
                <div className={styles.cardHeader}>
                  <span className={styles.cardTitle}>{item.name}</span>
                  <span className={styles.chevron}><ChevronRight /></span>
                </div>

                {/* Card Body: Price & Change on Left, Sparkline Graph on Right Side */}
                <div className={styles.cardBody}>
                  <div className={styles.priceCol}>
                    <span className={styles.priceValue}>{item.value}</span>
                    <span className={`${styles.changeBadge} ${colorClass}`}>
                      <span className={styles.triangle}>{item.isPositive ? "▲" : "▼"}</span>
                      {item.change}
                    </span>
                  </div>

                  {/* Sparkline Graph placed on right side */}
                  <div className={styles.sparklineSide}>
                    <svg width="58" height="26" viewBox="0 0 240 34" preserveAspectRatio="none">
                      <path
                        d={item.sparklinePath}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
