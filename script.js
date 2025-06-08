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
  }
];

const themes = [
  "linear-gradient(to right, #bd424e, #ffaf7b)",
  "linear-gradient(to right, #082db3, #ed7ff5)",
  "linear-gradient(to right, #4568dc, #b06ab3)",
  "linear-gradient(to right, #c73867, #f598b7)",
  "linear-gradient(to right, #d12760, #ff7c5e)"
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
