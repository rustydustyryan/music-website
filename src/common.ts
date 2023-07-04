createPlayer('JMSN', "'Bout It");
createPlayer('Daniel Feels', "Behave");
createPlayer('Elhae', "Halfway Love (Prod. by Rascal)");
createPlayer('Max Pope', "Just Friends");


function createPlayer(artist: string, title: string) {
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
  `

  const audioEl = Array.from(document.querySelectorAll('audio')).pop();
  const playerEl = Array.from(document.querySelectorAll('.player')).pop();
  const playBtn = Array.from(document.querySelectorAll('.play-btn')).pop();
  // const pauseBtn = Array.from(document.querySelectorAll('.pause-btn')).pop();
  // const nextBtn = document.querySelector('.next-btn').addEventListener('click', nextSong);
  // const prevBtn = document.querySelector('.prev-btn').addEventListener('click', prevSong);
  // const progressContainer = document.querySelector('.progress-container');
  // const progress = document.querySelector('.progress');

  playerEl.addEventListener('mouseover', () => {
    console.log('clicked');
  })

  console.log(playBtn);

  function playAudio() {
    console.log('playing')
    audioEl.play();
    // playBtn.classList.add('hidden');
    // pauseBtn.classList.remove('hidden');
    //   if (audioEl.paused) {
    //     audioEl.play();
    //   }
    }
  
  // function pauseAudio() {
  //   const audioEl = document.querySelector('audio');
  //   audioEl.pause();
  //   playBtn.classList.remove('hidden');
  //   pauseBtn.classList.add('hidden');
  //     if (audioEl.play) {
  //       audioEl.pause()
  //     }
  //   }
  
  // function nextSong() {
  //   const audioEl = document.querySelector('audio');
  //   audioEl.pause();
  //   audioEl.currentTime = 0;
  //   audioEl.play();
  // }
  
  // function prevSong() {
  //   const audioEl = document.querySelector('audio');
  //   audioEl.pause();
  //   audioEl.currentTime = 0;
  //   audioEl.play();
  // }
}

// let songIndex = 1;
//   const songs = ['media/Bout It.mp3', 'media/Behave.mp3', 'media/Halfway Love (Prod. by Rascal).mp3', 'media/Just Friends.mp3'];
