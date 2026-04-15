import { FONT_HEAD, FONT_BODY, FONT_MONO } from "../themes";
import { Reveal, Wave, SocialLinks, Icon } from "../components/Shared";
import { BeachScene, ShootingStars } from "../components/Stars";
import {
  imgWave, imgTealWave, imgTealSeashell, imgTealDolphin, imgTealIsland,
  imgSparkle, imgPurpleSparkle, imgPurplePlanet, imgPurpleStar, imgPurpleUfo,
} from "../assets";

export default function Home({ setPage, c, isDark }) {
  return (
    <div>
      {/* ── Hero ── */}
      <section style={{
        position: "relative",
        background: isDark
          ? "radial-gradient(ellipse at 60% 0%, #1A1050 0%, #060818 60%)"
          : `linear-gradient(160deg, ${c.bgAlt} 0%, ${c.bg} 60%)`,
        padding: "100px 32px 0", overflow: "hidden",
        minHeight: isDark ? 580 : 620,
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
      }}>
        {!isDark && (
          <>
            <div style={{ position: "absolute", right: "6%", top: "5%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, #F5C84255 0%, transparent 68%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", left: "-4%", top: "40%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, #D4EDE970 0%, transparent 70%)", pointerEvents: "none" }} />
            <BeachScene />
          </>
        )}
        {isDark && (
          <>
            <ShootingStars />
            <div style={{ position: "fixed", right: "10%", top: "8%", width: 140, height: 140, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #6D5CE7, #2D1B4E)", boxShadow: "0 0 60px #6D5CE740", pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
              <div style={{ position: "absolute", top: "25%", left: "-10%", right: "-10%", height: 2, background: "#ffffff18", transform: "rotate(-15deg)" }} />
              <div style={{ position: "absolute", top: "45%", left: "-10%", right: "-10%", height: 1, background: "#ffffff10", transform: "rotate(-15deg)" }} />
              <div style={{ position: "absolute", top: "62%", left: "-10%", right: "-10%", height: 3, background: "#ffffff12", transform: "rotate(-15deg)" }} />
              <div className="orbit" style={{ position: "absolute", top: "50%", left: "50%", width: 8, height: 8, borderRadius: "50%", background: "#F472B6", boxShadow: "0 0 10px #F472B6", marginTop: -4, marginLeft: -4 }} />
            </div>
          </>
        )}

        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", position: "relative", paddingBottom: 80 }}>
          <div className="hf0" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: c.accentLight, border: `1px solid ${c.accentBorder}`, borderRadius: 999, padding: "5px 16px", marginBottom: 30, fontSize: 13, color: c.accent, fontFamily: FONT_MONO }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.accent, display: "inline-block", boxShadow: isDark ? `0 0 8px ${c.accent}` : "none" }} />
            CS Student · Wilfrid Laurier · Waterloo
          </div>

          <h1 className="hf1" style={{ fontFamily: FONT_HEAD, fontSize: "clamp(56px,9vw,96px)", fontWeight: 700, color: c.text, lineHeight: 1.03, letterSpacing: "-3px", marginBottom: 20 }}>
            <span className={isDark ? "shimmer-text-space" : "shimmer-text"}>Kylie Cruz</span>
          </h1>

          <p className="hf2" style={{ fontFamily: FONT_HEAD, fontStyle: "italic", fontSize: "clamp(16px,2.5vw,21px)", color: c.muted, lineHeight: 1.6, maxWidth: 540, margin: "0 auto 14px" }}>
            {isDark ? "Mapping the frontier of AI safety — one red-team at a time." : "Exploring ways to reduce existential risks through AI safety & governance."}
          </p>

          <p className="hf2" style={{ fontFamily: FONT_BODY, fontSize: 15, color: c.muted, lineHeight: 1.78, maxWidth: 480, margin: "0 auto 38px" }}>
            CS student at Wilfrid Laurier passionate about building trustworthy, safe, and reliable AI systems.
          </p>

          <div className="hf3 hero-btns" style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
            <button className="btn-fill" onClick={() => setPage("projects")} style={{ background: c.accent, color: "#fff", boxShadow: isDark ? `0 0 24px ${c.accent}50` : "none" }}>
              <Icon src={isDark ? imgSparkle : imgWave} size={16} style={{ marginRight: 2 }} /> View Projects
            </button>
            <button className="btn-ghost" onClick={() => setPage("waia")} style={{ border: `1.5px solid ${c.border}`, color: c.text }}>About WAIA</button>
            <a href="mailto:kkylie.cruz@gmail.com" className="btn-ghost" style={{ border: `1.5px solid ${c.border}`, color: c.text }}>Say hi ✉</a>
          </div>

          <div className="hf4">
            <SocialLinks c={c} isDark={isDark} />
          </div>
        </div>

        {!isDark && <Wave fill={c.bg} />}
        {isDark && <div style={{ height: 24 }} />}
      </section>

      {/* ── Currently ── */}
      <section style={{ background: c.bg, padding: "80px 32px", position: "relative" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: 11, fontWeight: 500, color: c.accent, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                {isDark ? "// currently" : "~ currently"}
              </span>
              <div style={{ flex: 1, height: 1, background: c.border }} />
            </div>
          </Reveal>
          <div className="cur-row" style={{ display: "flex", gap: 56, alignItems: "flex-start" }}>
            <Reveal delay={0.1} style={{ flexShrink: 0, maxWidth: 260 }}>
              <h2 style={{ fontFamily: FONT_HEAD, fontSize: "clamp(22px,3vw,32px)", color: c.text, lineHeight: 1.25 }}>
                {isDark ? "Navigating the cosmos of AI safety." : "Building toward AI safety."}
              </h2>
            </Reveal>
            <div style={{ flex: 1 }}>
              {[
                "2nd year CS (Hons) at Wilfrid Laurier University",
                "Founder & President, Waterloo AI Association",
                "Outreach Coordinator, Laurier Computing Society",
                "Planning SF AI safety trip — July 2026",
                "Targeting red-teaming, evaluation & safety engineering roles",
              ].map((item, i) => (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14, fontFamily: FONT_BODY, fontSize: 15, color: c.muted }}>
                    <span style={{ color: c.accent, flexShrink: 0, fontFamily: FONT_MONO, marginTop: 1 }}>{isDark ? "→" : "~"}</span>
                    {item}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WAIA preview ── */}
      <section style={{ background: c.bgAlt, padding: "80px 32px", position: "relative", overflow: "hidden" }}>
        {isDark && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 100%, #1D1060 0%, transparent 60%)", pointerEvents: "none" }} />}
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span className="pill" style={{ background: c.accentLight, color: c.accent, border: `1px solid ${c.accentBorder}`, marginBottom: 14, display: "inline-block", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: 11, fontFamily: FONT_MONO }}>Community</span>
              <h2 style={{ fontFamily: FONT_HEAD, fontSize: "clamp(28px,4vw,42px)", color: c.text, marginBottom: 12 }}>Waterloo AI Association</h2>
              <p style={{ fontFamily: FONT_BODY, color: c.muted, fontSize: 15, maxWidth: 460, margin: "0 auto" }}>A student community bridging technical AI safety and governance in the Waterloo region.</p>
            </div>
          </Reveal>
          <div className="cards-row" style={{ display: "flex", gap: 18, marginBottom: 40 }}>
            {[
              { icon: isDark ? imgPurpleSparkle : imgTealDolphin, title: "Technical Research", desc: "Deep dives into interpretability, evaluation, and alignment." },
              { icon: isDark ? imgPurplePlanet : imgTealWave,    title: "Safety Governance",  desc: "Understanding risk frameworks and real-world policy tradeoffs." },
              { icon: isDark ? imgPurpleStar   : imgTealSeashell, title: "Community Building", desc: "Welcoming beginners and connecting students to the AI safety ecosystem." },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card-lift" style={{ flex: 1, minWidth: 200, background: c.card, border: `1px solid ${c.border}`, borderRadius: 18, padding: "28px 22px", boxShadow: isDark ? `0 4px 24px ${c.shadow}` : "none" }}>
                  <div style={{ marginBottom: 12 }}><Icon src={item.icon} size={30} /></div>
                  <h3 style={{ fontFamily: FONT_HEAD, fontSize: 18, color: c.text, marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: c.muted, lineHeight: 1.68 }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div style={{ textAlign: "center" }}>
              <button className="btn-fill" onClick={() => setPage("waia")} style={{ background: c.accent, color: "#fff", boxShadow: isDark ? `0 0 24px ${c.accent}40` : "none" }}>About WAIA →</button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Contact strip ── */}
      <section style={{ background: isDark ? c.bgDeep : c.bg, padding: "72px 32px", borderTop: `1px solid ${c.border}` }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontFamily: FONT_HEAD, fontSize: "clamp(26px,4vw,38px)", color: c.text, marginBottom: 10 }}>
              {isDark ? "Transmit a signal" : "Say hello"} <Icon src={isDark ? imgPurpleUfo : imgTealSeashell} size={26} style={{ marginLeft: 4 }} />
            </h2>
            <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: c.muted, marginBottom: 28, lineHeight: 1.7 }}>
              {isDark ? "Always open to connect on AI safety, red-teaming, and research opportunities." : "Always happy to connect on AI safety, research, and opportunities."}
            </p>
            <SocialLinks c={c} isDark={isDark} large />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
