import { useRef, useEffect, useCallback } from "react";

// variant = "spark" → radiating lines (space mode)
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
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const startTimeRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    let resizeTimeout;
    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };
    const ro = new ResizeObserver(handleResize);
    ro.observe(parent);
    resizeCanvas();
    return () => { ro.disconnect(); clearTimeout(resizeTimeout); };
  }, []);

  const easeFunc = useCallback((t) => {
    switch (easing) {
      case "linear": return t;
      case "ease-in": return t * t;
      case "ease-in-out": return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      default: return t * (2 - t);
    }
  }, [easing]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;

    const draw = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p) => {
        const elapsed = timestamp - p.startTime;
        const dur = p.duration || duration;
        if (elapsed >= dur) return false;

        const progress = elapsed / dur;
        const eased = easeFunc(progress);

        if (p.type === "spark") {
          // Radiating line
          const distance = eased * sparkRadius * extraScale;
          const lineLength = sparkSize * (1 - eased);
          const x1 = p.x + distance * Math.cos(p.angle);
          const y1 = p.y + distance * Math.sin(p.angle);
          const x2 = p.x + (distance + lineLength) * Math.cos(p.angle);
          const y2 = p.y + (distance + lineLength) * Math.sin(p.angle);
          ctx.strokeStyle = sparkColor;
          ctx.lineWidth = 2;
          ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();

        } else if (p.type === "ring") {
          // Expanding ripple ring
          const radius = eased * p.maxRadius;
          const opacity = (1 - progress) * 0.6;
          ctx.globalAlpha = opacity;
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI);
          ctx.stroke();
          ctx.globalAlpha = 1;

        } else if (p.type === "drop") {
          // Arcing water droplet with gravity
          const t = progress;
          const dx = Math.cos(p.angle) * p.speed * t * dur * 0.001;
          const dy = Math.sin(p.angle) * p.speed * t * dur * 0.001 + p.gravity * t * t;
          const x = p.x + dx;
          const y = p.y + dy;
          const radius = p.r * (1 - progress * 0.5);
          const opacity = progress < 0.3 ? progress / 0.3 : 1 - (progress - 0.3) / 0.7;
          ctx.globalAlpha = opacity * 0.85;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, 2 * Math.PI);
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        return true;
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationId);
  }, [variant, sparkColor, sparkSize, sparkRadius, sparkCount, duration, easeFunc, extraScale]);

  const handleClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const now = performance.now();

    if (variant === "spark") {
      const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
        type: "spark",
        x, y,
        angle: (2 * Math.PI * i) / sparkCount,
        startTime: now,
      }));
      particlesRef.current.push(...newSparks);

    } else if (variant === "splash") {
      // Two ripple rings with slight delay on the second
      const splashColors = ["#74B8B0", "#A8D8D4"];
      particlesRef.current.push(
        { type: "ring", x, y, startTime: now,          maxRadius: 36, color: splashColors[0], duration: 520 },
        { type: "ring", x, y, startTime: now + 80,     maxRadius: 54, color: splashColors[1], duration: 620 },
      );

      // 8 droplets arcing outward in all directions
      const dropColors = ["#74B8B0", "#5EC8BC", "#E8B2A4", "#A8D8D4"];
      const drops = Array.from({ length: 8 }, (_, i) => {
        const angle = (2 * Math.PI * i) / 8 - Math.PI / 2 + (Math.random() - 0.5) * 0.6;
        return {
          type: "drop",
          x, y,
          angle,
          speed: 38 + Math.random() * 28,
          gravity: 60 + Math.random() * 30,
          r: 2.2 + Math.random() * 1.8,
          color: dropColors[Math.floor(Math.random() * dropColors.length)],
          startTime: now + Math.random() * 40,
          duration: 480 + Math.random() * 180,
        };
      });
      particlesRef.current.push(...drops);
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }} onClick={handleClick}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          userSelect: "none",
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      />
      {children}
    </div>
  );
};

export default ClickSpark;
