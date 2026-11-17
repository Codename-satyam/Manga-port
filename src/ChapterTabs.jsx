// [number, label, spread to jump to]. Spreads start on index 0, 1, 3, 5 ... (see go() in App.jsx).
// Arsenal I shares the first spread with Origin, so "02 Arsenal" lands on the spread where Arsenal II starts.
const TABS = [
  ['00', 'Prologue', 0],
  ['01', 'Origin', 1],
  ['02', 'Arsenal', 3],
  ['03', 'Battles', 5],
  ['04', 'Code', 7],
  ['05', 'Path', 9],
  ['06', 'Contact', 11],
];

/** Thumb-tab chapter index on the right edge. `shown` is the spread currently on screen. */
export default function ChapterTabs({ shown, go }) {
  const active = TABS.reduce((a, [, , to], i) => (to <= shown ? i : a), 0);
  return (
    <nav className="chtabs" aria-label="Chapters">
      <ul>
        {TABS.map(([n, label, to], i) => (
          <li key={n} style={{ '--k': i }}>
            <button aria-current={i === active ? 'page' : undefined} aria-label={`Chapter ${n}: ${label}`} onClick={() => go(to)}>
              <span className="lbl" aria-hidden="true">{label}</span>
              <b aria-hidden="true">{n}</b>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
