const songs = [
  {
    title: "Wisdom in the Sun",
    artist: "Kevin MacLeod",
    src: "music/WisdomintheSun.wav",
    cover: "mp_image/ws.jpg"
  },
  {
    title: "River Meditation",
    artist: "Jason Shaw",
    src: "music/RiverMeditation.wav",
    cover: "mp_image/rm.jpg"
  },
  {
    title: "Infinite Wonder",
    artist: "Kevin MacLeod",
    src: "music/InfiniteWonder.wav",
    cover: "mp_image/iw.jpg"
  },
  {
    title: "Study and Relax",
    artist: "Kevin MacLeod",
    src: "music/StudyandRelax.wav",
    cover: "mp_image/s&r.jpg"
  },
  {
    title: "Adding the Sun",
    artist: "Kevin MacLeod",
    src: "music/AddingtheSun.wav",
    cover: "mp_image/as.jpg"
  },
  {
    title: "Going Higher",
    artist: "Bensound",
    src: "music/Going higher.wav",
    cover: "mp_image/Going Higher.jpg"
  },
  {
    title: "Hey!",
    artist: "Bensound",
    src: "music/Hey.wav",
    cover: "mp_image/Hey.jpg"
  },
  {
    title: "Creative Minds",
    artist: "Bensound",
    src: "music/Creativeminds.wav",
    cover: "mp_image/Creative Minds.jpg"
  },
  {
    title: "Dreams",
    artist: "Bensound",
    src: "music/Dreams.wav",
    cover: "mp_image/Dreams.jpg"
  },
  {
    title: "Carefree",
    artist: "Kevin MacLeod",
    src: "music/Carefree.wav",
    cover: "mp_image/Carefree.jpg"
  },
  {
    title: "Life of Riley",
    artist: "Kevin MacLeod",
    src: "music/Life of Riley.wav",
    cover: "mp_image/Life of Riley.jpg"
  },
  {
    title: "Montauk Point",
    artist: "Kevin MacLeod",
    src: "music/Montauk Point.wav",
    cover: "mp_image/Montauk Point.jpg"
  },
  {
    title: "Acoustic Breeze",
    artist: "Bensound",
    src: "music/Acousticbreeze.wav",
    cover: "mp_image/Acoustic Breeze.jpg"
  },
];

const themes = [
  "linear-gradient(to right, #bd424e, #ffaf7b)",
  "linear-gradient(to right, #4568dc, #b06ab3)",
  "linear-gradient(to right,rgb(27, 3, 87),rgb(106, 107, 179))",
  "linear-gradient(to right, #c73867, #f598b7)",
<<<<<<< HEAD
  "linear-gradient(to right,rgb(247, 130, 72),rgb(244, 165, 146))"
=======
  "linear-gradient(to right,rgb(247, 130, 72),rgb(244, 165, 146))",
  "linear-gradient(to right,rgba(59, 125, 92, 0.5),rgb(164, 248, 198))",
  "linear-gradient(to right,rgb(207, 53, 68),rgb(206, 239, 243))",
  "linear-gradient(to right,rgba(139, 69, 76, 0.79),rgb(236, 207, 189))",
  "linear-gradient(to right,rgb(49, 149, 69),rgb(243, 235, 231))",
  "linear-gradient(to right,rgb(204, 136, 81),rgb(245, 198, 167))",
  "linear-gradient(to right,rgba(135, 255, 201, 0.82),rgb(152, 222, 241))",
  "linear-gradient(to right,rgb(206, 81, 158),rgb(247, 124, 124))",
  "linear-gradient(to right,rgb(156, 73, 82),rgb(247, 167, 114))",
>>>>>>> 5aaf35e (initial commit)
];

let currentSong = 0;
let isShuffle   = false;
let isRepeat    = false;

const audio        = document.getElementById("audio");
const cover        = document.getElementById("cover");
const title        = document.getElementById("title");
const artist       = document.getElementById("artist");
const playBtn      = document.getElementById("play");
const prevBtn      = document.getElementById("prev");
const nextBtn      = document.getElementById("next");
const progress     = document.getElementById("progress");
const currentTimeEl= document.getElementById("currentTime");
const durationEl   = document.getElementById("duration");
const volume       = document.getElementById("volume");
const shuffleBtn   = document.getElementById("shuffle");
const repeatBtn    = document.getElementById("repeat");
const downloadBtn  = document.getElementById("download");
const playlist     = document.getElementById("playlist");

function animateClick(btn) {
  btn.classList.add("pressed");
  setTimeout(() => btn.classList.remove("pressed"), 150);
}

function loadSong(song) {
  title.textContent  = song.title;
  artist.textContent = song.artist;
  audio.src          = song.src;
  cover.src          = song.cover;
  updateDownloadLink(song);
  updatePlaylistUI();
  document.body.style.background = themes[currentSong % themes.length];
}

const playSong  = () => { audio.play();  playBtn.textContent = "⏸️"; };
const pauseSong = () => { audio.pause(); playBtn.textContent = "▶️";  };

function nextSong() {
  if (isShuffle) {
    let r;
    do { r = Math.floor(Math.random() * songs.length); }
    while (r === currentSong);
    currentSong = r;
  } else {
    currentSong = (currentSong + 1) % songs.length;
  }
  loadSong(songs[currentSong]);
  playSong();
}
function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(songs[currentSong]);
  playSong();
}

function updateDownloadLink(song) {
  downloadBtn.href = song.src;
  downloadBtn.setAttribute("download", `${song.title}.${song.src.split('.').pop()}`);
}
function updatePlaylistUI() {
  [...playlist.children].forEach((li,i)=>li.classList.toggle("active", i===currentSong));
}
function formatTime(sec){
  const m = Math.floor(sec/60);
  const s = Math.floor(sec%60).toString().padStart(2,"0");
  return `${m}:${s}`;
}

audio.addEventListener("loadedmetadata", () => {
  progress.max            = audio.duration;
  durationEl.textContent  = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  progress.value          = audio.currentTime;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("ended", () => {
  if (isRepeat) {
    audio.currentTime = 0;
    playSong();
  } else {
    nextSong();        
  }
});

progress.addEventListener("input", () => { audio.currentTime = progress.value; });
volume  .addEventListener("input", () => { audio.volume     = volume.value;   });

playBtn  .addEventListener("click", () => { audio.paused ? playSong() : pauseSong(); animateClick(playBtn); });
prevBtn  .addEventListener("click", () => { prevSong();  animateClick(prevBtn);  });
nextBtn  .addEventListener("click", () => { nextSong();  animateClick(nextBtn);  });

shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle("active", isShuffle);
  animateClick(shuffleBtn);
});
repeatBtn .addEventListener("click", () => {
  isRepeat  = !isRepeat;
  repeatBtn.classList.toggle("active", isRepeat);
  animateClick(repeatBtn);
});

songs.forEach((song,i)=>{
  const li = document.createElement("li");
  li.textContent = `${song.title} - ${song.artist}`;
  li.addEventListener("click", () => { currentSong=i; loadSong(song); playSong(); });
  playlist.appendChild(li);
});
loadSong(songs[currentSong]);

const openBtn = document.getElementById("openPlaylistBtn");
const modal = document.getElementById("playlistModal");
const closeBtn = document.querySelector(".close-btn");

openBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});
<<<<<<< HEAD
=======
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const items = playlist.getElementsByTagName("li");
  
  for (let item of items) {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(query) ? "" : "none";
  }
});
>>>>>>> 5aaf35e (initial commit)
