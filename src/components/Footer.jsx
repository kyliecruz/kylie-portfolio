import { FONT_HEAD, FONT_BODY, FONT_MONO } from "../themes";

export default function Footer({ c, setPage, isDark }) {
  return (
    <footer style={{ background: c.bgAlt, borderTop: `1px solid ${c.border}`, padding: "52px 32px 32px", position: "relative" }}>
      <div className="footer-row" style={{ maxWidth: 920, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 40, flexWrap: "wrap", marginBottom: 32 }}>
        {/* Left: name + contact */}
        <div>
          <div style={{ fontFamily: FONT_HEAD, fontSize: 22, fontWeight: 700, color: c.text, marginBottom: 5 }}>Kylie Cruz</div>
          <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: c.muted, marginBottom: 18 }}>CS Student · AI Safety · Waterloo, ON</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { icon: isDark ? "📧" : "🐚", label: "kkylie.cruz@gmail.com",       href: "mailto:kkylie.cruz@gmail.com" },
              { icon: isDark ? "🔗" : "🌊", label: "linkedin.com/in/kylie-cruz",  href: "https://linkedin.com/in/kylie-cruz" },
              { icon: isDark ? "⭐" : "🦀", label: "github.com/kyliecruz",        href: "https://github.com/kyliecruz" },
            ].map(({ icon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: FONT_BODY, fontSize: 13, color: c.muted, display: "flex", alignItems: "center", gap: 7, transition: "color 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.color = c.accent}
                onMouseLeave={e => e.currentTarget.style.color = c.muted}>
                {icon} {label}
              </a>
            ))}
          </div>
        </div>

        {/* Right: page + link columns */}
        <div style={{ display: "flex", gap: 52 }}>
          <div>
            <div style={{ fontFamily: FONT_BODY, fontSize: 11, fontWeight: 700, color: c.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Pages</div>
            {[["home","Home"],["about","About"],["projects","Projects"],["waia","WAIA"],["blog","Blog"]].map(([id, label]) => (
              <div key={id} style={{ marginBottom: 10 }}>
                <button onClick={() => setPage(id)} style={{ background: "none", border: "none", fontFamily: FONT_BODY, fontSize: 13, color: c.muted, padding: 0, transition: "color 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.color = c.text}
                  onMouseLeave={e => e.currentTarget.style.color = c.muted}>{label}</button>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: FONT_BODY, fontSize: 11, fontWeight: 700, color: c.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Links</div>
            {[
              ["https://github.com/kyliecruz", "GitHub"],
              ["https://linkedin.com/in/kylie-cruz", "LinkedIn"],
              ["https://v0-waterloo-ai-association.vercel.app/", "WAIA Site"],
            ].map(([href, label]) => (
              <div key={label} style={{ marginBottom: 10 }}>
                <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: FONT_BODY, fontSize: 13, color: c.muted, textDecoration: "none", transition: "color 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.color = c.accent}
                  onMouseLeave={e => e.currentTarget.style.color = c.muted}>{label} ↗</a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ maxWidth: 920, margin: "0 auto", paddingTop: 22, borderTop: `1px solid ${c.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <span style={{ fontFamily: FONT_BODY, fontSize: 12, color: c.muted }}>© 2026 · Kylie Cruz</span>
        <span style={{ fontFamily: FONT_BODY, fontSize: 12, color: c.muted }}>{isDark ? "🌌 Space Mode" : "🏖️ Beach Mode"}</span>
      </div>
    </footer>
  );
}
