// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Check saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Progress Bars Animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress');
            progressBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
            });
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    progressObserver.observe(skillsSection);
}

// Scroll Animation (Fade In Up)
const fadeElements = document.querySelectorAll('.fade-in-up, .skill-card, .project-card, .stat');
const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        // Element might only have fade-in-up or card class
        const pos = element.getBoundingClientRect().top;
        if (pos < window.innerHeight - 80) {
            element.classList.add('visible');
        }
    });
};
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);
fadeInOnScroll(); // Initialize

// Contact Form
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for contacting me! I will get back to you soon.');
    contactForm.reset();
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
});

// Optional: Typewriter if you want dynamic effect
// Uncomment if you want dynamic typewriter for h1

// function typeWriterEffect(element, text, i = 0) {
//     if (i < text.length) {
//         element.innerHTML = text.substring(0, i + 1) + '<span style="border-right:.15em solid #6C63FF"></span>';
//         setTimeout(() => typeWriterEffect(element, text, i + 1), 80);
//     } else {
//         element.innerHTML = text; // Remove caret after typing
//     }
// }
// const headline = document.querySelector('.typewriter');
// if (headline) {
//     typeWriterEffect(headline, headline.textContent.trim());
// }

// Optional: Ripple Effect (if you want it via JS not only CSS)
document.querySelectorAll('.btn, .btn-small').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = (e.clientX - btn.getBoundingClientRect().left) + 'px';
        ripple.style.top = (e.clientY - btn.getBoundingClientRect().top) + 'px';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});
