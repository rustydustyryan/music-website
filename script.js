const songs = [
    {
        artist: "Mr. Brown",
        songname: "An Extra Day",
        pathname: "An Extra Day.mp3",
    },
    {
        artist: "Jakob Ogawa",
        songname: "You And I",
        pathname: "You And I.mp3"
    },
    {
        artist: "Desmond Cheese",
        songname: "Memories of a Dream",
        pathname: "Memories of a Dream.mp3"
    }
];
const app = document.getElementById("app");
for (let i = 0; i < songs.length; i++) {
    addSong(i);
}
document.addEventListener("keydown", (event) => {
    if (event.key === " ") {
        let didPauseSong = false;
        for (let i = 0; i < songs.length; i++) {
            const [audio] = getAudioIcon(i);
            if (!audio.paused) {
                // TODO this isn't working right...
                pauseSong(i);
                event.preventDefault();
                didPauseSong = true;
            }
        }
        if (!didPauseSong) {
            playSong(0);
        }
    }
});
// Public
function addSong(index) {
    const song = songs[index];
    const songContainer = addElement(app, "div", `artist-${index + 1}`);
    const h1 = addElement(songContainer, "h1");
    const artist = addElement(h1, "span", "artist-color");
    artist.textContent = song.artist;
    const space = addElement(h1, "span");
    space.textContent = " - ";
    const songname = addElement(h1, "small");
    songname.textContent = song.songname;
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
        for (let si = 0; si < songs.length; si++) {
            pauseSong(si);
        }
        let prevIndex = index - 1;
        if (prevIndex === -1) {
            prevIndex = 0;
        }
        playSong(prevIndex);
    });
    /**
     * Binds to next button. Plays the next song in the list.
     */
    next.addEventListener("click", () => {
        for (let si = 0; si < songs.length; si++) {
            pauseSong(si);
        }
        let nextIndex = index + 1;
        if (nextIndex === songs.length) {
            nextIndex = 0;
        }
        playSong(nextIndex);
    });
    /**
     * Binds to play button. Plays or pauses the current song.
     */
    play.addEventListener("click", () => {
        if (audio.paused) {
            playSong(index);
        }
        else {
            pauseSong(index);
        }
        for (let i = 0; i < songs.length; i++) {
            if (i !== index) {
                const otherAudio = document.getElementsByClassName("audio")[i];
                if (!otherAudio.paused) {
                    pauseSong(i);
                }
            }
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
}
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
function getAudioIcon(index) {
    const audio = document.getElementsByClassName("audio")[index];
    const icon = document.getElementsByClassName("play")[index].children[0];
    return [audio, icon];
}
