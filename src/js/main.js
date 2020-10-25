// Object fit images
objectFitImages();

// Lazy Load images
window.lazySizesConfig = window.lazySizesConfig || {};
lazySizesConfig.expand = 100;
lazySizesConfig.hFac = 0.4;
lazySizes.init();


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
