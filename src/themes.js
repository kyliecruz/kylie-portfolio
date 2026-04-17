// ── Theme definitions ──────────────────────────────────────────────────────────
// The site has two themes: BEACH (light mode) and SPACE (dark mode).
// The active theme is selected in App.jsx based on the user's OS preference,
// and passed to every page/component as the `c` prop (colors) and `isDark` boolean.
//
// To change a color: edit the value here — it updates everywhere automatically.
// To add a new color token: add it to BOTH themes so every component can use it.
//
// Color key reference:
//   bg         — main page background
//   bgAlt      — slightly different background for section contrast (headers, footers)
//   bgDeep     — deeper/darker background (rarely used, available for emphasis)
//   card       — card/panel background
//   text       — primary readable text
//   muted      — secondary/dimmed text (descriptions, labels)
//   accent     — brand color: teal (beach) / purple (space). Used for highlights, links, pills
//   accentLight — very light tint of accent, used for pill backgrounds
//   accentBorder — semi-transparent accent for pill borders
//   coral      — warm secondary accent: peach (beach) / pink (space). Used for gradients, stripes
//   border     — subtle divider color for borders and lines
//   nav        — frosted-glass nav background (uses rgba for transparency + blur)
//   starColor  — transparent in beach mode (stars hidden); white in space mode
//   shadow     — drop shadow color for cards

export const BEACH = {
  id: "beach",
  bg: "#FAF4EE",
  bgAlt: "#EFE0D0",
  bgDeep: "#E8B2A4",
  card: "#FDF8F4",
  text: "#2C1E18",
  muted: "#8A7870",
  accent: "#74B8B0",       // teal
  accentLight: "#D0EBE8",
  accentBorder: "#74B8B040",
  coral: "#E69C8A",        // peach/coral
  border: "#E0D4C8",
  nav: "rgba(250,244,238,0.92)",
  starColor: "transparent",
  shadow: "rgba(44,24,16,0.07)",
};

export const SPACE = {
  id: "space",
  bg: "#060818",
  bgAlt: "#0D1230",
  bgDeep: "#111840",
  card: "#0E1535",
  text: "#E8EEFF",
  muted: "#8898CC",
  accent: "#A78BFA",       // purple
  accentLight: "#1E1540",
  accentBorder: "#A78BFA40",
  coral: "#F472B6",        // hot pink
  border: "#1E2A5A",
  nav: "rgba(6,8,24,0.92)",
  starColor: "#ffffff",
  shadow: "rgba(167,139,250,0.15)",
};

// ── Font families ──────────────────────────────────────────────────────────────
// Loaded via Google Fonts in src/hooks.js → useGlobalStyles()
// FONT_HEAD — Playfair Display (serif) → headings, titles, italic quotes
// FONT_BODY — DM Sans (sans-serif)     → body text, labels, buttons
// FONT_MONO — DM Mono (monospace)      → code-style labels, date chips, tags
export const FONT_HEAD = "'Playfair Display', Georgia, serif";
export const FONT_BODY = "'DM Sans', -apple-system, sans-serif";
export const FONT_MONO = "'DM Mono', monospace";
