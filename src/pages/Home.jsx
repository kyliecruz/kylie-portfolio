import { useState, useRef, useEffect } from "react";
import { FONT_HEAD, FONT_BODY, FONT_MONO } from "../themes";
import { Reveal, Wave, SocialLinks, Icon } from "../components/Shared";
import { BeachScene, ShootingStars, Planet } from "../components/Stars";
import {
  imgHibiscus, imgTealDolphin, imgTealSeashell, imgTealTurtle, imgTealWave,
  imgSparkle, imgPurpleRocket, imgPurpleStar, imgPurpleUfo, imgPurpleShootingStar
} from "../assets";

export default function Home({ setPage, c, isDark }) {
  const [titleHoverX, setTitleHoverX] = useState(null);
  const contactRef = useRef(null);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const el = contactRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      setParallaxY(((rect.top + rect.height / 2) - window.innerHeight / 2) * 0.15);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      {/* ── Hero ── */}
      <section className="hero-section" style={{
        position: "relative",
        background: isDark
          ? "radial-gradient(ellipse at 60% 0%, #1A1050 0%, #060818 60%)"
          : `linear-gradient(160deg, ${c.bgAlt} 0%, ${c.bg} 60%)`,
        padding: "80px 32px 0", overflow: "hidden",
        minHeight: 620,
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
      }}>
        {!isDark && (
          <>
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
              background: "radial-gradient(circle 260px at 88% 22%, rgba(240,144,122,0.38) 0%, rgba(244,176,154,0.18) 50%, transparent 100%)" }} />
            <BeachScene />
          </>
        )}
        {isDark && (
          <>
            <ShootingStars />
            <Planet />
          </>
        )}

        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", position: "relative", paddingBottom: 120 }}>
          <div className="hf0" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: c.accentLight, border: `1px solid ${c.accentBorder}`, borderRadius: 999, padding: "5px 16px", marginBottom: 28, fontSize: 13, color: c.accent, fontFamily: FONT_MONO }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.accent, display: "inline-block", boxShadow: isDark ? `0 0 8px ${c.accent}` : "none" }} />
            CS Student · Waterloo, ON
          </div>

          <h1 className="hf1" style={{ fontFamily: FONT_HEAD, fontSize: "clamp(56px,9vw,96px)", fontWeight: 700, color: c.text, lineHeight: 1.03, letterSpacing: "-3px", marginBottom: 30 }}>
            <span
              className={titleHoverX === null ? (isDark ? "shimmer-text-space" : "shimmer-text") : ""}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setTitleHoverX(((e.clientX - rect.left) / rect.width) * 100);
              }}
              onMouseLeave={() => setTitleHoverX(null)}
              style={titleHoverX !== null ? {
                display: "inline-block",
                padding: "0.05em 0.02em 0.1em",
                backgroundImage: isDark
                  ? `radial-gradient(circle at ${titleHoverX}% 50%, #F472B6, #A78BFA 50%, #A78BFA)`
                  : `radial-gradient(circle at ${titleHoverX}% 50%, #E69C8A, #74B8B0 50%, #74B8B0)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              } : { display: "inline-block" }}
            >Kylie Cruz</span>
          </h1>

          <p className="hf2" style={{ fontFamily: FONT_HEAD, fontStyle: "italic", fontSize: "clamp(16px,2.5vw,21px)", color: c.muted, lineHeight: 1.6, maxWidth: 700, margin: "0 auto 38px" }}>
            Exploring ways to reduce existential risks through AI safety & governance.
          </p>

          <p className="hf2" style={{ fontFamily: FONT_BODY, fontSize: 15, color: c.muted, lineHeight: 1.78, maxWidth: 480, margin: "0 auto 38px" }}>
            Computer science student at Wilfrid Laurier University passionate about building and evaluating trustworthy, safe, and reliable AI systems.
          </p>

          <div className="hf3 hero-btns" style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
            <button className="btn-fill" onClick={() => setPage("projects")} style={{ background: c.accent, color: "#fff", boxShadow: isDark ? `0 0 24px ${c.accent}50` : "none" }}>
              <Icon src={isDark ? imgSparkle : imgHibiscus} size={24} style={{ marginRight: 2 }} /> View Projects
            </button>
            <button className="btn-ghost" onClick={() => setPage("about")} style={{ border: `1.5px solid ${c.border}`, color: c.text, background: c.bg }}>About Me</button>
          </div>

          <div className="hf4" style={{ marginBottom: "clamp(20px,4vw,60px)" }}>
            <SocialLinks c={c} isDark={isDark} />
          </div>
        </div>

        {!isDark && <Wave fill={c.bg} />}
        {isDark && <div style={{ height: 24 }} />}
      </section>

      {/* ── Currently ── */}
      <section className="section-pad" style={{ background: c.bg, padding: "56px 32px 80px", position: "relative", marginTop: 0 }}>
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
                    <span style={{ color: c.accent, flexShrink: 0, fontFamily: FONT_MONO, marginTop: 1 }}>{"→"}</span>
                    {item}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WAIA preview ── */}
      <section className="section-pad" style={{ background: c.bgAlt, padding: "80px 32px", position: "relative", overflow: "hidden" }}>
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
              { icon: isDark ? imgPurpleRocket : imgTealDolphin, title: "Technical Research", desc: "Deep dives into interpretability, evaluation, and alignment." },
              { icon: isDark ? imgPurpleStar   : imgTealSeashell, title: "Safety Governance",  desc: "Understanding risk frameworks and real-world policy tradeoffs." },
              { icon: isDark ? imgPurpleUfo    : imgTealTurtle,   title: "Community Building", desc: "Welcoming beginners and connecting students to the AI safety ecosystem." },
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
      <section ref={contactRef} className="section-pad" style={{ background: c.bg, padding: "72px 32px", borderTop: `1px solid ${c.border}`, position: "relative", overflow: "hidden" }}>
        {/* Sun — static, doesn't parallax so it never pulls away from the section */}
        {!isDark && (
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(circle 200px at 88% 50%, rgba(240,144,122,0.38) 0%, rgba(244,176,154,0.18) 50%, transparent 100%)" }} />
        )}
        {/* Parallax layer — birds (beach) and space decorations move at 15% scroll speed */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", transform: `translateY(${parallaxY}px)` }}>
          {!isDark && <BeachScene idSuffix="cb" showWaves={false} birdYOffset={-35} />}
          {isDark && <>
            <ShootingStars contained />
            {/* Smaller planet, tucked to the right; hidden on mobile to avoid text overlap */}
            <div className="hide-mobile">
              <Planet overrideStyle={{ position: "absolute", right: "6%", top: "calc(50% - 44px)", width: 88, height: 88 }} />
            </div>
          </>}
        </div>
        {/* Waves only — outside parallax so they always anchor to section bottom with no gap */}
        {!isDark && <BeachScene idSuffix="contact" showBirds={false} />}

        {/* Content sits above decoration layer */}
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <Reveal>
            <h2 style={{ fontFamily: FONT_HEAD, fontSize: "clamp(26px,4vw,38px)", color: c.text, marginBottom: 10 }}>
              {isDark ? "Transmit a signal" : "Say hello"} <Icon src={isDark ? imgPurpleShootingStar : imgTealWave} size={26} style={{ marginLeft: 4 }} />
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
