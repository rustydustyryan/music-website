const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('.play')
const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')
const audio = document.querySelector('.audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('.title')

const songs = ['.artist-1', '.artist-2', '.artist-3']

// const songs = '.artist'
// console.log(songs.length)

// Keep track of songs
let songIndex = 0

// Initially load song into DOM
// loadSongs(songs[songIndex]) {
//   title.innerText = song
//   audio.src = `media/${song}.mp3`
// }

// Update song details
// function loadSong(song) {
//   audio = song
//   audio.src `music/${song}.mp3`
// }

function playSong() {
musicContainer.classList.add('play')
playBtn.querySelector('i.fas').classList.remove('fa-play')
playBtn.querySelector('i.fas').classList.add('fa-pause')

  
  audio.play()
}

function pauseSong() {
  musicContainer.classList.remove('play')
  playBtn.querySelector('i.fas').classList.add('fa-play')
  playBtn.querySelector('i.fas').classList.remove('fa-pause')

  audio.pause()
}

function prevSong() {
  songIndex--
  
  if(songIndex < 0) {
    songIndex = songs.length - 1
  }

  // loadSongs(songs[songIndex])

  playSong()
}

console.log(typeof songs)

// function prevSong() {
//   songIndex--
  
//   if(songIndex < 0) {
//     songIndex = songs.length - 1
//   }

//   loadSongs(songs[songIndex])

//   playSong()
// }
 
// function nextSong () {
//   songs++
  
//   if (songIndex > songs.length - 1) {
//     songIndex = 0
//   }

//   loadSongs(songs[songIndex])

//   playSong()
// }

// Progress
function updateProgress(e) {
  
  const { duration, currentTime } = e.srcElement
  const progressPercent = (currentTime / duration) * 100
  progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration

  audio.currentTime = (clickX / width) * duration
}

// Event Listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play')
  
  if(isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
})

// Change song events
prevBtn.addEventListener('click', prevSong)
// nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

// audio.addEventListener('ended', nextSong)


// when playbtn is clicked, play current song and pause all others
// if pausebtn is clicked, pause current song
// if nextbtn is clicked, pause current song and play next song "songs['']+=1"
// if prevbtn is clicked, pause current song and play previous song

// when the user clicks the play button, if the song is not playing, the song should start playing. 
// At the same time, any other song that was playing should pause.