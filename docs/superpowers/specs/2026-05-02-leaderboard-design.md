# Leaderboard Clone — Design Spec
**Date:** 2026-05-02  
**Status:** Approved

---

## Problem

Replicate an internal company leaderboard as a static frontend-only app. All real data (names, photos, titles, departments) must be replaced with fictional animal-themed data. The result must be deployed to GitHub Pages from the existing repo.

**Reference screenshots** (all in `task-1/Screenshots/`):
| File | What it shows |
|---|---|
| `Leaderboard.png` | Full default view: header, filter bar, podium, ranked list |
| `Employee_card_expanded.png` | A list row in expanded state with Recent Activity table |
| `Employee_card_expanded_UNI_activity.png` | Expanded row showing University Partnership activity entries |
| `Categories_filter.png` | Category dropdown open (All Categories / Education / Public Speaking / University Partnership) |
| `Quarters_filter.png` | Quarter dropdown open (All Quarters / Q1–Q4) |
| `Search_employee_filter.png` | Search input with text entered; podium + list filtered to matching employees |

---

## Approach

Vanilla HTML + CSS + JavaScript. No build step, no framework, no backend. Files live in `task-1/` and are served directly by GitHub Pages from the `main` branch root at:  
`https://dzmitrybratchuk.github.io/edu-ai-challenge-2/task-1/`

---

## File Structure

```
task-1/
├── index.html    # app shell and markup skeleton
├── styles.css    # all styling and responsive breakpoints
├── data.js       # static employee + activity data (animal kingdom theme)
├── app.js        # filter/sort/search logic and DOM rendering
└── report.md     # write-up
```

---

## Data Model

### Employee
```js
{
  id: Number,
  name: String,          // e.g. "Leo Panthera"
  title: String,         // e.g. "Senior Apex Predator"
  department: String,    // e.g. "Savanna Division"
  avatar: String,        // single emoji, e.g. "🦁"
  activities: Activity[]
}
```

### Activity
```js
{
  id: Number,
  name: String,          // e.g. "[EDU] Mentoring Young Cubs"
  category: String,      // "Education" | "Public Speaking" | "University Partnership"
  date: String,          // ISO date "YYYY-MM-DD"
  points: Number
}
```

### Dataset size
- 20 employees across 4 departments (Savanna Division, Arctic Team, Forest Guild, Sky Corps)
- Each employee has 3–8 activities spread across 2023, 2024, 2025 and all four quarters
- Categories distributed roughly: 40% Education, 35% Public Speaking, 25% University Partnership

### Activity name prefixes (matching original pattern visible in `Employee_card_expanded_UNI_activity.png`)
- `[EDU]` — Education
- `[LAB]` — Public Speaking
- `[UNI]` — University Partnership

---

## Application State

```js
const state = { year: "all", quarter: "all", category: "all", search: "" };
```

On any state change: recompute each employee's filtered total → sort descending → re-render podium + list.

---

## UI Components

### Page Header
*(ref: `Leaderboard.png` — top of page)*
- White background, `border-bottom` separator
- Title: **Leaderboard**, subtitle: *Top performers based on contributions and activity*

### Filter Bar
*(ref: `Leaderboard.png`, `Categories_filter.png`, `Quarters_filter.png`, `Search_employee_filter.png`)*
- White background, `border-bottom` separator
- Four controls (all independent, combinable):
  1. **Year** select: All Years / 2023 / 2024 / 2025
  2. **Quarter** select: All Quarters / Q1 / Q2 / Q3 / Q4 — *(`Quarters_filter.png`)*
  3. **Category** select: All Categories / Education / Public Speaking / University Partnership — *(`Categories_filter.png`)*
  4. **Search** text input: filters by employee name, shows ✕ clear button when non-empty — *(`Search_employee_filter.png`)*

### Podium (top 3)
*(ref: `Leaderboard.png` — centre section; `Search_employee_filter.png` — podium updates on search)*
- Layout: Rank 2 (left) · Rank 1 (center, taller platform) · Rank 3 (right)
- Each slot: emoji avatar with coloured border, rank badge (gold/silver/bronze), name, title · dept, ⭐ points pill
- Platform colours: gold `#f5c518`, silver `#a8a9ad`, bronze `#cd7f32`
- If filters reduce results to fewer than 3, only those slots are rendered

### Ranked List (rank 4+)
*(ref: `Leaderboard.png` — bottom section; `Employee_card_expanded.png` and `Employee_card_expanded_UNI_activity.png` — expanded state)*

Each row contains:
- Rank number, avatar emoji, name + `title · department`, category icon pills, `TOTAL ⭐ N`, chevron toggle

**Category icon pills** (circular, one per distinct category with count in that employee's filtered activities):
- 🎓 Education — light blue background
- 🎤 Public Speaking — light orange background
- 🤝 University Partnership — light green background

**Expand/collapse:** clicking a row toggles a **Recent Activity** panel beneath it. Only one row can be expanded at a time — opening a second collapses the first.  
*(ref: `Employee_card_expanded.png` — table structure; `Employee_card_expanded_UNI_activity.png` — UNI category rows)*

**Activity panel columns:** ACTIVITY (category badge + name), CATEGORY (icon + label), DATE, POINTS (`+N`)

**Hover:** CSS transition — `translateY(-1px)` + elevated `box-shadow` over 0.2 s

### Responsiveness
*(ref: all screenshots are desktop; responsive behaviour is inferred from requirements)*
- **≤ 640 px:** filter bar wraps to 2-column grid + full-width search; podium avatar and platform sizes reduce; list text truncates with ellipsis
- All font sizes and spacing use relative units (`rem`, `%`) to scale correctly across viewports

---

## Filtering Logic

1. For each employee, filter their `activities` array by the active year, quarter, and category.
2. Sum `points` of matching activities → `filteredTotal`.
3. Filter employees whose `name` includes the search string (case-insensitive).
4. Sort remaining employees by `filteredTotal` descending.
5. Employees with `filteredTotal === 0` are hidden entirely.
6. Re-render podium (top 3) and list (rank 4+).

Quarter is derived from activity date month: Q1 = Jan–Mar, Q2 = Apr–Jun, Q3 = Jul–Sep, Q4 = Oct–Dec.

*(ref: `Search_employee_filter.png` — confirms podium re-ranks on filter; `Categories_filter.png`, `Quarters_filter.png` — confirm available filter values)*

---

## Deployment

1. Commit all `task-1/` files to the `main` branch.
2. Enable GitHub Pages in repo Settings → Pages → Source: `main` branch, folder `/` (root).
3. Live URL: `https://dzmitrybratchuk.github.io/edu-ai-challenge-2/task-1/`

---

## report.md Content Outline

- Approach summary (screenshots → reverse-engineer UI, animal kingdom theme for data replacement)
- Tools used (vanilla HTML/CSS/JS, GitHub Pages)
- Data replacement rationale (animal species as names, themed titles/departments, activity prefixes preserved)
- Responsive strategy
