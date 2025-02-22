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

// Hamburger Menu Toggle
document.querySelector('.hamburger')?.addEventListener('click', () => {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
});

// Contact Form Handling
document.getElementById('contactForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const feedback = document.getElementById('formFeedback');

    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    feedback.textContent = '';

    let isValid = true;

    if (!name || name.length < 2) {
        nameError.textContent = name ? 'Name must be at least 2 characters.' : 'Please enter your name.';
        isValid = false;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.textContent = email ? 'Please enter a valid email address.' : 'Please enter your email.';
        isValid = false;
    }

    if (!message || message.length < 10) {
        messageError.textContent = message ? 'Message must be at least 10 characters.' : 'Please enter a message.';
        isValid = false;
    }

    if (isValid) {
        feedback.textContent = 'Sending...';
        feedback.style.color = '#3498db';

        try {
            const response = await fetch('/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });
            const result = await response.json();

            if (response.ok) {
                feedback.textContent = result.message;
                feedback.style.color = '#27ae60';
                this.reset();
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            feedback.textContent = 'Error sending message. Try again later.';
            feedback.style.color = '#e74c3c';
            console.error(error);
        }
    } else {
        feedback.textContent = 'Please fix the errors above.';
        feedback.style.color = '#e74c3c';
    }
});