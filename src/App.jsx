import { useState, useEffect, useRef } from "react";

// ── Themes ────────────────────────────────────────────────────────────────────
const BEACH = {
  id: "beach",
  bg: "#FDF8F0",
  bgAlt: "#F5EDD9",
  bgDeep: "#EDE0C4",
  card: "#FFFCF5",
  text: "#2C1810",
  muted: "#7A6050",
  accent: "#1B7A6E",
  accentLight: "#D4EDE9",
  accentBorder: "#1B7A6E40",
  coral: "#D4603A",
  border: "#E8D8C0",
  nav: "rgba(253,248,240,0.92)",
  starColor: "transparent",
  shadow: "rgba(44,24,16,0.08)",
};

const SPACE = {
  id: "space",
  bg: "#060818",
  bgAlt: "#0D1230",
  bgDeep: "#111840",
  card: "#0E1535",
  text: "#E8EEFF",
  muted: "#8898CC",
  accent: "#A78BFA",
  accentLight: "#1E1540",
  accentBorder: "#A78BFA40",
  coral: "#F472B6",
  border: "#1E2A5A",
  nav: "rgba(6,8,24,0.92)",
  starColor: "#ffffff",
  shadow: "rgba(167,139,250,0.15)",
};

const FONT_HEAD = "'Playfair Display', Georgia, serif";
const FONT_BODY = "'DM Sans', -apple-system, sans-serif";
const FONT_MONO = "'DM Mono', monospace";

