'use strict'
var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      ;(descriptor.enumerable = descriptor.enumerable || !1),
        (descriptor.configurable = !0),
        'value' in descriptor && (descriptor.writable = !0),
        Object.defineProperty(target, descriptor.key, descriptor)
    }
  }
  return function(Constructor, protoProps, staticProps) {
    return (
      protoProps && defineProperties(Constructor.prototype, protoProps),
      staticProps && defineProperties(Constructor, staticProps),
      Constructor
    )
  }
})()
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError('Cannot call a class as a function')
}
$(document).ready(function() {
  $('body')
  var MainPage = (function() {
    function MainPage() {
      _classCallCheck(this, MainPage)
    }
    return (
      _createClass(MainPage, null, [
        {
          key: 'initSwiper',
          value: function() {
            new Swiper('.steps .swiper-container', {
              slidesPerView: 'auto',
              pagination: { el: '.steps .swiper-pagination' },
            }),
              new Swiper('.licenses .swiper-container', {
                slidesPerView: '5',
                spaceBetween: 24,
                navigation: {
                  nextEl: '.licenses .swiper-button-next',
                  prevEl: '.licenses .swiper-button-prev',
                },
              })
          },
        },
        {
          key: 'initSlider',
          value: function() {
            var sumConfig = { step: 1e4, min: 1e3, max: 5e5 },
              sumSlider = document.getElementById('sum')
            noUiSlider.create(sumSlider, {
              start: 17e4,
              step: sumConfig.step,
              behaviour: 'snap',
              connect: [!0, !1],
              range: { min: sumConfig.min, max: sumConfig.max },
              format: wNumb({ decimals: 0 }),
            }),
              updateRange(sumSlider, sumConfig)
            var periodConfig = { step: 1, min: 6, max: 48 },
              periodSlider = document.getElementById('period')
            noUiSlider.create(periodSlider, {
              start: 12,
              step: periodConfig.step,
              behaviour: 'period',
              connect: [!0, !1],
              range: { min: periodConfig.min, max: periodConfig.max },
              format: wNumb({ decimals: 0 }),
            }),
              updateRange(periodSlider, periodConfig)
          },
        },
        {
          key: 'initInput',
          value: function() {
            $('.custom-input').on('focus', 'input[type="text"]', function() {
              $(this).addClass('filed')
            }),
              $('.custom-input').on('blur', 'input[type="text"]', function() {
                this.value || $(this).removeClass('filed')
              })
          },
        },
      ]),
      MainPage
    )
  })()
  function updateRange(element, config) {
    var parent = $(element).closest('.thumb-range'),
      input0 = parent.find('input')[0],
      inputs = [input0]
    element.noUiSlider.on('update', function(values, handle) {
      inputs[handle].value = values[handle]
    }),
      inputs.forEach(function(input, handle) {
        input.addEventListener('change', function() {
          element.noUiSlider.setHandle(handle, this.value)
        }),
          input.addEventListener('keydown', function(e) {
            var position,
              values = element.noUiSlider.get(),
              value = Number(values[handle]),
              step = element.noUiSlider.steps()[handle]
            switch (e.which) {
              case 13:
                element.noUiSlider.setHandle(handle, this.value)
                break
              case 38:
                !1 === (position = step[1]) && (position = 1),
                  null !== position &&
                    element.noUiSlider.setHandle(handle, value + position)
                break
              case 40:
                !1 === (position = step[0]) && (position = 1),
                  null !== position &&
                    element.noUiSlider.setHandle(handle, value - position)
            }
          })
      })
    var inc = parent.find('.increment')[0],
      dec = parent.find('.decrement')[0]
    inc.addEventListener('click', function() {
      var result = +input0.value + config.step
      if (
        (result >= config.max
          ? (input0.value = config.max)
          : (input0.value = result),
        result <= config.max)
      ) {
        var position = parseInt(element.noUiSlider.get())
        ;(position += config.step),
          (position = Math.round(position / config.step) * config.step),
          element.noUiSlider.set(position)
      }
    }),
      dec.addEventListener('click', function() {
        var result = +input0.value - config.step
        if (
          (result <= config.min
            ? (input0.value = config.min)
            : (input0.value = result),
          result >= config.min)
        ) {
          var position = parseInt(element.noUiSlider.get())
          ;(position -= config.step),
            (position = Math.round(position / config.step) * config.step),
            element.noUiSlider.set(position)
        }
      })
  }
  MainPage.initSwiper(),
    MainPage.initSlider(),
    MainPage.initInput(),
    new (function CommonElements() {
      _classCallCheck(this, CommonElements),
        svg4everybody(),
        $('.tel').mask('+38 (999) 999-99-99'),
        $('.btn-burger').click(function() {
          console.log('button click')
          $('.header').hasClass('opened')
            ? $('.header').removeClass('opened')
            : $('.header').addClass('opened')
        })
    })()
})
