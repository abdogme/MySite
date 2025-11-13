// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
// Particle Network Canvas Effect

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const PARTICLE_NUM = 60; // عدد النقاط
const CONNECT_DISTANCE = 120; // المسافة المسموح بها للرسم بين النقاط
let mouse = { x: null, y: null };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function randomBetween(a, b) {
    return Math.random() * (b - a) + a;
}

// Particle Class
function Particle() {
    this.x = randomBetween(0, canvas.width);
    this.y = randomBetween(0, canvas.height);
    this.radius = randomBetween(2, 3.2);
    this.vx = randomBetween(-0.6, 0.6);
    this.vy = randomBetween(-0.6, 0.6);
}
Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = "#6C63FF";
    ctx.globalAlpha = 0.7;
    ctx.fill();
    ctx.globalAlpha = 1;
};
function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_NUM; i++) {
        particles.push(new Particle());
    }
}
createParticles();

// Update Particle Positions
function updateParticles() {
    for (let i = 0; i < PARTICLE_NUM; i++) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce from the edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    }
}

// Draw Connections between close particles
function drawConnections() {
    for (let i = 0; i < PARTICLE_NUM; i++) {
        for (let j = i + 1; j < PARTICLE_NUM; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < CONNECT_DISTANCE) {
                ctx.beginPath();
                ctx.strokeStyle = "rgba(108,99,255,0.19)";
                ctx.lineWidth = 1.2;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    // Connect mouse to close particles
    if (mouse.x && mouse.y) {
        for (let i = 0; i < PARTICLE_NUM; i++) {
            let dx = particles[i].x - mouse.x;
            let dy = particles[i].y - mouse.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONNECT_DISTANCE) {
                ctx.beginPath();
                ctx.strokeStyle = "rgba(76,175,80,0.5)";
                ctx.lineWidth = 2;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
    }
}

canvas.addEventListener('mousemove', function(e){
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
canvas.addEventListener('mouseleave', function(){
    mouse.x = null;
    mouse.y = null;
});

// Animation Loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateParticles();
    for (let i = 0; i < PARTICLE_NUM; i++) {
        particles[i].draw();
    }
    drawConnections();
    requestAnimationFrame(animate);
}
animate();

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

