"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

interface WaveRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export default function HeroBackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let dpr = 1;

    let particles: Particle[] = [];
    const ripples: WaveRipple[] = [];
    const colors = ["#8d6e63", "#a38472", "#d7ccc8", "#b8aca3", "#e6e0d4"];

    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      radius: 180,
      isHovered: false,
    };

    let idleTime = 0;

    // Function to calculate grid and seed particles according to current screen dimensions
    const setupCanvas = () => {
      if (!canvas) return;

      const parent = canvas.parentElement || document.body;
      const rect = parent.getBoundingClientRect();
      width = Math.max(window.innerWidth, rect.width || window.innerWidth);
      height = Math.max(window.innerHeight, rect.height || window.innerHeight);

      const isMobile = width < 768;
      // On mobile / Android, clamp dpr to 1 for maximum 120fps GPU throughput
      dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
      ctx.scale(dpr, dpr);

      // Initialize / reseed particles to cover full width & height
      particles = [];
      const isUltrawide = width > 2000;

      mouse.radius = isMobile ? 110 : isUltrawide ? 220 : 180;
      // Mobile: larger spacing (90px) gives ~35 lightweight particles instead of 300
      const spacing = isMobile ? 90 : isUltrawide ? 62 : 55;

      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;

      for (let i = -1; i < cols; i++) {
        for (let j = -1; j < rows; j++) {
          const x = i * spacing + (Math.random() - 0.5) * 8;
          const y = j * spacing + (Math.random() - 0.5) * 8;
          particles.push({
            x,
            y,
            originX: x,
            originY: y,
            vx: 0,
            vy: 0,
            size: isMobile ? Math.random() * 1.2 + 0.8 : Math.random() * 1.8 + 1.2,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: isMobile ? Math.random() * 0.25 + 0.1 : Math.random() * 0.35 + 0.15,
          });
        }
      }

      if (!mouse.isHovered) {
        mouse.x = mouse.targetX = width / 2;
        mouse.y = mouse.targetY = height / 2;
      }
    };

    setupCanvas();

    // Mouse Listeners attached to window for instant event tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      if (
        clientX >= -80 &&
        clientX <= rect.width + 80 &&
        clientY >= -80 &&
        clientY <= rect.height + 80
      ) {
        mouse.targetX = clientX;
        mouse.targetY = clientY;
        mouse.x = clientX;
        mouse.y = clientY;
        mouse.isHovered = true;
        idleTime = 0;
      } else {
        mouse.isHovered = false;
      }
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
    };

    // Touch Listeners for Mobile / Tablets (passive for zero scroll interruption)
    const handleTouchMove = (e: TouchEvent) => {
      if (!canvas || !e.touches[0]) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches[0].clientX - rect.left;
      const clientY = e.touches[0].clientY - rect.top;

      if (
        clientX >= -40 &&
        clientX <= rect.width + 40 &&
        clientY >= -40 &&
        clientY <= rect.height + 40
      ) {
        mouse.targetX = clientX;
        mouse.targetY = clientY;
        mouse.isHovered = true;
        idleTime = 0;
      } else {
        mouse.isHovered = false;
      }
    };

    const handleTouchEnd = () => {
      mouse.isHovered = false;
    };

    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ("touches" in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ("clientX" in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        return;
      }

      const relX = clientX - rect.left;
      const relY = clientY - rect.top;

      if (relX >= 0 && relX <= rect.width && relY >= 0 && relY <= rect.height) {
        ripples.push({
          x: relX,
          y: relY,
          radius: 0,
          maxRadius: width < 768 ? 140 : 220,
          alpha: 0.8,
        });
      }
    };

    // Resize Handling
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setupCanvas();
      }, 120);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("click", handleClick);

    // Render loop
    const isMobile = width < 768;
    const maxConnectDist = (isMobile ? 90 : 60) * 1.25;

    const render = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Autonomous gentle ambient drift when idle, 1:1 instantaneous response when hovered
      idleTime += 0.012;
      if (!mouse.isHovered) {
        const driftRadiusX = width * 0.22;
        const driftRadiusY = height * 0.16;
        mouse.targetX = width / 2 + Math.cos(idleTime * 0.6) * driftRadiusX;
        mouse.targetY = height / 2 + Math.sin(idleTime * 0.8) * driftRadiusY;
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
      } else {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
      }

      // Update & Draw Click Ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += 3.5;
        rip.alpha *= 0.94;

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(141, 110, 99, ${rip.alpha * 0.6})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (rip.alpha < 0.01 || rip.radius > rip.maxRadius) {
          ripples.splice(r, 1);
        }
      }

      // Calculate dynamic bottom proximity fade (glow vanishes before reaching bottom edge)
      const bottomDist = Math.max(0, height - mouse.y);
      const bottomFade = Math.min(1, Math.max(0, bottomDist / 200));

      // Draw Cursor Ambient Halo
      const baseAlpha = mouse.isHovered ? 0.2 : 0.1;
      const haloAlpha = baseAlpha * bottomFade;

      if (haloAlpha > 0.008) {
        const isLight = document.documentElement.classList.contains("light");
        const haloGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius * 1.5
        );
        if (isLight) {
          haloGrad.addColorStop(0, `rgba(255, 255, 255, ${haloAlpha * 0.95})`);
          haloGrad.addColorStop(0.5, `rgba(235, 225, 210, ${haloAlpha * 0.45})`);
          haloGrad.addColorStop(1, "transparent");
        } else {
          haloGrad.addColorStop(0, `rgba(93, 64, 55, ${haloAlpha})`);
          haloGrad.addColorStop(0.5, `rgba(62, 39, 35, ${haloAlpha * 0.25})`);
          haloGrad.addColorStop(1, "transparent");
        }
        ctx.fillStyle = haloGrad;
        ctx.fillRect(0, 0, width, height);
      }

      const pLen = particles.length;

      for (let i = 0; i < pLen; i++) {
        const p = particles[i];

        // Interaction with mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 14 * bottomFade;
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force * 0.2;
          p.vy -= Math.sin(angle) * force * 0.2;
        }

        // Return force to home grid position (spring physics)
        const homeDx = p.originX - p.x;
        const homeDy = p.originY - p.y;
        p.vx += homeDx * 0.04;
        p.vy += homeDy * 0.04;

        // Friction damping
        p.vx *= 0.86;
        p.vy *= 0.86;

        p.x += p.vx;
        p.y += p.vy;

        // Proximity glow & bottom fade
        const pBottomDist = Math.max(0, height - p.y);
        const pBottomFade = Math.min(1, Math.max(0, pBottomDist / 160));

        let currentAlpha = p.alpha;
        let currentSize = p.size;

        if (dist < mouse.radius) {
          const proximity = 1 - dist / mouse.radius;
          currentAlpha = Math.min(0.85, p.alpha + proximity * 0.6 * bottomFade);
          currentSize = p.size + proximity * 1.6 * bottomFade;
        }

        currentAlpha *= pBottomFade;

        if (currentAlpha > 0.008) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = currentAlpha;
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        // Draw constellation lines between neighbors
        for (let j = i + 1; j < pLen; j++) {
          const p2 = particles[j];
          const lineDx = p.x - p2.x;
          const lineDy = p.y - p2.y;

          // Quick bounding box check before hypotenuse calculation for speed
          if (Math.abs(lineDx) > maxConnectDist || Math.abs(lineDy) > maxConnectDist) {
            continue;
          }

          const lineDist = Math.sqrt(lineDx * lineDx + lineDy * lineDy);

          if (lineDist < maxConnectDist) {
            let lineAlpha = (1 - lineDist / maxConnectDist) * 0.15;

            // Brighten if near cursor
            const midX = (p.x + p2.x) / 2;
            const midY = (p.y + p2.y) / 2;
            const mouseDistMid = Math.sqrt(
              (mouse.x - midX) * (mouse.x - midX) + (mouse.y - midY) * (mouse.y - midY)
            );
            if (mouseDistMid < mouse.radius) {
              lineAlpha += (1 - mouseDistMid / mouse.radius) * 0.3 * bottomFade;
            }

            const p2BottomDist = Math.max(0, height - p2.y);
            const p2BottomFade = Math.min(1, Math.max(0, p2BottomDist / 160));
            const combinedFade = Math.min(pBottomFade, p2BottomFade);

            lineAlpha *= combinedFade;

            if (lineAlpha > 0.008) {
              const isLight = document.documentElement.classList.contains("light");
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = isLight
                ? `rgba(62, 39, 35, ${Math.min(0.35, lineAlpha * 0.9)})`
                : `rgba(230, 224, 212, ${Math.min(0.5, lineAlpha)})`;
              ctx.lineWidth = 0.75;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // IntersectionObserver to freeze canvas when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !animationFrameId) {
            animationFrameId = requestAnimationFrame(render);
          }
        });
      },
      { threshold: 0.05 }
    );

    if (canvas) {
      observer.observe(canvas);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchstart", handleTouchMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 w-full h-full z-0 opacity-80"
      style={{
        maskImage: "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
      }}
    />
  );
}
