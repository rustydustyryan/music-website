const indexApp = document.getElementById("app");
addSongs(indexApp, SONGS, true);
// Spacebar to play/pause
// document.addEventListener("keydown", (event) => {
//   if (event.key === " ") {
//     let didPauseSong = false;
//     for (let i = 0; i < SONGS.length; i++) {
//       const [audio] = getAudioIcon(i);
//       if (!audio.paused) {
//         // TODO this isn't working right...
//         pauseSong(i);
//         event.preventDefault();
//         didPauseSong = true;
//       }
//     }
//     if (!didPauseSong) {
//       playSong(0);
//     }
//   }
// });
// Public
function playSong(index) {
    const [audio, icon] = getAudioIcon(index);
    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");
    audio.play();
}
function pauseSong(index) {
    const [audio, icon] = getAudioIcon(index);
    icon.classList.remove("fa-pause");
    icon.classList.add("fa-play");
    audio.pause();
}
function stopSong(index) {
    pauseSong(index);
    const [audio] = getAudioIcon(index);
    audio.currentTime = 0;
}
function getAudioIcon(index) {
    const audio = document.getElementsByClassName("audio")[index];
    const icon = document.getElementsByClassName("play")[index].children[0];
    return [audio, icon];
}
