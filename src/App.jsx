// This file wires pages and components together.
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

  const navigate = (id) => {
    setPage(id);
    setTimeout(() => window.scrollTo?.({ top: 0, behavior: "smooth" }), 10);
  };

  const pageContent = (
    <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", background: c.bg, color: c.text, minHeight: "100vh", transition: "background 0.5s, color 0.4s", position: "relative" }}>
      {isDark && <Stars />}
      {!isDark && <BeachDeco />}
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
      variant={isDark ? "spark" : "splash"}
      sparkColor="#A78BFA"
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
