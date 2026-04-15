import { useState } from "react";
import { FONT_HEAD, FONT_BODY } from "../themes";
import hibiscus from "../assets/hibiscus.png";

const PAGES = [["home","Home"],["about","About"],["projects","Projects"],["waia","WAIA"],["blog","Blog"]];

export default function Nav({ page, setPage, isDark, setIsDark, c }) {
  const isBeach = !isDark;
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = (id) => { setPage(id); setMenuOpen(false); };

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 200, background: c.nav, backdropFilter: "blur(18px)", borderBottom: `1px solid ${c.border}` }}>
      <div style={{ padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Brand */}
        <button onClick={() => navigate("home")} style={{ background: "none", border: "none", fontFamily: FONT_HEAD, fontSize: 20, fontWeight: 700, color: c.text, letterSpacing: "-0.3px", whiteSpace: "nowrap", flexShrink: 0, cursor: "pointer" }}>
          {isBeach ? <img src={hibiscus} alt="" style={{ width: 22, height: 22, verticalAlign: "middle", marginRight: 2 }} /> : "✦"} Kylie Cruz
        </button>

        {/* Desktop nav links */}
        <div className="nav-links-inner hide-mobile" style={{ display: "flex", gap: 22, alignItems: "center" }}>
          {PAGES.map(([id, label]) => (
            <button key={id} onClick={() => navigate(id)} className={`nav-lnk${page === id ? " active" : ""}`}
              style={{ fontSize: 14, color: c.text, fontWeight: page === id ? 600 : 400, opacity: page === id ? 1 : 0.55 }}>
              {label}
            </button>
          ))}
          <button onClick={() => setIsDark(!isDark)}
            style={{ background: c.bgAlt, border: `1px solid ${c.border}`, borderRadius: 10, padding: "6px 12px", fontSize: 15, color: c.text, transition: "all 0.2s", cursor: "pointer" }}
            title={isDark ? "Switch to Beach mode" : "Switch to Space mode"}>
            {isDark ? "🏖️" : "🌌"}
          </button>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }} className="show-mobile">
          <button onClick={() => setIsDark(!isDark)}
            style={{ background: c.bgAlt, border: `1px solid ${c.border}`, borderRadius: 10, padding: "6px 10px", fontSize: 15, color: c.text, cursor: "pointer" }}>
            {isDark ? "🏖️" : "🌌"}
          </button>
          <button onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu"
            style={{ background: "none", border: `1px solid ${c.border}`, borderRadius: 10, padding: "6px 10px", color: c.text, cursor: "pointer", fontSize: 18, lineHeight: 1 }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="show-mobile" style={{ flexDirection: "column", borderTop: `1px solid ${c.border}`, background: c.nav, backdropFilter: "blur(18px)", padding: "6px 16px 14px" }}>
          {PAGES.map(([id, label]) => (
            <button key={id} onClick={() => navigate(id)}
              style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", padding: "11px 12px", background: page === id ? c.accentLight : "none", border: "none", borderRadius: 10, fontFamily: FONT_BODY, fontSize: 15, color: page === id ? c.accent : c.text, fontWeight: page === id ? 600 : 400, cursor: "pointer", transition: "background 0.15s" }}>
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
