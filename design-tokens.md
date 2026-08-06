# Design Tokens — Stocks & Crypto Trading Platform

Source: dark-UI dashboard references (nav, dropdown menus, kanban board, sidebar) + two supplied palettes (neutral: Vampire Black / Chinese Black / Jet Stream / Platinum; green: Emerald Green / Deep Emerald / Mint Green / Soft Mint / Rich Black). Extended into a full token set with semantic gain/loss colors, typography, spacing, radius, elevation, and component tokens for both dark and light mode.

**Palette direction: monochrome, no color brand.** Brand identity is carried entirely by the neutral grayscale and Geist typography — there is no "brand blue/purple/etc." Emerald green and red are the *only* saturated colors anywhere in the system, and they're reserved exclusively for market-data semantics (gain/loss, price up/down) and the Buy/Sell transaction actions. Everything else — navigation, buttons, tags, status, categorization — is built from the neutral scale, differentiated by weight/contrast/typography rather than hue.

---

## 1. Color Tokens

### 1.1 Neutral Scale

Greyscale range and lightness steps taken from the supplied Vampire Black → Platinum swatches, but fully desaturated to true neutral gray (0% saturation, R=G=B) — the source swatches carried a faint green/teal cast (~8–36% saturation) that read as an unintended hue once the system went monochrome. Used for backgrounds, surfaces, borders, and text.

| Token | Hex | Notes |
|---|---|---|
| `neutral-950` | `#080808` | From Vampire Black, desaturated — app background (dark) |
| `neutral-900` | `#0E0E0E` | Base surface |
| `neutral-850` | `#161616` | From Chinese Black, desaturated — elevated surface / card |
| `neutral-800` | `#1C1C1C` | Raised card / popover |
| `neutral-700` | `#292929` | Border, divider (strong) |
| `neutral-600` | `#3C3C3C` | Border, divider (default) |
| `neutral-500` | `#535353` | Disabled text / icon |
| `neutral-400` | `#787878` | Muted text / placeholder (nudged +2% from pure interpolation to clear 4.5:1 on `bg-app` dark) |
| `neutral-300` | `#9A9A9A` | Secondary text (dark mode) |
| `neutral-200` | `#C2C2C2` | From Jet Stream, desaturated — secondary text / icon (light mode) |
| `neutral-100` | `#E4E4E4` | From Platinum, desaturated — primary text (dark mode) / surface (light mode) |
| `neutral-50` | `#F4F4F4` | App background (light mode) |
| `neutral-0` | `#FFFFFF` | Pure white |

### 1.2 Gain Scale — Emerald (market data + Buy actions only)

Not a brand color. Reserved for positive price movement, gains, success confirmations, and the Buy CTA.

| Token | Hex | Notes |
|---|---|---|
| `emerald-950` | `#072F1B` | — |
| `emerald-900` | `#0B4A2A` | — |
| `emerald-800` | `#11663A` | — |
| `emerald-700` | `#17864A` | — |
| `emerald-600` | `#1FA65A` | Deep Emerald — light-mode base / dark-mode hover |
| `emerald-500` | `#2FCB73` | Emerald Green — dark-mode base (gain, Buy) |
| `emerald-400` | `#56D68F` | — |
| `emerald-300` | `#8FE8B8` | Mint Green — subtle accent / chart fill |
| `emerald-200` | `#B3EFCE` | — |
| `emerald-100` | `#DDF8E9` | Soft Mint — tinted background |
| `emerald-50` | `#E9FBF1` | Lightest tint |

### 1.3 Loss Scale — Red (market data + Sell/destructive actions only)

No red was supplied in source material; added to complete gain/loss semantics required for trading UI. Reserved for negative price movement, losses, destructive actions, and the Sell CTA.

| Token | Hex | Notes |
|---|---|---|
| `red-950` | `#2E0A0A` | — |
| `red-900` | `#521212` | — |
| `red-800` | `#781B1B` | — |
| `red-700` | `#9E2424` | — |
| `red-600` | `#C42E2E` | Base — used for both modes (see §12 contrast note) |
| `red-500` | `#E13B3B` | Text/icon use only, not solid button fills (contrast) |
| `red-400` | `#EA5E5E` | Dark-mode caution text |
| `red-300` | `#EF8686` | — |
| `red-200` | `#F5AFAF` | — |
| `red-100` | `#FBD8D8` | Tinted background |
| `red-50` | `#FDECEC` | Lightest tint |

