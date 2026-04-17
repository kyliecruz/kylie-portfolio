import { FONT_HEAD, FONT_BODY, FONT_MONO } from "../themes";
import { Reveal, Icon } from "../components/Shared";
import {
  imgTealDolphin, imgTealSeashell, imgTealTurtle, imgTealWave, imgTealHibiscus, imgTealSun, imgTealIsland,
  imgPurpleRocket, imgPurpleStar, imgPurpleUfo, imgPurpleShootingStar, imgPurpleSparkle, imgPurpleMoon, imgPurplePlanet,
  imgTealMoon,
  imgPurpleSun
} from "../assets";

export default function Waia({ c, isDark }) {
  return (
    <div>
      {/* ── Header ── */}
      <div style={{ background: c.bgAlt, padding: "68px 32px 56px", textAlign: "center", borderBottom: `1px solid ${c.border}`, position: "relative", overflow: "hidden" }}>
        {isDark && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, #2D1B6940 0%, transparent 60%)", pointerEvents: "none" }} />}
        <div style={{ position: "relative" }}>
          <Reveal>
            <img src="/waia-logo.png" alt="WAIA Logo"
              style={{ width: 80, height: 80, objectFit: "contain", marginBottom: 20, filter: isDark ? `drop-shadow(0 0 14px ${c.accent})` : "none" }}
              onError={e => { e.target.style.display = "none"; }} />
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
              {["AI Safety", "AI Governance", "Student Builders", "Waterloo Region"].map(t => (
                <span key={t} className="pill" style={{ background: c.accentLight, color: c.accent, border: `1px solid ${c.accentBorder}`, fontFamily: FONT_MONO, fontSize: 11 }}>{t}</span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 style={{ fontFamily: FONT_HEAD, fontSize: "clamp(30px,5vw,52px)", color: c.text, marginBottom: 14 }}>Waterloo AI Association</h1>
            <p style={{ fontFamily: FONT_BODY, fontSize: 16, color: c.muted, maxWidth: 480, margin: "0 auto 28px", lineHeight: 1.75 }}>
              A student-led community in the Waterloo region focused on AI safety & governance — beginner-friendly, seriously skills-focused.
            </p>
            <a href="https://v0-waterloo-ai-association.vercel.app/" target="_blank" rel="noopener noreferrer"
              className="btn-fill" style={{ background: c.accent, color: "#fff", boxShadow: isDark ? `0 0 24px ${c.accent}50` : "none" }}>
              Visit WAIA Website →
            </a>
          </Reveal>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "68px 32px" }}>
        {/* ── Mission + Approach ── */}
        <div style={{ display: "flex", gap: 20, marginBottom: 64, flexWrap: "wrap" }}>
          {[
            { iconBeach: imgTealHibiscus, iconDark: imgPurpleSparkle,   title: "Mission",  text: "Make AI safety + governance approachable in Waterloo, and help students build the skills + clarity to contribute responsibly." },
            { iconBeach: imgTealIsland,   iconDark: imgPurplePlanet,    title: "Approach", text: "Beginner-friendly entry points, real projects, and honest discussions about tradeoffs — bridging technical work and policy realities." },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.1} style={{ flex: 1, minWidth: 230 }}>
              <div className="card-lift" style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 18, padding: "28px", height: "100%", boxShadow: isDark ? `0 4px 20px ${c.shadow}` : "none" }}>
                <div style={{ marginBottom: 12 }}><Icon src={isDark ? item.iconDark : item.iconBeach} size={28} /></div>
                <h3 style={{ fontFamily: FONT_HEAD, fontSize: 20, color: c.text, marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: c.muted, lineHeight: 1.72 }}>{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── What WAIA is ── */}
        <Reveal>
          <h2 style={{ fontFamily: FONT_HEAD, fontSize: 32, color: c.text, marginBottom: 12 }}>What WAIA is</h2>
          <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: c.muted, lineHeight: 1.82, marginBottom: 28, maxWidth: 640 }}>
            WAIA connects students who want to learn about, discuss, and advocate for responsible AI. We're building a local home in the Waterloo region for people interested in AI risk, safety engineering, governance, and the real-world tradeoffs that shape how AI gets deployed.
          </p>
        </Reveal>

        {/* ── Pillars ── */}
        <div className="cards-row" style={{ display: "flex", gap: 16, marginBottom: 64 }}>
          {[
            { iconBeach: imgTealSun,   iconDark: imgPurpleSun,           title: "Learning",  text: "Intro sessions, reading groups, and discussion nights that make AI safety approachable." },
            { iconBeach: imgTealWave,  iconDark: imgPurpleShootingStar,  title: "Community", text: "Guest speakers, workshops, and meetups connecting Waterloo students to the wider AI safety ecosystem." },
            { iconBeach: imgTealMoon,  iconDark: imgPurpleMoon,          title: "Projects",  text: "Beginner-friendly projects — evaluations, audits, demos — to build real skills and portfolio proof." },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.1} style={{ flex: 1 }}>
              <div className="card-lift" style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 16, padding: "24px", boxShadow: isDark ? `0 4px 20px ${c.shadow}` : "none" }}>
                <div style={{ marginBottom: 10 }}><Icon src={isDark ? item.iconDark : item.iconBeach} size={26} /></div>
                <h3 style={{ fontFamily: FONT_HEAD, fontSize: 17, color: c.text, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontFamily: FONT_BODY, fontSize: 13, color: c.muted, lineHeight: 1.68 }}>{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Path ── */}
        <Reveal>
          <div style={{ background: c.bgAlt, borderRadius: 22, padding: "44px 40px", marginBottom: 48, position: "relative", overflow: "hidden" }}>
            {isDark && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, #1D104040 0%, transparent 70%)", pointerEvents: "none" }} />}
            <h2 style={{ fontFamily: FONT_HEAD, fontSize: 26, color: c.text, marginBottom: 6, textAlign: "center", position: "relative" }}>From curious to confident</h2>
            <p style={{ fontFamily: FONT_BODY, fontSize: 13, color: c.muted, textAlign: "center", marginBottom: 36, position: "relative" }}>A simple path — without being overwhelming.</p>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", rowGap: 28, position: "relative" }}>
              {[
                { step: "01", icon: isDark ? imgPurpleRocket : imgTealDolphin,  label: "Start", text: "Intro sessions in plain language plus realistic next steps." },
                { step: "02", icon: isDark ? imgPurpleStar   : imgTealSeashell, label: "Learn", text: "Reading groups focused on understanding over impressing." },
                { step: "03", icon: isDark ? imgPurpleUfo    : imgTealTurtle,   label: "Build", text: "Beginner-friendly projects that teach evaluation instincts." },
              ].map((item, i) => (
                <div key={i} style={{ flex: 1, minWidth: 140, textAlign: "center", padding: "0 18px" }}>
                  <div style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 500, color: c.accent, letterSpacing: "0.15em", marginBottom: 8, textTransform: "uppercase" }}>{item.step}</div>
                  <div style={{ marginBottom: 10 }}><Icon src={item.icon} size={30} /></div>
                  <div style={{ fontFamily: FONT_HEAD, fontSize: 17, color: c.text, marginBottom: 6 }}>{item.label}</div>
                  <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: c.muted, lineHeight: 1.65 }}>{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div style={{ textAlign: "center" }}>
            <a href="https://v0-waterloo-ai-association.vercel.app/" target="_blank" rel="noopener noreferrer"
              className="btn-fill" style={{ background: c.accent, color: "#fff", boxShadow: isDark ? `0 0 24px ${c.accent}50` : "none" }}>
              Visit WAIA Website →
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
