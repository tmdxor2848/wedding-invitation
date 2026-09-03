/* =========================================================
   승택 ♥ 소미 모바일 청첩장
   wedding.js
========================================================= */


/* =========================================================
   1. 청첩장 오프닝
   - 리본 풀기
   - 봉투 열기
========================================================= */

const weddingIntro =
  document.getElementById("weddingIntro");

const openInvitation =
  document.getElementById("openInvitation");

const openInvitationText =
  document.getElementById("openInvitationText");


let introOpened = false;


function startInvitation() {

  if (!weddingIntro) {
    return;
  }


  /* 두 번 클릭 방지 */

  if (introOpened) {
    return;
  }


  introOpened = true;


  /* 리본 / 봉투 애니메이션 시작 */

  weddingIntro.classList.add("opening");


  /* 1.8초 후 오프닝 화면 제거 */

  setTimeout(() => {

    weddingIntro.classList.add(
      "intro-finish"
    );


    /* 스크롤 다시 허용 */

    document.body.style.overflow = "";

    document.documentElement.style.overflow = "";

  }, 1800);

}


/* 오프닝 화면이 있을 때만 스크롤 막기 */

if (weddingIntro) {

  document.body.style.overflow = "hidden";

}


/* 가운데 봉인 클릭 */

if (openInvitation) {

  openInvitation.addEventListener(
    "click",
    startInvitation
  );

}


/* 청첩장 열기 글자 클릭 */

if (openInvitationText) {

  openInvitationText.addEventListener(
    "click",
    startInvitation
  );

}



/* =========================================================
   2. 스크롤 FADE 애니메이션
========================================================= */

const fadeElements =
  document.querySelectorAll(".fade-up");


if (
  fadeElements.length > 0 &&
  "IntersectionObserver" in window
) {

  const observer =
    new IntersectionObserver(

      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "show"
            );

          }

        });

      },

      {
        threshold: 0.2
      }

    );


  fadeElements.forEach((element) => {

    observer.observe(element);

  });

}


/* IntersectionObserver 미지원 브라우저 */

else {

  fadeElements.forEach((element) => {

    element.classList.add("show");

  });

}



/* =========================================================
   3. D-DAY
========================================================= */

const weddingDate =
  new Date("2026-12-19T12:00:00");


const today =
  new Date();


const difference =
  weddingDate - today;


const dday =
  Math.ceil(

    difference /
    (1000 * 60 * 60 * 24)

  );


const ddayText =
  document.querySelector("#dday");


/* #dday 요소가 있을 때만 실행 */

if (ddayText) {

  if (dday > 0) {

    ddayText.innerText =
      "승택 ♥ 소미의 결혼식까지 "
      + dday
      + "일 남았습니다.";

  }

  else if (dday === 0) {

    ddayText.innerText =
      "오늘, 저희 결혼합니다.";

  }

  else {

    ddayText.innerText =
      "함께 축복해 주셔서 감사합니다.";

  }

}



/* =========================================================
   4. WEDDING GALLERY
========================================================= */

const galleryItems =
  document.querySelectorAll(
    ".gallery-item"
  );


const galleryModal =
  document.querySelector(
    "#galleryModal"
  );


const modalImage =
  document.querySelector(
    "#modalImage"
  );


const modalClose =
  document.querySelector(
    "#modalClose"
  );


const modalPrev =
  document.querySelector(
    "#modalPrev"
  );


const modalNext =
  document.querySelector(
    "#modalNext"
  );


const modalCount =
  document.querySelector(
    "#modalCount"
  );


let currentImageIndex = 0;


/* 사진 주소 배열 */

const galleryImages = [];


galleryItems.forEach((item) => {

  if (item.dataset.image) {

    galleryImages.push(
      item.dataset.image
    );

  }

});


/* -----------------------------------------
   현재 사진 표시
----------------------------------------- */

