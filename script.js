const photos = [
  {
    title: "햇살 같은 순간",
    description: "Daniel의 환한 표정이 담긴 사진이에요.",
    src: "images/daniel-01.jpg",
    tags: ["favorite", "cute"],
  },
  {
    title: "동글동글 귀여운 날",
    description: "오래 보고 싶은 사랑스러운 장면입니다.",
    src: "images/daniel-02.jpg",
    tags: ["cute"],
  },
  {
    title: "작은 미소",
    description: "가족 앨범에 꼭 남겨두고 싶은 표정이에요.",
    src: "images/daniel-03.jpg",
    tags: ["favorite", "cute"],
  },
  {
    title: "오늘의 Daniel",
    description: "하루의 분위기가 고스란히 느껴지는 사진입니다.",
    src: "images/daniel-04.jpg",
    tags: ["favorite"],
  },
  {
    title: "소중한 한 컷",
    description: "크게 눌러서 원본 비율로 감상할 수 있어요.",
    src: "images/daniel-05.jpg",
    tags: ["cute"],
  },
  {
    title: "새로운 웃음",
    description: "이번에 새로 더한 Daniel의 사랑스러운 사진입니다.",
    src: "images/daniel-06.jpg",
    tags: ["new", "favorite"],
  },
  {
    title: "반짝이는 표정",
    description: "눈빛과 분위기가 예쁘게 담긴 순간이에요.",
    src: "images/daniel-07.jpg",
    tags: ["new", "cute"],
  },
  {
    title: "기분 좋은 하루",
    description: "가볍게 넘겨 보기 좋은 따뜻한 한 컷입니다.",
    src: "images/daniel-08.jpg",
    tags: ["new"],
  },
  {
    title: "우리의 추천 컷",
    description: "앨범에서 먼저 보여주고 싶은 사진으로 골랐어요.",
    src: "images/daniel-09.jpg",
    tags: ["new", "favorite"],
  },
];

const galleryGrid = document.querySelector("#galleryGrid");
const tabButtons = document.querySelectorAll(".tab-button");
const photoDialog = document.querySelector("#photoDialog");
const dialogImage = document.querySelector("#dialogImage");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogDescription = document.querySelector("#dialogDescription");
const closeDialog = document.querySelector("#closeDialog");

function createPhotoCard(photo) {
  const card = document.createElement("button");
  card.className = "photo-card";
  card.type = "button";
  card.setAttribute("aria-label", `${photo.title} 크게 보기`);

  card.innerHTML = `
    <div class="photo-frame">
      <img src="${photo.src}" alt="${photo.title}" loading="lazy">
    </div>
    <div class="photo-info">
      <h3>${photo.title}</h3>
      <p>${photo.description}</p>
    </div>
  `;

  card.addEventListener("click", () => openPhoto(photo));
  return card;
}

function renderPhotos(filter = "all") {
  const visiblePhotos =
    filter === "all"
      ? photos
      : photos.filter((photo) => photo.tags.includes(filter));

  galleryGrid.innerHTML = "";
  visiblePhotos.forEach((photo) => {
    galleryGrid.appendChild(createPhotoCard(photo));
  });
}

function openPhoto(photo) {
  dialogTitle.textContent = photo.title;
  dialogDescription.textContent = photo.description;
  dialogImage.src = photo.src;
  dialogImage.alt = photo.title;
  photoDialog.showModal();
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tabButtons.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-selected", "true");
    renderPhotos(button.dataset.filter);
  });
});

renderPhotos();

closeDialog.addEventListener("click", () => photoDialog.close());

photoDialog.addEventListener("click", (event) => {
  if (event.target === photoDialog) {
    photoDialog.close();
  }
});
