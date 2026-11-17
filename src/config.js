// Edit content here. Empty links are never rendered.
export const CONFIG = {
  profile: { email: 'satyamanand643', github: 'https://github.com/Codename-satyam/', linkedin: 'https://www.linkedin.com/in/satyam-anand33/', resume: '', formEndpoint: '', turnPage: '' },
  details: ['B.Tech in Computer Science and Engineering', 'Lovely Professional University', 'Full Stack Development', 'Interests: sketching, gaming, creative web design'],
  attrs: [
    ['The Thinker', 'I approach problems through logic, experimentation, and structured thinking.'],
    ['The Builder', 'I turn ideas into working applications, interfaces, and digital experiences.'],
    ['The Disciple', 'I continue learning, refining my fundamentals, and improving my craft.'],
  ],
  skills: [
    { n: 'The Blade', s: 'Frontend', g: '剣', i: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS'] },
    { n: 'The Armor', s: 'Backend', g: '鎧', i: ['Node.js', 'Laravel', 'REST API development', 'Authentication', 'Application logic'] },
    { n: 'The Forge', s: 'Databases', g: '鍛', i: ['MongoDB', 'MySQL', 'Firebase'] },
    { n: 'The Discipline', s: 'Programming', g: '道', i: ['Java', 'C++', 'Python', 'Data Structures and Algorithms'] },
    { n: 'Tools of the Trade', s: 'Workflow', g: '具', i: ['Git', 'GitHub', 'Visual Studio Code', 'Vercel', 'Stripe integration'] },
  ],
  // Projects shown in Recruiter view (indexes into `projects`).
  featured: [0, 1, 2],

  dossier: [['SUBJECT', 'Satyam Anand'], ['ROLE', 'Full Stack Developer in Progress'], ['PRIMARY TECH', 'React.js, Java, JavaScript'], ['CURRENT FOCUS', 'Backend development, DSA'], ['SPECIALISATION', 'Interactive web experiences']],

  projects: [
    { t: 'Jigyasa', image: '/Jigyasa.png', tag: 'Gamified quiz platform', d: 'An interactive learning platform that turns quizzes into an adventure for kids through challenges, rewards, and progress tracking.', firstCommit: 'A focused quiz flow: question, answer, and feedback in one clear loop.', status: 'In development', stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Token-based authentication'], focus: 'Making learning feel playful while giving students, teachers, and administrators useful progress insights.', problem: 'Traditional quizzes can feel repetitive and make it difficult for learners to see their progress. Jigyasa combines interactive questions with game mechanics to make practice more engaging.', users: 'Students learning through play, teachers monitoring performance, and administrators managing the platform.', features: ['Interactive quizzes and skill-based challenges', 'Reward points, badges, and leaderboards', 'Score tracking and activity monitoring', 'Role-based access for Admin, Teacher, and Student'], lessons: ['Designing educational flows around clear feedback loops', 'Balancing kid-friendly interactions with useful performance data'], stackNotes: ['React: the interface is built from reusable components and state-driven views.', 'Node.js and Express: planned API layer for quizzes, users, scores, and activity data.', 'MongoDB: planned persistence for profiles, questions, attempts, and rewards.', 'Token-based authentication: planned foundation for secure role-based access.'], next: ['Gmail OTP integration', 'Sound effects and celebratory animations', 'Achievement unlocks and multiplayer quiz mode', 'AI-assisted difficulty adjustment and mobile optimization'], github: '', demo: '' },
    { t: 'BLCKS', image: '/BLCKS.png', tag: 'No-code page builder', d: 'An in-progress template-based web application that helps users build and host webpage platforms without writing code.', firstCommit: 'A reusable block that could become the starting point for a complete page.', status: 'Under progress', stack: ['React', 'Tailwind CSS'], focus: 'Making webpage creation accessible through reusable templates, visual composition, and a simple publishing workflow.', problem: 'Starting a webpage from a blank file is slow and requires coding knowledge. BLCKS aims to let users assemble and host useful page platforms from ready-made templates.', users: 'Creators, small teams, and non-technical users who want to launch webpages quickly.', features: ['Template-based webpage creation', 'Reusable blocks for composing page layouts', 'A visual path from choosing a template to publishing', 'Hosting support as the product develops'], lessons: ['Designing reusable UI blocks that remain flexible across layouts', 'Reducing technical friction without hiding useful customization'], stackNotes: ['React: blocks are reusable components that can be composed into a page.', 'Tailwind CSS: utility classes style each block directly in the markup.'], next: ['Drag-and-drop page composition', 'Live preview and responsive editing', 'Export or publish pages from the builder', 'More templates, block variants, and custom domains'], github: '', demo: '' },
    { t: 'AniBuy', image: '/anibuy.png', tag: 'Anime merchandise store', d: 'An e-commerce project for anime merchandise.', firstCommit: 'A storefront concept built around making discovery feel as exciting as the product.', status: 'Project build', stack: ['E-commerce'], focus: 'The shopping experience and product presentation.', problem: "Fans want to browse and buy anime merchandise in one place, so a store has to make products easy to find and the purchase simple.", users: "Anime fans shopping for merchandise.", lessons: ['Presenting themed products in a focused storefront experience.'], stackNotes: ["E-commerce: product listing, product detail and a purchase flow are the core pages of a store."], next: ["Search and filters by series or category", "A wishlist", "Order history"], github: '', demo: '' },
    { t: 'QuickPick', image: '/QuickPick.png', tag: 'E-commerce project', d: 'An e-commerce project centred on a straightforward shopping workflow.', status: 'Project build', stack: ['E-commerce'], focus: 'Interface and shopping workflow.', problem: "A shopping site works best when the path from finding a product to buying it is short and clear.", users: "Everyday online shoppers.", lessons: ['Keeping product discovery and the path to checkout direct.'], stackNotes: ["E-commerce: the project is built around a product-to-checkout workflow."], next: ["Product comparison", "A cart that persists between visits", "A delivery estimate at checkout"], github: '', demo: '' },
    { t: 'Recipe Generator', image: '/Cook.png', tag: 'Recipe app', d: 'A recipe generator application.', status: 'Project build', stack: [], focus: 'Helping a visitor get from ingredients to a recipe.', problem: "Deciding what to cook is a daily question. A recipe generator turns what is at home into concrete suggestions.", users: "Home cooks.", lessons: ['Turning a simple input into a useful, easy-to-follow result.'], stackNotes: [], next: ["Filters for diet and cooking time", "Saved favourite recipes", "Scaling servings"], github: '', demo: '' },
    { t: 'Laravel Quiz App', image: '/Laravel.png', tag: 'Backend-driven quiz', d: 'A quiz application built with Laravel.', status: 'Project build', stack: ['Laravel'], focus: 'Server-side application structure.', problem: "A server-side quiz keeps questions, scoring and results in one place that the interface asks for.", users: "Learners taking quizzes, and whoever maintains the questions.", lessons: ['Structuring quiz logic and results around a server-side application flow.'], stackNotes: ["Laravel: a PHP framework with a Model-View-Controller structure for routes, logic and views."], next: ["An admin screen to add and edit questions", "Per-user score history", "Timed quizzes"], github: '', demo: '' },
  ],
  training: [
    ['Fundamentals', 'Java, C++ and Python as the base.'], ['Projects', 'Six builds across React, Tailwind and Laravel.'], ['Problem-solving', '100+ LeetCode questions solved.'],
    ['HackerRank', 'Four stars in Java and in C++.'], ['NPTEL', 'Cloud Computing certification.'], ['Coursera', 'Generative AI for Everyone certification.'],
    ['LinkedIn', 'Front-End Web Development course.'], ['Google', 'UX Design Professional Certificate.'], ['Next', 'Preparing for more challenging engineering work.'],
  ],
  focus: 'Backend development and Data Structures and Algorithms: stronger fundamentals, cleaner systems, harder problems.',
};


export const INTRO = {
  src: '/intro.mp4',   // H.264 MP4
  webm: '',            // optional smaller WebM, e.g. '/intro.webm'
  fit: 'cover',        // 'cover' fills the screen (crops edges); 'contain' shows the whole frame with black bars
};

export const BACKGROUND = {
  src: '/Background.mp4',  // H.264 MP4, muted and looped
  webm: '',                // optional smaller WebM, e.g. '/Background.webm'
  poster: '',              // optional still frame, e.g. '/background-poster.jpg' (also used for reduced motion)
  dim: 0.55,               // video brightness 0-1; lower = darker, easier to read the panels
  grayscale: true,         // true = black-and-white manga look; false = keep the video's own colours
  minLoadMs: 1500,         // loader is always visible at least this long
  maxWaitMs: 12000,        // give up waiting after this and open the site anyway
};

// Artwork shown in the manga pages. Files live in /public/img. Change a path here to swap a picture.
export const IMG = {
  cover: '/img/cover.webp',   // cover hero (tall portrait)
  eyes:  '/img/eyes.webp',    // Origin banner (wide)
  draw:  '/img/draw.webp',    // The Draw splash (wide)
  porch: '/img/porch.webp',   // The Draw, mini manga page
  duo:   '/img/duo.webp',     // Stillness interlude, top
  face:  '/img/face.webp',    // Stillness interlude, bottom left
  back:  '/img/back.webp',    // Final page landscape
  last:  '/last.png',         // Final manga page image
  action: '/img/action.webp', // Comic action panel on The Poet's Hour page (drawn fallback until the file exists)
  avatar: '/img/avatar.webp', // Avatar writing haiku, right side of The Poet's Hour page (drawn fallback until the file exists)
};

// Character card (opens from the Character Profile panel on the Origin page).
// The card also reads CONFIG.dossier, CONFIG.skills, CONFIG.training and CONFIG.focus, so edit those above.
export const CARD = {
  title: 'THE BUILDER',
  level: 'LV. 02',
  // Shown beside the project count (which is read from CONFIG.projects).
  stats: [['100+', 'LEETCODE SOLVED'], ['4★', 'HACKERRANK, JAVA AND C++'], ['4', 'COURSES AND CERTIFICATES']],
};
