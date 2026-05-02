# Leaderboard Clone Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a pixel-faithful static leaderboard clone at `task-1/` using vanilla HTML/CSS/JS with animal-kingdom themed fictional data, deployable to GitHub Pages.

**Architecture:** A single-page app with no build step — `data.js` declares a global `EMPLOYEES` array, `app.js` reads it, applies in-memory filter/sort logic, and re-renders the podium + ranked list on every state change. All styling lives in `styles.css`. Pure filter functions are separated from DOM code so they can be tested with `node`.

**Tech Stack:** Vanilla HTML5, CSS3 (custom properties, flexbox), vanilla ES6 JavaScript, Node.js (for automated filter-logic tests only), GitHub Pages (deployment).

---

## File Map

| File | Responsibility |
|---|---|
| `task-1/index.html` | App shell: semantic HTML, loads CSS and both JS files in correct order |
| `task-1/styles.css` | All visual styling: variables, header, filter bar, podium, list rows, activity panel, responsive breakpoints |
| `task-1/data.js` | 20 animal employees with 3–8 activities each; exposes `EMPLOYEES` global; adds `module.exports` guard for Node tests |
| `task-1/app.js` | Pure filter functions (`getQuarter`, `filterActivities`, `computeRankedEmployees`) + DOM rendering + event wiring; adds `module.exports` guard for Node tests |
| `task-1/filter-test.js` | Temporary Node test script — deleted after Task 4 passes |
| `task-1/report.md` | Write-up: approach, tools, data replacement rationale, responsive strategy |

---

## Task 1: Static Data (`data.js`)

**Files:**
- Create: `task-1/data.js`

- [ ] **Step 1: Create `task-1/data.js` with the full dataset**

