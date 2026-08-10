"use client";

import React, { useState } from "react";
import { Settings, LayoutGrid, Bookmark, Tornado, Activity, User, Shield, Lock, BarChart3, Edit2, Flame, Search, Users, Check, Zap } from "lucide-react";
import styles from "./MemeTrenchesView.module.css";

interface MemeToken {
  id: string;
  symbol: string;
  name: string;
  avatar: string;
  contract: string;
  time: string;
  timeType?: "green" | "orange";
  handle?: string;
  followers?: string;
  mc: string;
  mcColor?: "white" | "green" | "cyan" | "amber";
  vol: string;
  fee?: string;
  tx?: string;
  pills: Array<{
    label: React.ReactNode;
    type?: "green" | "red" | "blue" | "amber";
  }>;
}

const newTokens: MemeToken[] = [
  {
    id: "new-1",
    symbol: "Frohorse",
    name: "HE BOUGHT",
    avatar: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
    contract: "3T2W...pump",
    time: "12s",
    timeType: "green",
    handle: "@Trencherbill7",
    followers: "380",
    mc: "$4.2K",
    mcColor: "white",
    vol: "$0",
    fee: "0",
    tx: "0",
    pills: [
      { label: <><User size={12} /> 0%</>, type: "green" },
      { label: <><Shield size={12} /> DS 41d</>, type: "blue" },
      { label: <><Lock size={12} /> 0%</>, type: "green" },
      { label: <><Shield size={12} /> 0%</>, type: "green" },
      { label: <><BarChart3 size={12} /> 0%</>, type: "green" },
    ],
  },
  {
    id: "new-2",
    symbol: "Frohorse",
    name: "HE BOUGHT",
    avatar: "https://cryptologos.cc/logos/shiba-inu-shib-logo.png",
    contract: "HK3f...pump",
    time: "11s",
    timeType: "green",
    handle: "@Trencherbill7",
    followers: "380",
    mc: "$4.2K",
    mcColor: "white",
    vol: "$0",
    fee: "0",
    tx: "0",
    pills: [
      { label: <><User size={12} /> 0%</>, type: "green" },
      { label: <><Shield size={12} /> DS 41d</>, type: "blue" },
      { label: <><Lock size={12} /> 0%</>, type: "green" },
      { label: <><Shield size={12} /> 0%</>, type: "green" },
      { label: <><BarChart3 size={12} /> 0%</>, type: "green" },
    ],
  },
  {
    id: "new-3",
    symbol: "Frohorse",
    name: "HE BOUGHT",
    avatar: "https://cryptologos.cc/logos/pepe-pepe-logo.png",
    contract: "9jkj...pump",
    time: "14s",
    timeType: "green",
    handle: "@Trencherbill7",
    followers: "380",
    mc: "$4.2K",
    mcColor: "white",
    vol: "$0",
    fee: "0",
    tx: "0",
    pills: [
      { label: <><User size={12} /> 0%</>, type: "green" },
      { label: <><Shield size={12} /> DS 41d</>, type: "blue" },
      { label: <><Lock size={12} /> 0%</>, type: "green" },
      { label: <><Shield size={12} /> 0%</>, type: "green" },
      { label: <><BarChart3 size={12} /> 0%</>, type: "green" },
    ],
  },
  {
    id: "new-4",
    symbol: "Frohorse",
    name: "HE BOUGHT",
    avatar: "https://cryptologos.cc/logos/floki-inu-floki-logo.png",
    contract: "4Mv8...pump",
    time: "15s",
    timeType: "green",
    handle: "@Trencherbill7",
    followers: "380",
    mc: "$4.2K",
    mcColor: "white",
    vol: "$0",
    fee: "0",
    tx: "0",
    pills: [
      { label: <><User size={12} /> 0%</>, type: "green" },
      { label: <><Shield size={12} /> DS 41d</>, type: "blue" },
      { label: <><Lock size={12} /> 0%</>, type: "green" },
      { label: <><Shield size={12} /> 0%</>, type: "green" },
      { label: <><BarChart3 size={12} /> 0%</>, type: "green" },
    ],
  },
  {
    id: "new-5",
    symbol: "UNIKING",
    name: "Uniking",
    avatar: "https://cryptologos.cc/logos/bonk1-bonk-logo.png",
    contract: "7kJm...eMJ2",
    time: "21s",
    timeType: "green",
    handle: "@Uniswap",
    followers: "1.5M",
    mc: "$4.2K",
    mcColor: "white",
    vol: "$0",
    fee: "0",
    tx: "0",
    pills: [
      { label: <><User size={12} /> 0%</>, type: "green" },
      { label: <><Shield size={12} /> DS 24s</>, type: "blue" },
      { label: <><Lock size={12} /> 0%</>, type: "green" },
      { label: <><Shield size={12} /> 0%</>, type: "green" },
      { label: <><BarChart3 size={12} /> 0%</>, type: "green" },
    ],
  },
  {
    id: "new-6",
    symbol: "ultramegamayh",
    name: "UltraMegaMayhenMC",
    avatar: "https://cryptologos.cc/logos/dogwifhat-wif-logo.png",
    contract: "CzA1...pump",
    time: "21s",
    timeType: "green",
    mc: "$6.3K",
    mcColor: "white",
    vol: "$78.98",
    fee: "0.0052",
    tx: "17",
    pills: [
      { label: <><User size={12} /> 0%</>, type: "green" },
      { label: <><Shield size={12} /> DS 11d</>, type: "blue" },
      { label: <><Lock size={12} /> 0%</>, type: "green" },
      { label: <><Shield size={12} /> 0%</>, type: "green" },
      { label: <><BarChart3 size={12} /> 0.36%</>, type: "green" },
    ],
  },
];

