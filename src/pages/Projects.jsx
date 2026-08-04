// ── Projects.jsx: Projects hub + per-collection project pages ─────────────────
// The Projects page has two levels (same pattern as Blog.jsx, which uses no URL
// routing, just a piece of state that swaps which view renders):
//
//   1. HUB:        one big card per collection ("AI Safety & Governance",
//                  "Built for Fun"). Clicking a card opens that collection.
//   2. COLLECTION: its own page listing every project in that collection, each
//                  with a diagram showing what the project does in a nutshell.
//
// Everything is driven by the COLLECTIONS array below.
//
// Each COLLECTION object has:
//   id:          internal key (any unique string)
//   heading:     collection title in beach/light mode
//   spaceHeading: collection title in space/dark mode
//   label:       small uppercase chip above the title (beach / space variants)
//   tagline:     1 sentence shown on the hub card
//   blurb:       1–2 sentences shown at the top of the collection page
//   iconBeach / iconDark: icon shown on the hub card
//   stripe / spaceStripe: accent bar colour for the hub card
//   projects:    array of project objects (see below)
//
// Each PROJECT object has:
//   title:      project name
//   desc:       1–2 sentence description
//   tags:       array of strings shown as a tech/topic line under the card
//   url:        link to the GitHub repo (opens in new tab)
//   iconBeach / iconDark: small icon on the project card
//   stripe:     top accent bar colour for beach/light mode (light/muted hex)
//   spaceStripe: top accent bar colour for space/dark mode (vivid hex)
//   diagram:    OPTIONAL. Omit it and the card just renders without a diagram.
//                 {
//                   steps:    [{ label, sub }]    (left-to-right flow boxes)
//                   outLabel: "What it surfaces"  (caption for the outcomes row)
//                   outs:     ["chip", "chip"]    (outcomes fanning out of the flow)
//                 }
//                 3–4 steps reads best; the last step is highlighted in accent.
//
// To add a project: add an object to the right collection's `projects` array
// To remove a project: delete its object from that array
// To reorder projects: reorder the objects (first in array = top of the page)
// To add a whole new collection: add another object to COLLECTIONS
// A collection with an empty `projects` array shows a "coming soon" placeholder
// To update the GitHub profile link: find "github.com/kyliecruz" at the bottom

import { useState, useEffect } from "react";
import { FONT_HEAD, FONT_BODY, FONT_MONO } from "../themes";
import { Reveal, PageHeader, SectionLabel, MetaLine, Icon } from "../components/Shared";
import {
  imgTealWave, imgPurpleShootingStar,
  imgTealSun, imgPurpleSparkle,
  imgTealHibiscus, imgPurpleMoon,
  imgTealSeashell, imgPurpleStar,
  imgTealTurtle, imgPurpleUfo,
  imgTealIsland, imgPurplePlanet,
  imgTealDolphin, imgPurpleRocket,
} from "../assets";

