const photos = [
  {
    title: "햇살 같은 순간",
    description: "Daniel의 환한 표정이 담긴 사진이에요.",
    src: "images/daniel-01.jpg",
  },
  {
    title: "동글동글 귀여운 날",
    description: "오래 보고 싶은 사랑스러운 장면입니다.",
    src: "images/daniel-02.jpg",
  },
  {
    title: "작은 미소",
    description: "가족 앨범에 꼭 남겨두고 싶은 표정이에요.",
    src: "images/daniel-03.jpg",
  },
  {
    title: "오늘의 Daniel",
    description: "하루의 분위기가 고스란히 느껴지는 사진입니다.",
    src: "images/daniel-04.jpg",
  },
  {
    title: "소중한 한 컷",
    description: "크게 눌러서 원본 비율로 감상할 수 있어요.",
    src: "images/daniel-05.jpg",
  },
];

const galleryGrid = document.querySelector("#galleryGrid");
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

function openPhoto(photo) {
  dialogTitle.textContent = photo.title;
  dialogDescription.textContent = photo.description;
  dialogImage.src = photo.src;
  dialogImage.alt = photo.title;
  photoDialog.showModal();
}

photos.forEach((photo) => {
  galleryGrid.appendChild(createPhotoCard(photo));
});

closeDialog.addEventListener("click", () => photoDialog.close());

photoDialog.addEventListener("click", (event) => {
  if (event.target === photoDialog) {
    photoDialog.close();
  }
});
