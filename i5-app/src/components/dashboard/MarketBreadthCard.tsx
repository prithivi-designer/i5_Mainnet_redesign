"use client";

import React from "react";
import styles from "./MarketBreadthCard.module.css";

/* ----------------------------------------------------------
   Market Breadth Research Card (Horizontal Layout)
   ---------------------------------------------------------- */
export default function MarketBreadthCard() {
  const percentage = 68;

  // Concentric Dotted Arc Gauge Configuration
  const cx = 130;
  const cy = 125;
  const outerRadius = 96;
  const innerRadius = 78;
  const outerDotsCount = 26;
  const innerDotsCount = 21;

  // Arc angle parameters (210° span from 195° down to -15°)
  const startAngleDeg = 195;
  const totalSpanDeg = 210;

  // Calculate active dots for 68% progress
  const outerActiveCount = Math.round(outerDotsCount * (percentage / 100)); // 18 active
  const innerActiveCount = Math.round(innerDotsCount * (percentage / 100)); // 14 active

  // Helper to generate dot coordinates
  const generateArcDots = (count: number, r: number, activeLimit: number) => {
    const dots = [];
    for (let i = 0; i < count; i++) {
      const fraction = i / (count - 1);
      const angleDeg = startAngleDeg - fraction * totalSpanDeg;
      const angleRad = (angleDeg * Math.PI) / 180;
      const x = cx + r * Math.cos(angleRad);
      const y = cy - r * Math.sin(angleRad);
      const isActive = i < activeLimit;

      dots.push({
        id: `dot-${r}-${i}`,
        x,
        y,
        isActive,
      });
    }
    return dots;
  };

  const outerDots = generateArcDots(outerDotsCount, outerRadius, outerActiveCount);
  const innerDots = generateArcDots(innerDotsCount, innerRadius, innerActiveCount);

  return (
    <div className={styles.card} role="region" aria-label="Market Breadth Strength Research">
      {/* Left Column: Radial Dotted Arc Gauge */}
      <div className={styles.gaugeSection}>
        <div className={styles.radialWrapper}>
          <svg className={styles.gaugeSvg} viewBox="0 0 260 165" aria-hidden>
            <defs>
              {/* Glow filter for active glowing green dots */}
              <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Center Icon Gradient Border */}
              <linearGradient id="iconBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2FCB73" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Render Outer Arc of Dots */}
            {outerDots.map((dot) => (
              <circle
                key={dot.id}
                cx={dot.x}
                cy={dot.y}
                r={4.2}
                className={dot.isActive ? styles.activeDot : styles.inactiveDot}
                filter={dot.isActive ? "url(#dotGlow)" : undefined}
              />
            ))}

            {/* Render Inner Arc of Dots */}
            {innerDots.map((dot) => (
              <circle
                key={dot.id}
                cx={dot.x}
                cy={dot.y}
                r={4.2}
                className={dot.isActive ? styles.activeDot : styles.inactiveDot}
                filter={dot.isActive ? "url(#dotGlow)" : undefined}
              />
            ))}

            {/* Center Content: Diamond Crystal Icon Badge */}
            <g transform="translate(130, 76)">
              <circle cx="0" cy="0" r="15" fill="#0D1310" stroke="url(#iconBorderGrad)" strokeWidth="1.2" />
              <path
                d="M0 -7 L6 0 L0 7 L-6 0 Z M0 -3.5 L3 0 L0 3.5 L-3 0 Z"
                fill="none"
                stroke="#2FCB73"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </g>

            {/* Center Percentage Display */}
            <text x="130" y="128" textAnchor="middle" className={styles.centerValue}>
              {percentage}%
            </text>
          </svg>
        </div>
      </div>

      {/* Right Column: Inset Text Content */}
      <div className={styles.contentSection}>
        <div className={styles.headerGroup}>
          <h3 className={styles.title}>MARKET BREADTH STRENGTH</h3>
          <span className={styles.statusBadge}>REGIME: RISK-ON</span>
        </div>

        <p className={styles.bodyText}>
          Megacap semis are carrying the tape after NVDA&apos;s guidance reset expectations for
          2026 datacenter capex, while a 9bp drop in the 10Y is supporting long-duration growth
          names. Breadth is healthy but concentrated — small caps lag and defensive sectors are
          seeing steady outflows, keeping the regime risk-on with single-stock event risk into this
          week&apos;s earnings block.
        </p>

        <p className={styles.disclaimer}>
          AI-generated research. Informational only — not financial advice.
        </p>
      </div>
    </div>
  );
}
