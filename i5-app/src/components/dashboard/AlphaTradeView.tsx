"use client";

import React from "react";
import styles from "./AlphaTradeView.module.css";
import MagicRings from "../ui/MagicRings";
import DepthText from "../ui/DepthText";

export default function AlphaTradeView() {
  return (
    <div className={styles.container}>
      {/* Centered Hero Section with Magic Rings */}
      <div className={styles.heroSection}>
        
        {/* Magic Rings Background */}
        <div className={styles.magicRingsWrapper}>
          <MagicRings
            color="#24A1DE"
            colorTwo="#0088cc"
            ringCount={6}
            speed={1}
            attenuation={10}
            lineThickness={2}
            baseRadius={0.35}
            radiusStep={0.1}
            scaleRate={0.1}
            opacity={0.8}
            blur={0}
            noiseAmount={0.05}
            rotation={0}
            ringGap={1.5}
            fadeIn={0.7}
            fadeOut={0.5}
            followMouse={true}
            mouseInfluence={0.1}
            hoverScale={1.1}
            parallax={0.05}
            clickBurst={true}
          />
        </div>

        {/* Foreground Content */}
        <div className={styles.heroContent}>
          {/* Text Elements Group */}
          <div className={styles.textContentGroup}>
            {/* Top Trust Badge */}
            <div className={styles.trustBadge}>
              <span className={styles.pulseDot} />
              <span className={styles.trustBadgeText}>
                Trusted by <strong>12,000+</strong> traders
              </span>
            </div>

            {/* Main Title using DepthText Component */}
            <div style={{ margin: "var(--space-2) 0", display: "flex", justifyContent: "center" }}>
              <DepthText
                text="ALPHA TRADE"
                layers={34}
                depth={2.4}
                faceColor="#ffffff"
                depthColor="#24A1DE"
                tilt={7.5}
                pointerTracking={true}
                smoothing={0.14}
                perspective={900}
                autoOrbit={true}
                orbitSpeed={0.35}
                fontSize="64px"
                fontWeight={900}
                shadow={true}
              />
            </div>

            {/* Tagline Sub-heading */}
            <div className={styles.taglineGroup}>
              <span className={styles.greenDash} />
              <h2 className={styles.taglineText}>Smart Signals. Real Edge.</h2>
            </div>

            {/* Paragraph Description */}
            <p className={styles.description}>
              Long and short tokens together in your Telegram group. Share alpha,
              copy, and countertrade your friends.
            </p>
            <p className={styles.subDescription}>Don&apos;t get liquidated.</p>
          </div>

          {/* Action Elements Group */}
          <div className={styles.actionContentGroup}>
            {/* Primary CTA Button */}
            <div className={styles.ctaWrapper} style={{ marginTop: 0 }}>
              <button className={styles.ctaBtn}>
                <svg width={18} height={18} viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M14 2L7.5 8.5M14 2L9.5 14L7.5 8.5M14 2L2 6.5L7.5 8.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Get Started</span>
                <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M3.5 8h9M8.5 3.5l4.5 4.5-4.5 4.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Social Proof Row */}
            <div className={styles.socialProofRow} style={{ marginTop: "var(--space-2)" }}>
              <div className={styles.avatarGroup}>
                <div className={styles.avatarCircle} style={{ backgroundColor: "#2A2D34" }}>
                  <span>👩</span>
                </div>
                <div className={styles.avatarCircle} style={{ backgroundColor: "#112F4E" }}>
                  <span>👩‍💻</span>
                </div>
                <div className={styles.avatarCircle} style={{ backgroundColor: "#3A2A14" }}>
                  <span>👨‍💼</span>
                </div>
                <div className={styles.countBadge}>+12K</div>
              </div>

              <p className={styles.socialProofText}>
                Join <strong>12,000+</strong> traders <br />
                growing together
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 3 Feature Cards Banner */}
      <div className={styles.featuresBanner}>
        <div className={styles.featureCard}>
          <div className={styles.iconBox}>
            <svg width={22} height={22} viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M9 1.5L2.5 9h5L6.5 14.5L13.5 7h-5L9 1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className={styles.featureMeta}>
            <h3 className={styles.featureTitle}>FAST EXECUTION</h3>
            <p className={styles.featureDesc}>
              Zero-latency trade signals delivered directly to your Telegram chat.
            </p>
          </div>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.iconBox}>
            <svg width={22} height={22} viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M8 2L2.5 4.5v4c0 3.5 3.5 5.5 5.5 6 2-.5 5.5-2.5 5.5-6v-4L8 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className={styles.featureMeta}>
            <h3 className={styles.featureTitle}>NON-CUSTODIAL</h3>
            <p className={styles.featureDesc}>
              Connect your wallet and trade securely through Hyperliquid&apos;s SDK.
            </p>
          </div>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.iconBox}>
            <svg width={22} height={22} viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M5.5 6a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM10.5 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM2 13.5a4 4 0 0 1 7 0M10 13.5a3.5 3.5 0 0 1 4.5 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </div>
          <div className={styles.featureMeta}>
            <h3 className={styles.featureTitle}>SOCIAL COPY</h3>
            <p className={styles.featureDesc}>
              Follow the winners and counter the whales with one click.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
