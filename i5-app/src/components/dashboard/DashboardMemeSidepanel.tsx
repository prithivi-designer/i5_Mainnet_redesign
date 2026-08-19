"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  SlidersHorizontal,
  Star,
  Users,
  GraduationCap,
  X,
  Check,
  ChevronDown,
  Flame,
  Bot,
  Cat,
  Dog,
  Gamepad2,
  Sparkles,
} from "lucide-react";
import styles from "./DashboardMemeSidepanel.module.css";

export interface SidepanelMemeToken {
  id: string;
  name: string;
  symbol: string;
  avatarBg?: string;
  avatarIcon?: string;
  avatarImage?: string;
  verified: boolean;
  marketCap: string;
  price: string;
  change24h: number;
  bondingPercent?: number; // e.g. 72 = 72%
  isGraduated?: boolean;
  graduatedPlatform?: string; // e.g. "Raydium" or "Pump.fun"
  kolsCount: number;
  isFavorited?: boolean;
  niche: "all" | "ai" | "cats" | "dogs" | "pepe" | "politifi" | "gaming" | "launchpad" | "desci";
  lore?: string;
}

const INITIAL_MEME_TOKENS: SidepanelMemeToken[] = [
  {
    id: "mooncat",
    name: "MOONCAT",
    symbol: "$MCAT",
    avatarBg: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
    avatarIcon: "🐱",
    avatarImage: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=80&h=80&fit=crop&crop=faces&auto=format&q=80",
    verified: true,
    marketCap: "$42.0K",
    price: "$0.000420",
    change24h: 34.8,
    bondingPercent: 72,
    kolsCount: 0,
    isFavorited: false,
    niche: "cats",
    lore: "The original intergalactic rescue feline on Solana.",
  },
  {
    id: "pepebot",
    name: "PepeBot AI",
    symbol: "$PEPEBOT",
    avatarBg: "linear-gradient(135deg, #3b82f6 0%, #ec4899 100%)",
    avatarIcon: "🤖",
    avatarImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&h=80&fit=crop&auto=format&q=80",
    verified: true,
    marketCap: "$482.0K",
    price: "$0.000482",
    change24h: 146.8,
    bondingPercent: 89,
    kolsCount: 8,
    isFavorited: true,
    niche: "ai",
    lore: "Autonomous meme generation agent running LLM inference.",
  },
  {
    id: "kate",
    name: "KATE",
    symbol: "$KATE",
    avatarBg: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
    avatarIcon: "👩",
    avatarImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces&auto=format&q=80",
    verified: true,
    marketCap: "$341.1K",
    price: "$0.003411",
    change24h: 88.4,
    bondingPercent: 92,
    kolsCount: 0,
    isFavorited: false,
    niche: "ai",
    lore: "AI synthetic influencer and viral meme streamer.",
  },
  {
    id: "four-bnb",
    name: "FOUR BNB",
    symbol: "$FOUR",
    avatarBg: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
    avatarIcon: "🌊",
    avatarImage: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=80&h=80&fit=crop&auto=format&q=80",
    verified: true,
    marketCap: "$185.0K",
    price: "$0.001850",
    change24h: 112.5,
    bondingPercent: 87,
    kolsCount: 0,
    isFavorited: false,
    niche: "launchpad",
    lore: "BSC community revival momentum token.",
  },
  {
    id: "goatseus",
    name: "Goatseus Maximus",
    symbol: "$GOAT",
    avatarBg: "linear-gradient(135deg, #18181b 0%, #27272a 100%)",
    avatarIcon: "🐐",
    avatarImage: "https://images.unsplash.com/photo-1524024973431-2ad916746881?w=80&h=80&fit=crop&auto=format&q=80",
    verified: true,
    marketCap: "$8.92M",
    price: "$0.008917",
    change24h: 540.2,
    isGraduated: true,
    graduatedPlatform: "Raydium",
    kolsCount: 5,
    isFavorited: false,
    niche: "ai",
    lore: "AI Terminal of Truths spawned cult religion token.",
  },
  {
    id: "cashcat",
    name: "CashCat",
    symbol: "$CASHCAT",
    avatarBg: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    avatarIcon: "🐱",
    avatarImage: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=80&h=80&fit=crop&crop=faces&auto=format&q=80",
    verified: true,
    marketCap: "$98.0K",
    price: "$0.000980",
    change24h: 124.0,
    bondingPercent: 82,
    kolsCount: 0,
    isFavorited: false,
    niche: "cats",
    lore: "Dapper wealth feline meme with automated buyback.",
  },
  {
    id: "czpepe",
    name: "CZ Pepe",
    symbol: "$CZPEPE",
    avatarBg: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    avatarIcon: "🐸",
    avatarImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=80&h=80&fit=crop&auto=format&q=80",
    verified: true,
    marketCap: "$62.0K",
    price: "$0.000620",
    change24h: 48.2,
    bondingPercent: 79,
    kolsCount: 0,
    isFavorited: false,
    niche: "pepe",
    lore: "Binance founder tribute frog in high velocity.",
  },
  {
    id: "zerebro",
    name: "Zerebro Autonomous...",
    symbol: "$ZEREBRO",
    avatarBg: "linear-gradient(135deg, #7c3aed 0%, #db2777 100%)",
    avatarIcon: "🎙️",
    avatarImage: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=80&h=80&fit=crop&auto=format&q=80",
    verified: true,
    marketCap: "$3.64M",
    price: "$0.003640",
    change24h: 340.0,
    isGraduated: true,
    graduatedPlatform: "Raydium",
    kolsCount: 12,
    isFavorited: true,
    niche: "ai",
    lore: "Autonomous music generating LLM agent token.",
  },
  {
    id: "act",
    name: "ACT I The AI Prophecy",
    symbol: "$ACT",
    avatarBg: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    avatarIcon: "🧠",
    avatarImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=80&h=80&fit=crop&auto=format&q=80",
    verified: true,
    marketCap: "$412.5M",
    price: "$0.412500",
    change24h: 64.2,
    isGraduated: true,
    graduatedPlatform: "Raydium",
    kolsCount: 16,
    isFavorited: true,
    niche: "ai",
    lore: "Decentralized autonomous AI agent orchestration collective.",
  },
  {
    id: "fartcoin",
    name: "Fartcoin",
    symbol: "$FARTCOIN",
    avatarBg: "linear-gradient(135deg, #22c55e 0%, #14b8a6 100%)",
    avatarIcon: "💨",
    avatarImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=80&h=80&fit=crop&auto=format&q=80",
    verified: true,
    marketCap: "$220.4M",
    price: "$0.220400",
    change24h: 18.7,
    isGraduated: true,
    graduatedPlatform: "Raydium",
    kolsCount: 9,
    isFavorited: false,
    niche: "ai",
    lore: "Conversational terminal comedy agent token.",
  },
  {
    id: "spx6900",
    name: "SPX6900",
    symbol: "$SPX",
    avatarBg: "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)",
    avatarIcon: "📈",
    avatarImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=80&h=80&fit=crop&auto=format&q=80",
    verified: true,
    marketCap: "$780.2M",
    price: "$0.835000",
    change24h: 12.4,
    isGraduated: true,
    graduatedPlatform: "Raydium",
    kolsCount: 14,
    isFavorited: false,
    niche: "gaming",
    lore: "Flip the S&P 500 meta movement.",
  },
];

