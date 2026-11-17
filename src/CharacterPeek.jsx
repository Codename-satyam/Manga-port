import { useState } from 'react';
import { CONFIG as C, IMG, CARD } from './config.js';

/** Small tilted "CHARACTER FILE 001" card tucked behind the closed cover. Render it inside .bk, before .book-pages. */
export default function CharacterPeek({ show, onOpen }) {
  const [noImg, setNoImg] = useState(false);
  const name = C.dossier.find(([l]) => l === 'SUBJECT')?.[1] || 'Satyam Anand';
  return (
    <aside className="peek" data-show={String(show)} aria-label="Character file 001">
      <div className="peek-card">
        <span className="peek-tab"><span aria-hidden="true">◢◤</span> CHARACTER FILE 001</span>
        <div className="peek-img">
          {noImg
            ? <svg viewBox="0 0 400 560" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><use href="#sam" /></svg>
            : <img src={IMG.face} alt="" style={{ objectPosition: '50% 22%' }} onError={() => setNoImg(true)} draggable="false" />}
        </div>
        <span className="peek-name">{name}</span>
        <span className="peek-lv">{CARD.title} · {CARD.level}</span>
        <button className="btn p" onClick={onOpen}>Open file</button>
      </div>
    </aside>
  );
}
