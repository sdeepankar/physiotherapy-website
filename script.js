// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    header.classList.toggle('sticky', window.scrollY > 50);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Accordion for Services
document.querySelectorAll('.accordion-item h3').forEach(item => {
    item.addEventListener('click', () => {
        const content = item.nextElementSibling;
        content.classList.toggle('active');
    });
});

// Contact Form Handling
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form elements
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const feedback = document.getElementById('formFeedback');

    // Reset error messages
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    feedback.textContent = '';

    let isValid = true;

    // Validation
    if (!name) {
        nameError.textContent = 'Please enter your name.';
        isValid = false;
    } else if (name.length < 2) {
        nameError.textContent = 'Name must be at least 2 characters.';
        isValid = false;
    }

    if (!email) {
        emailError.textContent = 'Please enter your email.';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    if (!message) {
        messageError.textContent = 'Please enter a message.';
        isValid = false;
    } else if (message.length < 10) {
        messageError.textContent = 'Message must be at least 10 characters.';
        isValid = false;
    }

    // If valid, simulate submission
    if (isValid) {
        feedback.textContent = 'Sending...';
        feedback.style.color = '#3498db';
        this.submit(); // Submit to Formspree
    }else {
        feedback.textContent = 'Please fix the errors above.';
        feedback.style.color = '#e74c3c';
    }
});