const mcTokens: MemeToken[] = [
  {
    id: "mc-1",
    symbol: "GUN",
    name: "Gun",
    avatar: "https://cryptologos.cc/logos/myro-myro-logo.png",
    contract: "5Ca2...MG3U",
    time: "14h",
    timeType: "orange",
    mc: "$2.2K",
    mcColor: "white",
    vol: "$1.2K",
    fee: "0.021",
    tx: "17",
    pills: [
      { label: <><User size={12} /> 0.2%</>, type: "green" },
      { label: <><Shield size={12} /> DS 14h</>, type: "blue" },
      { label: <><Lock size={12} /> 0%</>, type: "green" },
      { label: <><Shield size={12} /> 0%</>, type: "green" },
    ],
  },
  {
    id: "mc-2",
    symbol: "STOCKLY",
    name: "Stockly",
    avatar: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
    contract: "4Z6W...pump",
    time: "21h",
    timeType: "orange",
    handle: "@stocklyfun",
    followers: "64",
    mc: "$26.7K",
    mcColor: "green",
    vol: "$53.1K",
    fee: "2.49",
    tx: "5.4K",
    pills: [
      { label: <><User size={12} /> 25%</>, type: "green" },
      { label: <><Shield size={12} /> 0.1% 23h</>, type: "blue" },
      { label: <><Lock size={12} /> 2%</>, type: "green" },
      { label: <><Shield size={12} /> 42%</>, type: "red" },
      { label: <><BarChart3 size={12} /> 27</>, type: "red" },
    ],
  },
  {
    id: "mc-3",
    symbol: "lickingcat",
    name: "world licking cat",
    avatar: "https://cryptologos.cc/logos/shiba-inu-shib-logo.png",
    contract: "EjD5...pump",
    time: "48m",
    timeType: "orange",
    handle: "@Infinitidigits",
    followers: "731",
    mc: "$25.6K",
    mcColor: "green",
    vol: "$58.7K",
    fee: "2.72",
    tx: "1.5K",
    pills: [
      { label: <><User size={12} /> 23%</>, type: "green" },
      { label: <><Shield size={12} /> DS 189d</>, type: "blue" },
      { label: <><Lock size={12} /> 0%</>, type: "green" },
      { label: <><Shield size={12} /> 30%</>, type: "red" },
      { label: <><BarChart3 size={12} /> 1.47%</>, type: "green" },
    ],
  },
  {
    id: "mc-4",
    symbol: "Gany",
    name: "Gany",
    avatar: "https://cryptologos.cc/logos/pepe-pepe-logo.png",
    contract: "79Wm...6AoK",
    time: "2h",
    timeType: "orange",
    handle: "@ganymedeshouse",
    followers: "49.3K",
    mc: "$65.9K",
    mcColor: "cyan",
    vol: "$703.9",
    fee: "0.084",
    tx: "12",
    pills: [
      { label: <><User size={12} /> 99%</>, type: "red" },
      { label: <><Shield size={12} /> 99% 12d</>, type: "red" },
      { label: <><Lock size={12} /> 0%</>, type: "green" },
      { label: <><Shield size={12} /> 0%</>, type: "green" },
      { label: <><BarChart3 size={12} /> 98.68%</>, type: "red" },
    ],
  },
  {
    id: "mc-5",
    symbol: "$DISCORD",
    name: "Discord",
    avatar: "https://cryptologos.cc/logos/floki-inu-floki-logo.png",
    contract: "J2JX...pump",
    time: "13h",
    timeType: "orange",
    mc: "$41.77",
    mcColor: "white",
    vol: "$2.8K",
    fee: "0.090",
    tx: "440",
    pills: [
      { label: <><User size={12} /> 87%</>, type: "red" },
      { label: <><Shield size={12} /> DS 17d</>, type: "blue" },
      { label: <><Lock size={12} /> 0%</>, type: "green" },
      { label: <><Shield size={12} /> 0%</>, type: "green" },
      { label: <><BarChart3 size={12} /> 0%</>, type: "green" },
    ],
  },
  {
    id: "mc-6",
    symbol: "OIIAOIIA",
    name: "spinning cat",
    avatar: "https://cryptologos.cc/logos/bonk1-bonk-logo.png",
    contract: "7Feu...6xpn",
    time: "3m",
    timeType: "green",
    mc: "$375.3K",
    mcColor: "amber",
    vol: "$1.1K",
    fee: "0.0039",
    tx: "65",
    pills: [
      { label: <><User size={12} /> 0.1%</>, type: "green" },
      { label: <><Shield size={12} /> DS</>, type: "blue" },
      { label: <><Lock size={12} /> 0%</>, type: "green" },
      { label: <><Shield size={12} /> 0%</>, type: "green" },
      { label: <><BarChart3 size={12} /> 0%</>, type: "green" },
    ],
  },
];

