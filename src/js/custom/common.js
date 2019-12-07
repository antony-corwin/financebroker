$(document).ready(() => {
  const ACTIVE = "active",
    BODY = $("body");

  class CommonElements {
    constructor() {
      svg4everybody();
      //========================================
      $('.tel').mask("+38 (999) 999-99-99");

      $(".btn-burger").click(function () {
        console.log("button click");
        $('.header').hasClass('opened') ?
          $(".header").removeClass("opened") :
          $(".header").addClass("opened");
      } )
    }
  }

  class MainPage {
    static initSwiper() {
      new Swiper(".steps .swiper-container", {
        slidesPerView: "auto",
        pagination: {
          el: ".steps .swiper-pagination"
        },
        breakpoints: {
          640: {
            slidesPerView: 1
          }
        }
      });
      new Swiper(".licenses .swiper-container", {
        slidesPerView: "5",
        spaceBetween: 24,
        navigation: {
          nextEl: `.licenses .swiper-button-next`,
          prevEl: `.licenses .swiper-button-prev`
        },
        breakpoints: {
          640: {
            slidesPerView: "auto",
            spaceBetween: 0,
          }
        }
      });
    }

    static initSlider() {
      var sumConfig = {
        step: 10000,
        min: 1000,
        max: 500000
      };

      var sumSlider = document.getElementById("sum");
      noUiSlider.create(sumSlider, {
        start: 170000,
        step: sumConfig.step,
        behaviour: "snap",
        connect: [true, false],
        range: {
          min: sumConfig.min,
          max: sumConfig.max
        },
        format: wNumb({
          decimals: 0
        })
      });

      updateRange(sumSlider, sumConfig);

      var periodConfig = {
        step: 1,
        min: 6,
        max: 48
      };

      var periodSlider = document.getElementById("period");
      noUiSlider.create(periodSlider, {
        start: 12,
        step: periodConfig.step,
        behaviour: "period",
        connect: [true, false],
        range: {
          min: periodConfig.min,
          max: periodConfig.max
        },
        format: wNumb({
          decimals: 0
        })
      });
      updateRange(periodSlider, periodConfig);
    }

    static initInput() {
      $('.custom-input').on('focus', 'input[type="text"]', function(){
        $(this).addClass('filed');
      });
      $('.custom-input').on('blur', 'input[type="text"]', function(){
        if(!this.value) {
          $(this).removeClass('filed');
        }  
      });
    }
  }

  function updateRange(element, config) {
    var parent = $(element).closest(".thumb-range");
    var input0 = parent.find("input")[0];
    var inputs = [input0];

    element.noUiSlider.on("update", function(values, handle) {
      inputs[handle].value = values[handle];
    });

    inputs.forEach(function(input, handle) {
      input.addEventListener("change", function() {
        element.noUiSlider.setHandle(handle, this.value);
      });
      input.addEventListener("keydown", function(e) {
        var values = element.noUiSlider.get();
        var value = Number(values[handle]);

        // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
        var steps = element.noUiSlider.steps();

        // [down, up]
        var step = steps[handle];

        var position;

        // 13 is enter,
        // 38 is key up,
        // 40 is key down.
        switch (e.which) {
          case 13:
            element.noUiSlider.setHandle(handle, this.value);
            break;

          case 38:
            // Get step to go increase slider value (up)
            position = step[1];

            // false = no step is set
            if (position === false) {
              position = 1;
            }

            // null = edge of slider
            if (position !== null) {
              element.noUiSlider.setHandle(handle, value + position);
            }

            break;

          case 40:
            position = step[0];

            if (position === false) {
              position = 1;
            }

            if (position !== null) {
              element.noUiSlider.setHandle(handle, value - position);
            }

            break;
        }
      });
    });

    var inc = parent.find(".increment")[0];
    var dec = parent.find(".decrement")[0];

    inc.addEventListener("click", function() {
      let value = +input0.value;
      let result = value + config.step;
      result >= config.max
        ? (input0.value = config.max)
        : (input0.value = result);

      if (result <= config.max) {
        var position = parseInt(element.noUiSlider.get());
        position += config.step;
        position = Math.round(position / config.step) * config.step;
        element.noUiSlider.set(position);
      }
    });

    dec.addEventListener("click", function() {
      let value = +input0.value;
      let result = value - config.step;

      result <= config.min
        ? (input0.value = config.min)
        : (input0.value = result);

      if (result >= config.min) {
        var position = parseInt(element.noUiSlider.get());
        position -= config.step;
        position = Math.round(position / config.step) * config.step;
        element.noUiSlider.set(position);
      }
    });
  }
  // init class MainPage for function
  MainPage.initSwiper();
  MainPage.initSlider();
  MainPage.initInput();

  // init class CommonElements
  new CommonElements();
});
