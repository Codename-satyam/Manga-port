import { useEffect, useRef, useState } from 'react';
import { CONFIG as C } from './config.js';
import { ART } from './art.js';

const pad = (n) => String(n).padStart(2, '0');
const ext = { target: '_blank', rel: 'noopener noreferrer' };
const L = ({ t, items }) => items?.length > 0 && <><dt>{t}</dt><dd><ul>{items.map((x) => <li key={x}>{x}</li>)}</ul></dd></>;

/**
 * Four-panel case study. Every field is optional and a panel only appears when it has real content,
 * so nothing is invented. Fill the fields in src/config.js (see the comment above `projects`).
 */
export default function ProjectDialog({ i, close }) {
  const ref = useRef(null);
  const [mode, setMode] = useState('manga');
  useEffect(() => { if (i != null && ref.current && !ref.current.open) ref.current.showModal(); setMode('manga'); }, [i]);
  const p = i != null ? C.projects[i] : null;
  const eng = p?.eng;
  const shots = (p?.shots || []).filter((x) => x?.src);
  const exec = shots.length > 0 || p?.features?.length > 0 || p?.challenges?.length > 0;
  const out = p?.status || p?.lessons?.length > 0 || p?.next?.length > 0;

  return (
    <dialog ref={ref} aria-labelledby="dt" onClose={close} onClick={(e) => e.target === ref.current && ref.current.close()}>
      {p && (
        <div className="dg">
          <p className="m red">STORY {pad(i + 1)} — {p.tag.toUpperCase()}</p>
          {p.image ? <img className="hero project-hero" src={p.image} alt={`${p.t} project preview`} /> : <svg className="hero" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ART[i] }} />}
          <h3 id="dt" style={{ fontSize: '2.4rem' }}>{p.t}</h3>
          <p className="thread thread-dark">Every developer has a first commit. This is what this one became.</p>
          {eng && (
            <div className="row" role="group" aria-label="Reading mode">
              <button className="btn" aria-pressed={mode === 'manga'} onClick={() => setMode('manga')}>Manga mode</button>
              <button className="btn" aria-pressed={mode === 'eng'} onClick={() => setMode('eng')}>Engineer mode</button>
            </div>
          )}

          {mode === 'manga' ? (
            <div className="cs">
              <section className="cp" style={{ '--k': 0 }}>
                <h4><span>01</span> The setup</h4>
                <p>{p.d}</p>
                {p.firstCommit && <p><b>FIRST COMMIT:</b> {p.firstCommit}</p>}
                <dl>{p.problem && <><dt>PROBLEM</dt><dd>{p.problem}</dd></>}{p.users && <><dt>FOR</dt><dd>{p.users}</dd></>}<dt>FOCUS</dt><dd>{p.focus}</dd></dl>
              </section>
              {(p.stack.length > 0 || p.stackNotes?.length > 0 || eng?.architecture?.length > 0) && (
                <section className="cp" style={{ '--k': 1 }}>
                  <h4><span>02</span> The tools</h4>
                  {p.stack.length > 0 && <div className="stk">{p.stack.map((x) => <span key={x}>{x}</span>)}</div>}
                  {p.stackNotes?.length > 0 && <ul>{p.stackNotes.map((x) => <li key={x}>{x}</li>)}</ul>}
                  {eng?.architecture?.length > 0 && <ul>{eng.architecture.map((x) => <li key={x}>{x}</li>)}</ul>}
                </section>
              )}
              {exec && (
                <section className="cp wide" style={{ '--k': 2 }}>
                  <h4><span>03</span> The move</h4>
                  {shots.length > 0 && <div className="shots">{shots.map((x) => <img key={x.src} src={x.src} alt={x.alt || `${p.t} screenshot`} loading="lazy" decoding="async" onError={(e) => { e.currentTarget.style.display = 'none'; }} />)}</div>}
                  <dl><L t="FEATURES" items={p.features} />{p.challenges?.length > 0 && <><dt>CHALLENGES</dt><dd><ul>{p.challenges.map(([c, s]) => <li key={c}><b>{c}</b> {s}</li>)}</ul></dd></>}</dl>
                </section>
              )}
              {out && (
                <section className="cp" style={{ '--k': 3 }}>
                  <h4><span>04</span> The next chapter</h4>
                  {p.status && <p><b>Status:</b> {p.status}</p>}
                  <dl><L t="LESSONS" items={p.lessons} /><L t="NEXT IMPROVEMENTS" items={p.next} /></dl>
                </section>
              )}
            </div>
          ) : (
            <dl className="eng">
              <dt>STACK</dt><dd>{p.stack.join(' · ') || 'Not listed'}</dd>
              <L t="ARCHITECTURE" items={eng.architecture} /><L t="DATA FLOW" items={eng.dataflow} />
              <L t="DECISIONS" items={eng.decisions} /><L t="KNOWN LIMITATIONS" items={eng.limitations} />
              {eng.code && <><dt>CODE</dt><dd><pre tabIndex={0}>{eng.code}</pre></dd></>}
            </dl>
          )}

          <p className="row">
            {p.demo && <a className="btn p" href={p.demo} {...ext}>View live project</a>}
            {p.github && <a className="btn" href={p.github} {...ext}>Inspect source code</a>}
            {eng && mode === 'manga' && <button className="btn" onClick={() => setMode('eng')}>Explore technical details</button>}
            <button className="btn" autoFocus onClick={() => ref.current.close()}>Back to the page</button>
          </p>
        </div>
      )}
    </dialog>
  );
}