```js
const EMPLOYEES = [
  // ── Savanna Division ──────────────────────────────────────────────────────
  {
    id: 1, name: "Leo Panthera", title: "Senior Apex Predator",
    department: "Savanna Division", avatar: "🦁",
    activities: [
      { id: 1,  name: "[LAB] Savanna Summit Keynote",       category: "Public Speaking",       date: "2025-02-10", points: 96 },
      { id: 2,  name: "[EDU] Mentoring Young Cubs",         category: "Education",             date: "2025-03-15", points: 64 },
      { id: 3,  name: "[UNI] Academic Partnership Forum",   category: "University Partnership", date: "2024-11-05", points: 48 },
      { id: 4,  name: "[EDU] Pride Leadership Workshop",    category: "Education",             date: "2024-07-20", points: 32 },
      { id: 5,  name: "[LAB] Wildlife Conference Talk",     category: "Public Speaking",       date: "2023-09-12", points: 16 },
    ]
  },
  {
    id: 2, name: "Zara Zebra", title: "Stripe Analytics Lead",
    department: "Savanna Division", avatar: "🦓",
    activities: [
      { id: 6,  name: "[EDU] Stripe Pattern Analysis",      category: "Education",             date: "2025-04-08", points: 64 },
      { id: 7,  name: "[LAB] Herd Data Podcast",            category: "Public Speaking",       date: "2025-01-19", points: 48 },
      { id: 8,  name: "[UNI] Campus Biodiversity Talk",     category: "University Partnership", date: "2024-08-14", points: 32 },
      { id: 9,  name: "[EDU] Predator Avoidance 101",       category: "Education",             date: "2024-03-22", points: 16 },
      { id: 10, name: "[LAB] Grassland Symposium",          category: "Public Speaking",       date: "2023-06-30", points: 16 },
    ]
  },
  {
    id: 3, name: "Ella Elephant", title: "Chief Memory Officer",
    department: "Savanna Division", avatar: "🐘",
    activities: [
      { id: 11, name: "[EDU] Long-Term Memory Workshop",    category: "Education",             date: "2025-05-22", points: 80 },
      { id: 12, name: "[LAB] Elephant Walk Conference",     category: "Public Speaking",       date: "2025-02-17", points: 64 },
      { id: 13, name: "[UNI] Cognitive Science Seminar",    category: "University Partnership", date: "2024-10-09", points: 48 },
      { id: 14, name: "[EDU] Herd Navigation Masterclass",  category: "Education",             date: "2024-04-03", points: 32 },
      { id: 15, name: "[LAB] Savanna Water Summit",         category: "Public Speaking",       date: "2024-01-28", points: 32 },
      { id: 16, name: "[EDU] Calf Mentorship Program",      category: "Education",             date: "2023-11-15", points: 16 },
    ]
  },
  {
    id: 4, name: "Gigi Giraffe", title: "Head of Tall Data",
    department: "Savanna Division", avatar: "🦒",
    activities: [
      { id: 17, name: "[EDU] Treetop Data Access",          category: "Education",             date: "2025-08-11", points: 64 },
      { id: 18, name: "[LAB] Height Advantage Workshop",    category: "Public Speaking",       date: "2024-05-20", points: 48 },
      { id: 19, name: "[UNI] Savanna Ecology Lecture",      category: "University Partnership", date: "2023-10-07", points: 32 },
      { id: 20, name: "[EDU] Long-Neck Leadership",         category: "Education",             date: "2023-02-14", points: 16 },
    ]
  },
  {
    id: 5, name: "Henry Hippo", title: "Infrastructure Warden",
    department: "Savanna Division", avatar: "🦛",
    activities: [
      { id: 21, name: "[LAB] Waterhole Tech Talk",          category: "Public Speaking",       date: "2025-07-03", points: 64 },
      { id: 22, name: "[EDU] River Safety Workshop",        category: "Education",             date: "2024-12-19", points: 32 },
      { id: 23, name: "[UNI] Infrastructure Expo",          category: "University Partnership", date: "2024-06-08", points: 16 },
      { id: 24, name: "[LAB] Mud Architecture Panel",       category: "Public Speaking",       date: "2023-04-25", points: 16 },
    ]
  },

  // ── Arctic Team ───────────────────────────────────────────────────────────
  {
    id: 6, name: "Polly Penguin", title: "Ice Flow Engineer",
    department: "Arctic Team", avatar: "🐧",
    activities: [
      { id: 25, name: "[EDU] Ice Sheet Dynamics",           category: "Education",             date: "2025-01-14", points: 64 },
      { id: 26, name: "[LAB] Antarctic Tech Summit",        category: "Public Speaking",       date: "2025-03-08", points: 48 },
      { id: 27, name: "[UNI] Polar Science Seminar",        category: "University Partnership", date: "2024-09-22", points: 32 },
      { id: 28, name: "[EDU] Waddle Leadership Series",     category: "Education",             date: "2024-06-17", points: 16 },
      { id: 29, name: "[LAB] Sub-Zero Ops Podcast",         category: "Public Speaking",       date: "2023-11-30", points: 16 },
    ]
  },
  {
    id: 7, name: "Bella Bear", title: "Permafrost Architect",
    department: "Arctic Team", avatar: "🐻",
    activities: [
      { id: 30, name: "[EDU] Hibernation Productivity",     category: "Education",             date: "2025-02-28", points: 80 },
      { id: 31, name: "[LAB] Arctic Innovation Forum",      category: "Public Speaking",       date: "2025-01-10", points: 64 },
      { id: 32, name: "[UNI] Glacier Research Partnership", category: "University Partnership", date: "2024-11-18", points: 48 },
      { id: 33, name: "[EDU] Foraging Optimisation",        category: "Education",             date: "2024-08-05", points: 32 },
      { id: 34, name: "[LAB] Snowfield Strategy Session",   category: "Public Speaking",       date: "2024-03-12", points: 16 },
      { id: 35, name: "[UNI] Wildlife Studies Partnership", category: "University Partnership", date: "2023-07-24", points: 16 },
      { id: 36, name: "[EDU] Den Design Workshop",          category: "Education",             date: "2023-01-09", points: 16 },
    ]
  },
  {
    id: 8, name: "Wally Walrus", title: "Senior Tusk Analyst",
    department: "Arctic Team", avatar: "🦭",
    activities: [
      { id: 37, name: "[LAB] Tusk Tech Conference",         category: "Public Speaking",       date: "2025-06-04", points: 64 },
      { id: 38, name: "[EDU] Arctic Survival Masterclass",  category: "Education",             date: "2024-10-16", points: 32 },
      { id: 39, name: "[UNI] Marine Biology Seminar",       category: "University Partnership", date: "2024-02-21", points: 16 },
      { id: 40, name: "[LAB] Ice Floe Keynote",             category: "Public Speaking",       date: "2023-08-13", points: 16 },
    ]
  },
  {
    id: 9, name: "Felix Fox", title: "Arctic Data Scout",
    department: "Arctic Team", avatar: "🦊",
    activities: [
      { id: 41, name: "[EDU] Tracking Algorithms 101",      category: "Education",             date: "2025-09-09", points: 64 },
      { id: 42, name: "[LAB] Tundra Data Expo",             category: "Public Speaking",       date: "2025-04-25", points: 48 },
      { id: 43, name: "[UNI] Ecosystems Research Talk",     category: "University Partnership", date: "2024-12-03", points: 32 },
      { id: 44, name: "[EDU] Night Vision Analytics",       category: "Education",             date: "2024-07-11", points: 16 },
      { id: 45, name: "[LAB] Arctic Cunning Workshop",      category: "Public Speaking",       date: "2023-05-18", points: 16 },
    ]
  },
  {
    id: 10, name: "Owen Orca", title: "Deep Ocean Strategist",
    department: "Arctic Team", avatar: "🐋",
    activities: [
      { id: 46, name: "[LAB] Pod Communication Summit",     category: "Public Speaking",       date: "2025-08-20", points: 64 },
      { id: 47, name: "[EDU] Echolocation Engineering",     category: "Education",             date: "2024-05-14", points: 48 },
      { id: 48, name: "[UNI] Marine Mammal Research",       category: "University Partnership", date: "2023-12-07", points: 32 },
    ]
  },

  // ── Forest Guild ──────────────────────────────────────────────────────────
  {
    id: 11, name: "Ollie Owl", title: "Wisdom Systems Lead",
    department: "Forest Guild", avatar: "🦉",
    activities: [
      { id: 49, name: "[EDU] Nocturnal Leadership Series",  category: "Education",             date: "2025-10-15", points: 80 },
      { id: 50, name: "[LAB] Woodland Wisdom Conference",   category: "Public Speaking",       date: "2025-06-28", points: 64 },
      { id: 51, name: "[UNI] Forest Ecology Partnership",   category: "University Partnership", date: "2025-02-12", points: 48 },
      { id: 52, name: "[EDU] Head Rotation Analytics",      category: "Education",             date: "2024-09-30", points: 32 },
      { id: 53, name: "[LAB] Dusk Data Podcast",            category: "Public Speaking",       date: "2024-04-16", points: 16 },
      { id: 54, name: "[EDU] Silent Flight Workshop",       category: "Education",             date: "2023-11-05", points: 16 },
    ]
  },
  {
    id: 12, name: "Barry Badger", title: "Tunnel Operations Manager",
    department: "Forest Guild", avatar: "🦡",
    activities: [
      { id: 55, name: "[LAB] Underground Infrastructure Talk", category: "Public Speaking",    date: "2025-03-22", points: 64 },
      { id: 56, name: "[EDU] Sett Architecture Workshop",   category: "Education",             date: "2024-11-27", points: 32 },
      { id: 57, name: "[UNI] Burrowing Science Seminar",    category: "University Partnership", date: "2024-06-03", points: 16 },
      { id: 58, name: "[EDU] Nocturnal Ops Masterclass",    category: "Education",             date: "2023-08-19", points: 16 },
    ]
  },
  {
    id: 13, name: "Wendy Wolf", title: "Pack Coordination Lead",
    department: "Forest Guild", avatar: "🐺",
    activities: [
      { id: 59, name: "[EDU] Pack Dynamics Workshop",       category: "Education",             date: "2025-07-19", points: 80 },
      { id: 60, name: "[LAB] Howl Tech Keynote",            category: "Public Speaking",       date: "2025-04-03", points: 64 },
      { id: 61, name: "[UNI] Territory Research Seminar",   category: "University Partnership", date: "2024-12-14", points: 48 },
      { id: 62, name: "[EDU] Leadership in the Wild",       category: "Education",             date: "2024-08-21", points: 32 },
      { id: 63, name: "[LAB] Forest Strategy Summit",       category: "Public Speaking",       date: "2024-02-09", points: 32 },
      { id: 64, name: "[UNI] Apex Ecology Partnership",     category: "University Partnership", date: "2023-06-17", points: 16 },
    ]
  },
  {
    id: 14, name: "Dave Deer", title: "Woodland UX Designer",
    department: "Forest Guild", avatar: "🦌",
    activities: [
      { id: 65, name: "[LAB] Antler Design Panel",          category: "Public Speaking",       date: "2025-11-04", points: 64 },
      { id: 66, name: "[EDU] Woodland Wayfinding",          category: "Education",             date: "2025-08-17", points: 48 },
      { id: 67, name: "[UNI] Forest Sciences Partnership",  category: "University Partnership", date: "2024-10-28", points: 32 },
      { id: 68, name: "[EDU] Grazing Optimisation 101",     category: "Education",             date: "2024-05-09", points: 16 },
      { id: 69, name: "[LAB] Dappled Light Conference",     category: "Public Speaking",       date: "2023-03-23", points: 16 },
    ]
  },
  {
    id: 15, name: "Rex Raccoon", title: "Night Shift Engineer",
    department: "Forest Guild", avatar: "🦝",
    activities: [
      { id: 70, name: "[EDU] Dumpster Data Analytics",      category: "Education",             date: "2025-09-30", points: 64 },
      { id: 71, name: "[LAB] Urban Survival Talk",          category: "Public Speaking",       date: "2024-07-06", points: 32 },
      { id: 72, name: "[UNI] Foraging Science Seminar",     category: "University Partnership", date: "2023-10-12", points: 16 },
    ]
  },

  // ── Sky Corps ─────────────────────────────────────────────────────────────
  {
    id: 16, name: "Eva Eagle", title: "Chief Aerial Officer",
    department: "Sky Corps", avatar: "🦅",
    activities: [
      { id: 73, name: "[EDU] Thermal Dynamics Workshop",    category: "Education",             date: "2025-06-17", points: 80 },
      { id: 74, name: "[LAB] Sky Corps Leadership Summit",  category: "Public Speaking",       date: "2025-05-12", points: 64 },
      { id: 75, name: "[UNI] Aviation Ecology Research",    category: "University Partnership", date: "2025-01-08", points: 48 },
      { id: 76, name: "[EDU] Nest Architecture 101",        category: "Education",             date: "2024-11-23", points: 48 },
      { id: 77, name: "[LAB] High Altitude Keynote",        category: "Public Speaking",       date: "2024-07-14", points: 32 },
      { id: 78, name: "[UNI] Bird Migration Study",         category: "University Partnership", date: "2024-03-29", points: 32 },
      { id: 79, name: "[EDU] Sharp Vision Analytics",       category: "Education",             date: "2023-09-01", points: 16 },
    ]
  },
  {
    id: 17, name: "Perry Parrot", title: "Communications Director",
    department: "Sky Corps", avatar: "🦜",
    activities: [
      { id: 80, name: "[LAB] Multicolour Data Expo",        category: "Public Speaking",       date: "2025-10-11", points: 64 },
      { id: 81, name: "[EDU] Mimicry & Communication",      category: "Education",             date: "2025-07-26", points: 48 },
      { id: 82, name: "[UNI] Language Science Seminar",     category: "University Partnership", date: "2025-03-14", points: 32 },
      { id: 83, name: "[LAB] Sky Corps Podcast",            category: "Public Speaking",       date: "2024-09-05", points: 16 },
      { id: 84, name: "[EDU] Feather Display Masterclass",  category: "Education",             date: "2023-12-28", points: 16 },
    ]
  },
  {
    id: 18, name: "Fiona Flamingo", title: "Head of Graceful Systems",
    department: "Sky Corps", avatar: "🦩",
    activities: [
      { id: 85, name: "[EDU] Balance & Precision Workshop", category: "Education",             date: "2025-05-07", points: 64 },
      { id: 86, name: "[LAB] Wetland Strategy Conference",  category: "Public Speaking",       date: "2024-11-15", points: 48 },
      { id: 87, name: "[UNI] Biodiversity Research Talk",   category: "University Partnership", date: "2024-08-26", points: 32 },
      { id: 88, name: "[EDU] One-Leg Leadership",           category: "Education",             date: "2024-02-18", points: 16 },
      { id: 89, name: "[LAB] Pink Data Panel",              category: "Public Speaking",       date: "2023-07-04", points: 16 },
    ]
  },
  {
    id: 19, name: "Harry Hawk", title: "Speed & Agility Lead",
    department: "Sky Corps", avatar: "🐦",
    activities: [
      { id: 90, name: "[LAB] Dive Velocity Conference",     category: "Public Speaking",       date: "2025-04-14", points: 64 },
      { id: 91, name: "[EDU] Precision Targeting 101",      category: "Education",             date: "2024-10-01", points: 48 },
      { id: 92, name: "[UNI] Raptor Science Seminar",       category: "University Partnership", date: "2024-05-23", points: 32 },
      { id: 93, name: "[EDU] Wind Reading Workshop",        category: "Education",             date: "2023-02-06", points: 16 },
    ]
  },
  {
    id: 20, name: "Pam Peacock", title: "Visual Design Lead",
    department: "Sky Corps", avatar: "🦚",
    activities: [
      { id: 94, name: "[EDU] Display Plumage Analytics",    category: "Education",             date: "2025-12-01", points: 64 },
      { id: 95, name: "[LAB] Colour Theory Conference",     category: "Public Speaking",       date: "2025-09-16", points: 48 },
      { id: 96, name: "[UNI] Art & Science Partnership",    category: "University Partnership", date: "2024-06-30", points: 32 },
      { id: 97, name: "[EDU] Feather Pattern Workshop",     category: "Education",             date: "2023-04-10", points: 16 },
    ]
  },
];

if (typeof module !== "undefined") module.exports = { EMPLOYEES };
```