const NICHES = [
  { id: "all", label: "All Memes", icon: "🔥", count: 33 },
  { id: "ai", label: "AI Agents & Bots", icon: "🤖", count: 22 },
  { id: "cats", label: "Cats", icon: "🐱", count: 15 },
  { id: "dogs", label: "Dogs", icon: "🐶", count: 18 },
  { id: "pepe", label: "Pepe Meta", icon: "🐸", count: 12 },
  { id: "politifi", label: "PolitiFi", icon: "🏛️", count: 9 },
  { id: "gaming", label: "Cult & Gaming", icon: "🎮", count: 7 },
  { id: "launchpad", label: "Launchpad", icon: "🚀", count: 14 },
  { id: "desci", label: "DeSci", icon: "🧠", count: 6 },
];

type SortMode = "trending" | "marketcap" | "change" | "bonding" | "kols";

export default function DashboardMemeSidepanel() {
  const [tokens, setTokens] = useState<SidepanelMemeToken[]>(INITIAL_MEME_TOKENS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNiche, setSelectedNiche] = useState<string>("all");
  const [selectedTokenId, setSelectedTokenId] = useState<string>("kate"); // Default active matching reference
  const [sortMode, setSortMode] = useState<SortMode>("trending");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [onlyFavorited, setOnlyFavorited] = useState(false);
  const [onlyGraduated, setOnlyGraduated] = useState(false);
  const [minKols, setMinKols] = useState(false);

  // Toggle favorite
  const handleToggleFavorite = (tokenId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTokens((prev) =>
      prev.map((t) => (t.id === tokenId ? { ...t, isFavorited: !t.isFavorited } : t))
    );
  };

  // Select token and dispatch event to main feed if wanted
  const handleSelectToken = (token: SidepanelMemeToken) => {
    setSelectedTokenId(token.id);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("i5-meme-token-select", {
          detail: { token },
        })
      );
    }
  };

  // Filtered & sorted tokens
  const filteredTokens = useMemo(() => {
    return tokens
      .filter((t) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = t.name.toLowerCase().includes(q);
          const matchSymbol = t.symbol.toLowerCase().includes(q);
          const matchLore = t.lore?.toLowerCase().includes(q);
          if (!matchName && !matchSymbol && !matchLore) return false;
        }

        // Niche filter
        if (selectedNiche !== "all" && t.niche !== selectedNiche) {
          return false;
        }

        // Quick filter chips
        if (onlyVerified && !t.verified) return false;
        if (onlyFavorited && !t.isFavorited) return false;
        if (onlyGraduated && !t.isGraduated) return false;
        if (minKols && t.kolsCount <= 0) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortMode === "change") return b.change24h - a.change24h;
        if (sortMode === "kols") return b.kolsCount - a.kolsCount;
        if (sortMode === "bonding") {
          return (b.bondingPercent || 100) - (a.bondingPercent || 100);
        }
        if (sortMode === "marketcap") {
          const parseMC = (mc: string) => {
            const num = parseFloat(mc.replace(/[^0-9.]/g, ""));
            return mc.includes("M") ? num * 1_000_000 : num * 1_000;
          };
          return parseMC(b.marketCap) - parseMC(a.marketCap);
        }
        // Default Trending: favorited and high change
        return b.change24h - a.change24h;
      });
  }, [tokens, searchQuery, selectedNiche, onlyVerified, onlyFavorited, onlyGraduated, minKols, sortMode]);

  const activeNicheObj = NICHES.find((n) => n.id === selectedNiche) || NICHES[0];

  const sortLabels: Record<SortMode, string> = {
    trending: "Trending",
    marketcap: "Market Cap",
    change: "24h Gain",
    bonding: "Bonding %",
    kols: "KOL Count",
  };

  return (
    <div className={styles.container}>
      {/* ── Top Search Bar & Filter Button ────────────────── */}
      <div className={styles.searchRow}>
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search meme, ticker, lore..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search meme tokens"
          />
          {searchQuery && (
            <button
              className={styles.clearSearchBtn}
              onClick={() => setSearchQuery("")}
              title="Clear search"
            >
              <X size={12} />
            </button>
          )}
        </div>

        <button
          className={`${styles.filterToggleBtn} ${showFilters ? styles.filterToggleBtnActive : ""}`}
          onClick={() => setShowFilters((v) => !v)}
          title="Filter meme parameters"
          aria-label="Toggle filters"
        >
          <SlidersHorizontal size={14} />
        </button>
      </div>

      {/* ── Quick Filter Drawer (Toggled) ──────────────────── */}
      {showFilters && (
        <div className={styles.quickFiltersDrawer}>
          <button
            className={`${styles.quickFilterChip} ${onlyVerified ? styles.quickFilterChipActive : ""}`}
            onClick={() => setOnlyVerified((v) => !v)}
          >
            Verified Only
          </button>
          <button
            className={`${styles.quickFilterChip} ${onlyFavorited ? styles.quickFilterChipActive : ""}`}
            onClick={() => setOnlyFavorited((v) => !v)}
          >
            ⭐ Starred
          </button>
          <button
            className={`${styles.quickFilterChip} ${onlyGraduated ? styles.quickFilterChipActive : ""}`}
            onClick={() => setOnlyGraduated((v) => !v)}
          >
            🎓 Graduated
          </button>
          <button
            className={`${styles.quickFilterChip} ${minKols ? styles.quickFilterChipActive : ""}`}
            onClick={() => setMinKols((v) => !v)}
          >
            👥 KOLs {">"} 0
          </button>
        </div>
      )}

      {/* ── MEME NICHES & METAS ────────────────────────────── */}
      <div className={styles.nichesSection}>
        <div className={styles.nichesHeader}>
          <span className={styles.nichesTitle}>MEME NICHES & METAS</span>
          <button
            className={styles.viewAllBtn}
            onClick={() => setSelectedNiche("all")}
          >
            View All ({NICHES.length})
          </button>
        </div>

        <div className={styles.nichesPillsRow}>
          {NICHES.map((niche) => {
            const isActive = selectedNiche === niche.id;
            return (
              <button
                key={niche.id}
                className={`${styles.nichePill} ${isActive ? styles.nichePillActive : ""}`}
                onClick={() => setSelectedNiche(niche.id)}
              >
                <span>{niche.icon}</span>
                <span>{niche.label}</span>
                <span className={styles.nicheBadge}>{niche.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Subheader: Active Niche & Sort Dropdown ─────────── */}
      <div className={styles.listSubheader}>
        <div className={styles.listSummary}>
          <span>{activeNicheObj.icon}</span>
          <span>{activeNicheObj.label}</span>
          <span className={styles.tokenCountText}>({filteredTokens.length} tokens)</span>
        </div>

        <div className={styles.sortSelector}>
          <button
            className={styles.sortBtn}
            onClick={() => setSortDropdownOpen((v) => !v)}
            aria-expanded={sortDropdownOpen}
          >
            <span>⇅</span>
            <span>{sortLabels[sortMode]}</span>
            <ChevronDown size={11} />
          </button>

          {sortDropdownOpen && (
            <div className={styles.sortDropdown}>
              {(Object.keys(sortLabels) as SortMode[]).map((mode) => (
                <button
                  key={mode}
                  className={`${styles.sortOption} ${sortMode === mode ? styles.sortOptionActive : ""}`}
                  onClick={() => {
                    setSortMode(mode);
                    setSortDropdownOpen(false);
                  }}
                >
                  <span>{sortLabels[mode]}</span>
                  {sortMode === mode && <Check size={11} />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Token Cards List ─────────────────────────────────── */}
      {filteredTokens.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyTitle}>No matching meme tokens</div>
          <div className={styles.emptySubtitle}>Try adjusting your search query or filters.</div>
        </div>
      ) : (
        <ul className={styles.tokensList}>
          {filteredTokens.map((token) => {
            const isActive = selectedTokenId === token.id;
            return (
              <li key={token.id}>
                <div
                  className={`${styles.tokenCard} ${isActive ? styles.tokenCardActive : ""}`}
                  onClick={() => handleSelectToken(token)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && handleSelectToken(token)}
                >
                  {/* Left Avatar with Verified Badge */}
                  <div className={styles.avatarWrapper}>
                    <div className={styles.tokenAvatar}>
                      {token.avatarImage ? (
                        <img
                          src={token.avatarImage}
                          alt={token.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          onError={(e) => {
                            // Fallback if image fails
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      ) : (
                        token.avatarIcon || token.symbol.slice(1, 3)
                      )}
                    </div>
                    {token.verified && (
                      <div className={styles.verifiedBadge} title="Verified Token">
                        <Check size={9} strokeWidth={3} />
                      </div>
                    )}
                  </div>

                  {/* Middle Info (Name, Symbol, Market Cap, Price, Bonding/Graduated) */}
                  <div className={styles.tokenInfo}>
                    <div className={styles.titleRow}>
                      <span className={styles.tokenName} title={token.name}>
                        {token.name}
                      </span>
                      <span className={styles.tokenTicker}>{token.symbol}</span>
                    </div>

                    <div className={styles.metricsRow}>
                      <span>MC {token.marketCap}</span>
                      <span className={styles.metricDot}>•</span>
                      <span>{token.price}</span>
                    </div>

                    {token.isGraduated ? (
                      <div className={styles.graduatedBadge}>
                        <GraduationCap size={12} />
                        <span>Graduated {token.graduatedPlatform || "Raydium"}</span>
                      </div>
                    ) : (
                      <div className={styles.progressRow}>
                        <div className={styles.progressBarTrack}>
                          <div
                            className={styles.progressBarFill}
                            style={{ width: `${token.bondingPercent || 50}%` }}
                          />
                        </div>
                        <span className={styles.progressPercent}>
                          {token.bondingPercent || 50}%
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Right Column (24h Change, KOLs count badge, Star favorite) */}
                  <div className={styles.rightActions}>
                    <span
                      className={`${styles.changeBadge} ${
                        token.change24h >= 0 ? styles.changePositive : styles.changeNegative
                      }`}
                    >
                      {token.change24h >= 0 ? "+" : ""}
                      {token.change24h.toFixed(2)}%
                    </span>

                    <div className={styles.bottomActionRow}>
                      <span
                        className={`${styles.kolsBadge} ${
                          token.kolsCount > 0 ? styles.kolsBadgeActive : ""
                        }`}
                        title={`${token.kolsCount} Key Opinion Leaders tracking`}
                      >
                        <Users size={10} />
                        <span>{token.kolsCount} KOLs</span>
                      </span>

                      <button
                        className={`${styles.starBtn} ${
                          token.isFavorited ? styles.starBtnActive : ""
                        }`}
                        onClick={(e) => handleToggleFavorite(token.id, e)}
                        title={token.isFavorited ? "Remove from watchlist" : "Add to watchlist"}
                        aria-label="Toggle favorite"
                      >
                        <Star
                          size={13}
                          fill={token.isFavorited ? "#F59E0B" : "none"}
                          stroke={token.isFavorited ? "#F59E0B" : "currentColor"}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
