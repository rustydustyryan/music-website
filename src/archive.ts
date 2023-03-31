const archiveApp = document.getElementById("app");

for (const week of WEEKS) {
  addWeek(week);
}

function addWeek(week: Week) {
  const dateOuter = addElement(archiveApp, "h4", "music-color");
  const dateInner = addElement(dateOuter, "span");
  dateInner.textContent = `Week ${week.date.toLocaleDateString()}`;
  
  const weekEl = addElement(archiveApp, "article", "week");

  addSongs(weekEl, week.songs, false);
}
