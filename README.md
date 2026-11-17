# The Last Commit — Satyam Anand (React + Vite)

A manga-volume portfolio you read page by page.

## Run
    npm install
    npm run dev        # local
    npm run build      # production build in dist/

## Deploy (Vercel)
Push to GitHub, import the repo on Vercel. Vite is auto-detected; no config needed.

## Edit content
Everything lives in `src/config.js`:
- `CONFIG.profile` — email, github, linkedin, resume, formEndpoint, turnPage (empty = hidden)
- `CONFIG.projects[].github / demo` — empty = hidden
- `INTRO` — intro video (plays after the loader, before the manga opens). Put it in `public/`; empty `src` skips it
- `BACKGROUND` — looping video behind the pages, dimming, black-and-white toggle and loader timing (put it in `public/`)

## Files
- `src/App.jsx` — pages, page turning, terminal, dialog, form
- `src/OpeningSequence.jsx` — loading screen that waits for fonts and the background video
- `src/IntroVideo.jsx` — full-screen intro video (skip button, sound fallback)
- `src/BackgroundVideo.jsx` — looping video behind the manga pages
- `src/art.js` — original SVG artwork (samurai, katana, project art)
- `src/styles.css` — all styling


## New in this version
- **Recruiter view** (`src/RecruiterView.jsx`): button in the bottom bar and on the loader/intro. Uses `CONFIG.featured`, skills, certifications and the links in `profile`.
- **Case-study dialog** (`src/ProjectDialog.jsx`): four panels (Mission, Arsenal, Execution, Outcome) that only appear when filled in. Add optional fields to a project in `src/config.js` (see the comment above `projects`). Adding an `eng` object turns on Engineer mode.
- **The Poet's Hour** (`src/Haiku.jsx`): comic action panel slot (`IMG.action`), haiku scroll, and an avatar slot (`IMG.avatar`) in `public/img/`. A drawn fallback shows until you add the files.
- **Returning visitors** skip the intro video. Add `?intro` to the URL to replay it.
"# Manga" 
