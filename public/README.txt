Drop your videos here (names are case-sensitive on Vercel/Linux):
  intro.mp4        plays full-screen right after the loading screen   (set in src/config.js -> INTRO)
  Background.mp4   loops behind the manga pages after the intro        (set in src/config.js -> BACKGROUND)
Keep both H.264 MP4 and compressed. Optional: .webm versions, background-poster.jpg.

public/img/ holds the artwork used on the manga pages (WebP, already compressed).
To swap a picture, drop a new file in public/img/ and change its path in src/config.js -> IMG.