- [ ] **Step 2: Verify the data file is well-formed**

```bash
node -e "const { EMPLOYEES } = require('./task-1/data.js'); console.log('Employees:', EMPLOYEES.length); console.log('Total activities:', EMPLOYEES.reduce((s,e)=>s+e.activities.length,0));"
```

Expected output:
```
Employees: 20
Total activities: 97
```

- [ ] **Step 3: Commit**

```bash
git add task-1/data.js
git commit -m "feat: add animal-kingdom employee dataset (20 employees, 97 activities)"
```

---

## Task 2: HTML Shell (`index.html`)

**Files:**
- Create: `task-1/index.html`

- [ ] **Step 1: Create `task-1/index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Leaderboard</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>

  <header class="page-header">
    <h1>Leaderboard</h1>
    <p>Top performers based on contributions and activity</p>
  </header>

  <div class="filter-bar">
    <select id="year-filter" aria-label="Filter by year">
      <option value="all">All Years</option>
      <option value="2023">2023</option>
      <option value="2024">2024</option>
      <option value="2025">2025</option>
    </select>

    <select id="quarter-filter" aria-label="Filter by quarter">
      <option value="all">All Quarters</option>
      <option value="Q1">Q1</option>
      <option value="Q2">Q2</option>
      <option value="Q3">Q3</option>
      <option value="Q4">Q4</option>
    </select>

    <select id="category-filter" aria-label="Filter by category">
      <option value="all">All Categories</option>
      <option value="Education">Education</option>
      <option value="Public Speaking">Public Speaking</option>
      <option value="University Partnership">University Partnership</option>
    </select>

    <div class="search-wrapper">
      <span class="search-icon" aria-hidden="true">🔍</span>
      <input
        id="search-input"
        type="text"
        placeholder="Search employee..."
        aria-label="Search employee"
        autocomplete="off"
      />
      <button id="search-clear" hidden aria-label="Clear search">✕</button>
    </div>
  </div>

  <main class="main-content">
    <div id="podium"></div>
    <div id="list"></div>
  </main>

  <script src="data.js"></script>
  <script src="app.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open `task-1/index.html` in a browser (double-click or `start task-1/index.html`)**

Expected: blank white page — no JS errors in the console (open DevTools → Console). The `<script src="data.js">` will fail to load because `app.js` doesn't exist yet; that's acceptable at this stage.

- [ ] **Step 3: Commit**

```bash
git add task-1/index.html
git commit -m "feat: add HTML shell for leaderboard app"
```

---

## Task 3: Full CSS (`styles.css`)

**Files:**
- Create: `task-1/styles.css`

- [ ] **Step 1: Create `task-1/styles.css` with all styles**

```css
/* ── Variables ──────────────────────────────────────────────────────────── */
:root {
  --gold:     #f5c518;
  --silver:   #a8a9ad;
  --bronze:   #cd7f32;
  --bg:       #f0f2f5;
  --white:    #ffffff;
  --blue:     #1877f2;
  --blue-sub: #4a90d9;
  --text:     #1a1a2e;
  --muted:    #888;
  --border:   #e5e7eb;
  --shadow:   0 1px 4px rgba(0, 0, 0, 0.08);
  --radius:   8px;
}

