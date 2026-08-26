let playlist = [];
let currentIndex = 0;
let isChangingTrack = false;


// =========================
// DOM ELEMENTS
// =========================

const audio = document.getElementById("audio-player");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("previous-btn");
const nextBtn = document.getElementById("next-btn");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const trackNameEl = document.getElementById("track-name");
const trackArtistEl = document.querySelector(".track-artist");
const coverImg = document.querySelector(".album-cover img");
const expandBtn = document.querySelector(".expand-btn");


// =========================
// LOAD PLAYLIST
// =========================

async function loadPlaylist() {
  try {
    const response = await fetch("data/playlist.json");

    if (!response.ok) {
      throw new Error("Failed to load playlist");
    }

    playlist = await response.json();

    if (!Array.isArray(playlist) || playlist.length === 0) {
      throw new Error("Playlist is empty or invalid");
    }

    // Start with a random song
    currentIndex = Math.floor(Math.random() * playlist.length);

    loadTrack(currentIndex);

    // Preload nearby tracks
    preloadNearbyTracks();

  } catch (error) {
    console.error("Playlist error:", error);
  }
}


// =========================
// FORMAT TIME
// =========================

function formatTime(seconds) {
  if (isNaN(seconds)) {
    return "0:00";
  }

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}


// =========================
// LOAD TRACK
// =========================

function loadTrack(index) {

  const track = playlist[index];

  if (!track) {
    console.error("Track not found:", index);
    return;
  }

  trackNameEl.textContent = track.title;
  trackArtistEl.textContent = track.artist;
  coverImg.src = track.cover;

  audio.src = track.src;

  // Reset progress
  progress.value = 0;
  currentTimeEl.textContent = "0:00";
  durationEl.textContent = "0:00";

  // Preload nearby songs
  preloadNearbyTracks();
}


// =========================
// CHANGE TRACK
// =========================

async function changeTrack(index, autoPlay = true) {

  if (isChangingTrack || playlist.length === 0) {
    return;
  }

  isChangingTrack = true;

  currentIndex = index;

  loadTrack(currentIndex);

  if (autoPlay) {

    try {

      await audio.play();

      setPauseIcon();

    } catch (error) {

      console.error("Playback error:", error);

      setPlayIcon();
    }

  }

  isChangingTrack = false;
}


// =========================
// RANDOM TRACK
// =========================

function playRandomTrack() {

  if (playlist.length === 0) {
    return;
  }

  let randomIndex;

  do {

    randomIndex =
      Math.floor(Math.random() * playlist.length);

  } while (
    randomIndex === currentIndex &&
    playlist.length > 1
  );

  changeTrack(randomIndex);
}


// =========================
// PLAY / PAUSE
// =========================

async function togglePlay() {

  if (audio.paused) {

    try {

      await audio.play();

      setPauseIcon();

    } catch (error) {

      console.error("Playback error:", error);

    }

  } else {

    audio.pause();

    setPlayIcon();
  }
}


// =========================
// PLAY ICON
// =========================

function setPlayIcon() {

  playBtn.innerHTML = `
    <svg
      class="play-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M8 5v14l11-7z"></path>
    </svg>
  `;

  playBtn.setAttribute("aria-label", "Play");
}


// =========================
// PAUSE ICON
// =========================

function setPauseIcon() {

  playBtn.innerHTML = `
    <svg
      class="pause-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M6 5h4v14H6zM14 5h4v14h-4z"></path>
    </svg>
  `;

  playBtn.setAttribute("aria-label", "Pause");
}


// =========================
// PREVIOUS BUTTON
// =========================

prevBtn.addEventListener("click", () => {

  if (playlist.length === 0) {
    return;
  }

  const previousIndex =
    (currentIndex - 1 + playlist.length) %
    playlist.length;

  changeTrack(previousIndex);
});


// =========================
// NEXT BUTTON
// =========================

nextBtn.addEventListener("click", () => {

  if (playlist.length === 0) {
    return;
  }

  const nextIndex =
    (currentIndex + 1) %
    playlist.length;

  changeTrack(nextIndex);
});


// =========================
// PLAY / PAUSE BUTTON
// =========================

playBtn.addEventListener("click", togglePlay);


// =========================
// UPDATE PROGRESS
// =========================

audio.addEventListener("timeupdate", () => {

  if (!audio.duration) {
    return;
  }

  progress.value =
    (audio.currentTime / audio.duration) * 100;

  currentTimeEl.textContent =
    formatTime(audio.currentTime);
});


// =========================
// LOAD DURATION
// =========================

audio.addEventListener("loadedmetadata", () => {

  durationEl.textContent =
    formatTime(audio.duration);
});


// =========================
// SEEK
// =========================

progress.addEventListener("input", () => {

  if (!audio.duration) {
    return;
  }

  audio.currentTime =
    (progress.value / 100) *
    audio.duration;
});


// =========================
// SONG ENDED
// =========================

audio.addEventListener("ended", () => {

  playRandomTrack();
});


// =========================
// AUDIO STATE
// =========================

audio.addEventListener("play", () => {
  setPauseIcon();
});

audio.addEventListener("pause", () => {
  setPlayIcon();
});


// =========================
// PRELOAD NEARBY TRACKS
// =========================

function preloadNearbyTracks() {

  if (playlist.length <= 1) {
    return;
  }

  const nextIndex =
    (currentIndex + 1) %
    playlist.length;

  const previousIndex =
    (currentIndex - 1 + playlist.length) %
    playlist.length;

  preloadAudio(playlist[nextIndex].src);
  preloadAudio(playlist[previousIndex].src);
}


// =========================
// PRELOAD AUDIO
// =========================

function preloadAudio(src) {

  const preloadAudio = new Audio();

  preloadAudio.preload = "auto";
  preloadAudio.src = src;
}


// =========================
// FULLSCREEN
// =========================

expandBtn.addEventListener("click", () => {

  if (!document.fullscreenElement) {

    document.documentElement.requestFullscreen();

  } else {

    document.exitFullscreen();
  }
});


// =========================
// START PLAYER
// =========================

loadPlaylist();