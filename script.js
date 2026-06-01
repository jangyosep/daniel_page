const photos = [
  { title: "Daniel 01", src: "images/daniel-01.jpg" },
  { title: "Daniel 02", src: "images/daniel-02.jpg" },
  { title: "Daniel 03", src: "images/daniel-03.jpg" },
  { title: "Daniel 04", src: "images/daniel-04.jpg" },
  { title: "Daniel 05", src: "images/daniel-05.jpg" },
  { title: "Daniel 06", src: "images/daniel-06.jpg" },
  { title: "Daniel 07", src: "images/daniel-07.jpg" },
  { title: "Daniel 08", src: "images/daniel-08.jpg" },
  { title: "Daniel 09", src: "images/daniel-09.jpg" },
  { title: "Daniel 10", src: "images/daniel-10.jpg" },
  { title: "Daniel 11", src: "images/daniel-11.jpg" },
  { title: "Daniel 12", src: "images/daniel-12.jpg" },
  { title: "Daniel 13", src: "images/daniel-13.jpg" },
  { title: "Daniel 14", src: "images/daniel-14.jpg" },
  { title: "Daniel 15", src: "images/daniel-15.jpg" },
  { title: "Daniel 16", src: "images/daniel-16.jpg" },
  { title: "Daniel 17", src: "images/daniel-17.jpg" },
  { title: "Daniel 18", src: "images/daniel-18.jpg" },
  { title: "Daniel 19", src: "images/daniel-19.jpg" },
  { title: "Daniel 20", src: "images/daniel-20.jpg" },
  { title: "Daniel 21", src: "images/daniel-21.jpg" },
  { title: "Daniel 22", src: "images/daniel-22.jpg" },
  { title: "Daniel 23", src: "images/daniel-23.jpg" },
  { title: "Daniel 24", src: "images/daniel-24.jpg" },
  { title: "Daniel 25", src: "images/daniel-25.jpg" },
  { title: "Daniel 26", src: "images/daniel-26.jpg" },
  { title: "Daniel 27", src: "images/daniel-27.jpg" },
  { title: "Daniel 28", src: "images/daniel-28.jpg" },
];

const videos = [
  { title: "Daniel Video 01", src: "videos/daniel-video-01.mp4" },
];

const birthDate = new Date(2023, 9, 17);
const dayCounter = document.querySelector("#dayCounter");
const heroImage = document.querySelector("#heroImage");
const galleryGrid = document.querySelector("#galleryGrid");
const videoGrid = document.querySelector("#videoGrid");
const tabButtons = document.querySelectorAll(".tab-button");
const tabPanels = document.querySelectorAll(".tab-panel");
const musicButtons = document.querySelectorAll(".music-button[data-track]");
const stopMusic = document.querySelector("#stopMusic");
const photoDialog = document.querySelector("#photoDialog");
const dialogImage = document.querySelector("#dialogImage");
const dialogTitle = document.querySelector("#dialogTitle");
const closeDialog = document.querySelector("#closeDialog");

const bgmTracks = [
  {
    name: "꿈꾸는 별",
    tempo: 132,
    wave: "sine",
    notes: ["C5", "E5", "G5", "E5", "A5", "G5", "E5", "D5"],
  },
  {
    name: "폭신한 구름",
    tempo: 104,
    wave: "triangle",
    notes: ["G4", "B4", "D5", "G5", "E5", "D5", "B4", "G4"],
  },
  {
    name: "작은 행진",
    tempo: 148,
    wave: "square",
    notes: ["C5", "C5", "G4", "G4", "A4", "A4", "G4", "E5"],
  },
];

let audioContext;
let bgmTimer;
let activeOscillators = [];
let activeTrackIndex = null;

function updateDayCounter() {
  const today = new Date();
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const elapsedDays = Math.floor((todayMidnight - birthDate) / 86400000);
  dayCounter.textContent = `D+${elapsedDays}`;
}

function setRandomHeroImage() {
  const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
  heroImage.src = randomPhoto.src;
  heroImage.alt = randomPhoto.title;
}

