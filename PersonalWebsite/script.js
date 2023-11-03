const colors = ["#003262", "#FDB515"]; // blue and gold

// Function to set the hover color based on data attribute
const setHoverColor = (span) => span.style.color = span.getAttribute("data-color");


// Function to reset the color
const resetColor = (span) => span.style.color = "";


// Wrap each character in a span and attach hover events
const wrapTextAndApplyHover = (id) => {
    const element = document.getElementById(id);
    const originalText = element.textContent;
    let wrappedText = "";

    let charCount = 0; // Counter for non-space characters

    for (let i = 0; i < originalText.length; i++) {
        let char = originalText[i];
        if (char === " ") {
            wrappedText += " ";
        } else {
            let color = colors[charCount % 2];
            wrappedText += `<span class="hoverable" data-color="${color}">${char}</span>`;
            charCount++;
        }
    }

    element.innerHTML = wrappedText;

    // Attach the hover events using arrow functions
    document.querySelectorAll(`#${id} .hoverable`).forEach(span => {
        span.addEventListener("mouseover", () => setHoverColor(span));
        span.addEventListener("mouseout", () => resetColor(span));
    });
}

wrapTextAndApplyHover("myName");
wrapTextAndApplyHover("hi");

document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.querySelector('form');
    const submitButton = document.querySelector('.submit-button');

    submitButton.addEventListener('click', function(event) {
        event.preventDefault(); // prevent any default behavior

        const formData = new FormData(contactForm);
        const dataObj = {};

        formData.forEach((value, key) => {
            dataObj[key] = value;
        });

        fetch('/submit_form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataObj)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                contactForm.reset();
            } else {
                alert('Error occurred while processing the form.');
            }
        })
        .catch(error => {
            console.error('There was an error:', error);
            alert('An error occurred. Please try again later.');
        });
    });
});


