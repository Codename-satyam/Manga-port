# The Last Commit

### A developer portfolio you read like a manga volume.

**Satyam Anand** · Full Stack Developer in progress · React.js · Java · JavaScript

<!-- Add your live link here once deployed:
**Live site:** https://your-domain.example
-->

<!-- Add a screenshot or GIF of the cover here:
![The Last Commit cover](docs/cover.png)
-->

Instead of a scrolling landing page, this portfolio is a book. Visitors turn pages, move through chapters, and meet the developer as the protagonist of an ink-and-paper seinen manga: black ink, aged paper, one crimson accent, samurai imagery and halftone texture.

---

## Table of contents

- [Features](#features)
- [The story, page by page](#the-story-page-by-page)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Customising the content](#customising-the-content)
- [Adding your own images and videos](#adding-your-own-images-and-videos)
- [Controls](#controls)
- [Accessibility and performance](#accessibility-and-performance)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Author](#author)

---

## Features

- **Manga-volume reading experience.** Animated panel reveals, page turning, a chapter menu, and a progress indicator such as `VOLUME 01 / CHAPTER 03 / 06 · PAGE 7/12`.
- **Cinematic opening.** A loading screen waits for fonts and videos, then a full-screen intro video plays, then page one opens. Visitors can skip at any time, and returning visitors skip automatically.
- **Looping background video** behind the pages, dimmed and optionally black-and-white so the panels stay readable.
- **Original artwork.** Hand-built SVG samurai, katana and project illustrations, combined with your own ink-style images.
- **Case-study dialogs** for each project, with four panels (Mission, Arsenal, Execution, Outcome). A panel only appears when it has content, so nothing is padded or invented. An optional Engineer mode shows technical notes.
- **Recruiter view.** A plain, fast summary (skills, featured projects, certifications, links) reachable from the loading screen, the intro and the page bar, so nobody has to sit through the intro to find the essentials.
- **The Poet's Hour.** A comic action panel, an avatar slot, and an interactive haiku scroll where the samurai writes an original 5-7-5 poem for a theme the visitor picks.
- **Optional contact form** that appears only when you configure an endpoint.
- **Config-driven content.** Links that are not configured are simply hidden; there are no dead placeholder buttons.

## The story, page by page

| # | Page | Chapter |
|---|------|---------|
| 1 | Cover | Prologue |
| 2 | Origin: the character file and who the developer is | 01 Origin |
| 3–4 | Arsenal I and II: skills presented as equipment | 02 Arsenal |
| 5 | The Draw: a full-bleed action splash | 02 Arsenal |
| 6–7 | Battles I and II: the projects | 03 Battles |
| 8 | The Way of the Code: working philosophy | 04 The Code |
| 9 | The Poet's Hour: action panel, avatar and haiku | 04 The Code |
| 10 | Training Arc: learning journey and certifications | 05 Path Ahead |
| 11 | Stillness: a quiet interlude | 05 Path Ahead |
| 12 | The Final Page: contact | 06 Contact |

## Tech stack

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- Plain CSS (no UI framework)
- No animation library: motion uses CSS transforms, clip-paths and opacity
- Web Audio API for the optional page-turn sound (off by default)

The only runtime dependencies are `react` and `react-dom`.

## Getting started

**Requirements:** Node.js 18 or newer.

```bash
# clone and install
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install

# start the dev server
npm run dev          # http://localhost:5173

# production build (output in dist/)
npm run build

# preview the production build locally
npm run preview
```

## Project structure

```
.
├── index.html
├── package.json
├── vite.config.js
├── public/
│   ├── intro.mp4              # intro video (you provide)
│   ├── Background.mp4         # looping background video (you provide)
│   └── img/                   # artwork used on the manga pages (WebP)
└── src/
    ├── main.jsx               # entry point
    ├── App.jsx                # pages, page turning, menu, contact form
    ├── config.js              # ALL editable content and settings
    ├── styles.css             # design system and layout
    ├── art.js                 # original SVG artwork (samurai, katana, projects)
    ├── OpeningSequence.jsx    # loading screen
    ├── IntroVideo.jsx         # full-screen intro video
    ├── BackgroundVideo.jsx    # video behind the pages
    ├── ProjectDialog.jsx      # four-panel case-study dialog
    ├── RecruiterView.jsx      # quick recruiter summary
    └── Haiku.jsx              # the haiku scroll
```

## Customising the content

Almost everything you will want to change lives in **`src/config.js`**. Links left empty are never rendered.

### Profile and links

```js
profile: {
  email: '',
  github: '',
  linkedin: '',
  resume: '',        // e.g. '/resume.pdf' (put the file in public/)
  formEndpoint: '',  // e.g. a Formspree endpoint, enables the contact form
  turnPage: '',      // optional link shown at the end of the volume
}
```

### Projects

Each project has a name, tag, short description, stack and focus. Links are optional:

```js
{ t: 'Project name', tag: 'What it is', d: 'One-sentence description.',
  stack: ['React'], focus: 'What the project explores.',
  github: 'https://github.com/...', demo: 'https://...' }
```

To turn a project into a full case study, add any of these optional fields. **Each section of the dialog appears only when its field is filled in:**

| Field | Appears in |
|-------|-----------|
| `problem`, `users` | Panel 01: The Mission |
| `stackNotes` | Panel 02: The Arsenal |
| `shots: [{ src, alt }]`, `features`, `challenges: [[title, solution]]` | Panel 03: The Execution |
| `status`, `lessons`, `next` | Panel 04: The Outcome |
| `eng: { architecture, dataflow, decisions, limitations, code }` | Adds an **Engineer mode** toggle |

> Only write what is true of the project. Screenshots, metrics and claims should come from the real application.

### Other content

- `CONFIG.skills`, `CONFIG.attrs`, `CONFIG.details` and `CONFIG.dossier` control the skill cards, character traits and the character file.
- `CONFIG.training` holds the learning journey and certifications.
- `CONFIG.featured` chooses which projects appear in Recruiter view (indexes into `projects`).
- Haiku are in `src/Haiku.jsx`. Keep the 5-7-5 pattern if you change them.

### Videos

```js
export const INTRO = { src: '/intro.mp4', webm: '', fit: 'cover' };
export const BACKGROUND = {
  src: '/Background.mp4', webm: '', poster: '',
  dim: 0.55,          // 0 to 1, lower is darker
  grayscale: true,    // false keeps the video's own colours
  minLoadMs: 1500, maxWaitMs: 12000,
};
```

Set a `src` to `''` to switch that video off. The intro is skipped automatically for visitors who prefer reduced motion.

## Adding your own images and videos

1. Put image files in `public/img/` and videos in `public/`.
2. Update the paths in `src/config.js` under `IMG` (images) or `INTRO` / `BACKGROUND` (videos).

| Key | Used for |
|-----|----------|
| `IMG.cover` | Cover hero (tall portrait) |
| `IMG.eyes` | Origin banner (wide) |
| `IMG.draw`, `IMG.porch` | The Draw page |
| `IMG.action` | Comic action panel on The Poet's Hour |
| `IMG.avatar` | Avatar on The Poet's Hour |
| `IMG.duo`, `IMG.face` | Stillness interlude |
| `IMG.back` | Final page landscape |

Tips:

- Use compressed **WebP** or JPG, ideally under 500 KB per image. Resize huge exports first.
- Keep both videos H.264 MP4 and compressed; large files slow the opening.
- **File names are case-sensitive on Vercel and Linux.** `Background.mp4` and `background.mp4` are different files.
- If an image file is missing, the page falls back to the drawn artwork or hides the image, instead of showing a broken icon.

## Controls

| Input | Action |
|-------|--------|
| `→` or `Page Down` | Next page |
| `←` or `Page Up` | Previous page |
| `Home` / `End` | First / last page |
| `Esc` | Close the menu, the recruiter view or a dialog; skip the intro |
| Page menu | Jump to any page |
| Recruiter view button | Open the quick summary |

Add `?intro` to the URL to replay the intro video for returning visitors.

## Accessibility and performance

- Respects `prefers-reduced-motion`: the intro video is skipped, the background video is paused, and animations are disabled.
- Pages that are off-screen are removed from the tab order and the accessibility tree.
- Project dialogs use the native `<dialog>` element with a focus-visible close button.
- Images include descriptive alt text; decorative art is hidden from assistive technology.
- Audio is off by default and never autoplays. If the browser blocks sound on the intro video, it plays muted with a **Sound on** button.
- Artwork is WebP, images load lazily, the cover is preloaded, and videos buffer while the loading screen runs. If a video is unavailable, the page still opens.

## Deployment

### Vercel

1. Push the repository to GitHub.
2. Import it on [vercel.com](https://vercel.com). Vite is detected automatically, so no configuration is needed.
3. Make sure the video and image file names in `public/` match the paths in `config.js` exactly.

### GitHub Pages and other static hosts

Run `npm run build` and publish the `dist/` folder. If the site is served from a sub-path such as `https://user.github.io/repo/`, set the base path in `vite.config.js`:

```js
export default defineConfig({ base: '/repo/', plugins: [react()] });
```

Asset paths such as `/img/cover.webp` also need the base path in that case.

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `504 (Outdated Request)` in the dev server | Stop the server, delete `node_modules/.vite`, run `npm run dev`, and hard-reload (`Ctrl+Shift+R`). |
| `ERR_CONTENT_LENGTH_MISMATCH` on an image | The file was copied incompletely or is syncing. Move the project out of OneDrive or other synced folders, or re-copy the file. |
| Video does not play after deploying | Check the file name and capitalisation, and that it is H.264 MP4. |
| Browser extension errors in the console (`content.js` and similar) | They come from the extension, not this project. |

## Author

**Satyam Anand**

- GitHub: https://github.com/your-username/Codename-Satyam 
- LinkedIn: https://linkedin.com/in/satyam-anand33
- Email: satyamanand643@gmail.com

## License

<!-- Choose a license (for example MIT) and add a LICENSE file, then state it here. -->
All rights reserved unless a license file says otherwise. Artwork and written content belong to the author.
