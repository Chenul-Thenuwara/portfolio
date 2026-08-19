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
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 180,
      isHovered: false,
    };

    const ripples: WaveRipple[] = [];
    const particles: Particle[] = [];
    const colors = ["#8d6e63", "#d7ccc8", "#3b82f6", "#10b981", "#e6e0d4"];

    // Initialize grid of interactive nodes
    const spacing = Math.max(55, Math.floor(Math.min(width, height) / 16));
    const cols = Math.ceil(width / spacing) + 1;
    const rows = Math.ceil(height / spacing) + 1;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * spacing + (Math.random() - 0.5) * 12;
        const y = j * spacing + (Math.random() - 0.5) * 12;
        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: 0,
          vy: 0,
          size: Math.random() * 1.8 + 1.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.35 + 0.15,
        });
      }
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      ripples.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0,
        maxRadius: 220,
        alpha: 0.8,
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    canvas.parentElement?.addEventListener("click", handleClick);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse easing
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      // Update & Draw Click Ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += 4;
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

      // Draw Cursor Ambient Halo
      if (mouse.isHovered) {
        const haloGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius * 1.5
        );
        haloGrad.addColorStop(0, "rgba(93, 64, 55, 0.18)");
        haloGrad.addColorStop(0.5, "rgba(59, 130, 246, 0.05)");
        haloGrad.addColorStop(1, "transparent");
        ctx.fillStyle = haloGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // Particle physics & connection lines
      const maxConnectDist = spacing * 1.25;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Interaction with mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && mouse.isHovered) {
          const force = (1 - dist / mouse.radius) * 18;
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force * 0.25;
          p.vy -= Math.sin(angle) * force * 0.25;
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

        if (dist < mouse.radius && mouse.isHovered) {
          const proximity = 1 - dist / mouse.radius;
          currentAlpha = Math.min(0.9, p.alpha + proximity * 0.7);
          currentSize = p.size + proximity * 2;
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
            let lineAlpha = (1 - lineDist / maxConnectDist) * 0.18;
            
            // Brighten if near cursor
            const midX = (p.x + p2.x) / 2;
            const midY = (p.y + p2.y) / 2;
            const mouseDistMid = Math.sqrt(
              (mouse.x - midX) * (mouse.x - midX) + (mouse.y - midY) * (mouse.y - midY)
            );
            if (mouseDistMid < mouse.radius && mouse.isHovered) {
              lineAlpha += (1 - mouseDistMid / mouse.radius) * 0.35;
            }

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = "rgba(230, 224, 212, " + Math.min(0.6, lineAlpha) + ")";
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
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      canvas.parentElement?.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 opacity-80"
    />
  );
}
