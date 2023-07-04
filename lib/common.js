const songs = [
    { artist: 'JMSN', title: "'Bout It" },
    { artist: 'Daniel Feels', title: "Behave" },
    { artist: 'Elhae', title: "Halfway Love (Prod. by Rascal)" },
    { artist: 'Max Pope', title: "Just Friends" }
];
const containerEl = document.querySelector('main');
for (const { artist, title } of songs) {
    const playerEl = document.createElement('div');
    playerEl.classList.add('player');
    playerEl.innerHTML = `
    <audio>
      <source src="media/${title}.mp3" type="audio/mpeg" />
    </audio>
    <h1>${artist} - <small>${title}</small></h1>
    <div class="progress-container">
      <div class="progress"></div>
    </div>
    <div class="icons">
      <div class="btn prev-btn"><i class="fa-solid fa-backward fa-2x"></i></div>
      <div class="btn play-btn"><i class="fa-solid fa-play fa-2x"></i></div>
      <div class="btn pause-btn hidden"><i class="fa-solid fa-pause fa-2x"></i></div>
      <div class="btn next-btn"><i class="fa-solid fa-forward fa-2x"></i></div>
    </div>
  `;
    containerEl.appendChild(playerEl);
    playerEl.addEventListener('mouseover', () => {
        console.log('clicked');
    });
}
