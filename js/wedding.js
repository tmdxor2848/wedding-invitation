const fadeElements = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if (entry.isIntersecting) {

      entry.target.classList.add("show");

    }

  });

}, {
  threshold: 0.2
});

fadeElements.forEach((element) => {

  observer.observe(element);

});

const weddingDate = new Date("2026-12-19T12:00:00");

const today = new Date();

const difference = weddingDate - today;

const dday = Math.ceil(
  difference / (1000 * 60 * 60 * 24)
);

const ddayText = document.querySelector("#dday");

if (dday > 0) {

  ddayText.innerText =
    "승택 ♥ 소미의 결혼식까지 " + dday + "일 남았습니다.";

} else if (dday === 0) {

  ddayText.innerText =
    "오늘, 저희 결혼합니다.";

} else {

  ddayText.innerText =
    "함께 축복해 주셔서 감사합니다.";

}


/* =========================
   Wedding Gallery
========================= */

const galleryItems =
  document.querySelectorAll(".gallery-item");

const galleryModal =
  document.querySelector("#galleryModal");

const modalImage =
  document.querySelector("#modalImage");

const modalClose =
  document.querySelector("#modalClose");

const modalPrev =
  document.querySelector("#modalPrev");

const modalNext =
  document.querySelector("#modalNext");

const modalCount =
  document.querySelector("#modalCount");


let currentImageIndex = 0;


/* 사진 주소들을 배열에 저장 */

const galleryImages = [];

galleryItems.forEach((item) => {

  galleryImages.push(
    item.dataset.image
  );

});


/* 사진 클릭 */

galleryItems.forEach((item, index) => {

  item.addEventListener("click", () => {

    currentImageIndex = index;

    showImage();

    galleryModal.classList.add("show");

    document.body.style.overflow = "hidden";

  });

});


/* 사진 표시 */

function showImage() {

  modalImage.src =
    galleryImages[currentImageIndex];

  modalCount.innerText =
    (currentImageIndex + 1)
    + " / "
    + galleryImages.length;

}


/* 다음 사진 */

modalNext.addEventListener("click", () => {

  currentImageIndex++;

  if (
    currentImageIndex >=
    galleryImages.length
  ) {

    currentImageIndex = 0;

  }

  showImage();

});


/* 이전 사진 */

modalPrev.addEventListener("click", () => {

  currentImageIndex--;

  if (currentImageIndex < 0) {

    currentImageIndex =
      galleryImages.length - 1;

  }

  showImage();

});


/* 닫기 */

modalClose.addEventListener("click", () => {

  closeGallery();

});


/* 사진 바깥 클릭 */

galleryModal.addEventListener("click", (event) => {

  if (event.target === galleryModal) {

    closeGallery();

  }

});


function closeGallery() {

  galleryModal.classList.remove("show");

  document.body.style.overflow = "";

}