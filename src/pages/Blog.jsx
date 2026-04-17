import { useState, useEffect } from "react";
import { FONT_HEAD, FONT_BODY, FONT_MONO } from "../themes";
import { Reveal, PageHeader, Icon } from "../components/Shared";
import { imgTealWave, imgPurpleShootingStar, imgPurpleStar, imgTealSeashell } from "../assets";

// ── Add new blog posts here ───────────────────────────────────────────────────
const POSTS = [
  {
    date: "Jan 2026",
    tags: ["AI Safety", "Community"],
    title: "Why AI Safety Needs Student Builders",
    desc: "Reflections on starting early, building community, and learning governance alongside technical work.",
    subtitle: "Reflections on starting early, building community, and learning governance alongside technical work.",
    body: [
      { type: "p", text: "As AI systems grow increasingly powerful and integrated into society, the importance of AI safety and governance cannot be overstated. While much of the focus has been on established researchers and industry leaders, I believe that students have a crucial role to play in shaping the future of AI safety." },
      { type: "p", text: "Students bring fresh perspectives, a willingness to experiment, and a collaborative spirit that is essential for tackling complex challenges. By engaging with AI safety early in their careers, students can contribute to building robust, trustworthy systems while also learning about the ethical and societal implications of their work." },
      { type: "h2", text: "Building Culture, Not Just Code" },
      { type: "p", text: "Student-led initiatives can foster a culture of responsibility and awareness around AI development. Through clubs, hackathons, and research projects, students can create communities that prioritize safety and ethics alongside technical innovation." },
      { type: "blockquote", text: "The goal isn't to produce perfect researchers overnight — it's to make safety-minded thinking the default, not the exception." },
      { type: "h2", text: "What I've Learned Building WAIA" },
      { type: "p", text: "In my own experience, founding the Waterloo AI Association (WAIA) has been an incredible journey of learning and growth. By bringing together like-minded peers, we have been able to explore AI safety topics, host discussions with experts, and work on projects that emphasize responsible AI development." },
      { type: "p", text: "One thing that surprised me: the biggest barrier for most students isn't lack of interest — it's not knowing where to start. Lowering that entry point, making the material approachable, and creating space for honest questions has been the most valuable thing WAIA has done so far." },
      { type: "h2", text: "Starting Early Matters" },
      { type: "p", text: "Students are not just the future of AI — they are active participants in its present. The decisions being made today about how AI systems are built, evaluated, and deployed will shape the world these students graduate into. Getting involved now, even imperfectly, matters." },
      { type: "p", text: "By embracing their role as builders and thinkers in the AI safety space, students can help ensure that AI technologies are developed in a manner that is safe, ethical, and beneficial for all." },
    ],
  },
  {
    date: "Jan 2026",
    tags: ["WAIA", "Community"],
    title: "Launching the Waterloo AI Association",
    desc: "Promoting responsible, ethical, and impactful AI across the Waterloo region.",
    subtitle: "Promoting responsible, ethical, and impactful AI across the Waterloo region.",
    body: [
      { type: "p", text: "I'm excited to announce the launch of the Waterloo AI Association (WAIA), a student-led community focused on responsible artificial intelligence, safety, and governance. WAIA was created to bring together students who are interested not only in building AI systems, but also in understanding their broader societal impacts." },
      { type: "p", text: "As AI systems become more capable and widely deployed, questions around safety, alignment, and governance are becoming increasingly important. While much of this work happens in industry and research labs, students are in a unique position to explore these topics early, ask foundational questions, and develop good technical and ethical instincts without the pressure of commercial deployment." },
      { type: "h2", text: "Bridging Technical Work and Policy" },
      { type: "p", text: "WAIA aims to bridge the gap between technical innovation and policy awareness. Our focus is not limited to machine learning techniques alone, but also includes interpretability, evaluation, risk assessment, and the governance frameworks that shape how AI is developed and deployed in the real world." },
      { type: "blockquote", text: "Responsible AI requires both strong technical understanding and thoughtful engagement with ethics, regulation, and social context." },
      { type: "h2", text: "What We Do" },
      { type: "p", text: "Through reading groups, speaker events, workshops, and open discussions, WAIA provides a space for students from computer science, engineering, policy, and related fields to learn collaboratively. We try to keep things beginner-friendly — you don't need to be an ML expert to care about how AI gets built and deployed." },
      { type: "ul", items: [
        "Intro sessions that explain AI safety in plain language",
        "Reading groups focused on understanding over impressing",
        "Beginner-friendly projects — evaluations, audits, and demos",
        "Connections to the wider AI safety and governance ecosystem",
      ]},
      { type: "h2", text: "Community First" },
      { type: "p", text: "This initiative is also about community. Navigating AI safety and governance can feel isolating when approached alone, especially as a student. WAIA is meant to be a supportive environment where curiosity is encouraged, uncertainty is welcomed, and learning happens collectively." },
      { type: "p", text: "I'm excited to grow WAIA alongside other students who care deeply about building AI systems that are robust, trustworthy, and aligned with human values. If you're interested in AI safety, governance, or simply want to learn more, I'd love for you to be part of this journey." },
    ],
  },
];

