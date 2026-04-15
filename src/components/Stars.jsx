// Background decoration components for both themes

// ── Stars background (space mode) ────────────────────────────────────────────
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

// ── Shooting stars (space hero) ───────────────────────────────────────────────
export function ShootingStars() {
  const shots = [
    { x1: "95%", y1: "5%",  x2: "60%", y2: "35%", delay: "0s",   dur: "2.8s" },
    { x1: "80%", y1: "2%",  x2: "50%", y2: "28%", delay: "1.4s", dur: "2.2s" },
    { x1: "70%", y1: "8%",  x2: "38%", y2: "30%", delay: "3.1s", dur: "2.5s" },
    { x1: "88%", y1: "14%", x2: "62%", y2: "40%", delay: "4.8s", dur: "2.0s" },
    { x1: "55%", y1: "1%",  x2: "25%", y2: "22%", delay: "6.2s", dur: "3.0s" },
    { x1: "92%", y1: "20%", x2: "70%", y2: "44%", delay: "8.0s", dur: "2.4s" },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <defs>
          {shots.map((s, i) => (
            <linearGradient key={i} id={`sg${i}`} gradientUnits="userSpaceOnUse"
              x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}>
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

// ── Beach wave + dolphin scene (beach hero) ───────────────────────────────────
export function BeachScene() {
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, pointerEvents: "none", overflow: "hidden" }}>
      <svg viewBox="0 0 1440 220" xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", display: "block" }} preserveAspectRatio="xMidYMax slice">
        <defs>
          {/* Turquoise ocean — matches the beach palette */}
          <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5EC8BC" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3DACA0" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="wave2Grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#80D8CC" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#54BAA8" stopOpacity="0.55" />
          </linearGradient>
          {/* Dolphin — blue-grey like a real bottlenose */}
          <linearGradient id="dolphinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7ABFB8" />
            <stop offset="100%" stopColor="#4E9E98" />
          </linearGradient>
          <linearGradient id="dolphinBelly" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A8D8D4" />
            <stop offset="100%" stopColor="#7ABFB8" />
          </linearGradient>
        </defs>

        {/* Back wave layer */}
        <path fill="url(#wave2Grad)">
          <animate attributeName="d"
            values="M0,140 C200,110 400,165 600,140 C800,115 1000,155 1200,140 C1320,132 1390,136 1440,138 L1440,220 L0,220 Z;M0,148 C200,122 400,152 600,132 C800,108 1000,162 1200,148 C1320,140 1390,144 1440,146 L1440,220 L0,220 Z;M0,140 C200,110 400,165 600,140 C800,115 1000,155 1200,140 C1320,132 1390,136 1440,138 L1440,220 L0,220 Z"
            dur="6s" repeatCount="indefinite" />
        </path>
        {/* Front wave layer */}
        <path fill="url(#oceanGrad)">
          <animate attributeName="d"
            values="M0,162 C180,142 360,178 540,162 C720,146 900,174 1080,162 C1260,150 1350,156 1440,160 L1440,220 L0,220 Z;M0,170 C180,154 360,168 540,154 C720,138 900,170 1080,158 C1260,146 1350,164 1440,168 L1440,220 L0,220 Z;M0,162 C180,142 360,178 540,162 C720,146 900,174 1080,162 C1260,150 1350,156 1440,160 L1440,220 L0,220 Z"
            dur="4.5s" repeatCount="indefinite" />
        </path>
        {/* Foam caps */}
        <g opacity="0.6">
          <ellipse cx="240" cy="158" rx="38" ry="5" fill="white">
            <animate attributeName="cx" values="240;280;240" dur="4.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="4.5s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="720" cy="155" rx="30" ry="4" fill="white">
            <animate attributeName="cx" values="720;760;720" dur="5.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0.15;0.6" dur="5.5s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="1100" cy="157" rx="44" ry="5" fill="white">
            <animate attributeName="cx" values="1100;1060;1100" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="4s" repeatCount="indefinite" />
          </ellipse>
        </g>

        {/* ── Dolphin ── */}
        <g>
          <animateTransform attributeName="transform" type="translate"
            values="-60,0; 180,-80; 380,0; 580,-70; 800,0; 1060,-80; 1300,0; 1540,0"
            keyTimes="0;0.12;0.28;0.40;0.55;0.68;0.84;1"
            dur="9s" repeatCount="indefinite" />

          {/* Main body — torpedo-shaped, pointed at rostrum */}
          <path d="M36,156 C28,147 10,144 -8,148 C-18,151 -24,153 -24,156 C-24,159 -18,162 -8,165 C10,169 28,166 36,156 Z"
            fill="url(#dolphinGrad)" />

          {/* Belly highlight — lighter underside */}
          <path d="M30,159 C20,163 4,165 -10,163 C-18,162 -22,159 -22,157 C-20,160 -16,163 -8,165 C8,168 26,165 30,159 Z"
            fill="url(#dolphinBelly)" opacity="0.6" />

          {/* Rostrum (beak) — clearly pointed forward */}
          <path d="M32,154 L50,156 L32,159 Z" fill="url(#dolphinGrad)" />

          {/* Dorsal fin — tall curved triangle on the back */}
          <path d="M4,145 C2,134 8,126 14,136 C12,140 10,143 6,145 Z" fill="#4E9E98" opacity="0.95" />

          {/* Pectoral fin — small flipper on belly side */}
          <path d="M14,160 C18,166 10,170 4,164 Z" fill="#4E9E98" opacity="0.75" />

          {/* Horizontal flukes — two lobes, key dolphin feature */}
          <path d="M-24,153 C-30,146 -42,143 -36,154 Z" fill="#4E9E98" />
          <path d="M-24,159 C-30,166 -42,169 -36,158 Z" fill="#4E9E98" />
          {/* Fluke notch */}
          <path d="M-36,154 C-38,155 -38,157 -36,158" stroke="#3A8880" strokeWidth="0.8" fill="none" />

          {/* Eye */}
          <circle cx="24" cy="152" r="1.8" fill="#1A3E3C" />
          <circle cx="24.6" cy="151.4" r="0.6" fill="white" />

          {/* Smile */}
          <path d="M24,158 Q30,161 36,158" stroke="#1A3E3C" strokeWidth="0.9" fill="none" strokeLinecap="round" />

          {/* Water splash on entry */}
          <g opacity="0">
            <animate attributeName="opacity" values="0;0;1;0" keyTimes="0;0.26;0.28;0.32" dur="9s" repeatCount="indefinite" />
            <line x1="-6" y1="160" x2="-10" y2="170" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <line x1="0" y1="162" x2="-1" y2="172" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <line x1="6" y1="160" x2="10" y2="170" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          </g>
        </g>

        {/* Seagulls */}
        <g fill="none" stroke="#8AACB8" strokeWidth="1.2" strokeLinecap="round" opacity="0.5">
          <path d="M340,80 Q345,75 350,80"><animateTransform attributeName="transform" type="translate" values="0,0;4,-3;0,0" dur="3s" repeatCount="indefinite" /></path>
          <path d="M350,78 Q355,73 360,78"><animateTransform attributeName="transform" type="translate" values="0,0;4,-3;0,0" dur="3s" repeatCount="indefinite" /></path>
          <path d="M900,60 Q906,54 912,60"><animateTransform attributeName="transform" type="translate" values="0,0;-5,-2;0,0" dur="3.8s" repeatCount="indefinite" /></path>
          <path d="M912,57 Q918,51 924,57"><animateTransform attributeName="transform" type="translate" values="0,0;-5,-2;0,0" dur="3.8s" repeatCount="indefinite" /></path>
        </g>

        {/* Sunset glow */}
        <circle cx="1360" cy="30" r="30" fill="#F5C8A0" opacity="0.25">
          <animate attributeName="r" values="30;33;30" dur="5s" repeatCount="indefinite" />
        </circle>
        <circle cx="1360" cy="30" r="18" fill="#F5C080" opacity="0.35" />
      </svg>
    </div>
  );
}

// ── Beach ambient background (fixed, light mode) ──────────────────────────────
export function BeachDeco() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden", opacity: 0.35 }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <radialGradient id="sun" cx="85%" cy="12%" r="22%">
            <stop offset="0%" stopColor="#F5C880" stopOpacity="0.55" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ocean" cx="50%" cy="100%" r="60%">
            <stop offset="0%" stopColor="#74B8B0" stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#sun)" />
        <rect width="100%" height="100%" fill="url(#ocean)" />
      </svg>
    </div>
  );
}
