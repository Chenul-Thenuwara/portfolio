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

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    let particles: Particle[] = [];
    const ripples: WaveRipple[] = [];
    const colors = ["#8d6e63", "#d7ccc8", "#3b82f6", "#10b981", "#e6e0d4"];

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

      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
      ctx.scale(dpr, dpr);

      // Initialize / reseed particles to cover full width & height
      particles = [];
      const isMobile = width < 768;
      const isUltrawide = width > 2000;
      
      mouse.radius = isMobile ? 130 : isUltrawide ? 220 : 180;
      const spacing = isMobile ? 65 : isUltrawide ? 60 : 55;

      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;

      for (let i = -1; i < cols; i++) {
        for (let j = -1; j < rows; j++) {
          const x = i * spacing + (Math.random() - 0.5) * 10;
          const y = j * spacing + (Math.random() - 0.5) * 10;
          particles.push({
            x,
            y,
            originX: x,
            originY: y,
            vx: 0,
            vy: 0,
            size: isMobile ? Math.random() * 1.5 + 1 : Math.random() * 1.8 + 1.2,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: Math.random() * 0.35 + 0.15,
          });
        }
      }

      if (!mouse.isHovered) {
        mouse.x = mouse.targetX = width / 2;
        mouse.y = mouse.targetY = height / 2;
      }
    };

    setupCanvas();

    // Mouse Listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovered = true;
      idleTime = 0;
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
    };

    // Touch Listeners for Mobile / Tablets
    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.touches[0].clientX - rect.left;
      mouse.targetY = e.touches[0].clientY - rect.top;
      mouse.isHovered = true;
      idleTime = 0;
    };

    const handleTouchEnd = () => {
      mouse.isHovered = false;
    };

    const handleClick = (e: MouseEvent | TouchEvent) => {
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

      ripples.push({
        x: clientX - rect.left,
        y: clientY - rect.top,
        radius: 0,
        maxRadius: width < 768 ? 160 : 240,
        alpha: 0.85,
      });
    };

    // Resize Handling
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setupCanvas();
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    const parentEl = canvas.parentElement || document.body;
    parentEl.addEventListener("mousemove", handleMouseMove);
    parentEl.addEventListener("mouseleave", handleMouseLeave);
    parentEl.addEventListener("touchstart", handleTouchMove, { passive: true });
    parentEl.addEventListener("touchmove", handleTouchMove, { passive: true });
    parentEl.addEventListener("touchend", handleTouchEnd, { passive: true });
    parentEl.addEventListener("click", handleClick);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Autonomous gentle ambient drift when idle
      idleTime += 0.015;
      if (!mouse.isHovered) {
        const driftRadiusX = width * 0.25;
        const driftRadiusY = height * 0.18;
        mouse.targetX = width / 2 + Math.cos(idleTime * 0.7) * driftRadiusX;
        mouse.targetY = height / 2 + Math.sin(idleTime * 0.9) * driftRadiusY;
      }

      // Smooth mouse easing
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Update & Draw Click Ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += 3.8;
        rip.alpha *= 0.94;

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(141, 110, 99, ${rip.alpha * 0.65})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (rip.alpha < 0.01 || rip.radius > rip.maxRadius) {
          ripples.splice(r, 1);
        }
      }

      // Draw Cursor Ambient Halo
      const haloAlpha = mouse.isHovered ? 0.22 : 0.12;
      const haloGrad = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        mouse.radius * 1.5
      );
      haloGrad.addColorStop(0, `rgba(93, 64, 55, ${haloAlpha})`);
      haloGrad.addColorStop(0.5, `rgba(59, 130, 246, ${haloAlpha * 0.4})`);
      haloGrad.addColorStop(1, "transparent");
      ctx.fillStyle = haloGrad;
      ctx.fillRect(0, 0, width, height);

      // Particle physics & connection lines
      const maxConnectDist = (width < 768 ? 65 : 60) * 1.25;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Interaction with mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 16;
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force * 0.22;
          p.vy -= Math.sin(angle) * force * 0.22;
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

        // Proximity glow
        let currentAlpha = p.alpha;
        let currentSize = p.size;

        if (dist < mouse.radius) {
          const proximity = 1 - dist / mouse.radius;
          currentAlpha = Math.min(0.9, p.alpha + proximity * 0.65);
          currentSize = p.size + proximity * 1.8;
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Draw constellation lines between neighbors
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const lineDx = p.x - p2.x;
          const lineDy = p.y - p2.y;
          const lineDist = Math.sqrt(lineDx * lineDx + lineDy * lineDy);

          if (lineDist < maxConnectDist) {
            let lineAlpha = (1 - lineDist / maxConnectDist) * 0.16;

            // Brighten if near cursor
            const midX = (p.x + p2.x) / 2;
            const midY = (p.y + p2.y) / 2;
            const mouseDistMid = Math.sqrt(
              (mouse.x - midX) * (mouse.x - midX) + (mouse.y - midY) * (mouse.y - midY)
            );
            if (mouseDistMid < mouse.radius) {
              lineAlpha += (1 - mouseDistMid / mouse.radius) * 0.32;
            }

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = "rgba(230, 224, 212, " + Math.min(0.55, lineAlpha) + ")";
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      parentEl.removeEventListener("mousemove", handleMouseMove);
      parentEl.removeEventListener("mouseleave", handleMouseLeave);
      parentEl.removeEventListener("touchstart", handleTouchMove);
      parentEl.removeEventListener("touchmove", handleTouchMove);
      parentEl.removeEventListener("touchend", handleTouchEnd);
      parentEl.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 w-full h-full z-0 opacity-80"
    />
  );
}
