// Original static SVG artwork, rendered with dangerouslySetInnerHTML (no user input involved).
export const KATANA = `<symbol id="katana" viewBox="0 0 600 60">
<path d="M190 26Q400 12 582 21L599 31Q400 43 190 38Z" fill="#F2EFE8" stroke="#080808" stroke-width="2" stroke-linejoin="round"/>
<path d="M196 36q8-5 16 0${'t16 0'.repeat(23)}" fill="none" stroke="#080808" stroke-width="1.3" opacity=".55"/>
<path d="M190 31Q400 21 586 26" stroke="#858585" stroke-width="1" fill="none"/>
<path d="M174 24H192V38H174Z" fill="#DCD6C9" stroke="#080808" stroke-width="2"/>
<ellipse cx="166" cy="30" rx="8" ry="25" fill="#080808" stroke="#F2EFE8" stroke-width="2"/><ellipse cx="166" cy="30" rx="3" ry="14" fill="#B51F2B"/>
<rect x="18" y="21" width="140" height="18" rx="3" fill="#151515" stroke="#F2EFE8" stroke-width="2"/>
<path d="M24 39L42 21L60 39L78 21L96 39L114 21L132 39L150 21M24 21L42 39L60 21L78 39L96 21L114 39L132 21L150 39" fill="none" stroke="#B51F2B" stroke-width="2.2"/>
<rect x="8" y="19" width="12" height="22" rx="3" fill="#B51F2B" stroke="#F2EFE8" stroke-width="1.5"/>
</symbol>`;

// Samurai mid-draw: lunging forward, scabbard pulled back, blade flashing out of frame.
export const SAM_DRAW = `<symbol id="samDraw" viewBox="0 0 400 560">
<circle cx="210" cy="210" r="140" fill="#B51F2B"/>
<g stroke="#F2EFE8" stroke-width="2" opacity=".55"><path d="M0 90L330 40M0 170L260 120M0 300L240 270M0 400L200 380M30 500L260 470M400 20L240 60"/></g>
<path d="M175 330L60 540H150L240 380Z" fill="#080808" stroke="#F2EFE8" stroke-width="2.5"/>
<path d="M205 335L310 410L340 540H255L250 450L185 400Z" fill="#151515" stroke="#F2EFE8" stroke-width="2.5"/>
<g stroke="#F2EFE8" stroke-width="1" opacity=".5" fill="none"><path d="M150 380L100 520M190 370L150 500M270 440L280 530"/></g>
<path d="M200 335L25 430" stroke="#F2EFE8" stroke-width="16" stroke-linecap="round"/><path d="M200 335L25 430" stroke="#151515" stroke-width="11" stroke-linecap="round"/><path d="M200 335L25 430" stroke="#B51F2B" stroke-width="2" stroke-dasharray="6 14"/>
<path d="M160 235L255 225L275 345L175 355Z" fill="#080808" stroke="#F2EFE8" stroke-width="2.5"/>
<path d="M165 238L215 300L262 232" fill="none" stroke="#F2EFE8" stroke-width="5"/>
<path d="M172 342L272 332" stroke="#B51F2B" stroke-width="12"/>
<path d="M200 140L125 158 152 170 108 192 192 162Z" fill="#B51F2B"/>
<path d="M196 130L118 98 150 126 98 124 160 146Z" fill="#080808" stroke="#F2EFE8" stroke-width="1.5"/>
<ellipse cx="222" cy="172" rx="33" ry="40" fill="#DCD6C9" stroke="#F2EFE8" stroke-width="2"/>
<path d="M190 168Q196 118 224 116Q256 118 256 168Q240 146 222 150Q204 146 190 168Z" fill="#080808"/>
<path d="M205 168L228 164M236 166L250 168" stroke="#080808" stroke-width="3"/><circle cx="214" cy="170" r="2.5" fill="#F2EFE8"/>
<path d="M226 197L242 194" stroke="#080808" stroke-width="2.5"/>
<circle cx="200" cy="335" r="12" fill="#DCD6C9" stroke="#080808" stroke-width="2"/>
<path d="M232 240Q272 250 302 296L286 314Q250 288 222 272Z" fill="#151515" stroke="#F2EFE8" stroke-width="2"/>
<use href="#katana" x="270" y="277" width="470" height="47" transform="rotate(-16 290 300)"/>
<circle cx="292" cy="300" r="11" fill="#DCD6C9" stroke="#080808" stroke-width="2"/>
<path d="M20 80Q220 30 395 330" stroke="#F2EFE8" stroke-width="3" fill="none"/><path d="M40 112Q220 72 382 322" stroke="#B51F2B" stroke-width="6" fill="none" opacity=".85"/>
</symbol>`;