/* ── Reset ──────────────────────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
}

/* ── Page Header ────────────────────────────────────────────────────────── */
.page-header {
  background: var(--white);
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--border);
}

.page-header h1 {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.2rem;
}

.page-header p {
  color: var(--blue-sub);
  font-size: 0.875rem;
}

/* ── Filter Bar ─────────────────────────────────────────────────────────── */
.filter-bar {
  background: var(--white);
  padding: 0.875rem 2rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  gap: 0.625rem;
  align-items: center;
}

.filter-bar select {
  padding: 0.45rem 2rem 0.45rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 0.875rem;
  background: var(--white);
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23888'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.6rem center;
}

.filter-bar select:focus { outline: 2px solid var(--blue); outline-offset: 1px; }

.search-wrapper {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  font-size: 0.875rem;
  pointer-events: none;
}

#search-input {
  width: 100%;
  padding: 0.45rem 2.25rem 0.45rem 2.1rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 0.875rem;
  background: var(--bg);
}

#search-input:focus {
  outline: 2px solid var(--blue);
  outline-offset: 1px;
  background: var(--white);
}

#search-clear {
  position: absolute;
  right: 0.6rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--muted);
  font-size: 0.875rem;
  padding: 0.2rem;
  line-height: 1;
}

#search-clear:hover { color: var(--text); }

/* ── Main Content ───────────────────────────────────────────────────────── */
.main-content { padding: 2rem; }

/* ── Podium ─────────────────────────────────────────────────────────────── */
.podium-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 0;
}

.podium-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180px;
}

.podium-avatar-wrapper {
  position: relative;
  margin-bottom: 0.5rem;
}

.podium-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #dde1e7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  border: 3px solid transparent;
}

.podium-slot--center .podium-avatar {
  width: 90px;
  height: 90px;
  font-size: 2.8rem;
}

.podium-rank-badge {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: 0.7rem;
  font-weight: 700;
  border: 2px solid var(--white);
}

.podium-name {
  font-size: 0.875rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.15rem;
  line-height: 1.2;
}

.podium-info {
  font-size: 0.725rem;
  color: var(--muted);
  text-align: center;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.podium-points {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 0.2rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--blue);
  margin-bottom: 0.5rem;
  white-space: nowrap;
}

.podium-platform {
  width: 100%;
  border-radius: 6px 6px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.65;
}

.podium-platform-num {
  font-size: 3.5rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1;
}

/* ── List (rank 4+) ─────────────────────────────────────────────────────── */
#list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.list-row {
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 2px solid transparent;
}

.list-row:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.11);
}

.list-row.expanded {
  border-color: var(--blue);
}

.list-row-header {
  display: flex;
  align-items: center;
  padding: 0.875rem 1.25rem;
  gap: 0.875rem;
  cursor: pointer;
  user-select: none;
}

