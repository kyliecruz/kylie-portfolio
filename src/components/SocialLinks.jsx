import { FONT_BODY, FONT_MONO } from "../themes";

export default function SocialLinks({ c, large }) {
  const links = [
    { icon: "✉", label: "Email",    href: "mailto:kkylie.cruz@gmail.com" },
    { icon: "in", label: "LinkedIn", href: "https://linkedin.com/in/kylie-cruz" },
    { icon: "⌥", label: "GitHub",   href: "https://github.com/kyliecruz" },
  ];
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
      {links.map(({ icon, label, href }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-pill"
          style={{ background: c.card, border: `1px solid ${c.border}`, color: c.muted, fontSize: large ? 14 : 13, padding: large ? "9px 18px" : "7px 14px" }}>
          <span style={{ fontFamily: FONT_MONO, fontWeight: 500, fontSize: 12, color: c.accent }}>{icon}</span>
          {label}
        </a>
      ))}
    </div>
  );
}
