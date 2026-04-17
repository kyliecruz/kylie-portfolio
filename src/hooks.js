import { useState, useEffect, useRef } from "react";
import { FONT_BODY, FONT_MONO } from "./themes";

// ── Scroll-reveal: returns [ref, isVisible] ───────────────────────────────────
export function useScrollReveal() {
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

// ── Injects Google Fonts + global utility CSS once on mount ──────────────────
export function useGlobalStyles() {
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
        display: inline-block;
        padding: 0.05em 0.02em 0.1em;
        background: linear-gradient(90deg, #74B8B0, #74B8B0 35%, #E69C8A 50%, #74B8B0 65%, #74B8B0);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: shimmer 6s linear infinite;
      }
      .shimmer-text-space {
        display: inline-block;
        padding: 0.05em 0.02em 0.1em;
        background: linear-gradient(90deg, #A78BFA, #A78BFA 35%, #F472B6 50%, #A78BFA 65%, #A78BFA);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: shimmer 6s linear infinite;
      }
      @keyframes orbit { from{transform:rotate(0deg) translateX(18px) rotate(0deg)} to{transform:rotate(360deg) translateX(18px) rotate(-360deg)} }
      .orbit { animation: orbit 8s linear infinite; }
      .show-mobile { display: none !important; }
      @media (max-width:900px) {
        .hero-section { min-height: calc(100vh - 70px) !important; }
      }
      @media (max-width:680px) {
        .about-row { flex-direction: column !important; }
        .about-grid { grid-template-columns: 1fr !important; }
        .proj-grid { grid-template-columns: 1fr !important; }
        .cards-row { flex-direction: column !important; }
        .cur-row { flex-direction: column !important; gap: 20px !important; }
        .footer-row { flex-direction: column !important; gap: 28px !important; }
        .hide-mobile { display: none !important; }
        .show-mobile { display: flex !important; }
        .hero-btns { flex-direction: column !important; align-items: center !important; }
        .section-pad { padding: 48px 20px !important; }
        .nav-lnk { padding: 10px 8px !important; min-height: 44px; }
        .btn-fill, .btn-ghost { min-height: 44px; }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(link); document.head.removeChild(style); };
  }, []);
}
