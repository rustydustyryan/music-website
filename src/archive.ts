const archiveApp = document.getElementById("app");

for (const week of WEEKS) {
  addWeek(week);
}

function addWeek(week: Week) {
  const weekEl = addElement(archiveApp, "article", "week");

  const dateOuter = addElement(weekEl, "h4");
  const dateInner = addElement(dateOuter, "span", "music-color");
  dateInner.textContent = `Week ${week.date.toLocaleDateString()}`;

  addSongs(weekEl, week.songs, false);
}
