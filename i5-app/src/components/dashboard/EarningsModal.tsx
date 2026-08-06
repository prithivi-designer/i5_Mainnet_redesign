"use client";

import React, { useState, useEffect, useMemo } from "react";
import styles from "./EarningsModal.module.css";

export interface EarningsReport {
  id: string;
  ticker: string;
  companyName: string;
  avatarBg: string;
  logoUrl?: string;
  date: string; // YYYY-MM-DD
  dateDisplay: string;
  dayName: string;
  session: "AH" | "PRE"; // AMC (After Market Close) vs BMO (Before Market Open)
  epsEst: string;
  revEst: string;
  impliedMove: string;
  mktCap: string;
  sector: "Technology" | "Consumer" | "Energy" | "Finance" | "Crypto";
  isWatching: boolean;
  hasStar?: boolean;
  highlightMove?: boolean;
  isConfirmed?: boolean;
}

export interface DateGroup {
  dateKey: string; // YYYY-MM-DD
  dateLabel: string;
  countLabel: string;
  reports: EarningsReport[];
}

const mockReports: EarningsReport[] = [
  {
    id: "aapl",
    ticker: "AAPL",
    companyName: "Apple Inc.",
    avatarBg: "#1F2937",
    date: "2026-07-30",
    dateDisplay: "07-30",
    dayName: "Thu",
    session: "AH",
    epsEst: "$1.61",
    revEst: "$94.20B",
    impliedMove: "±4.1%",
    mktCap: "$3.42T",
    sector: "Technology",
    isWatching: true,
    hasStar: true,
    isConfirmed: true,
  },
  {
    id: "amzn",
    ticker: "AMZN",
    companyName: "Amazon.com Inc.",
    avatarBg: "#372717",
    date: "2026-07-30",
    dateDisplay: "07-30",
    dayName: "Thu",
    session: "AH",
    epsEst: "$1.33",
    revEst: "$160.10B",
    impliedMove: "±6.3%",
    mktCap: "$1.98T",
    sector: "Consumer",
    isWatching: false,
    isConfirmed: true,
  },
  {
    id: "xom",
    ticker: "XOM",
    companyName: "Exxon Mobil Corp.",
    avatarBg: "#3F1D24",
    date: "2026-07-30",
    dateDisplay: "07-30",
    dayName: "Thu",
    session: "PRE",
    epsEst: "$1.88",
    revEst: "$88.40B",
    impliedMove: "±2.4%",
    mktCap: "$465B",
    sector: "Energy",
    isWatching: false,
    isConfirmed: true,
  },
  {
    id: "coin",
    ticker: "COIN",
    companyName: "Coinbase Global Inc.",
    avatarBg: "#112F4E",
    date: "2026-07-31",
    dateDisplay: "07-31",
    dayName: "Fri",
    session: "AH",
    epsEst: "$1.64",
    revEst: "$2.02B",
    impliedMove: "±9.8%",
    mktCap: "$58B",
    sector: "Crypto",
    isWatching: true,
    hasStar: true,
    highlightMove: true,
    isConfirmed: true,
  },
  {
    id: "amd",
    ticker: "AMD",
    companyName: "Advanced Micro Devices",
    avatarBg: "#3A2A14",
    date: "2026-07-31",
    dateDisplay: "07-31",
    dayName: "Fri",
    session: "AH",
    epsEst: "$0.94",
    revEst: "$7.60B",
    impliedMove: "±7.2%",
    mktCap: "$240B",
    sector: "Technology",
    isWatching: false,
    highlightMove: true,
    isConfirmed: true,
  },
  {
    id: "meta",
    ticker: "META",
    companyName: "Meta Platforms Inc.",
    avatarBg: "#1A2E3B",
    date: "2026-08-03",
    dateDisplay: "08-03",
    dayName: "Mon",
    session: "AH",
    epsEst: "$6.04",
    revEst: "$44.80B",
    impliedMove: "±5.6%",
    mktCap: "$1.32T",
    sector: "Technology",
    isWatching: true,
    hasStar: true,
    isConfirmed: true,
  },
  {
    id: "pltr",
    ticker: "PLTR",
    companyName: "Palantir Technologies",
    avatarBg: "#1E2A38",
    date: "2026-08-03",
    dateDisplay: "08-03",
    dayName: "Mon",
    session: "AH",
    epsEst: "$0.09",
    revEst: "$678M",
    impliedMove: "±11.2%",
    mktCap: "$62B",
    sector: "Technology",
    isWatching: true,
    hasStar: true,
    highlightMove: true,
    isConfirmed: true,
  },
  {
    id: "dis",
    ticker: "DIS",
    companyName: "Walt Disney Co.",
    avatarBg: "#192841",
    date: "2026-08-05",
    dateDisplay: "08-05",
    dayName: "Wed",
    session: "PRE",
    epsEst: "$1.20",
    revEst: "$23.10B",
    impliedMove: "±4.8%",
    mktCap: "$175B",
    sector: "Consumer",
    isWatching: false,
    isConfirmed: false,
  },
  {
    id: "nvda",
    ticker: "NVDA",
    companyName: "NVIDIA Corporation",
    avatarBg: "#1D3B26",
    date: "2026-08-06",
    dateDisplay: "08-06",
    dayName: "Thu",
    session: "AH",
    epsEst: "$0.65",
    revEst: "$28.60B",
    impliedMove: "±8.4%",
    mktCap: "$3.10T",
    sector: "Technology",
    isWatching: true,
    hasStar: true,
    highlightMove: true,
    isConfirmed: true,
  },
];

