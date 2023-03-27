const SONGS = window.SONGS = [];
const WEEKS = window.WEEKS = [];
function addSongs(parentElement, songs, includeAudio) {
    for (let songIndex = 0; songIndex < songs.length; songIndex++) {
        const song = songs[songIndex];
        const songContainer = addElement(parentElement, "div", `artist-${songIndex + 1}`);
        addSong(song, songIndex, songContainer, includeAudio);
    }
}
function addSong(song, songIndex, songContainer, includeAudio) {
    const h1 = addElement(songContainer, "h1");
    const artist = addElement(h1, "span", "artist-color");
    artist.textContent = song.artist;
    const space = addElement(h1, "span");
    space.textContent = " - ";
    const songname = addElement(h1, "small");
    songname.textContent = song.songname;
    if (!includeAudio)
        return;
    const progressContainer = addElement(songContainer, "div", "progress-container");
    const progressInner = addElement(progressContainer, "div", "progress");
    const audio = document.createElement("audio");
    audio.className = "audio";
    audio.src = "media/" + song.pathname;
    songContainer.appendChild(audio);
    const musicNav = addElement(songContainer, "div", "music-nav");
    const prev = addButton("prev", "backward");
    const play = addButton("play action-btn-big", "play");
    const next = addButton("next", "forward");
    /**
     * Binds to prev button. Plays the previous song in the list.
     */
    prev.addEventListener("click", () => {
        for (let si = 0; si < SONGS.length; si++) {
            pauseSong(si);
        }
        let prevIndex = songIndex - 1;
        if (prevIndex === -1) {
            prevIndex = 0;
        }
        playSong(prevIndex);
    });
    /**
     * Binds to next button. Plays the next song in the list.
     */
    next.addEventListener("click", () => {
        for (let si = 0; si < SONGS.length; si++) {
            pauseSong(si);
        }
        let nextIndex = songIndex + 1;
        if (nextIndex === SONGS.length) {
            nextIndex = 0;
        }
        playSong(nextIndex);
    });
    /**
     * Updates the progress bar to show the current progress of the song.
     */
    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progressInner.style.width = `${progressPercent}%`;
    }
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }
    /**
     * Binds to play button. Plays or pauses the current song.
     */
    play.addEventListener("click", () => {
        if (audio.paused) {
            playSong(songIndex);
        }
        else {
            pauseSong(songIndex);
        }
        for (let i = 0; i < SONGS.length; i++) {
            if (i !== songIndex) {
                const otherAudio = document.getElementsByClassName("audio")[i];
                if (!otherAudio.paused) {
                    pauseSong(i);
                }
            }
        }
    });
    /**
     * Progress listener. Updates the progress bar.
     */
    audio.addEventListener("timeupdate", updateProgress);
    progressContainer.addEventListener("click", setProgress);
    /**
     * Song ended listener. Plays the next song in the list.
     */
    audio.addEventListener("ended", () => {
        stopSong(songIndex);
        if (songIndex === 9) {
            playSong(0);
        }
        else {
            playSong(songIndex + 1);
        }
    });
    /**
     * Inserts a button with an icon
     */
    function addButton(className, icon) {
        const button = addElement(musicNav, "button", "action-btn " + className);
        addElement(button, "i", "fas fa-" + icon);
        return button;
    }
}
function addWeekSongs(week, date, songs) {
    WEEKS.push({
        order: week,
        date: new Date(date),
        songs: songs
    });
    for (const song of songs) {
        SONGS.push(song);
    }
}
/**
 * Inserts a new element into the DOM
 */
function addElement(parent, tag, className) {
    const child = document.createElement(tag);
    if (className) {
        child.className = className;
    }
    parent.appendChild(child);
    return child;
}
