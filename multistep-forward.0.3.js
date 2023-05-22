// multistep-forward.0.3.js

function receive(form, entries) {
    // create hidden fields
    entries.forEach(([key, value]) => {

        // console.log(`key: ${key}, value: ${value}`);
        const sanitizedValue = document.createTextNode(value).textContent;
        const addHtml = `<input type="hidden" id="${key}" name="${key}" value="${sanitizedValue}">`;
        form.insertAdjacentHTML("afterbegin", addHtml);

    });

    // Update urls
    const utmParams = new URLSearchParams(window.location.search).toString();
    const existingRedirectUrl = form.getAttribute('redirect');
    if (existingRedirectUrl) {
        const updatedRedirectUrl = existingRedirectUrl + (existingRedirectUrl.includes('?') ? '&' : '?') + utmParams.toString();
        form.setAttribute('redirect', updatedRedirectUrl);
        form.setAttribute('data-redirect', updatedRedirectUrl);
    };

    // Forward UTM to multiple submits
    const submitElements = form.querySelectorAll('input[data-redirect]');

    submitElements.forEach((submitElement) => {
        const redirectUrl = submitElement.getAttribute('data-redirect');
        const updatedRedirectUrl = redirectUrl + (redirectUrl.includes('?') ? '&' : '?') + utmParams.toString();
        submitElement.setAttribute('data-redirect', updatedRedirectUrl);
    });

};

function send(form) {
    localStorage.removeItem("multistepforward");
    const utmParams = new URLSearchParams(window.location.search);
    const existingRedirectUrl = form.getAttribute('redirect');
    const updatedRedirectUrl = existingRedirectUrl + (existingRedirectUrl.includes('?') ? '&' : '?') + utmParams.toString();
    form.setAttribute('redirect', updatedRedirectUrl);
    form.setAttribute('data-redirect', updatedRedirectUrl);

    form.addEventListener("change", e => { saveInputs() });
    form.addEventListener("input", e => { saveInputs() })

    // creates a hidden input with the utm tags
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'utm';
    hiddenInput.value = utmParams.toString() || 'null';
    form.appendChild(hiddenInput);

    // Save inputs to localStorage
    function saveInputs() {
        const inputs = form.querySelectorAll('form input, form select, form textarea');
        let inputObject = { "utm": utmParams.toString() || "" };
        // localStorage.setItem("utm", utmParams.toString());
        inputs.forEach(input => {
            if (input.type !== "submit" && input.name) {
                let value = "";
                if (input.type === "checkbox" || input.type === "radio") {
                    if (input.checked) {
                        value = input.value;
                    } else {
                        if (input.type === "checkbox") {
                            value = "false";
                        }
                    }
                } else {
                    value = input.value;
                }
                if (inputObject[input.name] !== value) {
                    inputObject[input.name] = value;
                }

            }
        });
        localStorage.setItem("multistepforward", JSON.stringify(inputObject));


    };
};

// when DOM is loaded:
document.addEventListener("DOMContentLoaded", function () {
    const forwardForms = document.querySelectorAll('[data-form-forward="true"]');
    const loadForms = document.querySelectorAll('[data-load-forward="true"]');

    // Forward and save to localStorage:
    if (forwardForms.length > 0) {
        forwardForms.forEach(function (form) {
            console.log("Forward this form:" + form.getAttribute("id"));
            send(form)
        });
    };

    // Load from localStorage:
    if (loadForms.length > 0 && localStorage !== null) {
        loadForms.forEach(function (form) {
            console.log("Load data for this form: " + form.getAttribute("id"));
            const savedInputs = JSON.parse(localStorage.getItem("multistepforward"));

            receive(form, Object.entries(savedInputs));
        })
        localStorage.removeItem("multistepforward");
    };
});