// ── Add or edit collections + projects here ───────────────────────────────────
const COLLECTIONS = [
  {
    id: "safety",
    heading: "AI Safety & Governance",
    spaceHeading: "AI Safety & Governance",
    label: { beach: "~ safety", space: "// safety" },
    tagline: "Demos and tools exploring how AI systems fail, and how we might govern them.",
    blurb: "Small, honest builds about failure modes, fairness auditing, and policy tradeoffs. Each one is a working demo, and the diagrams below show what happens under the hood.",
    iconBeach: imgTealSun,
    iconDark: imgPurpleSparkle,
    stripe: "#94B6C3",
    spaceStripe: "#A78BFA",
    projects: [
      {
        title: "AI Failure Modes Demo",
        desc: "Rule-based loan approval demo showing proxy bias, overconfidence-style outputs, and brittleness from hard thresholds.",
        tags: ["Python", "AI Safety", "Governance"],
        url: "https://github.com/kyliecruz/ai-failure-demo",
        iconBeach: imgTealSeashell,
        iconDark: imgPurpleStar,
        stripe: "#EBB2A3",
        spaceStripe: "#F472B6",
        diagram: {
          steps: [
            { label: "Applicant data", sub: "income · postal code · age" },
            { label: "Hard-coded rules", sub: "if score > cutoff" },
            { label: "Approve / Deny", sub: "+ stated confidence" },
          ],
          outLabel: "What it surfaces",
          outs: ["Proxy bias", "Overconfident output", "Threshold brittleness"],
        },
      },
      {
        title: "Dataset Bias Checker",
        desc: "Lightweight CSV audit that reports representation and acceptance rates by group and flags large outcome gaps.",
        tags: ["Python", "Fairness", "Auditing"],
        url: "https://github.com/kyliecruz/dataset-bias-checker",
        iconBeach: imgTealTurtle,
        iconDark: imgPurpleUfo,
        stripe: "#94B6C3",
        spaceStripe: "#3DBDAA",
        diagram: {
          steps: [
            { label: "CSV dataset", sub: "rows + group column" },
            { label: "Split by group", sub: "counts per category" },
            { label: "Rate comparison", sub: "representation · acceptance" },
            { label: "Audit report", sub: "gaps ranked by size" },
          ],
          outLabel: "What it reports",
          outs: ["Under-represented groups", "Outcome gap > threshold", "Groups within tolerance"],
        },
      },
      {
        title: "AI Policy Tradeoff Simulator",
        desc: "Toy governance simulator that scores policy choices across risk, accountability, innovation, and compliance cost (0–100).",
        tags: ["Python", "Policy", "Governance"],
        url: "https://github.com/kyliecruz/ai-policy-simulator",
        iconBeach: imgTealIsland,
        iconDark: imgPurplePlanet,
        diagram: {
          steps: [
            { label: "Policy choices", sub: "e.g. mandatory audits" },
            { label: "Weighted model", sub: "each lever moves 4 axes" },
            { label: "Scorecard", sub: "0–100 per axis" },
          ],
          outLabel: "Axes scored",
          outs: ["Risk reduction", "Accountability", "Innovation", "Compliance cost"],
        },
        stripe: "#BEB5B4",
        spaceStripe: "#818CF8",
      },
      {
        title: "Toy Model Failure Demo",
        desc: "Toy prediction model that outputs PASS/FAIL + confidence and explains limitations, omitted variables, and misuse risk.",
        tags: ["Python", "Interpretability", "AI Risk"],
        url: "https://github.com/kyliecruz/toy-failure-model-demo",
        iconBeach: imgTealDolphin,
        iconDark: imgPurpleRocket,
        stripe: "#D5D9DC",
        spaceStripe: "#A78BFA",
        diagram: {
          steps: [
            { label: "Few input features", sub: "deliberately incomplete" },
            { label: "Toy predictor", sub: "simple fitted rule" },
            { label: "PASS / FAIL", sub: "+ confidence score" },
            { label: "Limitations note", sub: "printed with every result" },
          ],
          outLabel: "What it explains",
          outs: ["Omitted variables", "Confidence ≠ correctness", "Misuse risk"],
        },
      },
    ],
  },
  {
    id: "fun",
    heading: "Built for Fun",
    spaceHeading: "Built for Fun",
    label: { beach: "~ playground", space: "// playground" },
    tagline: "Side experiments built out of curiosity.",
    blurb: "Things I built because they were interesting and educational.",
    iconBeach: imgTealHibiscus,
    iconDark: imgPurpleMoon,
    stripe: "#EBB2A3",
    spaceStripe: "#F472B6",
    projects: [
      {
        title: "Chloe, a Voice Assistant",
        desc: "A voice assistant you can actually talk to, built with Python and the ElevenLabs Conversational AI API.",
        tags: ["Python", "ElevenLabs API", "Real-time Audio"],
        url: "https://github.com/kyliecruz/voice-virtual-assistant",
        iconBeach: imgTealDolphin,
        iconDark: imgPurpleUfo,
        stripe: "#EBB2A3",
        spaceStripe: "#F472B6",
        diagram: {
          steps: [
            { label: "Your voice", sub: "mic audio, no wake word" },
            { label: "One websocket", sub: "streamed up continuously" },
            { label: "ElevenLabs agent", sub: "transcribe · think · speak" },
            { label: "Chloe answers", sub: "synthesized voice + transcript" },
          ],
          outLabel: "What makes it feel live",
          outs: ["Interruptible mid-sentence", "Live terminal transcript", "Knows your name + schedule"],
        },
      },
      // Add more fun projects here, same shape as the one above.
      // The `diagram` field is optional. Leave it out for a plain card.
      // {
      //   title: "Project name",
      //   desc: "What it does, in a sentence or two.",
      //   tags: ["JavaScript", "Just for fun"],
      //   url: "https://github.com/kyliecruz/your-repo",
      //   iconBeach: imgTealSeashell,
      //   iconDark: imgPurpleStar,
      //   stripe: "#EBB2A3",
      //   spaceStripe: "#F472B6",
      //   diagram: {
      //     steps: [
      //       { label: "Input", sub: "what goes in" },
      //       { label: "The clever bit", sub: "how it works" },
      //       { label: "Output", sub: "what you get" },
      //     ],
      //     outLabel: "What it does",
      //     outs: ["Thing one", "Thing two"],
      //   },
      // },
    ],
  },
];

