// ── Pure filter/sort functions (no DOM references) ────────────────────────

/**
 * Returns "Q1"–"Q4" for a given ISO date string "YYYY-MM-DD".
 * Parses the month directly from the string to avoid timezone skew.
 */
function getQuarter(dateStr) {
  const month = parseInt(dateStr.slice(5, 7), 10); // "YYYY-MM-DD" → month 1–12
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

// ── DOM rendering (browser only) ─────────────────────────────────────────
if (typeof document !== "undefined") {

  // ── State ──────────────────────────────────────────────────────────────
  const state = { year: "all", quarter: "all", category: "all", search: "" };
  let expandedId = null;

  // ── Helpers ────────────────────────────────────────────────────────────

  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return `${String(d.getUTCDate()).padStart(2,"0")}-${MONTHS[d.getUTCMonth()]}-${d.getUTCFullYear()}`;
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
