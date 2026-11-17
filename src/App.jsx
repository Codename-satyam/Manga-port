import { Children, cloneElement, useCallback, useEffect, useRef, useState } from 'react';
import { CONFIG as C, IMG, CARD } from './config.js';
import { SAM_DEFS, ART } from './art.js';
import OpeningSequence from './OpeningSequence.jsx';
import BackgroundVideo from './BackgroundVideo.jsx';
import IntroVideo from './IntroVideo.jsx';
import RecruiterView from './RecruiterView.jsx';
import Haiku from './Haiku.jsx';
import ProjectDialog from './ProjectDialog.jsx';
import CharacterCard from './CharacterCard.jsx';
import LiveBackground from './LiveBackground.jsx';
import VolumeType from './VolumeType.jsx';
import ChapterTabs from './ChapterTabs.jsx';
import CharacterPeek from './CharacterPeek.jsx';
import './styles.css';
import './cover-extras.css';

const P = C.profile;
const pad = (n) => String(n).padStart(2, '0');
const THREAD = 'Every developer has a first commit.';
const FLIP_MS = 1100;

/* ---------- small building blocks ---------- */
const Art = ({ id = 'sam', pre = 'xMidYMax slice' }) => (
  <svg className="fill" viewBox="0 0 400 560" preserveAspectRatio={pre} aria-hidden="true"><use href={`#${id}`} /></svg>
);
const Sam = (props) => <Art {...props} />;

const Img = ({ src, pos = 'center', alt = '', eager = false, fallback = null }) => {
  const [bad, setBad] = useState(false);
  if (bad) return fallback;                // missing file: show the drawn fallback (or nothing), never a broken icon
  return <img className="fill ph" src={src} alt={alt} style={{ objectPosition: pos }} loading={eager ? 'eager' : 'lazy'} decoding="async" draggable="false" onError={() => setBad(true)} />;
};

const Katana = ({ className = 'kt' }) => (
  <svg className={className} viewBox="0 0 600 60" aria-hidden="true"><use href="#katana" /></svg>
);
const Pn = ({ c = 'l', tn = true, className = '', style, children }) => (
  <div className={`pn ${c}${tn ? ' tn' : ''} ${className}`} style={style}>{children}</div>
);
// Gives each direct child panel its reveal order (--i) and a slight tilt (--r)
const Grid = ({ style, children }) => (
  <div className="gr" style={style}>
    {Children.map(children, (ch, i) =>
      cloneElement(ch, { style: { ...ch.props.style, '--i': i, '--r': `${i % 2 ? -0.5 : 0.4}deg` } }))}
  </div>
);
const Head = ({ tag, title, red = true, style }) => (
  <Pn c="d" className="hd" style={style}><span className={`m ${red ? 'red' : ''}`}>{tag}</span>{title && <h2>{title}</h2>}</Pn>
);
const Thread = ({ children = THREAD, dark = false }) => (
  <p className={`thread${dark ? ' thread-dark' : ''}`}><span aria-hidden="true">⌁</span> {children}</p>
);
const Skill = ({ i, c, style }) => {
  const s = C.skills[i];
  return (
    <Pn c={c} style={style}>
      {i === 0 && <Katana className="kt wm" />}
      <span className="sfx" aria-hidden="true" style={{ right: '.6rem', top: '.2rem' }}>{s.g}</span>
      <span className="m red">{s.s.toUpperCase()}</span>
      <h3>{s.n}</h3>
      <ul className="chips">{s.i.map((x) => <li key={x}>{x}</li>)}</ul>
    </Pn>
  );
};
// Compact panel on the Origin page. The full card (CharacterCard.jsx) opens from it.
const CharacterProfile = ({ onOpen, style }) => {
  const role = C.dossier.find(([label]) => label === 'ROLE')?.[1] || 'Developer in progress';
  return (
    <Pn c="d" tn={false} className="character-card" style={style}>
      <Img src={IMG.face} pos="50% 22%" alt="" fallback={<Art id="sam" pre="xMidYMax slice" />} /><i className="shade" />
      <span className="m red corner">CHARACTER PROFILE // 001</span>
      <span className="m full">{C.dossier.find(([label]) => label === 'SUBJECT')?.[1] || 'Satyam Anand'}</span>
      <h3>{CARD.title}</h3>
      <span className="character-level">{CARD.level}</span>
      <span className="m full character-role">{role}</span>
      <button className="btn p" onClick={onOpen}>Open card</button>
    </Pn>
  );
};
const Proj = ({ i, open, style }) => {
  const p = C.projects[i];
  return (
    <Pn tn={false} className="ptl" style={style}>
      <div className="a">{p.image ? <img src={p.image} alt={`${p.t} project preview`} loading="lazy" decoding="async" /> : <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ART[i] }} />}</div>
      <div className="tx">
        <span className="m red">STORY {pad(i + 1)} — {p.tag.toUpperCase()}</span>
        <h3>{p.t}</h3><p>{p.d}</p>
        <div className="stk">{p.stack.map((x) => <span key={x}>{x}</span>)}</div>
        <button className="btn" onClick={() => open(i)}>Open file</button>
      </div>
    </Pn>
  );
};