export const SAM_DEFS = `<defs>${KATANA}${SAM_DRAW}<symbol id="sam" viewBox="0 0 400 560">
<circle cx="250" cy="190" r="120" fill="#B51F2B"/>
<g stroke="#F2EFE8" stroke-width="2" opacity=".5"><path d="M20 120L380 60M10 220L390 150M30 330L380 270M0 60L300 20"/></g>
<path d="M150 230Q120 330 100 540H300Q290 360 250 230Z" fill="#080808" stroke="#F2EFE8" stroke-width="2.5"/>
<path d="M80 540Q70 450 105 380L150 300 140 540Z" fill="#151515" stroke="#F2EFE8" stroke-width="2"/>
<g stroke="#F2EFE8" stroke-width="1" opacity=".55" fill="none"><path d="M170 300L160 520M195 290L190 530M220 295L225 520M245 300L262 520M175 360L240 350M170 420L252 410"/></g>
<path d="M150 235L200 300 250 235 232 215H168Z" fill="#F2EFE8" opacity=".9"/><path d="M165 238L200 285 235 238" fill="none" stroke="#080808" stroke-width="3"/>
<path d="M160 225Q60 215 20 270Q70 250 120 262Q40 300 20 340Q100 290 150 270Z" fill="#B51F2B"/>
<ellipse cx="200" cy="165" rx="40" ry="50" fill="#DCD6C9" stroke="#F2EFE8" stroke-width="2"/>
<path d="M158 160Q165 110 200 108Q240 108 244 160Q225 135 200 140Q175 135 158 160Z" fill="#080808"/>
<path d="M162 120L150 85 178 108 185 72 200 106 218 70 226 108 252 82 240 125Z" fill="#080808" stroke="#F2EFE8" stroke-width="1.5"/>
<path d="M200 150Q244 160 244 200Q235 215 215 220Q232 180 200 150Z" fill="#080808"/>
<path d="M172 166L192 168M208 168L228 166" stroke="#080808" stroke-width="3"/><circle cx="184" cy="170" r="2.5" fill="#F2EFE8"/>
<path d="M190 195Q200 199 210 195" stroke="#080808" stroke-width="2" fill="none"/>
<use href="#katana" x="290" y="504" width="440" height="44" transform="rotate(-80 290 526)"/><path d="M286 500L278 560" stroke="#080808" stroke-width="12" stroke-linecap="round"/>
</symbol></defs>`;

// One original illustration per project (index matches CONFIG.projects)
export const ART = [
  '<rect width="400" height="300" fill="#151515"/><g fill="#F2EFE8"><rect x="30" y="40" width="70" height="90" transform="rotate(-12 60 80)"/><rect x="300" y="60" width="70" height="90" transform="rotate(10 330 100)"/></g><rect x="150" y="70" width="100" height="160" fill="#B51F2B"/><path d="M150 70h100M150 230h100" stroke="#F2EFE8" stroke-width="6"/>',
  '<rect width="400" height="300" fill="#DCD6C9"/><g stroke="#080808" fill="none" stroke-width="3"><rect x="30" y="40" width="160" height="100"/><rect x="30" y="160" width="70" height="100"/></g><rect x="230" y="40" width="130" height="220" fill="#080808"/><rect x="245" y="105" width="45" height="45" fill="#B51F2B"/>',
  '<rect width="400" height="300" fill="#080808"/><path d="M60 120L200 40 340 120V260H60Z" fill="#F2EFE8"/><path d="M60 120L200 40 340 120Z" fill="#B51F2B"/><rect x="170" y="170" width="60" height="90" fill="#080808"/>',
  '<rect width="400" height="300" fill="#151515"/><g fill="#F2EFE8"><rect x="30" y="40" width="100" height="100"/><rect x="150" y="40" width="100" height="100" fill="#B51F2B"/><rect x="270" y="40" width="100" height="100"/><rect x="30" y="160" width="340" height="100"/></g>',
  '<rect width="400" height="300" fill="#DCD6C9"/><path d="M200 50L40 70V260L200 240ZM200 50L360 70V260L200 240Z" fill="#F2EFE8" stroke="#080808" stroke-width="5"/><circle cx="110" cy="150" r="26" fill="#B51F2B"/><circle cx="280" cy="130" r="20" fill="#080808"/>',
  '<rect width="400" height="300" fill="#080808"/><rect x="40" y="90" width="320" height="30" rx="15" fill="#F2EFE8"/><rect x="40" y="180" width="320" height="30" rx="15" fill="#F2EFE8"/><circle cx="60" cy="105" r="22" fill="#B51F2B"/><circle cx="340" cy="195" r="22" fill="#B51F2B"/>',
];

export const LAND = '<rect width="900" height="300" fill="#DCD6C9"/><circle cx="470" cy="130" r="90" fill="#F2EFE8"/><circle cx="470" cy="130" r="60" fill="#B51F2B"/><path d="M0 220L120 120 220 200 340 90 470 210 600 110 760 200 900 130V300H0Z" fill="#151515" opacity=".85"/><path d="M0 260Q200 220 450 255T900 240V300H0Z" fill="#080808"/><g fill="#080808" stroke="#F2EFE8" stroke-width="1.5"><path d="M196 300L208 216Q214 196 226 194Q240 196 246 216L258 300Z"/><circle cx="226" cy="184" r="11"/><path d="M221 175L226 158 232 175Z"/></g><path d="M236 200Q272 190 296 212Q268 206 240 214Z" fill="#B51F2B"/><path d="M212 252L172 274" stroke="#F2EFE8" stroke-width="8" stroke-linecap="round"/><path d="M212 252L172 274" stroke="#080808" stroke-width="5" stroke-linecap="round"/><use href="#katana" x="246" y="283" width="130" height="13" transform="rotate(-72 246 289)"/>';