// ── Flow diagram: "what this project does in a nutshell" ──────────────────────
// Renders `diagram.steps` as boxes joined by arrows, then `diagram.outs` as a
// row of chips fanning out of the flow. Stacks vertically on mobile
// (the .flow-row / .flow-arrow classes live in src/hooks.js).
function FlowDiagram({ d, c, isDark }) {
  return (
    <div style={{ background: c.bgAlt, border: `1px solid ${c.border}`, borderRadius: 14, padding: "22px 20px", marginBottom: 18 }}>
      {/* ── Step boxes joined by arrows ── */}
      <div className="flow-row" style={{ display: "flex", alignItems: "stretch", gap: 8 }}>
        {d.steps.map((s, i) => (
          <div key={s.label} style={{ display: "contents" }}>
            {i > 0 && (
              <div className="flow-arrow" style={{ display: "flex", alignItems: "center", justifyContent: "center", color: c.accent, fontSize: 16, flexShrink: 0, padding: "0 2px" }}>
                →
              </div>
            )}
            <div style={{
              flex: 1, minWidth: 0, textAlign: "center", borderRadius: 12, padding: "13px 12px",
              background: i === d.steps.length - 1 ? c.accentLight : c.card,
              border: `1px solid ${i === d.steps.length - 1 ? c.accentBorder : c.border}`,
              boxShadow: isDark && i === d.steps.length - 1 ? `0 0 16px ${c.accent}25` : "none",
            }}>
              <div style={{ fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600, color: i === d.steps.length - 1 ? c.accent : c.text, lineHeight: 1.35 }}>
                {s.label}
              </div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: c.muted, marginTop: 5, lineHeight: 1.5 }}>
                {s.sub}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Outcomes fanning out of the flow ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginTop: 16, paddingTop: 14, borderTop: `1px dashed ${c.border}` }}>
        <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: c.muted, letterSpacing: "0.1em", textTransform: "uppercase", flexShrink: 0 }}>
          ↳ {d.outLabel}
        </span>
        <MetaLine c={c} items={d.outs} />
      </div>
    </div>
  );
}

// ── Full project card (used on a collection page) ─────────────────────────────
function ProjectCard({ p, c, isDark }) {
  return (
    <div className="card-lift" style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 18, padding: "30px", position: "relative", overflow: "hidden", boxShadow: isDark ? `0 4px 24px ${c.shadow}` : "none", marginBottom: 22 }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: isDark ? p.spaceStripe : p.stripe, boxShadow: isDark ? `0 0 16px ${p.spaceStripe}80` : "none" }} />

      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
        <Icon src={isDark ? p.iconDark : p.iconBeach} size={28} style={{ marginTop: 2 }} />
        <h3 style={{ fontFamily: FONT_HEAD, fontSize: 22, color: c.text, lineHeight: 1.3, flex: 1 }}>{p.title}</h3>
      </div>

      <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: c.muted, lineHeight: 1.72, marginBottom: 20 }}>{p.desc}</p>

      {p.diagram && <FlowDiagram d={p.diagram} c={c} isDark={isDark} />}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        {p.tags && <MetaLine c={c} tone="muted" items={p.tags} />}
        <a href={p.url} target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: FONT_BODY, fontSize: 14, fontWeight: 600, color: c.accent, whiteSpace: "nowrap", marginLeft: "auto" }}>
          View on GitHub ↗
        </a>
      </div>
    </div>
  );
}

// ── Hub card: one per collection ──────────────────────────────────────────────
function CollectionCard({ col, c, isDark, onOpen }) {
  const count = col.projects.length;
  return (
    <button onClick={onOpen} className="card-lift"
      style={{ flex: 1, minWidth: 240, background: c.card, border: `1px solid ${c.border}`, borderRadius: 18, padding: "32px 28px", textAlign: "left", position: "relative", overflow: "hidden", boxShadow: isDark ? `0 4px 24px ${c.shadow}` : "none", display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: isDark ? col.spaceStripe : col.stripe, boxShadow: isDark ? `0 0 16px ${col.spaceStripe}80` : "none" }} />

      <div style={{ marginBottom: 14 }}><Icon src={isDark ? col.iconDark : col.iconBeach} size={32} /></div>

      <h2 style={{ fontFamily: FONT_HEAD, fontSize: 24, color: c.text, marginBottom: 10, lineHeight: 1.25 }}>
        {isDark ? col.spaceHeading : col.heading}
      </h2>
      <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: c.muted, lineHeight: 1.72, marginBottom: 20, flex: 1 }}>
        {col.tagline}
      </p>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: c.muted, letterSpacing: "0.05em" }}>
          {count > 0 ? `${count} project${count === 1 ? "" : "s"}` : "coming soon"}
        </span>
        <span style={{ fontFamily: FONT_BODY, fontSize: 14, fontWeight: 600, color: c.accent }}>Explore →</span>
      </div>
    </button>
  );
}

