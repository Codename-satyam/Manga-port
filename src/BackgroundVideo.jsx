import { useEffect } from 'react';
import { BACKGROUND as B } from './config.js';


export default function BackgroundVideo({ vref, on }) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const v = vref.current;
    if (!v) return;
    if (on && !reduce) v.play().catch(() => {}); else v.pause();
  }, [on, reduce, vref]);

  if (!B.src) return null;
  return (
    <div className="bgv" aria-hidden="true" data-on={String(on)} style={{ '--dim': B.dim, '--gs': B.grayscale ? 1 : 0 }}>
      <video ref={vref} muted loop playsInline preload="auto" poster={B.poster || undefined}>
        {B.webm && <source src={B.webm} type="video/webm" />}
        <source src={B.src} type="video/mp4" />
      </video>
    </div>
  );
}
