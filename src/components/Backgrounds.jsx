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

// ── Shooting stars for space hero ─────────────────────────────────────────────
export function ShootingStars() {
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
        {/* Constellation dots */}
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

// ── Animated beach wave + dolphin scene ───────────────────────────────────────
export function BeachScene() {
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

        {/* Back wave */}
        <path fill="url(#wave2Grad)">
          <animate attributeName="d"
            values="
              M0,140 C200,110 400,165 600,140 C800,115 1000,155 1200,140 C1320,132 1390,136 1440,138 L1440,220 L0,220 Z;
              M0,148 C200,122 400,152 600,132 C800,108 1000,162 1200,148 C1320,140 1390,144 1440,146 L1440,220 L0,220 Z;
              M0,140 C200,110 400,165 600,140 C800,115 1000,155 1200,140 C1320,132 1390,136 1440,138 L1440,220 L0,220 Z"
            dur="6s" repeatCount="indefinite" />
        </path>

        {/* Front wave */}
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

        {/* Dolphin */}
        <g>
          <animateTransform attributeName="transform" type="translate"
            values="-60,0; 180,-80; 380,0; 580,-70; 800,0; 1060,-80; 1300,0; 1540,0"
            keyTimes="0;0.12;0.28;0.40;0.55;0.68;0.84;1"
            dur="9s" repeatCount="indefinite" />
          <path d="M0,155 C8,148 18,148 26,153 C30,156 28,162 22,164 C14,166 4,162 0,155 Z"
            fill="url(#dolphinGrad)">
            <animate attributeName="d"
              values="
                M0,155 C8,148 18,148 26,153 C30,156 28,162 22,164 C14,166 4,162 0,155 Z;
                M0,153 C8,144 20,143 28,150 C32,153 30,160 24,162 C14,165 3,160 0,153 Z;
                M0,155 C8,148 18,148 26,153 C30,156 28,162 22,164 C14,166 4,162 0,155 Z"
              dur="0.6s" repeatCount="indefinite" />
          </path>
          <path d="M10,153 L14,144 L18,152 Z" fill="#1B7A6E" opacity="0.9" />
          <path d="M-2,156 C-8,150 -14,148 -12,156 C-14,162 -8,162 -2,158 Z" fill="#2A9D8F" />
          <circle cx="24" cy="154" r="1.4" fill="#0D3D35" />
          <circle cx="24.5" cy="153.5" r="0.5" fill="white" />
          <path d="M22,158 Q24,160 26,158" stroke="#0D3D35" strokeWidth="0.8" fill="none" strokeLinecap="round" />
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

        {/* Sun */}
        <circle cx="1360" cy="30" r="28" fill="#F5C842" opacity="0.22">
          <animate attributeName="r" values="28;31;28" dur="5s" repeatCount="indefinite" />
        </circle>
        <circle cx="1360" cy="30" r="18" fill="#F5C842" opacity="0.3" />
      </svg>
    </div>
  );
}

// ── Beach background gradient (light mode) ────────────────────────────────────
export function BeachDeco() {
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
