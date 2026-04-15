import { FONT_HEAD, FONT_BODY, FONT_MONO } from "../themes";
import { Reveal, PageHeader } from "../components/Shared";

// ── Add new blog posts here ───────────────────────────────────────────────────
const POSTS = [
  {
    date: "Jan 2026",
    title: "Why AI Safety Needs Student Builders",
    desc: "Reflections on starting early, building community, and learning governance alongside technical work.",
    url: "/student-builders-post.html",
  },
  {
    date: "Jan 2026",
    title: "Launching the Waterloo AI Association",
    desc: "Promoting responsible, ethical, and impactful AI across the Waterloo region.",
    url: "/waia-post.html",
  },
];

export default function Blog({ c, isDark }) {
  return (
    <div>
      <PageHeader
        label={isDark ? "// writing" : "~ writing"}
        title="Blog"
        subtitle="Thoughts on AI safety, club updates, and governance frameworks."
        c={c} isDark={isDark}
      />

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "68px 32px" }}>
        {POSTS.map((post, i) => (
          <Reveal key={i} delay={i * 0.12}>
            <a href={post.url} target="_blank" rel="noopener noreferrer" className="card-lift"
              style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 18, padding: "32px", marginBottom: 20, display: "block", textDecoration: "none", color: "inherit", boxShadow: isDark ? `0 4px 24px ${c.shadow}` : "none", position: "relative", overflow: "hidden" }}>
              {isDark && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${c.accent}, ${c.coral})`, boxShadow: `0 0 12px ${c.accent}` }} />}
              {!isDark && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${c.accent}, ${c.coral})` }} />}
              <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: c.accent, fontWeight: 500, marginBottom: 12, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {isDark ? "◈" : "~"} {post.date}
              </div>
              <h2 style={{ fontFamily: FONT_HEAD, fontSize: 23, color: c.text, marginBottom: 10, lineHeight: 1.3 }}>{post.title}</h2>
              <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: c.muted, lineHeight: 1.75, marginBottom: 16 }}>{post.desc}</p>
              <span style={{ fontFamily: FONT_BODY, fontSize: 14, color: c.accent, fontWeight: 600 }}>Read post →</span>
            </a>
          </Reveal>
        ))}

        <Reveal>
          <div style={{ textAlign: "center", padding: "36px", background: c.bgAlt, borderRadius: 18, border: `1px solid ${c.border}` }}>
            <p style={{ fontFamily: FONT_HEAD, fontStyle: "italic", fontSize: 21, color: c.text, marginBottom: 5 }}>
              {isDark ? "Transmission incoming..." : "More coming soon"}
            </p>
            <p style={{ fontFamily: FONT_BODY, fontSize: 13, color: c.muted }}>Writing on AI safety, evaluation, and governance tradeoffs.</p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