### 1.4 Caution Tier

Non-critical warnings (e.g. high volatility, approaching margin limit) stay within the red family rather than introducing a third hue — this keeps emerald + red as the only saturated colors in the entire system.

| Token | Dark mode | Light mode | Use |
|---|---|---|---|
| `color-caution-text` | `red-400` | `red-600` | Caution label/icon text |
| `color-caution-bg` | `red-500 @ 10% opacity` | `red-500 @ 8% opacity` | Caution chip/banner background |
| `color-caution-border` | `red-500 @ 30% opacity` | `red-500 @ 25% opacity` | Caution chip/banner border |

### 1.5 Informational Tier — Neutral (no hue)

Informational messaging carries no color at all — it's distinguished by an info icon plus neutral surface, not a blue accent.

| Token | Dark mode | Light mode |
|---|---|---|
| `color-info-text` | `neutral-100` | `neutral-950` |
| `color-info-bg` | `neutral-800` | `neutral-100` |
| `color-info-border` | `border-color-strong` | `border-color-strong` |

### 1.6 Semantic Aliases

| Token | Dark mode value | Light mode value |
|---|---|---|
| `color-success` | `emerald-500` | `emerald-600` |
| `color-danger` | `red-600` | `red-600` |
| `color-price-up` | `emerald-500` | `emerald-600` |
| `color-price-down` | `red-500` (text) | `red-600` (text) |
| `color-price-neutral` | `neutral-400` | `neutral-500` |
| `color-chart-bullish` | `emerald-500` | `emerald-500` |
| `color-chart-bearish` | `red-500` | `red-500` |
| `color-chart-bullish-fill` | `emerald-500 @ 12% opacity` | `emerald-500 @ 10% opacity` |
| `color-chart-bearish-fill` | `red-500 @ 12% opacity` | `red-500 @ 10% opacity` |

### 1.7 Surface & Text Tokens by Mode

**Dark mode**

| Token | Value |
|---|---|
| `bg-app` | `neutral-950` (`#080808`) |
| `bg-surface` | `neutral-900` (`#0E0E0E`) |
| `bg-surface-raised` | `neutral-850` (`#161616`) |
| `bg-surface-overlay` | `neutral-800` (`#1C1C1C`) |
| `border-default` | `neutral-700` at 60% opacity |
| `border-subtle` | `neutral-800` |
| `text-primary` | `neutral-100` (`#E4E4E4`) |
| `text-secondary` | `neutral-200` (`#C2C2C2`) |
| `text-tertiary` | `neutral-400` |
| `text-disabled` | `neutral-600` |
| `text-on-inverse` | `neutral-950` |
| `text-link` | `neutral-100`, underlined (no color brand — links are typographic, not hued) |

**Light mode**

| Token | Value |
|---|---|
| `bg-app` | `neutral-50` (`#F4F4F4`) |
| `bg-surface` | `neutral-0` (`#FFFFFF`) |
| `bg-surface-raised` | `neutral-0` with shadow |
| `bg-surface-overlay` | `neutral-100` (`#E4E4E4`) |
| `border-default` | `neutral-200` |
| `border-subtle` | `neutral-100` |
| `text-primary` | `neutral-950` (`#080808`) |
| `text-secondary` | `neutral-700` |
| `text-tertiary` | `neutral-500` |
| `text-disabled` | `neutral-300` |
| `text-on-inverse` | `neutral-0` |
| `text-link` | `neutral-950`, underlined |

---

## 2. Typography

Primary UI typeface: **Geist** (matches the geometric grotesque style seen across reference navs/sidebars). Tabular/numeric data (prices, balances, percentages) uses a monospaced face for digit alignment: **Geist Mono** (or `JetBrains Mono` fallback).

| Token | Font | Weight | Use |
|---|---|---|---|
| `font-family-base` | Geist, system-ui, sans-serif | — | UI text |
| `font-family-mono` | "Geist Mono", "JetBrains Mono", monospace | — | Prices, tickers, tabular numbers, addresses |

