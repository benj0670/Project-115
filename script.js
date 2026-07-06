// Load navbar dynamically
async function loadNavbar() {
    const header = document.querySelector('header');
    const navbarDepth = header.getAttribute('data-navbar-depth') || '';
    
    try {
        const response = await fetch(navbarDepth + 'navbar.html');
        const html = await response.text();
        
        // Replace {base} with the appropriate path
        const navbarHtml = html.replace(/{base}/g, navbarDepth);
        header.innerHTML = navbarHtml;
        
        // Set active class based on current page
        const currentPage = header.getAttribute('data-current-page');
        if (currentPage) {
            const links = header.querySelectorAll('.nav-links a');
            links.forEach(link => {
                if (link.getAttribute('data-page') === currentPage) {
                    link.classList.add('active');
                }
            });
        }
        
        // Reinitialize navbar scroll behavior
        initNavbarScroll();
    } catch (error) {
        console.error('Error loading navbar:', error);
    }
}

// Initialize navbar scroll behavior
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.backgroundColor = 'rgba(10, 14, 15, 0.98)';
        } else {
            navbar.style.backgroundColor = 'rgba(10, 14, 15, 0.95)';
        }
        
        lastScroll = currentScroll;
    });
}

// Add animation on scroll for resource cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Load navbar on page load and initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Load navbar
    loadNavbar();
    
    // Initialize resource card animations
    const cards = document.querySelectorAll('.resource-card, .feature-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// Easter egg: Konami code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiPattern)) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    const body = document.body;
    body.style.animation = 'rainbow 2s linear';
    
    setTimeout(() => {
        body.style.animation = '';
    }, 2000);
    
    // Add rainbow animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}