.list-rank {
  min-width: 2rem;
  text-align: right;
  font-size: 0.875rem;
  color: var(--muted);
  font-weight: 500;
}

.list-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #dde1e7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.list-info {
  flex: 1;
  min-width: 0;
}

.list-name {
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.2;
}

.list-sub {
  font-size: 0.775rem;
  color: var(--muted);
  margin-top: 0.1rem;
}

.list-pills {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-shrink: 0;
}

.cat-pill {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
  padding: 0.3rem 0.45rem;
  border-radius: 6px;
  font-size: 0.7rem;
  min-width: 34px;
  line-height: 1;
}

.cat-pill span:first-child { font-size: 0.9rem; }

.cat-edu { background: #dbeafe; }
.cat-lab { background: #fff3cd; }
.cat-uni { background: #d1fae5; }

.list-total {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0.875rem;
  border-left: 1px solid var(--border);
  flex-shrink: 0;
}

.list-total-label {
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--muted);
  margin-bottom: 0.15rem;
}

.list-total-score {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--blue);
  white-space: nowrap;
}

.expand-btn {
  background: none;
  border: none;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--muted);
  transition: background 0.15s;
  flex-shrink: 0;
}

.expand-btn:hover { background: var(--bg); }

.chevron {
  font-size: 1.1rem;
  display: inline-block;
  transition: transform 0.2s ease;
  line-height: 1;
}

.chevron.open { transform: rotate(90deg); }

/* ── Activity Panel ─────────────────────────────────────────────────────── */
.activity-panel { display: none; }
.activity-panel.visible { display: block; }

.activity-panel-inner {
  padding: 0 1.25rem 1rem 1.25rem;
  border-top: 1px solid var(--border);
}

.activity-panel-title {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--muted);
  padding: 0.75rem 0 0.5rem;
}

.activity-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.84rem;
}

.activity-table th {
  text-align: left;
  padding: 0.4rem 0.75rem;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--muted);
  font-weight: 600;
  border-bottom: 1px solid var(--border);
}

.activity-table td {
  padding: 0.65rem 0.75rem;
  border-bottom: 1px solid var(--border);
  vertical-align: middle;
}

.activity-table tr:last-child td { border-bottom: none; }

.cat-badge {
  display: inline-block;
  padding: 0.2rem 0.65rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
}

.points-cell {
  color: var(--blue);
  font-weight: 700;
  text-align: right;
}

/* ── Empty state ─────────────────────────────────────────────────────────── */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--muted);
  font-size: 0.9rem;
}

/* ── Responsive (≤ 640 px) ───────────────────────────────────────────────── */
@media (max-width: 640px) {
  .page-header { padding: 1rem 1rem; }
  .page-header h1 { font-size: 1.4rem; }

  .filter-bar {
    padding: 0.75rem 1rem;
    flex-wrap: wrap;
  }

  .filter-bar select { flex: 1 1 calc(50% - 0.3rem); min-width: 0; }
  .search-wrapper { flex: 1 1 100%; }

  .main-content { padding: 1rem; }

  .podium-slot { width: 100px; }
  .podium-avatar { width: 52px !important; height: 52px !important; font-size: 1.6rem !important; }
  .podium-platform-num { font-size: 2.2rem; }
  .podium-name { font-size: 0.75rem; }
  .podium-info { font-size: 0.65rem; }

  .list-name, .list-sub {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 140px;
  }

  .list-pills { display: none; }
}
```

- [ ] **Step 2: Open `task-1/index.html` in a browser (with DevTools open)**

Expected: white header "Leaderboard" with blue subtitle, filter bar with three dropdowns + search input — no JS errors. Page background is light gray. *(The podium and list are empty because `app.js` doesn't exist yet.)*

- [ ] **Step 3: Commit**

```bash
git add task-1/styles.css
git commit -m "feat: add full CSS (header, filter bar, podium, list, activity panel, responsive)"
```

---

## Task 4: Filter Logic (`app.js` — pure functions, node-tested)

**Files:**
- Create: `task-1/app.js`
- Create (temp): `task-1/filter-test.js`

- [ ] **Step 1: Write `task-1/filter-test.js` (the failing test)**

```js
// task-1/filter-test.js
// Run: node task-1/filter-test.js
const { EMPLOYEES } = require('./data.js');
const { getQuarter, filterActivities, computeRankedEmployees } = require('./app.js');

let passed = 0, failed = 0;

function assert(condition, message) {
  if (condition) { console.log(`  ✓ ${message}`); passed++; }
  else           { console.error(`  ✗ ${message}`); failed++; }
}

const miniActivities = [
  { id: 1, name: "[EDU] A", category: "Education",             date: "2025-01-15", points: 64 },
  { id: 2, name: "[LAB] B", category: "Public Speaking",       date: "2024-06-20", points: 32 },
  { id: 3, name: "[UNI] C", category: "University Partnership", date: "2025-10-05", points: 16 },
];

const all = { year: "all", quarter: "all", category: "all", search: "" };

console.log("\ngetQuarter:");
assert(getQuarter("2025-01-01") === "Q1", "Jan → Q1");
assert(getQuarter("2025-03-31") === "Q1", "Mar → Q1");
assert(getQuarter("2025-04-01") === "Q2", "Apr → Q2");
assert(getQuarter("2025-06-30") === "Q2", "Jun → Q2");
assert(getQuarter("2025-07-01") === "Q3", "Jul → Q3");
assert(getQuarter("2025-09-30") === "Q3", "Sep → Q3");
assert(getQuarter("2025-10-01") === "Q4", "Oct → Q4");
assert(getQuarter("2025-12-31") === "Q4", "Dec → Q4");

console.log("\nfilterActivities:");
assert(filterActivities(miniActivities, all).length === 3,
  "all filters → 3 activities");
assert(filterActivities(miniActivities, { ...all, quarter: "Q1" }).length === 1,
  "Q1 filter → 1 activity (Jan 2025)");
assert(filterActivities(miniActivities, { ...all, category: "Education" }).length === 1,
  "Education filter → 1 activity");
assert(filterActivities(miniActivities, { ...all, year: "2024" }).length === 1,
  "2024 year filter → 1 activity");
