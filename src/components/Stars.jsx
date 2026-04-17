import { useMemo } from "react";

// Background decoration components for both themes

// ── Stars background (space mode, all pages) ─────────────────────────────────
export function Stars() {
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

// ── Shooting stars (space mode, home hero + contact section) ─────────────────
// contained=true → position:absolute (scoped to nearest positioned ancestor)
export function ShootingStars({ contained = false }) {
  // Steep downward trajectories — large y-drop, small x-shift
  const shots = [
    { x1: "88%", y1: "2%",  x2: "74%", y2: "52%", delay: "0s",   dur: "2.8s" },
    { x1: "74%", y1: "0%",  x2: "58%", y2: "46%", delay: "1.4s", dur: "2.2s" },
    { x1: "62%", y1: "5%",  x2: "48%", y2: "48%", delay: "3.1s", dur: "2.5s" },
    { x1: "95%", y1: "10%", x2: "80%", y2: "56%", delay: "4.8s", dur: "2.0s" },
    { x1: "50%", y1: "1%",  x2: "36%", y2: "42%", delay: "6.2s", dur: "3.0s" },
    { x1: "82%", y1: "18%", x2: "68%", y2: "62%", delay: "8.0s", dur: "2.4s" },
  ];
  return (
    <div style={{ position: contained ? "absolute" : "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <defs>
          {shots.map((s, i) => (
            <linearGradient key={i} id={`sg${i}`} gradientUnits="userSpaceOnUse"
              x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}>
              {/* tail fades at x1 (top/origin), bright dot leads at x2 (bottom/destination) */}
              <stop offset="0%"   stopColor="white"   stopOpacity="0" />
              <stop offset="60%"  stopColor="white"   stopOpacity="0.85" />
              <stop offset="100%" stopColor="#C4B5FD" stopOpacity="1" />
            </linearGradient>
          ))}
        </defs>
        {shots.map((s, i) => (
          <g key={i}>
            {/* line grows from origin toward the leading dot */}
            <line x1={s.x1} y1={s.y1} x2={s.x1} y2={s.y1}
              stroke={`url(#sg${i})`} strokeWidth="1.5" opacity="0">
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.7;1"
                dur={s.dur} begin={s.delay} repeatCount="indefinite" />
              <animate attributeName="x2" values={`${s.x1};${s.x2}`} dur={s.dur} begin={s.delay} repeatCount="indefinite" />
              <animate attributeName="y2" values={`${s.y1};${s.y2}`} dur={s.dur} begin={s.delay} repeatCount="indefinite" />
            </line>
            {/* dot at x2 — the leading edge, falling downward */}
            <circle r="2.5" fill="#C4B5FD" opacity="0">
              <animate attributeName="cx" values={`${s.x1};${s.x2}`} dur={s.dur} begin={s.delay} repeatCount="indefinite" />
              <animate attributeName="cy" values={`${s.y1};${s.y2}`} dur={s.dur} begin={s.delay} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.95;0.95;0" keyTimes="0;0.1;0.7;1"
                dur={s.dur} begin={s.delay} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
        {/* background twinkling stars */}
        {[
          [12,18],[18,8],[28,22],[8,35],[35,12],[22,40],[42,8],[48,25],[15,48],[38,42],
          [52,15],[60,32],[68,8],[75,20],[82,38],[90,12],[96,28],[5,60],[25,65],[45,58],
          [65,70],[85,55],[92,68],[10,78],[30,82],[55,75],[78,80],[95,85],
        ].map(([x, y], i) => (
          <circle key={`hs${i}`} cx={`${x}%`} cy={`${y}%`} r={Math.random() * 1.2 + 0.4} fill="white" opacity="0">
            <animate attributeName="opacity"
              values={`0;${0.3 + Math.random() * 0.6};0`}
              dur={`${2 + Math.random() * 3}s`}
              begin={`${Math.random() * 5}s`}
              repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    </div>
  );
}

// ── Planet (space mode, all pages) ────────────────────────────────────────────
// overrideStyle lets callers replace position/size when embedding inside a section
export function Planet({ overrideStyle = {} }) {
  return (
    <div style={{ position: "fixed", right: "10%", top: "16%", width: 140, height: 140, ...overrideStyle, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #6D5CE7, #2D1B4E)", boxShadow: "0 0 60px #6D5CE740", pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
      <div style={{ position: "absolute", top: "25%", left: "-10%", right: "-10%", height: 2, background: "#ffffff18", transform: "rotate(-15deg)" }} />
      <div style={{ position: "absolute", top: "45%", left: "-10%", right: "-10%", height: 1, background: "#ffffff10", transform: "rotate(-15deg)" }} />
      <div style={{ position: "absolute", top: "62%", left: "-10%", right: "-10%", height: 3, background: "#ffffff12", transform: "rotate(-15deg)" }} />
      <div className="orbit" style={{ position: "absolute", top: "50%", left: "50%", width: 8, height: 8, borderRadius: "50%", background: "#F472B6", boxShadow: "0 0 10px #F472B6", marginTop: -4, marginLeft: -4 }} />
    </div>
  );
}

// ── Beach wave scene (beach mode, all pages) ──────────────────────────────────
export function BeachScene({ idSuffix = "", showWaves = true, showBirds = true, birdYOffset = 0 }) {
  const birds = useMemo(() => {
    const w = window.innerWidth;
    // x spread scales with viewport: wide on desktop, tighter on mobile
    // ranges are chosen to stay within the slice-clipped visible viewBox x band at each size
    const xMin  = w >= 900 ? 180 : w >= 480 ? 250 : 480;
    const xSpan = w >= 900 ? 1080 : w >= 480 ? 800 : 360;
    return Array.from({ length: 5 }, () => {
      const pts = Array.from({ length: 4 }, () => [
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 14,
      ]);
      return {
        x:       xMin + Math.random() * xSpan,
        // y: 80–120 keeps birds just above the waves (start at y=140) and below the hero buttons
        y:       80 + Math.random() * 40 + birdYOffset,
        flipDur: `${1.4 + Math.random() * 1.0}s`,
        driftValues: `0,0; ${pts.map(p => p.join(",")).join("; ")}; 0,0`,
        driftDur: `${10 + Math.random() * 8}s`,
      };
    });
  }, []);
  return (
    // height: 200px gives the container a defined size so preserveAspectRatio="slice" kicks in,
    // scaling the wave up to fill height rather than shrinking to viewport-width proportions
    // position: absolute anchors to the hero section (position: relative + overflow: hidden),
    // so waves are always visible and correctly clipped regardless of viewport size
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "clamp(180px, 20vw, 280px)", pointerEvents: "none", overflow: "hidden" }}>
      <svg viewBox="0 0 1440 220" xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="xMidYMax slice" overflow="hidden">
        {showWaves && (
          <defs>
            <linearGradient id={`oceanGrad${idSuffix}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5EC8BC" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3DACA0" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id={`wave2Grad${idSuffix}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#80D8CC" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#54BAA8" stopOpacity="0.55" />
            </linearGradient>
          </defs>
        )}

        {showWaves && (<>
          {/* Back wave */}
          <path fill={`url(#wave2Grad${idSuffix})`}>
            <animate attributeName="d"
              values="M0,140 C200,110 400,165 600,140 C800,115 1000,155 1200,140 C1320,132 1390,136 1440,138 L1440,220 L0,220 Z;M0,148 C200,122 400,152 600,132 C800,108 1000,162 1200,148 C1320,140 1390,144 1440,146 L1440,220 L0,220 Z;M0,140 C200,110 400,165 600,140 C800,115 1000,155 1200,140 C1320,132 1390,136 1440,138 L1440,220 L0,220 Z"
              dur="6s" repeatCount="indefinite" />
          </path>
          {/* Front wave */}
          <path fill={`url(#oceanGrad${idSuffix})`}>
            <animate attributeName="d"
              values="M0,162 C180,142 360,178 540,162 C720,146 900,174 1080,162 C1260,150 1350,156 1440,160 L1440,220 L0,220 Z;M0,170 C180,154 360,168 540,154 C720,138 900,170 1080,158 C1260,146 1350,164 1440,168 L1440,220 L0,220 Z;M0,162 C180,142 360,178 540,162 C720,146 900,174 1080,162 C1260,150 1350,156 1440,160 L1440,220 L0,220 Z"
              dur="4.5s" repeatCount="indefinite" />
          </path>
        </>)}

        {/* Seagulls */}
        {showBirds && birds.map((b, i) => (
          <g key={i} transform={`translate(${b.x},${b.y})`}>
            <animateTransform attributeName="transform" type="translate" additive="sum"
              values={b.driftValues}
              keyTimes="0;0.2;0.4;0.6;0.8;1"
              dur={b.driftDur} repeatCount="indefinite" calcMode="spline"
              keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1" />
            <path fill="none" stroke="#7BAABB" strokeWidth="1.5" strokeLinecap="round" opacity="0.65">
              <animate attributeName="d"
                values="M-9,0 Q-5,-1 0,0 Q5,-1 9,0;M-9,0 Q-5,-6 0,0 Q5,-6 9,0;M-9,0 Q-5,2 0,0 Q5,2 9,0;M-9,0 Q-5,-1 0,0 Q5,-1 9,0"
                keyTimes="0;0.3;0.65;1"
                dur={b.flipDur} repeatCount="indefinite" calcMode="spline"
                keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1" />
            </path>
          </g>
        ))}

      </svg>
    </div>
  );
}

// ── Beach ambient background (beach mode, all pages) ─────────────────────────
// isHome=true omits the sun (hero has its own); false shows the centred sun for all other pages
export function BeachDeco({ isHome = false }) {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {!isHome && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle 200px at 50% 50%, rgba(240,144,122,0.38) 0%, rgba(244,176,154,0.18) 50%, transparent 100%)" }} />}
      <div style={{ position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 100%, rgba(116,184,176,0.12) 0%, transparent 60%)" }} />
    </div>
  );
}