function createPhotoCard(photo) {
  const card = document.createElement("button");
  card.className = "photo-card";
  card.type = "button";
  card.setAttribute("aria-label", `${photo.title} 크게 보기`);

  card.innerHTML = `
    <div class="photo-frame">
      <img src="${photo.src}" alt="${photo.title}" loading="lazy">
    </div>
  `;

  card.addEventListener("click", () => openPhoto(photo));
  return card;
}

function createVideoCard(video) {
  const item = document.createElement("article");
  item.className = "video-card";
  item.innerHTML = `
    <video controls playsinline preload="metadata">
      <source src="${video.src}" type="video/mp4">
    </video>
  `;
  return item;
}

function renderPhotos() {
  galleryGrid.innerHTML = "";
  photos.forEach((photo) => {
    galleryGrid.appendChild(createPhotoCard(photo));
  });
}

function renderVideos() {
  videoGrid.innerHTML = "";
  videos.forEach((video) => {
    videoGrid.appendChild(createVideoCard(video));
  });
}

function openPhoto(photo) {
  dialogTitle.textContent = photo.title;
  dialogImage.src = photo.src;
  dialogImage.alt = photo.title;
  photoDialog.showModal();
}

function noteToFrequency(note) {
  const pitchClass = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  const [, pitch, accidental = "", octaveText] = note.match(/^([A-G])([#b]?)(\d)$/);
  const octave = Number(octaveText);
  const semitone = pitchClass[pitch] + (accidental === "#" ? 1 : accidental === "b" ? -1 : 0);
  const midi = (octave + 1) * 12 + semitone;
  return 440 * 2 ** ((midi - 69) / 12);
}

function stopBgm() {
  window.clearTimeout(bgmTimer);
  activeOscillators.forEach((oscillator) => {
    try {
      oscillator.stop();
    } catch {
      // Already stopped oscillators can be ignored.
    }
  });
  activeOscillators = [];
  activeTrackIndex = null;
  musicButtons.forEach((button) => button.classList.remove("active"));
}

function playTone(frequency, startTime, duration, track) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = track.wave;
  oscillator.frequency.setValueAtTime(frequency, startTime);
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(0.045, startTime + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.02);
  oscillator.addEventListener("ended", () => {
    activeOscillators = activeOscillators.filter((item) => item !== oscillator);
  });
  activeOscillators.push(oscillator);
}

function scheduleBgm(trackIndex) {
  const track = bgmTracks[trackIndex];
  const beat = 60 / track.tempo;
  const startTime = audioContext.currentTime + 0.05;

  activeOscillators = [];
  track.notes.forEach((note, index) => {
    const time = startTime + index * beat;
    const frequency = noteToFrequency(note);
    playTone(frequency, time, beat * 0.86, track);
    playTone(frequency / 2, time, beat * 0.86, { ...track, wave: "sine" });
  });

  bgmTimer = window.setTimeout(() => scheduleBgm(trackIndex), track.notes.length * beat * 1000);
}

async function playBgm(trackIndex) {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContextClass();
  }

  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }

  stopBgm();
  activeTrackIndex = trackIndex;
  musicButtons[trackIndex].classList.add("active");
  scheduleBgm(trackIndex);
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetPanel = button.dataset.panel;

    tabButtons.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });

    tabPanels.forEach((panel) => {
      const isActive = panel.id === targetPanel;
      panel.classList.toggle("active", isActive);
      panel.hidden = !isActive;
    });

    button.classList.add("active");
    button.setAttribute("aria-selected", "true");
  });
});

musicButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const trackIndex = Number(button.dataset.track);

    if (activeTrackIndex === trackIndex) {
      stopBgm();
      return;
    }

    playBgm(trackIndex);
  });
});

stopMusic.addEventListener("click", stopBgm);

updateDayCounter();
setRandomHeroImage();
renderPhotos();
renderVideos();

closeDialog.addEventListener("click", () => photoDialog.close());

photoDialog.addEventListener("click", (event) => {
  if (event.target === photoDialog) {
    photoDialog.close();
  }
});