assert(filterActivities(miniActivities, { ...all, year: "2025", quarter: "Q4" }).length === 1,
  "2025 Q4 → 1 activity (Oct)");
assert(filterActivities(miniActivities, { ...all, year: "2023" }).length === 0,
  "2023 filter → 0 activities");

console.log("\ncomputeRankedEmployees:");
const ranked = computeRankedEmployees(EMPLOYEES, all);
assert(ranked.length > 0, "returns non-empty array");
assert(ranked.length <= 20, "no more than 20 employees");
assert(ranked[0].filteredTotal >= ranked[1].filteredTotal, "sorted desc by filteredTotal");
assert(ranked.every(e => e.filteredTotal > 0), "all results have filteredTotal > 0");
assert(ranked.every(e => Array.isArray(e.filteredActivities)), "each result has filteredActivities array");

const searchRanked = computeRankedEmployees(EMPLOYEES, { ...all, search: "leo" });
assert(searchRanked.length === 1, 'search "leo" → exactly 1 result');
assert(searchRanked[0].name === "Leo Panthera", 'search "leo" → Leo Panthera');

const noMatch = computeRankedEmployees(EMPLOYEES, { ...all, search: "zzznomatch" });
assert(noMatch.length === 0, "unmatched search → empty array");

const q1Ranked = computeRankedEmployees(EMPLOYEES, { ...all, year: "2025", quarter: "Q1" });
assert(q1Ranked.every(e =>
  e.filteredActivities.every(a => a.date.startsWith("2025") && getQuarter(a.date) === "Q1")
), "Q1 2025: all filtered activities are in Q1 2025");

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
```

- [ ] **Step 2: Run the test — verify it FAILS (app.js doesn't exist yet)**

```bash
node task-1/filter-test.js
```

Expected: `Error: Cannot find module './app.js'`

- [ ] **Step 3: Create `task-1/app.js` with the pure filter functions**

```js
// ── Pure filter/sort functions (no DOM references) ────────────────────────

/**
 * Returns "Q1"–"Q4" for a given ISO date string "YYYY-MM-DD".
 */
function getQuarter(dateStr) {
  const month = new Date(dateStr).getMonth() + 1; // 1–12
  if (month <= 3)  return "Q1";
  if (month <= 6)  return "Q2";
  if (month <= 9)  return "Q3";
  return "Q4";
}

/**
 * Returns the subset of activities matching all active filter dimensions.
 * @param {object[]} activities
 * @param {{ year: string, quarter: string, category: string }} state
 */
function filterActivities(activities, state) {
  return activities.filter(a => {
    if (state.year     !== "all" && a.date.slice(0, 4) !== state.year)    return false;
    if (state.quarter  !== "all" && getQuarter(a.date) !== state.quarter) return false;
    if (state.category !== "all" && a.category         !== state.category) return false;
    return true;
  });
}

/**
 * Returns employees with filteredActivities + filteredTotal, filtered by
 * search name, hiding zero-total employees, sorted desc by filteredTotal.
 * @param {object[]} employees
 * @param {{ year: string, quarter: string, category: string, search: string }} state
 */
function computeRankedEmployees(employees, state) {
  return employees
    .map(emp => {
      const filteredActivities = filterActivities(emp.activities, state);
      const filteredTotal = filteredActivities.reduce((s, a) => s + a.points, 0);
      return { ...emp, filteredActivities, filteredTotal };
    })
    .filter(emp => state.search === "" ||
      emp.name.toLowerCase().includes(state.search.toLowerCase()))
    .filter(emp => emp.filteredTotal > 0)
    .sort((a, b) => b.filteredTotal - a.filteredTotal);
}

