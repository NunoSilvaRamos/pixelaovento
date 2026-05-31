// ===== LANGUAGE TOGGLE =====
let currentLang = 'pt';

const langToggle = document.getElementById('langToggle');

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    updateLanguage();
    updateLangButton();
});

function updateLanguage() {
    const isMobileView = window.innerWidth <= 768;
    const elements = document.querySelectorAll('[data-pt][data-en]');
    elements.forEach(el => {
        let text;
        if (isMobileView && el.hasAttribute(`data-${currentLang}-mobile`)) {
            text = el.getAttribute(`data-${currentLang}-mobile`);
        } else {
            text = el.getAttribute(`data-${currentLang}`);
        }
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

// ===== FRUIT HOTSPOT HOVER/TOUCH SUPPORT =====
const hotspots = document.querySelectorAll('.fruit-hotspot');
let activeHotspot = null;
let mobileOverlay = null;
let floatingReveal = null;

function isMobile() {
    return window.innerWidth <= 768;
}

function closeMobileOverlay() {
    if (mobileOverlay) {
        mobileOverlay.remove();
        mobileOverlay = null;
    }
    if (activeHotspot) {
        activeHotspot.classList.remove('touch-active');
        activeHotspot = null;
    }
}

function removeFloatingReveal() {
    if (floatingReveal) {
        floatingReveal.remove();
        floatingReveal = null;
    }
}

function showFloatingReveal(hotspot) {
    removeFloatingReveal();
    
    const reveal = hotspot.querySelector('.hotspot-reveal');
    if (!reveal) return;
    
    const rect = hotspot.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    floatingReveal = document.createElement('div');
    floatingReveal.className = 'floating-reveal';
    floatingReveal.innerHTML = reveal.innerHTML;
    document.body.appendChild(floatingReveal);
    
    const revealRect = floatingReveal.getBoundingClientRect();
    const gap = 14; // space between dot and popup
    
    // Calculate available space in each direction
    const spaceAbove = centerY;
    const spaceBelow = window.innerHeight - centerY;
    const spaceLeft = centerX;
    const spaceRight = window.innerWidth - centerX;
    
    let top, left;
    
    // Pick the direction with most space
    const maxSpace = Math.max(spaceAbove, spaceBelow, spaceLeft, spaceRight);
    
    if (maxSpace === spaceAbove && spaceAbove > revealRect.height + gap) {
        // Open above
        top = centerY - revealRect.height - gap;
        left = centerX - revealRect.width / 2;
    } else if (maxSpace === spaceBelow && spaceBelow > revealRect.height + gap) {
        // Open below
        top = centerY + gap;
        left = centerX - revealRect.width / 2;
    } else if (maxSpace === spaceRight) {
        // Open to the right
        top = centerY - revealRect.height / 2;
        left = centerX + gap;
    } else {
        // Open to the left
        top = centerY - revealRect.height / 2;
        left = centerX - revealRect.width - gap;
    }
    
    // Keep within viewport bounds
    if (top < 10) top = 10;
    if (top + revealRect.height > window.innerHeight - 10) {
        top = window.innerHeight - revealRect.height - 10;
    }
    if (left < 10) left = 10;
    if (left + revealRect.width > window.innerWidth - 10) {
        left = window.innerWidth - revealRect.width - 10;
    }
    
    floatingReveal.style.top = top + 'px';
    floatingReveal.style.left = left + 'px';
}

function showMobileOverlay(hotspot) {
    closeMobileOverlay();
    
    const reveal = hotspot.querySelector('.hotspot-reveal');
    if (!reveal) return;
    
    mobileOverlay = document.createElement('div');
    mobileOverlay.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.6);
        padding: 24px;
        animation: fadeIn 0.2s ease;
    `;
    
    const card = document.createElement('div');
    card.style.cssText = `
        background: white;
        border-radius: 16px;
        padding: 24px;
        max-width: 280px;
        width: 100%;
        text-align: center;
        box-shadow: 0 8px 40px rgba(0,0,0,0.3);
    `;
    card.innerHTML = reveal.innerHTML;
    
    const img = card.querySelector('.reveal-img');
    if (img) {
        img.style.cssText = 'width: 100%; height: auto; border-radius: 8px; margin-bottom: 12px;';
    }
    
    mobileOverlay.appendChild(card);
    document.body.appendChild(mobileOverlay);
    
    mobileOverlay.addEventListener('click', (e) => {
        if (e.target === mobileOverlay) {
            closeMobileOverlay();
        }
    });
    
    activeHotspot = hotspot;
    hotspot.classList.add('touch-active');
}

// Desktop: hover shows floating reveal
hotspots.forEach(hotspot => {
    hotspot.addEventListener('mouseenter', () => {
        if (!isMobile()) {
            showFloatingReveal(hotspot);
        }
    });
    
    hotspot.addEventListener('mouseleave', () => {
        if (!isMobile()) {
            removeFloatingReveal();
        }
    });
    
    hotspot.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (isMobile()) {
            if (activeHotspot === hotspot) {
                closeMobileOverlay();
            } else {
                showMobileOverlay(hotspot);
            }
        }
    });

    hotspot.addEventListener('click', (e) => {
        if (isMobile()) {
            e.preventDefault();
            if (activeHotspot === hotspot) {
                closeMobileOverlay();
            } else {
                showMobileOverlay(hotspot);
            }
        }
    });
});

document.addEventListener('touchstart', (e) => {
    if (activeHotspot && !activeHotspot.contains(e.target) && (!mobileOverlay || !mobileOverlay.contains(e.target))) {
        closeMobileOverlay();
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
    updateLanguage();
});

window.addEventListener('resize', () => {
    updateLanguage();
});
