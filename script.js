// Navbar HTML template
const navbarTemplate = `
<nav class="navbar">
    <div class="container">
        <div class="logo">
            <a href="{base}index.html">
                <h1>PROJECT <span class="highlight">115</span></h1>
            </a>
        </div>
        <ul class="nav-links">
            <li><a href="{base}index.html" data-page="home">Home</a></li>
            <li><a href="{base}about/index.html" data-page="about">About</a></li>
            <li><a href="{base}resources/index.html" data-page="resources">Resources</a></li>
            <li><a href="{base}gallery/index.html" data-page="gallery">Gallery</a></li>
            <li><a href="{base}contact/index.html" data-page="contact">Contact</a></li>
        </ul>
    </div>
</nav>
`;

// Load navbar dynamically
function loadNavbar() {
    const header = document.querySelector('header');
    const navbarDepth = header.getAttribute('data-navbar-depth') || '';
    
    // Replace {base} with the appropriate path
    const navbarHtml = navbarTemplate.replace(/{base}/g, navbarDepth);
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
