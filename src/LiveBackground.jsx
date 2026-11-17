import { useEffect, useRef } from 'react';

// Add or reorder modes here. 'off' renders nothing.
// Props: density scales the particle count, speed scales how fast they move, redShare is the fraction drawn in red.
export const BG_MODES = ['ink', 'rain', 'embers', 'petals', 'off'];

const BASE = { ink: 8, rain: 90, embers: 70, petals: 45 };
const rnd = (a, b) => a + Math.random() * (b - a);

function spawn(mode, w, h, first, o) {
  const p = { x: rnd(0, w), y: first ? rnd(0, h) : -30, s: rnd(0.5, 1), ph: rnd(0, 6.28), red: Math.random() < o.red };
  if (mode === 'ink') Object.assign(p, { y: rnd(0, h), r: rnd(120, 300), vx: rnd(-0.2, 0.2), vy: rnd(-0.12, 0.12) });
  if (mode === 'rain') Object.assign(p, { x: rnd(0, w + 300), len: rnd(40, 130), v: rnd(14, 26) });
  if (mode === 'embers') Object.assign(p, { y: first ? rnd(0, h) : h + 10, r: rnd(1, 2.6), v: rnd(0.5, 1.6) });
  if (mode === 'petals') Object.assign(p, { r: rnd(3, 6), v: rnd(0.6, 1.4), rot: rnd(0, 6.28) });
  return p;
}

function step(mode, p, w, h, t, o) {
  const k = o.speed;
  if (mode === 'ink') {
    p.x += p.vx * k; p.y += p.vy * k;
    if (p.x < -p.r) p.x = w + p.r; if (p.x > w + p.r) p.x = -p.r;
    if (p.y < -p.r) p.y = h + p.r; if (p.y > h + p.r) p.y = -p.r;
  } else if (mode === 'rain') {
    p.x -= p.v * 0.35 * k; p.y += p.v * k;
    if (p.y > h + p.len) Object.assign(p, spawn(mode, w, h, false, o));
  } else if (mode === 'embers') {
    p.y -= p.v * k; p.x += Math.sin(t * 0.02 + p.ph) * 0.5 * k;
    if (p.y < -10) Object.assign(p, spawn(mode, w, h, false, o));
  } else {
    p.y += p.v * k; p.x += (Math.sin(t * 0.015 + p.ph) * 0.9 + 0.3) * k; p.rot += 0.02 * k;
    if (p.y > h + 20 || p.x > w + 20) Object.assign(p, spawn(mode, w, h, false, o));
  }
}

function draw(ctx, mode, p, t) {
  if (mode === 'ink') {
    const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
    const c = p.red ? '181,31,43' : '242,239,232';
    g.addColorStop(0, `rgba(${c},${p.red ? 0.07 : 0.05})`); g.addColorStop(1, `rgba(${c},0)`);
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.29); ctx.fill();
  } else if (mode === 'rain') {
    ctx.strokeStyle = p.red ? 'rgba(181,31,43,.35)' : `rgba(242,239,232,${0.07 + p.s * 0.12})`;
    ctx.lineWidth = p.s * 1.2; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + p.len * 0.35, p.y - p.len); ctx.stroke();
  } else if (mode === 'embers') {
    ctx.fillStyle = p.red ? `rgba(181,31,43,${0.5 + Math.sin(t * 0.1 + p.ph) * 0.3})` : 'rgba(242,239,232,.35)';
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.29); ctx.fill();
  } else {
    ctx.fillStyle = p.red ? 'rgba(181,31,43,.55)' : 'rgba(242,239,232,.4)';
    ctx.beginPath(); ctx.ellipse(p.x, p.y, p.r * 2.2, p.r, p.rot, 0, 6.29); ctx.fill();
  }
}

export default function LiveBackground({ mode = 'ink', density = 1, speed = 1, redShare = 0.12 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (mode === 'off') return undefined;
    const cv = ref.current, ctx = cv.getContext('2d');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const o = { speed, red: redShare };
    let w = 0, h = 0, parts = [], raf = 0, t = 0;

    const build = () => {
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      w = innerWidth; h = innerHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const scale = Math.min(1.2, Math.max(0.4, (w * h) / (1440 * 900)));
      parts = Array.from({ length: Math.max(1, Math.round(BASE[mode] * scale * density)) }, () => spawn(mode, w, h, true, o));
    };
    const frame = () => {
      t += 1; ctx.clearRect(0, 0, w, h);
      parts.forEach((p) => { if (!reduce) step(mode, p, w, h, t, o); draw(ctx, mode, p, t); });
    };
    const loop = () => { frame(); raf = requestAnimationFrame(loop); };
    const onVis = () => { cancelAnimationFrame(raf); if (!document.hidden && !reduce) loop(); };

    build();
    if (reduce) frame(); else loop(); // reduced motion: one still frame
    addEventListener('resize', build); document.addEventListener('visibilitychange', onVis);
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', build); document.removeEventListener('visibilitychange', onVis); };
  }, [mode, density, speed, redShare]);

  if (mode === 'off') return null;
  return <canvas id="live-bg" ref={ref} aria-hidden="true" />;
}
