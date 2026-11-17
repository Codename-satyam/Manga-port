import { useEffect, useRef } from 'react';
import { CONFIG as C } from './config.js';

const P = C.profile;
const ext = { target: '_blank', rel: 'noopener noreferrer' };

/** Fast, plain overview for recruiters. Reachable from the loader, the intro and the page bar. */
export default function RecruiterView({ open, onClose, onEnter }) {
  const head = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    head.current?.focus();
    const esc = (e) => { if (e.key === 'Escape') onClose(); };
    addEventListener('keydown', esc);
    return () => removeEventListener('keydown', esc);
  }, [open, onClose]);
  if (!open) return null;

  const featured = (C.featured || [0, 1, 2]).map((i) => C.projects[i]).filter(Boolean);
  const certs = C.training.slice(0, -1);   // last entry is a forward-looking note
  const hasLinks = P.email || P.github || P.linkedin || P.resume;

  return (
    <div id="rv" role="dialog" aria-modal="true" aria-labelledby="rvt">
      <div className="rvi">
        <div className="rvb">
          <span className="m red">RECRUITER VIEW</span>
          <span className="row">
            <button className="btn p" onClick={onEnter}>Enter the full manga ▶</button>
            <button className="btn" onClick={onClose}>Close</button>
          </span>
        </div>
        <header>
          <h1 id="rvt" tabIndex={-1} ref={head}>Satyam Anand</h1>
          <p className="rv-thread">Every developer has a first commit.</p>
          <p className="rvs">Full Stack Developer in progress · {C.details[0]} · {C.details[1]}</p>
          <p>{C.focus}</p>
          {hasLinks ? (
            <p className="row">
              {P.email && <a className="btn p" href={`mailto:${P.email}`}>Email</a>}
              {P.github && <a className="btn" href={P.github} {...ext}>GitHub</a>}
              {P.linkedin && <a className="btn" href={P.linkedin} {...ext}>LinkedIn</a>}
              {P.resume && <a className="btn" href={P.resume} download>Download resume</a>}
            </p>
          ) : <p className="m">Contact links are being added.</p>}
        </header>

        <section aria-labelledby="rvk">
          <h2 id="rvk">Technical skills</h2>
          <ul className="rvl">{C.skills.map((s) => <li key={s.n}><b>{s.s}</b> {s.i.join(' · ')}</li>)}</ul>
        </section>

        <section aria-labelledby="rvp">
          <h2 id="rvp">Featured projects</h2>
          <ul className="rvg">
            {featured.map((p) => (
              <li key={p.t}>
                <h3>{p.t}</h3><span className="m">{p.tag}</span>
                <p>{p.d}</p>
                {p.stack.length > 0 && <p className="m">{p.stack.join(' · ')}</p>}
                {(p.github || p.demo) && (
                  <p className="row">
                    {p.demo && <a className="btn p" href={p.demo} {...ext}>Live project</a>}
                    {p.github && <a className="btn" href={p.github} {...ext}>Source code</a>}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="rvc">
          <h2 id="rvc">Learning and certifications</h2>
          <ul className="rvl">{certs.map(([t, d]) => <li key={t}><b>{t}</b> {d}</li>)}</ul>
        </section>
      </div>
    </div>
  );
}
