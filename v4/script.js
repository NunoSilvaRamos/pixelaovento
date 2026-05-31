// ===== LANGUAGE TOGGLE =====
let currentLang = 'pt';

const langToggle = document.getElementById('langToggle');

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    updateLanguage();
    updateLangButton();
});

function updateLanguage() {
    const elements = document.querySelectorAll('[data-pt][data-en]');
    elements.forEach(el => {
        const text = el.getAttribute(`data-${currentLang}`);
        if (text) {
            if (el.classList.contains('hero-title')) {
                if (currentLang === 'pt') {
                    el.innerHTML = 'Inspire-se,<br><span class="highlight">nós produzimos</span>';
                } else {
                    el.innerHTML = 'Get inspired,<br><span class="highlight">we produce</span>';
                }
            } else {
                el.textContent = text;
            }
        }
    });
    document.documentElement.lang = currentLang;
}

function updateLangButton() {
    const spans = langToggle.querySelectorAll('span');
    if (currentLang === 'pt') {
        spans[0].className = 'lang-active';
        spans[1].className = 'lang-inactive';
    } else {
        spans[0].className = 'lang-inactive';
        spans[1].className = 'lang-active';
    }
}

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const navLogo = document.querySelector('.logo-img');

function handleScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Rotate logo based on scroll position
    if (navLogo) {
        const rotation = window.scrollY * 0.3;
        navLogo.style.transform = `rotate(${rotation}deg)`;
    }
}

window.addEventListener('scroll', handleScroll);

// ===== MOBILE MENU =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const position = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: position, behavior: 'smooth' });
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

function initAnimations() {
    const animateElements = document.querySelectorAll(
        '.service-card, .about-text, .about-visual, .contact-info, .contact-form, .section-header, .fruits-board'
    );
    
    animateElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index % 6 * 0.1}s`;
        observer.observe(el);
    });
}

// ===== ACTIVE NAV LINK =====
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 150;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        
        if (link) {
            if (scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===== FRUIT HOTSPOT TOUCH SUPPORT =====
const hotspots = document.querySelectorAll('.fruit-hotspot');
let activeHotspot = null;

hotspots.forEach(hotspot => {
    hotspot.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (activeHotspot && activeHotspot !== hotspot) {
            activeHotspot.classList.remove('touch-active');
        }
        hotspot.classList.toggle('touch-active');
        activeHotspot = hotspot.classList.contains('touch-active') ? hotspot : null;
    });
});

document.addEventListener('touchstart', (e) => {
    if (activeHotspot && !activeHotspot.contains(e.target)) {
        activeHotspot.classList.remove('touch-active');
        activeHotspot = null;
    }
});

// ===== FORM HANDLING =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    const btn = this.querySelector('.btn-submit');
    const originalText = btn.textContent;
    btn.textContent = currentLang === 'pt' ? 'A enviar...' : 'Sending...';
    btn.style.opacity = '0.7';
    btn.style.pointerEvents = 'none';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
    }, 3000);
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    handleScroll();
    updateActiveLink();
});