const monthsList = [
  { value: "All months", label: "All Months" },
  { value: "01", label: "Jan (01)" },
  { value: "02", label: "Feb (02)" },
  { value: "03", label: "Mar (03)" },
  { value: "04", label: "Apr (04)" },
  { value: "05", label: "May (05)" },
  { value: "06", label: "Jun (06)" },
  { value: "07", label: "Jul (07)" },
  { value: "08", label: "Aug (08)" },
  { value: "09", label: "Sep (09)" },
  { value: "10", label: "Oct (10)" },
  { value: "11", label: "Nov (11)" },
  { value: "12", label: "Dec (12)" },
];

const daysList = Array.from({ length: 31 }, (_, i) => {
  const d = i + 1;
  const val = d < 10 ? `0${d}` : `${d}`;
  return { value: val, label: `Day ${d}` };
});

interface EarningsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EarningsModal({ isOpen, onClose }: EarningsModalProps) {
  // View Mode: Agenda (List) vs Calendar (Month Grid)
  const [viewMode, setViewMode] = useState<"agenda" | "calendar">("agenda");
  
  // Date, Month, Year Filter States
  const [selectedYear, setSelectedYear] = useState<string>("2026");
  const [selectedMonth, setSelectedMonth] = useState<string>("All months");
  const [selectedDay, setSelectedDay] = useState<string>("All days");
  const [customDate, setCustomDate] = useState<string>("");

  // Other Filters
  const [sessionFilter, setSessionFilter] = useState<string>("All sessions");
  const [sectorFilter, setSectorFilter] = useState<string>("All sectors");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [watchlistOnly, setWatchlistOnly] = useState<boolean>(false);
  const [highImpliedMove, setHighImpliedMove] = useState<boolean>(false);
  const [gridSelectedDate, setGridSelectedDate] = useState<string | null>(null);

  const [reports, setReports] = useState<EarningsReport[]>(mockReports);

