import { FONT_HEAD, FONT_BODY, FONT_MONO } from "../themes";
import { Reveal, PageHeader } from "../components/Shared";

export default function About({ c, isDark }) {
  return (
    <div>
      <PageHeader label={isDark ? "// about" : "~ about"} title="About Me" c={c} isDark={isDark} />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "68px 32px" }}>
        {/* ── Bio + photo ── */}
        <div className="about-row" style={{ display: "flex", gap: 48, marginBottom: 72, alignItems: "flex-start" }}>
          <Reveal style={{ flexShrink: 0 }}>
            <img src="/kylie-headshot.jpeg" alt="Kylie Cruz"
              style={{ width: 196, height: 196, borderRadius: 20, objectFit: "cover", border: `3px solid ${c.border}`, display: "block", marginBottom: 14, boxShadow: isDark ? `0 0 32px ${c.accent}30` : "0 8px 32px rgba(0,0,0,0.10)" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "GitHub",   href: "https://github.com/kyliecruz" },
                { label: "LinkedIn", href: "https://linkedin.com/in/kylie-cruz" },
                { label: "Email",    href: "mailto:kkylie.cruz@gmail.com" },
              ].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ textAlign: "center", padding: "8px 12px", borderRadius: 10, background: c.bgAlt, border: `1px solid ${c.border}`, fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600, color: c.muted, transition: "color 0.15s, border-color 0.15s" }}
                  onMouseEnter={e => { e.currentTarget.style.color = c.accent; e.currentTarget.style.borderColor = c.accent; }}
                  onMouseLeave={e => { e.currentTarget.style.color = c.muted; e.currentTarget.style.borderColor = c.border; }}>
                  {label} ↗
                </a>
              ))}
            </div>
          </Reveal>
          <div style={{ flex: 1 }}>
            <Reveal delay={0.1}>
              <h2 style={{ fontFamily: FONT_HEAD, fontSize: 30, color: c.text, marginBottom: 14 }}>Hi, I'm Kylie {isDark ? "🚀" : "👋"}</h2>
              <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: c.muted, lineHeight: 1.82, marginBottom: 20 }}>
                I'm a Computer Science (Honours) student at Wilfrid Laurier University focused on AI safety, machine learning, and security-minded engineering. I started working toward an AI safety career in December 2025, and I'm particularly interested in building reliable systems and understanding how technical decisions shape real-world risk.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["BSc CS @ Laurier", "WAIA Founder", "EAG SF 2026 Volunteer", "AI Safety (Dec 2025 →)"].map(tag => (
                  <span key={tag} className="pill" style={{ background: c.accentLight, color: c.accent, border: `1px solid ${c.accentBorder}`, fontFamily: FONT_BODY }}>{tag}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── Cards ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18, marginBottom: 72 }}>
          {[
            { icon: isDark ? "🔭" : "🧠", title: "Technical Interests",   text: "AI safety engineering, evaluation & testing, reliability, and security-minded ML. Practical, measurable work grounded in real-world failure modes." },
            { icon: isDark ? "🌌" : "🌊", title: "Community & Leadership", text: "Founded WAIA to build a Waterloo-region hub for AI safety and governance. Focused on making it easy for beginners to get started." },
            { icon: isDark ? "⚗️" : "🔬", title: "Experience",            text: "ML data + research support (internship at AMX Research Lab), student leadership, and hands-on operations work at PhysioSage Rehab." },
            { icon: isDark ? "🛸" : "🧭", title: "Building Toward",       text: "Long-term: red-team/security + safety engineering roles. Short-term: stronger fundamentals, better projects, and exposure to evaluation & governance tradeoffs." },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="card-lift" style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 16, padding: "26px", height: "100%", boxShadow: isDark ? `0 4px 20px ${c.shadow}` : "none" }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{item.icon}</div>
                <h3 style={{ fontFamily: FONT_HEAD, fontSize: 18, color: c.text, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: c.muted, lineHeight: 1.7 }}>{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Timeline ── */}
        <Reveal>
          <h2 style={{ fontFamily: FONT_HEAD, fontSize: 30, color: c.text, marginBottom: 34 }}>
            {isDark ? "Mission Log" : "Timeline"}
          </h2>
        </Reveal>
        {[
          { date: "Apr 2029", label: "Expected graduation — BSc CS (Hons)", note: "Wilfrid Laurier University" },
          { date: "Feb 2026", label: "Volunteered at EA Global San Francisco", note: "EAG SF 2026" },
          { date: "Jan 2026", label: "Founded Waterloo AI Association (WAIA)", note: "Founder & President" },
          { date: "Dec 2025", label: "Started focused AI safety career-building", note: "Current direction" },
        ].map((item, i, arr) => (
          <Reveal key={i} delay={i * 0.1}>
            <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
              <div style={{ textAlign: "right", minWidth: 80, paddingTop: 3, flexShrink: 0 }}>
                <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: c.accent, fontWeight: 500 }}>{item.date}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: c.accent, marginTop: 3, flexShrink: 0, boxShadow: isDark ? `0 0 10px ${c.accent}` : "none" }} />
                {i < arr.length - 1 && <div style={{ width: 1.5, flex: 1, background: c.border, minHeight: 36, margin: "4px 0" }} />}
              </div>
              <div style={{ flex: 1, paddingBottom: 28 }}>
                <div style={{ fontFamily: FONT_BODY, fontSize: 15, color: c.text, fontWeight: 500, marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: c.muted }}>{item.note}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
