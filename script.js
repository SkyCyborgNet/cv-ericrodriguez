/* ==================================================
   PRELOADER
   ================================================== */
document.addEventListener('DOMContentLoaded', function() {
    // Ocultar preloader
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1500);
});

/* ==================================================
   NAVIGATION
   ================================================== */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger menu toggle
hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', function() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

/* ==================================================
   TYPED.JS - TEXTO MECANOGRAFIADO
   ================================================== */
if (document.getElementById('typed-text')) {
    const typed = new Typed('#typed-text', {
        strings: [
            'Ingeniero de Datos & AI',
            'Ingeniero Civil',
            'Desarrollador de Software',
            'Data Scientist',
            'Machine Learning Engineer',
            'Computer Vision Specialist'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        autoInsertCss: true
    });
}

/* ==================================================
   PARTICLES.JS - FONDO DE PARTÍCULAS
   ================================================== */
if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#D4AF37'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.3,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#D4AF37',
                opacity: 0.15,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.5
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}

/* ==================================================
   SCROLLREVEAL - ANIMACIONES AL SCROLL
   ================================================== */
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '60px',
    duration: 1000,
    delay: 100,
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    reset: false,
    mobile: true
});

// Reveal elements
sr.reveal('.section-header', { origin: 'top', distance: '40px' });
sr.reveal('.about-content', { origin: 'left', distance: '50px' });
sr.reveal('.about-timeline', { origin: 'right', distance: '50px', delay: 200 });
sr.reveal('.service-card', { interval: 100 });
sr.reveal('.expertise-tabs', { origin: 'top', distance: '40px' });
sr.reveal('.project-card', { interval: 150 });
sr.reveal('.cert-card', { interval: 100 });
sr.reveal('.testimonial-card', { interval: 150 });
sr.reveal('.contact-info .contact-card', { interval: 100 });
sr.reveal('.contact-form-wrapper', { origin: 'right', distance: '50px' });
sr.reveal('.footer-content', { origin: 'top', distance: '30px' });

/* ==================================================
   STATS COUNTER ANIMATION
   ================================================== */
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when section is visible
const heroStats = document.querySelector('.hero-stats');
let counterAnimated = false;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterAnimated) {
            counterAnimated = true;
            animateCounters();
        }
    });
}, { threshold: 0.5 });

if (heroStats) {
    observer.observe(heroStats);
}

/* ==================================================
   EXPERTISE TABS
   ================================================== */
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        tabBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get tab id
        const tabId = this.getAttribute('data-tab');
        
        // Hide all panels
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        // Show target panel
        const targetPanel = document.getElementById(`tab-${tabId}`);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
    });
});

/* ==================================================
   PROJECTS FILTER
   ================================================== */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all filter buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'all' || filterValue === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

/* ==================================================
   TESTIMONIALS SLIDER (SWIPER)
   ================================================== */
if (document.querySelector('.testimonials-slider')) {
    const swiper = new Swiper('.testimonials-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40,
            }
        },
        effect: 'slide',
        speed: 800,
        grabCursor: true,
        keyboard: {
            enabled: true,
        },
    });
}

/* ==================================================
   BACK TO TOP BUTTON
   ================================================== */
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* ==================================================
   CONTACT FORM
   ================================================== */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Por favor, completa todos los campos requeridos.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Por favor, ingresa un email válido.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('¡Mensaje enviado exitosamente! Te contactaré pronto.', 'success');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

/* ==================================================
   NOTIFICATION SYSTEM
   ================================================== */