// ── Node.js export (for filter-test.js) ──────────────────────────────────
if (typeof module !== "undefined") {
  module.exports = { getQuarter, filterActivities, computeRankedEmployees };
}
```

- [ ] **Step 4: Run the test — verify it PASSES**

```bash
node task-1/filter-test.js
```

Expected last line: `N passed, 0 failed` (all assertions green).

- [ ] **Step 5: Delete the temporary test file**

```bash
# PowerShell
Remove-Item task-1/filter-test.js
```

- [ ] **Step 6: Commit**

```bash
git add task-1/app.js
git commit -m "feat: add filter/sort logic with node-verified tests (getQuarter, filterActivities, computeRankedEmployees)"
```

---

## Task 5: DOM Rendering (podium + list + wiring)

**Files:**
- Modify: `task-1/app.js` (append DOM rendering + event wiring below the pure functions)

- [ ] **Step 1: Append the full DOM rendering block to `task-1/app.js`**

Add everything below the `module.exports` guard at the bottom of `app.js`:

```js
// ── DOM rendering (browser only) ─────────────────────────────────────────
if (typeof document !== "undefined") {

  // ── State ──────────────────────────────────────────────────────────────
  const state = { year: "all", quarter: "all", category: "all", search: "" };
  let expandedId = null;

  // ── Helpers ────────────────────────────────────────────────────────────

  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2,"0")}-${MONTHS[d.getMonth()]}-${d.getFullYear()}`;
  }

  const CATEGORY_META = {
    "Education":             { icon: "🎓", cls: "cat-edu" },
    "Public Speaking":       { icon: "🎤", cls: "cat-lab" },
    "University Partnership":{ icon: "🤝", cls: "cat-uni" },
  };

  function catIcon(category) { return (CATEGORY_META[category] || {}).icon || ""; }
  function catCls(category)  { return (CATEGORY_META[category] || {}).cls || ""; }

  // ── Podium ─────────────────────────────────────────────────────────────

  const RANK_META = [
    { color: "#a8a9ad", height: "120px" }, // rank 2 (left slot, index 0)
    { color: "#f5c518", height: "160px" }, // rank 1 (centre slot, index 1)
    { color: "#cd7f32", height: "100px" }, // rank 3 (right slot, index 2)
  ];

  // Display order: [rank2, rank1, rank3]
  const SLOT_RANKS = [1, 0, 2]; // indexes into `ranked` array

  function renderPodium(ranked) {
    const el = document.getElementById("podium");
    if (ranked.length === 0) { el.innerHTML = ""; return; }

    const slots = SLOT_RANKS.map(i => ranked[i] || null);
    const rankNums = [2, 1, 3];

    el.innerHTML = `
      <div class="podium-container">
        ${slots.map((emp, i) => {
          if (!emp) return `<div class="podium-slot"></div>`;
          const { color, height } = RANK_META[i];
          const isCentre = i === 1;
          return `
            <div class="podium-slot${isCentre ? " podium-slot--center" : ""}">
              <div class="podium-avatar-wrapper">
                <div class="podium-avatar" style="border-color:${color}">${emp.avatar}</div>
                <div class="podium-rank-badge" style="background:${color}">${rankNums[i]}</div>
              </div>
              <div class="podium-name">${emp.name}</div>
              <div class="podium-info">${emp.title} · ${emp.department}</div>
              <div class="podium-points">⭐ ${emp.filteredTotal}</div>
              <div class="podium-platform" style="height:${height};background:${color}">
                <span class="podium-platform-num">${rankNums[i]}</span>
              </div>
            </div>`;
        }).join("")}
      </div>`;
  }

  // ── List (rank 4+) ────────────────────────────────────────────────────

  function pillsHtml(filteredActivities) {
    const counts = {};
    filteredActivities.forEach(a => { counts[a.category] = (counts[a.category] || 0) + 1; });
    return Object.entries(counts).map(([cat, n]) =>
      `<div class="cat-pill ${catCls(cat)}" title="${cat}">
         <span>${catIcon(cat)}</span><span>${n}</span>
       </div>`
    ).join("");
  }

  function activityRowsHtml(filteredActivities) {
    return filteredActivities.map(a => `
      <tr>
        <td>${a.name}</td>
        <td><span class="cat-badge ${catCls(a.category)}">${a.category}</span></td>
        <td>${formatDate(a.date)}</td>
        <td class="points-cell">+${a.points}</td>
      </tr>`).join("");
  }

  function renderList(ranked) {
    const el = document.getElementById("list");
    const listEmployees = ranked.slice(3);

    if (listEmployees.length === 0) {
      el.innerHTML = ranked.length > 0 ? "" : `<div class="empty-state">No employees match the current filters.</div>`;
      return;
    }

    el.innerHTML = listEmployees.map((emp, i) => {
      const rank = i + 4;
      const isExpanded = emp.id === expandedId;
      return `
        <div class="list-row${isExpanded ? " expanded" : ""}" data-id="${emp.id}">
          <div class="list-row-header">
            <span class="list-rank">${rank}</span>
            <div class="list-avatar">${emp.avatar}</div>
            <div class="list-info">
              <div class="list-name">${emp.name}</div>
              <div class="list-sub">${emp.title} · ${emp.department}</div>
            </div>
            <div class="list-pills">${pillsHtml(emp.filteredActivities)}</div>
            <div class="list-total">
              <span class="list-total-label">TOTAL</span>
              <div class="list-total-score">⭐ ${emp.filteredTotal}</div>
            </div>
            <button class="expand-btn" aria-label="Toggle details" aria-expanded="${isExpanded}">
              <span class="chevron${isExpanded ? " open" : ""}">›</span>
            </button>
          </div>
          <div class="activity-panel${isExpanded ? " visible" : ""}">
            <div class="activity-panel-inner">
              <div class="activity-panel-title">RECENT ACTIVITY</div>
              <table class="activity-table">
                <thead>
                  <tr>
                    <th>ACTIVITY</th><th>CATEGORY</th><th>DATE</th><th>POINTS</th>
                  </tr>
                </thead>
                <tbody>${activityRowsHtml(emp.filteredActivities)}</tbody>
              </table>
            </div>
          </div>
        </div>`;
    }).join("");
  }

  // ── Main render ────────────────────────────────────────────────────────

  function render() {
    const ranked = computeRankedEmployees(EMPLOYEES, state);
    renderPodium(ranked);
    renderList(ranked);
  }

  // ── Expand / collapse (event delegation on #list) ──────────────────────

  function initListToggle() {
    document.getElementById("list").addEventListener("click", function (e) {
      const row = e.target.closest(".list-row");
      if (!row) return;

      const id = Number(row.dataset.id);

      if (expandedId === id) {
        expandedId = null;
      } else {
        expandedId = id;
      }
      render(); // re-render preserves expanded state via expandedId
    });
  }

  // ── Filter controls ────────────────────────────────────────────────────

  function initFilters() {
    document.getElementById("year-filter").addEventListener("change", e => {
      state.year = e.target.value; expandedId = null; render();
    });
    document.getElementById("quarter-filter").addEventListener("change", e => {
      state.quarter = e.target.value; expandedId = null; render();
    });
    document.getElementById("category-filter").addEventListener("change", e => {
      state.category = e.target.value; expandedId = null; render();
    });

    const searchInput = document.getElementById("search-input");
    const searchClear = document.getElementById("search-clear");

    searchInput.addEventListener("input", e => {
      state.search = e.target.value;
      searchClear.hidden = state.search === "";
      expandedId = null;
      render();
    });

    searchClear.addEventListener("click", () => {
      state.search = "";
      searchInput.value = "";
      searchClear.hidden = true;
      expandedId = null;
      render();
    });
  }

  // ── Bootstrap ──────────────────────────────────────────────────────────

  document.addEventListener("DOMContentLoaded", function () {
    initFilters();
    initListToggle();
    render();
  });

} // end if (typeof document !== "undefined")
```

- [ ] **Step 2: Open `task-1/index.html` in a browser and verify the full app renders**

Check each of the following:

