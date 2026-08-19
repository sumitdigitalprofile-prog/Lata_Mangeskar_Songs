const playlist = [
  {
    title: "Lag Ja Gale Se Phir",
    artist: "Lata Mangeshkar • Woh Kaun Thi?",
    src: "song/Lag Ja Gale Se Phir - Lata Mangeshkar.mp3",
    cover: "https://tse4.mm.bing.net/th/id/OIP.xHB3ol2grkUmXpZcV63KawHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    title: "Aap Ki Nazron Ne Samjha",
    artist: "Lata Mangeshkar • Anpadh",
    src: "song/Aapki Najron Ne Samja.mp3",
    cover: "https://tse4.mm.bing.net/th/id/OIP.j-E_spnAjTlJnX_ggKgK3wHaIz?w=139&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
  },
  {
    title: "Zinda Rehti Hain Unki Mohabbatein",
    artist: "Lata Mangeshkar • Mohabbatein",
    src: "song/Zinda Rehti Hain Mohabbatein Lata Mangeshkar 320 Kbps.mp3",
    cover: "https://tse2.mm.bing.net/th/id/OIP.wuhWq-imjhyUWtPowa37RAHaEK?w=314&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
  },
  {
    title: "Ho Gaya Hai Tujhko To Pyar Sajna",
    artist: "Lata Mangeshkar • Dilwale Dulhania Le Jayenge",
    src: "song/Ho Gaya Hai Tujhko To Pyar Sajna Dilwale Dulhania Le Jayenge 320 Kbps.mp3",
    cover: "https://tse4.mm.bing.net/th/id/OIP.Vgyd17Evd-gYhIA1UWlqiQHaIk?w=136&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
  },

  {
    title: "Yeh Kahaan Aa Gaye Hum",
    artist: "Lata Mangeshkar • Silsila",
    src: "song/Yeh Kahaan Aa Gaye Hum.mp3",
    cover: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p177893_p_v8_aa.jpg"
  },

  {
    title: "Aaja Piya Tohe Pyar Doon",
    artist: "Lata Mangeshkar • Baharon Ke Sapne",
    src: "song/Aaja Piya Tohe Pyar Doon.mp3",
    cover: "https://t3.gstatic.com/images?q=tbn:ANd9GcSxVV-xlQxtAAj6EnBZuExhxjEDG9d8O53PvshjO92cZBXtpvRQtj9YyNH857RyMjNdCjH-Og094_pocLgPBMSwdq6iDb-lag"
  },

  {
    title: "Bahon Mein Chale Aao",
    artist: "Lata Mangeshkar • Anamika",
    src: "song/Bahon Mein Chale Aao.mp3",
    cover: "https://upload.wikimedia.org/wikipedia/en/f/ff/Anamika_%281973%29.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original"
  },

  {
    title: "Aaja Sanam Madhur Chandni Mein",
    artist: "Lata Mangeshkar • Chori Chori",
    src: "song/Aaja Sanam Madhur Chandni Mein Hum.mp3",
    cover: "https://i.scdn.co/image/ab67616d0000b2731b0d2500a6eb6beddc94c59e"
  },

  {
    title: "Ajib Dastan Hain Yeh",
    artist: "Lata Mangeshkar • Dil Apna Aur Preet Parai",
    src: "song/Ajib Dastan Hain Yeh.mp3",
    cover: "https://m.media-amazon.com/images/M/MV5BNWU2Yjg4ZWUtZTQ4MS00MzM2LTk5MzctNjhiM2E5ZGJhOTk5XkEyXkFqcGc@._V1_.jpg"
  }

];

let currentIndex = Math.floor(Math.random() * playlist.length);

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

loadTrack(currentIndex);

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function loadTrack(index) {
  const track = playlist[index];
  trackNameEl.textContent = track.title;
  trackArtistEl.textContent = track.artist;
  coverImg.src = track.cover;
  audio.src = track.src;
}

function playRandomTrack() {

  let randomIndex;

  do {
    randomIndex = Math.floor(Math.random() * playlist.length);
  } while (randomIndex === currentIndex && playlist.length > 1);

  currentIndex = randomIndex;

  loadTrack(currentIndex);

  audio.play();
    setPauseIcon();
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    setPauseIcon();
  } else {
    audio.pause();
    setPlayIcon();
  }
}

// Using SVG icons as Play Pause Icons

function setPlayIcon() {
  playBtn.innerHTML = `
    <svg class="play-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5v14l11-7z"></path>
    </svg>
  `;
  playBtn.setAttribute("aria-label", "Play");
}
function setPauseIcon() {
  playBtn.innerHTML = `
    <svg class="pause-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 5h4v14H6zM14 5h4v14h-4z"></path>
    </svg>
  `;
  playBtn.setAttribute("aria-label", "Pause");
}

// Play / Pause Click
playBtn.addEventListener("click", togglePlay);

// Previous / Next Buttons
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentIndex);
  audio.play();
    setPauseIcon();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadTrack(currentIndex);
  audio.play();
    setPauseIcon();
});

// Update Timeline & Current Time
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  progress.value = (audio.currentTime / audio.duration) * 100;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

// Display Track Duration
audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

// Seek on slider input
progress.addEventListener("input", () => {
  if (!audio.duration) return;
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Autoplay next track on finish
audio.addEventListener("ended", () => {
  playRandomTrack();
});

// Fullscreen Toggle
expandBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