// ── Collection page: one collection's projects, with diagrams ─────────────────
function CollectionView({ col, onBack, c, isDark }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  return (
    <div>
      {/* ── Collection header ── */}
      <div style={{ background: c.bgAlt, padding: "48px 32px 52px", borderBottom: `1px solid ${c.border}`, position: "relative", overflow: "hidden" }}>
        {isDark && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center top, #2D1B6940 0%, transparent 70%)", pointerEvents: "none" }} />}
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
          <Reveal>
            <button onClick={onBack}
              style={{ background: "none", border: "none", cursor: "pointer", fontFamily: FONT_BODY, fontSize: 13, color: c.muted, marginBottom: 28, display: "inline-flex", alignItems: "center", gap: 6, padding: 0, transition: "color 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.color = c.accent}
              onMouseLeave={e => e.currentTarget.style.color = c.muted}>
              ← All Projects
            </button>
          </Reveal>
          <div style={{ textAlign: "center" }}>
            <Reveal delay={0.05}>
              <SectionLabel c={c} style={{ marginBottom: 16 }}>
                {isDark ? col.label.space : col.label.beach}
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 style={{ fontFamily: FONT_HEAD, fontSize: "clamp(32px,5vw,54px)", color: c.text, marginBottom: 14, lineHeight: 1.1 }}>
                {isDark ? col.spaceHeading : col.heading}
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p style={{ fontFamily: FONT_BODY, fontSize: 16, color: c.muted, maxWidth: 560, margin: "0 auto", lineHeight: 1.75 }}>{col.blurb}</p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ── Projects ── */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "60px 32px 68px" }}>
        {col.projects.length > 0 ? (
          col.projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <ProjectCard p={p} c={c} isDark={isDark} />
            </Reveal>
          ))
        ) : (
          /* Placeholder shown while a collection has no projects yet */
          <Reveal>
            <div style={{ background: c.bgAlt, border: `1px dashed ${c.border}`, borderRadius: 18, padding: "44px 34px", textAlign: "center" }}>
              <Icon src={isDark ? imgPurpleShootingStar : imgTealWave} size={34} />
              <p style={{ fontFamily: FONT_HEAD, fontStyle: "italic", fontSize: 19, color: c.text, margin: "10px 0 6px" }}>
                {isDark ? "Still in orbit. Coming soon." : "Still building. Coming soon."}
              </p>
              <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: c.muted, lineHeight: 1.72 }}>
                Nothing here yet, but there's usually something half-finished on my laptop.
              </p>
            </div>
          </Reveal>
        )}

        <Reveal>
          <div style={{ textAlign: "center", marginTop: 34 }}>
            <button onClick={onBack} className="btn-ghost" style={{ border: `1.5px solid ${c.border}`, color: c.text, background: c.bg }}>
              ← All Projects
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// ── Projects hub ──────────────────────────────────────────────────────────────
export default function Projects({ c, isDark }) {
  const [openId, setOpenId] = useState(null);
  const open = COLLECTIONS.find(col => col.id === openId);

  if (open) {
    return <CollectionView col={open} onBack={() => setOpenId(null)} c={c} isDark={isDark} />;
  }

  return (
    <div>
      <PageHeader
        label={isDark ? "// work" : "~ work"}
        title="Projects"
        subtitle="A collection of my work in software, AI safety, and community-building. Pick a shelf to browse."
        c={c} isDark={isDark}
      />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "68px 32px" }}>
        <div className="cards-row" style={{ display: "flex", gap: 22, marginBottom: 56, alignItems: "stretch" }}>
          {COLLECTIONS.map((col, i) => (
            <Reveal key={col.id} delay={i * 0.1} style={{ flex: 1, display: "flex" }}>
              <CollectionCard col={col} c={c} isDark={isDark} onOpen={() => setOpenId(col.id)} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div style={{ textAlign: "center", padding: "42px", background: c.bgAlt, borderRadius: 20, border: `1px solid ${c.border}`, position: "relative", overflow: "hidden" }}>
            {isDark && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, #1A104060 0%, transparent 70%)", pointerEvents: "none" }} />}
            <p style={{ fontFamily: FONT_HEAD, fontStyle: "italic", fontSize: 22, color: c.text, marginBottom: 7, position: "relative" }}>
              {isDark
                ? <>More in the void <Icon src={imgPurpleShootingStar} size={28} style={{ marginLeft: 2 }} /></>
                : <>More on GitHub <Icon src={imgTealWave} size={28} style={{ marginLeft: 2 }} /></>
              }
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
