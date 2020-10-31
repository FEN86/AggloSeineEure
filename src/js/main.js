// Swiper JS
const quickLinksSlider = new Swiper('.quicklinks-block__carousel', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
})

// Object fit images
objectFitImages();

// Lazy Load images
window.lazySizesConfig = window.lazySizesConfig || {};
lazySizesConfig.expand = 100;
lazySizesConfig.hFac = 0.4;
lazySizes.init();