| # | What to verify | How |
|---|---|---|
| 1 | Podium shows rank 1 (centre, taller), rank 2 (left), rank 3 (right) with correct names | Visual |
| 2 | Each podium slot shows avatar emoji, gold/silver/bronze border + badge, name, title · dept, ⭐ N pill | Visual |
| 3 | List rows rank 4–20 appear below podium, each with avatar, name, category pills, TOTAL score, chevron | Visual |
| 4 | Hovering a list row lifts it slightly (translateY + shadow) | Mouse hover |
| 5 | Clicking a list row expands the activity panel; clicking again collapses it | Click |
| 6 | Opening a second row collapses the first | Click two rows |
| 7 | Activity panel shows ACTIVITY / CATEGORY / DATE / POINTS table with correct data | Visual |
| 8 | Year dropdown → select "2025" → only employees with 2025 activities appear, totals update | Interact |
| 9 | Quarter dropdown → select "Q1" → rankings change | Interact |
| 10 | Category dropdown → select "Education" → only Education activities counted | Interact |
| 11 | Search "wolf" → only Wendy Wolf appears in podium+list | Type |
| 12 | ✕ clear button appears while typing in search, clicking it resets the view | Type then click ✕ |
| 13 | Resize to ≤640 px — filter bar wraps to 2-column, text truncates with ellipsis | Resize |

- [ ] **Step 3: Commit**

```bash
git add task-1/app.js
git commit -m "feat: add DOM rendering, expand/collapse, filter wiring, and search"
```

---

## Task 6: Write-up (`report.md`)

**Files:**
- Create: `task-1/report.md`

- [ ] **Step 1: Create `task-1/report.md`**

```markdown
# Leaderboard Clone — Report

## Approach

The reference UI was reverse-engineered from six annotated screenshots. Each UI section
(header, filter bar, podium, ranked list, activity panel) was mapped to HTML + CSS before
writing any JavaScript, ensuring the layout was correct before wiring up interactivity.

## Tools Used

- **Vanilla HTML / CSS / JavaScript** — no frameworks, no build tools, no dependencies.
- **GitHub Pages** — static hosting directly from the `main` branch root, zero configuration.
- **Node.js** — used during development only to run automated unit tests on the pure filter
  functions (`getQuarter`, `filterActivities`, `computeRankedEmployees`) without opening a
  browser.

## Data Replacement

All real names, photos, job titles, and departments were replaced with an animal-kingdom
theme. Human names → animal species names (e.g. "Leo Panthera 🦁", "Polly Penguin 🐧").
Job titles were reimagined as themed roles ("Senior Apex Predator", "Ice Flow Engineer").
Departments became habitat divisions: Savanna Division, Arctic Team, Forest Guild, Sky Corps.
Activity name prefixes (`[EDU]`, `[LAB]`, `[UNI]`) were preserved exactly, as they appear
in the original UI and encode the category in the activity name itself.

## Architecture

```
data.js   →  declares global EMPLOYEES array (20 employees, 97 activities)
app.js    →  pure filter functions + DOM rendering + event listeners
styles.css → all styling; no inline styles except dynamically-set rank colours
index.html → app shell; loads data.js then app.js
```

State is a plain object `{ year, quarter, category, search }`. On any change, the full
podium and list are re-rendered from scratch — simple and correct for this dataset size.

## Responsive Strategy

At ≤640 px: the four filter controls wrap into a 2-column grid (the search field spans full
width), podium avatar sizes shrink, and list name/subtitle text truncates with ellipsis.
All font sizes and spacing use `rem` and `%` units so text scales with the user's browser
default.
```

- [ ] **Step 2: Commit**

```bash
git add task-1/report.md
git commit -m "docs: add implementation report for leaderboard clone"
```

---

## Task 7: Deploy to GitHub Pages

- [ ] **Step 1: Push the `main` branch to GitHub**

```bash
git push origin main
```

- [ ] **Step 2: Enable GitHub Pages in the repository settings**

1. Open `https://github.com/dzmitrybratchuk/edu-ai-challenge-2/settings/pages`
2. Under **Branch**, select `main` and folder `/` (root), then click **Save**

- [ ] **Step 3: Wait ~60 seconds, then verify the live URL**

Open: `https://dzmitrybratchuk.github.io/edu-ai-challenge-2/task-1/`

Expected: the full leaderboard app loads with the animal-kingdom data, all filters and search work, no console errors.

- [ ] **Step 4: Final commit if any last-minute fix is needed**

```bash
git add -A
git commit -m "fix: <describe fix>"
git push origin main
```

---

## Spec Coverage Checklist (self-review)

| Spec requirement | Task(s) |
|---|---|
| HTML + CSS + JS, no framework, no build step | Tasks 2, 3, 4–5 |
| Files in `task-1/` with exact names | Tasks 1–6 |
| 20 employees, 4 departments, 3–8 activities | Task 1 |
| Activities spread across 2023–2025, all quarters | Task 1 |
| Category distribution ~40/35/25 % | Task 1 |
| `[EDU]`/`[LAB]`/`[UNI]` prefixes on activity names | Task 1 |
| Page header with title + subtitle | Task 2, 3 |
| 4 filter controls (year, quarter, category, search + ✕) | Tasks 2, 3, 5 |
| Podium: rank 2 left, rank 1 centre (taller), rank 3 right | Task 5 |
| Podium: gold/silver/bronze borders, rank badges, name, title·dept, ⭐ pill | Tasks 3, 5 |
| Podium adapts when < 3 results | Task 5 (`SLOT_RANKS.map` skips missing slots) |
| List rows rank 4+ with avatar, name, pills, TOTAL, chevron | Tasks 3, 5 |
| Category icon pills with count (🎓 blue / 🎤 orange / 🤝 green) | Tasks 3, 5 |
| Hover: `translateY(-1px)` + shadow in 0.2 s | Task 3 |
| Expand/collapse: one row at a time, activity table | Tasks 3, 5 |
| Activity table columns: ACTIVITY, CATEGORY, DATE, POINTS | Task 5 |
| Date display format: `DD-Mon-YYYY` | Task 5 (`formatDate`) |
| Filtering: year → quarter (derived from month) → category → search | Task 4 |
| Employees with `filteredTotal === 0` hidden | Task 4 (`computeRankedEmployees`) |
| Search re-ranks podium and list | Tasks 4, 5 |
| Responsive ≤640 px: filter wraps, podium shrinks, text ellipsis | Task 3 |
| Deployed to GitHub Pages | Task 7 |
| `report.md` | Task 6 |
