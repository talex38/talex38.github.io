// js/main.js

/**
 * Dynamic Feature 1: Asynchronous Component Loading
 * Fetches HTML from the components folder and injects it into the DOM.
 */
async function loadComponent(selector, file) {
    try {
        const response = await fetch(file);
        if (response.ok) {
            const html = await response.text();
            document.querySelector(selector).innerHTML = html;
        } else {
            console.error(`Failed to load ${file}`);
        }
    } catch (error) {
        console.error(`Error fetching ${file}:`, error);
    }
}

/**
 * Dynamic Feature 2: Image Slideshow
 * Cycles through elements with the 'slide' class.
 */
let slideIndex = 0;
function runSlideshow() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return; // Exit if not on the products page

    // Hide all slides (Added parentheses around the 'slide' argument)
    slides.forEach((slide) => slide.style.display = 'none');
    
    // Increment and show the current slide
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    slides[slideIndex - 1].style.display = 'block';
    
    // Change image every 3 seconds
    setTimeout(runSlideshow, 3000);
}

/**
 * Dynamic Feature 3: Form Interaction
 * Intercepts the contact form to provide dynamic user feedback.
 */
function setupContactForm() {
    const form = document.getElementById('contactForm');
    const responseMsg = document.getElementById('formResponse');
    
    if (form && responseMsg) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent page reload
            const name = document.getElementById('userName').value;
            // Dynamically update DOM based on user input
            responseMsg.innerHTML = `<strong>Thanks for reaching out, ${name}! The colony has received your signal.</strong>`;
            form.reset();
        });
    }
}

// Initialize all dynamic functionality when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const includes = document.querySelectorAll('[data-include]');
    
    includes.forEach((el) => {
    const file = el.getAttribute('data-include');
    const selector = `#${el.id}`;
    loadComponent(selector, file);
});

    // Run your other existing functions
    setupContactForm();
    runSlideshow();
});

// Initialize all dynamic functionality when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load header and footer components
    loadComponent('#main-header', 'components/header.html');
    loadComponent('#main-footer', 'components/footer.html').then(() => {
        setupContactForm();
    });
    
    runSlideshow();

});