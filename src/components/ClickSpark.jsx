import { useRef, useEffect, useCallback } from "react";

// variant = "spark"  → radiating lines (space mode)
// variant = "splash" → ripple rings + arcing droplets (beach mode)
const ClickSpark = ({
  variant = "spark",
  sparkColor = "#fff",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1.0,
  children,
}) => {
  const canvasRef      = useRef(null);
  const particlesRef   = useRef([]);

  // Keep a live ref to props so the permanent click listener never goes stale
  const variantRef     = useRef(variant);
  const sparkColorRef  = useRef(sparkColor);
  const sparkCountRef  = useRef(sparkCount);
  const sparkRadiusRef = useRef(sparkRadius);
  const sparkSizeRef   = useRef(sparkSize);
  const durationRef    = useRef(duration);
  const extraScaleRef  = useRef(extraScale);

  useEffect(() => { variantRef.current     = variant;     }, [variant]);
  useEffect(() => { sparkColorRef.current  = sparkColor;  }, [sparkColor]);
  useEffect(() => { sparkCountRef.current  = sparkCount;  }, [sparkCount]);
  useEffect(() => { sparkRadiusRef.current = sparkRadius; }, [sparkRadius]);
  useEffect(() => { sparkSizeRef.current   = sparkSize;   }, [sparkSize]);
  useEffect(() => { durationRef.current    = duration;    }, [duration]);
  useEffect(() => { extraScaleRef.current  = extraScale;  }, [extraScale]);

  // ── Keep canvas sized to viewport ──────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const easeFunc = useCallback((t) => {
    switch (easing) {
      case "linear":      return t;
      case "ease-in":     return t * t;
      case "ease-in-out": return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      default:            return t * (2 - t); // ease-out
    }
  }, [easing]);

  // ── Animation loop ──────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const draw = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p) => {
        const elapsed  = timestamp - p.startTime;
        const dur      = p.duration ?? durationRef.current;
        if (elapsed >= dur) return false;
        const progress = elapsed / dur;
        const eased    = easeFunc(progress);

        if (p.type === "spark") {
          const dist = eased * sparkRadiusRef.current * extraScaleRef.current;
          const len  = sparkSizeRef.current * (1 - eased);
          const x1   = p.x + dist       * Math.cos(p.angle);
          const y1   = p.y + dist       * Math.sin(p.angle);
          const x2   = p.x + (dist+len) * Math.cos(p.angle);
          const y2   = p.y + (dist+len) * Math.sin(p.angle);
          ctx.strokeStyle = sparkColorRef.current;
          ctx.lineWidth   = 2;
          ctx.globalAlpha = 1 - progress;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
          ctx.globalAlpha = 1;

        } else if (p.type === "ring") {
          ctx.globalAlpha = (1 - progress) * 0.7;
          ctx.strokeStyle = p.color;
          ctx.lineWidth   = 2;
          ctx.beginPath();
          ctx.arc(p.x, p.y, eased * p.maxRadius, 0, 2 * Math.PI);
          ctx.stroke();
          ctx.globalAlpha = 1;

        } else if (p.type === "drop") {
          const t  = progress;
          const dx = Math.cos(p.angle) * p.speed * t * dur * 0.001;
          const dy = Math.sin(p.angle) * p.speed * t * dur * 0.001 + p.gravity * t * t;
          const r  = p.r * (1 - progress * 0.5);
          const a  = progress < 0.3 ? progress / 0.3 : 1 - (progress - 0.3) / 0.7;
          ctx.globalAlpha = a * 0.9;
          ctx.fillStyle   = p.color;
          ctx.beginPath();
          ctx.arc(p.x + dx, p.y + dy, r, 0, 2 * Math.PI);
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        return true;
      });

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, [easeFunc]);

  // ── Permanent global click listener — reads live values via refs ────────────
  useEffect(() => {
    const handleClick = (e) => {
      const x   = e.clientX;
      const y   = e.clientY;
      const now = performance.now();

      if (variantRef.current === "spark") {
        const count = sparkCountRef.current;
        particlesRef.current.push(
          ...Array.from({ length: count }, (_, i) => ({
            type:      "spark",
            x, y,
            angle:     (2 * Math.PI * i) / count,
            startTime: now,
          }))
        );

      } else {
        // splash — ripple rings + arcing droplets
        particlesRef.current.push(
          { type: "ring", x, y, startTime: now,      maxRadius: 44, color: "#74B8B0", duration: 540 },
          { type: "ring", x, y, startTime: now + 90, maxRadius: 68, color: "#A8D8D4", duration: 680 },
        );
        const dropColors = ["#74B8B0", "#5EC8BC", "#E8B2A4", "#A8D8D4"];
        particlesRef.current.push(
          ...Array.from({ length: 10 }, (_, i) => ({
            type:      "drop",
            x, y,
            angle:     (2 * Math.PI * i) / 10 - Math.PI / 2 + (Math.random() - 0.5) * 0.7,
            speed:     44 + Math.random() * 32,
            gravity:   55 + Math.random() * 35,
            r:         2.5 + Math.random() * 2.0,
            color:     dropColors[Math.floor(Math.random() * dropColors.length)],
            startTime: now + Math.random() * 50,
            duration:  500 + Math.random() * 200,
          }))
        );
      }
    };

    // capture: true so it fires before any stopPropagation in page content
    window.addEventListener("click", handleClick, { capture: true });
    return () => window.removeEventListener("click", handleClick, { capture: true });
  }, []); // empty deps — registered once, lives for the component lifetime

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         "100vw",
          height:        "100vh",
          pointerEvents: "none",
          zIndex:        9999,
        }}
      />
      {children}
    </>
  );
};

export default ClickSpark;
