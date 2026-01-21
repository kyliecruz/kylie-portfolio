(() => {
  // ---------- Theme toggle ----------
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIcon");

  // Restore saved theme
  if (localStorage.getItem("theme") === "dark") {
    root.classList.add("dark");
  }

  function updateIcon() {
    if (!icon) return;
    icon.textContent = root.classList.contains("dark") ? "☀️" : "🌙";
  }
  updateIcon();

  // ---------- Stars (night mode only) ----------
  const starsWrap = document.querySelector(".stars");

  function clearStars() {
    if (!starsWrap) return;
    starsWrap.innerHTML = "";
  }

  function makeStars() {
    if (!starsWrap) return;
    clearStars();

    // Only render stars in dark mode
    if (!root.classList.contains("dark")) return;

    const STAR_COUNT = 32;
    for (let i = 0; i < STAR_COUNT; i++) {
      const s = document.createElement("div");
      s.className = "star";
      s.style.left = Math.random() * 100 + "%";
      s.style.top = Math.random() * 55 + "%";
      s.style.animationDelay = (Math.random() * 2.5) + "s";
      s.style.animationDuration = (2 + Math.random() * 2.6) + "s";
      starsWrap.appendChild(s);
    }
  }

  // Create stars only if starting in dark mode
  makeStars();

  // Toggle theme
  toggle?.addEventListener("click", () => {
    root.classList.toggle("dark");
    localStorage.setItem("theme", root.classList.contains("dark") ? "dark" : "light");
    updateIcon();

    // Refresh stars when switching themes
    if (root.classList.contains("dark")) {
      makeStars();
    } else {
      clearStars();
    }
  });

  // ---------- Surf / dolphin click animation ----------
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-wake]");
    if (!el) return;

    // Spawn near click position so it’s always visible (even on mobile)
    const x = e.clientX + window.scrollX;
    const y = e.clientY + window.scrollY;

    const wake = document.createElement("div");
    wake.className = "wake " + el.dataset.wake;
    wake.style.left = (x - 20) + "px";
    wake.style.top = (y - 22) + "px";

    const splash = document.createElement("div");
    splash.className = "splash";
    wake.appendChild(splash);

    document.body.appendChild(wake);

    // Match the upgraded CSS animation duration (~1800ms)
    setTimeout(() => wake.remove(), 1900);
  });

  // ---------- Scroll-linked wave motion ----------
  const waveSvg = document.querySelector(".wave-divider svg");
  let waveTicking = false;

  function updateWave() {
    waveTicking = false;
    if (!waveSvg) return;

    // Looping horizontal offset (matches the +140px width buffer in CSS)
    const loop = 140; // px

    // Scroll -> horizontal offset. Higher = more movement per scroll.
    // (Increased for a more noticeable “scroll-coupled” wave.)
    const speed = root.classList.contains("dark") ? 0.45 : 0.65;

    const x = -((window.scrollY * speed) % loop);
    waveSvg.style.transform = `translateX(${x}px)`;
  }

  function onScroll() {
    if (waveTicking) return;
    waveTicking = true;
    requestAnimationFrame(updateWave);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => requestAnimationFrame(updateWave));
  updateWave();
})();