  // Keyboard shortcut Esc to close
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const toggleWatch = (reportId: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, isWatching: !r.isWatching } : r))
    );
  };

  // Reset Date/Month/Year filters
  const resetDateFilters = () => {
    setSelectedYear("All years");
    setSelectedMonth("All months");
    setSelectedDay("All days");
    setCustomDate("");
    setGridSelectedDate(null);
  };

  // Filtered reports calculation
  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTicker = r.ticker.toLowerCase().includes(q);
        const matchCompany = r.companyName.toLowerCase().includes(q);
        if (!matchTicker && !matchCompany) return false;
      }

      // 2. Exact Custom Date Picker Input (YYYY-MM-DD)
      if (customDate) {
        if (r.date !== customDate) return false;
      }

      // 3. Grid Selected Date (from Month Grid cell click)
      if (gridSelectedDate && r.date !== gridSelectedDate) {
        return false;
      }

      // 4. Year Filter
      if (selectedYear !== "All years") {
        const rYear = r.date.split("-")[0];
        if (rYear !== selectedYear) return false;
      }

      // 5. Month Filter
      if (selectedMonth !== "All months") {
        const rMonth = r.date.split("-")[1];
        if (rMonth !== selectedMonth) return false;
      }

      // 6. Day Filter
      if (selectedDay !== "All days") {
        const rDay = r.date.split("-")[2];
        if (parseInt(rDay, 10) !== parseInt(selectedDay, 10)) return false;
      }

      // 7. Session
      if (sessionFilter === "Pre-Market" && r.session !== "PRE") return false;
      if (sessionFilter === "After-Hours" && r.session !== "AH") return false;

      // 8. Sector
      if (sectorFilter !== "All sectors" && r.sector !== sectorFilter) return false;

      // 9. Watchlist
      if (watchlistOnly && !r.isWatching) return false;

      // 10. High implied move
      if (highImpliedMove && !r.highlightMove) return false;

      return true;
    });
  }, [
    reports,
    searchQuery,
    customDate,
    gridSelectedDate,
    selectedYear,
    selectedMonth,
    selectedDay,
    sessionFilter,
    sectorFilter,
    watchlistOnly,
    highImpliedMove,
  ]);

  // Group filtered reports by date for Agenda view
  const groupedReports = useMemo(() => {
    const groups: { [key: string]: EarningsReport[] } = {};
    filteredReports.forEach((r) => {
      if (!groups[r.date]) {
        groups[r.date] = [];
      }
      groups[r.date].push(r);
    });

    return Object.keys(groups)
      .sort()
      .map((dateKey) => {
        const itemReports = groups[dateKey];
        const dateObj = new Date(dateKey + "T00:00:00");
        const formattedDate = dateObj.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        });

        return {
          dateKey,
          dateLabel: formattedDate,
          countLabel: `${itemReports.length} ${itemReports.length === 1 ? "report" : "reports"}`,
          reports: itemReports,
        };
      });
  }, [filteredReports]);

  // Generate Month Calendar Grid based on selectedMonth & selectedYear
  const calendarDays = useMemo(() => {
    const totalDays = 31;
    const paddingBefore = 3;
    const daysArr = [];

    for (let i = 0; i < paddingBefore; i++) {
      daysArr.push({ isBlank: true, dayNum: 0, dateKey: "" });
    }

    const yearStr = selectedYear === "All years" ? "2026" : selectedYear;
    const monthStr = selectedMonth === "All months" ? "07" : selectedMonth;

    for (let d = 1; d <= totalDays; d++) {
      const dayStr = d < 10 ? `0${d}` : `${d}`;
      const dateKey = `${yearStr}-${monthStr}-${dayStr}`;
      const dayReports = reports.filter((r) => r.date === dateKey);

      daysArr.push({
        isBlank: false,
        dayNum: d,
        dateKey,
        dayReports,
      });
    }

    return daysArr;
  }, [reports, selectedYear, selectedMonth]);

  if (!isOpen) return null;

  const isDateFiltered =
    selectedYear !== "All years" ||
    selectedMonth !== "All months" ||
    selectedDay !== "All days" ||
    customDate !== "" ||
    gridSelectedDate !== null;

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        
        {/* Top Header Row */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.calendarIconBox}>
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="3" y="4" width="18" height="17" rx="3" stroke="currentColor" strokeWidth="1.8" />
                <path d="M8 2v4M16 2v4M3 9h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="8" cy="13" r="1.2" fill="currentColor" />
                <circle cx="12" cy="13" r="1.2" fill="currentColor" />
                <circle cx="16" cy="13" r="1.2" fill="currentColor" />
                <circle cx="8" cy="17" r="1.2" fill="currentColor" />
                <circle cx="12" cy="17" r="1.2" fill="currentColor" />
              </svg>
            </div>
            <div className={styles.titleMeta}>
              <div className={styles.titleRow}>
                <h3 className={styles.title}>Upcoming Earnings Calendar</h3>
                <span className={styles.liveBadge}>LIVE DATA</span>
              </div>
              <p className={styles.subtitle}>
                Track quarterly financial announcements, estimated EPS, revenue &amp; implied move.
              </p>
            </div>
          </div>

          {/* Top Right Actions: View Switcher + Close */}
          <div className={styles.headerRight}>
            <div className={styles.viewToggleGroup}>
              <button
                className={`${styles.viewToggleBtn} ${
                  viewMode === "agenda" ? styles.activeViewBtn : ""
                }`}
                onClick={() => setViewMode("agenda")}
                title="Agenda List View"
              >
                <svg width={15} height={15} viewBox="0 0 16 16" fill="none">
                  <path d="M2.5 4h11M2.5 8h11M2.5 12h11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                Agenda
              </button>

              <button
                className={`${styles.viewToggleBtn} ${
                  viewMode === "calendar" ? styles.activeViewBtn : ""
                }`}
                onClick={() => setViewMode("calendar")}
                title="Month Calendar Grid"
              >
                <svg width={15} height={15} viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="2" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4" />
                  <rect x="8.5" y="2" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4" />
                  <rect x="2" y="8.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4" />
                  <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4" />
                </svg>
                Calendar Grid
              </button>
            </div>

            <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
              ✕
            </button>
          </div>
        </div>

        {/* 4 Summary Stat Cards Row (STYLED EXACTLY LIKE IMAGE 2 REFERENCE) */}
        <div className={styles.summaryGrid}>
          {/* Card 1 */}
          <div className={styles.summaryCard}>
            <div className={styles.cardStatHeader}>
              <div className={styles.summaryHeaderLeft}>
                <span className={styles.summaryIcon}>📈</span>
                <span className={styles.summaryLabel}>TOTAL UPCOMING</span>
              </div>
              <span className={styles.moreDots}>•••</span>
            </div>

            <div className={styles.insetMainBox}>
              <span className={styles.summaryValue}>{filteredReports.length} Reports</span>
            </div>

            <div className={styles.cardFooterRow}>
              <span className={styles.summarySubtext}>Matching active filters</span>
              <div className={`${styles.badgePill} ${styles.greenBadge}`}>
                <span>▲</span> Active
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className={styles.summaryCard}>
            <div className={styles.cardStatHeader}>
              <div className={styles.summaryHeaderLeft}>
                <span className={styles.summaryIcon}>💰</span>
                <span className={styles.summaryLabel}>REVENUE ON DECK</span>
              </div>
              <span className={styles.moreDots}>•••</span>
            </div>

            <div className={styles.insetMainBox}>
              <span className={styles.summaryValue}>$683.5B</span>
            </div>

            <div className={styles.cardFooterRow}>
              <span className={styles.summarySubtext}>Combined estimate</span>
              <div className={`${styles.badgePill} ${styles.greenBadge}`}>
                <span>▲</span> +14.2% YoY
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className={styles.summaryCard}>
            <div className={styles.cardStatHeader}>
              <div className={styles.summaryHeaderLeft}>
                <span className={styles.summaryIcon}>⚡</span>
                <span className={styles.summaryLabel}>LARGEST IMPLIED MOVE</span>
              </div>
              <span className={styles.moreDots}>•••</span>
            </div>

            <div className={styles.insetMainBox}>
              <span className={`${styles.summaryValue} ${styles.goldHighlight}`}>
                PLTR ±11.2%
              </span>
            </div>

            <div className={styles.cardFooterRow}>
              <span className={styles.summarySubtext}>Options move</span>
              <div className={`${styles.badgePill} ${styles.goldBadge}`}>
                <span>⚡</span> High Vol
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className={styles.summaryCard}>
            <div className={styles.cardStatHeader}>
              <div className={styles.summaryHeaderLeft}>
                <span className={styles.summaryIcon}>⭐</span>
                <span className={styles.summaryLabel}>WATCHLIST MATCHES</span>
              </div>
              <span className={styles.moreDots}>•••</span>
            </div>

            <div className={styles.insetMainBox}>
              <span className={`${styles.summaryValue} ${styles.greenHighlight}`}>
                {reports.filter((r) => r.isWatching).length} Companies
              </span>
            </div>

            <div className={styles.cardFooterRow}>
              <span className={styles.summarySubtext}>Saved in alerts</span>
              <div className={`${styles.badgePill} ${styles.greenBadge}`}>
                <span>★</span> Watchlist
              </div>
            </div>
          </div>
        </div>

        {/* DEDICATED DATE, MONTH & YEAR FILTER BAR */}
        <div className={styles.dateFilterSection}>
          <div className={styles.dateFilterTitleRow}>
            <span className={styles.dateFilterLabel}>
              📅 DATE, MONTH &amp; YEAR FILTER
            </span>
            {isDateFiltered && (
              <button className={styles.resetDateLink} onClick={resetDateFilters}>
                Clear Date Filter ✕
              </button>
            )}
          </div>

          <div className={styles.dateControlsRow}>
            {/* 1. Day Selector Dropdown */}
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Day</label>
              <select
                className={styles.dateSelect}
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
              >
                <option value="All days">All Days (1–31)</option>
                {daysList.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Month Selector Dropdown */}
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Month</label>
              <select
                className={styles.dateSelect}
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {monthsList.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Year Selector Dropdown */}
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Year</label>
              <select
                className={styles.dateSelect}
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="All years">All Years</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2027">2027</option>
              </select>
            </div>

            {/* 4. Native Date Picker Input */}
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Pick Specific Date</label>
              <input
                type="date"
                className={styles.nativeDatePicker}
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
              />
            </div>

            {/* 5. Quick Date Presets */}
            <div className={styles.fieldGroup} style={{ flex: 1 }}>
              <label className={styles.fieldLabel}>Quick Presets</label>
              <div className={styles.presetChipsGroup}>
                <button
                  className={`${styles.presetChip} ${
                    selectedMonth === "07" && selectedYear === "2026" ? styles.activePreset : ""
                  }`}
                  onClick={() => {
                    setSelectedYear("2026");
                    setSelectedMonth("07");
                    setSelectedDay("All days");
                    setCustomDate("");
                  }}
                >
                  Jul 2026
                </button>

                <button
                  className={`${styles.presetChip} ${
                    selectedMonth === "08" && selectedYear === "2026" ? styles.activePreset : ""
                  }`}
                  onClick={() => {
                    setSelectedYear("2026");
                    setSelectedMonth("08");
                    setSelectedDay("All days");
                    setCustomDate("");
                  }}
                >
                  Aug 2026
                </button>

                <button
                  className={`${styles.presetChip} ${
                    customDate === "2026-07-30" ? styles.activePreset : ""
                  }`}
                  onClick={() => {
                    setCustomDate("2026-07-30");
                  }}
                >
                  Jul 30, 2026
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Filter Toolbar (Search, Session, Sector, Toggles) */}
        <div className={styles.filterToolbar}>
          {/* Search Box */}
          <div className={styles.searchWrap}>
            <svg width={15} height={15} viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="4.5" stroke="var(--text-tertiary)" strokeWidth="1.4" />
              <path d="M10.5 10.5L14 14" stroke="var(--text-tertiary)" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search ticker or company (e.g. AAPL, Meta)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className={styles.clearSearchBtn} onClick={() => setSearchQuery("")}>
                ✕
              </button>
            )}
          </div>

          {/* Session Dropdown */}
          <select
            className={styles.selectFilter}
            value={sessionFilter}
            onChange={(e) => setSessionFilter(e.target.value)}
          >
            <option value="All sessions">All Sessions (AH &amp; PRE)</option>
            <option value="Pre-Market">☀️ Pre-Market (BMO)</option>
            <option value="After-Hours">🌙 After-Hours (AMC)</option>
          </select>

          {/* Sector Dropdown */}
          <select
            className={styles.selectFilter}
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
          >
            <option value="All sectors">All Sectors</option>
            <option value="Technology">Technology</option>
            <option value="Consumer">Consumer</option>
            <option value="Energy">Energy</option>
            <option value="Crypto">Crypto</option>
          </select>

          {/* Toggle Switches */}
          <div className={styles.switchGroup}>
            <button
              className={`${styles.filterPillBtn} ${watchlistOnly ? styles.activeFilterPill : ""}`}
              onClick={() => setWatchlistOnly(!watchlistOnly)}
            >
              ★ Watchlist Only
            </button>

            <button
              className={`${styles.filterPillBtn} ${highImpliedMove ? styles.activeFilterPill : ""}`}
              onClick={() => setHighImpliedMove(!highImpliedMove)}
            >
              ⚡ High Move (±6%+)
            </button>
          </div>
        </div>

        {/* View Mode 1: MONTH CALENDAR GRID */}
        {viewMode === "calendar" && (
          <div className={styles.calendarGridContainer}>
            <div className={styles.calendarMonthHeader}>
              <span className={styles.monthTitle}>
                📅 {selectedMonth === "All months" ? "July" : monthsList.find(m => m.value === selectedMonth)?.label.split(" ")[0]} {selectedYear === "All years" ? "2026" : selectedYear} Schedule
              </span>
              <span className={styles.monthHint}>Click any day cell to filter events</span>
            </div>

            {/* Weekdays Bar */}
            <div className={styles.weekdaysBar}>
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className={styles.weekdayName}>
                  {day}
                </div>
              ))}
            </div>

            {/* Days Matrix */}
            <div className={styles.daysMatrix}>
              {calendarDays.map((cell, idx) => {
                if (cell.isBlank) {
                  return <div key={`blank-${idx}`} className={`${styles.dayCell} ${styles.blankCell}`} />;
                }

                const isSelected = gridSelectedDate === cell.dateKey;
                const hasEvents = cell.dayReports && cell.dayReports.length > 0;

                return (
                  <div
                    key={cell.dateKey}
                    className={`${styles.dayCell} ${hasEvents ? styles.hasEventsCell : ""} ${
                      isSelected ? styles.selectedCell : ""
                    }`}
                    onClick={() => {
                      if (hasEvents) {
                        setGridSelectedDate(isSelected ? null : cell.dateKey);
                      }
                    }}
                  >
                    <div className={styles.dayCellNumberRow}>
                      <span className={styles.dayNumber}>{cell.dayNum}</span>
                      {hasEvents && (
                        <span className={styles.eventCountBadge}>
                          {cell.dayReports.length}
                        </span>
                      )}
                    </div>

                    {/* Ticker Badges inside day cell */}
                    <div className={styles.tickerChipsList}>
                      {cell.dayReports?.map((r) => (
                        <div
                          key={r.id}
                          className={`${styles.tickerChip} ${
                            r.session === "AH" ? styles.chipAH : styles.chipPRE
                          }`}
                        >
                          <span className={styles.chipText}>{r.ticker}</span>
                          <span className={styles.chipMove}>{r.impliedMove}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* View Mode 2: AGENDA / TIMELINE LIST */}
        <div className={styles.dateGroupsContainer}>
          {groupedReports.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>🔍</span>
              <h4>No earnings reports match your active date/time filters</h4>
              <p>Try clearing your Date, Month or Year filter selections.</p>
              <button
                className={styles.resetFiltersBtn}
                onClick={() => {
                  resetDateFilters();
                  setSearchQuery("");
                  setSessionFilter("All sessions");
                  setSectorFilter("All sectors");
                  setWatchlistOnly(false);
                  setHighImpliedMove(false);
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            groupedReports.map((group) => (
              <div key={group.dateKey} className={styles.dateGroupSection}>
                {/* Date Header Ribbon */}
                <div className={styles.dateHeaderRow}>
                  <div className={styles.dateHeaderLeft}>
                    <div className={styles.calendarDaySquare}>
                      <span className={styles.squareDayName}>
                        {new Date(group.dateKey + "T00:00:00").toLocaleDateString("en-US", {
                          weekday: "short",
                        })}
                      </span>
                      <span className={styles.squareDayNum}>
                        {group.dateKey.split("-")[2]}
                      </span>
                    </div>
                    <span className={styles.dateTitle}>{group.dateLabel}</span>
                  </div>

                  <span className={styles.reportsCountText}>{group.countLabel}</span>
                </div>

                {/* 3 Cards Grid per Date */}
                <div className={styles.reportsGrid}>
                  {group.reports.map((item) => (
                    <div key={item.id} className={styles.reportCard}>
                      {/* Top Row: Ticker Avatar, Name, Star, Date, Session Badge */}
                      <div className={styles.cardHeader}>
                        <div className={styles.cardHeaderLeft}>
                          <div
                            className={styles.tickerAvatar}
                            style={{ backgroundColor: item.avatarBg, position: 'relative', overflow: 'hidden' }}
                          >
                            <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {item.ticker}
                            </span>
                            <img
                              src={['NVDA', 'MSFT', 'TSLA', 'AAPL', 'AMD'].includes(item.ticker) ? `https://icons.duckduckgo.com/ip3/${({ NVDA: 'nvidia.com', MSFT: 'microsoft.com', TSLA: 'tesla.com', AAPL: 'apple.com', AMD: 'amd.com' } as Record<string, string>)[item.ticker]}.ico` : `https://assets.coincap.io/assets/icons/${item.ticker.toLowerCase()}@2x.png`}
                              alt={item.ticker}
                              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', padding: '4px', borderRadius: '50%', backgroundColor: 'inherit' }}
                              onError={(e) => {
                                const img = e.currentTarget;
                                if (img.src.includes('coincap.io')) {
                                  img.src = `https://cryptologos.cc/logos/${item.companyName.toLowerCase().split(' ')[0]}-${item.ticker.toLowerCase()}-logo.svg?v=032`;
                                } else {
                                  img.style.display = 'none';
                                }
                              }}
                            />
                          </div>
                          <div className={styles.tickerMeta}>
                            <div className={styles.tickerTitleRow}>
                              <span className={styles.tickerText}>{item.ticker}</span>
                              {item.hasStar && <span className={styles.yellowStar}>★</span>}
                            </div>
                            <span className={styles.companyNameText}>{item.companyName}</span>
                          </div>
                        </div>

                        <div className={styles.cardHeaderRight}>
                          <span
                            className={`${styles.sessionBadge} ${
                              item.session === "AH" ? styles.ahBadge : styles.preBadge
                            }`}
                          >
                            {item.session === "AH" ? "🌙 AMC" : "☀️ BMO"}
                          </span>
                        </div>
                      </div>

                      {/* Stats Grid: EPS, Revenue, Implied Move, Market Cap */}
                      <div className={styles.statsGrid}>
                        <div className={styles.statBox}>
                          <span className={styles.statLabel}>EPS Est.</span>
                          <span className={styles.statValue}>{item.epsEst}</span>
                        </div>

                        <div className={styles.statBox}>
                          <span className={styles.statLabel}>Rev Est.</span>
                          <span className={styles.statValue}>{item.revEst}</span>
                        </div>

                        <div className={styles.statBox}>
                          <span className={styles.statLabel}>Impl. Move</span>
                          <span
                            className={`${styles.statValue} ${
                              item.highlightMove ? styles.moveHighlight : ""
                            }`}
                          >
                            {item.impliedMove}
                          </span>
                        </div>

                        <div className={styles.statBox}>
                          <span className={styles.statLabel}>Mkt Cap</span>
                          <span className={styles.statValue}>{item.mktCap}</span>
                        </div>
                      </div>

                      {/* Action Buttons Row */}
                      <div className={styles.actionsRow}>
                        <button
                          className={`${styles.watchBtn} ${
                            item.isWatching ? styles.watchingActive : ""
                          }`}
                          onClick={() => toggleWatch(item.id)}
                        >
                          {item.isWatching ? "★ Watching" : "☆ Watch"}
                        </button>

                        <button className={styles.alertBtn}>
                          <svg width={14} height={14} viewBox="0 0 16 16" fill="none" aria-hidden>
                            <path
                              d="M8 2a4 4 0 0 0-4 4v3.5l-1 1.5h10l-1-1.5V6a4 4 0 0 0-4-4zM6.5 13a1.5 1.5 0 0 0 3 0"
                              stroke="currentColor"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                            />
                          </svg>
                          Alert
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