### 2.1 Type Scale

| Token | Size / Line-height | Weight | Use |
|---|---|---|---|
| `text-display` | 40px / 48px | 700 | Hero / landing stat |
| `text-h1` | 32px / 40px | 700 | Page title |
| `text-h2` | 24px / 32px | 600 | Section title |
| `text-h3` | 20px / 28px | 600 | Card title |
| `text-h4` | 16px / 24px | 600 | Subsection title |
| `text-body-lg` | 16px / 24px | 400 | Primary body text |
| `text-body-md` | 14px / 20px | 400 | Default UI text |
| `text-body-sm` | 13px / 18px | 400 | Secondary/meta text |
| `text-caption` | 12px / 16px | 400 | Captions, timestamps |
| `text-overline` | 11px / 16px | 600, uppercase, 0.04em tracking | Eyebrow / section labels (e.g. "WORKFLOWS") |
| `text-price-lg` | 28px / 34px | 600, mono | Ticker/quote hero price |
| `text-price-md` | 16px / 22px | 500, mono | Inline/table price |
| `text-price-sm` | 13px / 18px | 500, mono | Compact table price, % change |

---

## 3. Spacing

4px base grid.

| Token | Value |
|---|---|
| `space-0` | 0px |
| `space-1` | 2px |
| `space-2` | 4px |
| `space-3` | 6px |
| `space-4` | 8px |
| `space-5` | 10px |
| `space-6` | 12px |
| `space-8` | 16px |
| `space-10` | 20px |
| `space-12` | 24px |
| `space-16` | 32px |
| `space-20` | 40px |
| `space-24` | 48px |
| `space-32` | 64px |
| `space-40` | 80px |

---

## 4. Radius

| Token | Value | Use |
|---|---|---|
| `radius-sm` | 4px | Tags, chips, checkboxes |
| `radius-md` | 8px | Buttons, inputs |
| `radius-lg` | 12px | Cards, kanban cards |
| `radius-xl` | 16px | Dropdown/menu panels, modals |
| `radius-2xl` | 20px | Large surfaces, sheets |
| `radius-full` | 9999px | Avatars, pills, badges |

---

## 5. Elevation / Shadow

Dark-mode shadows use deep, low-opacity black; light-mode shadows are softer.

| Token | Dark mode | Light mode |
|---|---|---|
| `shadow-none` | none | none |
| `shadow-xs` | `0 1px 2px rgba(0,0,0,0.40)` | `0 1px 2px rgba(8,8,8,0.06)` |
| `shadow-sm` | `0 2px 4px rgba(0,0,0,0.45)` | `0 2px 4px rgba(8,8,8,0.08)` |
| `shadow-md` | `0 4px 12px rgba(0,0,0,0.50)` | `0 4px 12px rgba(8,8,8,0.10)` |
| `shadow-lg` | `0 8px 24px rgba(0,0,0,0.55)` | `0 8px 24px rgba(8,8,8,0.12)` |
| `shadow-xl` | `0 16px 40px rgba(0,0,0,0.60)` | `0 16px 40px rgba(8,8,8,0.14)` |
| `shadow-focus-ring` | `0 0 0 3px rgba(228,228,228,0.35)` | `0 0 0 3px rgba(8,8,8,0.30)` |

---

## 6. Borders

| Token | Value |
|---|---|
| `border-width-hairline` | 1px |
| `border-width-default` | 1px |
| `border-width-thick` | 2px |
| `border-color-default` (dark) | `rgba(228,228,228,0.10)` |
| `border-color-default` (light) | `rgba(8,8,8,0.10)` |
| `border-color-strong` (dark) | `rgba(228,228,228,0.18)` |
| `border-color-strong` (light) | `rgba(8,8,8,0.18)` |
| `border-color-emphasis` | `neutral-100` (dark) / `neutral-950` (light) — used for focus/active outlines, not a brand color |
| `border-color-danger` | `red-500` |

---

## 7. Motion

