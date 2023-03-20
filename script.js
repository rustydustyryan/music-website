var songs = [
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
var app = document.getElementById("app");
for (var i = 0; i < songs.length; i++) {
    addSong(i);
}
document.addEventListener("keydown", function (event) {
    if (event.key === " ") {
        var didPauseSong = false;
        for (var i = 0; i < songs.length; i++) {
            var audio = getAudioIcon(i)[0];
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
    var song = songs[index];
    var songContainer = addElement(app, "div", "artist-".concat(index + 1));
    var h1 = addElement(songContainer, "h1");
    var artist = addElement(h1, "span", "artist-color");
    artist.textContent = song.artist;
    var space = addElement(h1, "span");
    space.textContent = " - ";
    var songname = addElement(h1, "small");
    songname.textContent = song.songname;
    var progressContainer = addElement(songContainer, "div", "progress-container");
    var progressInner = addElement(progressContainer, "div", "progress");
    var audio = document.createElement("audio");
    audio.className = "audio";
    audio.src = "media/" + song.pathname;
    songContainer.appendChild(audio);
    var musicNav = addElement(songContainer, "div", "music-nav");
    var prev = addButton("prev", "backward");
    var play = addButton("play action-btn-big", "play");
    var next = addButton("next", "forward");
    /**
     * Binds to prev button. Plays the previous song in the list.
     */
    prev.addEventListener("click", function () {
        for (var si = 0; si < songs.length; si++) {
            pauseSong(si);
        }
        var prevIndex = index - 1;
        if (prevIndex === -1) {
            prevIndex = 0;
        }
        playSong(prevIndex);
    });
    /**
     * Binds to next button. Plays the next song in the list.
     */
    next.addEventListener("click", function () {
        for (var si = 0; si < songs.length; si++) {
            pauseSong(si);
        }
        var nextIndex = index + 1;
        if (nextIndex === songs.length) {
            nextIndex = 0;
        }
        playSong(nextIndex);
    });
    /**
     * Binds to play button. Plays or pauses the current song.
     */
    play.addEventListener("click", function () {
        if (audio.paused) {
            playSong(index);
        }
        else {
            pauseSong(index);
        }
        for (var i = 0; i < songs.length; i++) {
            if (i !== index) {
                var otherAudio = document.getElementsByClassName("audio")[i];
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
        var button = addElement(musicNav, "button", "action-btn " + className);
        addElement(button, "i", "fas fa-" + icon);
        return button;
    }
    /**
     * Inserts a new element into the DOM
     */
    function addElement(parent, tag, className) {
        var child = document.createElement(tag);
        if (className) {
            child.className = className;
        }
        parent.appendChild(child);
        return child;
    }
}
function playSong(index) {
    var _a = getAudioIcon(index), audio = _a[0], icon = _a[1];
    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");
    audio.play();
}
function pauseSong(index) {
    var _a = getAudioIcon(index), audio = _a[0], icon = _a[1];
    icon.classList.remove("fa-pause");
    icon.classList.add("fa-play");
    audio.pause();
}
function getAudioIcon(index) {
    var audio = document.getElementsByClassName("audio")[index];
    var icon = document.getElementsByClassName("play")[index].children[0];
    return [audio, icon];
}
