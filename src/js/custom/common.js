$(document).ready(() => {
  const ACTIVE = "active",
    BODY = $("body");

  class CommonElements {
    constructor() {
      svg4everybody();
      //========================================
    }
  }

  class MainPage {
    static initSwiper() {
      new Swiper(".steps .swiper-container", {
        slidesPerView: "auto",
        pagination: {
          el: ".steps .swiper-pagination"
        }
      });
      new Swiper(".licenses .swiper-container", {
        slidesPerView: "5",
        spaceBetween: 24,
        navigation: {
          nextEl: `.licenses .swiper-button-next`,
          prevEl: `.licenses .swiper-button-prev`
        }
      });
    }
  }

  // init class MainPage for function
  MainPage.initSwiper();

  // init class CommonElements
  new CommonElements();
});
