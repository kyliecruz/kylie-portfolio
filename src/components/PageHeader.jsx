import { FONT_HEAD, FONT_BODY, FONT_MONO } from "../themes";
import Reveal from "./Reveal";

export default function PageHeader({ label, title, subtitle, c, isDark }) {
  return (
    <div style={{ background: c.bgAlt, padding: "68px 32px 56px", textAlign: "center", borderBottom: `1px solid ${c.border}`, position: "relative", overflow: "hidden" }}>
      {isDark && (
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center top, #2D1B6940 0%, transparent 70%)", pointerEvents: "none" }} />
      )}
      <div style={{ position: "relative" }}>
        <Reveal>
          <span className="pill" style={{ background: c.accentLight, color: c.accent, border: `1px solid ${c.accentBorder}`, marginBottom: 16, display: "inline-block", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: 11, fontFamily: FONT_MONO }}>
            {label}
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 style={{ fontFamily: FONT_HEAD, fontSize: "clamp(38px,5vw,62px)", color: c.text, marginBottom: subtitle ? 14 : 0, lineHeight: 1.1 }}>
            {title}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.2}>
            <p style={{ fontFamily: FONT_BODY, fontSize: 16, color: c.muted, maxWidth: 520, margin: "0 auto", lineHeight: 1.75 }}>
              {subtitle}
            </p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
