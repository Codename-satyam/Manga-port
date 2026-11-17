import { useEffect, useRef, useState } from 'react';

// Original haiku (5-7-5) written for this page. Edit freely.
export const HAIKU = [
  { k: 'Debugging', kj: '虫', lines: ['Silent null pointer', 'hides in the last line I wrote', 'tea cools, I still search'] },
  { k: 'Shipping', kj: '船', lines: ['Push to main at dusk', 'green checks bloom like spring petals', 'the server breathes out'] },
  { k: 'Learning', kj: '学', lines: ['Arrays, loops, then trees', 'each small proof a stepping stone', 'the path grows clearer'] },
  { k: 'Late night', kj: '月', lines: ['Moon over the screen', 'one more function, then I sleep', 'dawn finds me typing'] },
  { k: 'Craft', kj: '剣', lines: ['Refactor, then rest', 'a blade grows keen with grinding', 'clean code, quiet mind'] },
];

/** Pick a theme; the samurai "writes" the haiku line by line. Respects reduced motion. */
export default function Haiku() {
  const reduce = useRef(matchMedia('(prefers-reduced-motion: reduce)').matches).current;
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  const h = HAIKU[i], full = h.lines.join('\n');

  useEffect(() => {
    if (reduce) { setN(full.length); return undefined; }
    setN(0);
    let k = 0;
    const t = setInterval(() => { k += 1; setN(k); if (k >= full.length) clearInterval(t); }, 45);
    return () => clearInterval(t);
  }, [i, full, reduce]);

  return (
    <div className="hk">
      <span className="m red">THE POET’S HOUR</span>
      <ul className="hkc" aria-label="Choose a theme">
        {HAIKU.map((x, j) => <li key={x.k}><button aria-pressed={i === j} onClick={() => setI(j)}>{x.k}</button></li>)}
      </ul>
      <div className="scr">
        <span className="kj" aria-hidden="true">{h.kj}</span>
        <p className="hkt" aria-hidden="true">{full.slice(0, n)}<i className="caret" /></p>
        <p className="sr" role="status">{h.lines.join(', ')}</p>
      </div>
      <span className="m">5 · 7 · 5 — written for this page.</span>
    </div>
  );
}
