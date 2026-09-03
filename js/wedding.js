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

/* =========================================
   꽃가마 애니메이션
========================================= */

const gamaSection =
  document.querySelector(".gama-section");

const gamaRunner =
  document.querySelector(".gama-runner");


if (gamaSection && gamaRunner) {

  const gamaObserver =
    new IntersectionObserver((entries) => {

      entries.forEach((entry) => {

        /*
            꽃가마 영역이 화면에
            약 30% 보이면 시작
        */

        if (entry.isIntersecting) {

          gamaRunner.classList.add(
            "is-running"
          );


          /*
              한 번 실행 후 감시 종료
          */

          gamaObserver.unobserve(
            gamaSection
          );

        }

      });

    }, {

      threshold: 0.3

    });


  gamaObserver.observe(gamaSection);

}

/* =========================================
   계좌번호 열기 / 닫기
========================================= */

const accountToggles =
  document.querySelectorAll(".account-toggle");


accountToggles.forEach((toggle) => {

  toggle.addEventListener("click", () => {

    const group =
      toggle.closest(".account-group");


    group.classList.toggle("open");

  });

});



/* =========================================
   계좌번호 복사
========================================= */

const copyAccountButtons =
  document.querySelectorAll(".copy-account");


copyAccountButtons.forEach((button) => {

  button.addEventListener("click", async () => {

    const account =
      button.dataset.account;


    try {

      await navigator.clipboard.writeText(
        account
      );


      const originalText =
        button.innerText;


      button.innerText =
        "복사완료";


      setTimeout(() => {

        button.innerText =
          originalText;

      }, 1500);


    } catch (error) {

      /*
        일부 구형 브라우저 대비
      */

      const textarea =
        document.createElement("textarea");


      textarea.value =
        account;


      document.body.appendChild(
        textarea
      );


      textarea.select();


      document.execCommand(
        "copy"
      );


      textarea.remove();


      button.innerText =
        "복사완료";


      setTimeout(() => {

        button.innerText =
          "복사";

      }, 1500);

    }

  });

});

/* =========================================
   웨딩홀 지도
========================================= */

const mapContainer =
  document.getElementById("weddingMap");


if (mapContainer) {

  const mapOption = {

    center: new kakao.maps.LatLng(
      35.0,
      128.0
    ),

    level: 4

  };


  const map =
    new kakao.maps.Map(
      mapContainer,
      mapOption
    );


  /* 주소 → 좌표 변환 */

  const geocoder =
    new kakao.maps.services.Geocoder();


  geocoder.addressSearch(

    "경남 진주시 진성면 동부로1307번길 37",

    function (result, status) {


      if (
        status ===
        kakao.maps.services.Status.OK
      ) {

        const position =
          new kakao.maps.LatLng(
            result[0].y,
            result[0].x
          );


        /* 지도 중심 이동 */

        map.setCenter(position);


        /* 마커 */

        const marker =
          new kakao.maps.Marker({

            map: map,

            position: position

          });


        /* 식장 이름 */

        const overlay =
          new kakao.maps.CustomOverlay({

            position: position,

            yAnchor: 2.1,

            content: `
              <div class="wedding-map-label">
                더 리움 웨딩홀
              </div>
            `

          });


        overlay.setMap(map);

      }

    }

  );

}

/* =========================================
   카카오 웨딩홀 지도
========================================= */

const weddingMapContainer =
  document.getElementById("weddingMap");


if (
  weddingMapContainer &&
  typeof kakao !== "undefined"
) {

  /*
      처음 지도 위치는 임시 위치입니다.
      아래 addressSearch가 성공하면
      웨딩홀 위치로 자동 이동합니다.
  */

  const weddingMapOption = {

    center: new kakao.maps.LatLng(
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


  /*
      주소를 실제 좌표로 변환
  */

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


        /*
            지도 중심을 웨딩홀로 이동
        */

        weddingMap.setCenter(
          weddingPosition
        );


        /*
            웨딩홀 마커 생성
        */

        const weddingMarker =
          new kakao.maps.Marker({

            position: weddingPosition

          });


        weddingMarker.setMap(
          weddingMap
        );


        /*
            마커 위 웨딩홀 이름
        */

        const weddingOverlay =
          new kakao.maps.CustomOverlay({

            position:
              weddingPosition,

            content: `
              <div class="wedding-map-label">
                더 리움 웨딩홀
              </div>
            `,

            yAnchor: 2.2

          });


        weddingOverlay.setMap(
          weddingMap
        );

      } else {

        console.log(
          "웨딩홀 주소를 찾지 못했습니다."
        );

      }

    }

  );

}