// ── Stars background for space mode ──────────────────────────────────────────
function Stars() {
  const stars = Array.from({ length: 140 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    r: Math.random() * 1.8 + 0.3,
    delay: Math.random() * 4,
    dur: Math.random() * 3 + 2,
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <radialGradient id="nebula1" cx="70%" cy="20%" r="40%">
            <stop offset="0%" stopColor="#4B2D8F" stopOpacity="0.18" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nebula2" cx="15%" cy="75%" r="35%">
            <stop offset="0%" stopColor="#1D3A8F" stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#nebula1)" />
        <rect width="100%" height="100%" fill="url(#nebula2)" />
        {stars.map((s) => (
          <circle key={s.id} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} fill="white" opacity="0">
            <animate attributeName="opacity" values="0;0.9;0" dur={`${s.dur}s`} begin={`${s.delay}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    </div>
  );
}

// ── Hero shooting stars (space) ───────────────────────────────────────────────
function ShootingStars() {
  const shots = [
    { x1: "95%", y1: "5%",  x2: "60%", y2: "35%", delay: "0s",    dur: "2.8s" },
    { x1: "80%", y1: "2%",  x2: "50%", y2: "28%", delay: "1.4s",  dur: "2.2s" },
    { x1: "70%", y1: "8%",  x2: "38%", y2: "30%", delay: "3.1s",  dur: "2.5s" },
    { x1: "88%", y1: "14%", x2: "62%", y2: "40%", delay: "4.8s",  dur: "2.0s" },
    { x1: "55%", y1: "1%",  x2: "25%", y2: "22%", delay: "6.2s",  dur: "3.0s" },
    { x1: "92%", y1: "20%", x2: "70%", y2: "44%", delay: "8.0s",  dur: "2.4s" },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="shotGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="70%" stopColor="white" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#C4B5FD" stopOpacity="1" />
          </linearGradient>
          {shots.map((_, i) => (
            <linearGradient key={i} id={`sg${i}`} gradientUnits="userSpaceOnUse"
              x1={shots[i].x1} y1={shots[i].y1} x2={shots[i].x2} y2={shots[i].y2}>
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="60%" stopColor="white" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#C4B5FD" stopOpacity="1" />
            </linearGradient>
          ))}
        </defs>
        {shots.map((s, i) => (
          <g key={i}>
            <line x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
              stroke={`url(#sg${i})`} strokeWidth="1.5" opacity="0">
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.7;1"
                dur={s.dur} begin={s.delay} repeatCount="indefinite" />
              <animate attributeName="x1" values={`${s.x1};${s.x2}`} dur={s.dur} begin={s.delay} repeatCount="indefinite" />
              <animate attributeName="y1" values={`${s.y1};${s.y2}`} dur={s.dur} begin={s.delay} repeatCount="indefinite" />
            </line>
            <circle r="2.5" fill="white" opacity="0">
              <animate attributeName="cx" values={`${s.x1};${s.x2}`} dur={s.dur} begin={s.delay} repeatCount="indefinite" />
              <animate attributeName="cy" values={`${s.y1};${s.y2}`} dur={s.dur} begin={s.delay} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0;0.95;0" keyTimes="0;0.05;0.6;1"
                dur={s.dur} begin={s.delay} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
        {/* Static hero constellation dots */}
        {[
          [12,18],[18,8],[28,22],[8,35],[35,12],[22,40],[42,8],[48,25],[15,48],[38,42],
          [52,15],[60,32],[68,8],[75,20],[82,38],[90,12],[96,28],[5,60],[25,65],[45,58],
          [65,70],[85,55],[92,68],[10,78],[30,82],[55,75],[78,80],[95,85],
        ].map(([x,y],i) => (
          <circle key={`hs${i}`} cx={`${x}%`} cy={`${y}%`} r={Math.random()*1.2+0.4} fill="white" opacity="0">
            <animate attributeName="opacity"
              values={`0;${0.3+Math.random()*0.6};0`}
              dur={`${2+Math.random()*3}s`}
              begin={`${Math.random()*5}s`}
              repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    </div>
  );
}

// ── Beach wave + dolphin scene ────────────────────────────────────────────────
function BeachScene() {
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, pointerEvents: "none", overflow: "hidden" }}>
      <svg viewBox="0 0 1440 220" xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", display: "block" }} preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3BB8A8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#1B7A6E" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id="wave2Grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5CCFC0" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#2A9D8F" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="dolphinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2A9D8F" />
            <stop offset="100%" stopColor="#1B7A6E" />
          </linearGradient>
        </defs>

        {/* Back wave layer */}
        <path fill="url(#wave2Grad)">
          <animate attributeName="d"
            values="
              M0,140 C200,110 400,165 600,140 C800,115 1000,155 1200,140 C1320,132 1390,136 1440,138 L1440,220 L0,220 Z;
              M0,148 C200,122 400,152 600,132 C800,108 1000,162 1200,148 C1320,140 1390,144 1440,146 L1440,220 L0,220 Z;
              M0,140 C200,110 400,165 600,140 C800,115 1000,155 1200,140 C1320,132 1390,136 1440,138 L1440,220 L0,220 Z"
            dur="6s" repeatCount="indefinite" />
        </path>

        {/* Front wave layer */}
        <path fill="url(#oceanGrad)">
          <animate attributeName="d"
            values="
              M0,162 C180,142 360,178 540,162 C720,146 900,174 1080,162 C1260,150 1350,156 1440,160 L1440,220 L0,220 Z;
              M0,170 C180,154 360,168 540,154 C720,138 900,170 1080,158 C1260,146 1350,164 1440,168 L1440,220 L0,220 Z;
              M0,162 C180,142 360,178 540,162 C720,146 900,174 1080,162 C1260,150 1350,156 1440,160 L1440,220 L0,220 Z"
            dur="4.5s" repeatCount="indefinite" />
        </path>

        {/* Foam caps */}
        <g opacity="0.55">
          <ellipse cx="240" cy="158" rx="38" ry="5" fill="white">
            <animate attributeName="cx" values="240;280;240" dur="4.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.55;0.2;0.55" dur="4.5s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="720" cy="155" rx="30" ry="4" fill="white">
            <animate attributeName="cx" values="720;760;720" dur="5.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.55;0.15;0.55" dur="5.5s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="1100" cy="157" rx="44" ry="5" fill="white">
            <animate attributeName="cx" values="1100;1060;1100" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.55;0.2;0.55" dur="4s" repeatCount="indefinite" />
          </ellipse>
        </g>

        {/* Dolphin group — arcs up and splashes back down */}
        <g>
          {/* Full jump arc: moves right, rises, falls */}
          <animateTransform attributeName="transform" type="translate"
            values="-60,0; 180,-80; 380,0; 580,-70; 800,0; 1060,-80; 1300,0; 1540,0"
            keyTimes="0;0.12;0.28;0.40;0.55;0.68;0.84;1"
            dur="9s" repeatCount="indefinite" />

          {/* Dolphin body */}
          <path d="M0,155 C8,148 18,148 26,153 C30,156 28,162 22,164 C14,166 4,162 0,155 Z"
            fill="url(#dolphinGrad)">
            <animate attributeName="d"
              values="
                M0,155 C8,148 18,148 26,153 C30,156 28,162 22,164 C14,166 4,162 0,155 Z;
                M0,153 C8,144 20,143 28,150 C32,153 30,160 24,162 C14,165 3,160 0,153 Z;
                M0,155 C8,148 18,148 26,153 C30,156 28,162 22,164 C14,166 4,162 0,155 Z"
              dur="0.6s" repeatCount="indefinite" />
          </path>
          {/* Dorsal fin */}
          <path d="M10,153 L14,144 L18,152 Z" fill="#1B7A6E" opacity="0.9" />
          {/* Tail fluke */}
          <path d="M-2,156 C-8,150 -14,148 -12,156 C-14,162 -8,162 -2,158 Z" fill="#2A9D8F" />
          {/* Eye */}
          <circle cx="24" cy="154" r="1.4" fill="#0D3D35" />
          <circle cx="24.5" cy="153.5" r="0.5" fill="white" />
          {/* Smile */}
          <path d="M22,158 Q24,160 26,158" stroke="#0D3D35" strokeWidth="0.8" fill="none" strokeLinecap="round" />
          {/* Splash on entry */}
          <g opacity="0">
            <animate attributeName="opacity" values="0;0;1;0" keyTimes="0;0.26;0.28;0.32" dur="9s" repeatCount="indefinite" />
            <line x1="-4" y1="160" x2="-8" y2="168" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <line x1="0" y1="162" x2="-2" y2="171" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <line x1="4" y1="160" x2="8" y2="168" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          </g>
        </g>

        {/* Seagulls */}
        <g fill="none" stroke="#5E7282" strokeWidth="1.2" strokeLinecap="round" opacity="0.45">
          <path d="M340,80 Q345,75 350,80">
            <animateTransform attributeName="transform" type="translate" values="0,0;4,-3;0,0" dur="3s" repeatCount="indefinite" />
          </path>
          <path d="M350,78 Q355,73 360,78">
            <animateTransform attributeName="transform" type="translate" values="0,0;4,-3;0,0" dur="3s" repeatCount="indefinite" />
          </path>
          <path d="M900,60 Q906,54 912,60">
            <animateTransform attributeName="transform" type="translate" values="0,0;-5,-2;0,0" dur="3.8s" repeatCount="indefinite" />
          </path>
          <path d="M912,57 Q918,51 924,57">
            <animateTransform attributeName="transform" type="translate" values="0,0;-5,-2;0,0" dur="3.8s" repeatCount="indefinite" />
          </path>
        </g>

        {/* Sun in upper right */}
        <circle cx="1360" cy="30" r="28" fill="#F5C842" opacity="0.22">
          <animate attributeName="r" values="28;31;28" dur="5s" repeatCount="indefinite" />
        </circle>
        <circle cx="1360" cy="30" r="18" fill="#F5C842" opacity="0.3" />
      </svg>
    </div>
  );
}

// ── Beach deco for light mode ─────────────────────────────────────────────────
function BeachDeco() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden", opacity: 0.35 }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <radialGradient id="sun" cx="85%" cy="12%" r="20%">
            <stop offset="0%" stopColor="#F5C842" stopOpacity="0.5" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ocean" cx="50%" cy="100%" r="60%">
            <stop offset="0%" stopColor="#1B7A6E" stopOpacity="0.12" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#sun)" />
        <rect width="100%" height="100%" fill="url(#ocean)" />
      </svg>
    </div>
  );
}

// ── Scroll animation hook ─────────────────────────────────────────────────────
function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── Reveal wrapper ────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Global styles ─────────────────────────────────────────────────────────────
function useGlobalStyles() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      a { text-decoration: none; color: inherit; }
      button { font-family: inherit; cursor: pointer; }
      .pill { display: inline-block; padding: 3px 12px; border-radius: 999px; font-size: 12px; font-weight: 500; }
      .btn-fill { display: inline-flex; align-items: center; gap: 7px; padding: 12px 26px; border-radius: 10px; font-size: 14px; font-weight: 600; border: none; font-family: ${FONT_BODY}; transition: transform 0.18s, box-shadow 0.18s, opacity 0.18s; text-decoration: none; letter-spacing: 0.01em; }
      .btn-fill:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.18); }
      .btn-ghost { display: inline-flex; align-items: center; gap: 7px; padding: 11px 24px; border-radius: 10px; font-size: 14px; font-weight: 500; background: transparent; font-family: ${FONT_BODY}; transition: transform 0.18s, background 0.18s; text-decoration: none; }
      .btn-ghost:hover { transform: translateY(-2px); }
      .card-lift { transition: transform 0.24s ease, box-shadow 0.24s ease; }
      .card-lift:hover { transform: translateY(-5px); box-shadow: 0 16px 48px rgba(0,0,0,0.12); }
      .nav-lnk { background: none; border: none; cursor: pointer; font-family: ${FONT_BODY}; transition: opacity 0.2s; padding: 4px 0; border-bottom: 2px solid transparent; }
      .nav-lnk.active { border-bottom-color: currentColor; }
      .nav-lnk:hover { opacity: 1 !important; }
      .social-pill { display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 999px; font-size: 13px; font-weight: 500; transition: transform 0.18s, box-shadow 0.18s; text-decoration: none; }
      .social-pill:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.14); }
      @keyframes heroFade { from { opacity:0; transform: translateY(28px); } to { opacity:1; transform: translateY(0); } }
      .hf0 { animation: heroFade 0.7s ease 0.05s both; }
      .hf1 { animation: heroFade 0.7s ease 0.18s both; }
      .hf2 { animation: heroFade 0.7s ease 0.32s both; }
      .hf3 { animation: heroFade 0.7s ease 0.46s both; }
      .hf4 { animation: heroFade 0.7s ease 0.60s both; }
      @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      .float { animation: float 5s ease-in-out infinite; }
      @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
      .shimmer-text {
        background: linear-gradient(90deg, #1B7A6E, #D4603A, #1B7A6E);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: shimmer 4s linear infinite;
      }
      .shimmer-text-space {
        background: linear-gradient(90deg, #A78BFA, #F472B6, #818CF8, #A78BFA);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: shimmer 4s linear infinite;
      }
      @keyframes orbit { from{transform:rotate(0deg) translateX(18px) rotate(0deg)} to{transform:rotate(360deg) translateX(18px) rotate(-360deg)} }
      .orbit { animation: orbit 8s linear infinite; }
      .show-mobile { display: none !important; }
      @media (max-width:680px) {
        .about-row { flex-direction: column !important; }
        .proj-grid { grid-template-columns: 1fr !important; }
        .cards-row { flex-direction: column !important; }
        .cur-row { flex-direction: column !important; gap: 20px !important; }
        .footer-row { flex-direction: column !important; gap: 28px !important; }
        .hide-mobile { display: none !important; }
        .show-mobile { display: flex !important; }
        .hero-btns { flex-direction: column !important; align-items: center !important; }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(link); document.head.removeChild(style); };
  }, []);
}

