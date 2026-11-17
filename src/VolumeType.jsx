/**
 * Tall vertical Japanese type that frames the closed cover, like the obi band on a printed volume.
 * Purely decorative: aria-hidden, no pointer events, and only shown while the cover is closed.
 * Anton has no kanji glyphs, so this uses the page's Shippori Mincho B1 (--b) as outlined type.
 */
export default function VolumeType({ show }) {
  return (
    <div className="vol-type" data-show={String(show)} aria-hidden="true" lang="ja">
      <div className="vol-col vol-l"><span>第一巻</span><i /></div>
      <div className="vol-col vol-r"><i /><span>最初のコミット</span></div>
    </div>
  );
}
