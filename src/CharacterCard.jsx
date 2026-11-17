import { useEffect, useRef, useState } from 'react';
import { CONFIG as C, IMG, CARD } from './config.js';

const field = (label) => C.dossier.find(([l]) => l === label)?.[1];

/** Radar chart of the skill areas. Each axis is one area from CONFIG.skills; its length is how many tools are listed there. */
function Radar() {
  const n = C.skills.length, max = Math.max(...C.skills.map((s) => s.i.length));
  const c = 150, R = 100;
  const pt = (k, r) => { const a = -Math.PI / 2 + (2 * Math.PI * k) / n; return [c + r * Math.cos(a), c + r * Math.sin(a)]; };
  const ring = (f) => C.skills.map((_, k) => pt(k, R * f).map((v) => v.toFixed(1)).join(',')).join(' ');
  const shape = C.skills.map((s, k) => pt(k, R * (s.i.length / max)).map((v) => v.toFixed(1)).join(',')).join(' ');
  return (
    <svg viewBox="0 0 300 300" role="img" aria-label={`Radar chart of skill areas by number of tools listed: ${C.skills.map((s) => `${s.s} ${s.i.length}`).join(', ')}`}>
      <circle cx={c} cy={c} r="118" fill="#080808" />
      {[0.25, 0.5, 0.75, 1].map((f) => <polygon key={f} points={ring(f)} fill="none" stroke="#F2EFE8" strokeOpacity=".35" strokeWidth="1" />)}
      {C.skills.map((_, k) => { const [x, y] = pt(k, R); return <line key={k} x1={c} y1={c} x2={x} y2={y} stroke="#F2EFE8" strokeOpacity=".45" strokeWidth="1" />; })}
      <polygon points={shape} fill="#F2EFE8" fillOpacity=".6" stroke="#B51F2B" strokeWidth="3" strokeLinejoin="round" />
      {C.skills.map((s, k) => { const [x, y] = pt(k, R * (s.i.length / max)); return <circle key={s.n} cx={x} cy={y} r="4" fill="#B51F2B" stroke="#F2EFE8" strokeWidth="1.5" />; })}
      {C.skills.map((s, k) => { const [x, y] = pt(k, 139); return <text key={s.n} x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize="25" fontFamily="var(--d)" fill="#080808" aria-hidden="true">{s.g}</text>; })}
    </svg>
  );
}

/**
 * Character profile in the style of a manga guidebook spread: title tab, kanji heading, radar chart with notes,
 * full-bleed portrait with a banner, and a slash-separated profile table. Everything is read from config.js.
 * Opens as a modal <dialog>: focus is trapped, Escape closes it and the page behind is inert.
 */
export default function CharacterCard({ open, onClose }) {
  const dlg = useRef(null);
  const [noImg, setNoImg] = useState(false);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const name = field('SUBJECT') || 'Satyam Anand';
  const role = field('ROLE') || 'Developer in progress';
  const rows = [
    ['ROLE', role], ['STUDIES', C.details[0]], ['PRIMARY TECH', field('PRIMARY TECH')], ['SPECIALISATION', field('SPECIALISATION')],
    ['PROJECTS', `${C.projects.length} built`], ...CARD.stats.map(([v, l]) => [l, v]),
  ].filter(([, v]) => v);

  return (
    <dialog ref={dlg} className="cc" aria-label="Character profile" onClose={onClose}
      onClick={(e) => e.target === dlg.current && dlg.current.close()}>
      <div className="cg-wrap">
        <div className="cg">

          <section className="cg-page cg-left">
            <div className="cg-tab"><span aria-hidden="true">◢◤</span> CHARACTER FILE // 001</div>
            <div className="cg-top">
              <p className="cg-bio">{C.details[0]}, {C.details[1]}. {C.focus}</p>
              <div className="cg-kanji"><b aria-hidden="true">技</b><span>SKILLS</span></div>
            </div>
            <div className="cg-mid">
              <div className="cg-radar"><Radar /><p>Axis length = tools listed in that area</p></div>
              <ul className="cg-notes">
                {C.skills.map((s) => (
                  <li key={s.n}><b aria-hidden="true">{s.g}</b><span><em>➜ {s.s.toUpperCase()}</em>{s.i.join(', ')}</span></li>
                ))}
              </ul>
            </div>
          </section>

          <section className="cg-page cg-right">
            <div className="cg-portrait">
              {noImg
                ? <svg className="cg-fill" viewBox="0 0 400 560" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><use href="#sam" /></svg>
                : <img className="cg-fill" src={IMG.face} alt={`Ink portrait of ${name}'s samurai avatar with a red sun behind him`} style={{ objectPosition: '50% 25%' }} onError={() => setNoImg(true)} draggable="false" />}
              <i className="cg-shade" />
              <div className="cg-banner">DEVELOPER NEW FACE FILE</div>
            </div>
            <div className="cg-lower">
              <div className="cg-profile">
                <h2>PROFILE</h2>
                <p>◆ {CARD.title} · {CARD.level}</p>
                <dl>{rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
              </div>
              <div className="cg-tag"><b>THE DEVELOPER WHO BUILDS HIS OWN PATH.</b><span>{name.toUpperCase()}</span></div>
            </div>
          </section>

        </div>
        <div className="row cg-actions"><button className="btn" autoFocus onClick={() => dlg.current.close()}>Close</button></div>
      </div>
    </dialog>
  );
}
