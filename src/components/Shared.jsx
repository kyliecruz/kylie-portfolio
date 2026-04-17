// Shared UI components used across multiple pages
import { useScrollReveal } from "../hooks";
import { FONT_HEAD, FONT_BODY, FONT_MONO } from "../themes";
import {
  imgTealEmail, imgPurpleEmail,
  imgTealLinkedin, imgPurpleLinkedin,
  imgTealGithub, imgPurpleGithub,
} from "../assets";

// ── Inline image icon helper ──────────────────────────────────────────────────
export function Icon({ src, size = 20, style: extraStyle = {} }) {
  return (
    <img src={src} alt="" style={{ width: size, height: size, verticalAlign: "middle", display: "inline-block", flexShrink: 0, ...extraStyle }} />
  );
}

// ── Scroll-reveal wrapper ─────────────────────────────────────────────────────
export function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ── Wave divider (beach mode) ─────────────────────────────────────────────────
export function Wave({ fill, flip }) {
  return (
    <div style={{ lineHeight: 0, transform: flip ? "scaleY(-1)" : "none", marginTop: -1, marginBottom: -1 }}>
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block" }} preserveAspectRatio="none">
        <path d="M0,30 C180,56 360,4 540,30 C720,56 900,4 1080,30 C1260,56 1350,10 1440,30 L1440,60 L0,60 Z" fill={fill} />
      </svg>
    </div>
  );
}

// ── Page header (used by About, Projects, Blog, WAIA) ─────────────────────────
export function PageHeader({ label, title, subtitle, c, isDark }) {
  return (
    <div style={{ background: c.bgAlt, padding: "68px 32px 56px", textAlign: "center", borderBottom: `1px solid ${c.border}`, position: "relative", overflow: "hidden" }}>
      {isDark && (
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center top, #2D1B6940 0%, transparent 70%)", pointerEvents: "none" }} />
      )}
      <div style={{ position: "relative" }}>
        <Reveal>
          <span className="pill" style={{ background: c.accentLight, color: c.accent, border: `1px solid ${c.accentBorder}`, marginBottom: 16, display: "inline-block", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: 11, fontFamily: FONT_MONO }}>{label}</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 style={{ fontFamily: FONT_HEAD, fontSize: "clamp(38px,5vw,62px)", color: c.text, marginBottom: subtitle ? 14 : 0, lineHeight: 1.1 }}>{title}</h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.2}>
            <p style={{ fontFamily: FONT_BODY, fontSize: 16, color: c.muted, maxWidth: 520, margin: "0 auto", lineHeight: 1.75 }}>{subtitle}</p>
          </Reveal>
        )}
      </div>
    </div>
  );
}

// ── Social link pills ─────────────────────────────────────────────────────────
export function SocialLinks({ c, large, isDark = false }) {
  const links = [
    { imgSrc: isDark ? imgPurpleEmail   : imgTealEmail,    label: "Email",    href: "mailto:kkylie.cruz@gmail.com" },
    { imgSrc: isDark ? imgPurpleLinkedin : imgTealLinkedin, label: "LinkedIn", href: "https://linkedin.com/in/kylie-cruz" },
    { imgSrc: isDark ? imgPurpleGithub  : imgTealGithub,   label: "GitHub",   href: "https://github.com/kyliecruz" },
  ];
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
      {links.map(({ imgSrc, label, href }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-pill"
          style={{ background: c.card, border: `1px solid ${c.border}`, color: c.muted, fontSize: large ? 14 : 13, padding: large ? "9px 18px" : "7px 14px" }}>
          <img src={imgSrc} alt="" style={{ width: 15, height: 15, verticalAlign: "middle", flexShrink: 0 }} />
          {label}
        </a>
      ))}
    </div>
  );
}