| Token | Value |
|---|---|
| `duration-instant` | 100ms |
| `duration-fast` | 150ms |
| `duration-base` | 200ms |
| `duration-slow` | 300ms |
| `duration-price-flash` | 400ms (background flash on tick update) |
| `easing-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `easing-decelerate` | `cubic-bezier(0, 0, 0.2, 1)` |
| `easing-accelerate` | `cubic-bezier(0.4, 0, 1, 1)` |

---

## 8. Breakpoints & Layout

| Token | Value |
|---|---|
| `breakpoint-sm` | 640px |
| `breakpoint-md` | 768px |
| `breakpoint-lg` | 1024px |
| `breakpoint-xl` | 1280px |
| `breakpoint-2xl` | 1536px |
| `layout-sidebar-width` | 260px |
| `layout-sidebar-collapsed-width` | 72px |
| `layout-content-max-width` | 1440px |
| `layout-header-height` | 64px |

---

## 9. Z-Index

| Token | Value |
|---|---|
| `z-base` | 0 |
| `z-dropdown` | 100 |
| `z-sticky` | 200 |
| `z-header` | 300 |
| `z-sidebar` | 300 |
| `z-overlay` | 400 |
| `z-modal` | 500 |
| `z-toast` | 600 |
| `z-tooltip` | 700 |

---

## 10. Opacity

| Token | Value | Use |
|---|---|---|
| `opacity-disabled` | 0.40 | Disabled controls |
| `opacity-hover-overlay` | 0.06 | Hover state wash |
| `opacity-pressed-overlay` | 0.10 | Active/pressed state wash |
| `opacity-scrim` | 0.60 | Modal/overlay backdrop |

---

## 11. Component Tokens

### 11.1 Buttons

`button-primary` is the monochrome, high-contrast "inverse" style used for all general actions (Save, Continue, Submit, etc.) — this is what carries brand identity, not a color. `button-buy` / `button-sell` are the only buttons in the system that use a hue, reserved specifically for trade actions so they read instantly against an otherwise grayscale UI.

| Token | Dark mode | Light mode |
|---|---|---|
| `button-primary-bg` | `neutral-100` | `neutral-950` |
| `button-primary-bg-hover` | `neutral-0` | `neutral-800` |
| `button-primary-text` | `neutral-950` | `neutral-0` |
| `button-secondary-bg` | `neutral-800` | `neutral-100` |
| `button-secondary-bg-hover` | `neutral-700` | `neutral-200` |
| `button-secondary-text` | `neutral-100` | `neutral-950` |
| `button-secondary-border` | `border-color-default` | `border-color-default` |
| `button-ghost-bg` | transparent | transparent |
| `button-ghost-bg-hover` | `neutral-800` | `neutral-100` |
| `button-danger-bg` | `red-600` | `red-600` |
| `button-danger-bg-hover` | `red-700` | `red-700` |
| `button-danger-text` | `neutral-0` | `neutral-0` |
| `button-buy-bg` | `emerald-500` | `emerald-600` |
| `button-buy-bg-hover` | `emerald-600` | `emerald-700` |
| `button-buy-text` | `neutral-950` | `neutral-950` |
| `button-sell-bg` | `red-600` | `red-600` |
| `button-sell-bg-hover` | `red-700` | `red-700` |
| `button-sell-text` | `neutral-0` | `neutral-0` |
| `button-height-sm` | 32px | — |
| `button-height-md` | 40px | — |
| `button-height-lg` | 48px | — |
| `button-radius` | `radius-md` | — |
| `button-padding-x` | `space-8` (16px) | — |

### 11.2 Inputs / Forms

| Token | Value |
|---|---|
| `input-bg` (dark) | `neutral-900` |
| `input-border` | `border-color-default` |
| `input-border-focus` | `border-color-emphasis` |
| `input-text` | `text-primary` |
| `input-placeholder` | `text-tertiary` |
| `input-height` | 40px |
| `input-radius` | `radius-md` |

### 11.3 Cards & Kanban

| Token | Value |
|---|---|
| `card-bg` (dark) | `neutral-850` |
| `card-border` | `border-color-default` |
| `card-radius` | `radius-lg` |
| `card-padding` | `space-12` (24px) |
| `card-shadow` | `shadow-sm` |

Kanban column left-bars are differentiated by neutral weight/shade, not hue — only the "Done" column borrows emerald, since completion reads as a positive-outcome signal consistent with the gain semantic used elsewhere.

| Token | Value |
|---|---|
| `kanban-column-accent-todo` | `neutral-600` |
| `kanban-column-accent-in-progress` | `neutral-400` |
| `kanban-column-accent-review` | `neutral-200` |
| `kanban-column-accent-done` | `emerald-500` |

### 11.4 Tags / Badges

Category tags (asset class, workflow labels, etc.) use neutral weight tiers instead of hue. `tag-gain` / `tag-loss` are reserved for market-specific labels (e.g. "Bullish", "Bearish", "+2.4%").

| Token | Background | Text |
|---|---|---|
| `tag-neutral-1` | `neutral-800` | `neutral-200` |
| `tag-neutral-2` | `neutral-700` | `neutral-100` |
| `tag-outline` | transparent, `neutral-600` border | `neutral-300` |
| `tag-gain` | `emerald-100 @ 15%` | `emerald-400` |
| `tag-loss` | `red-100 @ 15%` | `red-400` |
| `badge-radius` | `radius-full` | — |
| `badge-height` | 20px | — |

### 11.5 Navigation (top nav / sidebar)

| Token | Value |
|---|---|
| `nav-bg` | `bg-surface` |
| `nav-border` | `border-color-default` |
| `nav-item-text` | `text-secondary` |
| `nav-item-text-active` | `text-primary` |
| `nav-item-bg-active` | `neutral-800` |
| `nav-item-bg-hover` | `neutral-800 @ 60%` |
| `nav-item-radius` | `radius-md` |
| `sidebar-section-label` | `text-overline` token, `text-tertiary` color |

### 11.6 Dropdown / Menu Panel

| Token | Value |
|---|---|
| `menu-bg` | `neutral-900` |
| `menu-border` | `border-color-default` |
| `menu-radius` | `radius-xl` |
| `menu-shadow` | `shadow-lg` |
| `menu-item-radius` | `radius-md` |
| `menu-item-bg-hover` | `neutral-800` |

### 11.7 Data Table / Price List

| Token | Value |
|---|---|
| `table-row-bg` | transparent |
| `table-row-bg-hover` | `neutral-850` |
| `table-row-border` | `border-color-subtle` |
| `table-header-text` | `text-tertiary`, `text-overline` style |
| `table-cell-price-up-bg-flash` | `emerald-500 @ 15%`, decays over `duration-price-flash` |
| `table-cell-price-down-bg-flash` | `red-500 @ 15%`, decays over `duration-price-flash` |

### 11.8 Avatar / Presence

| Token | Value |
|---|---|
| `avatar-size-sm` | 24px |
| `avatar-size-md` | 32px |
| `avatar-size-lg` | 40px |
| `avatar-radius` | `radius-full` |
| `avatar-ring` | 2px `bg-surface` |

---

## 12. Usage Notes

- **No color brand.** Brand identity comes from the neutral grayscale contrast ramp and Geist typography, not a hue. `button-primary`, links, focus rings, and navigation are all built from the neutral scale.
- **Emerald and red are reserved exclusively for market data and trade actions**: price up/down, gain/loss, chart candles, and the Buy/Sell CTAs. They never appear in generic UI chrome, illustrations, or category tags — if a designer reaches for green or red anywhere else, that's a signal to use a neutral treatment instead.
- **Buy/Sell are the one deliberate exception** to the monochrome button system — because they're the highest-stakes, most-scanned actions on the platform, giving them the only saturated color in an otherwise grayscale UI makes them impossible to miss or misclick.
- Color should never be the sole signal for gain/loss — pair `color-price-up` / `color-price-down` with `+`/`−` prefixes and up/down caret icons for accessibility (WCAG SC 1.4.1).
- `red-500` is used for text/icons only (4.29:1 against white fails AA for solid-fill buttons); solid red fills use `red-600` (5.5:1+).
- `emerald-600` fails AA against white text (3.15:1); where emerald is a solid fill, pair it with `neutral-950` text, not white.
