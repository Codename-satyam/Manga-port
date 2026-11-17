import { useCallback, useEffect, useRef, useState } from 'react';
import { INTRO as I } from './config.js';

/**
 * Full-screen intro video, shown right after the loading screen.
 * It is mounted (hidden) from the start so it can buffer while the loader runs.
 * When it ends, is skipped, or fails to load, the manga is revealed and the background video starts.
 */
export default function IntroVideo({ vref, active, stop, onDone, onRecruiter }) {
  const reduce = useRef(matchMedia('(prefers-reduced-motion: reduce)').matches).current;
  // Returning visitors are not forced to rewatch it (add ?intro to the URL to replay).
  const seen = useRef((() => { try { return localStorage.getItem('introSeen') === '1' && !location.search.includes('intro'); } catch { return false; } })()).current;
  const skipAll = !I.src || reduce || seen;
  const [phase, setPhase] = useState('wait');      // wait -> play -> out -> gone
  const [muted, setMuted] = useState(false);
  const ended = useRef(false);

  const end = useCallback(() => {
    if (ended.current) return;
    ended.current = true;
    try { localStorage.setItem('introSeen', '1'); } catch { /* storage unavailable */ }
    setPhase('out');
    onDone();                                      // reveal page 1 and start the background while this fades
    setTimeout(() => setPhase('gone'), 900);
  }, [onDone]);

  useEffect(() => {
    if (!active || ended.current) return;
    const v = vref.current;
    if (skipAll || !v) { end(); return; }
    setPhase('play');
    v.currentTime = 0; v.muted = false;
    // Browsers may block sound before any click: fall back to muted playback and offer a sound button.
    v.play().catch(() => { v.muted = true; setMuted(true); v.play().catch(end); });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => { if (stop) { vref.current?.pause(); end(); } }, [stop]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (phase !== 'play') return undefined;
    const esc = (e) => { if (e.key === 'Escape') end(); };
    addEventListener('keydown', esc); return () => removeEventListener('keydown', esc);
  }, [phase, end]);

  const unmute = () => { const v = vref.current; if (v) { v.muted = false; setMuted(false); } };

  if (skipAll || phase === 'gone') return null;
  return (
    <div id="cine" className={phase} role="dialog" aria-modal={phase === 'play'} aria-label="Intro video" aria-hidden={phase === 'wait'}>
      <video ref={vref} playsInline preload="auto" style={{ objectFit: I.fit }} onEnded={end} onError={end}>
        {I.webm && <source src={I.webm} type="video/webm" />}
        <source src={I.src} type="video/mp4" />
      </video>
      {phase === 'play' && (
        <div className="ic">
          {onRecruiter && <button onClick={onRecruiter}>RECRUITER VIEW</button>}
          {muted && <button onClick={unmute}>♪ SOUND ON</button>}
          <button autoFocus onClick={end}>SKIP INTRO ▶▶</button>
        </div>
      )}
    </div>
  );
}