// ── Wave divider ──────────────────────────────────────────────────────────────
function Wave({ fill, flip }) {
  return (
    <div style={{ lineHeight: 0, transform: flip ? "scaleY(-1)" : "none", marginTop: -1 }}>
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block" }} preserveAspectRatio="none">
        <path d="M0,30 C180,56 360,4 540,30 C720,56 900,4 1080,30 C1260,56 1350,10 1440,30 L1440,60 L0,60 Z" fill={fill} />
      </svg>
    </div>
  );
}

// ── Starfield divider (space mode) ────────────────────────────────────────────
function SpaceDivider({ c }) {
  return (
    <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${c.accent}60, transparent)`, margin: "0 auto", maxWidth: 600 }} />
  );
}

// ── Section divider ───────────────────────────────────────────────────────────
function SectionDivider({ c, isBeach }) {
  return isBeach
    ? null
    : <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${c.border}, transparent)`, margin: "0 48px" }} />;
}

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav({ page, setPage, isDark, setIsDark, c }) {
  const isBeach = !isDark;
  const [menuOpen, setMenuOpen] = useState(false);
  const PAGES = [["home","Home"],["about","About"],["projects","Projects"],["waia","WAIA"],["blog","Blog"]];

  const navigate = (id) => { setPage(id); setMenuOpen(false); };

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 200, background: c.nav, backdropFilter: "blur(18px)", borderBottom: `1px solid ${c.border}` }}>
      {/* Main bar */}
      <div style={{ padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => navigate("home")} style={{ background: "none", border: "none", fontFamily: FONT_HEAD, fontSize: 20, fontWeight: 700, color: c.text, letterSpacing: "-0.3px", whiteSpace: "nowrap", flexShrink: 0, cursor: "pointer" }}>
          {isBeach ? "🌊" : "✦"} Kylie Cruz
        </button>

        {/* Desktop links */}
        <div className="nav-links-inner hide-mobile" style={{ display: "flex", gap: 22, alignItems: "center" }}>
          {PAGES.map(([id, label]) => (
            <button key={id} onClick={() => navigate(id)} className={`nav-lnk${page===id?" active":""}`}
              style={{ fontSize: 14, color: c.text, fontWeight: page===id?600:400, opacity: page===id?1:0.55 }}>
              {label}
            </button>
          ))}
          <button onClick={() => setIsDark(!isDark)} style={{ background: c.bgAlt, border: `1px solid ${c.border}`, borderRadius: 10, padding: "6px 12px", fontSize: 15, color: c.text, transition: "all 0.2s", cursor: "pointer" }} title={isDark ? "Switch to Beach mode" : "Switch to Space mode"}>
            {isDark ? "🏖️" : "🌌"}
          </button>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }} className="show-mobile">
          <button onClick={() => setIsDark(!isDark)} style={{ background: c.bgAlt, border: `1px solid ${c.border}`, borderRadius: 10, padding: "6px 10px", fontSize: 15, color: c.text, cursor: "pointer" }}>
            {isDark ? "🏖️" : "🌌"}
          </button>
          <button onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu"
            style={{ background: "none", border: `1px solid ${c.border}`, borderRadius: 10, padding: "6px 10px", color: c.text, cursor: "pointer", fontSize: 18, lineHeight: 1 }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile dropdown — show-mobile ensures it's hidden on desktop via CSS */}
      {menuOpen && (
        <div className="show-mobile" style={{ flexDirection: "column", borderTop: `1px solid ${c.border}`, background: c.nav, backdropFilter: "blur(18px)", padding: "6px 16px 14px" }}>
          {PAGES.map(([id, label]) => (
            <button key={id} onClick={() => navigate(id)}
              style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", padding: "11px 12px", background: page===id ? c.accentLight : "none", border: "none", borderRadius: 10, fontFamily: FONT_BODY, fontSize: 15, color: page===id ? c.accent : c.text, fontWeight: page===id ? 600 : 400, cursor: "pointer", transition: "background 0.15s" }}>
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer({ c, setPage, isDark }) {
  return (
    <footer style={{ background: c.bgAlt, borderTop: `1px solid ${c.border}`, padding: "52px 32px 32px", position: "relative" }}>
      <div className="footer-row" style={{ maxWidth: 920, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 40, flexWrap: "wrap", marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: FONT_HEAD, fontSize: 22, fontWeight: 700, color: c.text, marginBottom: 5 }}>Kylie Cruz</div>
          <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: c.muted, marginBottom: 18 }}>CS Student · AI Safety · Waterloo, ON</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { icon: isDark ? "📧" : "🐚", label: "kkylie.cruz@gmail.com", href: "mailto:kkylie.cruz@gmail.com" },
              { icon: isDark ? "🔗" : "🌊", label: "linkedin.com/in/kylie-cruz", href: "https://linkedin.com/in/kylie-cruz" },
              { icon: isDark ? "⭐" : "🦀", label: "github.com/kyliecruz", href: "https://github.com/kyliecruz" },
            ].map(({ icon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: FONT_BODY, fontSize: 13, color: c.muted, display: "flex", alignItems: "center", gap: 7, transition: "color 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.color = c.accent}
                onMouseLeave={e => e.currentTarget.style.color = c.muted}>
                {icon} {label}
              </a>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 52 }}>
          <div>
            <div style={{ fontFamily: FONT_BODY, fontSize: 11, fontWeight: 700, color: c.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Pages</div>
            {[["home","Home"],["about","About"],["projects","Projects"],["waia","WAIA"],["blog","Blog"]].map(([id,label]) => (
              <div key={id} style={{ marginBottom: 10 }}>
                <button onClick={() => setPage(id)} style={{ background: "none", border: "none", fontFamily: FONT_BODY, fontSize: 13, color: c.muted, padding: 0, transition: "color 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.color = c.text}
                  onMouseLeave={e => e.currentTarget.style.color = c.muted}>{label}</button>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: FONT_BODY, fontSize: 11, fontWeight: 700, color: c.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Links</div>
            {[["https://github.com/kyliecruz","GitHub"],["https://linkedin.com/in/kylie-cruz","LinkedIn"],["https://v0-waterloo-ai-association.vercel.app/","WAIA Site"]].map(([href,label]) => (
              <div key={label} style={{ marginBottom: 10 }}>
                <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: FONT_BODY, fontSize: 13, color: c.muted, textDecoration: "none", transition: "color 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.color = c.accent}
                  onMouseLeave={e => e.currentTarget.style.color = c.muted}>{label} ↗</a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 920, margin: "0 auto", paddingTop: 22, borderTop: `1px solid ${c.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <span style={{ fontFamily: FONT_BODY, fontSize: 12, color: c.muted }}>© 2026 · Kylie Cruz</span>
        <span style={{ fontFamily: FONT_BODY, fontSize: 12, color: c.muted }}>{isDark ? "🌌 Space Mode" : "🏖️ Beach Mode"}</span>
      </div>
    </footer>
  );
}

// ── Social pills ──────────────────────────────────────────────────────────────
function SocialLinks({ c, isDark, large }) {
  const links = [
    { icon: "✉", label: "Email", href: "mailto:kkylie.cruz@gmail.com" },
    { icon: "in", label: "LinkedIn", href: "https://linkedin.com/in/kylie-cruz" },
    { icon: "⌥", label: "GitHub", href: "https://github.com/kyliecruz" },
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

// ── Page header ───────────────────────────────────────────────────────────────
function PageHeader({ label, title, subtitle, c, isDark }) {
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

// ════════════════════════════════════════════════════════════════════════════
// HOME
// ════════════════════════════════════════════════════════════════════════════
function Home({ setPage, c, isDark }) {
  return (
    <div>
      {/* Hero */}
      <section style={{ position: "relative", background: isDark
        ? "radial-gradient(ellipse at 60% 0%, #1A1050 0%, #060818 60%)"
        : `linear-gradient(160deg, ${c.bgAlt} 0%, ${c.bg} 60%)`,
        padding: "100px 32px 0", overflow: "hidden", minHeight: isDark ? 580 : 620, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>

        {/* Beach: sun glow + animated wave scene + dolphin */}
        {!isDark && (
          <>
            <div style={{ position: "absolute", right: "6%", top: "5%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, #F5C84255 0%, transparent 68%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", left: "-4%", top: "40%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, #D4EDE970 0%, transparent 70%)", pointerEvents: "none" }} />
            <BeachScene />
          </>
        )}

        {/* Space: shooting stars + constellation + planet */}
        {isDark && (
          <>
            <ShootingStars />
            <div style={{ position: "absolute", right: "10%", top: "8%", width: 140, height: 140, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #6D5CE7, #2D1B4E)", boxShadow: "0 0 60px #6D5CE740", pointerEvents: "none", overflow: "hidden" }}>
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
              {isDark ? "✦" : "🌊"} View Projects
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

      {/* Currently */}
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
              {["2nd year CS (Hons) at Wilfrid Laurier University","Founder & President, Waterloo AI Association","Outreach Coordinator, Laurier Computing Society","Planning SF AI safety trip — July 2026","Targeting red-teaming, evaluation & safety engineering roles"].map((item, i) => (
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

      {/* WAIA preview */}
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
              { icon: isDark ? "🔭" : "🧠", title: "Technical Research", desc: "Deep dives into interpretability, evaluation, and alignment." },
              { icon: isDark ? "🪐" : "🌊", title: "Safety Governance", desc: "Understanding risk frameworks and real-world policy tradeoffs." },
              { icon: isDark ? "🌌" : "🤝", title: "Community Building", desc: "Welcoming beginners and connecting students to the AI safety ecosystem." },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card-lift" style={{ flex: 1, minWidth: 200, background: c.card, border: `1px solid ${c.border}`, borderRadius: 18, padding: "28px 22px", boxShadow: isDark ? `0 4px 24px ${c.shadow}` : "none" }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
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

      {/* Contact strip */}
      <section style={{ background: isDark ? c.bgDeep : c.bg, padding: "72px 32px", borderTop: `1px solid ${c.border}` }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontFamily: FONT_HEAD, fontSize: "clamp(26px,4vw,38px)", color: c.text, marginBottom: 10 }}>
              {isDark ? "Transmit a signal 📡" : "Say hello 🐚"}
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

// ════════════════════════════════════════════════════════════════════════════
// ABOUT
// ════════════════════════════════════════════════════════════════════════════
function About({ c, isDark }) {
  return (
    <div>
      <PageHeader label={isDark ? "// about" : "~ about"} title="About Me" c={c} isDark={isDark} />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "68px 32px" }}>
        {/* Bio */}
        <div className="about-row" style={{ display: "flex", gap: 48, marginBottom: 72, alignItems: "flex-start" }}>
          <Reveal style={{ flexShrink: 0 }}>
            <img src="/kylie-headshot.jpeg" alt="Kylie Cruz"
              style={{ width: 196, height: 196, borderRadius: 20, objectFit: "cover", border: `3px solid ${c.border}`, display: "block", marginBottom: 14, boxShadow: isDark ? `0 0 32px ${c.accent}30` : "0 8px 32px rgba(0,0,0,0.10)" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[{ label: "GitHub", href: "https://github.com/kyliecruz" }, { label: "LinkedIn", href: "https://linkedin.com/in/kylie-cruz" }, { label: "Email", href: "mailto:kkylie.cruz@gmail.com" }].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ textAlign: "center", padding: "8px 12px", borderRadius: 10, background: c.bgAlt, border: `1px solid ${c.border}`, fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600, color: c.muted, transition: "color 0.15s, border-color 0.15s" }}
                  onMouseEnter={e => { e.currentTarget.style.color = c.accent; e.currentTarget.style.borderColor = c.accent; }}
                  onMouseLeave={e => { e.currentTarget.style.color = c.muted; e.currentTarget.style.borderColor = c.border; }}>
                  {label} ↗
                </a>
              ))}
            </div>
          </Reveal>
          <div style={{ flex: 1 }}>
            <Reveal delay={0.1}>
              <h2 style={{ fontFamily: FONT_HEAD, fontSize: 30, color: c.text, marginBottom: 14 }}>Hi, I'm Kylie {isDark ? "🚀" : "👋"}</h2>
              <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: c.muted, lineHeight: 1.82, marginBottom: 20 }}>
                I'm a Computer Science (Honours) student at Wilfrid Laurier University focused on AI safety, machine learning, and security-minded engineering. I started working toward an AI safety career in December 2025, and I'm particularly interested in building reliable systems and understanding how technical decisions shape real-world risk.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["BSc CS @ Laurier", "WAIA Founder", "EAG SF 2026 Volunteer", "AI Safety (Dec 2025 →)"].map(tag => (
                  <span key={tag} className="pill" style={{ background: c.accentLight, color: c.accent, border: `1px solid ${c.accentBorder}`, fontFamily: FONT_BODY }}>{tag}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18, marginBottom: 72 }}>
          {[
            { icon: isDark?"🔭":"🧠", title:"Technical Interests", text:"AI safety engineering, evaluation & testing, reliability, and security-minded ML. Practical, measurable work grounded in real-world failure modes." },
            { icon: isDark?"🌌":"🌊", title:"Community & Leadership", text:"Founded WAIA to build a Waterloo-region hub for AI safety and governance. Focused on making it easy for beginners to get started." },
            { icon: isDark?"⚗️":"🔬", title:"Experience", text:"ML data + research support (internship at AMX Research Lab), student leadership, and hands-on operations work at PhysioSage Rehab." },
            { icon: isDark?"🛸":"🧭", title:"Building Toward", text:"Long-term: red-team/security + safety engineering roles. Short-term: stronger fundamentals, better projects, and exposure to evaluation & governance tradeoffs." },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="card-lift" style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 16, padding: "26px", height: "100%", boxShadow: isDark ? `0 4px 20px ${c.shadow}` : "none" }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{item.icon}</div>
                <h3 style={{ fontFamily: FONT_HEAD, fontSize: 18, color: c.text, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: c.muted, lineHeight: 1.7 }}>{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Timeline */}
        <Reveal>
          <h2 style={{ fontFamily: FONT_HEAD, fontSize: 30, color: c.text, marginBottom: 34 }}>
            {isDark ? "Mission Log" : "Timeline"}
          </h2>
        </Reveal>
        {[
          { date:"Apr 2029", label:"Expected graduation — BSc CS (Hons)", note:"Wilfrid Laurier University" },
          { date:"Feb 2026", label:"Volunteered at EA Global San Francisco", note:"EAG SF 2026" },
          { date:"Jan 2026", label:"Founded Waterloo AI Association (WAIA)", note:"Founder & President" },
          { date:"Dec 2025", label:"Started focused AI safety career-building", note:"Current direction" },
        ].map((item, i, arr) => (
          <Reveal key={i} delay={i * 0.1}>
            <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
              <div style={{ textAlign: "right", minWidth: 80, paddingTop: 3, flexShrink: 0 }}>
                <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: c.accent, fontWeight: 500 }}>{item.date}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: c.accent, marginTop: 3, flexShrink: 0, boxShadow: isDark ? `0 0 10px ${c.accent}` : "none" }} />
                {i < arr.length - 1 && <div style={{ width: 1.5, flex: 1, background: c.border, minHeight: 36, margin: "4px 0" }} />}
              </div>
              <div style={{ flex: 1, paddingBottom: 28 }}>
                <div style={{ fontFamily: FONT_BODY, fontSize: 15, color: c.text, fontWeight: 500, marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: c.muted }}>{item.note}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PROJECTS
// ════════════════════════════════════════════════════════════════════════════
const PROJECTS = [
  { title:"AI Failure Modes Demo", desc:"Rule-based loan approval demo showing proxy bias, overconfidence-style outputs, and brittleness from hard thresholds.", tags:["Python","AI Safety","Governance"], url:"https://github.com/kyliecruz/ai-failure-demo", stripe:"#D4603A", spaceStripe:"#F472B6" },
  { title:"Dataset Bias Checker", desc:"Lightweight CSV audit that reports representation and acceptance rates by group and flags large outcome gaps.", tags:["Python","Fairness","Auditing"], url:"https://github.com/kyliecruz/dataset-bias-checker", stripe:"#1B7A6E", spaceStripe:"#3DBDAA" },
  { title:"AI Policy Tradeoff Simulator", desc:"Toy governance simulator that scores policy choices across risk, accountability, innovation, and compliance cost (0–100).", tags:["Python","Policy","Governance"], url:"https://github.com/kyliecruz/ai-policy-simulator", stripe:"#4A72B8", spaceStripe:"#818CF8" },
  { title:"Toy Model Failure Demo", desc:"Toy prediction model that outputs PASS/FAIL + confidence and explains limitations, omitted variables, and misuse risk.", tags:["Python","Interpretability","AI Risk"], url:"https://github.com/kyliecruz/toy-failure-model-demo", stripe:"#7A5BBF", spaceStripe:"#A78BFA" },
];

function Projects({ c, isDark }) {
  return (
    <div>
      <PageHeader label={isDark?"// work":"~ work"} title="Projects" subtitle="A collection of my work in software, AI safety, and community-building." c={c} isDark={isDark} />
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
            <a href="https://github.com/kyliecruz" target="_blank" rel="noopener noreferrer" className="btn-fill" style={{ background: c.text, color: c.bg, position: "relative", boxShadow: isDark ? `0 0 20px ${c.accent}30` : "none" }}>github.com/kyliecruz ↗</a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// WAIA
// ════════════════════════════════════════════════════════════════════════════
function WAIAPage({ c, isDark }) {
  return (
    <div>
      <div style={{ background: c.bgAlt, padding: "68px 32px 56px", textAlign: "center", borderBottom: `1px solid ${c.border}`, position: "relative", overflow: "hidden" }}>
        {isDark && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, #2D1B6940 0%, transparent 60%)", pointerEvents: "none" }} />}
        <div style={{ position: "relative" }}>
          <Reveal>
            <img src="/waia-logo.png" alt="WAIA Logo" style={{ width: 80, height: 80, objectFit: "contain", borderRadius: 18, marginBottom: 20, border: `2px solid ${c.border}`, boxShadow: isDark ? `0 0 24px ${c.accent}40` : "none" }} onError={e => { e.target.style.display = "none"; }} />
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
              {["AI Safety","AI Governance","Student Builders","Waterloo Region"].map(t => <span key={t} className="pill" style={{ background: c.accentLight, color: c.accent, border: `1px solid ${c.accentBorder}`, fontFamily: FONT_MONO, fontSize: 11 }}>{t}</span>)}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 style={{ fontFamily: FONT_HEAD, fontSize: "clamp(30px,5vw,52px)", color: c.text, marginBottom: 14 }}>Waterloo AI Association</h1>
            <p style={{ fontFamily: FONT_BODY, fontSize: 16, color: c.muted, maxWidth: 480, margin: "0 auto 28px", lineHeight: 1.75 }}>A student-led community in the Waterloo region focused on AI safety & governance — beginner-friendly, seriously skills-focused.</p>
            <a href="https://v0-waterloo-ai-association.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn-fill" style={{ background: c.accent, color: "#fff", boxShadow: isDark ? `0 0 24px ${c.accent}50` : "none" }}>Visit WAIA Website →</a>
          </Reveal>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "68px 32px" }}>
        <div style={{ display: "flex", gap: 20, marginBottom: 64, flexWrap: "wrap" }}>
          {[
            { icon: isDark?"🎯":"🎯", title:"Mission", text:"Make AI safety + governance approachable in Waterloo, and help students build the skills + clarity to contribute responsibly." },
            { icon: isDark?"🛸":"🧭", title:"Approach", text:"Beginner-friendly entry points, real projects, and honest discussions about tradeoffs — bridging technical work and policy realities." },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.1} style={{ flex: 1, minWidth: 230 }}>
              <div className="card-lift" style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 18, padding: "28px", height: "100%", boxShadow: isDark ? `0 4px 20px ${c.shadow}` : "none" }}>
                <div style={{ fontSize: 26, marginBottom: 12 }}>{item.icon}</div>
                <h3 style={{ fontFamily: FONT_HEAD, fontSize: 20, color: c.text, marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: c.muted, lineHeight: 1.72 }}>{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h2 style={{ fontFamily: FONT_HEAD, fontSize: 32, color: c.text, marginBottom: 12 }}>What WAIA is</h2>
          <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: c.muted, lineHeight: 1.82, marginBottom: 28, maxWidth: 640 }}>WAIA connects students who want to learn about, discuss, and advocate for responsible AI. We're building a local home in the Waterloo region for people interested in AI risk, safety engineering, governance, and the real-world tradeoffs that shape how AI gets deployed.</p>
        </Reveal>

        <div className="cards-row" style={{ display: "flex", gap: 16, marginBottom: 64 }}>
          {[
            { icon: isDark?"🔭":"🧠", title:"Learning", text:"Intro sessions, reading groups, and discussion nights that make AI safety approachable." },
            { icon: isDark?"🌌":"🎤", title:"Community", text:"Guest speakers, workshops, and meetups connecting Waterloo students to the wider AI safety ecosystem." },
            { icon: isDark?"🛰️":"🛠️", title:"Projects", text:"Beginner-friendly projects — evaluations, audits, demos — to build real skills and portfolio proof." },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.1} style={{ flex: 1 }}>
              <div className="card-lift" style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 16, padding: "24px", boxShadow: isDark ? `0 4px 20px ${c.shadow}` : "none" }}>
                <div style={{ fontSize: 24, marginBottom: 10 }}>{item.icon}</div>
                <h3 style={{ fontFamily: FONT_HEAD, fontSize: 17, color: c.text, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontFamily: FONT_BODY, fontSize: 13, color: c.muted, lineHeight: 1.68 }}>{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div style={{ background: c.bgAlt, borderRadius: 22, padding: "44px 40px", marginBottom: 48, position: "relative", overflow: "hidden" }}>
            {isDark && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, #1D104040 0%, transparent 70%)", pointerEvents: "none" }} />}
            <h2 style={{ fontFamily: FONT_HEAD, fontSize: 26, color: c.text, marginBottom: 6, textAlign: "center", position: "relative" }}>From curious to confident</h2>
            <p style={{ fontFamily: FONT_BODY, fontSize: 13, color: c.muted, textAlign: "center", marginBottom: 36, position: "relative" }}>A simple path — without being overwhelming.</p>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
              {[
                { step:"01", icon: isDark?"🚀":"👋", label:"Start", text:"Intro sessions in plain language plus realistic next steps." },
                { step:"02", icon: isDark?"📡":"📚", label:"Learn", text:"Reading groups focused on understanding over impressing." },
                { step:"03", icon: isDark?"⚗️":"🧪", label:"Build", text:"Beginner-friendly projects that teach evaluation instincts." },
              ].map((item, i) => (
                <div key={i} style={{ flex: 1, minWidth: 140, textAlign: "center", padding: "0 18px" }}>
                  <div style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 500, color: c.accent, letterSpacing: "0.15em", marginBottom: 8, textTransform: "uppercase" }}>{item.step}</div>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
                  <div style={{ fontFamily: FONT_HEAD, fontSize: 17, color: c.text, marginBottom: 6 }}>{item.label}</div>
                  <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: c.muted, lineHeight: 1.65 }}>{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div style={{ textAlign: "center" }}>
            <a href="https://v0-waterloo-ai-association.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn-fill" style={{ background: c.accent, color: "#fff", boxShadow: isDark ? `0 0 24px ${c.accent}50` : "none" }}>Visit WAIA Website →</a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// BLOG
// ════════════════════════════════════════════════════════════════════════════
function Blog({ c, isDark }) {
  const posts = [
    { date:"Jan 2026", title:"Why AI Safety Needs Student Builders", desc:"Reflections on starting early, building community, and learning governance alongside technical work.", url:"/student-builders-post.html" },
    { date:"Jan 2026", title:"Launching the Waterloo AI Association", desc:"Promoting responsible, ethical, and impactful AI across the Waterloo region.", url:"/waia-post.html" },
  ];
  return (
    <div>
      <PageHeader label={isDark?"// writing":"~ writing"} title="Blog" subtitle="Thoughts on AI safety, club updates, and governance frameworks." c={c} isDark={isDark} />
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "68px 32px" }}>
        {posts.map((post, i) => (
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

// ════════════════════════════════════════════════════════════════════════════
// APP
// ════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("home");
  const [isDark, setIsDark] = useState(() => window.matchMedia("(prefers-color-scheme: dark)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => setIsDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  useGlobalStyles();
  const c = isDark ? SPACE : BEACH;

  const navigate = (id) => {
    setPage(id);
    setTimeout(() => window.scrollTo?.({ top: 0, behavior: "smooth" }), 10);
  };

  return (
    <div style={{ fontFamily: FONT_BODY, background: c.bg, color: c.text, minHeight: "100vh", transition: "background 0.5s, color 0.4s", position: "relative" }}>
      {isDark && <Stars />}
      {!isDark && <BeachDeco />}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Nav page={page} setPage={navigate} isDark={isDark} setIsDark={setIsDark} c={c} />
        {page === "home"     && <Home     setPage={navigate} c={c} isDark={isDark} />}
        {page === "about"    && <About    setPage={navigate} c={c} isDark={isDark} />}
        {page === "projects" && <Projects c={c} isDark={isDark} />}
        {page === "waia"     && <WAIAPage c={c} isDark={isDark} />}
        {page === "blog"     && <Blog     c={c} isDark={isDark} />}
        <Footer c={c} setPage={navigate} isDark={isDark} />
      </div>
    </div>
  );
}
