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
  },
  {
    artist: "Leon Bridges",
    songname: "Bad Bad News",
    pathname: "Bad Bad News.mp3"
  },
  {
    artist: "Franc Moody",
    songname: "Dopamine",
    pathname: "Dopamine.mp3"
  },
  {
    artist: "Dirtwire",
    songname: "Amphibian Circuits",
    pathname: "Amphibian Circuits.mp3"
  },
  {
    artist: "Feiertag",
    songname: "Run Away (feat. Pip Millett)",
    pathname: "Run Away (feat. Pip Millett).mp3"
  },
  {
    artist: "Son Little",
    songname: "ASAP",
    pathname: "ASAP.mp3"
  },
  {
    artist: "Oddisee",
    songname: "Born Before Yesterday",
    pathname: "Born Before Yesterday.mp3"
  },
  {
    artist: "Crumb",
    songname: "Bones",
    pathname: "Bones.mp3"
  }
];

const app = document.getElementById("app");

for (let i = 0; i < songs.length; i++) {
  addSong(i);
}

// Spacebar to play/pause
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

function addSong(index: number) {
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
   * Updates the progress bar to show the current progress of the song.
   */
  function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressInner.style.width = `${progressPercent}%`;
  }

  function setProgress(e: MouseEvent) {
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
      playSong(index);
    } else {
      pauseSong(index);
    }

    for (let i = 0; i < songs.length; i++) {
      if (i !== index) {
        const otherAudio = document.getElementsByClassName("audio")[i] as HTMLAudioElement;
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
    stopSong(index);
    if (index === 9) {
      playSong(0);
    } else {
      playSong(index + 1);
    }
  });

  /**
   * Inserts a button with an icon
   */
  function addButton(className: string, icon: string) {
    const button = addElement(musicNav, "button", "action-btn " + className);
    addElement(button, "i", "fas fa-" + icon);
    return button;
  }

  /**
   * Inserts a new element into the DOM
   */
  function addElement(parent: HTMLElement, tag: string, className?: string) {
    const child = document.createElement(tag);
    if (className) {
      child.className = className;
    }
    parent.appendChild(child);
    return child;
  }
}

function playSong(index: number) {
  const [audio, icon] = getAudioIcon(index);
  icon.classList.remove("fa-play");
  icon.classList.add("fa-pause");
  audio.play();
}

function pauseSong(index: number) {
  const [audio, icon] = getAudioIcon(index);
  icon.classList.remove("fa-pause");
  icon.classList.add("fa-play");
  audio.pause();
}

function stopSong(index: number) {
  pauseSong(index);
  const [audio] = getAudioIcon(index);
  audio.currentTime = 0;
}

function getAudioIcon(index: number) {
  const audio = document.getElementsByClassName("audio")[index] as HTMLAudioElement;
  const icon = document.getElementsByClassName("play")[index].children[0] as Element;
  return [audio, icon] as const;
}
