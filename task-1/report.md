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
