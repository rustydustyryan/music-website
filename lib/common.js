createPlayer('JMSN', "'Bout It");
createPlayer('Daniel Feels', "Behave");
createPlayer('Elhae', "Halfway Love (Prod. by Rascal)");
createPlayer('Max Pope', "Just Friends");
function createPlayer(artist, title) {
    const containerEl = document.querySelector('main');
    containerEl.innerHTML += `
  <div class="player">
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
  </div>
  `;
    const audioEl = Array.from(document.querySelectorAll('audio')).pop();
    const playerEl = Array.from(document.querySelectorAll('.player')).pop();
    const playBtn = Array.from(document.querySelectorAll('.play-btn')).pop();
    playerEl.addEventListener('mouseover', () => {
        console.log('clicked');
    });
    console.log(playBtn);
    function playAudio() {
        console.log('playing');
        audioEl.play();
    }
}
