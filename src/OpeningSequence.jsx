import { useCallback, useEffect, useRef, useState } from 'react';
import { BACKGROUND as B, INTRO as I } from './config.js';

/**
 * Loading screen. The whole site renders underneath it (including the hidden intro and background videos),
 * so when it fades out, fonts are loaded and both videos are buffered. Then the intro video takes over.
 * It never blocks access: "Skip" works at any time, and any failure opens the site anyway.
 */
export default function OpeningSequence({ videoRefs, onDone, onRecruiter }) {
  const reduce = useRef(matchMedia('(prefers-reduced-motion: reduce)').matches).current;
  const wantsVideo = Boolean(B.src || I.src) && !reduce;
  const [phase, setPhase] = useState('loading');
  const [pct, setPct] = useState(0);
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    setPhase('out');
    onDone();                       // hand over to the intro video while the loader fades
    setTimeout(() => setPhase('gone'), 800);
  }, [onDone]);

  useEffect(() => {
    const p = { font: 0, load: document.readyState === 'complete' ? 1 : 0, video: wantsVideo ? 0 : 1, min: 0 };
    let alive = true;
    const update = () => {
      if (!alive) return;
      const v = (p.font + p.load + p.video + p.min) / 4;
      setPct(Math.round(v * 100));
      if (v >= 1) finish();
    };
    const els = wantsVideo ? videoRefs.map((r) => r.current).filter(Boolean) : [];
    const frac = els.map(() => 0);
    const check = () => {
      els.forEach((el, k) => {
        if (el.readyState >= 4 || el.error) frac[k] = 1;
        else if (el.duration && el.buffered.length) frac[k] = Math.min(1, el.buffered.end(el.buffered.length - 1) / el.duration);
      });
      p.video = els.length ? frac.reduce((x, y) => x + y, 0) / els.length : 1;   // a missing video never blocks the site
      update();
    };
    const evs = ['progress', 'loadeddata', 'canplaythrough', 'error'];

    Promise.all(['1em Anton', '1em "Shippori Mincho B1"', '1em "JetBrains Mono"'].map((f) => document.fonts.load(f)))
      .catch(() => {}).finally(() => { p.font = 1; update(); });
    const onLoad = () => { p.load = 1; update(); };
    addEventListener('load', onLoad);
    const tMin = setTimeout(() => { p.min = 1; update(); }, reduce ? 300 : B.minLoadMs);
    const tMax = setTimeout(() => { p.font = p.load = p.video = p.min = 1; update(); }, B.maxWaitMs); // safety net

    els.forEach((el) => evs.forEach((e) => el.addEventListener(e, check)));
    check();
    return () => {
      alive = false; clearTimeout(tMin); clearTimeout(tMax); removeEventListener('load', onLoad);
      els.forEach((el) => evs.forEach((e) => el.removeEventListener(e, check)));
    };
  }, [wantsVideo, reduce, finish, videoRefs]);

  useEffect(() => {
    const esc = (e) => { if (e.key === 'Escape') finish(); };
    addEventListener('keydown', esc); return () => removeEventListener('keydown', esc);
  }, [finish]);

  if (phase === 'gone') return null;
  return (
    <div id="intro" className={phase} role="dialog" aria-modal="true" aria-label="Loading">
      <div className="ld" role="status">
        <div className="sig-mark" aria-label="Satyam Anand signature mark">SA<span>//01</span></div>
        <p className="m red">CHAPTER 00 — LOADING</p>
        <h2>Every developer has a first commit.</h2>
        <p className="opening-line">Watch the page become a story.</p>
        <div className="ldbar" aria-hidden="true"><i style={{ width: `${pct}%` }} /></div>
        <p className="m full">{pct}%</p>
      </div>
      <div className="ic">{onRecruiter && <button onClick={onRecruiter}>RECRUITER VIEW</button>}<button autoFocus onClick={finish}>SKIP ▶▶</button></div>
    </div>
  );
}