function showNotification(message, type = 'info') {
    // Check if notification container exists
    let container = document.getElementById('notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 99999;
            display: flex;
            flex-direction: column;
            gap: 12px;
            max-width: 400px;
            width: 100%;
        `;
        document.body.appendChild(container);
    }
    
    // Create notification
    const notification = document.createElement('div');
    const colors = {
        success: '#00FF88',
        error: '#FF4757',
        info: '#00D4FF'
    };
    
    notification.style.cssText = `
        background: var(--primary-dark);
        color: var(--white);
        padding: 16px 20px;
        border-radius: 12px;
        border-left: 4px solid ${colors[type] || colors.info};
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        font-family: var(--font-secondary);
        font-size: 0.95rem;
        animation: slideInRight 0.4s ease forwards;
        display: flex;
        align-items: center;
        gap: 12px;
    `;
    
    const icon = document.createElement('i');
    icon.className = type === 'success' ? 'fas fa-check-circle' : 
                     type === 'error' ? 'fas fa-exclamation-circle' : 
                     'fas fa-info-circle';
    icon.style.color = colors[type] || colors.info;
    icon.style.fontSize = '1.2rem';
    
    const text = document.createElement('span');
    text.textContent = message;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.4);
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: auto;
        transition: color 0.2s;
    `;
    closeBtn.onmouseover = () => closeBtn.style.color = 'var(--white)';
    closeBtn.onmouseout = () => closeBtn.style.color = 'rgba(255, 255, 255, 0.4)';
    closeBtn.onclick = () => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    };
    
    notification.appendChild(icon);
    notification.appendChild(text);
    notification.appendChild(closeBtn);
    container.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add animation keyframes for notifications
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleSheet);

/* ==================================================
   NEWSLETTER FORM
   ================================================== */
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const input = this.querySelector('input[type="email"]');
        const email = input.value.trim();
        
        if (!email) {
            showNotification('Por favor, ingresa tu email.', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Por favor, ingresa un email válido.', 'error');
            return;
        }
        
        // Simulate subscription
        const btn = this.querySelector('button');
        const originalIcon = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;
        
        setTimeout(() => {
            showNotification('¡Te has suscrito exitosamente!', 'success');
            input.value = '';
            btn.innerHTML = originalIcon;
            btn.disabled = false;
        }, 1500);
    });
}

/* ==================================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

/* ==================================================
   PARALLAX EFFECT ON HERO
   ================================================== */
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.scrollY;
        const heroContent = hero.querySelector('.hero-content');
        const heroVisual = hero.querySelector('.hero-visual');
        
        if (heroContent && window.innerWidth > 992) {
            heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
            heroContent.style.opacity = 1 - (scrolled / 800);
        }
        
        if (heroVisual && window.innerWidth > 992) {
            heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    }
});

/* ==================================================
   KEYBOARD NAVIGATION (ACCESSIBILITY)
   ================================================== */
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

/* ==================================================
   CONSOLE WELCOME MESSAGE
   ================================================== */
console.log('%c🚀 [Eric Rodriguez] - Portfolio', 'font-size: 24px; font-weight: bold; color: #D4AF37;');
console.log('%cIngeniero de Datos & AI | Civil | Software', 'font-size: 16px; color: #00D4FF;');
console.log('%c📧 tu.email@ejemplo.com', 'font-size: 14px; color: #6C757D;');
console.log('%c💼 Disponible para proyectos', 'font-size: 14px; color: #00FF88;');

/* ==================================================
   PERFORMANCE OPTIMIZATION
   ================================================== */
// Lazy load images with Intersection Observer
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Debounce resize events
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Handle resize events if needed
    }, 250);
});

/* ==================================================
   SMOOTH CURSOR TRAIL (OPTIONAL - DESKTOP ONLY)
   ================================================== */
if (window.innerWidth > 1024 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const cursorTrail = document.createElement('div');
    cursorTrail.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: var(--secondary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.4;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
        display: none;
    `;
    document.body.appendChild(cursorTrail);
    
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorTrail.style.display = 'block';
    });
    
    function animateCursor() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        cursorTrail.style.transform = `translate(${trailX - 4}px, ${trailY - 4}px)`;
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hide cursor trail on touch devices
    document.addEventListener('touchstart', function() {
        cursorTrail.style.display = 'none';
    });
}

/* ==================================================
   REDUCED MOTION PREFERENCE
   ================================================== */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.querySelectorAll('.animate__animated').forEach(el => {
        el.classList.remove('animate__animated');
    });
    
    // Disable particles
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer) {
        particlesContainer.style.display = 'none';
    }
    
    // Disable typed.js
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        typedElement.textContent = 'Ingeniero de Datos & AI';
    }
}

console.log('✅ Portfolio cargado exitosamente');