/* ---------- interactive panels ---------- */
function ContactForm() {
  const [st, setSt] = useState('');
  if (!P.formEndpoint) return null;
  const submit = async (e) => {
    e.preventDefault();
    const f = e.currentTarget, d = Object.fromEntries(new FormData(f));
    if (!d.name.trim() || !/^\S+@\S+\.\S+$/.test(d.email) || d.message.trim().length < 10)
      return setSt('Enter your name, a valid email, and a message of at least 10 characters.');
    setSt('Sending…');
    try {
      const r = await fetch(P.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(d) });
      if (!r.ok) throw new Error('bad status');
      f.reset(); setSt('Message sent.');
    } catch { setSt(`Message not sent. ${P.email ? 'Email me directly instead.' : 'Please try again later.'}`); }
  };
  return (
    <form onSubmit={submit} noValidate>
      <label>Name<input name="name" required autoComplete="name" /></label>
      <label>Email<input name="email" type="email" required autoComplete="email" /></label>
      <label>Message<textarea name="message" rows={2} required /></label>
      <button className="btn p" type="submit">Send message</button>
      <div role="status" className="m">{st}</div>
    </form>
  );
}
/* ---------- app ---------- */
export default function App() {
  const bk = useRef(null), ac = useRef(null), first = useRef(true), sx = useRef([0, 0]);
  const [cur, setCur] = useState(() => { const m = location.hash.match(/#page-(\d+)/); const n = m ? Math.max(0, +m[1] - 1) : 0; return n === 0 || n % 2 === 1 ? n : n - 1; });
  const [seen, setSeen] = useState({}), [done, setDone] = useState({});
  const [menu, setMenu] = useState(false), [snd, setSnd] = useState(false), [proj, setProj] = useState(null);
  const [secret, setSecret] = useState(false);
  const secretKeys = useRef('');
  const [turnDirection, setTurnDirection] = useState('');       // only used for the mobile slide
  const [card, setCard] = useState(false);                         // character card dialog
  // Page turn: { from, to, direction, cover }. turningRef is the lock; curRef mirrors cur so go() never reads a stale value.
  const [turning, setTurning] = useState(null);
  const turningRef = useRef(null), curRef = useRef(cur);
  curRef.current = cur;
  const turnTimer = useRef(0);
  const reduceMotion = useRef(matchMedia('(prefers-reduced-motion: reduce)').matches).current;
  const [rec, setRec] = useState(false);
  const bgRef = useRef(null);
  const [bgOn, setBgOn] = useState(() => { try { return localStorage.getItem('bgv') !== 'off'; } catch { return true; } });
  useEffect(() => { try { localStorage.setItem('bgv', bgOn ? 'on' : 'off'); } catch { /* storage unavailable */ } }, [bgOn]);
  const introRef = useRef(null);
  const vids = useRef([introRef, bgRef]).current;          // videos the loading screen waits for
  const [loaded, setLoaded] = useState(false);              // loading screen finished
  const [introDone, setIntroDone] = useState(false);        // intro video finished: reveal the manga + start background
  const onLoaded = useCallback(() => setLoaded(true), []);
  const onIntroDone = useCallback(() => setIntroDone(true), []);
  const openRecruiter = useCallback(() => { setIntroDone(true); setRec(true); }, []);   // reachable even during the intro
  const closeRecruiter = useCallback(() => setRec(false), []);

  const whoosh = useCallback(() => {
    if (!snd) return;
    try {
      const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextCtor) return;
      ac.current = ac.current || new AudioContextCtor();
      const ctx = ac.current, t = ctx.currentTime;
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'triangle'; o.frequency.setValueAtTime(500, t); o.frequency.exponentialRampToValueAtTime(90, t + 0.4);
      g.gain.setValueAtTime(0.05, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
      o.connect(g).connect(ctx.destination); o.start(); o.stop(t + 0.4);

      const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.28, ctx.sampleRate);
      const noise = buffer.getChannelData(0);
      for (let i = 0; i < noise.length; i += 1) noise[i] = (Math.random() * 2 - 1) * (1 - i / noise.length);
      const source = ctx.createBufferSource(), filter = ctx.createBiquadFilter(), paper = ctx.createGain();
      source.buffer = buffer; filter.type = 'bandpass'; filter.frequency.value = 1600; filter.Q.value = 0.7;
      paper.gain.setValueAtTime(0.035, t); paper.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
      source.connect(filter).connect(paper).connect(ctx.destination); source.start(t + 0.03); source.stop(t + 0.28);
    } catch { /* audio unavailable */ }
  }, [snd]);

  const projectOpen = (i) => { whoosh(); setProj(i); };

  const pages = [
    ['Cover', 'Prologue', (
      <Grid style={{ gridTemplateRows: '5.5fr 3.5fr' }}>
        <Pn c="d" className="cover">
          <span className="sfx" aria-hidden="true" style={{ left: '.6rem', top: '.4rem', color: '#F2EFE8' }}>ゴゴゴ</span>
          <Img src={IMG.cover} pos="50% 15%" eager alt="Ink illustration of a samurai with his head bowed, a katana at his hip and a pagoda behind him" /><i className="shade" /><h1>Satyam<br />Anand.</h1>
          <span className="m vt">PROTAGONIST — FILE 001</span>
        </Pn>
        <Pn tn={false}>
          <span className="m red">CHAPTER 00 — THE FIRST COMMIT</span>
          <p className="m full">Every legend begins with a single stroke.</p>
          <Thread />
          <p className="tag-line">THE DEVELOPER WHO BUILDS HIS OWN PATH.</p>
          <p className="m full">Full Stack Developer · Creative Engineer · Problem Solver</p>
          <p className="row"><button className="btn p" onClick={() => go(1)}>Start reading</button><button className="btn" onClick={() => go(5)}>View my work</button></p>
          <p className="m cover-hint"><span className="h-kb">← → </span><span className="h-tc">Swipe </span>to turn pages · or tap Start reading</p>
        </Pn>
      </Grid>)],
    ['Origin', '01 Origin', (
      <Grid style={{ gridTemplate: '1.7fr 2.95fr 1.5fr/1fr 1fr 1fr' }}>
        <Pn c="d" style={{ gridColumn: '1/4' }}><Img src={IMG.eyes} pos="72% 40%" alt="Close-up of a samurai's eyes beside a red ink slash" /><i className="shade" /><span className="m red corner">CHAPTER 01 — ORIGIN</span><h2 className="ov">Every master was once a beginner.</h2></Pn>
        <Pn tn={false} style={{ gridColumn: '1/3' }}>
          <p>I’m Satyam Anand, a Computer Science engineering student and developer interested in building useful products, intuitive interfaces, and experiences that people remember.</p>
          <Thread>Before the polished page, there was a first commit: a small decision to start.</Thread>
          <p className="m full">{C.details.slice(0, 2).join(' · ')}</p>
          <p>My journey moves between frontend, backend systems, problem-solving, and experimentation. I enjoy breaking complicated problems into smaller pieces and building something meaningful from them.</p>
        </Pn>
        <CharacterProfile onOpen={() => setCard(true)} />
        {C.attrs.map(([a, b], i) => <Pn key={a} c={i === 1 ? 'd' : 'l'} className="attr"><h3 className={i === 1 ? '' : 'red'}>{a}</h3><p>{b}</p></Pn>)}
      </Grid>)],
    ['Arsenal I', '02 Arsenal', (
      <Grid style={{ gridTemplateRows: '1.45fr 1.4fr 1.15fr' }}>
        <Pn c="d"><Katana className="kt wm hdr" /><span className="m red">CHAPTER 02 — THE ARSENAL</span><h2>A samurai’s weapons are a developer’s tools.</h2><Thread dark>Every developer has a first commit. These are the tools used to keep going.</Thread><p className="m full">Every skill below is a real, labelled tool — no fake meters.</p></Pn>
        <Skill i={0} c="l" /><Skill i={1} c="d" />
      </Grid>)],
    ['Arsenal II', '02 Arsenal', (
      <Grid style={{ gridTemplate: '1fr 1.2fr 1fr/1fr 1fr' }}>
        <Skill i={2} c="d" style={{ gridColumn: 1 }} />
        <Skill i={4} c="l" style={{ gridColumn: 2, gridRow: '1/3' }} />
        <Skill i={3} c="l" style={{ gridColumn: 1, gridRow: '2/4' }} />
        <Pn c="d" style={{ gridColumn: 2 }}><span className="sfx" aria-hidden="true" style={{ color: '#F2EFE8', left: '.5rem', top: '.2rem' }}>ドン</span><p className="m full mid">THE ARSENAL IS COMPLETE.<br />NOW SEE IT IN BATTLE.</p></Pn>
      </Grid>)],
    ['The Draw', '02 Arsenal', (
      <Grid style={{ gridTemplate: '1.15fr 1fr 1fr/1.2fr 1fr' }}>
        <Pn c="d" className="splash" style={{ gridColumn: '1/3' }}>
          <Img src={IMG.draw} pos="45% 50%" alt="A samurai grips the hilt of his katana, the long blade slicing across the frame" /><i className="shade" />
          <span className="sfx big" aria-hidden="true" style={{ right: '1rem', top: '.2rem', color: '#F2EFE8' }}>斬</span>
          <span className="m red corner">CHAPTER 02½ — THE DRAW</span>
          <h2 className="ov">One clean cut.</h2>
        </Pn>
        <Pn tn={false} style={{ gridColumn: 1, gridRow: '2/4' }}><Img src={IMG.porch} pos="50% 40%" alt="Manga page: a samurai sits on a wooden porch facing a red sun and a torii gate; below, a close-up of his face and his hand on the katana" /></Pn>
        <Pn c="d" className="blade">
          <Katana className="kt full" />
          <span className="m full">THE BLADE IS ONLY AS GOOD AS THE HAND THAT SHARPENS IT.</span>
        </Pn>
        <Pn c="l"><span className="sfx" aria-hidden="true" style={{ right: '.5rem', top: '.1rem' }}>シュッ</span><h3>Precision over noise.</h3><p>Good code, like a good draw, wastes no motion.</p></Pn>
      </Grid>)],
    ['Battles I', '03 Battles', (
      <Grid style={{ gridTemplateRows: 'auto 1fr 1fr 1fr' }}>
        <Head tag="CHAPTER 03 — BATTLES FOUGHT" title="Projects are the battles that shaped him." />
        {[0, 1, 2].map((i) => <Proj key={i} i={i} open={projectOpen} />)}
      </Grid>)],
    ['Battles II', '03 Battles', (
      <Grid style={{ gridTemplateRows: 'auto 1fr 1fr 1fr' }}>
        <Head red={false} tag="ILLUSTRATIONS ARE ORIGINAL ART, NOT SCREENSHOTS." />
        {[3, 4, 5].map((i) => <Proj key={i} i={i} open={projectOpen} />)}
      </Grid>)],
    ['The Way of the Code', '04 The Code', (
      <Grid style={{ gridTemplate: 'auto 1fr 1fr/1fr 1fr' }}>
        <Head tag="CHAPTER 04 — THE WAY OF THE CODE" title="The philosophy behind the blade." style={{ gridColumn: '1/3' }} />
        {[['I', 'Understand', 'Every problem has a structure. Find it before writing the solution.'], ['II', 'Break it down', 'Complex systems become manageable when their parts are understood.'], ['III', 'Build', 'Turn the idea into something real, testable, and useful.'], ['IV', 'Refine', 'The first version is a beginning, not the final form.']]
          .map(([n, t, d], i) => <Pn key={n} c={[1, 0, 0, 1][i] ? 'l' : 'd'}><span className="red numeral">{n}</span><h3>{t}</h3><p>{d}</p>{i === 0 && <Thread>Start small. Make the first commit useful.</Thread>}</Pn>)}
      </Grid>)],
    ['The Poet’s Hour', '04 The Code', (
      <Grid style={{ gridTemplate: '1.1fr 1.7fr/1.15fr 1fr' }}>
        <Pn c="d" className="splash" style={{ gridColumn: '1/3' }}>
          <Img src={IMG.action} pos="50% 50%" alt="Comic action panel" fallback={<Art id="samDraw" pre="xMidYMid slice" />} /><i className="shade" />
          <span className="sfx big" aria-hidden="true" style={{ right: '1rem', top: '.2rem', color: '#F2EFE8' }}>ズバッ</span>
          <span className="m red corner">CHAPTER 04½ — ACTION</span>
          <h2 className="ov">Between battles, the blade rests.</h2>
        </Pn>
        <Pn c="l"><Haiku /></Pn>
        <Pn c="d" tn={false}>
          <Img src={IMG.avatar} pos="50% 20%" alt="The samurai at his writing desk, brush in hand" fallback={<Art id="sam" pre="xMidYMax slice" />} /><i className="shade" />
          <span className="m full cap">HE WRITES BETWEEN BATTLES.</span>
        </Pn>
      </Grid>)],
    ['Training Arc', '05 Path Ahead', (
      <Grid style={{ gridTemplate: 'auto repeat(3,1fr) auto/1fr 1fr 1fr' }}>
        <Head tag="CHAPTER 05 — TRAINING ARC" title="Still becoming stronger." style={{ gridColumn: '1/4' }} />
        {C.training.map(([t, d], i) => <Pn key={t} c={i === 8 ? 'd' : 'l'} className="cell"><h3 className={i === 8 ? 'red' : ''}>{t}</h3>{d}</Pn>)}
        <Pn tn={false} className="focus" style={{ gridColumn: '1/4' }}><Thread>Every developer has a first commit. The next one is where the craft shows.</Thread><b>Currently sharpening:</b> {C.focus}</Pn>
      </Grid>)],
    ['Stillness', '05 Path Ahead', (
      <Grid style={{ gridTemplate: '1.5fr 1fr/1fr 1fr' }}>
        <Pn tn={false} style={{ gridColumn: '1/3' }}><Img src={IMG.duo} pos="50% 30%" alt="Two manga panels: a samurai looking over his shoulder, and a silhouette standing in a temple gateway" /><i className="shade" /><span className="m full cap">静 — THE BREATH BEFORE THE CUT.</span></Pn>
        <Pn tn={false}><Img src={IMG.face} pos="50% 30%" alt="Ink portrait of a samurai with a red sun behind him" /></Pn>
        <Pn c="d"><span className="sfx big" aria-hidden="true" style={{ right: '.5rem', top: '.1rem', color: '#F2EFE8' }}>静</span><p className="m full mid">STILLNESS IS NOT THE ABSENCE OF STRENGTH.<br />IT IS WHERE THE NEXT MOVE IS CHOSEN.</p></Pn>
      </Grid>)],
    ['The Final Page', '06 Contact', (
      <Grid style={{ gridTemplateRows: '1.3fr 1.5fr auto' }}>
        <Pn tn={false} className="land"><Img src={IMG.back} pos="50% 42%" alt="The samurai, seen from behind, looks out over a vast landscape toward a red sun" /><i className="shade" /></Pn>
        <Pn tn={false}>
          <span className="m red">CHAPTER 06 — THE FINAL PAGE</span>
          <h2>Every first commit deserves a next chapter.</h2>
          <Thread>Every developer has a first commit. What will we build after yours?</Thread>
          <p>Every project is another chapter. Every problem is another lesson. I’m always interested in building something worth remembering.</p>
          <h3 className="ask">Have a project in mind? Let’s build it.</h3>
          <div className="lk">
            {P.email && <a className="btn p" href={`mailto:${P.email}`}>Email me</a>}
            {P.github && <a className="btn" href={P.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
            {P.linkedin && <a className="btn" href={P.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
            {P.resume && <a className="btn" href={P.resume} download>Resume</a>}
            {!(P.email || P.github || P.linkedin || P.resume) && <span className="m full">Contact links are being added.</span>}
          </div>
          <ContactForm />
        </Pn>
        <Pn c="d" tn={false} className="end"><span className="m full">SATYAM ANAND — END OF VOLUME 01 {(P.turnPage || P.github) && <a className="btn" href={P.turnPage || P.github} target="_blank" rel="noopener noreferrer">Turn the page ↗</a>}</span></Pn>
      </Grid>)],
  ];
  const N = pages.length;
  const shown = turning ? turning.to : cur;                      // what the bar, progress and labels show
  const chNum = parseInt(pages[shown][1], 10) || 0, chMax = Math.max(...pages.map((p) => parseInt(p[1], 10) || 0));
  // Navigate. Desktop turns a leaf (also for the cover opening and closing); mobile and reduced motion swap directly.
  const go = useCallback((n) => {
    if (turningRef.current) return;                                // ignore input mid-turn
    const c = curRef.current;
    const t = Math.max(0, Math.min(N - 1, typeof n === 'function' ? n(c) : n));
    const next = t === 0 || t % 2 === 1 ? t : t - 1;
    if (next === c) return;
    const direction = next > c ? 'next' : 'previous';

    whoosh();                                                      // sound at the start of the turn, not after it
    const mark = { [next]: true, ...(next + 1 < N ? { [next + 1]: true } : {}) };
    setSeen((x) => ({ ...x, ...mark }));                           // landing pages must not re-run the panel pop
    setDone((x) => ({ ...x, ...mark }));

    const mobile = innerWidth <= 640;
    if (mobile || reduceMotion) {
      setTurnDirection(mobile && !reduceMotion ? direction : '');
      curRef.current = next; setCur(next);
      return;
    }
    const tr = { from: c, to: next, direction, cover: c === 0 || next === 0 };
    turningRef.current = tr; setTurning(tr);
    clearTimeout(turnTimer.current);
    turnTimer.current = setTimeout(() => {
      turningRef.current = null; curRef.current = next;
      setCur(next); setTurning(null);                              // the effect below focuses the new spread
    }, FLIP_MS);
  }, [N, whoosh, reduceMotion]);
  const nextSpread = cur === 0 ? 1 : cur + 2;
  const previousSpread = cur === 1 ? 0 : cur - 2;

  useEffect(() => () => clearTimeout(turnTimer.current), []);

  // after each turn: reveal panels, focus, URL
  useEffect(() => {
    if (!introDone) return undefined;   // wait for the opening sequence before revealing page 1
    setSeen((s) => ({ ...s, [cur]: true, ...(cur + 1 < N ? { [cur + 1]: true } : {}) }));
    const count = document.querySelectorAll(`#spread-${cur} .pn`).length;
    const t = setTimeout(() => setDone((d) => ({ ...d, [cur]: true, ...(cur + 1 < N ? { [cur + 1]: true } : {}) })), count * 220 + 1500);
    history.replaceState(null, '', `#page-${cur + 1}`);
    if (first.current) first.current = false;
    else { const el = document.getElementById(`spread-${cur}`); el?.focus({ preventScroll: true }); if (el) el.scrollTop = 0; }
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cur, introDone]);

  // scale rem with the book so text fits the page
  useEffect(() => {
    const fit = () => { const b = bk.current; document.documentElement.style.fontSize = `${Math.max(12, Math.min(17, b.clientHeight / 46, b.clientWidth / 32))}px`; };
    fit(); addEventListener('resize', fit); return () => removeEventListener('resize', fit);
  }, []);

  useEffect(() => {
    const key = (e) => {
      if (!introDone || rec || /INPUT|TEXTAREA/.test(document.activeElement.tagName) || document.querySelector('dialog[open]')) return;
      if (/^[sa]$/i.test(e.key)) {
        secretKeys.current = `${secretKeys.current}${e.key.toLowerCase()}`.slice(-2);
        if (secretKeys.current === 'sa') {
          setSecret(true);
          secretKeys.current = '';
        }
      } else if (e.key.length === 1) secretKeys.current = '';
      if (e.key === 'ArrowRight' || e.key === 'PageDown') go((c) => c === 0 ? 1 : c + 2);
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') go((c) => c === 1 ? 0 : c - 2);
      if (e.key === 'Home') go(0);
      if (e.key === 'End') go(N - 1);
      if (e.key === 'Escape') setMenu(false);
    };
    addEventListener('keydown', key); return () => removeEventListener('keydown', key);
  }, [go, N, introDone, rec]);

  const touchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - sx.current[0], dy = e.changedTouches[0].clientY - sx.current[1];
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) go((c) => c === 0 ? 1 : c + (dx < 0 ? 2 : -2));
  };

  // Book layout while turning: the cover opens into (or closes out of) the open-book layout.
  const open = turning ? true : cur > 0;
  const atCover = cur === 0 && !turning;                       // cover decorations show only on the closed cover
  const bkClass = `bk ${open ? 'open-book' : 'cover-book'}${turning?.cover ? ' cover-turn' : ''}${turning?.from === 0 ? ' opening' : ''}${turning?.to === 0 ? ' closing' : ''}`;
  // Which pages ride on the leaf. Page 0 is the cover: it is the front of the first turn and the back of the last.
  const nx = turning?.direction === 'next';
  const leaf = turning && {
    front: nx ? (turning.from === 0 ? 0 : turning.from + 1) : turning.from,
    back: nx ? turning.to : (turning.to === 0 ? 0 : turning.to + 1),
    frontSide: nx ? 'right-page' : 'left-page',
    backSide: nx ? 'left-page' : 'right-page',
  };
  const turnFace = (i, side, kind) => (
    <div className={`turn-face ${kind}${i === 0 ? ' cover-book' : ''}`}>
      <section className={`pg ${i === 0 ? '' : side} seen`}>{pages[i][2]}<span className="pf" aria-hidden="true">— {i + 1} —</span></section>
    </div>
  );

  return (
    <>
      <OpeningSequence videoRefs={vids} onDone={onLoaded} onRecruiter={openRecruiter} />
      <IntroVideo vref={introRef} active={loaded} stop={rec} onDone={onIntroDone} onRecruiter={openRecruiter} />
      <RecruiterView open={rec} onClose={closeRecruiter} onEnter={closeRecruiter} />
      <div className="app" ref={(el) => { if (el) el.inert = !introDone || rec; }}>
      <a className="skip" href="#bk">Skip to the manga</a>
      <div id="prog" aria-hidden="true" style={{ width: `${(shown / (N - 1)) * 100}%` }} />
      <div id="top" aria-hidden="true"><span>VOLUME 01 / {chNum ? `CHAPTER ${pad(chNum)} / ${pad(chMax)}` : 'PROLOGUE'} · PAGE {shown + 1}/{N}</span><span>SATYAM ANAND</span></div>
      <div className="signature" aria-hidden="true">SA<span>//01</span></div>
      {introDone && <VolumeType show={atCover} />}
      {introDone && <ChapterTabs shown={shown} go={go} />}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" dangerouslySetInnerHTML={{ __html: SAM_DEFS }} />

      <BackgroundVideo vref={bgRef} on={bgOn && introDone} />
      {introDone && !reduceMotion && <LiveBackground mode="petals" density={0.28} speed={0.55} redShare={0.4} />}
      <main>
        <div className={bkClass} id="bk" ref={bk} role="region" aria-roledescription="manga volume" aria-label="Manga volume, read page by page"
          onTouchStart={(e) => { sx.current = [e.touches[0].clientX, e.touches[0].clientY]; }} onTouchEnd={touchEnd}>
          {introDone && <CharacterPeek show={atCover} onOpen={() => { whoosh(); setCard(true); }} />}
          <div className={`book-pages${turning ? ` is-turning dir-${turning.direction}` : ''}`} aria-busy={Boolean(turning)}>
            {/* the spread being turned TO sits underneath; the half the leaf lifts from is hidden so this shows through */}
            {turning && turning.to > 0 && (
              <div className="spread turn-target" aria-hidden="true">
                {[turning.to, turning.to + 1].map((i, side) => i < N ? (
                  <section key={`target-${pages[i][0]}`} className={`pg ${side ? 'right-page' : 'left-page'}${seen[i] ? ' seen' : ''}`}>
                    {pages[i][2]}<span className="pf" aria-hidden="true">— {i + 1} —</span>
                  </section>
                ) : <div key="target-blank" className={`blank-page${turning.to === N - 1 ? ' final-reverse' : ''}`} aria-hidden="true">
                  {turning.to === N - 1 && <Img src={IMG.last} pos="50% 50%" alt="" />}
                </div>)}
              </div>
            )}
            {!(turning && turning.from === 0) && (
              <div className={`spread ${turnDirection}`} id={`spread-${cur}`} key={cur} tabIndex={-1} aria-label={`Pages ${cur + 1} to ${Math.min(cur + 2, N)} of ${N}`}
                ref={(el) => { if (el) el.inert = false; }}>
                {[cur, cur + 1].map((i, side) => i < N ? (
                  <section key={pages[i][0]} id={`p${i}`} tabIndex={-1} aria-label={`Page ${i + 1} of ${N}: ${pages[i][0]}`}
                    className={`pg ${side ? 'right-page' : 'left-page'}${seen[i] ? ' seen' : ''}${done[i] ? ' done' : ''}`}>
                    {pages[i][2]}
                    <span className="pf" aria-hidden="true">— {i + 1} —</span>
                  </section>
                ) : <div key="blank" className={`blank-page${cur === N - 1 ? ' final-reverse' : ''}`} aria-hidden="true">
                  {cur === N - 1 && <Img src={IMG.last} pos="50% 50%" alt="" />}
                </div>)}
              </div>
            )}
            {turning && (
              <>
                <div className={`turn-cast ${turning.direction}`} aria-hidden="true" />
                <div className={`turn-leaf ${turning.direction}`} aria-hidden="true">
                  {turnFace(leaf.front, leaf.frontSide, 'front')}
                  {turnFace(leaf.back, leaf.backSide, 'back')}
                </div>
                <div className="ink-wash" aria-hidden="true" />
              </>
            )}
          </div>
        </div>
      </main>

      {menu && (
        <ul id="mn" aria-label="Pages">
          {pages.map(([title, nav], i) => (
            <li key={title}><button aria-current={i === shown ? 'page' : undefined} onClick={() => { go(i); setMenu(false); }}>{pad(i + 1)} — {nav}{title !== nav.slice(3) ? ` · ${title}` : ''}</button></li>
          ))}
        </ul>
      )}
      <div id="bar">
        <button disabled={shown === 0} onClick={() => go(previousSpread)} aria-label="Previous spread">◀ <span className="lb">PREV</span></button>
        <button aria-expanded={menu} aria-controls="mn" onClick={() => setMenu((m) => !m)}><b className="red">P{pad(shown + 1)}/{N}</b> {pages[shown][1].toUpperCase()} ☰</button>
        <button id="nx" disabled={shown >= N - 2} onClick={() => go(nextSpread)} aria-label="Turn the page">NEXT <span className="lb">SPREAD</span> ▶</button>
        <button onClick={openRecruiter} aria-label="Recruiter view">RECRUITER <span className="lb">VIEW</span></button>
        <button aria-pressed={snd} aria-label={`Page-turn sound (${snd ? 'on' : 'off'})`} style={snd ? { background: 'var(--red)' } : undefined} onClick={() => setSnd((s) => !s)}>♪</button>
        <button aria-pressed={bgOn} aria-label={`Background video (${bgOn ? 'on' : 'off'})`} onClick={() => setBgOn((v) => !v)}>▶ <span className="lb">VIDEO</span></button>
      </div>
      <div className="sr" aria-live="polite">Page {shown + 1} of {N}: {pages[shown][0]}</div>
      <ProjectDialog i={proj} close={() => setProj(null)} />
      <CharacterCard open={card} onClose={() => setCard(false)} />
      {secret && (
        <div className="secret" role="dialog" aria-modal="true" aria-labelledby="secret-title">
          <div className="secret-card">
            <span className="sig-mark">SA<span>//01</span></span>
            <p className="m red">HIDDEN PAGE — THE AUTHOR'S NOTE</p>
            <h2 id="secret-title">Good stories leave a mark.</h2>
            <p>I build with curiosity, keep the rough edges visible, and treat every first commit as an invitation to improve.</p>
            <button className="btn p" onClick={() => setSecret(false)}>Return to the volume</button>
          </div>
        </div>
      )}
      </div>
    </>
  );
}
