// Object fit images
objectFitImages();

// Lazy Load images
window.lazySizesConfig = window.lazySizesConfig || {};
lazySizesConfig.expand = 100;
lazySizesConfig.hFac = 0.4;
lazySizes.init();

// jQuery Accordion plugin
// $(function () {
//     // Accordion
//     $('#menu').slideAccordion();
// });

;(function ($) {
    $.fn.slideAccordion = function (opt) {
        // default options
        var options = $.extend({
            addClassBeforeAnimation: false,
            activeClass: 'js-active',
            opener: '.js-opener',
            slider: '.js-slide',
            animSpeed: 300,
            collapsible: true,
            event: 'click'
        }, opt);

        return this.each(function () {
            // options
            var accordion = $(this);
            var items = accordion.find(':has(' + options.slider + ')');

            items.each(function () {
                var item = $(this);
                var opener = item.find(options.opener);
                var slider = item.find(options.slider);

                opener.on(options.event, function (e) {
                    if (!slider.is(':animated')) {
                        if (item.hasClass(options.activeClass)) {
                            if (options.collapsible) {
                                slider.slideUp(options.animSpeed, function () {
                                    hideSlide(slider);
                                    item.removeClass(options.activeClass);
                                });
                            }
                        } else {
                            // show active
                            var levelItems = item.siblings('.' + options.activeClass);
                            var sliderElements = levelItems.find(options.slider);
                            item.addClass(options.activeClass);
                            showSlide(slider).hide().slideDown(options.animSpeed);

                            // collapse others
                            sliderElements.slideUp(options.animSpeed, function () {
                                levelItems.removeClass(options.activeClass);
                                hideSlide(sliderElements);
                            });
                        }
                    }
                    e.preventDefault();
                });
                if (item.hasClass(options.activeClass)) showSlide(slider); else hideSlide(slider);
            });

            accordion.on('destroy', function () {
                items.each(function () {
                    var item = $(this);
                    var opener = item.find(options.opener);
                    var slider = item.find(options.slider);

                    opener.off(options.event);
                    item.removeClass(options.activeClass);
                    slider.prop('style', '');
                })
                accordion.off('destroy');
            })
        });
    };

    // accordion slide visibility
    var showSlide = function (slide) {
        return slide.css({ position: '', top: '', left: '', width: '' });
    };
    var hideSlide = function (slide) {
        return slide.show().css({ position: 'absolute', top: -9999, left: -9999, width: slide.width() });
    };
}(jQuery));

/*
// InputMask
let inputsTel = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask('999-999-9999');
im.mask(inputsTel);

// Validate form
function validateForms(selectorForm, rules) {
    if (document.querySelector(selectorForm)) {
        new window.JustValidate(selectorForm, {
            rules: rules,
            submitHandler: function (form, values, ajax) {
                console.log(form);

                /!*let formData = new formData(form);

                fetch('mail.php', {
                    method: 'POST',
                    body: formData
                })
                    .then(function (data) {
                        console.log(data);
                        console.log('Sended');
                        form.reset();
                    });*!/
            }
        });
    }
}

validateForms('.form', { email: { required: true, email: true }, firstName: { required: true }, lastName: { required: true }, tel: { required: true } });*/
