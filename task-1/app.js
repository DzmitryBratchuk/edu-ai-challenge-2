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
