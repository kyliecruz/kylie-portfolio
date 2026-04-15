import { FONT_HEAD, FONT_BODY, FONT_MONO } from "../themes";
import { Reveal, PageHeader } from "../components/Shared";

// ── Add or edit your projects here ───────────────────────────────────────────
const PROJECTS = [
  {
    title: "AI Failure Modes Demo",
    desc: "Rule-based loan approval demo showing proxy bias, overconfidence-style outputs, and brittleness from hard thresholds.",
    tags: ["Python", "AI Safety", "Governance"],
    url: "https://github.com/kyliecruz/ai-failure-demo",
    stripe: "#D4603A",
    spaceStripe: "#F472B6",
  },
  {
    title: "Dataset Bias Checker",
    desc: "Lightweight CSV audit that reports representation and acceptance rates by group and flags large outcome gaps.",
    tags: ["Python", "Fairness", "Auditing"],
    url: "https://github.com/kyliecruz/dataset-bias-checker",
    stripe: "#1B7A6E",
    spaceStripe: "#3DBDAA",
  },
  {
    title: "AI Policy Tradeoff Simulator",
    desc: "Toy governance simulator that scores policy choices across risk, accountability, innovation, and compliance cost (0–100).",
    tags: ["Python", "Policy", "Governance"],
    url: "https://github.com/kyliecruz/ai-policy-simulator",
    stripe: "#4A72B8",
    spaceStripe: "#818CF8",
  },
  {
    title: "Toy Model Failure Demo",
    desc: "Toy prediction model that outputs PASS/FAIL + confidence and explains limitations, omitted variables, and misuse risk.",
    tags: ["Python", "Interpretability", "AI Risk"],
    url: "https://github.com/kyliecruz/toy-failure-model-demo",
    stripe: "#7A5BBF",
    spaceStripe: "#A78BFA",
  },
];

export default function Projects({ c, isDark }) {
  return (
    <div>
      <PageHeader
        label={isDark ? "// work" : "~ work"}
        title="Projects"
        subtitle="A collection of my work in software, AI safety, and community-building."
        c={c} isDark={isDark}
      />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "68px 32px" }}>
        <div className="proj-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 22, marginBottom: 48 }}>
          {PROJECTS.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="card-lift"
                style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 18, padding: "30px", display: "block", position: "relative", overflow: "hidden", textDecoration: "none", color: "inherit", boxShadow: isDark ? `0 4px 24px ${c.shadow}` : "none", height: "100%" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: isDark ? p.spaceStripe : p.stripe, borderRadius: "18px 18px 0 0", boxShadow: isDark ? `0 0 16px ${p.spaceStripe}80` : "none" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <h3 style={{ fontFamily: FONT_HEAD, fontSize: 20, color: c.text, lineHeight: 1.3, flex: 1, marginRight: 8 }}>{p.title}</h3>
                  <span style={{ color: c.muted, fontSize: 16 }}>↗</span>
                </div>
                <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: c.muted, lineHeight: 1.72, marginBottom: 18 }}>{p.desc}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {p.tags.map(t => <span key={t} className="pill" style={{ background: c.bgAlt, color: c.muted, fontSize: 11, border: `1px solid ${c.border}`, fontFamily: FONT_MONO }}>{t}</span>)}
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div style={{ textAlign: "center", padding: "42px", background: c.bgAlt, borderRadius: 20, border: `1px solid ${c.border}`, position: "relative", overflow: "hidden" }}>
            {isDark && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, #1A104060 0%, transparent 70%)", pointerEvents: "none" }} />}
            <p style={{ fontFamily: FONT_HEAD, fontStyle: "italic", fontSize: 22, color: c.text, marginBottom: 7, position: "relative" }}>
              {isDark ? "More in the void ✦" : "More on GitHub 🐚"}
            </p>
            <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: c.muted, marginBottom: 22, position: "relative" }}>All projects are open source and available to explore.</p>
            <a href="https://github.com/kyliecruz" target="_blank" rel="noopener noreferrer" className="btn-fill"
              style={{ background: c.text, color: c.bg, position: "relative", boxShadow: isDark ? `0 0 20px ${c.accent}30` : "none" }}>
              github.com/kyliecruz ↗
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
