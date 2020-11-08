// Swiper JS
const quickLinksSlider = new Swiper('.js-quicklinks-carousel', {
    navigation: {
        nextEl: '.js-swiper-control.-next',
        prevEl: '.js-swiper-control.-prev',
    },
    slidesPerView: 2,
    breakpoints: {
        600: {
            slidesPerView: 3
        },
        900: {
            slidesPerView: 4
        },
        1024: {
            slidesPerView: 5
        },
        1200: {
            slidesPerView: 6
        }
        ,
        1600: {
            slidesPerView: 7
        }
    }
})

// Object fit images
objectFitImages();

// Lazy Load images
window.lazySizesConfig = window.lazySizesConfig || {};
lazySizesConfig.expand = 100;
lazySizesConfig.hFac = 0.4;
lazySizes.init();