const migratedTokens: MemeToken[] = [
  {
    id: "mig-1",
    symbol: "GROKBOT",
    name: "Grok Bot",
    avatar: "https://cryptologos.cc/logos/dogwifhat-wif-logo.png",
    contract: "FPa8...pump",
    time: "22s",
    timeType: "green",
    handle: "@theinformation",
    followers: "1.2M",
    mc: "$35K",
    mcColor: "cyan",
    vol: "$31.2K",
    fee: "0.79",
    tx: "643",
    pills: [
      { label: <><User size={12} /> 24%</>, type: "green" },
      { label: <><Shield size={12} /> DS 482d</>, type: "blue" },
      { label: <><Lock size={12} /> 2%</>, type: "green" },
      { label: <><Shield size={12} /> 66%</>, type: "red" },
      { label: <><BarChart3 size={12} /> 41.6%</>, type: "red" },
    ],
  },
  {
    id: "mig-2",
    symbol: "MBJ",
    name: "MayhemBattleJoin",
    avatar: "https://cryptologos.cc/logos/myro-myro-logo.png",
    contract: "4cMM...pump",
    time: "25s",
    timeType: "green",
    mc: "$794.4",
    mcColor: "white",
    vol: "$9.95",
    fee: "0.015",
    tx: "8",
    pills: [
      { label: <><User size={12} /> 97%</>, type: "red" },
      { label: <><Shield size={12} /> DS 160d</>, type: "blue" },
      { label: <><Lock size={12} /> 0%</>, type: "green" },
      { label: <><Shield size={12} /> 0%</>, type: "green" },
      { label: <><BarChart3 size={12} /> 0%</>, type: "green" },
    ],
  },
  {
    id: "mig-3",
    symbol: "PEPE",
    name: "El Sapo Pepe",
    avatar: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
    contract: "A6X9...ZcT4",
    time: "1m",
    timeType: "green",
    handle: "by @azol51sas",
    followers: "41",
    mc: "$2.03",
    mcColor: "white",
    vol: "$4.1K",
    fee: "0.0034",
    tx: "412",
    pills: [
      { label: <><User size={12} /> 68%</>, type: "red" },
      { label: <><Shield size={12} /> DS 9m</>, type: "blue" },
      { label: <><Lock size={12} /> 3%</>, type: "green" },
      { label: <><Shield size={12} /> 0%</>, type: "green" },
      { label: <><BarChart3 size={12} /> 5.06%</>, type: "green" },
    ],
  },
  {
    id: "mig-4",
    symbol: "GREENCAT",
    name: "The Green Cat",
    avatar: "https://cryptologos.cc/logos/shiba-inu-shib-logo.png",
    contract: "hHb3...vSMP",
    time: "2m",
    timeType: "green",
    handle: "@zlindot",
    followers: "1.7K",
    mc: "$0.85",
    mcColor: "white",
    vol: "$0.12",
    fee: "0.00071",
    tx: "5",
    pills: [
      { label: <><User size={12} /> 87%</>, type: "red" },
      { label: <><Shield size={12} /> DS 69d</>, type: "blue" },
      { label: <><Lock size={12} /> 0%</>, type: "green" },
      { label: <><Shield size={12} /> 0%</>, type: "green" },
      { label: <><BarChart3 size={12} /> 0%</>, type: "green" },
    ],
  },
  {
    id: "mig-5",
    symbol: "PEPE",
    name: "El Sapo Pepe",
    avatar: "https://cryptologos.cc/logos/pepe-pepe-logo.png",
    contract: "SG9K...scGt",
    time: "2m",
    timeType: "green",
    handle: "by @azol51sas",
    followers: "41",
    mc: "$0.17",
    mcColor: "white",
    vol: "$2.1K",
    fee: "0.022",
    tx: "178",
    pills: [
      { label: <><User size={12} /> 20%</>, type: "green" },
      { label: <><Shield size={12} /> DS 9m</>, type: "blue" },
      { label: <><Lock size={12} /> 4%</>, type: "green" },
      { label: <><Shield size={12} /> 0%</>, type: "green" },
      { label: <><BarChart3 size={12} /> 0%</>, type: "green" },
    ],
  },
  {
    id: "mig-6",
    symbol: "SWAGCATS",
    name: "SWAGCATS",
    avatar: "https://cryptologos.cc/logos/floki-inu-floki-logo.png",
    contract: "Buvm...pump",
    time: "4m",
    timeType: "green",
    handle: "@swagcats_sol",
    followers: "2",
    mc: "$33.2K",
    mcColor: "cyan",
    vol: "$81.2K",
    fee: "1.07",
    tx: "3.9K",
    pills: [
      { label: <><User size={12} /> 13%</>, type: "green" },
      { label: <><Shield size={12} /> 0.2% 2h</>, type: "blue" },
      { label: <><Lock size={12} /> 0%</>, type: "green" },
      { label: <><Shield size={12} /> 17%</>, type: "red" },
      { label: <><BarChart3 size={12} /> 0.81</>, type: "green" },
    ],
  },
];

