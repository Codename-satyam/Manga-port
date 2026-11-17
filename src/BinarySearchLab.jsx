import { useState } from 'react';

const ARR = [3, 8, 14, 21, 27, 34, 41, 49, 56, 63, 72, 80, 91, 97, 105];   // sorted, 15 items
const fresh = () => ({ lo: 0, hi: ARR.length - 1, mid: null, result: null, log: [] });

// One iteration of the loop in the Java sample on the Code page.
function step(t, s) {
  if (s.result !== null) return s;
  const mid = s.lo + Math.floor((s.hi - s.lo) / 2), v = ARR[mid];
  let { lo, hi } = s, result = null, note;
  if (v === t) { result = mid; note = `a[${mid}] = ${v} equals ${t}. Found at index ${mid}.`; }
  else if (v < t) { lo = mid + 1; note = `a[${mid}] = ${v} < ${t}. Discard the left half: lo = ${lo}.`; }
  else { hi = mid - 1; note = `a[${mid}] = ${v} > ${t}. Discard the right half: hi = ${hi}.`; }
  if (result === null && lo > hi) { result = -1; note += ' The range is empty: not found.'; }
  return { lo, hi, mid, result, log: [...s.log, `Step ${s.log.length + 1} (lo=${s.lo}, hi=${s.hi}, mid=${mid}): ${note}`] };
}

export default function BinarySearchLab() {
  const [target, setTarget] = useState(56);
  const [s, setS] = useState(fresh);
  const reset = (t = target) => { setTarget(t); setS(fresh()); };
  const next = () => setS((x) => step(target, x));
  const all = () => setS((x) => { let y = x; while (y.result === null) y = step(target, y); return y; });
  const valid = Number.isInteger(target);

  return (
    <div className="bs">
      <div className="bsc">
        <label>Target value
          <input type="number" value={Number.isNaN(target) ? '' : target} onChange={(e) => reset(e.target.valueAsNumber)} />
        </label>
        <button className="btn p" onClick={next} disabled={!valid || s.result !== null}>Next step</button>
        <button className="btn" onClick={all} disabled={!valid || s.result !== null}>Run to the end</button>
        <button className="btn" onClick={() => reset()}>Reset</button>
      </div>
      <ol className="bsa" aria-label="Sorted array">
        {ARR.map((v, i) => {
          const out = s.mid !== null && (i < s.lo || i > s.hi) && i !== s.mid;
          const cls = i === s.mid ? (s.result === i ? 'hit' : 'mid') : out ? 'out' : '';
          return <li key={v} className={cls}><b>{v}</b><small>{i}</small>{i === s.mid ? <em>mid</em> : i === s.lo && s.result === null ? <em>lo</em> : i === s.hi && s.result === null ? <em>hi</em> : null}</li>;
        })}
      </ol>
      <div className="bsl" role="log" aria-live="polite" tabIndex={0}>
        {s.log.length === 0 ? 'Press “Next step” to run one iteration. Try a value that is not in the array, like 50.' : s.log.map((l) => <p key={l}>{l}</p>)}
        {s.result !== null && <p className="red"><b>{s.result >= 0 ? `Result: index ${s.result}` : 'Result: -1 (not found)'} after {s.log.length} comparison{s.log.length > 1 ? 's' : ''}.</b></p>}
      </div>
      <p className="m full">Each step halves the remaining range, so n sorted items need at most ⌊log₂ n⌋ + 1 comparisons: 4 for these 15 items, O(log n) in general. A linear scan could need all 15.</p>
    </div>
  );
}
