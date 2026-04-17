// ── App.jsx — top-level router and layout ─────────────────────────────────────
// This file wires everything together. It owns:
//   • Theme state (isDark): reads OS preference, toggleable via Nav
//   • Page state (page): single-page routing — no URL changes, just state swaps
//   • Global decorations: Stars (space) and BeachDeco (beach) render behind all content
//   • ClickSpark: click particle effect that wraps the entire app
//
// To add a new page:
//   1. Create src/pages/YourPage.jsx  (copy the pattern from any existing page)
//   2. Add:  import YourPage from "./pages/YourPage";
//   3. Add:  {page === "yourpage" && <YourPage c={c} isDark={isDark} />}
//   4. Add the route to Nav.jsx (PAGES array) and Footer.jsx (Pages column)
//
// To edit a page, open src/pages/<PageName>.jsx
// To edit the nav/footer, open src/components/Nav.jsx or Footer.jsx
// To change colours/fonts, open src/themes.js

import { useState, useEffect } from "react";
import { BEACH, SPACE } from "./themes";
import { useGlobalStyles } from "./hooks";
import { Stars, BeachDeco } from "./components/Stars";
import ClickSpark from "./components/ClickSpark";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Waia from "./pages/Waia";
import Blog from "./pages/Blog";

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

  // Switches page and scrolls back to top (slight delay so React re-renders first)
  const navigate = (id) => {
    setPage(id);
    setTimeout(() => window.scrollTo?.({ top: 0, behavior: "smooth" }), 10);
  };

  const pageContent = (
    <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", background: c.bg, color: c.text, minHeight: "100vh", transition: "background 0.5s, color 0.4s", position: "relative" }}>
      {/* Fixed background decorations — sit at z=0, behind all page content (z=1) */}
      {isDark && <Stars />}
      {/* isHome=true → BeachDeco skips its sun (home hero has its own per-section sun) */}
      {!isDark && <BeachDeco isHome={page === "home"} />}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Nav page={page} setPage={navigate} isDark={isDark} setIsDark={setIsDark} c={c} />
        {page === "home"     && <Home     setPage={navigate} c={c} isDark={isDark} />}
        {page === "about"    && <About    c={c} isDark={isDark} />}
        {page === "projects" && <Projects c={c} isDark={isDark} />}
        {page === "waia"     && <Waia     c={c} isDark={isDark} />}
        {page === "blog"     && <Blog     c={c} isDark={isDark} />}
        <Footer c={c} setPage={navigate} isDark={isDark} />
      </div>
    </div>
  );

  return (
    <ClickSpark
      variant="spark"
      sparkColor={isDark ? "#A78BFA" : "#5EC8BC"}
      sparkSize={12}
      sparkRadius={20}
      sparkCount={10}
      duration={500}
      extraScale={1.2}
    >
      {pageContent}
    </ClickSpark>
  );
}