export default function MemeTrenchesView() {
  const [newSearch, setNewSearch] = useState("");
  const [mcSearch, setMcSearch] = useState("");
  const [migSearch, setMigSearch] = useState("");

  const renderTokenCard = (token: MemeToken) => {
    let mcClass = styles.mcWhite;
    if (token.mcColor === "green") mcClass = styles.mcGreen;
    if (token.mcColor === "cyan") mcClass = styles.mcCyan;
    if (token.mcColor === "amber") mcClass = styles.mcAmber;

    return (
      <div key={token.id} className={styles.card}>
        {/* Left Avatar Column */}
        <div className={styles.avatarCol}>
          <div className={styles.avatarWrapper}>
            <img src={token.avatar} alt={token.symbol} className={styles.avatarImg} />
            <span className={styles.avatarChainDot} style={{ backgroundColor: "#22c55e" }} />
          </div>
          <span className={styles.contractTag}>{token.contract}</span>
        </div>

        {/* Main Content Column */}
        <div className={styles.mainCol}>
          {/* Header Row: Symbol, Name & MC / Volume */}
          <div className={styles.rowHeader}>
            <div className={styles.titleRow}>
              <span className={styles.tokenSymbol}>{token.symbol}</span>
              <span className={styles.tokenName}>{token.name}</span>
              <span className={styles.editIcon}><Edit2 size={14} /></span>
            </div>

            <div className={styles.metricsCol}>
              <div className={styles.metricRow}>
                <span className={styles.metricLabel}>MC</span>
                <span className={`${styles.mcValue} ${mcClass}`}>{token.mc}</span>
              </div>
              <div className={styles.metricRow}>
                <span className={styles.metricLabel}>V</span>
                <span className={styles.vValue}>{token.vol}</span>
              </div>
            </div>
          </div>

          {/* Time & Social Proof Row */}
          <div className={styles.metaRow}>
            <span className={token.timeType === "orange" ? styles.timeOrange : styles.timeGreen}>
              {token.time}
            </span>
            <span><Flame size={14} /></span>
            <span><Search size={14} /></span>
            {token.handle && <span className={styles.handleText}>{token.handle}</span>}
            {token.followers && <span className={styles.followersText}><Users size={14} /> {token.followers}</span>}
          </div>

          {/* Sub Metrics (Fee & TX count if applicable) */}
          {(token.fee || token.tx) && (
            <div className={styles.subMetricsRow}>
              {token.fee && <span>F 🪙 {token.fee}</span>}
              {token.tx && <span>TX {token.tx}</span>}
            </div>
          )}

          {/* Bottom Security / Holder Pills */}
          <div className={styles.pillsRow}>
            {token.pills.map((pill, idx) => {
              let pillClass = styles.pillGreen;
              if (pill.type === "red") pillClass = styles.pillRed;
              if (pill.type === "blue") pillClass = styles.pillBlue;
              if (pill.type === "amber") pillClass = styles.pillAmber;

              return (
                <span key={idx} className={`${styles.statPill} ${pillClass}`}>
                  {pill.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {/* Top Utility Header Bar */}
      <div className={styles.topBar}>
        <div className={styles.brandGroup}>
          <div className={styles.brandTitle}>
            <Zap size={16} /> Trenches
          </div>

          {/* Chain Pill Badges */}
          <div className={styles.chainPillsRow}>
            <span className={styles.chainPill} style={{ backgroundColor: "#14F195" }}>S</span>
            <span className={styles.chainPill} style={{ backgroundColor: "#0052FF" }}>B</span>
            <span className={styles.chainPill} style={{ backgroundColor: "#627EEA" }}>E</span>
            <span className={styles.chainPill} style={{ backgroundColor: "#8247E5" }}>P</span>
            <span className={styles.chainPill} style={{ backgroundColor: "#28A0F0" }}>A</span>
            <span className={styles.chainPill} style={{ backgroundColor: "#A855F7" }}>M</span>
          </div>
        </div>

        <div className={styles.topRightActions}>
          <button className={styles.customizeBtn}>
            <Settings size={14} /> Customize
          </button>
          <button className={styles.actionIconBtn} aria-label="Layout mode">
            <LayoutGrid size={14} />
          </button>
          <button className={styles.actionIconBtn} aria-label="Bookmark">
            <Bookmark size={14} />
          </button>
          <button className={styles.actionIconBtn} aria-label="Settings">
            <Settings size={14} />
          </button>
          <button className={styles.toggleOffBtn}>
            OFF
          </button>
        </div>
      </div>

      {/* 3-Column Terminal Layout */}
      <div className={styles.columnsGrid}>
        {/* Column 1: New */}
        <div className={styles.column}>
          <div className={styles.columnHeader}>
            <span className={styles.columnTitle}>New</span>
            <div className={styles.columnSearch}>
              <input
                type="text"
                placeholder="Keyword1, K..."
                value={newSearch}
                onChange={(e) => setNewSearch(e.target.value)}
              />
            </div>
            <div className={styles.filterPillsGroup}>
              <span className={`${styles.quickPill} ${styles.quickPillActive}`}>P1</span>
              <span className={styles.quickPill}>P2</span>
              <span className={styles.quickPill}>P3</span>
              <span className={styles.quickPill}><Tornado size={14} /></span>
              <span className={styles.quickPill}><Settings size={14} /></span>
            </div>
          </div>

          <div className={styles.tokenCardsList}>
            {newTokens
              .filter((t: MemeToken) => t.symbol.toLowerCase().includes(newSearch.toLowerCase()))
              .map(renderTokenCard)}
          </div>
        </div>

        {/* Column 2: % MC */}
        <div className={styles.column}>
          <div className={styles.columnHeader}>
            <span className={styles.columnTitle}>% MC</span>
            <div className={styles.columnSearch}>
              <input
                type="text"
                placeholder="Keyword1, K..."
                value={mcSearch}
                onChange={(e) => setMcSearch(e.target.value)}
              />
            </div>
            <div className={styles.filterPillsGroup}>
              <span className={`${styles.quickPill} ${styles.quickPillActive}`}>P1</span>
              <span className={styles.quickPill}>P2</span>
              <span className={styles.quickPill}>P3</span>
              <span className={styles.quickPill}><Tornado size={14} /></span>
              <span className={styles.quickPill}><Settings size={14} /></span>
            </div>
          </div>

          <div className={styles.tokenCardsList}>
            {mcTokens
              .filter((t: MemeToken) => t.symbol.toLowerCase().includes(mcSearch.toLowerCase()))
              .map(renderTokenCard)}
          </div>
        </div>

        {/* Column 3: Migrated */}
        <div className={styles.column}>
          <div className={styles.columnHeader}>
            <span className={styles.columnTitle}>Migrated</span>
            <div className={styles.columnSearch}>
              <input
                type="text"
                placeholder="Keyword1, K..."
                value={migSearch}
                onChange={(e) => setMigSearch(e.target.value)}
              />
            </div>
            <div className={styles.filterPillsGroup}>
              <span className={`${styles.quickPill} ${styles.quickPillActive}`}>P1</span>
              <span className={styles.quickPill}>P2</span>
              <span className={styles.quickPill}>P3</span>
              <span className={styles.quickPill}><Tornado size={14} /></span>
              <span className={styles.quickPill}><Settings size={14} /></span>
            </div>
          </div>

          <div className={styles.tokenCardsList}>
            {migratedTokens
              .filter((t: MemeToken) => t.symbol.toLowerCase().includes(migSearch.toLowerCase()))
              .map(renderTokenCard)}
          </div>
        </div>
      </div>
    </div>
  );
}