// ── Renders a single blog post ────────────────────────────────────────────────
function PostDetail({ post, onBack, c, isDark }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  return (
    <div>
      {/* ── Post header ── */}
      <div style={{ background: c.bgAlt, padding: "56px 32px 48px", borderBottom: `1px solid ${c.border}`, position: "relative", overflow: "hidden" }}>
        {isDark && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center top, #2D1B6940 0%, transparent 70%)", pointerEvents: "none" }} />}
        <div style={{ maxWidth: 680, margin: "0 auto", position: "relative" }}>
          <Reveal>
            <button onClick={onBack}
              style={{ background: "none", border: "none", cursor: "pointer", fontFamily: FONT_BODY, fontSize: 13, color: c.muted, marginBottom: 28, display: "inline-flex", alignItems: "center", gap: 6, padding: 0, transition: "color 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.color = c.accent}
              onMouseLeave={e => e.currentTarget.style.color = c.muted}>
              ← Back to Blog
            </button>
          </Reveal>
          <Reveal delay={0.05}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
              <span className="pill" style={{ background: c.accentLight, color: c.accent, border: `1px solid ${c.accentBorder}`, fontFamily: FONT_MONO, fontSize: 11 }}>
                {isDark ? "◈" : "~"} {post.date}
              </span>
              {post.tags.map(tag => (
                <span key={tag} className="pill" style={{ background: c.accentLight, color: c.accent, border: `1px solid ${c.accentBorder}`, fontFamily: FONT_MONO, fontSize: 11 }}>{tag}</span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 style={{ fontFamily: FONT_HEAD, fontSize: "clamp(32px,5vw,52px)", color: c.text, lineHeight: 1.1, marginBottom: 16 }}>{post.title}</h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p style={{ fontFamily: FONT_HEAD, fontStyle: "italic", fontSize: 18, color: c.muted, lineHeight: 1.65 }}>{post.subtitle}</p>
          </Reveal>
        </div>
      </div>

      {/* ── Post body ── */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "56px 32px 96px" }}>
        {post.body.map((block, i) => {
          if (block.type === "p") return (
            <Reveal key={i} delay={i * 0.03}>
              <p style={{ fontFamily: FONT_BODY, fontSize: 16, color: c.muted, lineHeight: 1.82, marginBottom: 22 }}>{block.text}</p>
            </Reveal>
          );
          if (block.type === "h2") return (
            <Reveal key={i} delay={i * 0.03}>
              <h2 style={{ fontFamily: FONT_HEAD, fontSize: 26, color: c.text, marginTop: 48, marginBottom: 18, lineHeight: 1.2 }}>{block.text}</h2>
            </Reveal>
          );
          if (block.type === "blockquote") return (
            <Reveal key={i} delay={i * 0.03}>
              <blockquote style={{ borderLeft: `3px solid ${c.accent}`, padding: "12px 20px", margin: "28px 0", background: c.bgAlt, borderRadius: "0 10px 10px 0", fontFamily: FONT_HEAD, fontStyle: "italic", fontSize: 16, color: c.muted, lineHeight: 1.7, boxShadow: isDark ? `0 0 16px ${c.accent}18` : "none" }}>
                {block.text}
              </blockquote>
            </Reveal>
          );
          if (block.type === "ul") return (
            <Reveal key={i} delay={i * 0.03}>
              <ul style={{ paddingLeft: 24, marginBottom: 22 }}>
                {block.items.map((item, j) => (
                  <li key={j} style={{ fontFamily: FONT_BODY, fontSize: 16, color: c.muted, lineHeight: 1.75, marginBottom: 8 }}>{item}</li>
                ))}
              </ul>
            </Reveal>
          );
          return null;
        })}

        <Reveal>
          <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: c.muted, marginTop: 48, paddingTop: 32, borderTop: `1px solid ${c.border}` }}>
            — <span style={{ color: c.accent, fontWeight: 600 }}>Kylie Cruz</span>
          </p>
        </Reveal>
      </div>
    </div>
  );
}

// ── Blog list view ────────────────────────────────────────────────────────────
export default function Blog({ c, isDark }) {
  const [selectedPost, setSelectedPost] = useState(null);

  if (selectedPost) {
    return <PostDetail post={selectedPost} onBack={() => setSelectedPost(null)} c={c} isDark={isDark} />;
  }

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
            <button onClick={() => setSelectedPost(post)} className="card-lift"
              style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 18, padding: "32px", marginBottom: 20, display: "block", width: "100%", textAlign: "left", cursor: "pointer", boxShadow: isDark ? `0 4px 24px ${c.shadow}` : "none", position: "relative", overflow: "hidden" }}>
              {isDark && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${c.accent}, ${c.coral})`, boxShadow: `0 0 12px ${c.accent}` }} />}
              {!isDark && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${c.accent}, ${c.coral})` }} />}
              <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: c.accent, fontWeight: 500, marginBottom: 12, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                <img src={isDark ? imgPurpleStar : imgTealSeashell} alt="" style={{ width: 16, height: 16, marginRight: 0, verticalAlign: "middle" }} /> {post.date}
              </div>
              <h2 style={{ fontFamily: FONT_HEAD, fontSize: 23, color: c.text, marginBottom: 10, lineHeight: 1.3 }}>{post.title}</h2>
              <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: c.muted, lineHeight: 1.75, marginBottom: 16 }}>{post.desc}</p>
              <span style={{ fontFamily: FONT_BODY, fontSize: 14, color: c.accent, fontWeight: 600 }}>Read post →</span>
            </button>
          </Reveal>
        ))}

        <Reveal>
          <div style={{ textAlign: "center", padding: "42px", background: c.bgAlt, borderRadius: 20, border: `1px solid ${c.border}`, position: "relative", overflow: "hidden" }}>
            {isDark && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, #1A104060 0%, transparent 70%)", pointerEvents: "none" }} />}
            <p style={{ fontFamily: FONT_HEAD, fontStyle: "italic", fontSize: 21, color: c.text, marginBottom: 7, position: "relative" }}>
              {isDark
                ? <>Transmission incoming... <Icon src={imgPurpleShootingStar} size={18} style={{ marginLeft: 2 }} /></>
                : <>More coming soon <Icon src={imgTealWave} size={18} style={{ marginLeft: 2 }} /></>
              }
            </p>
            <p style={{ fontFamily: FONT_BODY, fontSize: 13, color: c.muted, position: "relative" }}>Writing on AI safety, evaluation, and governance tradeoffs.</p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
