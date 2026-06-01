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

const heroImage = document.querySelector("#heroImage");
const galleryGrid = document.querySelector("#galleryGrid");
const videoGrid = document.querySelector("#videoGrid");
const tabButtons = document.querySelectorAll(".tab-button");
const tabPanels = document.querySelectorAll(".tab-panel");
const photoDialog = document.querySelector("#photoDialog");
const dialogImage = document.querySelector("#dialogImage");
const dialogTitle = document.querySelector("#dialogTitle");
const closeDialog = document.querySelector("#closeDialog");

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

setRandomHeroImage();
renderPhotos();
renderVideos();

closeDialog.addEventListener("click", () => photoDialog.close());

photoDialog.addEventListener("click", (event) => {
  if (event.target === photoDialog) {
    photoDialog.close();
  }
});