function showImage() {

  if (
    !modalImage ||
    galleryImages.length === 0
  ) {

    return;

  }


  modalImage.src =
    galleryImages[currentImageIndex];


  if (modalCount) {

    modalCount.innerText =

      (currentImageIndex + 1)

      + " / "

      + galleryImages.length;

  }

}


/* -----------------------------------------
   사진 클릭
----------------------------------------- */

galleryItems.forEach(
  (item, index) => {

    item.addEventListener(
      "click",
      () => {

        if (!galleryModal) {
          return;
        }


        currentImageIndex =
          index;


        showImage();


        galleryModal.classList.add(
          "show"
        );


        document.body.style.overflow =
          "hidden";

      }
    );

  }
);


/* -----------------------------------------
   다음 사진
----------------------------------------- */

if (modalNext) {

  modalNext.addEventListener(
    "click",
    () => {

      if (
        galleryImages.length === 0
      ) {

        return;

      }


      currentImageIndex++;


      if (
        currentImageIndex >=
        galleryImages.length
      ) {

        currentImageIndex = 0;

      }


      showImage();

    }
  );

}


/* -----------------------------------------
   이전 사진
----------------------------------------- */

if (modalPrev) {

  modalPrev.addEventListener(
    "click",
    () => {

      if (
        galleryImages.length === 0
      ) {

        return;

      }


      currentImageIndex--;


      if (
        currentImageIndex < 0
      ) {

        currentImageIndex =
          galleryImages.length - 1;

      }


      showImage();

    }
  );

}


/* -----------------------------------------
   갤러리 닫기
----------------------------------------- */

function closeGallery() {

  if (!galleryModal) {
    return;
  }


  galleryModal.classList.remove(
    "show"
  );


  document.body.style.overflow = "";

}


/* X 버튼 */

if (modalClose) {

  modalClose.addEventListener(
    "click",
    closeGallery
  );

}


/* 사진 바깥 검은 부분 클릭 */

if (galleryModal) {

  galleryModal.addEventListener(
    "click",
    (event) => {

      if (
        event.target === galleryModal
      ) {

        closeGallery();

      }

    }
  );

}


/* ESC 키로 닫기 */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      galleryModal &&
      galleryModal.classList.contains(
        "show"
      )
    ) {

      closeGallery();

    }

  }
);



/* =========================================================
   5. 꽃가마 애니메이션
========================================================= */

const gamaSection =
  document.querySelector(
    ".gama-section"
  );


const gamaRunner =
  document.querySelector(
    ".gama-runner"
  );


if (
  gamaSection &&
  gamaRunner &&
  "IntersectionObserver" in window
) {

  const gamaObserver =
    new IntersectionObserver(

      (entries) => {

        entries.forEach((entry) => {

          /* 꽃가마 영역이 보이면 시작 */

          if (entry.isIntersecting) {

            gamaRunner.classList.add(
              "is-running"
            );


            /*
              CSS에 infinite가 있기 때문에
              클래스는 한 번만 추가하면 됨
            */

            gamaObserver.unobserve(
              gamaSection
            );

          }

        });

      },

      {
        threshold: 0.3
      }

    );


  gamaObserver.observe(
    gamaSection
  );

}


/* 구형 브라우저 */

else if (
  gamaSection &&
  gamaRunner
) {

  gamaRunner.classList.add(
    "is-running"
  );

}



/* =========================================================
   6. 계좌번호 열기 / 닫기
========================================================= */

const accountToggles =
  document.querySelectorAll(
    ".account-toggle"
  );


accountToggles.forEach(
  (toggle) => {

    toggle.addEventListener(
      "click",
      () => {

        const group =
          toggle.closest(
            ".account-group"
          );


        if (!group) {
          return;
        }


        group.classList.toggle(
          "open"
        );

      }
    );

  }
);



/* =========================================================
   7. 계좌번호 복사
========================================================= */

const copyAccountButtons =
  document.querySelectorAll(
    ".copy-account"
  );


copyAccountButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      async () => {

        const account =
          button.dataset.account;


        if (!account) {
          return;
        }


        const originalText =
          button.innerText;


        try {

          /* 최신 브라우저 */

          if (
            navigator.clipboard &&
            window.isSecureContext
          ) {

            await navigator.clipboard.writeText(
              account
            );

          }

          else {

            throw new Error(
              "Clipboard API 사용 불가"
            );

          }


          button.innerText =
            "복사완료";


          setTimeout(() => {

            button.innerText =
              originalText;

          }, 1500);

        }


        catch (error) {

          /*
            아이폰 / 일부 모바일 브라우저
            구형 브라우저 대비
          */

          const textarea =
            document.createElement(
              "textarea"
            );


          textarea.value =
            account;


          textarea.style.position =
            "fixed";


          textarea.style.opacity =
            "0";


          document.body.appendChild(
            textarea
          );


          textarea.focus();

          textarea.select();


          try {

            document.execCommand(
              "copy"
            );


            button.innerText =
              "복사완료";

          }

          catch (copyError) {

            button.innerText =
              "복사실패";

          }


          textarea.remove();


          setTimeout(() => {

            button.innerText =
              originalText;

          }, 1500);

        }

      }
    );

  }
);



/* =========================================================
   8. 카카오 웨딩홀 지도
========================================================= */

const weddingMapContainer =
  document.getElementById(
    "weddingMap"
  );


function initWeddingMap() {

  if (!weddingMapContainer) {
    return;
  }


  /* 카카오 지도 API 확인 */

  if (
    typeof kakao === "undefined" ||
    !kakao.maps
  ) {

    console.log(
      "카카오 지도 API를 불러오지 못했습니다."
    );

    return;

  }


  /* 서비스 라이브러리 확인 */

  if (
    !kakao.maps.services
  ) {

    console.log(
      "카카오 지도 services 라이브러리를 불러오지 못했습니다."
    );

    return;

  }


  /* -----------------------------------------
     지도 생성
  ----------------------------------------- */

  const weddingMapOption = {

    /*
      주소 검색 전 임시 중심 위치
    */

    center:
      new kakao.maps.LatLng(
        35.18,
        128.10
      ),

    level: 4

  };


  const weddingMap =
    new kakao.maps.Map(

      weddingMapContainer,

      weddingMapOption

    );


  /* -----------------------------------------
     주소 → 좌표 변환
  ----------------------------------------- */

  const weddingGeocoder =
    new kakao.maps.services.Geocoder();


  weddingGeocoder.addressSearch(

    "경남 진주시 진성면 동부로1307번길 37",

    function (result, status) {


      if (
        status ===
        kakao.maps.services.Status.OK
      ) {

        const weddingPosition =
          new kakao.maps.LatLng(

            result[0].y,

            result[0].x

          );


        /* 지도 중심 이동 */

        weddingMap.setCenter(
          weddingPosition
        );


        /* ---------------------------------
           마커 생성
        --------------------------------- */

        const weddingMarker =
          new kakao.maps.Marker({

            position:
              weddingPosition,

            map:
              weddingMap

          });


        /* ---------------------------------
           웨딩홀 이름 표시
        --------------------------------- */

        const weddingOverlay =
          new kakao.maps.CustomOverlay({

            position:
              weddingPosition,

            yAnchor:
              2.2,

            content:
              `
                <div class="wedding-map-label">
                  더 리움 웨딩홀
                </div>
              `

          });


        weddingOverlay.setMap(
          weddingMap
        );


      }

      else {

        console.log(
          "웨딩홀 주소를 찾지 못했습니다.",
          status
        );

      }

    }

  );

}


/* -----------------------------------------
   카카오 API가 준비된 후 지도 실행
----------------------------------------- */

if (
  weddingMapContainer &&
  typeof kakao !== "undefined" &&
  kakao.maps
) {

  /*
    autoload=false를 사용했을 때도 대응
  */

  if (
    typeof kakao.maps.load ===
    "function"
  ) {

    kakao.maps.load(
      initWeddingMap
    );

  }

  else {

    initWeddingMap();

  }

}