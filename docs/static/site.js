// Run after the DOM is fully loaded
window.addEventListener('DOMContentLoaded', () => {
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

  // ---------- Aurora (shader background) ----------
  // NOTE: The code snippet you found is a React component. This site is plain HTML/CSS/JS.
  // We integrate the same effect by mounting it via `aurora.js`.
  //
  // Required files:
  // - docs/static/aurora.js (exports mountAurora)
  // - In your HTML pages, your site.js script tag should be:
  //   <script type="module" src="static/site.js"></script>
  //
  // Where it renders:
  // - Add <div id="aurora"></div>
  //   inside your .hero section (usually near the top).
  // - DO NOT add class="aurora-container" in HTML — site.js adds it automatically.

  let unmountAurora = null;

  // Pull colors from your CSS variables so it always matches your light-mode palette
  function cssVar(name, fallback) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }

  function getAuroraStops() {
    // Light mode beach palette from style.css
    const ocean = cssVar('--accent', '#1E6A7A');
    const seafoam = cssVar('--accent2', '#66C6B6');
    const sand = '#F0D6A5';

    // If you want dark mode to also be “night beach”, you can tweak these later.
    if (root.classList.contains('dark')) {
      return [ocean, seafoam, '#F8FAFF'];
    }
    return [ocean, seafoam, sand];
  }

  async function mountOrUpdateAurora() {
    const ctn = document.getElementById('aurora');
    if (!ctn) return; // only mount on pages that include the container

    // Ensure the container has the right class for the glow/blur CSS.
    // (aurora.js appends a canvas inside this div.)
    ctn.classList.add('aurora-container');
    ctn.setAttribute('aria-hidden', 'true');

    // Unmount existing instance if any
    if (typeof unmountAurora === 'function') {
      unmountAurora();
      unmountAurora = null;
    }

    try {
      // Dynamic import so your site still loads even if aurora.js isn't present yet
      const mod = await import('./aurora.js');
      if (typeof mod.mountAurora !== 'function') return;

      // Equivalent to the React props they showed you:
      // <Aurora colorStops={[...]} blend={0.5} amplitude={1.0} speed={1} />
      unmountAurora = mod.mountAurora('aurora', {
        // Match your site palette (light vs dark)
        colorStops: getAuroraStops(),

        // Stronger / more "ReactBits-like" presence
        blend: 0.75,
        amplitude: 1.35,
        speed: 0.9,
        opacity: 0.85,
      });
    } catch (err) {
      // If aurora.js isn't there yet, don't break the site.
      // You can check the Console for this message while setting it up.
      console.warn('[Aurora] Not mounted:', err);
    }
  }

  // Mount once on load
  mountOrUpdateAurora();

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
  toggle?.addEventListener("click", async () => {
    root.classList.toggle("dark");
    localStorage.setItem("theme", root.classList.contains("dark") ? "dark" : "light");
    updateIcon();

    // Refresh stars when switching themes
    if (root.classList.contains("dark")) {
      makeStars();
    } else {
      clearStars();
    }

    // Update aurora colors for the theme
    await mountOrUpdateAurora();
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
});

// =========================
// AURORA MOUNT
// =========================
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const mountPoint = document.querySelector('#aurora-bg');
    if (!mountPoint) return;

    // aurora.js should export a function like mountAurora or initAurora.
    // If yours exports a different name, tell me the first ~20 lines of aurora.js and I’ll match it.
    const mod = await import('./aurora.js');

    const mountAurora =
      mod.mountAurora || mod.initAurora || mod.default;

    if (typeof mountAurora !== 'function') {
      console.warn('Aurora module loaded but no mount function was found.');
      return;
    }

    mountAurora(mountPoint, {
      // your beachy light-mode colors (edit these)
      colorStops: ['#CFEDE8', '#F2E7D6', '#BFD4F0'],
      amplitude: 1.0,
      blend: 0.6,
      speed: 1.0
    });
  } catch (e) {
    console.error('Aurora mount failed:', e);
  }
});